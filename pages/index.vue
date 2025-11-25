<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
      <div class="relative h-[280px] sm:h-[340px]">
        <NuxtImg
          src="/img/4884273.jpg"
          class="w-full h-full object-cover"
          format="webp"
          alt="Kia / Hyundai VIN to PIN"
        />
        <!-- Gradient Overlay: slight tint of brand color + black for readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#0e5e6f]/80 via-black/40 to-transparent" />

        <div class="absolute inset-0 flex items-center">
          <div class="px-6 sm:px-12 w-full">
            <div class="max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <h1 class="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
                {{ $t('hero.headline') || 'Why choose our PIN Code platform?' }}
              </h1>
              <ul class="text-sm sm:text-base text-gray-700 space-y-2 mb-6 font-medium">
                <li class="flex items-center gap-2">
                  <span class="text-[#3adbc4]">✔</span> {{ $t('hero.points.instant') || 'Instant calculation 24/7' }}
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[#3adbc4]">✔</span> {{ $t('hero.points.noRenewal') || 'No renewal fees · tokens never expire' }}
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[#3adbc4]">✔</span> {{ $t('hero.points.easy') || 'Easy to Use' }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-3">
                <NuxtLink to="/new-lookup" class="btn-brand">
                  {{ $t('btn.newLookup') || 'New VIN Lookup' }}
                </NuxtLink>
                <NuxtLink to="/buy" class="btn-brand-ghost">
                  {{ $t('btn.buyTokens') || 'Buy Tokens' }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Brands Slider -->
    <section class="space-y-6">
      <div class="text-center">
        <h2 class="text-2xl sm:text-2xl font-bold tracking-tight text-gray-900">
          {{ $t('home.supportedBrands') || 'Supported Brands' }}
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mx-auto mt-2 rounded-full"></div>
      </div>

      <div class="relative group">
        <!-- Optional fading edges for slider -->
        <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div
          ref="brandRail"
          class="overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] py-2"
        >
          <div class="flex justify-center gap-8 min-w-max px-4">
            <div v-for="b in brands" :key="b.key" class="brand-pill group hover:border-[#3adbc4]/50 transition-colors duration-300">
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

    <!-- Token Packs -->
    <section v-if="allPacks.length" class="space-y-6">
      <!-- Centered Header -->
      <div class="text-center border-b pb-4 border-gray-100 mb-6">
        <h3 class="text-2xl font-bold text-gray-900">
          {{ $t('home.tokenPacks') || 'Token Packs' }}
        </h3>
        <div class="h-1 w-20 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mx-auto mt-2 rounded-full"></div>
      </div>

      <!-- 
        MOBILE LAYOUT: Flex Slider, Items are 50% width approx to show 2 per row.
        DESKTOP LAYOUT: Standard Grid
      -->
      <div class="flex overflow-x-auto snap-x gap-4 pb-4 px-1 sm:grid sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto scrollbar-hide">
        <article
          v-for="p in allPacks"
          :key="p.id"
          class="pack-card flex flex-col relative group shrink-0 min-w-[calc(50%-8px)] sm:min-w-0 snap-center"
        >
          <!-- FULL CARD LINK (behind content) -->
          <NuxtLink
            :to="`/product/${p.slug || p.id}`"
            class="absolute inset-0 z-0"
            :aria-label="`Open ${p.name}`"
          />

          <!-- Header -->
          <header class="pack-card__header z-10 flex items-center justify-center min-h-[50px]">
            <!-- explicit title link -->
            <NuxtLink
              :to="`/product/${p.slug || p.id}`"
              class="block z-20 relative text-center w-full"
              @click.stop
            >
              <!-- Full visible title, no truncation -->
              <h4 class="text-xs sm:text-base font-bold tracking-tight text-white leading-snug group-hover:text-[#3adbc4] transition-colors whitespace-normal break-words">
                {{ p.name }}
              </h4>
            </NuxtLink>
          </header>

          <!-- Body -->
          <div class="pack-card__body flex-1 flex flex-col z-10 bg-white">
            <div class="text-center mt-1">
              <span class="inline-block bg-gray-100 text-[#0e5e6f] px-2 py-0.5 rounded-full text-xs font-bold">
                {{ p.tokens }} {{ $t('tokens') || 'tokens' }}
              </span>
            </div>

            <!-- explicit image link -->
            <NuxtLink
              v-if="p.image_url"
              :to="`/product/${p.slug || p.id}`"
              class="block z-20 relative mx-auto w-full px-2"
              @click.stop
            >
              <NuxtImg
                :src="p.image_url"
                format="webp"
                class="pack-image hover:scale-105 transition-transform duration-300 border border-gray-200"
                :modifiers="{ fit: 'contain', background: 'white' }"
                alt=""
              />
            </NuxtLink>

            <p v-if="p.sku" class="text-[#0e5e6f] text-center font-semibold text-[10px] tracking-wider uppercase mb-1">
              SKU: {{ p.sku }}
            </p>

            <!-- Tier table -->
            <div
              v-if="p.pricing_tiers?.length"
              class="tier-box mb-2 shadow-inner"
              @click.stop
            >
              <table class="tier-table">
                <thead>
                  <tr>
                    <!-- UPDATED: Conditional alignment for AR locale -->
                    <th 
                      class="bg-gray-50 text-gray-500" 
                      :class="locale === 'ar' ? 'text-right' : 'text-left'"
                    >
                      {{ $t('common.quantity') || 'Qty' }}
                    </th>
                    <th class="text-right bg-gray-50 text-gray-500">{{ $t('common.price') || 'Price' }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(r, i) in normalizedTiers(p)"
                    :key="i"
                    :class="[
                      i === activeTierIndex(p, qty[p.id]) ? 'tier-row--active' : 'hover:bg-gray-50',
                    ]"
                    class="transition-colors duration-200"
                  >
                    <td class="font-medium">
                      <span v-if="r.max_qty">{{ r.min_qty }}–{{ r.max_qty }}</span>
                      <span v-else>{{ r.min_qty }}+</span>
                    </td>
                    <td class="text-right">
                      <template v-if="r.sale_price_usd">
                        <span class="font-bold text-[#e63946]">
                          ${{ Number(r.sale_price_usd).toFixed(2) }}
                        </span>
                      </template>
                      <template v-else>
                        <span class="font-semibold text-gray-700">
                          ${{ Number(r.price_usd).toFixed(2) }}
                        </span>
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Big price -->
            <div class="text-center mb-3">
              <template v-if="currentStrikePrice(p, qty[p.id])">
                <div class="text-lg sm:text-xl font-black text-gray-900 leading-none">
                  ${{ currentUnitPrice(p, qty[p.id]).toFixed(2) }}
                </div>
                <div class="text-[10px] text-gray-400 line-through mt-0.5 font-medium">
                  was ${{ currentStrikePrice(p, qty[p.id])!.toFixed(2) }}
                </div>
              </template>
              <template v-else>
                <div class="text-lg sm:text-xl font-black text-[#0e5e6f] leading-none">
                  ${{ currentUnitPrice(p, qty[p.id]).toFixed(2) }}
                </div>
              </template>
            </div>

            <!-- CTA bottom -->
            <div class="mt-auto pt-2 border-t border-gray-100" @click.stop>
              <div class="flex items-center gap-2">
                <input
                  v-model.number="qty[p.id]"
                  type="number"
                  min="1"
                  class="w-12 sm:w-14 rounded-lg border border-gray-300 px-1 py-1.5 text-center text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] outline-none transition-all"
                  @click.stop
                />
                <button
                  class="btn-brand w-full text-xs sm:text-sm py-2"
                  @click.stop="addToCartCard(p)"
                >
                  {{ $t('btn.addToCart') || 'Add' }}
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

function activeTierIndex(p: TokenPack, qtyNum?: number): number {
  const q = Math.max(1, Number(qtyNum || 1))
  const tiers = normalizedTiers(p)
  for (let i = 0; i < tiers.length; i++) {
    const tr = tiers[i]
    const max = tr.max_qty ?? Number.POSITIVE_INFINITY
    if (q >= (tr.min_qty || 1) && q <= max) return i
  }
  return -1
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

const brands = [
  { key: 'kia', name: 'KIA', logo: '/img/brands/kia.svg' },
  { key: 'hyundai', name: 'HYUNDAI', logo: '/img/brands/hyundai.svg' },
  // { key: 'toyota', name: 'TOYOTA', logo: '/img/brands/toyota.svg' },
]

const brandRail = ref<HTMLDivElement | null>(null)

useHead({
  title: t('seo.title') || 'Immobilizer PIN Code Calculator',
  meta: [{ name: 'description', content: t('seo.desc') || 'VIN→PIN and token packs.' }],
})
</script>

<style scoped>
/* --- BRAND GRADIENT & BUTTONS --- */

/* Primary Button: Gradient Background */
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

/* Secondary/Ghost Button: White bg, Brand Border & Text */
.btn-brand-ghost {
  @apply inline-flex items-center justify-center rounded-xl bg-white border border-[#0e5e6f]/30 text-[#0e5e6f] px-5 py-2.5 font-bold shadow-sm transition-all duration-200;
}
.btn-brand-ghost:hover {
  @apply bg-[#0e5e6f]/5 border-[#0e5e6f] text-[#0e5e6f];
}

/* --- BRANDS --- */
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

/* Reduced padding for compact header */
.pack-card__header {
  @apply px-3 py-2 bg-[#0e5e6f]; 
}

/* Reduced padding and gap for compact body */
.pack-card__body {
  @apply px-3 py-3 gap-1;
}

/* Compact Image styling: max-height reduced to 140px for mobile balance */
.pack-image {
  @apply w-full rounded-xl p-1 mt-1 mb-1 object-contain bg-white;
}

/* --- TIER TABLE --- */
.tier-box {
  @apply border border-gray-100 rounded-xl overflow-hidden bg-white;
}
.tier-table {
  @apply w-full text-xs;
}
.tier-table thead th {
  @apply px-2 py-1.5 font-semibold uppercase tracking-wider text-[10px];
}
.tier-table tbody td {
  @apply px-2 py-1.5 border-t border-gray-50 text-gray-700;
}

/* Active row styling using brand colors */
.tier-row--active td {
  @apply bg-[#f0fdfc] !important; /* Very light teal bg */
  @apply text-[#0e5e6f] font-bold border-t-[#3adbc4]/30;
}

/* Hide scrollbar for slider but allow function */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>