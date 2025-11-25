// plugins/piniaPersist.client.ts
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.$pinia) nuxtApp.$pinia.use(piniaPluginPersistedstate)
})
