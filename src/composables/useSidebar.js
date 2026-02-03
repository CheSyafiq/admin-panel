import { reactive } from 'vue'

/**
 * Sidebar State Management
 * Simple reactive state object for sidebar visibility
 * Can be directly imported and modified by any component
 */

export const sidebarState = reactive({
  isOpen: true,
  isMobile: window.innerWidth < 1024
})

/**
 * Toggle sidebar open/close state
 */
export function toggleSidebar() {
  sidebarState.isOpen = !sidebarState.isOpen
}

/**
 * Open sidebar
 */
export function openSidebar() {
  sidebarState.isOpen = true
}

/**
 * Close sidebar
 */
export function closeSidebar() {
  sidebarState.isOpen = false
}

// Handle window resize
window.addEventListener('resize', () => {
  sidebarState.isMobile = window.innerWidth < 1024
  // Auto-close sidebar on mobile, auto-open on desktop
  if (sidebarState.isMobile) {
    sidebarState.isOpen = false
  } else {
    sidebarState.isOpen = true
  }
})
