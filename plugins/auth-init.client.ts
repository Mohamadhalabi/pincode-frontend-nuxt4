// plugins/auth-init.client.ts
export default defineNuxtPlugin(async (nuxtApp) => {
  const TOKEN_KEY = 'auth_token'
  const USER_KEY  = 'auth_user'

  const token = useState<string | null>('auth:token', () => null)
  const user  = useState<any | null>('auth:user',  () => null)

  // restore from localStorage
  try {
    const t = localStorage.getItem(TOKEN_KEY)
    const u = localStorage.getItem(USER_KEY)
    if (t) token.value = t
    if (u) user.value = JSON.parse(u)
  } catch {}

  // if we have a token but no user, fetch it
  if (token.value && !user.value) {
    const { $api } = nuxtApp
    try {
      const me: any = await $api('/me', { method: 'GET' })
      user.value = me?.user ?? me ?? null
      localStorage.setItem(USER_KEY, JSON.stringify(user.value || null))
    } catch {
      token.value = null
      user.value = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }
})
