<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Navbar -->
    <Navbar />
    
    <!-- Main Content -->
    <main
      :class="[
        'pt-20 transition-all duration-300',
        isSidebarOpen && !isMobile ? 'lg:pl-72' : 'lg:pl-0'
      ]"
    >
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- Page Content -->
        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '../components/layout/Navbar.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import { sidebarState } from '../composables/useSidebar'

/**
 * AdminLayout Component
 * Main layout wrapper for admin pages
 * Contains Navbar, Sidebar, and main content area
 * Handles responsive behavior and sidebar state
 * 
 * @component
 */

export default {
  name: 'AdminLayout',
  
  components: {
    Navbar,
    Sidebar
  },
  
  data() {
    return {
      sidebarState
    }
  },
  
  computed: {
    isSidebarOpen() {
      return this.sidebarState.isOpen
    },
    
    isMobile() {
      return this.sidebarState.isMobile
    }
  }
}
</script>

<style scoped>
/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
