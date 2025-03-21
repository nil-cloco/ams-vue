import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/states/authStore'
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
      component:() => import('@/views/LoginView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/signup',
      name: 'signup',
      component:() => import('@/views/SignupView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/users',
      name: 'users',
      beforeEnter: (to, from, next) => {
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
  if (useAuthStore().isAuthenticated) {
    if (to.path == "/login" || to.path == "/signup") next("/")
    else next()
  } else {
    if (to.path == '/login' || to.path == '/signup') next()
    else next("/login")
  }
})

export default router
