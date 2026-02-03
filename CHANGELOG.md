# Changelog

All notable changes to this project will be documented in this file.

## [2026-02-03] - Internationalization (i18n) System

### Added
- [2026-02-03] - FEATURE - Implemented multi-language support with English and Malay (Bahasa Melayu)
  - Created useLanguage.js composable for language state management with localStorage persistence
  - Added language switcher dropdown in Navbar with globe icon (Iconify Heroicons)
  - Created translation files: en.js (English) and ms.js (Malay) in src/locales/
  - Implemented translate() helper function with dot-notation key path support
  - Updated Dashboard.vue with full internationalization (page header, stats, charts, tables)
  - Language preference persists across page refreshes via localStorage
  - Language switcher shows current language code (EN/MS) with checkmark for active selection
  - Added translation keys for all common UI elements (search, buttons, status labels)
  - Organized translations by feature: common, navbar, dashboard, users, products, orders, etc.
  - Dashboard charts now use translated labels and categories
  - Added comprehensive documentation in instruction.md Section 16
  - Translation method (t()) added to all views for easy text localization

## [2026-02-03] - Reusable Chart Components

### Added
- [2026-02-03] - FEATURE - Created reusable ApexCharts components for better maintainability and API integration
  - Created ApexBarChart.vue component with dark mode support and flexible props
  - Created ApexAreaChart.vue component with gradient fill and theme awareness
  - Created ApexRadialChart.vue component for circular progress displays
  - Created ApexDonutChart.vue component with center total display
  - All chart components automatically respond to theme changes via darkModeState
  - Charts accept data via props for easy API binding (series, categories, labels, colors)
  - Included formatter function props for custom Y-axis and tooltip formatting
  - Added comprehensive documentation in instruction.md Section 15
  - Dashboard.vue refactored to use new chart components (cleaner, more maintainable)
  - Charts use consistent theme-aware colors: slate-400/500 for text, slate-700/100 for grid

## [2026-02-03] - Dark Mode Implementation

### Added
- [2026-02-03] - FEATURE - Implemented dark/light mode toggle across all templates
  - Created useDarkMode.js composable for theme state management with localStorage persistence
  - Added dark mode toggle button in Navbar with sun/moon icons (Iconify Heroicons)
  - Applied dark mode variants using high contrast slate colors per main.css standards
  - Updated Navbar component with slate-900 bg and slate-200 text for dark mode
  - Updated Sidebar component with slate-900 bg, slate-400 text, and blue-900/30 active states
  - Updated AdminLayout component with slate-950 background for dark mode
  - Converted BaseCard from script setup to Options API with dark mode variants
  - Converted BaseButton from script setup to Options API with dark mode variants
  - Converted BaseInput from script setup to Options API with dark mode variants
  - All components now use slate color palette instead of gray for better contrast
  - Converted all SVG icons in Navbar to Iconify components (Heroicons)
  - Theme preference persists across page refreshes via localStorage
  - Dark mode uses Tailwind's class strategy with 'dark' class on <html> element
  - Smooth transitions between light and dark themes
  - High contrast ratios maintained (slate-100 on slate-950) per accessibility standards

## [2026-02-03] - Sidebar State Management Refactor

### Changed
- [2026-02-03] - REFACTOR - Simplified sidebar state management to use reactive object instead of composable pattern
  - Replaced useSidebar composable with direct reactive state object export
  - Changed from ref-based state to reactive object (sidebarState)
  - Components now directly import and access sidebarState object
  - Removed need for .value access and composable initialization in created() lifecycle
  - Exported standalone toggle, open, and close functions
  - Sidebar now properly hides/shows when clicking hamburger menu
  - Simpler and more straightforward state management approach

## [2026-02-03] - Options API Conversion (Project Standards Compliance)

### Modified
- [2026-02-03] - REFACTOR - Converted all components from Composition API to Options API per instruction.md
  - **Sidebar.vue**: Removed setup() function, converted to Options API structure
    - Moved state to data() method (openSubmenus)
    - Converted computed properties from setup() to computed object
    - Moved all methods from setup() to methods object
    - Used this.$route instead of useRoute()
    - Used this.$set for reactive property updates
    - Maintained all functionality: role-based menus, nested submenus, icons, animations
  - **Navbar.vue**: Removed setup() function, converted to Options API structure
    - Moved state to data() method (isProfileMenuOpen)
    - Moved all methods from setup() to methods object
    - Used this.$router instead of useRouter()
    - Maintained all functionality: profile menu, logout, sidebar toggle
  - **useSidebar.js**: Updated composable to work with Options API
    - Exposed functions that return computed values
    - Made methods directly callable from components
    - Maintained global state management for sidebar
  - All components now follow instruction.md section 6: Options API structure (data, methods, computed, props, mounted)
  - No setup() function used anywhere
  - Full JSDoc documentation preserved

## [2026-02-03] - Navbar Component Standards Compliance

