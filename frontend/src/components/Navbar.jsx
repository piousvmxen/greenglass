import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationContext'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { Menu, X, LogOut, User, Map, MessageSquare, BarChart3, Shield, Bell, Check, Trash2, Moon, Sun } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const { theme, toggleTheme } = useTheme()
  const { lang, t, toggleLang } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const notificationRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const img = new Image()
    img.onerror = () => setLogoError(true)
    img.src = '/logo.jpeg'
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
  }

  const handleNotificationClick = (notification) => {
    markAsRead(notification._id)
    setNotificationDropdownOpen(false)
    
    // Navigate based on notification type
    if (notification.relatedRequestId) {
      navigate(`/requests`)
    } else if (notification.relatedMessageId) {
      navigate(`/messages`)
    }
  }

  const formatTime = (date) => {
    const now = new Date()
    const notificationDate = new Date(date)
    const diff = now - notificationDate
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'الآن'
    if (minutes < 60) return `منذ ${minutes} دقيقة`
    if (hours < 24) return `منذ ${hours} ساعة`
    if (days < 7) return `منذ ${days} يوم`
    return notificationDate.toLocaleDateString('ar-EG')
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 font-['Cairo'] dark:bg-gray-900/90 dark:border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            {logoError ? (
              <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-base">G</div>
            ) : (
              <img src="/logo.jpeg" alt="Green Glass" className="h-9 w-9 rounded-full object-cover" onError={() => setLogoError(true)} />
            )}
            <span className="text-xl font-bold text-green-800 tracking-tight dark:text-green-400">GREEN GLASS</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:text-green-400">
              {t('nav_home')}
            </Link>
            {!user && (
              <a href="#contact" className="text-gray-700 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:text-green-400">
                {t('nav_contact')}
              </a>
            )}
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-green-400">
                  {t('nav_dashboard')}
                </Link>
                <Link to="/map" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1 dark:text-gray-300 dark:hover:text-green-400">
                  <Map size={18} />
                  {t('nav_map')}
                </Link>
                <Link to="/requests" className="text-gray-700 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-green-400">
                  {t('nav_requests')}
                </Link>
                <Link to="/messages" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1 dark:text-gray-300 dark:hover:text-green-400">
                  <MessageSquare size={18} />
                  {t('nav_messages')}
                </Link>
                {user.role === 'admin' && (
                  <Link to="/statistics" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1 dark:text-gray-300 dark:hover:text-green-400">
                    <BarChart3 size={18} />
                    {t('nav_statistics')}
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1 dark:text-gray-300 dark:hover:text-green-400">
                    <Shield size={18} />
                    {t('nav_admin')}
                  </Link>
                )}
                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                    className="relative text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1 dark:text-gray-300 dark:hover:text-green-400"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Notification Dropdown */}
                  {notificationDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                      <div className="p-3 border-b border-gray-200 flex justify-between items-center dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{t('nav_notifications')}</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={() => {
                              markAllAsRead()
                              setNotificationDropdownOpen(false)
                            }}
                            className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
                          >
                            <Check size={14} />
                            {t('notif_mark_all')}
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            {t('notif_empty')}
                          </div>
                        ) : (
                          notifications.slice(0, 10).map((notification) => (
                            <div
                              key={notification._id}
                              className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                                !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                              }`}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {formatTime(notification.createdAt)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification._id)
                                    }}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      {notifications.length > 10 && (
                        <div className="p-3 border-t border-gray-200 text-center dark:border-gray-700">
                          <Link
                            to="/notifications"
                            onClick={() => setNotificationDropdownOpen(false)}
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            {t('nav_notifications')}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1 dark:text-gray-300 dark:hover:text-green-400">
                  <User size={18} />
                  {user.name}
                </Link>

                {/* Toggles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLang}
                    className="px-2 py-1 text-xs font-bold border rounded-md border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {lang === 'ar' ? 'EN' : 'AR'}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  {t('nav_logout')}
                </button>
              </>
            ) : (
              <>
                {/* Toggles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLang}
                    className="px-2 py-1 text-xs font-bold border rounded-md border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {lang === 'ar' ? 'EN' : 'AR'}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                </div>
                <Link to="/login" className="text-green-700 font-medium hover:text-green-900 transition-colors dark:text-green-400 dark:hover:text-green-300">{t('nav_login')}</Link>
                <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-md shadow-green-600/20">{t('nav_register')}</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 dark:bg-gray-900/95 border-t border-gray-100 dark:border-gray-800">
            {/* Toggles Mobile */}
            <div className="flex items-center gap-3 px-2 py-3 border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={toggleLang}
                className="flex-1 py-2.5 text-sm font-bold border rounded-xl border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
              <button
                onClick={toggleTheme}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {theme === 'light' ? <><Moon size={16} /> <span>Dark</span></> : <><Sun size={16} /> <span>Light</span></>}
              </button>
            </div>

            <div className="flex flex-col pt-1">
              {[
                { to: '/', label: t('nav_home'), show: true },
              ].concat(user ? [
                { to: '/dashboard',   label: t('nav_dashboard'),    show: true },
                { to: '/map',         label: t('nav_map'),           show: true },
                { to: '/requests',    label: t('nav_requests'),      show: true },
                { to: '/messages',    label: t('nav_messages'),      show: true },
                { to: '/notifications', label: t('nav_notifications'), show: true, badge: unreadCount },
                { to: '/statistics',  label: t('nav_statistics'),    show: user.role === 'admin' },
                { to: '/admin',       label: t('nav_admin'),         show: user.role === 'admin' },
                { to: '/profile',     label: t('nav_profile'),       show: true },
              ] : [
                { to: '/login',    label: t('nav_login'),    show: true },
                { to: '/register', label: t('nav_register'), show: true },
              ]).filter(l => l.show).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-400 transition-colors border-b border-gray-50 dark:border-gray-800/50 font-medium"
                >
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {link.badge > 9 ? '9+' : link.badge}
                    </span>
                  )}
                </Link>
              ))}
              {user && (
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout() }}
                  className="flex items-center gap-2 px-4 py-3.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors w-full mt-1"
                >
                  <LogOut size={18} />
                  {t('nav_logout')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
