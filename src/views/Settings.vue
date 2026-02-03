<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage your application settings</p>
    </div>
    
    <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-800">
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">General Settings</h3>
          <div class="space-y-4">
            <BaseInput
              label="Application Name"
              placeholder="Enter application name"
              model-value="Admin Panel"
            />
            <BaseInput
              label="Admin Email"
              type="email"
              placeholder="admin@example.com"
              model-value="admin@example.com"
            />
          </div>
        </div>
        
        <hr class="border-slate-200 dark:border-slate-800" />
        
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Notifications</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input type="checkbox" class="w-4 h-4 text-primary-600 rounded" checked />
              <span class="text-sm text-slate-700 dark:text-slate-300">Email notifications</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" class="w-4 h-4 text-primary-600 rounded" checked />
              <span class="text-sm text-slate-700 dark:text-slate-300">Push notifications</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" class="w-4 h-4 text-primary-600 rounded" />
              <span class="text-sm text-slate-700 dark:text-slate-300">SMS notifications</span>
            </label>
          </div>
        </div>
        
        <div class="flex justify-end gap-3">
          <button class="btn-secondary">Cancel</button>
          <button class="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '../components/ui/BaseInput.vue'

/**
 * Settings View
 * @component
 */
</script>
