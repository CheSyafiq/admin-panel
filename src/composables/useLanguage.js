import { reactive } from 'vue'

/**
 * Language State Management Composable
 * Handles language switching and persistence
 */
export const languageState = reactive({
  currentLang: 'en'
})

/**
 * Toggle between available languages
 */
export function toggleLanguage() {
  languageState.currentLang = languageState.currentLang === 'en' ? 'ms' : 'en'
  localStorage.setItem('language', languageState.currentLang)
}

/**
 * Set specific language
 * @param {string} lang - Language code ('en' or 'ms')
 */
export function setLanguage(lang) {
  if (['en', 'ms'].includes(lang)) {
    languageState.currentLang = lang
    localStorage.setItem('language', lang)
  }
}

/**
 * Initialize language from localStorage or default to English
 * Should be called in main.js before mounting the app
 */
export function initLanguage() {
  const savedLang = localStorage.getItem('language')
  if (savedLang && ['en', 'ms'].includes(savedLang)) {
    languageState.currentLang = savedLang
  } else {
    languageState.currentLang = 'en'
    localStorage.setItem('language', 'en')
  }
}
