
import { defineStore } from 'pinia'
type User = { id:number; name:string; email:string } | null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    user: null as User,
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    async login(email: string, password: string) {
      // Adjust endpoints to your Laravel API
      const { public: { apiBase } } = useRuntimeConfig()
      const { token, user } = await $fetch('/auth/login', {
        method: 'POST',
        baseURL: apiBase,
        body: { email, password }
      })
      this.token = token
      this.user = user
    },
    logout() {
      this.token = ''
      this.user = null
    }
  },
  persist: {
    paths: ['token','user']
  }
})
