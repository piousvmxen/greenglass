import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { Map, Users, Award, BarChart3, Leaf, Recycle, Globe, ArrowRight, Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()
  const { t, lang } = useLanguage()
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactSent, setContactSent] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSent(true)
    setContactForm({ name: '', email: '', message: '' })
    setTimeout(() => setContactSent(false), 5000)
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-white dark:bg-[#0a0f1e] text-gray-800 dark:text-gray-200 font-['Cairo'] overflow-x-hidden transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/ecocity-hero.png"
            alt={t('home_hero_title1')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/60"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-2xl text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-green-500/30 border border-green-400/50 text-green-100 text-sm font-semibold mb-6 backdrop-blur-sm">
              {t('home_badge')}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {t('home_hero_title1')}<br />
              <span className="text-green-300">{t('home_hero_title2')}</span>
            </h1>
            <p className="text-xl text-green-50 mb-10 leading-relaxed max-w-xl">
              {t('home_hero_desc')}
            </p>
            {!user && (
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-xl flex items-center gap-2"
                >
                  {t('home_start_now')}
                  <ArrowRight className={`h-5 w-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </Link>
                <Link
                  to="/login"
                  className="bg-green-700/50 hover:bg-green-700/70 border border-green-400/50 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors backdrop-blur-sm"
                >
                  {t('home_login')}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[60px] lg:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.9,122.9,190.49,112.5,235.25,104.72,279.79,83.9,321.39,56.44Z" className="fill-gray-50 dark:fill-[#111827] transition-colors duration-300"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home_features_title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('home_features_subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-[#0d1424] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 dark:border-gray-800 group">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Map className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feat_map_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('feat_map_desc')}</p>
            </div>

            <div className="bg-white dark:bg-[#0d1424] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 dark:border-gray-800 group">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Recycle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feat_collect_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('feat_collect_desc')}</p>
            </div>

            <div className="bg-white dark:bg-[#0d1424] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 dark:border-gray-800 group">
              <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feat_reward_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('feat_reward_desc')}</p>
            </div>

            <div className="bg-white dark:bg-[#0d1424] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 dark:border-gray-800 group">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feat_stats_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('feat_stats_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="audience" className="py-24 bg-white dark:bg-[#0d1424] relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-green-50 dark:bg-green-900/10 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-50 dark:bg-blue-900/10 opacity-50 blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {t('home_audience_title1')} <br />
                <span className="text-green-600">{t('home_audience_title2')}</span> {t('home_audience_title3')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('home_audience_desc')}
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-100 dark:hover:border-green-900/30 transition-colors">
                <div className="w-12 h-12 bg-white dark:bg-[#0d1424] rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('aud_individuals')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('aud_individuals_sub')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-100 dark:hover:border-green-900/30 transition-colors mt-8">
                <div className="w-12 h-12 bg-white dark:bg-[#0d1424] rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('aud_hotels')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('aud_hotels_sub')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-100 dark:hover:border-green-900/30 transition-colors">
                <div className="w-12 h-12 bg-white dark:bg-[#0d1424] rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Recycle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('aud_collectors')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('aud_collectors_sub')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-100 dark:hover:border-green-900/30 transition-colors mt-8">
                <div className="w-12 h-12 bg-white dark:bg-[#0d1424] rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('aud_factories')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('aud_factories_sub')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Impact Section */}
      <section id="impact" className="py-20 bg-green-800 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <Globe className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home_stats_title')}</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">{t('home_stats_subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-2">{t('stats_goal')}</div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-300 mb-2">50<span className="text-2xl">+</span></div>
              <div className="text-green-50 font-medium">{t('stats_tons')}</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-2">{t('stats_goal')}</div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-300 mb-2">5<span className="text-2xl">k</span></div>
              <div className="text-green-50 font-medium">{t('stats_users')}</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-2">{t('stats_goal')}</div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-300 mb-2">200</div>
              <div className="text-green-50 font-medium">{t('stats_cafes')}</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-2">{t('stats_goal')}</div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-300 mb-2">10<span className="text-2xl">M</span></div>
              <div className="text-green-50 font-medium">{t('stats_points')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="bg-white dark:bg-[#0d1424] rounded-3xl p-8 md:p-16 text-center shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-50 dark:bg-green-900/10 rounded-full opacity-50 blur-3xl"></div>

              <Leaf className="h-16 w-16 text-green-600 mx-auto mb-6 relative z-10" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">
                {t('home_cta_title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
                {t('home_cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
                >
                  {t('home_cta_btn')}
                  <ArrowRight className={`h-5 w-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center"
                >
                  {t('nav_login')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section — hidden for logged-in users */}
      {!user && <section id="contact" className="py-24 bg-white dark:bg-[#0a0f1e] transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('contact_title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('contact_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-500 mb-1">
                  <Leaf className="h-5 w-5" />
                  <span className="font-bold text-xl">GREEN GLASS</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t('contact_brand_desc')}</p>
              </div>

              <div className="space-y-5">
                <a
                  href="mailto:omaredz68@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors flex-shrink-0">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{t('contact_email_label')}</div>
                    <div className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-green-700 dark:group-hover:text-green-500 transition-colors">omaredz68@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/213655773240"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors flex-shrink-0">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{t('contact_phone_label')}</div>
                    <div className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-green-700 dark:group-hover:text-green-500 transition-colors" dir="ltr">+213 655 773 240</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{t('contact_location_label')}</div>
                    <div className="text-gray-800 dark:text-gray-200 font-medium">{lang === 'ar' ? 'سيدي بلعباس، الجزائر' : 'Sidi Bel Abbes, Algeria'}</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-sm text-gray-400 mb-4">{t('contact_social')}</p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-500 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-500 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-500 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-500 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-[#111827] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
              {contactSent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('contact_sent_title')}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{t('contact_sent_desc')}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('contact_form_title')}</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('contact_name')}</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder={t('contact_name_ph')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('contact_email')}</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('contact_message')}</label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder={t('contact_message_ph')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    {t('contact_send_btn')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>}

      {/* Footer — hidden for logged-in users */}
      {!user && (
        <footer className="bg-gray-900 dark:bg-[#050810] text-gray-400 py-10 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <Leaf className="text-green-500 h-6 w-6" />
                <span className="font-bold text-xl tracking-tight">GREEN GLASS</span>
              </div>
              <p className="text-sm">© {new Date().getFullYear()} GREEN GLASS. {t('footer_rights')}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">{lang === 'ar' ? 'سيدي بلعباس، الجزائر' : 'Sidi Bel Abbes, Algeria'}</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Home
