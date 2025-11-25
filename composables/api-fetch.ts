export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase,        // e.g. '/api'
    headers: { Accept: 'application/json' },
    retry: 1,
    onResponseError(ctx) {
      console.error('[API ERROR]', ctx.response.status, ctx.request, ctx.response._data)
    }
  })

  // unique key to avoid collisions with other plugins
  nuxtApp.provide('apiFetch', apiFetch)

  // debug (see both server & client consoles once)
  console.log('[api-fetch] plugin loaded; typeof apiFetch =', typeof apiFetch)
})
