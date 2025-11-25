// composables/useCart.ts
import { computed, onMounted, watch } from 'vue'

export type CartItem = {
  id?: number
  product_id: number
  product_type: 'token-pack' | string
  slug: string
  sku?: string | null
  name: string
  price: number
  qty: number
  image?: string | null
  meta?: Record<string, any> | null
}

const STORAGE_KEY = 'pk:cart'
const makeKey = (it: Pick<CartItem, 'slug' | 'product_type' | 'product_id'>) =>
  it.slug || `${it.product_type}:${it.product_id}`

function unitPriceForQty(
  qty: number,
  meta?: Record<string, any> | null,
  base?: number,
  sale?: number
): number {
  const q = Math.max(1, Number(qty || 1))
  const tiers = Array.isArray(meta?.pricing_tiers) ? [...(meta!.pricing_tiers as any[])] : []
  tiers.sort((a: any, b: any) => (a?.min_qty || 1) - (b?.min_qty || 1))
  for (const t of tiers) {
    const min = Number(t?.min_qty || 1)
    const max = t?.max_qty == null ? Number.POSITIVE_INFINITY : Number(t.max_qty)
    if (q >= min && q <= max) return Number(t?.sale_price_usd ?? t?.price_usd ?? 0)
  }
  return Number((meta?.sale_price_usd ?? sale) ?? (meta?.base_price_usd ?? (meta as any)?.price_usd ?? base) ?? 0)
}

