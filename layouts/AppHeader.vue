<script setup lang="ts">
import HeaderDesktop from '~/components/header/HeaderDesktop.vue'
import HeaderMobile from '~/components/header/HeaderMobile.vue'

// Nuxt i18n
const i18n = useI18n()
const { t, locale } = i18n
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

/* --- Auth & User State --- */
// Using 'as any' to bypass strict type checks if your auth composable isn't typed globally
const auth = (typeof useAuth === 'function' ? useAuth() : null) as any
const user = computed(() => (auth && auth.user ? auth.user.value : null))

// Reactive login state
const isLoggedIn = computed(() => !!auth?.isLoggedIn?.value)

const displayName = computed(() => {
  const u: any = user.value
  if (!u) return ''
  const first = u.first_name ?? u.firstName
  const last  = u.last_name  ?? u.lastName
  // Join names or fallback to email start, or 'Account'
  const full  = (u.name || [first, last].filter(Boolean).join(' ')).trim()
  return full || (String(u.email || '').split('@')[0]) || 'Account'
})

const helloText = computed(() => {
  if (!isLoggedIn.value) return ''
  return (t('auth.hello', { name: displayName.value }) as string)
    || `Hello ${displayName.value || 'Account'}`
})

// Reload user on mount (client-side only) to ensure token validity
onMounted(async () => {
  try {
    if (process.client) {
      const token = localStorage.getItem('pk:token') || localStorage.getItem('auth_token')
      if (token && auth && !user.value && typeof auth.reloadUser === 'function') {
        await auth.reloadUser()
      }
    }
  } catch (e) {
    console.error('Error reloading user:', e)
  }
})

/* --- Locale Logic --- */
const safeLocales = computed<any[]>(() => {
  const raw = (i18n as any)?.locales
  const arr = Array.isArray(raw?.value) ? raw.value : (Array.isArray(raw) ? raw : null)
  return arr ?? [{ code: 'en', dir: 'ltr' }]
})

const localeCode = computed<string>(() => {
  const l: any = locale
  if (l && typeof l === 'object' && 'value' in l) return l.value
  return String(l)
})

const currentLocale = computed(() => 
  safeLocales.value.find(l => l.code === localeCode.value) ?? { code: localeCode.value, dir: 'ltr' }
)

const dir = computed(() => currentLocale.value?.dir || 'ltr')

// Set HTML attributes for SEO/Accessibility
useHead({ 
  htmlAttrs: { 
    lang: () => localeCode.value, 
    dir: () => dir.value 
  } 
})

function setLocale(code: string) {
  const l: any = locale
  if (l && typeof l === 'object' && 'value' in l) {
    l.value = code
  } else if ((i18n as any).setLocale) {
    (i18n as any).setLocale(code)
  } else {
    (i18n as any).locale = code
  }
}

// Watch for locale changes to trigger navigation
if (process.client) {
  watch(() => localeCode.value, (n, o) => {
    if (n && n !== o) navigateTo(switchLocalePath(n))
  })
}

/* --- Cart Logic --- */
const cart = (typeof useCart === 'function' ? useCart() : null) as any

const cartItems = computed<any[]>(() => {
  const itemsRef = cart?.items
  return Array.isArray(itemsRef?.value) ? itemsRef.value : []
})

const cartCount = computed(() =>
  cartItems.value.reduce((n, i: any) => n + Number(i?.qty || 0), 0)
)

/* --- Mobile Drawer Logic --- */
const mobileOpen = ref(false)
const go = (p: string) => navigateTo(localePath(p))

