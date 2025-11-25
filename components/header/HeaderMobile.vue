<script setup lang="ts">
const props = defineProps<{
  isLoggedIn: boolean
  helloText: string
  cartCount: number
  locale: string
  t: (key: string, params?: any) => string
  open?: boolean
}>()

const emit = defineEmits([
  'toggle',
  'home',
  'productsOld',
  'productsNew',
  'serviceOld',
  'serviceNew',
  'login',
  'account',
  'cart',
  'update:locale',
])
</script>

<template>
  <div class="py-3">
    <div class="flex items-center justify-between">
      <!-- Left: Menu + Logo -->
      <div class="flex items-center gap-3">
        <!-- Hamburger Menu -->
        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] hover:border-[#3adbc4]/50 transition-all"
          aria-label="Menu"
          @click="emit('toggle')"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <!-- Logo -->
        <button class="flex items-center gap-2" @click="emit('home')">
          <NuxtImg
            src="/img/logo/3.webp"
            alt="4Pincode"
            class="h-16 w-auto object-contain"
            format="webp"
          />
        </button>
      </div>

      <!-- Right: Cart -->
      <div class="flex items-center gap-2">
        <button
          class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] hover:border-[#3adbc4]/50 transition-all"
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
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] grid place-items-center bg-red-600 text-white font-bold border-2 border-white shadow-sm"
          >
            {{ props.cartCount }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>