/**
 * Dashboard Sidebar Menu Configuration
 * 
 * This file defines the sidebar menu structure for different user roles.
 * Each role has its own menu configuration with support for nested submenus.
 * 
 * @module configs/dashboardSidebar
 */

export default {
  /**
   * Admin role menu configuration
   * Full access to all features and management pages
   */
  admin: [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'Users',
      route: '/users',
      icon: 'users',
    //   badge: '3',
    },
    {
      title: 'Products',
      route: '/products',
      namespace: '/products/*',
      icon: 'products',
      sub: [
        { title: 'All Products', route: '/products' },
        { title: 'Add Product', route: '/products/add' },
        { title: 'Categories', route: '/products/categories' },
      ],
    },
    {
      title: 'Orders',
      route: '/orders',
      namespace: '/orders/*',
      icon: 'orders',
      sub: [
        { title: 'All Orders', route: '/orders' },
        { title: 'Pending', route: '/orders/pending' },
        { title: 'Completed', route: '/orders/completed' },
      ],
    },
    {
      title: 'Analytics',
      route: '/analytics',
      icon: 'analytics',
    },
    {
      title: 'Settings',
      route: '/settings',
      icon: 'settings',
    },
  ],

  /**
   * Vendor role menu configuration
   * Limited access to vendor-specific features
   */
  vendor: [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'My Products',
      route: '/vendor/products',
      namespace: '/vendor/products/*',
      icon: 'products',
      sub: [
        { title: 'All Products', route: '/vendor/products' },
        { title: 'Add Product', route: '/vendor/products/add' },
      ],
    },
    {
      title: 'My Orders',
      route: '/vendor/orders',
      icon: 'orders',
    },
    {
      title: 'Analytics',
      route: '/vendor/analytics',
      icon: 'analytics',
    },
    {
      title: 'Settings',
      route: '/settings',
      icon: 'settings',
    },
  ],

  /**
   * User role menu configuration
   * Basic user access to essential features
   */
  user: [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'My Orders',
      route: '/user/orders',
      icon: 'orders',
    },
    {
      title: 'Profile',
      route: '/profile',
      icon: 'profile',
    },
    {
      title: 'Settings',
      route: '/settings',
      icon: 'settings',
    },
  ],
}
