import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { LogIn } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading]   = useState(false)
  const [logoError, setLogoError] = useState(false)
  const { login, user } = useAuth()
  const { t, lang } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    const img = new Image()
    img.onerror = () => setLogoError(true)
    img.src = '/logo.jpeg'
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(formData.email, formData.password)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0f1e] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#111827] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div>
          <div className="flex justify-center">
            {!logoError ? (
              <img
                src="/logo.jpeg"
                alt="Green Glass Logo"
                className="w-20 h-20 object-contain rounded-2xl"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-20 h-20 bg-green-700 rounded-2xl flex items-center justify-center">
                <span className="text-white font-extrabold text-3xl">G</span>
              </div>
            )}
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('login_title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('login_no_account')}{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              {t('login_register_link')}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('login_email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('login_password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  {t('login_btn')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
