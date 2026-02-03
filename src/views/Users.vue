<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Users</h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage your user accounts</p>
      </div>
      <button class="btn-primary">
        Add New User
      </button>
    </div>
    
    <!-- Filters -->
    <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 border border-slate-200 dark:border-slate-800">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BaseInput
          v-model="searchQuery"
          type="search"
          placeholder="Search users..."
        />
        <select v-model="selectedRole" class="input-base bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select v-model="selectedStatus" class="input-base bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button @click="applyFilters" class="btn-secondary">Apply Filters</button>
      </div>
    </div>
    
    <!-- Users Table -->
    <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <span class="text-sm font-medium text-primary-600 dark:text-blue-400">{{ user.initials }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ user.name }}</div>
                    <div class="text-sm text-slate-600 dark:text-slate-400 sm:hidden">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                <div class="text-sm text-slate-900 dark:text-slate-100">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-blue-900/30 text-primary-700 dark:text-blue-400">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  user.status === 'inactive' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                ]">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editUser(user)" class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Component -->
      <BasePagination
        :current-page="pagination.currentPage"
        :total-items="pagination.totalItems"
        :items-per-page="pagination.itemsPerPage"
        :items-per-page-options="[5, 10, 25, 50]"
        @page-changed="handlePageChange"
        @items-per-page-changed="handleItemsPerPageChange"
      />
    </div>
  </div>
</template>

<script>
import BaseInput from '../components/ui/BaseInput.vue'
import BasePagination from '../components/ui/BasePagination.vue'

/**
 * Users View
 * User management page with table, filters, and pagination
 * 
 * @component
 */
export default {
  name: 'Users',
  
  components: {
    BaseInput,
    BasePagination
  },
  
  data() {
    return {
      searchQuery: '',
      selectedRole: '',
      selectedStatus: '',
      
      // Mock user data (In real app, this would come from API)
      allUsers: this.generateMockUsers(97),
      
      // Pagination state
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 97 // This would come from API response
      }
    }
  },
  
  computed: {
    /**
     * Get users for current page
     * @returns {Array}
     */
    paginatedUsers() {
      const start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage
      const end = start + this.pagination.itemsPerPage
      return this.allUsers.slice(start, end)
    }
  },
  
  methods: {
    /**
     * Generate mock user data
     * @param {Number} count - Number of users to generate
     * @returns {Array}
     */
    generateMockUsers(count) {
      const users = []
      for (let i = 1; i <= count; i++) {
        users.push({
          id: i,
          name: `User ${i}`,
          initials: `U${i}`,
          email: `user${i}@example.com`,
          role: i % 2 === 0 ? 'Admin' : 'User',
          status: i % 3 === 0 ? 'inactive' : 'active'
        })
      }
      return users
    },
    
    /**
     * Handle page change from pagination component
     * @param {Object} payload - { page, itemsPerPage }
     */
    handlePageChange(payload) {
      this.pagination.currentPage = payload.page
      
      // In a real app, you would fetch data from API here
      // Example: this.fetchUsers(payload.page, payload.itemsPerPage)
      console.log('Fetching page:', payload.page, 'Items per page:', payload.itemsPerPage)
    },
    
    /**
     * Handle items per page change from pagination component
     * @param {Object} payload - { page, itemsPerPage }
     */
    handleItemsPerPageChange(payload) {
      this.pagination.currentPage = payload.page // Reset to page 1
      this.pagination.itemsPerPage = payload.itemsPerPage
      
      // In a real app, you would fetch data from API here
      console.log('Items per page changed:', payload.itemsPerPage)
    },
    
    /**
     * Apply filters and reset pagination
     */
    applyFilters() {
      // Reset to first page when filters are applied
      this.pagination.currentPage = 1
      
      // In a real app, you would fetch filtered data from API here
      console.log('Applying filters:', {
        search: this.searchQuery,
        role: this.selectedRole,
        status: this.selectedStatus
      })
    },
    
    /**
     * Edit user
     * @param {Object} user - User object to edit
     */
    editUser(user) {
      console.log('Editing user:', user)
      // In real app, open edit modal or navigate to edit page
    },
    
    /**
     * Delete user
     * @param {Number} userId - ID of user to delete
     */
    deleteUser(userId) {
      console.log('Deleting user:', userId)
      // In real app, show confirmation dialog and call API
    }
  }
}
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
