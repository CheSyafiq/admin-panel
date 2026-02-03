<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-secondary-200">
    <!-- Items Per Page Selector -->
    <div class="flex items-center gap-3">
      <label for="itemsPerPage" class="text-sm text-secondary-600 whitespace-nowrap">
        Items per page:
      </label>
      <select
        id="itemsPerPage"
        :value="itemsPerPage"
        @change="handleItemsPerPageChange"
        class="text-sm border border-secondary-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
      >
        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Pagination Info -->
    <div class="text-sm text-secondary-600">
      Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} entries
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center gap-1">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
          currentPage === 1
            ? 'text-secondary-400 cursor-not-allowed'
            : 'text-secondary-700 hover:bg-secondary-100'
        ]"
        aria-label="Previous page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Page Numbers -->
      <template v-for="page in visiblePages" :key="page">
        <!-- Ellipsis -->
        <span
          v-if="page === '...'"
          class="px-3 py-1.5 text-sm text-secondary-500"
        >
          ...
        </span>
        
        <!-- Page Number Button -->
        <button
          v-else
          @click="goToPage(page)"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
            currentPage === page
              ? 'bg-primary-600 text-white'
              : 'text-secondary-700 hover:bg-secondary-100',
            // Hide some pages on mobile
            hiddenOnMobile(page) ? 'hidden sm:inline-flex' : 'inline-flex'
          ]"
          :aria-label="`Go to page ${page}`"
          :aria-current="currentPage === page ? 'page' : undefined"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
          currentPage === totalPages
            ? 'text-secondary-400 cursor-not-allowed'
            : 'text-secondary-700 hover:bg-secondary-100'
        ]"
        aria-label="Next page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
/**
 * BasePagination Component
 * 
 * A flexible pagination component that supports dynamic items per page,
 * current page tracking, and emits events for API data fetching.
 * 
 * @component
 * @emits {Object} page-changed - Emitted when page changes { page: number, itemsPerPage: number }
 * @emits {Object} items-per-page-changed - Emitted when items per page changes { page: 1, itemsPerPage: number }
 * 
 * @example
 * <BasePagination
 *   :current-page="1"
 *   :total-items="100"
 *   :items-per-page="10"
 *   @page-changed="fetchData"
 * />
 */
export default {
  name: 'BasePagination',
  
  props: {
    /**
     * Current active page number
     * @type {Number}
     * @default 1
     */
    currentPage: {
      type: Number,
      default: 1,
      validator: (value) => value >= 1
    },
    
    /**
     * Total number of items across all pages
     * @type {Number}
     * @required
     */
    totalItems: {
      type: Number,
      required: true,
      validator: (value) => value >= 0
    },
    
    /**
     * Number of items to display per page
     * @type {Number}
     * @default 10
     */
    itemsPerPage: {
      type: Number,
      default: 10,
      validator: (value) => value > 0
    },
    
    /**
     * Available options for items per page selector
     * @type {Array<Number>}
     * @default [10, 25, 50, 100]
     */
    itemsPerPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100]
    },
    
    /**
     * Maximum number of page buttons to show at once
     * @type {Number}
     * @default 7
     */
    maxVisiblePages: {
      type: Number,
      default: 7,
      validator: (value) => value >= 5 && value % 2 === 1 // Must be odd and >= 5
    }
  },
  
  emits: ['page-changed', 'items-per-page-changed'],
  
  computed: {
    /**
     * Calculate total number of pages
     * @returns {Number}
     */
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage) || 1
    },
    
    /**
     * Calculate starting item number for current page
     * @returns {Number}
     */
    startItem() {
      if (this.totalItems === 0) return 0
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    
    /**
     * Calculate ending item number for current page
     * @returns {Number}
     */
    endItem() {
      const end = this.currentPage * this.itemsPerPage
      return Math.min(end, this.totalItems)
    },
    
    /**
     * Calculate visible page numbers with ellipsis
     * @returns {Array<Number|String>}
     */
    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage
      const max = this.maxVisiblePages
      
      if (total <= max) {
        // Show all pages if total is less than max
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // Always show first page
        pages.push(1)
        
        const sidePages = Math.floor((max - 3) / 2) // Pages on each side of current
        let startPage = Math.max(2, current - sidePages)
        let endPage = Math.min(total - 1, current + sidePages)
        
        // Adjust if we're near the start
        if (current <= sidePages + 2) {
          endPage = max - 2
        }
        
        // Adjust if we're near the end
        if (current >= total - sidePages - 1) {
          startPage = total - max + 3
        }
        
        // Add left ellipsis
        if (startPage > 2) {
          pages.push('...')
        }
        
        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i)
        }
        
        // Add right ellipsis
        if (endPage < total - 1) {
          pages.push('...')
        }
        
        // Always show last page
        pages.push(total)
      }
      
      return pages
    }
  },
  
  methods: {
    /**
     * Navigate to a specific page
     * @param {Number} page - Page number to navigate to
     */
    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) {
        return
      }
      
      /**
       * Page changed event
       * @event page-changed
       * @type {Object}
       * @property {Number} page - New page number
       * @property {Number} itemsPerPage - Current items per page
       */
      this.$emit('page-changed', {
        page,
        itemsPerPage: this.itemsPerPage
      })
    },
    
    /**
     * Handle items per page change
     * @param {Event} event - Change event from select element
     */
    handleItemsPerPageChange(event) {
      const newItemsPerPage = parseInt(event.target.value, 10)
      
      /**
       * Items per page changed event
       * @event items-per-page-changed
       * @type {Object}
       * @property {Number} page - Reset to page 1
       * @property {Number} itemsPerPage - New items per page value
       */
      this.$emit('items-per-page-changed', {
        page: 1, // Reset to first page when changing items per page
        itemsPerPage: newItemsPerPage
      })
    },
    
    /**
     * Determine if a page number should be hidden on mobile
     * @param {Number} page - Page number to check
     * @returns {Boolean}
     */
    hiddenOnMobile(page) {
      // On mobile, only show current page, first, last, and adjacent pages
      const current = this.currentPage
      const isFirstOrLast = page === 1 || page === this.totalPages
      const isCurrentOrAdjacent = Math.abs(page - current) <= 1
      
      return !isFirstOrLast && !isCurrentOrAdjacent
    }
  }
}
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
