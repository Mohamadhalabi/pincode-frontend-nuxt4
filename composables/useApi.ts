import type { $Fetch } from 'ofetch'
import { $fetch } from 'ofetch'

export const useApi = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  const client: $Fetch = $fetch.create({
    baseURL: config.public.apiBase, // e.g. '/api' via proxy
    headers: { Accept: 'application/json' },
    retry: 1,
    onResponseError(ctx) {
      console.error('[API ERROR]', ctx.response.status, ctx.request, ctx.response._data)
    }
  })

  const get = <T=any>(url: string, opts: any = {}) => {
    const q = { ...(opts.query || {}), lang: locale.value }
    return client<T>(url, { method: 'GET', ...opts, query: q })
  }

  return { get, client }
}
