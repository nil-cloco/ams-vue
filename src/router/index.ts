import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authstore'
import LogIn from '@/components/LogIn.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LogIn,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/artists',
      name: 'artists',
      component: () => import('../views/ArtistView.vue'),
    },
    {
      path: '/musics/:artist_id?',
      name: 'musics',
      component: () => import('../views/MusicView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: HomeView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    if (to.path !== '/') next()
    else next('/users')
  } else if (to.path !== '/') {
    next('/')
  } else {
    next()
  }
})

export default router