export function useCart() {
  const nuxt = useNuxtApp()
  const $api: (<T = any>(p: string, o?: any) => Promise<T>) = (nuxt as any).$api

  const state = useState('cart', () => ({
    loaded: false,
    items: [] as CartItem[],
    map: new Map<string, CartItem>(), // maps composite key AND numeric id strings
    subtotal: 0,
  }))

  const isAuthed = () =>
    process.client && !!(localStorage.getItem('auth_token') || localStorage.getItem('pk:token'))

  const persist = () => {
    if (!process.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value.items))
    } catch {}
  }

  /** Reindex by composite key AND server numeric id (as string) */
  const reindex = () => {
    const items = state.value.items || []
    const entries: [string, CartItem][] = []
    for (const i of items) {
      entries.push([makeKey(i), i])
      if (i.id != null) entries.push([String(i.id), i])
    }
    state.value.map = new Map(entries)
  }

  const recalcSubtotal = () => {
    const items = state.value.items || []
    state.value.subtotal = items.reduce(
      (s, it) => s + Number(it.price || 0) * Number(it.qty || 0),
      0
    )
  }

  onMounted(async () => {
    if (state.value.loaded) return
    if (isAuthed() && $api) {
      await reload(true)
    } else {
      try {
        const raw = process.client ? localStorage.getItem(STORAGE_KEY) : null
        const arr = raw ? JSON.parse(raw) : []
        state.value.items = Array.isArray(arr) ? arr : []
      } catch {}
      reindex()
      recalcSubtotal()
    }
    state.value.loaded = true
  })

  watch(
    () => state.value.items,
    () => {
      reindex()
      persist()
      recalcSubtotal()
    },
    { deep: true }
  )

  const items = computed<CartItem[]>(() => state.value.items || [])
  const count = computed(() =>
    (state.value.items || []).reduce((n, it) => n + Number(it.qty || 0), 0)
  )
  const subtotal = computed(() => Number(state.value.subtotal || 0))

  function normalizeCartResponse(res: any) {
    const box =
      res?.data && (Array.isArray(res.data.items) || res.data.subtotal != null) ? res.data : res
    const serverItems: CartItem[] = Array.isArray(box?.items) ? box.items : []
    const serverSubtotal: number = Number(box?.subtotal ?? 0)
    return { serverItems, serverSubtotal }
  }

  async function reload(fallbackToLocal = false) {
    if (!isAuthed() || !$api) {
      if (fallbackToLocal) {
        try {
          const raw = process.client ? localStorage.getItem(STORAGE_KEY) : null
          state.value.items = raw ? JSON.parse(raw!) : []
        } catch {
          state.value.items = []
        }
        reindex()
        recalcSubtotal()
      }
      return
    }
    try {
      const res: any = await $api('/cart', { method: 'GET' })
      const { serverItems, serverSubtotal } = normalizeCartResponse(res)
      state.value.items = serverItems
      state.value.subtotal = serverSubtotal
      reindex()
    } catch {
      if (fallbackToLocal) {
        try {
          const raw = process.client ? localStorage.getItem(STORAGE_KEY) : null
          state.value.items = raw ? JSON.parse(raw!) : []
        } catch {
          state.value.items = []
        }
        reindex()
        recalcSubtotal()
      }
    }
  }

  async function mergeToServer() {
    if (!isAuthed() || !$api) return
    const guest = snapshot()
    if (!guest.length) return
    const payload = guest.map(i => ({
      product_id: i.product_id,
      product_type: i.product_type,
      qty: Number(i.qty || 1),
      name: i.name,
      slug: i.slug ?? null,
      sku: i.sku ?? null,
      price: Number(i.price || 0),
      image: i.image ?? null,
      meta: i.meta ?? null,
    }))
    try {
      await $api('/cart/merge', { method: 'POST', body: { items: payload } })
    } catch {}
  }

  async function afterAuthSync() {
    await mergeToServer()
    await reload(true)
  }

  function addLocal(payload: CartItem | (Omit<CartItem, 'qty'> & { qty?: number })) {
    const item: CartItem = {
      qty: 1,
      meta: null,
      ...payload,
      price: Number((payload as any).price || 0),
    }
    const key = makeKey(item)
    const existed = state.value.map.get(key)
    if (existed) {
      existed.qty = Number(existed.qty || 0) + Number(item.qty || 1)
      existed.price = unitPriceForQty(
        existed.qty,
        existed.meta,
        (existed.meta as any)?.base_price_usd,
        (existed.meta as any)?.sale_price_usd
      )
    } else {
      state.value.items.push({ ...item, qty: Number(item.qty || 1) })
    }
    recalcSubtotal()
  }

  function setQtyLocal(keyOrItem: string | number | CartItem, qty: number) {
    const it = resolveItem(keyOrItem)
    if (!it) return
    it.qty = Math.max(1, Math.floor(Number(qty) || 1))
    it.price = unitPriceForQty(
      it.qty,
      it.meta,
      (it.meta as any)?.base_price_usd,
      (it.meta as any)?.sale_price_usd
    )
    recalcSubtotal()
  }

  function removeLocal(keyOrItem: string | number | CartItem) {
    const it = resolveItem(keyOrItem)
    if (!it) return
    const idx = (state.value.items || []).findIndex(i => i === it)
    if (idx >= 0) state.value.items.splice(idx, 1)
    recalcSubtotal()
  }

  async function add(payload: CartItem | (Omit<CartItem, 'qty'> & { qty?: number })) {
    if (!isAuthed() || !$api) return addLocal(payload)
    const body = {
      product_id: payload.product_id,
      product_type: payload.product_type,
      slug: payload.slug ?? null,
      sku: payload.sku ?? null,
      name: payload.name,
      price: Number((payload as any).price || 0),
      qty: Number((payload as any).qty || 1),
      image: (payload as any).image ?? null,
      meta: (payload as any).meta ?? null,
    }
    await $api('/cart/items', { method: 'POST', body })
    await reload()
  }

  /** ---------- Helpers to resolve any key → item ---------- */
  function resolveItem(keyOrItem: string | number | CartItem): CartItem | undefined {
    if (!keyOrItem) return undefined
    if (typeof keyOrItem === 'object') return keyOrItem as CartItem
    // try direct map
    const byMap = state.value.map.get(String(keyOrItem))
    if (byMap) return byMap
    // try find by composite or id
    const items = state.value.items || []
    if (typeof keyOrItem === 'string') {
      return items.find(i => makeKey(i) === keyOrItem)
    } else {
      const idNum = Number(keyOrItem)
      return items.find(i => Number(i.id) === idNum)
    }
  }

  /** ---------- SERVER actions now accept string | number | CartItem ---------- */
  async function setQty(keyOrItem: string | number | CartItem, qty: number) {
    qty = Math.max(1, Math.floor(Number(qty) || 1))
    if (!isAuthed() || !$api) return setQtyLocal(keyOrItem, qty)

    const item = resolveItem(keyOrItem)
    if (!item) return

    await $api('/cart/items/update', {
      method: 'POST',
      body: { product_id: item.product_id, product_type: item.product_type, qty },
    })
    await reload()
  }

  async function remove(keyOrItem: string | number | CartItem) {
    if (!isAuthed() || !$api) return removeLocal(keyOrItem)

    const item = resolveItem(keyOrItem)
    if (!item) return

    await $api('/cart/items/remove', {
      method: 'POST',
      body: { product_id: item.product_id, product_type: item.product_type },
    })
    await reload()
  }

  async function clear() {
    if (!isAuthed() || !$api) {
      state.value.items.splice(0, state.value.items.length)
      state.value.subtotal = 0
      persist()
      return
    }
    const snapshotItems = [...(state.value.items || [])]
    for (const it of snapshotItems) {
      await $api('/cart/items/remove', {
        method: 'POST',
        body: { product_id: it.product_id, product_type: it.product_type },
      })
    }
    await reload()
  }

  function replace(nextItems: CartItem[]) {
    state.value.items.splice(0, state.value.items.length, ...nextItems)
    recalcSubtotal()
  }

  function snapshot(): CartItem[] {
    return (state.value.items || []).map(i => ({ ...i, meta: i.meta ? { ...i.meta } : null }))
  }

  function sync() {
    persist()
  }

  return {
    items,
    count,
    subtotal,
    add,
    setQty,
    remove,
    clear,
    replace,
    snapshot,
    reload,
    mergeToServer,
    afterAuthSync,
    sync,
    makeKey,
  }
}
