import { watch, computed } from 'vue';
import { d as useNuxtApp, i as useState } from './server.mjs';

const STORAGE_KEY = "pk:cart";
const makeKey = (it) => it.slug || `${it.product_type}:${it.product_id}`;
function unitPriceForQty(qty, meta, base, sale) {
  const q = Math.max(1, Number(qty || 1));
  const tiers = Array.isArray(meta?.pricing_tiers) ? [...meta.pricing_tiers] : [];
  tiers.sort((a, b) => (a?.min_qty || 1) - (b?.min_qty || 1));
  for (const t of tiers) {
    const min = Number(t?.min_qty || 1);
    const max = t?.max_qty == null ? Number.POSITIVE_INFINITY : Number(t.max_qty);
    if (q >= min && q <= max) return Number(t?.sale_price_usd ?? t?.price_usd ?? 0);
  }
  return Number(meta?.sale_price_usd ?? sale ?? (meta?.base_price_usd ?? meta?.price_usd ?? base) ?? 0);
}
function useCart() {
  const nuxt = useNuxtApp();
  nuxt.$api;
  const state = useState("cart", () => ({
    loaded: false,
    items: [],
    map: /* @__PURE__ */ new Map(),
    // maps composite key AND numeric id strings
    subtotal: 0
  }));
  const reindex = () => {
    const items2 = state.value.items || [];
    const entries = [];
    for (const i of items2) {
      entries.push([makeKey(i), i]);
      if (i.id != null) entries.push([String(i.id), i]);
    }
    state.value.map = new Map(entries);
  };
  const recalcSubtotal = () => {
    const items2 = state.value.items || [];
    state.value.subtotal = items2.reduce(
      (s, it) => s + Number(it.price || 0) * Number(it.qty || 0),
      0
    );
  };
  watch(
    () => state.value.items,
    () => {
      reindex();
      recalcSubtotal();
    },
    { deep: true }
  );
  const items = computed(() => state.value.items || []);
  const count = computed(
    () => (state.value.items || []).reduce((n, it) => n + Number(it.qty || 0), 0)
  );
  const subtotal = computed(() => Number(state.value.subtotal || 0));
  async function reload(fallbackToLocal = false) {
    {
      if (fallbackToLocal) {
        try {
          const raw = false ? localStorage.getItem(STORAGE_KEY) : null;
          state.value.items = raw ? JSON.parse(raw) : [];
        } catch {
          state.value.items = [];
        }
        reindex();
        recalcSubtotal();
      }
      return;
    }
  }
  async function mergeToServer() {
    return;
  }
  async function afterAuthSync() {
    await mergeToServer();
    await reload(true);
  }
  function addLocal(payload) {
    const item = {
      qty: 1,
      meta: null,
      ...payload,
      price: Number(payload.price || 0)
    };
    const key = makeKey(item);
    const existed = state.value.map.get(key);
    if (existed) {
      existed.qty = Number(existed.qty || 0) + Number(item.qty || 1);
      existed.price = unitPriceForQty(
        existed.qty,
        existed.meta,
        existed.meta?.base_price_usd,
        existed.meta?.sale_price_usd
      );
    } else {
      state.value.items.push({ ...item, qty: Number(item.qty || 1) });
    }
    recalcSubtotal();
  }
  function setQtyLocal(keyOrItem, qty) {
    const it = resolveItem(keyOrItem);
    if (!it) return;
    it.qty = Math.max(1, Math.floor(Number(qty) || 1));
    it.price = unitPriceForQty(
      it.qty,
      it.meta,
      it.meta?.base_price_usd,
      it.meta?.sale_price_usd
    );
    recalcSubtotal();
  }
  function removeLocal(keyOrItem) {
    const it = resolveItem(keyOrItem);
    if (!it) return;
    const idx = (state.value.items || []).findIndex((i) => i === it);
    if (idx >= 0) state.value.items.splice(idx, 1);
    recalcSubtotal();
  }
  async function add(payload) {
    return addLocal(payload);
  }
  function resolveItem(keyOrItem) {
    if (!keyOrItem) return void 0;
    if (typeof keyOrItem === "object") return keyOrItem;
    const byMap = state.value.map.get(String(keyOrItem));
    if (byMap) return byMap;
    const items2 = state.value.items || [];
    if (typeof keyOrItem === "string") {
      return items2.find((i) => makeKey(i) === keyOrItem);
    } else {
      const idNum = Number(keyOrItem);
      return items2.find((i) => Number(i.id) === idNum);
    }
  }
  async function setQty(keyOrItem, qty) {
    qty = Math.max(1, Math.floor(Number(qty) || 1));
    return setQtyLocal(keyOrItem, qty);
  }
  async function remove(keyOrItem) {
    return removeLocal(keyOrItem);
  }
  async function clear() {
    {
      state.value.items.splice(0, state.value.items.length);
      state.value.subtotal = 0;
      return;
    }
  }
  function replace(nextItems) {
    state.value.items.splice(0, state.value.items.length, ...nextItems);
    recalcSubtotal();
  }
  function snapshot() {
    return (state.value.items || []).map((i) => ({ ...i, meta: i.meta ? { ...i.meta } : null }));
  }
  function sync() {
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
    makeKey
  };
}

export { useCart as u };
//# sourceMappingURL=useCart-Djb1VdLO.mjs.map
