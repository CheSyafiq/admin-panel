<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Profile</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage your profile information</p>
    </div>
    
    <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-800">
      <div class="space-y-6">
        <div class="flex items-center gap-6">
          <div class="w-24 h-24 rounded-full bg-primary-500 dark:bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            JD
          </div>
          <div>
            <button class="btn-primary text-sm">Change Photo</button>
            <p class="mt-2 text-xs text-slate-600 dark:text-slate-400">JPG, PNG or GIF (Max 2MB)</p>
          </div>
        </div>
        
        <hr class="border-slate-200 dark:border-slate-800" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            label="First Name"
            placeholder="Enter first name"
            model-value="John"
          />
          <BaseInput
            label="Last Name"
            placeholder="Enter last name"
            model-value="Doe"
          />
          <BaseInput
            label="Email"
            type="email"
            placeholder="Enter email"
            model-value="john.doe@example.com"
          />
          <BaseInput
            label="Phone"
            type="tel"
            placeholder="Enter phone number"
            model-value="+1 234 567 8900"
          />
        </div>
        
        <div>
          <BaseInput
            label="Bio"
            placeholder="Tell us about yourself"
            model-value="Full-stack developer with 5 years of experience"
          />
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
 * Profile View
 * @component
 */
</script>
