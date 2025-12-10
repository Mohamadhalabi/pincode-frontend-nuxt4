<template>
  <div class="mx-auto max-w-3xl px-4 py-16 text-center">
    <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
      <svg class="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <h1 class="mb-4 text-3xl font-extrabold text-gray-900">
      {{ t('success.title') || 'Order Placed Successfully!' }}
    </h1>

    <p class="mb-8 text-lg text-gray-600">
      {{ t('success.orderRef') || 'Your order reference is:' }}
      <span class="font-bold text-[#0e5e6f]">#{{ orderId }}</span>
    </p>

    <div v-if="method === 'usdt'" class="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-left">
      <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span class="text-emerald-500">₮</span> {{ t('success.usdtTitle') || 'Complete your USDT Payment' }}
      </h2>
      
      <p class="mb-4 text-sm text-gray-600">
        {{ t('success.usdtDesc') || 'Please transfer the total amount to the TRC20 wallet address below.' }}
      </p>

      <div class="mb-4 rounded-xl bg-gray-50 border border-gray-200 p-4">
        <label class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
          {{ t('success.walletLabel') || 'USDT (TRC20) Address' }}
        </label>
        <div class="flex items-center gap-2">
          <code class="flex-1 break-all font-mono text-sm text-gray-800 bg-white p-2 rounded border border-gray-100">
            {{ usdtWallet }}
          </code>
          <button
            @click="copyWallet"
            class="shrink-0 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#0e5e6f] transition-colors"
          >
            <span v-if="copied">{{ t('common.copied') || 'Copied!' }}</span>
            <span v-else>{{ t('common.copy') || 'Copy' }}</span>
          </button>
        </div>
      </div>
      
      <div class="text-xs text-gray-500 bg-blue-50 text-blue-700 p-3 rounded-lg">
         <strong>Important:</strong> After transferring, please click the button below to send us the proof of payment via WhatsApp.
      </div>
    </div>

    <div v-else-if="method === 'transfer'" class="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-left">
      <h2 class="text-xl font-bold text-gray-900 mb-2">
        {{ t('success.transferTitle') || 'Bank / Western Union Transfer' }}
      </h2>
      <p class="text-gray-600">
        {{ t('success.transferDesc') || 'We have received your order. Please contact us via WhatsApp to receive the banking details to complete your payment.' }}
      </p>
    </div>

    <div class="mt-8 space-y-4">
      <a
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-[#20bd5a] hover:-translate-y-1 transition-all"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>{{ t('btn.whatsappProof') || 'Send Proof via WhatsApp' }}</span>
      </a>

      <div class="block">
        <NuxtLinkLocale to="/" class="text-sm font-bold text-gray-500 hover:text-[#0e5e6f] underline">
          {{ t('common.returnHome') || 'Return to Home' }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

// 1. Get query params
const orderId = computed(() => route.query.order_id || '---')
const method = computed(() => route.query.method || '') // 'usdt' or 'transfer'

// 2. Config Data
const usdtWallet = computed(() => 'TMUnF98HTXiW3uQz4VbktLJuEaHcYS47zb')
const whatsappNumber = computed(() =>  '+447414902439') // fallback number

// 3. WhatsApp Link Logic
const whatsappLink = computed(() => {
  const cleanNum = whatsappNumber.value.replace(/[^\d]/g, '')
  let text = ''
  
  if (method.value === 'usdt') {
    text = `Hello, I placed order #${orderId.value}. Here is my USDT payment proof.`
  } else {
    text = `Hello, I placed order #${orderId.value}. Please provide transfer details.`
  }
  
  return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`
})

// 4. Copy Logic
const copied = ref(false)
async function copyWallet() {
  try {
    await navigator.clipboard.writeText(usdtWallet.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (e) {
    console.error(e)
  }
}
</script>