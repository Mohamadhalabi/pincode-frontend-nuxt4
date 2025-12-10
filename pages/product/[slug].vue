<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    <nav class="mb-4 sm:mb-6" aria-label="Breadcrumb" v-if="!pending">
      <ol class="flex flex-wrap items-center gap-1 text-sm text-gray-600">
        <li>
          <NuxtLinkLocale to="/" class="hover:text-[#0e5e6f] hover:underline transition-colors">
            {{ $t('common.home') || 'Home' }}
          </NuxtLinkLocale>
        </li>
        <li class="px-1 text-gray-400">/</li>
        <li class="text-gray-900 font-medium truncate max-w-[60%] sm:max-w-none">
          {{ pack?.name }}
        </li>
      </ol>
    </nav>

    <div v-if="pending" class="grid gap-6 md:gap-8 md:grid-cols-2">
      <div class="h-[320px] rounded-2xl bg-gray-100 animate-pulse" />
      <div class="space-y-4">
        <div class="h-10 w-4/5 bg-gray-100 rounded animate-pulse" />
        <div class="h-6 w-2/5 bg-gray-100 rounded animate-pulse" />
        <div class="h-12 w-40 bg-gray-100 rounded animate-pulse" />
        <div class="h-24 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>

    <div v-else-if="errMsg" class="text-red-600 text-sm">
      {{ errMsg }}
    </div>

    <div v-else-if="pack" class="grid gap-6 md:gap-8 md:grid-cols-2">
      <div class="space-y-3">
        <button
          type="button"
          class="block w-full text-left group"
          @click="zoomOpen = true"
          aria-label="Open image"
        >
          <NuxtImg
            v-if="pack.image_url"
            :src="pack.image_url"
            format="webp"
            :modifiers="{ fit: 'contain', background: 'white' }"
            class="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm group-hover:shadow-md transition duration-300 group-hover:border-[#3adbc4]/50"
            alt=""
          />
          <div v-else class="w-full rounded-2xl border bg-gray-50 grid place-items-center text-gray-400 h-72">
            {{ $t('common.noImage') || 'No image' }}
          </div>
        </button>
      </div>

      <aside class="space-y-6 lg:space-y-8 lg:sticky lg:top-24 self-start">
        <header class="space-y-3">
          <h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900">
            {{ pack.name }}
          </h1>

          <div class="flex flex-wrap items-center gap-2">
            <span class="badge badge-tokens">
              {{ pack.tokens }} {{ $t('tokens') || 'tokens' }}
            </span>

            <span v-if="pack.sku" class="badge badge-sku">
              SKU: {{ pack.sku }}
            </span>

            <span
              v-if="packCategory"
              :to="`/categories/${packCategory.slug ?? packCategory.id}`"
              class="badge badge-cat transition"
            >
              {{ packCategory.name }}
            </span>
          </div>
        </header>

        <div class="py-2">
          <div v-if="showStrike" class="flex items-end gap-3">
            <div class="text-4xl font-black text-[#e63946] tracking-tight leading-none">
              ${{ Number(effectivePrice).toFixed(2) }}
            </div>
            <div class="text-xl text-gray-400 line-through leading-none pb-1">
              ${{ Number(strikePrice).toFixed(2) }}
            </div>
          </div>

          <div v-else class="text-4xl font-black text-[#0e5e6f] tracking-tight leading-none">
            ${{ Number(effectivePrice).toFixed(2) }}
          </div>
        </div>

        <div class="space-y-6">
          <div class="qty-control max-w-[140px]">
            <button
              type="button"
              class="qty-btn"
              @click="qty = Math.max(1, qty - 1)"
              aria-label="Decrease"
            >
              –
            </button>
            <input
              v-model.number="qty"
              type="number"
              min="1"
              class="qty-input"
            />
            <button
              type="button"
              class="qty-btn"
              @click="qty = Number(qty) + 1"
              aria-label="Increase"
            >
              +
            </button>
          </div>

          <div v-if="pack.order_by_whatsapp" class="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4">
            
            <template v-if="pack.category?.required_inputs?.length">
              <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">
                {{ $t('common.required_info') || 'Required Information' }}
              </h3>
              
              <div v-for="(field, index) in pack.category.required_inputs" :key="index">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ typeof field === 'string' ? field : (field.label || field.name) }} 
                  <span class="text-red-500">*</span>
                </label>
                
                <input 
                  v-model="waForm[typeof field === 'string' ? field : field.name]"
                  type="text" 
                  class="input w-full bg-white"
                  :placeholder="typeof field === 'string' ? '' : (field.placeholder || '')"
                />
              </div>
            </template>

            <button 
              class="btn w-full bg-[#25D366] hover:bg-[#128C7E] border-none text-white !bg-none"
              style="background-color: #25D366;"
              @click="orderOnWhatsApp"
              :disabled="!isWaFormValid"
              :class="{'opacity-50 cursor-not-allowed': !isWaFormValid}"
            >
              <svg class="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {{ $t('btn.orderWhatsApp') || 'Order on WhatsApp' }}
            </button>
            <p v-if="!isWaFormValid" class="text-xs text-red-500 text-center">
              * {{ $t('msg.fillRequired') || 'Please fill all required fields.' }}
            </p>
          </div>

          <button v-else class="btn w-full sm:w-auto" @click="addToCart()">
            {{ $t('btn.addToCart') || 'Add to Cart' }}
          </button>
        </div>

        <div v-if="pack?.pricing_tiers?.length" class="tier-wrap">
          <table class="tier-table">
            <thead>
              <tr>
                <th 
                  class="bg-gray-50 text-gray-500"
                  :class="locale === 'ar' ? 'text-right' : 'text-left'"
                >
                  {{ $t('common.quantity') || 'Quantity' }}
                </th>
                <th class="text-right bg-gray-50 text-gray-500">{{ $t('common.price') || 'Price' }}</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(r,i) in normalizedTiers(pack)"
                :key="i"
                :class="i === activeTierIndex(pack, qty) ? 'tier-row--active' : 'hover:bg-gray-50 transition-colors'"
              >
                <td>
                  <span v-if="r.max_qty">{{ r.min_qty }}–{{ r.max_qty }}</span>
                  <span v-else>{{ r.min_qty }}+</span>
                </td>
                <td class="text-right">
                  <template v-if="r.sale_price_usd">
                    <span class="text-[#e63946] font-bold">
                      ${{ Number(r.sale_price_usd).toFixed(2) }}
                    </span>
                    <span class="text-gray-400 line-through ml-1 text-xs">
                      ${{ Number(r.price_usd).toFixed(2) }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="text-gray-900 font-semibold">
                      ${{ Number(r.price_usd).toFixed(2) }}
                    </span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    </div>

    <div v-if="pack" class="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div class="flex flex-wrap gap-2 border-b border-gray-100 px-3 sm:px-6 pt-2 sm:pt-3 bg-gray-50/50">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="px-4 py-3 rounded-t-xl text-sm sm:text-base transition-all focus:outline-none"
          :class="activeTab === tab.key
            ? 'bg-white border-b-2 border-[#3adbc4] text-[#0e5e6f] font-bold -mb-px shadow-sm'
            : 'text-gray-500 hover:text-[#0e5e6f] hover:bg-white/50'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="p-6 sm:p-8">
        <section v-if="activeTab === 'desc'">
          <div v-if="pack.description" class="prose max-w-none text-gray-700">
            <div v-html="pack.description"></div>
          </div>
          <p v-else class="text-sm text-gray-500 italic">
            {{ $t('common.noDescription') || 'No description available.' }}
          </p>
        </section>

        <section v-else-if="activeTab === 'faq'">
          <div v-if="pack.faq" class="prose max-w-none text-gray-700" v-html="pack.faq"></div>
          <p v-else class="text-sm text-gray-500 italic">
            {{ $t('common.noFaq') || 'No FAQ available.' }}
          </p>
        </section>

        <section v-else>
          <form class="space-y-5 max-w-2xl" @submit.prevent="submitContact">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1.5 text-gray-700">
                  {{ $t('common.name') || 'Name' }}
                </label>
                <input
                  v-model.trim="contact.name"
                  type="text"
                  required
                  class="input"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5 text-gray-700">
                  {{ $t('common.email') || 'Email' }}
                </label>
                <input
                  v-model.trim="contact.email"
                  type="email"
                  required
                  class="input"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5 text-gray-700">
                {{ $t('common.message') || 'Message' }}
              </label>
              <textarea
                v-model.trim="contact.message"
                rows="5"
                required
                class="input resize-y"
                :placeholder="$t('common.contactPlaceholder') || 'How can we help?'"
              />
            </div>
            <button class="btn px-8" :disabled="sending">
              <span v-if="!sending">{{ $t('common.send') || 'Send Message' }}</span>
              <span v-else>{{ $t('common.sending') || 'Sending…' }}</span>
            </button>
            <p v-if="sentOk" class="text-[#0e5e6f] font-medium text-sm mt-3 flex items-center gap-2">
              <span class="text-[#3adbc4] text-lg">✔</span> {{ $t('common.sentThanks') || 'Thanks! We will reply shortly.' }}
            </p>
            <p v-if="sendErr" class="text-red-600 text-sm mt-3">{{ sendErr }}</p>
          </form>
        </section>
      </div>
    </div>

    <!-- <section v-if="pack" ref="relatedSentinel" class="mt-12 border-t border-gray-100 pt-8">
      <h2 class="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
        {{ $t('product.related') || 'Related Token Packs' }}
      </h2>

      <div v-if="relLoading" class="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <div v-for="i in 4" :key="i" class="h-64 rounded-2xl bg-gray-100 animate-pulse" />
      </div>

      <div v-else-if="related.length" class="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <article
          v-for="r in related"
          :key="r.id"
          class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#3adbc4]/40 transition-all duration-300 overflow-hidden group"
        >
          <NuxtLinkLocale :to="`/product/${r.slug}`" class="block relative">
            <NuxtImg
              v-if="r.image_url"
              :src="r.image_url"
              format="webp"
              :modifiers="{ fit: 'contain', background: 'white' }"
              class="w-full bg-white p-4 aspect-[4/3] object-contain group-hover:scale-105 transition-transform duration-300"
              alt=""
            />
            <div v-else class="w-full h-40 grid place-items-center text-gray-400 bg-gray-50">—</div>
          </NuxtLinkLocale>

          <div class="p-4 space-y-2 border-t border-gray-50">
            <NuxtLinkLocale
              :to="`/product/${r.slug}`"
              class="block font-bold leading-tight hover:text-[#0e5e6f] transition-colors line-clamp-2 text-gray-900"
            >
              {{ r.name }}
            </NuxtLinkLocale>

            <div class="text-lg font-bold">
              <template v-if="r.sale_price_usd && !(r.pricing_tiers?.length)">
                <span class="text-[#e63946]">${{ Number(r.sale_price_usd).toFixed(2) }}</span>
                <span class="text-gray-400 line-through ml-1 text-sm">${{ Number(r.price_usd).toFixed(2) }}</span>
              </template>
              <template v-else>
                <span class="text-[#0e5e6f]">${{ Number(r.price_usd).toFixed(2) }}</span>
              </template>
            </div>

            <button class="btn w-full mt-2 text-sm py-2" @click="quickAdd(r)">
              {{ $t('btn.addToCart') || 'Add to Cart' }}
            </button>
          </div>
        </article>
      </div>

      <p v-else-if="relTried" class="text-sm text-gray-500 italic">
        {{ $t('product.noRelated') || 'No related packs found.' }}
      </p>
    </section> -->

    <div
      v-if="zoomOpen && pack?.image_url"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 grid place-items-center p-4"
      @click.self="zoomOpen = false"
    >
      <button class="absolute top-4 right-4 text-white hover:text-[#3adbc4] transition text-4xl leading-none" @click="zoomOpen = false">&times;</button>

      <NuxtImg
        :src="pack.image_url"
        format="webp"
        class="w-full lg:w-3/5 rounded-2xl max-w-[800px] bg-white p-4 shadow-2xl"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ Updated Types: Allow simple string array OR object array for inputs
type InputField = { name: string; label?: string; placeholder?: string } | string

type CategoryLite = { 
  id: number; 
  name: string; 
  slug?: string | null;
  whatsapp_number?: string | null; 
  required_inputs?: InputField[] | null; 
}

type PricingTier = { min_qty: number; max_qty?: number | null; price_usd: number; sale_price_usd?: number | null }

type Pack = {
  id: number
  name: string
  slug?: string | null
  sku?: string | null
  tokens: number
  price_usd: number | string
  sale_price_usd?: number | string | null
  pricing_tiers?: PricingTier[] | null
  effective_price_usd?: number | null
  image_url?: string | null
  description?: string | null
  faq?: string | null
  service_category_id?: number | null
  category?: CategoryLite | null
  
  order_by_whatsapp?: boolean // ✅ Added
  
  seo_title?: string | null
  seo_description?: string | null
  updated_at?: string | null
  created_at?: string | null
  stock_status?: 'instock'|'outofstock'|string|null
  brand_name?: string | null
}

const route = useRoute()
const { t, locale, locales } = useI18n()
const { get, client } = useApi()
const cart = useCart()
const { show } = useAddedToast()
const qty = ref(1)

const key = computed(() => String(route.params.slug || ''))

// SSR fetch
const { data: pack, pending, error } = await useAsyncData<Pack>(
  () => `pack:${key.value}:${locale.value}`,
  () => get<Pack>(`/token-packs/${key.value}`),
  { server: true, immediate: true }
)

watch(locale, () => {
  refreshNuxtData(`pack:${key.value}:${locale.value}`)
})

const packCategory = computed<CategoryLite | null>(() =>
  pack.value?.category
    ?? (pack.value?.service_category_id
      ? { id: pack.value.service_category_id, name: t('product.category') as string, slug: undefined }
      : null)
)

/* ----- WhatsApp Logic (NEW & FIXED) ----- */
const waForm = reactive<Record<string, string>>({})

const isWaFormValid = computed(() => {
  if (!pack.value?.order_by_whatsapp) return true
  const req = pack.value.category?.required_inputs
  if (!req || !req.length) return true
  
  // ✅ Check if every required field has a value
  return req.every(field => {
    // If field is string, use it as key; otherwise use field.name
    const key = typeof field === 'string' ? field : field.name
    const val = waForm[key]
    return val && val.trim().length > 0
  })
})

function orderOnWhatsApp() {
  if (!pack.value || !isWaFormValid.value) return

  const p = pack.value
  const phone = p.category?.whatsapp_number || '905555555555' 
  const inputs = p.category?.required_inputs || []
  
  let msg = `*New Order Request*\n`
  msg += `Product: ${p.name}\n`
  msg += `Qty: ${qty.value}\n`
  msg += `Total Price: $${Number(effectivePrice.value * qty.value).toFixed(2)}\n\n`
  
  if (inputs.length > 0) {
    msg += `*Details:*\n`
    inputs.forEach(f => {
      // ✅ Handle string vs object logic
      const label = typeof f === 'string' ? f : (f.label || f.name)
      const key = typeof f === 'string' ? f : f.name
      msg += `- ${label}: ${waForm[key] || 'N/A'}\n`
    })
  }

  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank')
}

/* ----- Pricing Helpers ----- */
function normalizedTiers(p: Pack): PricingTier[] {
  return (p.pricing_tiers || [])
    .slice()
    .sort((a,b) => (a.min_qty||1) - (b.min_qty||1))
}

function activeTierIndex(p: Pack, qtyNum?: number): number {
  const q = Math.max(1, Number(qtyNum || 1))
  const tiers = normalizedTiers(p)
  for (let i = 0; i < tiers.length; i++) {
    const tr = tiers[i]
    const max = tr.max_qty ?? Number.POSITIVE_INFINITY
    if (q >= (tr.min_qty || 1) && q <= max) return i
  }
  return -1
}

function unitPriceFor(qty: number, p: Pack): number {
  const q = Math.max(1, Number(qty || 1))
  const tiers = normalizedTiers(p)
  for (const tr of tiers) {
    const max = tr.max_qty ?? Number.POSITIVE_INFINITY
    if (q >= (tr.min_qty || 1) && q <= max) {
      return Number((tr.sale_price_usd ?? tr.price_usd) || 0)
    }
  }
  return Number((p.sale_price_usd ?? p.price_usd) || 0)
}

const effectivePrice = computed(() => (pack.value ? unitPriceFor(qty.value, pack.value) : 0))
const strikePrice = computed(() => {
  if (!pack.value) return 0
  const q = Math.max(1, Number(qty.value || 1))
  const tiers = normalizedTiers(pack.value)
  for (const tr of tiers) {
    const max = tr.max_qty ?? Number.POSITIVE_INFINITY
    if (q >= (tr.min_qty || 1) && q <= max) {
      return Number(tr.sale_price_usd ? tr.price_usd : 0)
    }
  }
  return Number(pack.value.sale_price_usd ? pack.value.price_usd : 0)
})
const showStrike = computed(() => Number(strikePrice.value) > 0)

function addToCart() {
  if (!pack.value) return
  const q = Math.max(1, Number(qty.value || 1))
  const unit = unitPriceFor(q, pack.value)

  cart.add({
    product_id: pack.value.id,
    product_type: 'token-pack',
    slug: pack.value.slug || String(pack.value.id),
    sku: pack.value.sku || pack.value.slug || String(pack.value.id),
    name: pack.value.name,
    price: unit,
    qty: q,
    image: pack.value.image_url || null,
    meta: {
      tokens: pack.value.tokens,
      base_price_usd: Number(pack.value.price_usd || 0),
      sale_price_usd: pack.value.sale_price_usd ? Number(pack.value.sale_price_usd) : null,
      pricing_tiers: pack.value.pricing_tiers || null,
    }
  })
  show({ img: pack.value.image_url || null, title: pack.value.name, sku: pack.value.sku || pack.value.slug || String(pack.value.id) })
}

function quickAdd(r: Pack) {
  const unit = unitPriceFor(1, r)
  cart.add({
    product_id: r.id,
    product_type: 'token-pack',
    slug: r.slug || String(r.id),
    sku: r.sku || r.slug || String(r.id),
    name: r.name,
    price: unit,
    qty: 1,
    image: r.image_url || null,
    meta: {
      tokens: r.tokens,
      base_price_usd: Number(r.price_usd || 0),
      sale_price_usd: r.sale_price_usd ? Number(r.sale_price_usd) : null,
      pricing_tiers: r.pricing_tiers || null
    },
  })
}

/** Tabs */
const tabs = computed(() => ([
  { key: 'desc', label: t('common.description') || 'Description' },
  { key: 'faq',  label: t('common.faq') || 'FAQ' },
  { key: 'contact', label: t('common.contactUs') || 'Contact Us' },
]))
const activeTab = ref<'desc'|'faq'|'contact'>('desc')

/** Contact form */
const contact = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const sentOk  = ref(false)
const sendErr = ref<string | null>(null)

async function submitContact() {
  if (!pack.value) return
  sending.value = true
  sentOk.value = false
  sendErr.value = null
  try {
    await client('/contact', {
      method: 'POST',
      body: {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        product_id: pack.value.id,
        product_slug: pack.value.slug,
      },
    })
    sentOk.value = true
    contact.message = ''
  } catch (e: any) {
    sendErr.value = e?.data?.message || e?.message || 'Failed to send.'
  } finally {
    sending.value = false
  }
}

const errMsg = computed(() => {
  const e: any = error.value
  return e?.statusMessage || e?.message || ''
})

/** Image zoom */
const zoomOpen = ref(false)

/** RELATED — lazy fetch on scroll */
const related = ref<Pack[]>([])
const relLoading = ref(false)
const relTried = ref(false)
const relatedSentinel = ref<HTMLElement | null>(null)

async function fetchRelated() {
  if (relLoading.value || relTried.value || !pack.value) return
  relLoading.value = true
  relTried.value = true

  const catId = pack.value.category?.id ?? pack.value.service_category_id ?? null
  try {
    let rows: Pack[] = []
    if (catId) {
      rows = await get<Pack[]>('/token-packs', {
        query: { category_id: catId, exclude: pack.value.id, limit: 12 }
      })
    }
    if (!rows?.length) {
      const all = await get<Pack[]>('/token-packs')
      rows = (all || [])
        .filter(p =>
          p.id !== pack.value!.id &&
          ((p.service_category_id && p.service_category_id === catId) ||
           (p as any).category?.id === catId))
        .slice(0, 12)
    }
    related.value = rows
  } catch (_e) {}
  finally { relLoading.value = false }
}

onMounted(() => {
  if (!relatedSentinel.value) return
  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      fetchRelated()
      io.disconnect()
    }
  }, { rootMargin: '200px' })
  io.observe(relatedSentinel.value)
})

