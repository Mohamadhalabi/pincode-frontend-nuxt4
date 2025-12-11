<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const { $api } = useNuxtApp()

const auth = (typeof useAuth === 'function' ? useAuth() : null) as any
const cart = useCart()

/** Login */
const loginForm = reactive({ email: '', password: '' })
const loadingLogin = ref(false)
const errLogin = ref<string | null>(null)
const showLoginPass = ref(false)

/** Register */
const regForm = reactive({
  first_name: '', last_name: '', email: '', password: '', password_confirmation: ''
})
const loadingRegister = ref(false)
const errRegister = ref<string | null>(null)
const showRegPass = ref(false)

/** Merge guest cart after auth */
async function mergeGuestCartToServer() {
  const guestItems = cart.snapshot()
  if (!guestItems.length) return
  try {
    await $api('/cart/merge', { method: 'POST', body: { items: guestItems } })
  } catch {}
  try {
    const res = await $api('/cart', { method: 'GET' })
    cart.replace(Array.isArray(res?.items) ? res.items : [])
  } catch { cart.clear() }
}

async function submitLogin() {
  errLogin.value = null; loadingLogin.value = true
  try {
    await auth.login({ email: loginForm.email, password: loginForm.password }) 
    await cart.afterAuthSync()
    router.push('/')
  } catch (e:any) {
    // UPDATED LINE BELOW:
    // Check for e.data.error.message first, based on your API structure
    errLogin.value = e?.data?.error?.message || e?.data?.message || e?.message || 'Login failed'
  } finally {
    loadingLogin.value = false
  }
}

async function submitRegister() {
  errRegister.value = null
  
  // 1. Client-side validation
  if (regForm.password !== regForm.password_confirmation) {
    errRegister.value = (t('auth.passwordsNotMatch') as string) || 'Passwords do not match'
    return
  }

  loadingRegister.value = true

  try {
    // 2. Attempt registration
    if (auth && typeof auth.register === 'function') {
      // Use auth module if available
      await auth.register({ ...regForm, device: 'web' })
    } else {
      // Manual API call fallback
      await $api('/auth/register', { method: 'POST', body: { ...regForm, device: 'web' } })
      
      // Auto-login after manual registration if supported
      if (auth && typeof auth.login === 'function') {
        await auth.login(regForm.email, regForm.password)
      }
    }

    // 3. Post-registration actions
    await mergeGuestCartToServer()
    router.push('/')

  } catch (e: any) {
    // FIX APPLIED HERE:
    // We check e.data.error.message first because your backend nests the message inside an 'error' object
    errRegister.value = 
      e?.data?.error?.message || 
      e?.data?.message || 
      e?.message || 
      (t('auth.registerFailed') as string) || 
      'Registration failed'
      
  } finally {
    loadingRegister.value = false
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10 sm:py-16">
    <!-- Breadcrumb -->
    <nav class="flex items-center text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
      <NuxtLinkLocale to="/" class="hover:text-[#0e5e6f] transition-colors">{{ t('common.home') || 'Home' }}</NuxtLinkLocale>
      <span class="mx-2 text-gray-300">›</span>
      <span class="text-gray-900 font-medium">{{ t('auth.login') || 'Login' }}</span>
    </nav>

    <!-- Title -->
    <h1 class="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight text-center sm:text-left">{{ t('auth.welcome') || 'Welcome Back' }}</h1>

    <!-- Forms container -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="grid lg:grid-cols-[1fr_auto_1fr]">
        <!-- Login -->
        <section class="p-8 lg:p-10">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            {{ t('auth.login') || 'Login' }}
          </h2>

          <form class="space-y-5" @submit.prevent="submitLogin">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ t('common.email') || 'Email' }}</label>
              <input v-model.trim="loginForm.email" type="email" required
                     class="input" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ t('auth.password') || 'Password' }}</label>
              <div class="relative">
                <input :type="showLoginPass ? 'text' : 'password'" v-model="loginForm.password" required
                       class="input pr-10" />
                <button type="button" class="absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-[#0e5e6f] transition-colors"
                        @click="showLoginPass = !showLoginPass">
                  <span :class="showLoginPass ? 'i-lucide:eye-off' : 'i-lucide:eye'"></span>
                </button>
              </div>
            </div>

            <button class="btn w-full" :disabled="loadingLogin">
              <span v-if="!loadingLogin">{{ t('auth.login') || 'Login' }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ t('common.loading') || 'Loading…' }}
              </span>
            </button>

            <p v-if="errLogin" class="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-center">{{ errLogin }}</p>
          </form>
        </section>

        <!-- Divider -->
        <div class="relative flex items-center justify-center">
          <div class="hidden lg:block w-px h-3/4 bg-gray-200" />
          <div class="lg:hidden h-px w-3/4 bg-gray-200 my-4" />
          <div class="absolute bg-white p-2 text-xs font-bold text-gray-400 uppercase tracking-widest">OR</div>
        </div>

        <!-- Register -->
        <section class="p-8 lg:p-10 bg-gray-50/30">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            {{ t('auth.register') || 'Create Account' }}
          </h2>

          <form class="space-y-5" @submit.prevent="submitRegister">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ t('auth.firstName') || 'First name' }}</label>
                <input v-model.trim="regForm.first_name" type="text" required
                       class="input" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ t('auth.lastName') || 'Last name' }}</label>
                <input v-model.trim="regForm.last_name" type="text" required
                       class="input" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ t('common.email') || 'Email' }}</label>
              <input v-model.trim="regForm.email" type="email" required
                     class="input" />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ t('auth.password') || 'Password' }}</label>
              <div class="relative">
                <input :type="showRegPass ? 'text' : 'password'" v-model="regForm.password" required minlength="6"
                       class="input pr-10" />
                <button type="button" class="absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-[#0e5e6f] transition-colors"
                        @click="showRegPass = !showRegPass">
                  <span :class="showRegPass ? 'i-lucide:eye-off' : 'i-lucide:eye'"></span>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ t('auth.confirmPassword') || 'Confirm password' }}</label>
              <input :type="showRegPass ? 'text' : 'password'" v-model="regForm.password_confirmation" required minlength="6"
                     class="input" />
            </div>

            <button class="btn w-full" :disabled="loadingRegister">
              <span v-if="!loadingRegister">{{ t('auth.createAccount') || 'Register' }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ t('common.loading') || 'Loading…' }}
              </span>
            </button>

            <p v-if="errRegister" class="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-center">{{ errRegister }}</p>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-xl text-white px-5 py-3 font-bold shadow-md transition-all duration-200 transform;
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
}
.btn:hover { @apply shadow-lg opacity-95 -translate-y-0.5; }
.btn:disabled { @apply opacity-60 cursor-not-allowed transform-none; }

.input {
  @apply w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] transition-all bg-white;
}
</style>