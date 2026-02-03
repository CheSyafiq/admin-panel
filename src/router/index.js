import { createRouter, createWebHistory } from 'vue-router'

/**
 * Vue Router Configuration
 * All routes are lazy-loaded for optimal performance
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/admin',
        component: () => import('../layouts/AdminLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('../views/Dashboard.vue'),
                meta: { 
                    title: 'Dashboard',
                    icon: 'dashboard'
                }
            },
            {
                path: '/users',
                name: 'Users',
                component: () => import('../views/Users.vue'),
                meta: { 
                    title: 'Users',
                    icon: 'users'
                }
            },
            {
                path: '/products',
                name: 'Products',
                component: () => import('../views/Products.vue'),
                meta: { 
                    title: 'Products',
                    icon: 'products'
                }
            },
            {
                path: '/orders',
                name: 'Orders',
                component: () => import('../views/Orders.vue'),
                meta: { 
                    title: 'Orders',
                    icon: 'orders'
                }
            },
            {
                path: '/analytics',
                name: 'Analytics',
                component: () => import('../views/Analytics.vue'),
                meta: { 
                    title: 'Analytics',
                    icon: 'analytics'
                }
            },
            {
                path: '/settings',
                name: 'Settings',
                component: () => import('../views/Settings.vue'),
                meta: { 
                    title: 'Settings',
                    icon: 'settings'
                }
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('../views/Profile.vue'),
                meta: { 
                    title: 'Profile',
                    icon: 'profile'
                }
            }
        ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { 
        title: 'Login',
        guest: true 
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      meta: { title: '404 - Page Not Found' }
    }
  ]
})

/**
 * Navigation Guard
 * Handles authentication checks before each route
 */
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title ? `${to.meta.title} - Admin Panel` : 'Admin Panel'
  
  // Check if route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && isAuthenticated) {
    // Redirect to dashboard if already authenticated and trying to access guest page
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
