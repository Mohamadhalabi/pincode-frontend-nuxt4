// plugins/api.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Base URL from runtime config
  const config = useRuntimeConfig()
  const baseURL =
    (config.public as any)?.apiBase ||
    (config as any)?.apiBase ||
    '/api'

  const api = async <T = any>(path: string, opts: any = {}): Promise<T> => {
    // Build full URL
    const url = path.startsWith('http')
      ? path
      : `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

    // Headers
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(opts.headers || {}),
    }

    // Attach token on client
    if (process.client) {
      const token =
        localStorage.getItem('auth_token') ||
        localStorage.getItem('pk:token')

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      if (
        opts.method &&
        opts.method !== 'GET' &&
        !(opts.body instanceof FormData)
      ) {
        headers['Content-Type'] = 'application/json'
      }
    } else {
      // SSR: still set JSON for non-GET if no FormData
      if (
        opts.method &&
        opts.method !== 'GET' &&
        !(opts.body instanceof FormData)
      ) {
        headers['Content-Type'] = 'application/json'
      }
    }

    const fetchOpts: any = {
      method: opts.method || 'GET',
      headers,
      credentials: 'omit',      // 👈 important for your JWT / CORS setup
      mode: 'cors',
    }

    if (opts.body !== undefined) {
      fetchOpts.body =
        headers['Content-Type'] === 'application/json' &&
        !(opts.body instanceof FormData)
          ? JSON.stringify(opts.body)
          : opts.body
    }

    const res = await fetch(url, fetchOpts)

    const text = await res.text()
    let data: any
    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      data = text
    }

    if (!res.ok) {
      const err: any = new Error(
        (data && (data.message || data.error)) ||
          `HTTP ${res.status}`
      )
      err.status = res.status
      err.data = data
      throw err
    }

    return data as T
  }

  nuxtApp.provide('api', api)
})
