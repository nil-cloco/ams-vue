import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => {
        switch (useAuthStore().getRole) {
          case 'super_admin':
            return "/users"
          case 'artist_manager':
            return "/artists"
          default:
            return "/musics"
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: import('@/components/LogIn.vue')
    },
    {
      path: '/users',
      name: 'users',
      beforeEnter: (to, from, next) => {
        if(['super_user'].includes(useAuthStore().getRole)) next()
        else next (from.path)
      },
      component: () => import('@/views/UserView.vue'),
    },
    {
      path: '/artists',
      name: 'artists',
      beforeEnter: (to, from, next) => {
        if(['super_user', 'artist_manager'].includes(useAuthStore().getRole)) next()
        else next (from.path)
      },
      component: () => import('@/views/ArtistView.vue'),
    },
    {
      path: '/musics/:artist_id?',
      name: 'musics',
      component: () => import('@/views/MusicView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      redirect: "/"
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    if (to.path == "/login") next("/")
    else next()
  } else {
    if (to.path == '/login') next()
    else next("/login")
  }
})

export default router
