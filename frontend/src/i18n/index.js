import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import kn from './locales/kn.json'
import hi from './locales/hi.json'

export const LANGUAGE_STORAGE_KEY = 'vrr-language'
export const supportedLanguages = ['en', 'kn', 'hi']
let language = 'en'
try {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (supportedLanguages.includes(stored)) language = stored
} catch { /* Storage may be unavailable in private or restricted browsing. */ }

const applyLanguage = language => {
  document.documentElement.lang = language
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language) } catch { /* Switching still works without storage. */ }
}
i18n.on('languageChanged', applyLanguage)
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, kn: { translation: kn }, hi: { translation: hi } },
  lng: language,
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
  returnNull: false,
})
applyLanguage(language)
export default i18n
