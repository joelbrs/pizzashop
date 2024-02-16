import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginPage.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const $loginStore = useLoginStore()

  if (to.name !== 'login') {
    await $loginStore.SET_LOGGED_USER()

    if (!$loginStore.isLogged) {
      return { name: 'login' }
    }
  }
})

export default router
