<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const { $api } = useNuxtApp()

const auth = (typeof useAuth === 'function' ? useAuth() : null) as any
const user = computed(() => auth?.user?.value || null)

// ✅ REACTIVE token check (important)
const clientToken = computed(() =>
  process.client
    ? (localStorage.getItem('auth_token') || localStorage.getItem('pk:token'))
    : null
)

type TabKey = 'overview' | 'orders' | 'lookups'
const activeTab = ref<TabKey>('overview')
const expandedOrderId = ref<number | null>(null)

function setTab(tab: TabKey) {
  activeTab.value = tab
}

/* Redirect if not logged in */
onMounted(() => {
  if (!user.value && !clientToken.value) {
    router.push('/login?redirect=/account')
  } else {
    fetchOverview()
    fetchOrders()
    fetchLookups()
  }
})

/* ---------------- LOGOUT (FIXED) ---------------- */
async function doLogout() {
  try {
    await auth?.logout?.()
  } finally {
    // composable clears token + user already
    router.push('/')
  }
}

/* ---------------- Overview ---------------- */
const loadingOverview = ref(false)
const overviewError = ref<string | null>(null)
const profile = ref<any>(null)
const stats = ref<any>(null)
const wallets = ref<any[]>([])

const kiaBeforeTokens = computed(() => {
  const w = wallets.value.find((w: any) => w.service_slug === 'kia-hyundai-before-2017')
  return w ? Number(w.tokens || 0) : 0
})
const kiaAfterTokens = computed(() => {
  const w = wallets.value.find((w: any) => w.service_slug === 'kia-hyundai-after-2017')
  return w ? Number(w.tokens || 0) : 0
})

const editingProfile = ref(false)
const savingProfile = ref(false)
const profileError = ref<string | null>(null)
const profileSuccess = ref<string | null>(null)

const profileForm = reactive({ name: '', email: '', phone: '' })

async function fetchOverview() {
  loadingOverview.value = true
  overviewError.value = null
  try {
    const res: any = await $api('/account/overview', { method: 'GET' })
    profile.value = res.profile || null
    stats.value = res.stats || null
    wallets.value = Array.isArray(res.wallets) ? res.wallets : []

    if (profile.value) {
      profileForm.name = profile.value.name || ''
      profileForm.email = profile.value.email || ''
      profileForm.phone = profile.value.phone || ''
    }
  } catch (e: any) {
    overviewError.value = e?.data?.message || e?.message || 'Failed to load overview'
  } finally {
    loadingOverview.value = false
  }
}

async function saveProfile() {
  profileError.value = null
  profileSuccess.value = null

  if (!profileForm.name || !profileForm.email) {
    profileError.value = 'Name and email are required.'
    return
  }

  savingProfile.value = true
  try {
    const res: any = await $api('/account/profile', {
      method: 'PUT',
      body: { ...profileForm, phone: profileForm.phone || null },
    })

    profile.value = res.user || profile.value
    profileSuccess.value = t('account.profile.updated') || 'Profile updated successfully.'
    editingProfile.value = false

    if (auth && typeof auth.reloadUser === 'function') {
      await auth.reloadUser()
    }
  } catch (e: any) {
    profileError.value =
      e?.data?.message ||
      e?.message ||
      t('account.profile.updateFailed') ||
      'Failed to update profile.'
  } finally {
    savingProfile.value = false
  }
}

/* ---------------- Orders ---------------- */
const loadingOrders = ref(false)
const ordersError = ref<string | null>(null)
const orders = ref<any[]>([])
const ordersMeta = ref<any>({ current_page: 1, last_page: 1 })

async function fetchOrders(page = 1) {
  loadingOrders.value = true
  ordersError.value = null
  try {
    const res: any = await $api(`/account/orders?page=${page}`, { method: 'GET' })
    orders.value = Array.isArray(res.data) ? res.data : []
    ordersMeta.value = res.meta || { current_page: 1, last_page: 1 }
  } catch (e: any) {
    ordersError.value = e?.data?.message || e?.message || 'Failed to load orders'
  } finally {
    loadingOrders.value = false
  }
}