### Modified
- [2026-02-03] - REFACTOR - Converted Navbar.vue from `<script setup>` to `export default` syntax
  - Changed from `<script setup>` to standard `export default` structure per project standards
  - Wrapped component logic in setup() function with proper return statement
  - Added component name property ('Navbar')
  - Maintained all existing functionality: sidebar toggle, profile menu, notifications, search
  - Fixed potential state management issues with useSidebar composable
  - Full JSDoc documentation preserved
  - All methods properly exposed via return object: toggleSidebar, toggleProfileMenu, closeProfileMenu, handleLogout

## [2026-02-03] - Sidebar Component with Iconify Font Awesome Icons

### Modified
- [2026-02-03] - REFACTOR - Updated Sidebar.vue to use Iconify with Font Awesome icons
  - Integrated @iconify/vue Icon component for universal iconography
  - Replaced inline SVG icons with Font Awesome icons via Iconify (fa6-solid: prefix)
  - Icon mapping: dashboard (house), users (users), products (box), orders (bag-shopping), analytics (chart-line), settings (gear), profile (user)
  - Replaced getIconComponent method with getIconName method that returns Iconify icon identifiers
  - Updated logo to use fa6-solid:bolt icon
  - Updated chevron icon in submenu toggles to fa6-solid:chevron-down
  - Registered Icon component in export default components section
  - Maintains all existing functionality: role-based menus, nested submenus, namespace routing, responsive behavior
  - Full JSDoc documentation following project standards

## [2026-02-03] - Sidebar Component Enhancement

### Modified
- [2026-02-03] - REFACTOR - Updated Sidebar.vue component in /src/components/layout
  - Refactored from `<script setup>` to standard `export default` syntax per project standards
  - Integrated dynamic menu structure from src/configs/dashboardSidebar.js
  - Implemented role-based menu rendering with userRole prop (admin, vendor, user)
  - Added support for nested submenus with collapsible functionality
  - Implemented namespace-based active state highlighting for parent menu items
  - Added smooth animations for submenu expansion/collapse
  - Created icon mapping system for all menu icons (dashboard, users, products, orders, analytics, settings, profile)
  - Maintained responsive behavior: drawer on mobile, collapsible on desktop
  - Added comprehensive JSDoc documentation for all props and methods
  - Badge support for menu items (e.g., notification counts)
  - Auto-close sidebar on mobile after navigation
  - Keyboard-friendly submenu toggle buttons

## [2026-02-03] - Pagination Component Implementation

### Added
- [2026-02-03] - FEATURE - Created BasePagination.vue component in /src/components/ui
  - Dynamic "Items Per Page" selector with customizable options
  - Intelligent page number display with ellipsis for large datasets
  - Responsive design: hides page numbers on mobile, showing only current, adjacent, first, and last pages
  - Emits `page-changed` event with { page, itemsPerPage } for parent component API calls
  - Emits `items-per-page-changed` event when items per page is modified
  - Includes Previous/Next navigation buttons with disabled states
  - Shows item range information (e.g., "Showing 1 to 10 of 97 entries")
  - Props: currentPage, totalItems, itemsPerPage, itemsPerPageOptions, maxVisiblePages
  - Computed properties for smart page calculation and display
  - Full JSDoc documentation for all props, emits, and methods
  - Accessibility features: ARIA labels and current page indicator
  - Mobile-first responsive layout with flexbox
- [2026-02-03] - REFACTOR - Updated Users.vue to demonstrate BasePagination usage
  - Converted from <script setup> to export default syntax (per instruction.md)
  - Added mock user data generation (97 users)
  - Implemented pagination state management
  - Added handlePageChange and handleItemsPerPageChange methods
  - Computed property for paginated user display
  - Added filter state management (role, status)
  - Ready for API integration with console.log examples
- [2026-02-03] - DOCS - Added comprehensive JSDoc comments for all methods in Users.vue

## [2026-02-03] - Chart Library Integration

### Added
- [2026-02-03] - LIBRARY - Installed ApexCharts and vue3-apexcharts for data visualization
- [2026-02-03] - FEATURE - Integrated ApexCharts into Dashboard with multiple chart types:
  - Bar Chart: Monthly sales performance with tooltip formatting
  - Radial Chart: Monthly target progress with percentage display
  - Area Chart: Revenue trend with gradient fill and smooth curves
  - Donut Chart: Sales by category breakdown
- [2026-02-03] - REFACTOR - Converted Dashboard.vue from <script setup> to export default syntax (per instruction.md standards)
- [2026-02-03] - FEATURE - Made all charts accept data via props for easy API binding
- [2026-02-03] - FEATURE - Added interactive chart features:
  - Custom color schemes matching Tailwind config
  - Formatted tooltips with currency values
  - Responsive chart sizing
  - Custom legends and labels

## [2026-02-03] - Complete Admin Panel Implementation

