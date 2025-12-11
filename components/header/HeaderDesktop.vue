<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isLoggedIn: boolean
  helloText: string
  cartCount: number
  locale: any // can be ref or string
  t: (key: string, params?: any) => string
}>()

const emit = defineEmits([
  'login',
  'account',
  'cart',
  'update:locale'
])

// Always work with a plain string for the <select>
const currentLocale = computed<string>(() =>
  typeof props.locale === 'object' && props.locale !== null && 'value' in props.locale
    ? (props.locale as any).value
    : (props.locale as string)
)

function onChangeLocale(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  emit('update:locale', value)
}
</script>

<template>
  <div class="h-24 flex items-center justify-between gap-4 relative z-50 px-4">
    
    <div class="flex-1 flex justify-start">
      <NuxtLinkLocale to="/" class="flex items-center gap-2 group shrink-0">
        <NuxtImg
          src="/img/logo/3.webp"
          alt="4Pincode"
          class="h-20 w-auto object-contain"
          format="webp"
        />
        <span class="sr-only">4Pincode</span>
      </NuxtLinkLocale>
    </div>

    <nav
      class="flex-none flex items-center rounded-xl border border-gray-200 bg-white px-2"
      aria-label="Primary"
    >
      
      <div class="relative group">
        <button class="nav-item flex items-center gap-2">
          <svg
            class="w-5 h-5 nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.9a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <span class="nav-text">{{ props.t('nav.tokens') || 'Tokens' }}</span>
          <svg class="w-4 h-4 ml-1 text-gray-400 group-hover:text-[#0e5e6f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div class="absolute top-full left-0 w-72 pt-2 hidden group-hover:block z-50">
          <div class="bg-white border border-gray-200 rounded-lg shadow-xl py-1 overflow-hidden flex flex-col">
            
            <NuxtLinkLocale
              to="/product/kia-hyundai-pincode-old"
              class="dropdown-item w-full text-left flex items-center gap-2"
            >
              <span>{{ props.t('nav.buyKiaOld') || 'Old Kia / Hyundai Tokens' }}</span>
            </NuxtLinkLocale>
            
            <NuxtLinkLocale
              to="/product/kia-hyundai-pincode-new"
              class="dropdown-item w-full text-left flex items-center gap-2"
            >
              <span>{{ props.t('nav.buyKiaNew') || 'New Kia / Hyundai Tokens' }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/product/toyota-lexus-passcode"
              class="dropdown-item w-full text-left flex items-center gap-2"
            >
              <span>{{ props.t('nav.buyToyota') || 'Toyota / Lexus Passcode' }}</span>
            </NuxtLinkLocale>
            
            <NuxtLinkLocale
              to="/product/chinese-cars-pincode"
              class="dropdown-item w-full text-left flex items-center gap-2"
            >
              <span>{{ props.t('nav.buyChinese') || 'Chinese Cars Pincode' }}</span>
            </NuxtLinkLocale>

          </div>
        </div>
      </div>

      <div class="h-8 w-px bg-gray-200 mx-1"></div>

      <div class="relative group">
        <button class="nav-item flex items-center gap-2">
          <svg width="20" height="20" class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 4h10V4H7v2zm0 2v12h10V8H7zm2 2h2v2H9v-2zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-8h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"
            />
          </svg>
          <span class="nav-text">{{ props.t('nav.calculators') || 'Calculators' }}</span>
           <svg class="w-4 h-4 ml-1 text-gray-400 group-hover:text-[#0e5e6f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div class="absolute top-full left-0 w-72 pt-2 hidden group-hover:block z-50">
          <div class="bg-white border border-gray-200 rounded-lg shadow-xl py-1 overflow-hidden flex flex-col">
            
            <NuxtLinkLocale
              to="/services/kia-hyundai-before-2017"
              class="dropdown-item w-full text-left flex items-center gap-2"
            >
              <span>{{ props.t('nav.calcKiaOld') || 'Kia / Hyundai (before 2017)' }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/services/kia-hyundai-after-2017"
              class="dropdown-item w-full text-left flex items-center gap-2"
            >
              <span>{{ props.t('nav.calcKiaNew') || 'Kia / Hyundai (2017+)' }}</span>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex-1 flex items-center justify-end gap-3">
      
      <div class="relative">
        <select
          :value="currentLocale"
          class="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-base font-medium bg-white hover:border-[#3adbc4] cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-[#3adbc4]/20"
          @change="onChangeLocale"
        >
          <option value="en">EN</option>
          <option value="ar">العربية</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <button
        v-if="props.isLoggedIn"
        class="px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0e5e6f] transition"
        @click="emit('account')"
      >
        {{ props.helloText }}
      </button>
      <button
        v-else
        class="px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0e5e6f] transition"
        @click="emit('login')"
      >
        {{ props.t('auth.login') || 'Login' }}
      </button>

      <button
        class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] hover:border-[#3adbc4] transition-colors"
        aria-label="Cart"
        @click="emit('cart')"
      >
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.2 10.9a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path>
        </svg>
        <span
          v-if="props.cartCount > 0"
          class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] grid place-items-center bg-red-600 text-white"
        >
          {{ props.cartCount }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Nav Item Base Styles - Transparent border by default */
.nav-item {
  @apply px-5 py-3 font-medium text-gray-700 border border-transparent rounded-lg transition-all duration-200 whitespace-nowrap;
}

/* Hover State */
.nav-item:hover, .group:hover .nav-item {
  @apply border-[#3adbc4] bg-[#f0fdfc];
}

/* Gradient Text Effect on Hover */
.nav-item:hover .nav-text, 
.group:hover .nav-item .nav-text {
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Icon Color on Hover */
.nav-item:hover .nav-icon,
.group:hover .nav-item .nav-icon {
  @apply text-[#0e5e6f];
}

/* Dropdown specific items */
.dropdown-item {
  @apply px-4 py-3 text-base text-gray-700 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] transition-colors;
}
</style>