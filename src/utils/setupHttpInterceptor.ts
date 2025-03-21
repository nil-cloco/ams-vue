import { useAuthStore } from '@/states/authStore'
import axios from 'axios'
import router from '@/router'
import { useToast } from 'primevue'
import { useUiStore } from '@/states/uiStore'
import { promise } from 'zod'

export default function setupInterceptors() {
  const authStore = useAuthStore()
  const uiStore = useUiStore();

  axios.defaults.baseURL = 'http://localhost:3000/'
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.getToken

  axios.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status < 200 || error.response.status >= 300) {
        uiStore.showToast(error.response.statusText, error.response.data['error'] || error.response.data)
        if(error.response.status == 401) {
          authStore.resetUser();
          router.go(0)
        }
      }
      return Promise.reject(error.response)
    },
  )
}