function toggleOrder(id: number) {
  expandedOrderId.value = expandedOrderId.value === id ? null : id
}

/* ---------------- Lookups ---------------- */
const loadingLookups = ref(false)
const lookupsError = ref<string | null>(null)
const lookups = ref<any[]>([])
const lookupsMeta = ref<any>({ current_page: 1, last_page: 1 })

async function fetchLookups(page = 1) {
  loadingLookups.value = true
  lookupsError.value = null
  try {
    const res: any = await $api(`/account/lookups?page=${page}`, { method: 'GET' })
    lookups.value = Array.isArray(res.data) ? res.data : []
    lookupsMeta.value = res.meta || { current_page: 1, last_page: 1 }
  } catch (e: any) {
    lookupsError.value = e?.data?.message || e?.message || 'Failed to load VIN lookups'
  } finally {
    loadingLookups.value = false
  }
}

/* ---------------- Helpers ---------------- */
const formatDate = (value: string | null) => (value ? new Date(value).toLocaleString() : '')
const formatMoney = (value: number | string) => '$' + Number(value || 0).toFixed(2)
const statusBadge = (s: string) => {
  const v = (s || '').toLowerCase()
  if (v === 'completed' || v === 'paid') return 'badge badge--ok'
  if (v === 'failed' || v === 'cancelled') return 'badge badge--bad'
  return 'badge badge--wait'
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Title + Logout -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
          {{ t('account.title') || 'My account' }}
        </h1>
        <p class="text-sm text-gray-500 mt-1">Manage your profile, orders, and tokens.</p>
      </div>

      <button
        v-if="user || clientToken"
        class="btn-ghost text-xs sm:text-sm"
        @click="doLogout"
      >
        {{ t('auth.logout') || 'Logout' }}
      </button>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-8">
      <nav class="-mb-px flex gap-6 text-sm font-medium">
        <button
          type="button"
          class="tab-btn"
          :class="activeTab === 'overview' ? 'tab-btn--active' : ''"
          @click="setTab('overview')"
        >
          {{ t('account.tabs.overview') || 'Overview' }}
        </button>

        <button
          type="button"
          class="tab-btn"
          :class="activeTab === 'orders' ? 'tab-btn--active' : ''"
          @click="setTab('orders')"
        >
          {{ t('account.tabs.orders') || 'Orders' }}
        </button>

        <button
          type="button"
          class="tab-btn"
          :class="activeTab === 'lookups' ? 'tab-btn--active' : ''"
          @click="setTab('lookups')"
        >
          {{ t('account.tabs.lookups') || 'VIN lookups' }}
        </button>
      </nav>
    </div>

    <!-- OVERVIEW -->
    <section v-if="activeTab === 'overview'" class="space-y-6">
      <div v-if="overviewError" class="alert alert--bad">{{ overviewError }}</div>

      <div class="grid gap-5 md:grid-cols-3">
        <div class="stat-card">
          <div class="stat-label">{{ t('account.cards.totalOrders') || 'Total orders' }}</div>
          <div class="stat-value">{{ stats?.total_orders ?? 0 }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">{{ t('account.cards.totalLookups') || 'VIN lookups' }}</div>
          <div class="stat-value">{{ stats?.total_lookups ?? 0 }}</div>
          <div class="stat-sub text-[#0e5e6f]">
            {{ t('account.cards.completed') || 'Completed' }}: {{ stats?.completed_lookups ?? 0 }}
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">{{ t('account.cards.tokensSpent') || 'Tokens spent' }}</div>
          <div class="stat-value">{{ stats?.total_tokens_spent ?? 0 }}</div>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <div class="stat-card border-l-4 border-l-[#0e5e6f]">
          <div class="stat-label">{{ t('account.cards.kiaBefore') || 'Kia / Hyundai tokens (before 2017)' }}</div>
          <div class="stat-value text-[#0e5e6f]">{{ kiaBeforeTokens }}</div>
        </div>
        <div class="stat-card border-l-4 border-l-[#3adbc4]">
          <div class="stat-label">{{ t('account.cards.kiaAfter') || 'Kia / Hyundai tokens (2017 and after)' }}</div>
          <div class="stat-value text-[#0e5e6f]">{{ kiaAfterTokens }}</div>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-[2fr_3fr]">
        <!-- Profile -->
        <div class="card">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 class="text-base font-bold text-gray-900">{{ t('account.profile.title') || 'Profile' }}</h2>
            <button
              class="text-xs font-semibold text-[#0e5e6f] hover:text-[#3adbc4] hover:underline"
              @click="editingProfile = !editingProfile; profileError=null; profileSuccess=null;"
            >
              {{ editingProfile ? (t('common.cancel') || 'Cancel') : (t('account.profile.edit') || 'Edit') }}
            </button>
          </div>

          <div v-if="!editingProfile" class="space-y-4 text-sm">
            <div class="field">
              <div class="field-label">{{ t('common.name') || 'Name' }}</div>
              <div class="field-value">{{ profile?.name || '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">{{ t('common.email') || 'Email' }}</div>
              <div class="field-value">{{ profile?.email || '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">{{ t('common.phone') || 'Phone' }}</div>
              <div class="field-value">{{ profile?.phone || '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">{{ t('account.profile.memberSince') || 'Member since' }}</div>
              <div class="field-value">{{ profile?.created_at ? formatDate(profile.created_at) : '-' }}</div>
            </div>
          </div>

          <form v-else class="space-y-4 text-sm" @submit.prevent="saveProfile">
            <div>
              <label class="label">{{ t('common.name') || 'Name' }}</label>
              <input v-model.trim="profileForm.name" class="input" required />
            </div>
            <div>
              <label class="label">{{ t('common.email') || 'Email' }}</label>
              <input v-model.trim="profileForm.email" class="input" type="email" required />
            </div>
            <div>
              <label class="label">{{ t('common.phone') || 'Phone' }}</label>
              <input v-model.trim="profileForm.phone" class="input" />
            </div>

            <p v-if="profileError" class="text-xs text-red-600">{{ profileError }}</p>
            <p v-if="profileSuccess" class="text-xs text-emerald-600">{{ profileSuccess }}</p>

            <button class="btn w-full" :disabled="savingProfile">
              {{ savingProfile ? (t('common.loading') || 'Saving…') : (t('common.save') || 'Save Changes') }}
            </button>
          </form>
        </div>

        <!-- Wallets -->
        <div class="card">
          <h2 class="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            {{ t('account.wallets.title') || 'Service wallets' }}
          </h2>

          <div v-if="!wallets.length" class="text-sm text-gray-500 italic">
            {{ t('account.wallets.empty') || 'No wallets found.' }}
          </div>

          <ul v-else class="divide-y divide-gray-100 text-sm">
            <li v-for="w in wallets" :key="w.id" class="flex items-center justify-between py-3">
              <div>
                <div class="font-bold text-gray-800">{{ w.service_name || ('Service #' + w.service_id) }}</div>
                <div class="text-xs text-gray-500">{{ t('account.wallets.tokens') || 'Current Balance' }}</div>
              </div>
              <div class="text-xl font-black tabular-nums text-[#0e5e6f] bg-[#f0fdfc] px-3 py-1 rounded-lg">
                {{ w.tokens }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ORDERS -->
    <section v-else-if="activeTab === 'orders'" class="space-y-5">
      <div v-if="ordersError" class="alert alert--bad">{{ ordersError }}</div>

      <div class="card overflow-hidden !p-0">
        <table class="w-full text-sm">
          <thead class="thead">
            <tr>
              <th class="th">#</th>
              <th class="th">{{ t('account.orders.date') || 'Date' }}</th>
              <th class="th">{{ t('account.orders.status') || 'Status' }}</th>
              <th class="th">{{ t('account.orders.payment') || 'Payment' }}</th>
              <th class="th text-right">{{ t('account.orders.total') || 'Total' }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="!orders.length">
              <td colspan="5" class="px-6 py-10 text-center text-gray-500 italic">
                {{ t('account.orders.empty') || 'No orders found.' }}
              </td>
            </tr>

            <template v-for="o in orders" :key="o.id">
              <tr class="tr cursor-pointer hover:bg-[#f0fdfc]/50 transition-colors" @click="toggleOrder(o.id)">
                <td class="td font-bold text-[#0e5e6f]">#{{ o.id }}</td>
                <td class="td text-gray-600">{{ formatDate(o.created_at) }}</td>
                <td class="td"><span :class="statusBadge(o.status)">{{ o.status }}</span></td>
                <td class="td capitalize text-gray-600">{{ o.payment_method }}</td>
                <td class="td text-right font-bold text-[#0e5e6f]">{{ formatMoney(o.subtotal) }}</td>
              </tr>

              <tr v-if="expandedOrderId === o.id" class="bg-gray-50 border-b border-gray-200 shadow-inner">
                <td colspan="5" class="px-6 py-5">
                  <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    {{ t('account.orders.items') || 'Order items' }}
                  </div>

                  <div v-if="!o.items?.length" class="text-xs text-gray-500">—</div>

                  <ul v-else class="space-y-3">
                    <li
                      v-for="it in o.items"
                      :key="it.id"
                      class="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
                    >
                      <div class="flex items-center gap-3 min-w-0">
                        <NuxtImg
                          v-if="it.image_url"
                          :src="it.image_url"
                          class="h-12 w-12 rounded-lg border border-gray-100 bg-white object-contain p-1"
                          format="webp"
                          alt=""
                        />
                        <div class="min-w-0">
                          <NuxtLink
                            v-if="it.product_slug"
                            :to="`/product/${it.product_slug}`"
                            class="font-semibold text-[#0e5e6f] hover:text-[#3adbc4] hover:underline line-clamp-1 transition-colors"
                          >
                            {{ it.product_name || ('Product #' + it.product_id) }}
                          </NuxtLink>
                          <div v-else class="font-medium line-clamp-1">
                            {{ it.product_name || ('Product #' + it.product_id) }}
                          </div>

                          <div class="text-xs text-gray-500 mt-0.5">
                            Qty: <span class="font-medium">{{ it.qty }}</span> · Unit: <span class="font-medium">{{ formatMoney(it.price) }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="text-sm font-bold text-gray-900 tabular-nums">
                        {{ formatMoney(it.line_total) }}
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div v-if="ordersMeta.last_page > 1" class="flex items-center justify-end gap-2 text-xs font-medium">
        <button class="pager-btn" :disabled="ordersMeta.current_page <= 1"
          @click="fetchOrders(ordersMeta.current_page - 1)">‹ Prev</button>
        <span class="px-2">{{ ordersMeta.current_page }} / {{ ordersMeta.last_page }}</span>
        <button class="pager-btn" :disabled="ordersMeta.current_page >= ordersMeta.last_page"
          @click="fetchOrders(ordersMeta.current_page + 1)">Next ›</button>
      </div>
    </section>

    <!-- LOOKUPS -->
    <section v-else-if="activeTab === 'lookups'" class="space-y-4">
      <div v-if="lookupsError" class="alert alert--bad">{{ lookupsError }}</div>

      <div class="card overflow-hidden !p-0">
        <table class="w-full text-sm">
          <thead class="thead">
            <tr>
              <th class="th">#</th>
              <th class="th">{{ t('account.lookups.vin') || 'VIN' }}</th>
              <th class="th">{{ t('account.lookups.service') || 'Service' }}</th>
              <th class="th">{{ t('account.lookups.status') || 'Status' }}</th>
              <th class="th text-right">{{ t('account.lookups.cost') || 'Tokens' }}</th>
              <th class="th">{{ t('account.lookups.date') || 'Date' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!lookups.length">
              <td colspan="6" class="px-6 py-10 text-center text-gray-500 italic">
                {{ t('account.lookups.empty') || 'No VIN lookups yet.' }}
              </td>
            </tr>
            <tr v-for="l in lookups" :key="l.id" class="tr hover:bg-gray-50 transition-colors">
              <td class="td font-bold text-[#0e5e6f]">#{{ l.id }}</td>
              <td class="td font-mono text-xs sm:text-sm tracking-wide bg-gray-50 rounded px-2 py-1">{{ l.vin || '—' }}</td>
              <td class="td font-medium text-gray-700">{{ l.service_name || ('Service #' + l.service_id) }}</td>
              <td class="td"><span :class="statusBadge(l.status)">{{ l.status }}</span></td>
              <td class="td text-right font-bold tabular-nums text-gray-900">{{ l.cost_tokens }}</td>
              <td class="td text-gray-500">{{ formatDate(l.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="lookupsMeta.last_page > 1" class="flex items-center justify-end gap-2 text-xs font-medium">
        <button class="pager-btn" :disabled="lookupsMeta.current_page <= 1"
          @click="fetchLookups(lookupsMeta.current_page - 1)">‹ Prev</button>
        <span class="px-2">{{ lookupsMeta.current_page }} / {{ lookupsMeta.last_page }}</span>
        <button class="pager-btn" :disabled="lookupsMeta.current_page >= lookupsMeta.last_page"
          @click="fetchLookups(lookupsMeta.current_page + 1)">Next ›</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Card Base */
.card { 
  @apply rounded-2xl border border-gray-200 bg-white p-6 shadow-sm; 
}

/* Tabs */
.tab-btn { 
  @apply border-b-2 border-transparent pb-3 px-2 text-gray-500 hover:text-[#0e5e6f] transition-all font-medium; 
}
.tab-btn--active { 
  @apply border-[#3adbc4] text-[#0e5e6f] font-bold; 
}

/* Alerts */
.alert { @apply rounded-xl px-4 py-3 text-sm font-medium; }
.alert--bad { @apply bg-red-50 text-red-700 border border-red-100; }

/* Stat Cards */
.stat-card { 
  @apply rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow; 
}
.stat-label { @apply text-xs font-bold text-gray-400 uppercase tracking-wider mb-1; }
.stat-value { @apply text-3xl font-black tabular-nums text-gray-900; }
.stat-sub { @apply text-xs font-medium mt-1; }

/* Fields (Read Only) */
.field { @apply rounded-xl bg-gray-50 px-4 py-3 border border-gray-100; }
.field-label { @apply text-xs text-gray-500 mb-0.5; }
.field-value { @apply font-semibold text-gray-900; }

/* Forms */
.label { @apply block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide; }
.input { 
  @apply w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] transition-all; 
}

/* Gradient Buttons */
.btn {
  @apply inline-flex items-center justify-center rounded-xl text-white px-5 py-2.5 font-bold shadow-md transition-all duration-200 transform;
  background-image: linear-gradient(135deg, #0e5e6f 0%, #3adbc4 100%);
}
.btn:hover { @apply shadow-lg opacity-95 -translate-y-0.5; }
.btn:disabled { @apply opacity-60 cursor-not-allowed transform-none; }

.btn-ghost {
  @apply inline-flex items-center justify-center rounded-xl bg-white text-[#0e5e6f] border border-[#0e5e6f]/30 px-4 py-2 hover:bg-[#f0fdfc] hover:border-[#3adbc4] transition-all font-semibold;
}

/* Tables */
.thead { @apply bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500; }
.th { @apply px-6 py-3 text-left font-bold tracking-wider; }
.tr { @apply border-b border-gray-100 last:border-0; }
.td { @apply px-6 py-4 align-middle; }

/* Badges */
.badge { @apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border; }
.badge--ok { @apply bg-emerald-50 text-emerald-700 border-emerald-200; }
.badge--bad { @apply bg-red-50 text-red-700 border-red-200; }
.badge--wait { @apply bg-amber-50 text-amber-700 border-amber-200; }

/* Pager */
.pager-btn { 
  @apply px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#0e5e6f] hover:border-[#3adbc4]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all; 
}

.tabular-nums { font-variant-numeric: tabular-nums; }
</style>