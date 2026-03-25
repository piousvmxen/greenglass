import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

// Configure axios base URL
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://greenglass-backend.onrender.com' : '')
axios.defaults.baseURL = API_URL

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      hasAuth: !!config.headers?.Authorization
    })
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    })
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.response?.data?.message || error.message,
      fullError: error.response?.data
    })
    return Promise.reject(error)
  }
)

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      console.log('🔍 Fetching user...')
      const res = await axios.get('/api/auth/me')
      console.log('✅ User fetched:', res.data)
      setUser(res.data)
    } catch (error) {
      console.error('❌ Failed to fetch user:', error)
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email)
      const res = await axios.post('/api/auth/login', { email, password })
      console.log('✅ Login successful:', res.data)
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      setUser(res.data.user)
      toast.success('تم تسجيل الدخول بنجاح')
      // Don't redirect here - let the component handle it with useNavigate
      return res.data
    } catch (error) {
      console.error('❌ Login failed:', error)
      toast.error(error.response?.data?.message || 'فشل تسجيل الدخول')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      console.log('📝 Attempting registration for:', userData.email)
      const res = await axios.post('/api/auth/register', userData)
      console.log('✅ Registration successful:', res.data)
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      setUser(res.data.user)
      toast.success('تم إنشاء الحساب بنجاح')
      // Don't redirect here - let the component handle it with useNavigate
      return res.data
    } catch (error) {
      console.error('❌ Registration failed:', error)
      toast.error(error.response?.data?.message || 'فشل إنشاء الحساب')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('تم تسجيل الخروج')
    window.location.href = '/#/'
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    fetchUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
