import { reactive } from 'vue'

/**
 * Dark Mode State Management
 * Manages dark/light theme toggle with localStorage persistence
 * Applies 'dark' class to <html> element for Tailwind's dark mode
 */

export const darkModeState = reactive({
  isDark: false
})

/**
 * Initialize dark mode from localStorage or system preference
 */
export function initDarkMode() {
  const storedTheme = localStorage.getItem('theme')
  
  if (storedTheme === 'dark') {
    darkModeState.isDark = true
    document.documentElement.classList.add('dark')
  } else if (storedTheme === 'light') {
    darkModeState.isDark = false
    document.documentElement.classList.remove('dark')
  } else {
    // Check system preference if no theme is stored
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    darkModeState.isDark = prefersDark
    
    if (prefersDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }
}

/**
 * Toggle dark mode on/off
 */
export function toggleDarkMode() {
  darkModeState.isDark = !darkModeState.isDark
  
  if (darkModeState.isDark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Auto-initialize on load
if (typeof window !== 'undefined') {
  initDarkMode()
}
