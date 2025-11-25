<!-- pages/checkout.vue -->
<template>
  <div class="mx-auto max-w-6xl px-4 py-8 lg:py-12">
    <h1 class="mb-8 text-3xl font-extrabold tracking-tight text-gray-900">
      {{ t('checkout.title') || 'Checkout' }}
    </h1>

    <!-- Empty cart -->
    <div
      v-if="itemsLen === 0"
      class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-600"
    >
      <p class="mb-4 text-lg font-medium">
        {{ t('checkout.empty') || 'Your cart is empty. Add products before checking out.' }}
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#0e5e6f] transition-colors"
      >
        ← {{ t('common.continueShopping') || 'Continue shopping' }}
      </NuxtLink>
    </div>

    <!-- Checkout content -->
    <div v-else class="grid gap-8 lg:grid-cols-12">
      <!-- Billing / details form -->
      <section class="lg:col-span-8 space-y-6">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3">
            {{ t('checkout.details') || 'Billing Details' }}
          </h2>

          <form class="space-y-5" @submit.prevent="placeOrder">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  {{ t('checkout.fullName') || 'Full name' }}
                </label>
                <input
                  v-model="form.full_name"
                  type="text"
                  class="input"
                  required
                />
              </div>
              
              <!-- Email (from auth, read-only) -->
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  {{ t('checkout.email') || 'Email' }}
                </label>
                <input
                  :value="userEmail"
                  type="email"
                  disabled
                  class="input bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200"
                />
                <p class="mt-1.5 text-[11px] text-gray-400">
                  {{ t('checkout.emailFromAccount') || 'Linked to your account.' }}
                </p>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                {{ t('checkout.notes') || 'Order notes (optional)' }}
              </label>
              <textarea
                v-model="form.notes"
                rows="3"
                class="input resize-none"
                :placeholder="t('checkout.notesPlaceholder') || 'Any special instructions…'"
              />
            </div>

            <!-- Payment methods -->
            <div class="pt-6 mt-2 border-t border-gray-100">
              <h3 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                {{ t('checkout.paymentMethod') || 'Payment Method' }}
              </h3>

              <div class="space-y-3">
                <!-- PayPal -->
                <label
                  class="flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200"
                  :class="form.payment_method === 'paypal' ? 'border-[#3adbc4] bg-[#f0fdfc] shadow-sm' : 'border-gray-200 hover:border-[#3adbc4]/50 hover:bg-gray-50'"
                >
                  <input
                    type="radio"
                    value="paypal"
                    v-model="form.payment_method"
                    class="mt-1 text-[#0e5e6f] focus:ring-[#3adbc4]"
                  />
                  <div class="flex items-start gap-3">
                    <div class="mt-0.5 h-9 w-9 rounded-full bg-[#00457C] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      P
                    </div>
                    <div>
                      <div class="font-bold text-gray-900">
                        {{ t('checkout.methods.paypal.title') || 'PayPal' }}
                      </div>
                      <div class="text-sm text-gray-600 mt-0.5">
                        {{ t('checkout.methods.paypal.desc') || 'Secure payment via PayPal. Invoice sent to email.' }}
                      </div>
                    </div>
                  </div>
                </label>

                <!-- USDT transfer -->
                <label
                  class="flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200"
                  :class="form.payment_method === 'usdt' ? 'border-[#3adbc4] bg-[#f0fdfc] shadow-sm' : 'border-gray-200 hover:border-[#3adbc4]/50 hover:bg-gray-50'"
                >
                  <input
                    type="radio"
                    value="usdt"
                    v-model="form.payment_method"
                    class="mt-1 text-[#0e5e6f] focus:ring-[#3adbc4]"
                  />
                  <div class="flex-1 flex items-start gap-3">
                    <div class="mt-0.5 h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      ₮
                    </div>

                    <div class="flex-1">
                      <div class="font-bold text-gray-900">
                        {{ t('checkout.methods.usdt.title') || 'USDT Transfer' }}
                      </div>
                      <div class="text-sm text-gray-600 mt-0.5">
                        {{ t('checkout.methods.usdt.desc') || 'Send USDT to our wallet and verify via WhatsApp.' }}
                      </div>

                      <div
                        v-if="form.payment_method === 'usdt'"
                        class="mt-3 p-3 rounded-lg bg-white border border-gray-200 space-y-2 text-sm"
                      >
                        <div class="font-semibold text-[#0e5e6f]">
                          {{ t('checkout.methods.usdt.walletLabel') || 'Wallet Address (TRC20)' }}
                        </div>

                        <div class="flex items-center gap-2">
                          <code class="flex-1 bg-gray-50 px-2 py-1.5 rounded border border-gray-100 text-xs text-gray-600 break-all font-mono">
                            {{ usdtWallet || 'USDT_WALLET_ADDRESS_MISSING' }}
                          </code>

                          <button
                            type="button"
                            class="inline-flex items-center rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-bold hover:bg-gray-50 hover:text-[#0e5e6f] transition-colors"
                            @click.stop="copyWallet"
                          >
                            <span v-if="copiedWallet" class="text-emerald-600 flex items-center gap-1">
                              <span class="text-lg">✔</span> {{ t('checkout.copied') || 'Copied' }}
                            </span>
                            <span v-else>{{ t('checkout.copy') || 'Copy' }}</span>
                          </button>
                        </div>

                        <div class="text-xs text-gray-500 leading-relaxed">
                          {{ t('checkout.methods.usdt.afterPayment') || 'After transfer, please send screenshot to WhatsApp support.' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </label>

                <!-- International transfer -->
                <label
                  class="flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200"
                  :class="form.payment_method === 'transfer' ? 'border-[#3adbc4] bg-[#f0fdfc] shadow-sm' : 'border-gray-200 hover:border-[#3adbc4]/50 hover:bg-gray-50'"
                >
                  <input
                    type="radio"
                    value="transfer"
                    v-model="form.payment_method"
                    class="mt-1 text-[#0e5e6f] focus:ring-[#3adbc4]"
                  />
                  <div class="flex items-start gap-3">
                    <div class="mt-0.5 h-9 w-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      $
                    </div>
                    <div>
                      <div class="font-bold text-gray-900">
                        {{ t('checkout.methods.transfer.title') || 'International Transfer' }}
                      </div>
                      <div class="text-sm text-gray-600 mt-0.5">
                        {{ t('checkout.methods.transfer.desc') || 'Western Union or Bank Transfer details sent after order.' }}
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>
      </section>

      <!-- Summary -->
      <aside class="lg:col-span-4">
        <div class="lg:sticky lg:top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div class="border-b border-gray-100 bg-gradient-to-r from-[#0e5e6f]/5 to-[#3adbc4]/10 px-6 py-4">
            <h2 class="text-lg font-bold text-gray-900">
              {{ t('checkout.summary') || 'Order Summary' }}
            </h2>
          </div>

          <div class="p-6 space-y-4">
            <ul class="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              <li
                v-for="it in itemsRef"
                :key="rowKey(it)"
                class="flex items-start justify-between gap-3"
              >
                <div class="shrink-0">
                  <NuxtImg
                    v-if="it?.image"
                    :src="it.image"
                    width="48"
                    height="48"
                    :modifiers="{ fit: 'cover' }"
                    class="h-12 w-12 rounded-lg border border-gray-100 bg-white object-cover"
                    alt=""
                  />
                  <div v-else class="h-12 w-12 rounded-lg border border-gray-100 bg-gray-50 grid place-items-center text-gray-300 text-xs">—</div>
                </div>

                <div class="flex-1 min-w-0 pt-0.5">
                  <div class="line-clamp-2 text-sm font-bold text-gray-900 leading-tight">
                    {{ it?.name }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    x{{ it?.qty }} · <span class="font-medium">${{ price(it?.price) }}</span>
                  </div>
                </div>

                <div class="text-right tabular-nums text-sm font-bold text-[#0e5e6f]">
                  ${{ price(lineTotal(it)) }}
                </div>
              </li>
            </ul>

            <div class="flex justify-between text-sm pt-4 border-t border-gray-100">
              <span class="text-gray-600 font-medium">{{ t('cart.subtotal') || 'Subtotal' }}</span>
              <span class="font-bold tabular-nums text-gray-900">${{ price(subtotal) }}</span>
            </div>

            <div class="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span class="text-base font-bold text-gray-900">{{ t('cart.total') || 'Total' }}</span>
              <span class="text-2xl font-black tabular-nums text-[#0e5e6f]">${{ price(subtotal) }}</span>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <label class="flex items-start gap-3 cursor-pointer group">
                <input
                  v-model="form.accept_terms"
                  type="checkbox"
                  class="mt-1 rounded border-gray-300 text-[#0e5e6f] focus:ring-[#3adbc4]"
                />
                <span class="text-xs text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">
                   {{ t('checkout.acceptTermsPre') || 'I accept the' }} 
                   <NuxtLink to="/terms-conditions" target="_blank" class="text-[#0e5e6f] underline hover:text-[#3adbc4]">
                     {{ t('checkout.acceptTermsLink') || 'Terms & Conditions' }}
                   </NuxtLink>
                </span>
              </label>

              <div v-if="errorMsg" class="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-700 border border-red-100">
                {{ errorMsg }}
              </div>
              <div v-if="successMsg" class="rounded-xl bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700 border border-emerald-100">
                {{ successMsg }}
              </div>

              <button
                type="button"
                class="btn w-full shadow-md hover:shadow-lg transition-all"
                :disabled="placing || !canSubmit"
                @click="placeOrder"
              >
                <span v-if="placing" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  {{ t('checkout.placing') || 'Processing...' }}
                </span>
                <span v-else>
                  {{ t('checkout.placeOrder') || 'Complete Order' }}
                </span>
              </button>
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
const router = useRouter()
const { $api } = useNuxtApp()
const auth = (typeof useAuth === 'function' ? useAuth() : null) as any

const user = computed(() => auth?.user?.value)
const userEmail = computed(() => (user.value as any)?.email || '')

const runtimeConfig = useRuntimeConfig()
const usdtWallet = computed(() => runtimeConfig.public?.usdtWallet || '')
const whatsappNumber = computed(() => runtimeConfig.public?.whatsappNumber || '')

/** Normalize cart items */
const itemsRef = computed<any[]>(() => {
  const raw = (cart as any)?.items
  if (Array.isArray(raw?.value)) return raw.value as any[]
  if (Array.isArray(raw)) return raw as any[]
  return [] as any[]
})
const itemsLen = computed(() => itemsRef.value.length)

/** Summary */
const subtotal = computed(() =>
  itemsRef.value.reduce(
    (sum, i: any) => sum + Number(i?.price || 0) * Number(i?.qty || 0),
    0
  )
)

const price = (n: number | string) => Number(n || 0).toFixed(2)
const lineTotal = (it: any) => Number(it?.price || 0) * Number(it?.qty || 0)

/** cart row key */
const cartId = (it: any) =>
  it?.id ?? `${it?.product_type}:${it?.product_id}` 
const rowKey = (it: any) => String(cartId(it))

/** Form + submit */
const form = reactive({
  full_name: '',
  company: '',
  vat_number: '',
  notes: '',
  payment_method: '' as '' | 'paypal' | 'usdt' | 'transfer',
  accept_terms: false,
})

onMounted(() => {
  if (user.value) {
    const u: any = user.value
    form.full_name =
      u.name || [u.first_name, u.last_name].filter(Boolean).join(' ') || ''
  }
})

const placing = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

/** Copy wallet */
const copiedWallet = ref(false)
async function copyWallet() {
  if (!usdtWallet.value) return
  try {
    await navigator.clipboard.writeText(usdtWallet.value)
    copiedWallet.value = true
    setTimeout(() => {
      copiedWallet.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy wallet address', e)
  }
}

/** canSubmit: controls disabled state of button */
const canSubmit = computed(() => {
  return (
    !!form.full_name &&
    !!userEmail.value &&
    !!form.payment_method &&
    form.accept_terms &&
    itemsLen.value > 0 &&
    !placing.value
  )
})

async function placeOrder() {
  if (!canSubmit.value) return

  placing.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const payload = {
      full_name: form.full_name,
      company: form.company,
      vat_number: form.vat_number,
      notes: form.notes,
      payment_method: form.payment_method,
      accept_terms: form.accept_terms,
      email: userEmail.value,
      items: itemsRef.value.map((it) => ({
        id: it.id,
        product_id: it.product_id,
        qty: it.qty,
        unit_price: it.price,
      })),
    }

    const res: any = await $api('/checkout', {
      method: 'POST',
      body: payload,
    })

    if (form.payment_method === 'paypal') {
      successMsg.value = t('checkout.successPaypal') || 'Redirecting to PayPal...'
      if (res?.paypal_invoice_url) {
        window.location.href = res.paypal_invoice_url
      } else {
        successMsg.value = t('checkout.successPaypalNoUrl') || 'Invoice sent to email.'
      }
    }
    else if (form.payment_method === 'usdt') {
      successMsg.value = t('checkout.successUsdt') || 'Order created. Please send USDT proof.'
    } else {
      successMsg.value = t('checkout.successTransfer') || 'Order created. Transfer details sent.'
    }

  } catch (e: any) {
    console.error(e)
    errorMsg.value = e?.data?.message || e?.message || (t('checkout.error') as string) || 'Order failed.'
  } finally {
    placing.value = false
  }
}
</script>

<style scoped>
/* Brand Gradient Button */
.btn {
  @apply inline-flex items-center justify-center rounded-xl text-white px-5 py-3 font-bold shadow-md transition-all duration-200 transform;
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
}
.btn:hover { @apply shadow-lg opacity-95 -translate-y-0.5; }
.btn:disabled { @apply opacity-60 cursor-not-allowed transform-none; }

/* Brand Input */
.input {
  @apply w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] transition-all;
}

.tabular-nums { font-variant-numeric: tabular-nums; }

/* Custom Scrollbar for summary list */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>