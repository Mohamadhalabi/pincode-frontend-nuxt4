import { _ as __nuxt_component_0 } from './NuxtImg-ChoT4sHP.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DhHsLoL_.mjs';
import { defineComponent, reactive, withAsyncContext, watchEffect, watch, computed, ref, mergeProps, withCtx, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { a as useI18n, u as useHead } from './server.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
import { u as useAddedToast, a as useAsyncData, r as refreshNuxtData } from './useAddedToast-DsLqa03q.mjs';
import { u as useApi } from './useApi-CfP7biv6.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { locale, t } = useI18n();
    useCart();
    useAddedToast();
    const qty = reactive({});
    function normalizedTiers(p) {
      return (p.pricing_tiers || []).slice().sort((a, b) => (a.min_qty || 1) - (b.min_qty || 1));
    }
    function activeTierIndex(p, qtyNum) {
      const q = Math.max(1, Number(qtyNum || 1));
      const tiers = normalizedTiers(p);
      for (let i = 0; i < tiers.length; i++) {
        const tr = tiers[i];
        const max = tr.max_qty ?? Number.POSITIVE_INFINITY;
        if (q >= (tr.min_qty || 1) && q <= max) return i;
      }
      return -1;
    }
    function currentUnitPrice(p, qtyNum) {
      const q = Math.max(1, Number(qtyNum || 1));
      const tiers = normalizedTiers(p);
      for (const tr of tiers) {
        const max = tr.max_qty ?? Number.POSITIVE_INFINITY;
        if (q >= (tr.min_qty || 1) && q <= max) {
          return Number(tr.sale_price_usd ?? tr.price_usd ?? 0);
        }
      }
      return Number((p.sale_price_usd ?? p.price_usd) || 0);
    }
    function currentStrikePrice(p, qtyNum) {
      const q = Math.max(1, Number(qtyNum || 1));
      const tiers = normalizedTiers(p);
      for (const tr of tiers) {
        const max = tr.max_qty ?? Number.POSITIVE_INFINITY;
        if (q >= (tr.min_qty || 1) && q <= max) {
          return tr.sale_price_usd ? Number(tr.price_usd) : null;
        }
      }
      return p.sale_price_usd ? Number(p.price_usd) : null;
    }
    const { get } = useApi();
    const fetchPacks = () => get("/token-packs");
    const { data: packs, error: packErr } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "home-packs",
      fetchPacks,
      { server: true, immediate: true }
    )), __temp = await __temp, __restore(), __temp);
    watchEffect(() => {
      if (packs.value) {
        packs.value.forEach((p) => {
          if (!qty[p.id]) qty[p.id] = 1;
        });
      }
    });
    watch(locale, () => refreshNuxtData());
    const allPacks = computed(() => packs.value ?? []);
    const errorMsg = computed(() => {
      const e = packErr.value;
      return e?.statusMessage || e?.message || "";
    });
    const brands = [
      { key: "kia", name: "KIA", logo: "/img/brands/kia.svg" },
      { key: "hyundai", name: "HYUNDAI", logo: "/img/brands/hyundai.svg" },
      { key: "toyota", name: "TOYOTA", logo: "/img/brands/toyota.svg" }
    ];
    ref(null);
    useHead({
      title: t("seo.title") || "Immobilizer PIN Code Calculator",
      meta: [{ name: "description", content: t("seo.desc") || "VIN→PIN and token packs." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><section class="relative overflow-hidden rounded-2xl bg-gray-100"><div class="relative h-[260px] sm:h-[320px]">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/4884273.jpg",
        class: "w-full h-full object-cover",
        format: "webp",
        alt: "Kia / Hyundai VIN to PIN"
      }, null, _parent));
      _push(`<div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div><div class="absolute inset-0 flex items-center"><div class="px-6 sm:px-10"><div class="max-w-xl bg-white/90 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-md"><h1 class="text-2xl sm:text-3xl font-bold mb-3">${ssrInterpolate(_ctx.$t("hero.headline") || "Why choose our PIN Code platform?")}</h1><ul class="text-sm text-gray-700 space-y-1 mb-5"><li>• ${ssrInterpolate(_ctx.$t("hero.points.instant") || "Instant calculation 24/7")}</li><li>• ${ssrInterpolate(_ctx.$t("hero.points.noRenewal") || "No renewal fees · tokens never expire")}</li><li>• ${ssrInterpolate(_ctx.$t("hero.points.easy") || "Easy to Use")}</li></ul><div class="flex gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/new-lookup",
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("btn.newLookup") || "New VIN Lookup")}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("btn.newLookup") || "New VIN Lookup"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/buy",
        class: "btn btn-ghost"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("btn.buyTokens") || "Buy Tokens")}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("btn.buyTokens") || "Buy Tokens"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></section><section class="space-y-4"><div class="text-center"><h2 class="text-2xl sm:text-2xl font-extrabold tracking-tight">${ssrInterpolate(_ctx.$t("home.supportedBrands") || "Supported Brands")}</h2></div><div class="relative"><div class="overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"><div class="flex gap-6 items-center justify-start px-2 py-2 w-60"><!--[-->`);
      ssrRenderList(brands, (b) => {
        _push(`<div class="brand-pill">`);
        if (b.logo) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: b.logo,
            alt: b.name,
            format: "webp",
            class: "h-10 w-auto object-contain"
          }, null, _parent));
        } else {
          _push(`<span class="text-lg font-semibold tracking-wide">${ssrInterpolate(b.name)}</span>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
      if (unref(allPacks).length) {
        _push(`<section class="space-y-5"><div class="flex items-baseline justify-between"><h3 class="text-xl sm:text-2xl font-bold">${ssrInterpolate(_ctx.$t("home.tokenPacks") || "Token Packs")}</h3></div><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(unref(allPacks), (p) => {
          _push(`<article class="pack-card flex flex-col relative group">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product/${p.slug || p.id}`,
            class: "absolute inset-0 z-0",
            "aria-label": `Open ${p.name}`
          }, null, _parent));
          _push(`<header class="pack-card__header pack-card__header--dark text-center z-10"><h4 class="text-sm sm:text-md font-bold tracking-tight text-white leading-snug">${ssrInterpolate(p.name)}</h4></header><div class="pack-card__body flex-1 flex flex-col z-10"><div class="text-center"><span class="inline-block text-red-700 text-base font-bold">${ssrInterpolate(p.tokens)} ${ssrInterpolate(_ctx.$t("tokens") || "tokens")}</span></div>`);
          if (p.image_url) {
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: p.image_url,
              format: "webp",
              class: "pack-image",
              modifiers: { fit: "contain", background: "white" },
              alt: ""
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (p.sku) {
            _push(`<p class="text-green-600 text-center font-semibold text-xs mb-2"> SKU: ${ssrInterpolate(p.sku)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (p.pricing_tiers?.length) {
            _push(`<div class="tier-box mb-3"><table class="tier-table"><thead><tr><th class="text-left">${ssrInterpolate(_ctx.$t("common.quantity") || "Quantity")}</th><th class="text-right">${ssrInterpolate(_ctx.$t("common.price") || "Price")}</th></tr></thead><tbody><!--[-->`);
            ssrRenderList(normalizedTiers(p), (r, i) => {
              _push(`<tr class="${ssrRenderClass([
                i === activeTierIndex(p, unref(qty)[p.id]) ? "tier-row--active" : ""
              ])}"><td>`);
              if (r.max_qty) {
                _push(`<span>${ssrInterpolate(r.min_qty)}–${ssrInterpolate(r.max_qty)}</span>`);
              } else {
                _push(`<span>${ssrInterpolate(r.min_qty)}+</span>`);
              }
              _push(`</td><td class="text-right">`);
              if (r.sale_price_usd) {
                _push(`<!--[--><span class="font-bold text-red-700"> $${ssrInterpolate(Number(r.sale_price_usd).toFixed(2))}</span><span class="text-gray-400 line-through ml-1"> $${ssrInterpolate(Number(r.price_usd).toFixed(2))}</span><!--]-->`);
              } else {
                _push(`<span class="font-semibold text-gray-900"> $${ssrInterpolate(Number(r.price_usd).toFixed(2))}</span>`);
              }
              _push(`</td></tr>`);
            });
            _push(`<!--]--></tbody></table></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-center mb-3">`);
          if (currentStrikePrice(p, unref(qty)[p.id])) {
            _push(`<!--[--><div class="text-2xl font-black text-gray-900 leading-none"> $${ssrInterpolate(currentUnitPrice(p, unref(qty)[p.id]).toFixed(2))}</div><div class="text-xs text-gray-400 line-through mt-1"> $${ssrInterpolate(currentStrikePrice(p, unref(qty)[p.id]).toFixed(2))}</div><!--]-->`);
          } else {
            _push(`<div class="text-xl font-black text-red-500 leading-none"> $${ssrInterpolate(currentUnitPrice(p, unref(qty)[p.id]).toFixed(2))}</div>`);
          }
          _push(`</div><div class="mt-auto"><div class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(qty)[p.id])} type="number" min="1" class="w-14 rounded-lg border px-2 py-2 text-center text-sm"><button class="btn w-full">${ssrInterpolate(_ctx.$t("btn.addToCart") || "Add To Cart")}</button></div></div></div></article>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMsg)) {
        _push(`<div class="text-red-600 text-sm">${ssrInterpolate(unref(errorMsg))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-0p477zBX.mjs.map
