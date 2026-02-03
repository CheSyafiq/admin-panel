<template>
  <div class="w-full">
    <!-- Label -->
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input Field -->
    <input
      :id="inputId"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="[
        'w-full rounded-lg border px-4 py-2 text-slate-900 dark:text-slate-100 transition-colors',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none',
        'dark:placeholder-slate-500',
        {
          'border-red-500 dark:border-red-400': error,
          'border-slate-300 dark:border-slate-700': !error,
          'bg-slate-100 dark:bg-slate-800 cursor-not-allowed': disabled,
          'bg-white dark:bg-slate-900': !disabled
        }
      ]"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @input="handleInput"
    />

    <!-- Error Message -->
    <p 
      v-if="error" 
      class="mt-2 text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </p>

    <!-- Helper Text -->
    <p 
      v-if="helperText && !error" 
      class="mt-2 text-sm text-slate-500 dark:text-slate-400"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script>
/**
 * BaseInput Component
 * A reusable input component with label, error message, and helper text support
 * Supports dark mode with high contrast slate colors
 * 
 * @component
 * 
 * @props {String} modelValue - The v-model value for two-way binding
 * @props {String} label - Label text displayed above the input
 * @props {String} type - HTML input type (text, email, password, etc.)
 * @props {String} placeholder - Placeholder text for the input
 * @props {String} error - Error message to display below the input
 * @props {String} helperText - Helper text displayed when there's no error
 * @props {Boolean} disabled - Whether the input is disabled
 * @props {Boolean} required - Whether the input is required
 * 
 * @emits update:modelValue - Emitted when input value changes
 * @emits blur - Emitted when input loses focus
 * @emits focus - Emitted when input gains focus
 * 
 * @example
 * <BaseInput
 *   v-model="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Invalid email format"
 *   required
 * />
 */
export default {
  name: 'BaseInput',
  
  props: {
    /**
     * The v-model value for two-way binding
     */
    modelValue: {
      type: [String, Number],
      default: ''
    },
    /**
     * Label text displayed above the input
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * HTML input type
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * Placeholder text for the input
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * Error message to display below the input
     */
    error: {
      type: String,
      default: ''
    },
    /**
     * Helper text displayed when there's no error
     */
    helperText: {
      type: String,
      default: ''
    },
    /**
     * Whether the input is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the input is required
     */
    required: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['update:modelValue', 'blur', 'focus'],
  
  computed: {
    /**
     * Generate unique input ID
     */
    inputId() {
      return `input-${Math.random().toString(36).substr(2, 9)}`
    }
  },
  
  methods: {
    /**
     * Handle input change and emit update event
     */
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
/* Additional component-specific styles if needed */
/* Prefer Tailwind utility classes over custom styles */
</style>
