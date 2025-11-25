// composables/useAuth.ts
import { computed, onMounted } from 'vue'

type User = Record<string, any> | null

const TOKEN_KEY = 'auth_token'
const USER_KEY  = 'auth_user'

// you also use this in AppHeader, so treat it as a token too
const LEGACY_TOKEN_KEY = 'pk:token'
const LEGACY_USER_KEY  = 'pk:user' // if you ever stored it

function extractUser(res: any): User {
  return res?.user ?? res?.data?.user ?? res?.data ?? res ?? null
}

export function useAuth() {
  const { $api } = useNuxtApp() as any

  const state = useState('auth', () => {
    let cached: User = null
    if (process.client) {
      try { cached = JSON.parse(localStorage.getItem(USER_KEY) || 'null') } catch {}
      if (!cached) {
        try { cached = JSON.parse(localStorage.getItem(LEGACY_USER_KEY) || 'null') } catch {}
      }
    }
    return { user: cached as User, ready: false }
  })

  const token = () => {
    if (!process.client) return null
    return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY)
  }

  const setToken = (t?: string | null) => {
    if (!process.client) return
    if (t) {
      localStorage.setItem(TOKEN_KEY, t)
      localStorage.setItem(LEGACY_TOKEN_KEY, t) // keep both in sync
    } else {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(LEGACY_TOKEN_KEY)
    }
  }

  const setUser = (u: User) => {
    state.value.user = u
    if (!process.client) return
    if (u) {
      localStorage.setItem(USER_KEY, JSON.stringify(u))
      localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(u))
    } else {
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(LEGACY_USER_KEY)
    }
  }

  const loadUser = async () => {
    try {
      const res: any = await $api('/me', { method: 'GET' })
      setUser(extractUser(res))
    } catch {
      setUser(null)
    }
  }

  onMounted(async () => {
    if (state.value.ready) return
    if (token() && !state.value.user) await loadUser()
    state.value.ready = true
  })

  const login = async (payloadOrEmail: any, maybePassword?: string) => {
    const payload = typeof payloadOrEmail === 'string'
      ? { email: payloadOrEmail, password: maybePassword }
      : payloadOrEmail

    const res: any = await $api('/auth/login', { method: 'POST', body: payload })
    const t = res?.token || res?.data?.token
    if (t) setToken(t)

    const u = extractUser(res)
    if (u) setUser(u)
    else await loadUser()

    return state.value.user
  }

  const register = async (payload: any) => {
    const res: any = await $api('/auth/register', { method: 'POST', body: payload })
    const t = res?.token || res?.data?.token
    if (t) setToken(t)

    const u = extractUser(res)
    if (u) setUser(u)
    else await loadUser()

    return state.value.user
  }

  const logout = async () => {
    try { await $api('/auth/logout', { method: 'POST' }) } catch {}

    // IMPORTANT: clear EVERYTHING that could keep you "logged in"
    setToken(null)
    setUser(null)

    // just in case your backend stored other keys
    if (process.client) {
      localStorage.removeItem('pk:token')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('pk:user')
    }
  }

  return {
    user: computed(() => state.value.user),
    ready: computed(() => state.value.ready),
    isLoggedIn: computed(() => !!state.value.user || !!token()),
    login,
    register,
    logout,
    reloadUser: loadUser,
  }
}
