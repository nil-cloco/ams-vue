import { useAuthStore } from '@/stores/authStore'
import ApiService from './ApiService'
import router from '@/router'

class AuthService extends ApiService {

  private authStore = useAuthStore()

  async login(payload) {
    return new Promise((resolve, reject) => {
      const url = '/login'
      this.apiClient.post(url, { user: payload }).then(res => {
        const user = res.data.data || {}
        const token = res.headers['authorization'].split(' ')[1] || ''
        this.authStore.setToken(token)
        this.authStore.setUser(user)
        router.go(0)
      }).catch(err => {
        reject(err)
      })
    })
  }

  async register(payload) {
    return new Promise((resolve, reject) => {
      const url = '/signup'
      this.apiClient.post(url, { user: payload }).then(res => {
        router.push('/login')
      }).catch(err => {
        reject(err)
      })
    })
  }

  logout() {
    this.authStore.resetUser()
    router.go(0)
  }
}

export default AuthService
