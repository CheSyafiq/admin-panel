<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses
    ]"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    <!-- Icon Slot -->
    <slot name="icon"></slot>
    
    <!-- Default Slot (Button Text) -->
    <slot></slot>
  </button>
</template>

<script>
/**
 * BaseButton Component
 * Reusable button component with multiple variants and sizes
 * Supports dark mode with high contrast colors
 * 
 * @component
 * 
 * @props {String} variant - Button style variant (primary, secondary, outline, ghost, danger)
 * @props {String} size - Button size (sm, md, lg)
 * @props {String} type - HTML button type
 * @props {Boolean} disabled - Whether button is disabled
 * @props {Boolean} loading - Whether button is in loading state
 * 
 * @emits click - Emitted when button is clicked
 * 
 * @example
 * <BaseButton variant="primary" size="md" @click="handleClick">
 *   Click Me
 * </BaseButton>
 */
export default {
  name: 'BaseButton',
  
  props: {
    /**
     * Button style variant
     * @values primary, secondary, outline, ghost, danger
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
    },
    /**
     * Button size
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    /**
     * HTML button type
     */
    type: {
      type: String,
      default: 'button'
    },
    /**
     * Whether button is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether button is in loading state
     */
    loading: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['click'],
  
  computed: {
    /**
     * Size classes based on size prop
     */
    sizeClasses() {
      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      }
      return sizes[this.size]
    },
    
    /**
     * Variant classes based on variant prop with dark mode support
     */
    variantClasses() {
      const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white focus:ring-blue-500',
        secondary: 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 focus:ring-slate-500',
        outline: 'border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500',
        ghost: 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500',
        danger: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white focus:ring-red-500'
      }
      return variants[this.variant]
    }
  },
  
  methods: {
    /**
     * Handle button click
     */
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
