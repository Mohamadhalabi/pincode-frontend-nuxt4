// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // Run this only on client, because tokens are in localStorage
  if (process.server) return

  const auth = useAuth() // <-- your composable from composables/useAuth.ts

  const protectedRoutes = ['/lookups', '/lookups/new', '/checkout']

  const needsAuth = protectedRoutes.some(p => to.path.startsWith(p))
  const isLoggedIn = auth.isLoggedIn.value

  if (needsAuth && !isLoggedIn) {
    return navigateTo('/login?redirect=' + encodeURIComponent(to.fullPath))
  }
})
