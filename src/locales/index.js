import en from './en'
import ms from './ms'

/**
 * Language translations map
 */
const translations = {
  en,
  ms
}

/**
 * Get translation for a key path
 * @param {string} lang - Language code ('en' or 'ms')
 * @param {string} key - Dot-notation key path (e.g., 'dashboard.title')
 * @returns {string} - Translated text or key if not found
 */
export function translate(lang, key) {
  const keys = key.split('.')
  let value = translations[lang]
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      return key // Return key if translation not found
    }
  }
  
  return value || key
}

/**
 * Create translation helper function for a specific language
 * @param {string} lang - Language code
 * @returns {Function} - Translation function
 */
export function createTranslator(lang) {
  return (key) => translate(lang, key)
}

export default translations
