<template>
  <div class="mx-auto max-w-6xl px-4 py-8 lg:py-12">
    <h1 class="mb-8 text-3xl font-extrabold tracking-tight text-gray-900">
      {{ t('cart.title') || 'Your Cart' }}
    </h1>

    <div
      v-if="mounted && itemsLen === 0"
      class="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-600"
    >
      <div class="mb-4 text-6xl opacity-20">🛒</div>
      <p class="mb-6 text-lg font-medium">{{ t('cart.empty') || 'Your cart is currently empty.' }}</p>
      <NuxtLinkLocale
        to="/"
        class="btn inline-flex"
      >
        {{ t('common.continueShopping') || 'Start Shopping' }}
      </NuxtLinkLocale>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-12">
      
      <section class="lg:col-span-8 space-y-6">
        
        <div v-if="!mounted" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-32 rounded-2xl border bg-gray-50 animate-pulse" />
        </div>

        <div v-else class="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th class="px-6 py-4 text-left font-bold">{{ t('cart.product') || 'Product' }}</th>
                <th class="px-4 py-4 text-right font-bold">{{ t('cart.price') || 'Price' }}</th>
                <th class="px-4 py-4 text-center font-bold">{{ t('cart.qty') || 'Qty' }}</th>
                <th class="px-4 py-4 text-center font-bold">{{ t('tokens') || 'Tokens' }}</th>
                <th class="px-4 py-4 text-right font-bold">{{ t('cart.lineTotal') || 'Total' }}</th>
                <th class="px-6 py-4 text-right font-bold w-[80px]"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="it in itemsRef"
                :key="rowKey(it)"
                class="hover:bg-[#f0fdfc]/30 transition-colors"
              >
                <td class="px-6 py-5">
                  <div class="flex items-start gap-5">
                    <NuxtImg
                      v-if="it?.image"
                      :src="it.image"
                      width="80" height="80"
                      :modifiers="{ fit: 'cover' }"
                      class="h-20 w-20 shrink-0 rounded-xl border border-gray-200 bg-white object-contain p-1"
                      alt=""
                    />
                    <div v-else class="h-20 w-20 shrink-0 rounded-xl border border-gray-200 bg-gray-50 grid place-items-center text-gray-400">—</div>

                    <div class="min-w-0 flex-grow pt-1">
                      <NuxtLinkLocale
                        :to="`/product/${it?.slug}`"
                        class="block text-lg font-extrabold leading-tight text-gray-900 hover:text-[#0e5e6f] hover:underline transition-colors break-words"
                        :title="it?.name"
                      >
                        {{ it?.name }}
                      </NuxtLinkLocale>
                      <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span
                          v-if="it?.sku"
                          class="inline-flex rounded-md bg-gray-100 px-2 py-0.5 text-gray-600 font-mono"
                        >SKU: {{ it.sku }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-4 py-5 text-right tabular-nums font-medium text-gray-600">${{ price(it?.price) }}</td>

                <td class="px-4 py-5">
                  <div class="flex justify-center">
                    <div class="inline-flex items-center rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                      <button
                        type="button"
                        class="h-8 w-9 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 hover:text-[#0e5e6f] font-bold transition-colors"
                        :disabled="busyId === cartId(it)"
                        @click.stop="dec(it)"
                        aria-label="Decrease quantity"
                      >−</button>

                      <input
                        :value="it?.qty"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        class="h-8 w-10 border-x border-gray-100 text-center outline-none disabled:opacity-60 text-gray-900 font-semibold text-sm"
                        :disabled="busyId === cartId(it)"
                        @input="onQtyInput($event, it)"
                        @blur="onQtyBlur($event, it)"
                      />

                      <button
                        type="button"
                        class="h-8 w-9 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 hover:text-[#0e5e6f] font-bold transition-colors"
                        :disabled="busyId === cartId(it)"
                        @click.stop="inc(it)"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                  </div>
                </td>

                <td class="px-4 py-5 text-center">
                  <span v-if="it?.meta?.tokens" class="tabular-nums font-medium text-[#0e5e6f] bg-[#f0fdfc] px-2 py-1 rounded-lg text-xs">
                    {{ it?.qty * it.meta.tokens }}
                  </span>
                  <span v-else class="text-gray-300">—</span>
                </td>

                <td class="px-4 py-5 text-right text-base font-bold tabular-nums text-[#0e5e6f]">
                  ${{ price(lineTotal(it)) }}
                </td>

                <td class="px-6 py-5 text-right">
                  <button
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                    :disabled="busyId === cartId(it)"
                    @click.stop="removeItem(it)"
                    aria-label="Remove item"
                  >
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="mounted" class="md:hidden space-y-4">
          <div
            v-for="it in itemsRef"
            :key="rowKey(it)"
            class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div class="flex gap-4">
              <NuxtImg
                v-if="it?.image"
                :src="it.image"
                width="96" height="96"
                :modifiers="{ fit: 'cover' }"
                class="h-24 w-24 shrink-0 rounded-xl border border-gray-100 bg-white object-contain p-1"
                alt=""
              />
              <div v-else class="h-24 w-24 shrink-0 rounded-xl border bg-gray-50 grid place-items-center text-gray-400">—</div>

              <div class="flex-1 min-w-0 flex flex-col pt-1">
                <NuxtLinkLocale 
                  :to="`/product/${it?.slug}`" 
                  class="text-lg font-extrabold text-gray-900 leading-snug hover:text-[#0e5e6f] break-words block"
                  :title="it?.name"
                >
                  {{ it?.name }}
                </NuxtLinkLocale>
                
                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                   <span v-if="it?.sku" class="font-mono bg-gray-100 px-1.5 py-0.5 rounded">SKU: {{ it.sku }}</span>
                   <span class="font-bold text-[#0e5e6f]">${{ price(it?.price) }} / unit</span>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div class="inline-flex items-center rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden h-10">
                <button
                  type="button"
                  class="h-full w-10 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 font-bold text-lg"
                  :disabled="busyId === cartId(it)"
                  @click.stop="dec(it)"
                >−</button>
                <input
                  :value="it?.qty"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  class="h-full w-10 border-x border-gray-100 text-center outline-none disabled:opacity-60 text-base font-bold text-gray-900"
                  :disabled="busyId === cartId(it)"
                  @input="onQtyInput($event, it)"
                  @blur="onQtyBlur($event, it)"
                />
                <button
                  type="button"
                  class="h-full w-10 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 font-bold text-lg"
                  :disabled="busyId === cartId(it)"
                  @click.stop="inc(it)"
                >+</button>
              </div>

              <div class="text-right">
                <div class="text-[10px] uppercase tracking-wide text-gray-400 font-bold">Total</div>
                <div class="text-xl font-black text-[#0e5e6f] leading-none">${{ price(lineTotal(it)) }}</div>
              </div>
            </div>

            <div class="mt-3 flex justify-end">
               <button
                  class="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors flex items-center gap-1"
                  :disabled="busyId === cartId(it)"
                  @click.stop="removeItem(it)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                    <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                  </svg>
                  {{ t('btn.remove') || 'Remove Item' }}
                </button>
             </div>
          </div>

          <div v-if="itemsLen" class="flex items-center justify-between pt-2 px-1">
            <NuxtLinkLocale to="/" class="text-sm font-bold text-gray-600 hover:text-[#0e5e6f] transition-colors flex items-center gap-1">
              <span>←</span> {{ t('common.continueShopping') || 'Continue shopping' }}
            </NuxtLinkLocale>
            <button type="button" class="text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors" @click="clearAll">
              {{ t('cart.clear') || 'Clear cart' }}
            </button>
          </div>
        </div>
      </section>

      <aside class="lg:col-span-4">
        <div class="lg:sticky lg:top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div class="border-b border-gray-100 bg-gradient-to-r from-[#0e5e6f]/5 to-[#3adbc4]/10 px-6 py-4">
            <h2 class="text-lg font-bold text-gray-900">{{ t('cart.summary') || 'Order Summary' }}</h2>
          </div>

          <div class="p-6 space-y-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">{{ t('cart.subtotal') || 'Subtotal' }}</span>
              <span class="font-bold tabular-nums text-gray-900">${{ price(subtotal) }}</span>
            </div>

            <div class="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span class="text-base font-bold text-gray-900">{{ t('cart.total') || 'Total' }}</span>
              <span class="text-3xl font-black tabular-nums text-[#0e5e6f]">${{ price(subtotal) }}</span>
            </div>

            <div class="pt-2">
              <template v-if="isLoggedIn">
                <NuxtLinkLocale to="/checkout" class="btn w-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  {{ t('cart.checkout') || 'Proceed to Checkout' }}
                </NuxtLinkLocale>
              </template>

              <template v-else>
                <NuxtLinkLocale to="/login" class="btn w-full">
                  {{ t('cart.loginToCheckout') || 'Login to checkout' }}
                </NuxtLinkLocale>
                <p class="mt-3 text-xs text-center text-gray-500">
                  {{ t('cart.loginToCheckoutHint') || 'You need to login to complete your purchase.' }}
                </p>
              </template>

              <div class="mt-3 text-center md:hidden">
                 <NuxtLinkLocale to="/" class="text-sm text-gray-500 hover:text-[#0e5e6f] font-medium">
                  {{ t('common.continueShopping') || 'Continue shopping' }}
                </NuxtLinkLocale>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const cart = useCart()

// --- Auth state (logged-in or not) using useAuth composable ---
const auth = useAuth()
const isLoggedIn = computed(() => auth.isLoggedIn.value)

/** Normalize to an always-array ref */
const itemsRef = computed<any[]>(() => {
  const raw = (cart as any)?.items
  if (Array.isArray(raw?.value)) return raw.value as any[]
  if (Array.isArray(raw)) return raw as any[]
  return [] as any[]
})
const itemsLen = computed(() => itemsRef.value.length)

const mounted = ref(false)
onMounted(() => { mounted.value = true })

/** Summary */
const subtotal = computed(() =>
  itemsRef.value.reduce((sum, i: any) => sum + Number(i?.price || 0) * Number(i?.qty || 0), 0)
)

/** Helpers */
const price = (n: number | string) => Number(n || 0).toFixed(2)
const lineTotal = (it: any) => Number(it?.price || 0) * Number(it?.qty || 0)

/** Prefer server cart item id if present; fallback to composite key for guest cart */
const cartId = (it: any) => (it?.id ?? `${it?.product_type}:${it?.product_id}`)
const rowKey = (it: any) => String(cartId(it))

/** Busy state per item to prevent double clicks */
const busyId = ref<string | number | null>(null)

/** Core mutations */
async function setQty(it: any, qty: number) {
  qty = Math.max(1, Number(qty) || 1)
  const id = cartId(it)
  busyId.value = id
  try {
    it.qty = qty
    if (typeof (cart as any).setQty === 'function') {
      await (cart as any).setQty(it, qty)
    } else if (typeof (cart as any).update === 'function') {
      await (cart as any).update(it, { qty })
    } else {
      (cart as any).sync?.()
    }
    if (typeof (cart as any).reload === 'function') await (cart as any).reload()
  } catch (e) {
    console.error(e)
  } finally { busyId.value = null }
}

async function removeItem(it: any) {
  const id = cartId(it)
  busyId.value = id
  try {
    const idx = itemsRef.value.findIndex(x => cartId(x) === id)
    if (idx > -1) itemsRef.value.splice(idx, 1)

    if (typeof (cart as any).remove === 'function') {
      await (cart as any).remove(it)
    } else if (typeof (cart as any).removeItem === 'function') {
      await (cart as any).removeItem(it)
    } else {
      (cart as any).sync?.()
    }
    if (typeof (cart as any).reload === 'function') await (cart as any).reload()
  } catch (e) {
    console.error(e)
    if (typeof (cart as any).reload === 'function') await (cart as any).reload()
  } finally { busyId.value = null }
}

/** UI handlers */
function dec(it: any) { setQty(it, Number(it?.qty || 1) - 1) }
function inc(it: any) { setQty(it, Number(it?.qty || 1) + 1) }
function onQtyInput(e: Event, it: any) {
  const v = (e.target as HTMLInputElement).value.replace(/[^\d]/g, '')
  ;(e.target as HTMLInputElement).value = v
  it.qty = Math.max(1, Number(v) || 1) // local; commit on blur
}
function onQtyBlur(e: Event, it: any) {
  const v = Number((e.target as HTMLInputElement).value || 1)
  setQty(it, v)
}
function clearAll() {
  if (confirm(t('cart.clearConfirm') || 'Clear all items from cart?')) {
    if (typeof (cart as any).clear === 'function') (cart as any).clear()
    else itemsRef.value.splice(0, itemsRef.value.length)
    ;(cart as any).sync?.()
    if (typeof (cart as any).reload === 'function') (cart as any).reload()
  }
}
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-xl text-white px-5 py-3 font-bold shadow-md transition-all duration-200 transform;
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
}
.btn:hover { @apply shadow-lg opacity-95 -translate-y-0.5; }

.btn-ghost { 
  @apply inline-flex items-center justify-center rounded-xl bg-white text-gray-700 border border-gray-200 px-4 py-2 hover:bg-gray-50 transition; 
}

.tabular-nums { font-variant-numeric: tabular-nums; }
</style>