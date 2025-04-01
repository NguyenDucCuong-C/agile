import { createRouter, createWebHistory } from 'vue-router'

// User views
import Home from '../views/user/Home.vue'
import Products from '../views/user/Products.vue'
import ProductDetail from '../views/user/ProductDetail.vue'
import Cart from '../views/user/Cart.vue'
import OrderHistory from '../views/user/OrderHistory.vue'

// Admin views
import Admin from '../views/admin/Admin.vue'
import AdminProducts from '../views/admin/AdminProducts.vue'
import OrderManagement from '../views/admin/OrderManagement.vue'

// Auth views
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/orders',
    name: 'OrderHistory',
    component: OrderHistory,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/orders',
    name: 'OrderManagement',
    component: OrderManagement,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  const isAuthenticated = !!user
  const isAdmin = user && user.role === 'admin'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router 