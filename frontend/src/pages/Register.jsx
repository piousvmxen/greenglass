import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { UserPlus, MapPin } from 'lucide-react'
import LocationPicker from '../components/LocationPicker'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
    entityType: 'individual',
    address: ''
  })
  const [location, setLocation] = useState({ lat: null, lng: null })
  const [loading, setLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const { register, user } = useAuth()
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

  const handleLocationConfirm = ({ lat, lng, address }) => {
    setLocation({ lat, lng })
    setFormData((prev) => ({ ...prev, address }))
    setShowMap(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register({
        ...formData,
        location: location.lat && location.lng ? location : {}
      })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {showMap && (
        <LocationPicker
          lang={lang}
          onConfirm={handleLocationConfirm}
          onClose={() => setShowMap(false)}
        />
      )}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
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
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('register_title')}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('register_have_account')}{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              {t('register_login_link')}
            </Link>
          </p>
        </div>

        <form className="bg-white dark:bg-[#111827] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-6 transition-colors duration-300" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register_name')} *
              </label>
              <input
                name="name"
                type="text"
                required
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register_email')} *
              </label>
              <input
                name="email"
                type="email"
                required
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register_password')} *
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register_phone')} *
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register_role')}
              </label>
              <select
                name="role"
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">{t('register_role_user')}</option>
                <option value="collector">{t('register_role_collector')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'ar' ? 'نوع الكيان' : 'Entity Type'}
              </label>
              <select
                name="entityType"
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={formData.entityType}
                onChange={handleChange}
              >
                <option value="individual">{lang === 'ar' ? 'فرد' : 'Individual'}</option>
                <option value="cafe">{lang === 'ar' ? 'مقهى' : 'Cafe'}</option>
                <option value="restaurant">{lang === 'ar' ? 'مطعم' : 'Restaurant'}</option>
                <option value="hotel">{lang === 'ar' ? 'فندق' : 'Hotel'}</option>
                <option value="factory">{lang === 'ar' ? 'مصنع' : 'Factory'}</option>
                <option value="workshop">{lang === 'ar' ? 'ورشة' : 'Workshop'}</option>
                <option value="other">{lang === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
            </div>
          </div>

          {/* Address via map */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'ar' ? 'العنوان' : 'Address'}
            </label>
            <div className="flex gap-2">
              <input
                name="address"
                type="text"
                readOnly
                placeholder={lang === 'ar' ? 'انقر على زر الخريطة لتحديد العنوان' : 'Click the Map button to select your address'}
                className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white flex-1 cursor-default"
                style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                value={formData.address}
              />
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors whitespace-nowrap"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                <MapPin size={15} />
                {lang === 'ar' ? 'الخريطة' : 'Map'}
              </button>
            </div>
            {location.lat && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1">
                ✓ {lang === 'ar' ? 'تم تحديد الموقع بنجاح' : 'Location confirmed'} ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <UserPlus size={20} />
                {t('register_btn')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
