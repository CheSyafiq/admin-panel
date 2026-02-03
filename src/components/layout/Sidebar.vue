<template>
  <!-- Overlay for mobile -->
  <div
    v-if="isMobile && isSidebarOpen"
    @click="closeSidebar"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden transition-opacity"
  ></div>
  
  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 left-0 bottom-0 z-40 w-72 bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out',
      sidebarClasses,
      'lg:translate-x-0',
      { 'hidden': !isSidebarOpen }
    ]"
  >
    <div class="h-full flex flex-col">
      <!-- Logo -->
      <div class="flex items-center gap-2 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
        <div class="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center">
          <Icon icon="fa6-solid:bolt" class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold text-slate-900 dark:text-white">CMS19</span>
      </div>
      
      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-4 py-6">
        <div class="space-y-2">
          <!-- Menu Section Label -->
          <p class="text-slate-500 dark:text-slate-600 text-xs font-semibold uppercase tracking-wider px-4 mb-4">MENU</p>
          
          <!-- Navigation Links -->
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="menu-item-wrapper"
          >
            <!-- Menu Item without submenu -->
            <router-link
              v-if="!item.sub"
              :to="item.route"
              :class="[
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100',
                'group relative'
              ]"
              active-class="bg-blue-900/30 text-blue-400"
              @click="onMenuItemClick"
            >
              <!-- Active Indicator -->
              <span class="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r hidden group-[.router-link-active]:block"></span>
              
              <!-- Icon -->
              <Icon :icon="getIconName(item.icon)" class="w-5 h-5 flex-shrink-0" />
              
              <!-- Label -->
              <span class="text-sm font-medium">{{ item.title }}</span>
              
              <!-- Badge (optional) -->
              <span v-if="item.badge" class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-600 text-white">
                {{ item.badge }}
              </span>
            </router-link>

            <!-- Menu Item with submenu -->
            <div v-else>
              <!-- Parent Menu Item -->
              <button
                @click="toggleSubmenu(index)"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100',
                  'group relative',
                  isParentActive(item) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
                ]"  
              >
                <!-- Active Indicator -->
                <span
                  v-if="isParentActive(item)"
                  class="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r"
                ></span>
                
                <!-- Icon -->
                <Icon :icon="getIconName(item.icon)" class="w-5 h-5 flex-shrink-0" />
                
                <!-- Label -->
                <span class="text-sm font-medium">{{ item.title }}</span>
                
                <!-- Badge (optional) -->
                <span v-if="item.badge" class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-600 text-white mr-2">
                  {{ item.badge }}
                </span>
                
                <!-- Chevron Icon -->
                <Icon
                  icon="fa6-solid:chevron-down"
                  :class="[
                    'w-4 h-4 transition-transform duration-200',
                    openSubmenus[index] ? 'rotate-180' : '',
                    item.badge ? '' : 'ml-auto'
                  ]"
                />
              </button>

              <!-- Submenu Items -->
              <transition
                name="submenu"
                @enter="onSubmenuEnter"
                @leave="onSubmenuLeave"
              >
                <div
                  v-show="openSubmenus[index]"
                  class="overflow-hidden"
                >
                  <div class="mt-2 ml-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-1">
                    <router-link
                      v-for="(subItem, subIndex) in item.sub"
                      :key="subIndex"
                      :to="subItem.route"
                      :class="[
                        'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200',
                        'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100',
                        'text-sm'
                      ]"
                      active-class="bg-blue-900/30 text-blue-400"
                      @click="onMenuItemClick"
                    >
                      {{ subItem.title }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          <div class="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
          <span class="text-xs text-slate-600 dark:text-slate-400 font-medium">All systems operational</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { sidebarState, closeSidebar } from '../../composables/useSidebar'
import menuConfig from '../../configs/dashboardSidebar'
import { Icon } from '@iconify/vue'

/**
 * Sidebar Component
 * 
 * Collapsible navigation sidebar with role-based menu rendering
 * Supports nested submenus and dynamic menu structure from configuration
 * Responsive: drawer on mobile, collapsible on desktop
 * Uses Iconify with Font Awesome icons for consistent iconography
 * 
 * @component
 * 
 * @props {String} userRole - The current user's role (admin, vendor, user). Default: 'admin'
 * 
 * @emits None
 */
export default {
  name: 'Sidebar',
  
  components: {
    Icon
  },
  
  props: {
    /**
     * Current user role to determine which menu items to display
     * @values admin, vendor, user
     */
    userRole: {
      type: String,
      default: 'admin',
      validator: (value) => ['admin', 'vendor', 'user'].includes(value)
    }
  },
  
  data() {
    return {
      /**
       * Track which submenus are open
       */
      openSubmenus: {},
      /**
       * Shared sidebar state
       */
      sidebarState
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
     * Get mobile state
     */
    isMobile() {
      return this.sidebarState.isMobile
    },
    
    /**
     * Get sidebar classes based on open/close state
     */
    sidebarClasses() {
        console.log(this.sidebarState.isOpen);
        return {
            'translate-x-0': this.sidebarState.isOpen,
            '-translate-x-full': !this.sidebarState.isOpen,
        }
    },
    
    /**
     * Get menu items based on user role
     * @returns {Array} Menu items array for the current user role
     */
    menuItems() {
      return menuConfig[this.userRole] || menuConfig.admin
    }
  },
  
  methods: {
    /**
     * Close the sidebar
     */
    closeSidebar() {
      closeSidebar()
    },
    
    /**
     * Toggle submenu open/close state
     * @param {Number} index - The index of the menu item
     */
    toggleSubmenu(index) {
      this.openSubmenus[index] = !this.openSubmenus[index]
    },
    
    /**
     * Check if parent menu item should be active
     * Uses namespace to match routes if available, otherwise checks exact route match
     * @param {Object} item - Menu item object
     * @returns {Boolean}
     */
    isParentActive(item) {
      if (item.namespace) {
        // Use namespace for matching (e.g., /products/* matches /products, /products/add, etc.)
        const namespace = item.namespace.replace('/*', '')
        return this.$route.path.startsWith(namespace)
      }
      return this.$route.path === item.route
    },
    
    /**
     * Get Font Awesome icon name from Iconify
     * Maps icon names to Font Awesome icons via Iconify
     * @param {String} iconName - Name of the icon
     * @returns {String} Iconify icon identifier
     */
    getIconName(iconName) {
      const iconMap = {
        dashboard: 'fa6-solid:house',
        users: 'fa6-solid:users',
        products: 'fa6-solid:box',
        orders: 'fa6-solid:bag-shopping',
        analytics: 'fa6-solid:chart-line',
        settings: 'fa6-solid:gear',
        profile: 'fa6-solid:user'
      }
      
      return iconMap[iconName] || 'fa6-solid:house'
    },
    
    /**
     * Handle menu item click
     * Close sidebar on mobile after navigation
     */
    onMenuItemClick() {
      if (this.isMobile) {
        this.closeSidebar()
      }
    },
    
    /**
     * Animation handler for submenu enter
     */
    onSubmenuEnter(el) {
      el.style.height = '0'
      el.offsetHeight // Force reflow
      el.style.height = el.scrollHeight + 'px'
    },
    
    /**
     * Animation handler for submenu leave
     */
    onSubmenuLeave(el) {
      el.style.height = el.scrollHeight + 'px'
      el.offsetHeight // Force reflow
      el.style.height = '0'
    }
  }
}
</script>

<style scoped>
/* Submenu transition styles */
.submenu-enter-active,
.submenu-leave-active {
  transition: height 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  height: 0;
}
</style>
