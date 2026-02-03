<template>
  <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md dark:hover:shadow-none transition-shadow duration-200">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <h4 class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ title }}</h4>
        </div>
        <p class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{{ value }}</p>
        <div class="flex items-center gap-2">
          <span 
            :class="[
              'inline-flex items-center gap-1 text-sm font-medium',
              trend === 'up' ? 'text-success-600' : 'text-danger-600'
            ]"
          >
            <svg 
              v-if="trend === 'up'"
              class="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <svg 
              v-else
              class="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            {{ change }}
          </span>
          <span class="text-sm text-slate-600 dark:text-slate-400">{{ label }}</span>
        </div>
      </div>
      <div 
        :class="[
          'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0',
          iconBgClass
        ]"
      >
        <slot name="icon">
          <svg class="w-7 h-7" :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * StatCard Component
 * Statistics card with icon, value, and trend indicator
 * 
 * @component
 */
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    change: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    trend: {
      type: String,
      default: 'up',
      validator: (value) => ['up', 'down'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
    }
  },
  computed: {
    iconBgClass() {
      const variants = {
        primary: 'bg-primary-50 dark:bg-blue-900/20',
        success: 'bg-success-50 dark:bg-green-900/20',
        warning: 'bg-warning-50 dark:bg-yellow-900/20',
        danger: 'bg-danger-50 dark:bg-red-900/20',
        info: 'bg-blue-50 dark:bg-blue-900/20'
      }
      return variants[this.variant]
    },
    iconClass() {
      const variants = {
        primary: 'text-primary-600 dark:text-blue-400',
        success: 'text-success-600 dark:text-green-400',
        warning: 'text-warning-600 dark:text-yellow-400',
        danger: 'text-danger-600 dark:text-red-400',
        info: 'text-blue-600 dark:text-blue-400'
      }
      return variants[this.variant]
    }
  }
}
</script>
