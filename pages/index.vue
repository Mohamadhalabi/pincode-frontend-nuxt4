<template>
  <div class="space-y-12">
    <section class="relative overflow-hidden rounded-2xl bg-gray-900 shadow-sm min-h-[500px] sm:min-h-[400px]">
      <NuxtImg
        src="/img/4884273.jpg"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
        format="webp"
        alt="Kia / Hyundai VIN to PIN"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0e5e6f]/90 via-[#0e5e6f]/40 to-transparent" />

      <div class="relative z-10 flex items-center h-full py-12 px-6 sm:px-12">
        <div class="max-w-2xl w-full">
          <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50">
            <h1 class="text-2xl sm:text-4xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight">
              {{ $t('hero.headline') || 'Why choose our PIN Code platform?' }}
            </h1>
            
            <ul class="text-sm sm:text-base text-gray-700 space-y-3 font-medium">
              <li class="flex items-start gap-3">
                <span class="text-[#3adbc4] text-lg mt-0.5">✔</span> 
                <span>{{ $t('hero.points.instant') }}</span>
              </li>

              <li class="flex items-start gap-3">
                <span class="text-[#3adbc4] text-lg mt-0.5">✔</span>
                <span>{{ $t('hero.points.noRenewal') }}</span>
              </li>

              <li class="flex items-start gap-3">
                <span class="text-[#3adbc4] text-lg mt-0.5">✔</span>
                <span>{{ $t('hero.points.easy') }}</span>
              </li>

              <li class="flex items-start gap-3">
                <span class="text-[#3adbc4] text-lg mt-0.5">✔</span>
                <span>{{ $t('hero.points.toyota') }}</span>
              </li>

              <li class="flex items-start gap-3">
                <span class="text-[#3adbc4] text-lg mt-0.5">✔</span>
                <span>{{ $t('hero.points.chinese') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <div class="text-center">
        <h2 class="text-2xl sm:text-2xl font-bold tracking-tight text-gray-900">
          {{ $t('home.supportedBrands') || 'Supported Brands' }}
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mx-auto mt-2 rounded-full"></div>
      </div>

      <div class="relative group w-full overflow-hidden bg-white py-4">
        <div class="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div class="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <div class="flex gap-8 px-4">
            <div v-for="b in brands" :key="'set1-' + b.key" class="brand-pill group hover:border-[#3adbc4]/50 transition-colors duration-300">
              <NuxtImg
                v-if="b.logo"
                :src="b.logo"
                :alt="b.name"
                format="webp"
                class="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
              />
              <span v-else class="text-lg font-bold tracking-wide text-gray-600 group-hover:text-[#0e5e6f]">
                {{ b.name }}
              </span>
            </div>
          </div>
          <div class="flex gap-8 px-4">
            <div v-for="b in brands" :key="'set2-' + b.key" class="brand-pill group hover:border-[#3adbc4]/50 transition-colors duration-300">
              <NuxtImg
                v-if="b.logo"
                :src="b.logo"
                :alt="b.name"
                format="webp"
                class="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
              />
              <span v-else class="text-lg font-bold tracking-wide text-gray-600 group-hover:text-[#0e5e6f]">
                {{ b.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="allPacks.length" class="space-y-6 relative">
      <div class="text-center border-b pb-4 border-gray-100 mb-6">
        <h3 class="text-2xl font-bold text-gray-900">
          {{ $t('home.tokenPacks') || 'Token Packs' }}
        </h3>
        <div class="h-1 w-20 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mx-auto mt-2 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4 sm:px-0">
        <article
          v-for="p in allPacks"
          :key="p.id"
          class="pack-card flex flex-col relative group w-full"
        >
          <NuxtLinkLocale
            :to="`/product/${p.slug || p.id}`"
            class="absolute inset-0 z-0"
            :aria-label="`Open ${p.name}`"
          />

          <header class="pack-card__header z-10 flex items-center justify-center min-h-[56px]">
            <NuxtLinkLocale
              :to="`/product/${p.slug || p.id}`"
              class="block z-20 relative text-center w-full"
              @click.stop
            >
              <h4 class="text-base font-bold tracking-tight text-white leading-snug group-hover:text-[#3adbc4] transition-colors">
                {{ p.name }}
              </h4>
            </NuxtLinkLocale>
          </header>

          <div class="pack-card__body flex-1 flex flex-col z-10 bg-white">
            <div class="text-center mt-2">
              <span class="inline-block bg-gray-100 text-[#0e5e6f] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {{ p.tokens }} {{ $t('tokens') || 'TOKENS' }}
              </span>
            </div>

            <NuxtLink
              v-if="p.image_url"
              :to="`/product/${p.slug || p.id}`"
              class="block z-20 relative mx-auto w-full px-4 py-4"
              @click.stop
            >
              <NuxtImg
                :src="p.image_url"
                format="webp"
                class="pack-image h-48 sm:h-56 w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105 border border-gray-100 bg-white rounded-xl"
                :modifiers="{ fit: 'contain', background: 'white' }"
                alt=""
              />
            </NuxtLink>

            <p v-if="p.sku" class="text-gray-400 text-center font-medium text-[10px] tracking-wider uppercase mb-2">
              SKU: {{ p.sku }}
            </p>

            <div class="text-center mb-4">
              <template v-if="currentStrikePrice(p, qty[p.id])">
                <div class="text-2xl font-black text-gray-900 leading-none">
                  ${{ currentUnitPrice(p, qty[p.id]).toFixed(2) }}
                </div>
                <div class="text-xs text-[#e63946] line-through mt-1 font-semibold">
                  ${{ currentStrikePrice(p, qty[p.id])!.toFixed(2) }}
                </div>
              </template>
              <template v-else>
                <div class="text-2xl font-black text-[#0e5e6f] leading-none">
                  ${{ currentUnitPrice(p, qty[p.id]).toFixed(2) }}
                </div>
              </template>
            </div>

            <div class="mt-auto pt-4 border-t border-gray-100" @click.stop>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="qty[p.id]"
                  type="number"
                  min="1"
                  class="w-14 rounded-xl border border-gray-200 bg-gray-50 px-1 py-2 text-center text-sm font-bold focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] outline-none transition-all"
                  @click.stop
                />
                <button
                  class="btn-brand w-full text-sm py-2.5"
                  @click.stop="addToCartCard(p)"
                >
                  {{ $t('btn.addToCart') || 'Add to Cart' }}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <div v-if="errorMsg" class="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
      {{ errorMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, watchEffect } from 'vue'

type PricingTier = {
  min_qty: number
  max_qty?: number | null
  price_usd: number
  sale_price_usd?: number | null
}

type TokenPack = {
  id: number
  name: string
  slug?: string | null
  sku?: string | null
  tokens: number
  service_category_id?: number | null
  price_usd: number | string
  sale_price_usd?: number | string | null
  pricing_tiers?: PricingTier[] | null
  image_url?: string | null
}

const { locale, t } = useI18n()
const cart = useCart()
const { show } = useAddedToast()
const qty = reactive<Record<number, number>>({})

function normalizedTiers(p: TokenPack): PricingTier[] {
  return (p.pricing_tiers || [])
    .slice()
    .sort((a, b) => (a.min_qty || 1) - (b.min_qty || 1))
}

function currentUnitPrice(p: TokenPack, qtyNum?: number): number {
  const q = Math.max(1, Number(qtyNum || 1))
  const tiers = normalizedTiers(p)
  for (const tr of tiers) {
    const max = tr.max_qty ?? Number.POSITIVE_INFINITY
    if (q >= (tr.min_qty || 1) && q <= max) {
      return Number(tr.sale_price_usd ?? tr.price_usd ?? 0)
    }
  }
  return Number((p.sale_price_usd ?? p.price_usd) || 0)
}

function currentStrikePrice(p: TokenPack, qtyNum?: number): number | null {
  const q = Math.max(1, Number(qtyNum || 1))
  const tiers = normalizedTiers(p)
  for (const tr of tiers) {
    const max = tr.max_qty ?? Number.POSITIVE_INFINITY
    if (q >= (tr.min_qty || 1) && q <= max) {
      return tr.sale_price_usd ? Number(tr.price_usd) : null
    }
  }
  return p.sale_price_usd ? Number(p.price_usd) : null
}

function addToCartCard(p: TokenPack) {
  const q = Math.max(1, Number(qty[p.id] || 1))
  const unit = currentUnitPrice(p, q)

  cart.add({
    product_id: p.id,
    product_type: 'token-pack',
    slug: p.slug || String(p.id),
    sku: p.sku || p.slug || String(p.id),
    name: p.name,
    price: unit,
    qty: q,
    image: p.image_url || null,
    meta: {
      tokens: p.tokens,
      base_price_usd: Number(p.price_usd || 0),
      sale_price_usd: p.sale_price_usd != null ? Number(p.sale_price_usd) : null,
      pricing_tiers: p.pricing_tiers || null,
    },
  })

  show({
    img: p.image_url || null,
    title: p.name,
    sku: p.sku || p.slug || String(p.id),
  })
}

/* API */
const { get } = useApi()
const fetchPacks = () => get<TokenPack[]>('/token-packs')

const { data: packs, error: packErr } = await useAsyncData(
  'home-packs',
  fetchPacks,
  { server: true, immediate: true }
)

watchEffect(() => {
  if (packs.value) {
    packs.value.forEach(p => {
      if (!qty[p.id]) qty[p.id] = 1
    })
  }
})

watch(locale, () => refreshNuxtData(['home-packs']))

const allPacks = computed(() => packs.value ?? [])
const errorMsg = computed(() => {
  const e: any = packErr.value
  return e?.statusMessage || e?.message || ''
})

// Brands list
const brands = [
  { key: 'kia', name: 'KIA', logo: '/img/brands/kia.svg' },
  { key: 'hyundai', name: 'HYUNDAI', logo: '/img/brands/hyundai.svg' },
  { key: 'toyota', name: 'Toyota', logo: '/img/brands/toyota.svg' },
  { key: 'lexus', name: 'Lexus', logo: '/img/brands/Lexus.svg' },
  { key: 'mg', name: 'MG', logo: '/img/brands/mg.svg' },
  { key: 'changan', name: 'Changan', logo: '/img/brands/changan.svg' },
  { key: 'chery', name: 'Chery', logo: '/img/brands/chery.svg' },
  { key: 'haval', name: 'Haval', logo: '/img/brands/haval.webp' },
]

useHead({
  title: t('seo.title') || 'Immobilizer PIN Code Calculator',
  meta: [{ name: 'description', content: t('seo.desc') || 'VIN→PIN and token packs.' }],
})
</script>

<style scoped>
/* --- ANIMATIONS --- */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
  /* Width must be large enough to hold double the content */
  width: max-content;
}

/* --- BRAND GRADIENT & BUTTONS --- */
.btn-brand {
  @apply inline-flex items-center justify-center rounded-xl text-white px-5 py-2.5 font-bold shadow-md transition-all duration-200 transform;
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
}
.btn-brand:hover {
  @apply shadow-lg opacity-95 -translate-y-0.5;
}
.btn-brand:active {
  @apply scale-95 opacity-100 translate-y-0;
}

.brand-pill {
  @apply flex items-center justify-center h-16 min-w-[160px] px-6 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all;
}

/* --- PACK CARDS --- */
.pack-card {
  @apply bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 overflow-hidden;
}
.pack-card:hover {
  @apply shadow-xl border-[#3adbc4]/50 -translate-y-1;
}

.pack-card__header {
  @apply px-4 py-3 bg-[#0e5e6f]; 
}

.pack-card__body {
  @apply px-4 py-4 gap-2;
}
</style>