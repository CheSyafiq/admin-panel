<template>
  <div
    :class="[
      'bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none transition-colors',
      shadowClasses,
      hoverClasses,
      paddingClasses
    ]"
  >
    <!-- Card Header (Optional) -->
    <div
      v-if="$slots.header || title"
      class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"
    >
      <slot name="header">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ title }}</h3>
      </slot>
    </div>
    
    <!-- Card Body -->
    <div :class="bodyPaddingClasses">
      <slot></slot>
    </div>
    
    <!-- Card Footer (Optional) -->
    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
/**
 * BaseCard Component
 * Reusable card container with header and footer slots
 * Supports dark mode with high contrast slate colors
 * 
 * @component
 * 
 * @props {String} title - Card title (if not using header slot)
 * @props {String} shadow - Shadow size (none, sm, md, lg)
 * @props {Boolean} hoverable - Whether card has hover effect
 * @props {String} padding - Padding size (none, sm, normal, lg)
 * 
 * @example
 * <BaseCard title="Card Title" shadow="md">
 *   <p>Card content goes here</p>
 *   <template #footer>
 *     <button>Action</button>
 *   </template>
 * </BaseCard>
 */
export default {
  name: 'BaseCard',
  
  props: {
    /**
     * Card title (if not using header slot)
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Shadow size
     * @values none, sm, md, lg
     */
    shadow: {
      type: String,
      default: 'sm',
      validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
    },
    /**
     * Whether card has hover effect
     */
    hoverable: {
      type: Boolean,
      default: false
    },
    /**
     * Padding size
     * @values none, sm, normal, lg
     */
    padding: {
      type: String,
      default: 'normal',
      validator: (value) => ['none', 'sm', 'normal', 'lg'].includes(value)
    }
  },
  
  computed: {
    /**
     * Shadow classes based on shadow prop
     */
    shadowClasses() {
      const shadows = {
        none: '',
        sm: 'shadow-sm dark:shadow-none',
        md: 'shadow-md dark:shadow-none',
        lg: 'shadow-lg dark:shadow-none'
      }
      return shadows[this.shadow]
    },
    
    /**
     * Hover classes if hoverable
     */
    hoverClasses() {
      return this.hoverable ? 'hover:shadow-lg dark:hover:shadow-none dark:hover:border-slate-700 transition-all duration-200 cursor-pointer' : ''
    },
    
    /**
     * Padding classes based on padding prop
     */
    paddingClasses() {
      return this.padding === 'none' ? '' : ''
    },
    
    /**
     * Body padding classes
     */
    bodyPaddingClasses() {
      const paddings = {
        none: '',
        sm: 'p-4',
        normal: 'p-6',
        lg: 'p-8'
      }
      return paddings[this.padding]
    }
  }
}
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
