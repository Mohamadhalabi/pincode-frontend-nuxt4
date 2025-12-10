import { _ as __nuxt_component_0 } from './NuxtImg-JZu4Om2_.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DhHsLoL_.mjs';
import { defineComponent, reactive, ref, withAsyncContext, watchEffect, watch, computed, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { a as useI18n, u as useHead } from './server.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
import { u as useAddedToast, a as useApi, b as useAsyncData, r as refreshNuxtData } from './useApi-KWNj2I5b.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
    ref(null);
    function normalizedTiers(p) {
      return (p.pricing_tiers || []).slice().sort((a, b) => (a.min_qty || 1) - (b.min_qty || 1));
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
      { key: "hyundai", name: "HYUNDAI", logo: "/img/brands/hyundai.svg" }
    ];
    useHead({
      title: t("seo.title") || "Immobilizer PIN Code Calculator",
      meta: [{ name: "description", content: t("seo.desc") || "VIN→PIN and token packs." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))} data-v-66da4b4e><section class="relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm" data-v-66da4b4e><div class="relative h-[280px] sm:h-[340px]" data-v-66da4b4e>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/4884273.jpg",
        class: "w-full h-full object-cover",
        format: "webp",
        alt: "Kia / Hyundai VIN to PIN"
      }, null, _parent));
      _push(`<div class="absolute inset-0 bg-gradient-to-r from-[#0e5e6f]/80 via-black/40 to-transparent" data-v-66da4b4e></div><div class="absolute inset-0 flex items-center" data-v-66da4b4e><div class="px-6 sm:px-12 w-full" data-v-66da4b4e><div class="max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50" data-v-66da4b4e><h1 class="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight" data-v-66da4b4e>${ssrInterpolate(_ctx.$t("hero.headline") || "Why choose our PIN Code platform?")}</h1><ul class="text-sm sm:text-base text-gray-700 space-y-2 mb-6 font-medium" data-v-66da4b4e><li class="flex items-center gap-2" data-v-66da4b4e><span class="text-[#3adbc4]" data-v-66da4b4e>✔</span> ${ssrInterpolate(_ctx.$t("hero.points.instant") || "Instant calculation 24/7")}</li><li class="flex items-center gap-2" data-v-66da4b4e><span class="text-[#3adbc4]" data-v-66da4b4e>✔</span> ${ssrInterpolate(_ctx.$t("hero.points.noRenewal") || "No renewal fees · tokens never expire")}</li><li class="flex items-center gap-2" data-v-66da4b4e><span class="text-[#3adbc4]" data-v-66da4b4e>✔</span> ${ssrInterpolate(_ctx.$t("hero.points.easy") || "Easy to Use")}</li></ul><div class="flex flex-wrap gap-3" data-v-66da4b4e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/new-lookup",
        class: "btn-brand"
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
        class: "btn-brand-ghost"
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
      _push(`</div></div></div></div></div></section><section class="space-y-6" data-v-66da4b4e><div class="text-center" data-v-66da4b4e><h2 class="text-2xl sm:text-2xl font-bold tracking-tight text-gray-900" data-v-66da4b4e>${ssrInterpolate(_ctx.$t("home.supportedBrands") || "Supported Brands")}</h2><div class="h-1 w-20 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mx-auto mt-2 rounded-full" data-v-66da4b4e></div></div><div class="relative group" data-v-66da4b4e><div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" data-v-66da4b4e></div><div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" data-v-66da4b4e></div><div class="overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] py-2" data-v-66da4b4e><div class="flex justify-center gap-8 min-w-max px-4" data-v-66da4b4e><!--[-->`);
      ssrRenderList(brands, (b) => {
        _push(`<div class="brand-pill group hover:border-[#3adbc4]/50 transition-colors duration-300" data-v-66da4b4e>`);
        if (b.logo) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: b.logo,
            alt: b.name,
            format: "webp",
            class: "h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
          }, null, _parent));
        } else {
          _push(`<span class="text-lg font-bold tracking-wide text-gray-600 group-hover:text-[#0e5e6f]" data-v-66da4b4e>${ssrInterpolate(b.name)}</span>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
      if (unref(allPacks).length) {
        _push(`<section class="space-y-6 relative" data-v-66da4b4e><div class="text-center border-b pb-4 border-gray-100 mb-6" data-v-66da4b4e><h3 class="text-2xl font-bold text-gray-900" data-v-66da4b4e>${ssrInterpolate(_ctx.$t("home.tokenPacks") || "Token Packs")}</h3><div class="h-1 w-20 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mx-auto mt-2 rounded-full" data-v-66da4b4e></div></div><div class="relative group/slider" data-v-66da4b4e><button class="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-md border border-gray-100 text-gray-600 hover:text-[#0e5e6f] hover:scale-110 transition-all opacity-0 group-hover/slider:opacity-100 sm:opacity-100" aria-label="Scroll left" data-v-66da4b4e><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5" data-v-66da4b4e><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" data-v-66da4b4e></path></svg></button><button class="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-md border border-gray-100 text-gray-600 hover:text-[#0e5e6f] hover:scale-110 transition-all opacity-0 group-hover/slider:opacity-100 sm:opacity-100" aria-label="Scroll right" data-v-66da4b4e><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5" data-v-66da4b4e><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-66da4b4e></path></svg></button><div class="flex overflow-x-auto snap-x gap-4 pb-4 px-4 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto scrollbar-hide" data-v-66da4b4e><!--[-->`);
        ssrRenderList(unref(allPacks), (p) => {
          _push(`<article class="pack-card flex flex-col relative group shrink-0 min-w-[260px] sm:min-w-0 snap-center" data-v-66da4b4e>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product/${p.slug || p.id}`,
            class: "absolute inset-0 z-0",
            "aria-label": `Open ${p.name}`
          }, null, _parent));
          _push(`<header class="pack-card__header z-10 flex items-center justify-center min-h-[56px]" data-v-66da4b4e>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product/${p.slug || p.id}`,
            class: "block z-20 relative text-center w-full",
            onClick: () => {
            }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h4 class="text-sm sm:text-base font-bold tracking-tight text-white leading-snug group-hover:text-[#3adbc4] transition-colors" data-v-66da4b4e${_scopeId}>${ssrInterpolate(p.name)}</h4>`);
              } else {
                return [
                  createVNode("h4", { class: "text-sm sm:text-base font-bold tracking-tight text-white leading-snug group-hover:text-[#3adbc4] transition-colors" }, toDisplayString(p.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</header><div class="pack-card__body flex-1 flex flex-col z-10 bg-white" data-v-66da4b4e><div class="text-center mt-2" data-v-66da4b4e><span class="inline-block bg-gray-100 text-[#0e5e6f] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide" data-v-66da4b4e>${ssrInterpolate(p.tokens)} ${ssrInterpolate(_ctx.$t("tokens") || "TOKENS")}</span></div>`);
          if (p.image_url) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product/${p.slug || p.id}`,
              class: "block z-20 relative mx-auto w-full px-4 py-4",
              onClick: () => {
              }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_NuxtImg, {
                    src: p.image_url,
                    format: "webp",
                    class: "pack-image h-48 sm:h-56 w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105 border border-gray-100 bg-white rounded-xl",
                    modifiers: { fit: "contain", background: "white" },
                    alt: ""
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_NuxtImg, {
                      src: p.image_url,
                      format: "webp",
                      class: "pack-image h-48 sm:h-56 w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105 border border-gray-100 bg-white rounded-xl",
                      modifiers: { fit: "contain", background: "white" },
                      alt: ""
                    }, null, 8, ["src"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (p.sku) {
            _push(`<p class="text-gray-400 text-center font-medium text-[10px] tracking-wider uppercase mb-2" data-v-66da4b4e> SKU: ${ssrInterpolate(p.sku)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-center mb-4" data-v-66da4b4e>`);
          if (currentStrikePrice(p, unref(qty)[p.id])) {
            _push(`<!--[--><div class="text-xl sm:text-2xl font-black text-gray-900 leading-none" data-v-66da4b4e> $${ssrInterpolate(currentUnitPrice(p, unref(qty)[p.id]).toFixed(2))}</div><div class="text-xs text-[#e63946] line-through mt-1 font-semibold" data-v-66da4b4e> $${ssrInterpolate(currentStrikePrice(p, unref(qty)[p.id]).toFixed(2))}</div><!--]-->`);
          } else {
            _push(`<div class="text-xl sm:text-2xl font-black text-[#0e5e6f] leading-none" data-v-66da4b4e> $${ssrInterpolate(currentUnitPrice(p, unref(qty)[p.id]).toFixed(2))}</div>`);
          }
          _push(`</div><div class="mt-auto pt-4 border-t border-gray-100" data-v-66da4b4e><div class="flex items-center gap-3" data-v-66da4b4e><input${ssrRenderAttr("value", unref(qty)[p.id])} type="number" min="1" class="w-14 rounded-xl border border-gray-200 bg-gray-50 px-1 py-2 text-center text-sm font-bold focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] outline-none transition-all" data-v-66da4b4e><button class="btn-brand w-full text-sm py-2.5" data-v-66da4b4e>${ssrInterpolate(_ctx.$t("btn.addToCart") || "Add to Cart")}</button></div></div></div></article>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMsg)) {
        _push(`<div class="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center" data-v-66da4b4e>${ssrInterpolate(unref(errorMsg))}</div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66da4b4e"]]);

export { index as default };
//# sourceMappingURL=index-Cu5uJu25.mjs.map
