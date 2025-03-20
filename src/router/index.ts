import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'
const authGuard = (to, from, next) => {
  if (useAuthStore().isAuthenticated) {
    next("/")
  } else {
    next()
  }
}
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
      component: import('@/components/LogIn.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/signup',
      name: 'signup',
      component: import('@/components/SignUp.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/users',
      name: 'users',
      beforeEnter: (to, from, next) => {
        console.log(useAuthStore().getRole)
        if (['super_admin'].includes(useAuthStore().getRole)) next()
        else next(from.path)
      },
      component: () => import('@/views/UserView.vue'),
    },
    {
      path: '/artists',
      name: 'artists',
      beforeEnter: (to, from, next) => {
        if (['super_admin', 'artist_manager'].includes(useAuthStore().getRole)) next()
        else next(from.path)
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
  console.log(to, from, next)
  if (useAuthStore().isAuthenticated) {
    if (to.path == "/login" || to.path == "/signup") next("/")
    else next()
  } else {
    if (to.path == '/login' || to.path == '/signup') next()
    else next("/login")
  }
})

export default router
