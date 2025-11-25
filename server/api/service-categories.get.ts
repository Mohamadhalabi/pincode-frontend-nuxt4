import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const apiBase = useRuntimeConfig().apiBase   // from .env
  const query = getQuery(event)                // e.g. { active: '1', lang: 'en' }

  // Laravel endpoint we’ll add below: /api/service-categories
  return await $fetch(`${apiBase}/api/service-categories`, { query })
})
