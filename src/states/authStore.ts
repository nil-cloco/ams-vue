import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

  const getUser = computed(() => user.value)
  const getToken = computed(() => token.value)
  const getRole = computed(() => user.value?.role || "")
  const getUserId = computed(() => user.value?.id || null)
  const isAuthenticated = computed(() => token.value != null && user.value['id'] != null)

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function setUser(newUser) {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  function resetUser() {
    setToken(null)
    setUser({})
  }

  return {
    token,
    user,
    getUser,
    isAuthenticated,
    getToken,
    getRole,
    getUserId,
    setToken,
    setUser,
    resetUser,
  }
})