### Added
- [2026-02-03] - SETUP - Installed traditional Tailwind CSS with PostCSS configuration
- [2026-02-03] - SETUP - Created tailwind.config.js with primary, secondary, and accent color schemes
- [2026-02-03] - SETUP - Added comprehensive responsive breakpoints for modern devices (xs to 5xl)
  - xs: 475px (large phones)
  - sm: 640px (tablets portrait)
  - md: 768px (tablets landscape)
  - lg: 1024px (laptops/desktops)
  - xl: 1280px (large laptops/desktops)
  - 2xl: 1536px (larger desktops)
  - 3xl: 1920px (Full HD displays)
  - 4xl: 2560px (2K/QHD displays)
  - 5xl: 3840px (4K/UHD displays)
- [2026-02-03] - SETUP - Created main.css with @tailwind directives and reusable component patterns
- [2026-02-03] - FEATURE - Created BaseInput.vue component in /src/components/ui
  - Supports label, placeholder, error message, and helper text
  - Implements v-model for two-way data binding
  - Includes disabled and required states
  - Mobile-first responsive design with Tailwind utilities
  - JSDoc documentation for all props and emits
  - Emits blur and focus events for parent component handling
  - Uses primary/secondary color scheme from Tailwind config
- [2026-02-03] - FEATURE - Created BaseButton.vue component in /src/components/ui
  - Multiple variants: primary, secondary, outline, ghost, danger
  - Three sizes: sm, md, lg
  - Loading state with spinner
  - Icon slot support
  - Full accessibility with focus states
- [2026-02-03] - FEATURE - Created BaseCard.vue component in /src/components/ui
  - Header, body, and footer slots
  - Configurable shadow levels
  - Optional hover effects
  - Flexible padding options
- [2026-02-03] - SETUP - Installed and configured Vue Router 4
- [2026-02-03] - ROUTING - Created complete routing system in /src/router/index.js
  - Lazy-loaded routes for optimal performance
  - Navigation guards for authentication
  - Protected routes with meta fields
  - Nested routes under AdminLayout
  - 404 page handling
- [2026-02-03] - COMPOSABLE - Created useSidebar.js composable for sidebar state management
  - Reactive sidebar open/close state
  - Automatic responsive behavior (mobile/desktop)
  - Window resize listener
  - Toggle, open, close methods
- [2026-02-03] - LAYOUT - Created Navbar.vue component in /src/components/layout
  - Responsive hamburger menu for mobile
  - Search bar (hidden on mobile)
  - Notifications with badge
  - Profile dropdown menu
  - Logout functionality
- [2026-02-03] - LAYOUT - Created Sidebar.vue component in /src/components/layout
  - Collapsible navigation menu
  - Drawer mode on mobile with overlay
  - Active route highlighting
  - SVG icons for menu items
  - Auto-close on mobile after navigation
- [2026-02-03] - LAYOUT - Created AdminLayout.vue wrapper in /src/layouts
  - Combines Navbar and Sidebar
  - Responsive main content area
  - Page transition animations
  - Handles sidebar state initialization
- [2026-02-03] - VIEW - Created Dashboard.vue page
  - Statistics cards with icons
  - Recent activity feed
  - Top products list
  - Responsive grid layout
- [2026-02-03] - VIEW - Created Users.vue page
  - User management table
  - Search and filters
  - Pagination
  - Responsive table with hidden columns on mobile
- [2026-02-03] - VIEW - Created Products.vue page (placeholder)
- [2026-02-03] - VIEW - Created Orders.vue page (placeholder)
- [2026-02-03] - VIEW - Created Analytics.vue page (placeholder)
- [2026-02-03] - VIEW - Created Settings.vue page
  - General settings form
  - Notification preferences
  - Uses BaseInput component
- [2026-02-03] - VIEW - Created Profile.vue page
  - Profile photo management
  - Personal information form
  - Bio field
  - Grid layout for form fields
- [2026-02-03] - VIEW - Created Login.vue page
  - Authentication form
  - Remember me checkbox
  - Mock authentication
  - Centered layout with card design
- [2026-02-03] - VIEW - Created NotFound.vue (404 page)
- [2026-02-03] - SETUP - Updated App.vue to use router-view
- [2026-02-03] - SETUP - Updated main.js to initialize Vue Router

### Project Structure
```
/src
  /assets
    /css
      - main.css (Tailwind + custom patterns)
  /components
    /ui
      - BaseInput.vue
      - BaseButton.vue
      - BaseCard.vue
    /layout
      - Navbar.vue
      - Sidebar.vue
  /layouts
    - AdminLayout.vue
  /composables
    - useSidebar.js
  /router
    - index.js
  /views
    - Dashboard.vue
    - Users.vue
    - Products.vue
    - Orders.vue
    - Analytics.vue
    - Settings.vue
    - Profile.vue
    - Login.vue
    - NotFound.vue
  - App.vue
  - main.js
```

### Features
- ✅ Fully responsive admin panel (mobile-first design)
- ✅ Collapsible sidebar with drawer mode on mobile
- ✅ Protected routes with authentication guards
- ✅ Lazy-loaded pages for optimal performance
- ✅ Reusable UI components following project standards
- ✅ Clean separation of concerns
- ✅ JSDoc documentation for all components
- ✅ Tailwind CSS utility-first styling
- ✅ Vue 3 Composition API with `<script setup>`
- ✅ Mobile-first responsive breakpoints
