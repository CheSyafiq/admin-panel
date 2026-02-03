<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
    <div class="w-full max-w-md">
      <div class="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-800">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary-600 dark:text-blue-500 mb-2">Admin Panel</h1>
          <p class="text-slate-600 dark:text-slate-400">Sign in to your account</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <BaseInput
            v-model="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            required
          />
          
          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
          />
          
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="w-4 h-4 text-primary-600 rounded" />
              <span class="text-sm text-slate-700 dark:text-slate-300">Remember me</span>
            </label>
            <a href="#" class="text-sm text-primary-600 dark:text-blue-400 hover:text-primary-700 dark:hover:text-blue-300">Forgot password?</a>
          </div>
          
          <button type="submit" class="w-full btn-primary">
            Sign In
          </button>
        </form>
        
        <p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account? 
          <a href="#" class="text-primary-600 dark:text-blue-400 hover:text-primary-700 dark:hover:text-blue-300 font-medium">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../components/ui/BaseInput.vue'

/**
 * Login View
 * Authentication page for users to sign in
 * 
 * @component
 */

const router = useRouter()
const email = ref('')
const password = ref('')

/**
 * Handle login form submission
 */
const handleLogin = () => {
  // Simple mock authentication
  localStorage.setItem('isAuthenticated', 'true')
  router.push('/dashboard')
}
</script>