async function doLogout() {
  mobileOpen.value = false
  try {
    await auth?.logout?.()
  } finally {
    try { await cart?.clear?.() } catch {}
    // Redirect to home after logout
    go('/')
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
    <div class="mx-auto w-full max-w-6xl px-4">
      
      <HeaderDesktop
        class="hidden md:flex"
        :is-logged-in="isLoggedIn"
        :hello-text="helloText"
        :cart-count="cartCount"
        :locale="localeCode"
        :t="t"
        @home="go('/')"
        @kia-before="go('/services/kia-hyundai-before-2017')"
        @kia-after="go('/services/kia-hyundai-after-2017')"
        @login="go('/login')"
        @account="go('/account')"
        @cart="go('/cart')"
        @update:locale="(v: string) => setLocale(v)"
        @productsOld="go('/product/kia-hyundai-pincode-old')"
        @productsNew="go('/product/kia-hyundai-pincode-new')"
      />

      <HeaderMobile
        class="md:hidden"
        :is-logged-in="isLoggedIn"
        :hello-text="helloText"
        :cart-count="cartCount"
        :locale="localeCode"
        :t="t"
        :open="mobileOpen"
        @toggle="mobileOpen = !mobileOpen"
        @home="go('/')"
        @login="go('/login')"
        @account="go('/account')"
        @cart="go('/cart')"
      />
    </div>

    <Transition name="slide-fade">
      <div v-if="mobileOpen" class="md:hidden border-t border-gray-100 bg-white shadow-xl absolute w-full left-0">
        <div class="mx-auto px-4 py-4 flex flex-col text-sm text-gray-700 space-y-1">

          <div class="px-2 pb-2 pt-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
            {{ t('nav.tokens') || 'Tokens' }}
          </div>

          <button class="drawer-btn" @click="mobileOpen=false; go('/product/kia-hyundai-pincode-old')">
            <div class="drawer-icon-bg">
               <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1" /> <circle cx="20" cy="21" r="1" /> <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.9a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </div>
            <span class="font-medium group-hover:text-[#0e5e6f]">{{ t('nav.buyKiaOld') || 'Old Kia / Hyundai Tokens' }}</span>
          </button>

          <button class="drawer-btn" @click="mobileOpen=false; go('/product/kia-hyundai-pincode-new')">
            <div class="drawer-icon-bg">
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1" /> <circle cx="20" cy="21" r="1" /> <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.9a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </div>
            <span class="font-medium group-hover:text-[#0e5e6f]">{{ t('nav.buyKiaNew') || 'New Kia / Hyundai Tokens' }}</span>
          </button>

          <div class="h-px bg-gray-100 my-2"></div>

           <div class="px-2 pb-2 pt-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
            {{ t('nav.calculators') || 'Calculators' }}
          </div>

          <button class="drawer-btn" @click="mobileOpen=false; go('/services/kia-hyundai-before-2017')">
            <div class="drawer-icon-bg">
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" /> <line x1="8" y1="6" x2="16" y2="6" /> <line x1="8" y1="10" x2="8" y2="10" /> <line x1="12" y1="10" x2="12" y2="10" /> <line x1="16" y1="10" x2="16" y2="10" /> <line x1="8" y1="14" x2="8" y2="14" /> <line x1="12" y1="14" x2="12" y2="14" /> <line x1="16" y1="14" x2="16" y2="14" /> <line x1="8" y1="18" x2="8" y2="18" /> <line x1="12" y1="18" x2="12" y2="18" /> <line x1="16" y1="18" x2="16" y2="18" />
              </svg>
            </div>
            <span class="font-medium group-hover:text-[#0e5e6f]">{{ t('nav.calcKiaOld') || 'Before 2017 Calculator' }}</span>
          </button>

          <button class="drawer-btn" @click="mobileOpen=false; go('/services/kia-hyundai-after-2017')">
            <div class="drawer-icon-bg">
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" /> <line x1="8" y1="6" x2="16" y2="6" /> <line x1="8" y1="10" x2="8" y2="10" /> <line x1="12" y1="10" x2="12" y2="10" /> <line x1="16" y1="10" x2="16" y2="10" /> <line x1="8" y1="14" x2="8" y2="14" /> <line x1="12" y1="14" x2="12" y2="14" /> <line x1="16" y1="14" x2="16" y2="14" /> <line x1="8" y1="18" x2="8" y2="18" /> <line x1="12" y1="18" x2="12" y2="18" /> <line x1="16" y1="18" x2="16" y2="18" />
              </svg>
            </div>
            <span class="font-medium group-hover:text-[#0e5e6f]">{{ t('nav.calcKiaNew') || '2017+ Calculator' }}</span>
          </button>

          <div class="h-px bg-gray-100 my-2"></div>

          <div class="flex items-center justify-between px-3 py-2">
            <label class="text-sm font-medium text-gray-500">{{ t('common.language') || 'Language' }}</label>
            <div class="relative">
              <select
                :value="localeCode"
                class="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm bg-white hover:border-[#3adbc4] focus:ring-2 focus:ring-[#3adbc4]/20 outline-none"
                @change="(e:any)=>setLocale(e.target.value)"
              >
                <option value="en">EN</option>
                <option value="ar">العربية</option>
              </select>
               <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div class="pt-2">
            <button v-if="isLoggedIn" class="btn w-full" @click="mobileOpen=false; go('/account')">
              {{ helloText }}
            </button>
            <button v-else class="btn w-full" @click="mobileOpen=false; go('/login')">
              {{ t('auth.login') || 'Login' }}
            </button>
          </div>

          <div v-if="isLoggedIn" class="pb-2">
            <button class="btn-ghost w-full" @click="doLogout">
              {{ t('auth.logout') || 'Logout' }}
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Primary Button: Gradient */
.btn {
  @apply inline-flex items-center justify-center rounded-xl text-white px-4 py-2.5 font-bold shadow-sm transition-all;
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
}
.btn:hover {
  @apply shadow opacity-95;
}

/* Secondary/Ghost Button */
.btn-ghost {
  @apply inline-flex items-center justify-center rounded-xl bg-white text-[#0e5e6f] border border-[#0e5e6f]/20 px-4 py-2.5 hover:bg-[#f0fdfc] hover:border-[#3adbc4]/50 transition-all font-semibold;
}

/* Utility classes to clean up template HTML */
.drawer-btn {
  /* REMOVED 'group' from here */
  @apply w-full py-3 px-3 rounded-xl text-left hover:bg-[#f0fdfc] flex items-center gap-3 transition-colors;
}

.drawer-icon-bg {
  @apply p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:text-[#0e5e6f] transition-colors;
}
</style>