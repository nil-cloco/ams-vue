import { useAuthStore } from '@/stores/authstore'
import axios from 'axios'

export default function setupInterceptors() {
  const authStore = useAuthStore()

  axios.defaults.baseURL = 'http://localhost:3000/'
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

  axios.interceptors.request.use(
    function (config) {
      // console.log(config)
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  axios.interceptors.response.use(
    function (response) {
      // console.log(response)
      return response
    },
    function (error) {
      console.log(error.toJSON())
      return {}
    },
  )
}
