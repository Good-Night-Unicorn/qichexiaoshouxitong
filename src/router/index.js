import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    meta: { title: '产品列表' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    meta: { title: '产品详情' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: { title: '购物车', requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites.vue'),
    meta: { title: '收藏夹', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: '关于我们' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: '联系我们' }
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('../views/Guide.vue'),
    meta: { title: '智能汽车使用指南' }
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import('../views/Maintenance.vue'),
    meta: { title: '汽车保养维护指南' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    meta: { title: '订单结算', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { title: '个人中心', requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
    meta: { title: '我的订单', requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '404 - 页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '智车商城'
  
  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    const userStore = useUserStore()
    if (!userStore.isLoggedIn) {
      next('/login')
      return
    }
  }
  
  next()
})

export default router 