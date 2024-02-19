import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'root',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/app/dashboard/index-page.vue')
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('../views/app/orders/index-page.vue')
        }
      ],
      component: () => import('../layouts/main-layout.vue')
    },
    {
      path: '/sign-in',
      name: 'login',
      component: () => import('../views/auth/login-page.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const $loginStore = useLoginStore()

  if (to.name === 'root' || !to.name) {
    return { name: 'dashboard' }
  }

  if (to.name !== 'login') {
    await $loginStore.SET_LOGGED_USER()

    if (!$loginStore.isLogged) {
      return { name: 'login' }
    }
  }
})

export default router