/* ------------------------------
 * SEO + OG + Twitter + JSON-LD
 * ------------------------------ */
const config = useRuntimeConfig()
const reqUrl = useRequestURL()

const baseUrl = computed(() => {
  const fromEnv = (config.public as any)?.siteUrl
  if (fromEnv) return String(fromEnv).replace(/\/+$/, '')
  if (reqUrl?.origin) return reqUrl.origin
  if (process.client && window?.location?.origin) return window.location.origin
  return ''
})

const cleanText = (html?: string | null) =>
  (html ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const pagePath = computed(() => `/product/${pack.value?.slug ?? key.value}`)
const canonicalUrl = computed(() => `${baseUrl.value}${pagePath.value}`)

const seoTitle = computed(() =>
  pack.value?.seo_title?.trim()
  || pack.value?.name
  || (t('seo.title') as string)
  || 'PIN Code Product'
)

const seoDescription = computed(() =>
  pack.value?.seo_description?.trim()
  || cleanText(pack.value?.description).slice(0, 160)
  || (t('seo.description') as string)
  || 'Professional Kia / Hyundai PIN code service.'
)

const seoImage = computed(() => {
  const img = pack.value?.image_url || (config.public as any)?.ogImage
  if (!img) return undefined
  return img.startsWith('http') ? img : `${baseUrl.value}${img}`
})

const alternates = computed(() => {
  const slug = pack.value?.slug ?? key.value
  const all = (locales.value || []).map((l: any) => l.code || l)
  const defaultCode =
    (locales.value as any)?.find?.((x: any) => x.default)?.code || all[0]

  return all.map((code: string) => {
    const prefix = code === defaultCode ? '' : `/${code}`
    return { hreflang: code, href: `${baseUrl.value}${prefix}/product/${slug}` }
  })
})

useHead(() => {
  const title = seoTitle.value
  const desc  = seoDescription.value
  const img   = seoImage.value

  // Breadcrumb LD
  const bcItems: any[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl.value}/` },
  ]
  bcItems.push({
    '@type': 'ListItem',
    position: bcItems.length + 1,
    name: pack.value?.name || '',
    item: canonicalUrl.value
  })

  const ldBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: bcItems
  }

  const price = Number(effectivePrice.value ?? pack.value?.price_usd ?? 0).toFixed(2)
  const availability =
    (pack.value?.stock_status ?? 'instock') === 'outofstock'
      ? 'https://schema.org/OutOfStock'
      : 'https://schema.org/InStock'

  const ldProduct: any = pack.value ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pack.value.name,
    image: img ? [img] : undefined,
    description: cleanText(pack.value.description),
    category: packCategory.value?.name,
    sku: pack.value.sku || pack.value.slug || String(pack.value.id),
    brand: {
      '@type': 'Brand',
      name: pack.value.brand_name || (config.public as any)?.siteName || 'Brand'
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl.value,
      priceCurrency: 'USD',
      price,
      availability,
      itemCondition: 'https://schema.org/NewCondition'
    }
  } : null

  return {
    title,

    link: [
      { rel: 'canonical', href: canonicalUrl.value },
      ...alternates.value.map(a => ({ rel: 'alternate', hreflang: a.hreflang, href: a.href })),
      { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl.value },
    ],

    meta: [
      { name: 'description', content: desc },
      { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' },

      // OG
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:type', content: 'product' },
      { property: 'og:url', content: canonicalUrl.value },
      ...(img ? [{ property: 'og:image', content: img }] : []),
      ...(img ? [{ property: 'og:image:secure_url', content: img }] : []),
      { property: 'og:locale', content: locale.value },
      ...(config.public as any)?.siteName
        ? [{ property: 'og:site_name', content: (config.public as any).siteName }]
        : [],

      // Twitter
      { name: 'twitter:card', content: img ? 'summary_large_image' : 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      ...(img ? [{ name: 'twitter:image', content: img }] : []),
    ],

    script: [
      {
        id: 'ld-breadcrumb',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(ldBreadcrumb)
      },
      ...(ldProduct ? [{
        id: 'ld-product',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(ldProduct)
      }] : [])
    ],

    __dangerouslyDisableSanitizersByTagID: {
      'ld-breadcrumb': ['innerHTML'],
      'ld-product': ['innerHTML'],
    }
  }
})
</script>

<style>
/* --- Brand Gradient & Colors --- */

/* Primary Button: Gradient Background */
.btn { 
  @apply inline-flex items-center justify-center rounded-xl text-white px-6 py-3 font-bold shadow-md transition-all duration-200 transform;
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
}
.btn:hover {
  @apply shadow-lg opacity-95 -translate-y-0.5;
}
.btn:active {
  @apply scale-95 opacity-100 translate-y-0;
}
.btn:disabled {
  @apply opacity-70 cursor-not-allowed transform-none;
}

/* Secondary Button (Ghost) */
.btn-ghost { 
  @apply bg-white text-[#0e5e6f] border border-[#0e5e6f]/30 hover:bg-[#f0fdfc] hover:border-[#3adbc4]/50; 
}
.btn-sm { 
  @apply px-4 py-2 text-sm; 
}

/* Inputs */
.input {
  @apply w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] bg-white transition-all;
}

/* Badges / pills */
.badge {
  @apply inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors;
}
.badge-sku {
  @apply bg-gray-50 text-gray-700 border-gray-200;
}
.badge-tokens {
  @apply bg-[#f0fdfc] text-[#0e5e6f] border-[#3adbc4]/30;
}
.badge-cat {
  @apply bg-gray-50 text-gray-600 border-gray-200 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] hover:border-[#3adbc4]/30;
}
.badge-stock {
  @apply bg-blue-50 text-blue-800 border-blue-200;
}

/* Qty control */
.qty-control {
  @apply flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#3adbc4] focus-within:border-[#3adbc4] transition-all;
}
.qty-btn {
  @apply px-4 py-3 bg-gray-50 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] text-gray-600 font-bold transition;
}
.qty-input {
  @apply w-16 text-center border-x border-gray-100 py-3 outline-none bg-white font-semibold text-gray-900;
}

/* Tier pricing */
.tier-wrap {
  @apply border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mt-2;
}
.tier-table {
  @apply w-full text-sm;
}
.tier-table thead th {
  @apply bg-gray-50 text-gray-600 px-4 py-2.5 font-semibold uppercase tracking-wider text-xs;
}
.tier-table tbody td {
  @apply px-4 py-2.5 border-t border-gray-100 text-gray-700;
}
.tier-table tbody tr:nth-child(even) td {
  @apply bg-gray-50/30;
}

/* Active Tier Row */
.tier-row--active td {
  @apply bg-[#f0fdfc] !important; 
  @apply text-[#0e5e6f] font-bold border-t-[#3adbc4]/30;
}

/* Prose */
.prose :where(h1,h2,h3){ @apply mt-6 mb-3 text-gray-900; }
.prose a { @apply text-[#0e5e6f] hover:text-[#3adbc4] underline; }
@media (max-width: 640px) { .prose { font-size: 0.95rem; } }
</style>