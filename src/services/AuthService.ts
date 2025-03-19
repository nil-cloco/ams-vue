import { useAuthStore } from '@/stores/authstore'
import ApiService from './ApiService'
import router from '@/router'

class AuthService extends ApiService {
  private authStore = useAuthStore()
  async login(payload) {
    const url = '/login'
    const res = await this.apiClient.post(url, { user: payload })
    const user = res.data.data || {}
    const token = res.headers['authorization'].split(' ')[1] || ''
    this.authStore.setToken(token)
    this.authStore.setUser(user)
    router.go(0)
  }

  logout() {
    this.authStore.resetUser()
    router.go(0)
  }
}

export default AuthService
