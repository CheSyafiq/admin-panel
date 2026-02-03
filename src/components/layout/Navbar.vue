<template>
  <nav :class="['fixed top-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-20 transition-colors', { 'lg:left-72': isSidebarOpen }]">
    <div class="h-full px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-full">
        <!-- Left: Hamburger Menu -->
        <div class="flex items-center gap-4">
          <!-- Hamburger Menu Button (Mobile & Toggle) -->
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Icon icon="heroicons:bars-3" class="w-6 h-6 text-slate-600 dark:text-slate-200" />
          </button>
        </div>
        
        <!-- Right: Search, Notifications, Profile -->
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Search -->
          <div class="hidden md:block">
            <div class="relative">
              <input
                type="search"
                :placeholder="t('common.search')"
                class="w-48 lg:w-64 xl:w-96 px-4 py-2.5 pl-11 text-sm bg-slate-50 dark:bg-slate-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 transition-all"
              />
              <Icon icon="heroicons:magnifying-glass" class="absolute left-4 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
          
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            <Icon v-if="isDark" icon="heroicons:sun" class="w-5 h-5 text-yellow-500" />
            <Icon v-else icon="heroicons:moon" class="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          
          <!-- Language Switcher -->
          <div class="relative">
            <button
              @click="toggleLanguageMenu"
              class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              aria-label="Change language"
            >
              <Icon icon="heroicons:language" class="w-5 h-5 text-slate-600 dark:text-slate-200" />
              <span class="hidden sm:inline text-xs font-medium text-slate-600 dark:text-slate-200 uppercase">{{ currentLang }}</span>
            </button>
            
            <!-- Language Dropdown -->
            <div
              v-show="isLanguageMenuOpen"
              class="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1"
            >
              <button
                @click="changeLang('en')"
                :class="[
                  'flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors',
                  currentLang === 'en'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                ]"
              >
                <Icon v-if="currentLang === 'en'" icon="heroicons:check" class="w-4 h-4" />
                <span :class="currentLang !== 'en' ? 'ml-7' : ''">{{ t('navbar.english') }}</span>
              </button>
              <button
                @click="changeLang('ms')"
                :class="[
                  'flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors',
                  currentLang === 'ms'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                ]"
              >
                <Icon v-if="currentLang === 'ms'" icon="heroicons:check" class="w-4 h-4" />
                <span :class="currentLang !== 'ms' ? 'ml-7' : ''">{{ t('navbar.malay') }}</span>
              </button>
            </div>
          </div>
          
          <!-- Notifications -->
          <button
            class="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Icon icon="heroicons:bell" class="w-5 h-5 text-slate-600 dark:text-slate-200" />
            <!-- Notification Badge -->
            <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-danger-500"></span>
            </span>
          </button>
          
          <!-- Messages -->
          <button
            class="hidden sm:block relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Messages"
          >
            <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5 text-slate-600 dark:text-slate-200" />
            <span class="absolute top-1.5 right-1.5 h-2 w-2 bg-success-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          
          <!-- Divider -->
          <div class="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
          
          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click="toggleProfileMenu"
              class="flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Profile menu"
            >
              <div class="hidden sm:block text-right">
                <p class="text-sm font-medium text-slate-900 dark:text-slate-100">John Doe</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white dark:ring-slate-800 shadow-md">
                JD
              </div>
              <Icon icon="heroicons:chevron-down" class="hidden sm:block w-4 h-4 text-slate-400 dark:text-slate-500" />
            </button>
            
            <!-- Dropdown Menu -->
            <div
              v-show="isProfileMenuOpen"
              class="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 divide-y divide-slate-100 dark:divide-slate-700"
            >
              <div class="px-4 py-3">
                <p class="text-sm font-medium text-slate-900 dark:text-slate-100">John Doe</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">john.doe@example.com</p>
              </div>
              
              <div class="py-1">
                <router-link
                  to="/profile"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  @click="closeProfileMenu"
                >
                  <Icon icon="heroicons:user" class="w-4 h-4" />
                  {{ t('navbar.profile') }}
                </router-link>
                <router-link
                  to="/settings"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  @click="closeProfileMenu"
                >
                  <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4" />
                  {{ t('navbar.settings') }}
                </router-link>
              </div>
              
              <div class="py-1">
                <button
                  @click="handleLogout"
                  class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors"
                >
                  <Icon icon="heroicons:arrow-right-on-rectangle" class="w-4 h-4" />
                  {{ t('navbar.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Icon } from '@iconify/vue'
import { sidebarState, toggleSidebar } from '../../composables/useSidebar'
import { darkModeState, toggleDarkMode } from '../../composables/useDarkMode'
import { languageState, setLanguage } from '../../composables/useLanguage'
import { translate } from '../../locales'

/**
 * Navbar Component
 * Top navigation bar with search, notifications, and profile menu
 * Includes hamburger menu for mobile sidebar toggle and dark mode switcher
 * 
 * @component
 * 
 * @emits None
 */
export default {
  name: 'Navbar',
  
  components: {
    Icon
  },
  
  data() {
    return {
      /**
       * Profile dropdown menu open state
       */
      isProfileMenuOpen: false,
      /**
       * Language dropdown menu open state
       */
      isLanguageMenuOpen: false,
      /**
       * Shared sidebar state
       */
      sidebarState,
      /**
       * Dark mode state
       */
      darkModeState,
      /**
       * Language state
       */
      languageState
    }
  },
  
  computed: {
    /**
     * Get sidebar open state
     */
    isSidebarOpen() {
      return this.sidebarState.isOpen
    },
    
    /**
     * Get dark mode state
     */
    isDark() {
      return this.darkModeState.isDark
    },
    
    /**
     * Get current language
     */
    currentLang() {
      return this.languageState.currentLang
    }
  },
  
  methods: {
    /**
     * Translate helper
     */
    t(key) {
      return translate(this.languageState.currentLang, key)
    },
    /**
     * Toggle dark mode
     */
    toggleDarkMode() {
      toggleDarkMode()
    },
    /**
     * Toggle sidebar
     */
    toggleSidebar() {
      toggleSidebar()
    },
    
    /**
     * Toggle profile dropdown menu
     */
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen
    },

    /**
     * Close profile dropdown menu
     */
    closeProfileMenu() {
      this.isProfileMenuOpen = false
    },
    
    /**
     * Toggle language dropdown menu
     */
    toggleLanguageMenu() {
      this.isLanguageMenuOpen = !this.isLanguageMenuOpen
    },
    
    /**
     * Change language
     */
    changeLang(lang) {
      setLanguage(lang)
      this.isLanguageMenuOpen = false
    },

    /**
     * Handle user logout
     */
    handleLogout() {
      localStorage.removeItem('isAuthenticated')
      this.closeProfileMenu()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
