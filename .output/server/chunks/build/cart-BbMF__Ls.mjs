import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-JZu4Om2_.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useI18n } from './server.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
import { u as useAuth } from './useAuth-DyorHlVq.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const cart2 = useCart();
    const auth = useAuth();
    const isLoggedIn = computed(() => auth.isLoggedIn.value);
    const itemsRef = computed(() => {
      const raw = cart2?.items;
      if (Array.isArray(raw?.value)) return raw.value;
      if (Array.isArray(raw)) return raw;
      return [];
    });
    const itemsLen = computed(() => itemsRef.value.length);
    const mounted = ref(false);
    const subtotal = computed(
      () => itemsRef.value.reduce((sum, i) => sum + Number(i?.price || 0) * Number(i?.qty || 0), 0)
    );
    const price = (n) => Number(n || 0).toFixed(2);
    const lineTotal = (it) => Number(it?.price || 0) * Number(it?.qty || 0);
    const cartId = (it) => it?.id ?? `${it?.product_type}:${it?.product_id}`;
    const busyId = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-6xl px-4 py-8 lg:py-12" }, _attrs))} data-v-f7ed6902><h1 class="mb-8 text-3xl font-extrabold tracking-tight text-gray-900" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.title") || "Your Cart")}</h1>`);
      if (unref(mounted) && unref(itemsLen) === 0) {
        _push(`<div class="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-600" data-v-f7ed6902><div class="mb-4 text-6xl opacity-20" data-v-f7ed6902>🛒</div><p class="mb-6 text-lg font-medium" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.empty") || "Your cart is currently empty.")}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "btn inline-flex"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("common.continueShopping") || "Start Shopping")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("common.continueShopping") || "Start Shopping"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid gap-8 lg:grid-cols-12" data-v-f7ed6902><section class="lg:col-span-8 space-y-6" data-v-f7ed6902>`);
        if (!unref(mounted)) {
          _push(`<div class="space-y-4" data-v-f7ed6902><!--[-->`);
          ssrRenderList(3, (i) => {
            _push(`<div class="h-32 rounded-2xl border bg-gray-50 animate-pulse" data-v-f7ed6902></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden" data-v-f7ed6902><table class="w-full text-sm" data-v-f7ed6902><thead class="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider" data-v-f7ed6902><tr data-v-f7ed6902><th class="px-6 py-4 text-left font-bold w-[500px]" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.product") || "Product")}</th><th class="px-4 py-4 text-right font-bold" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.price") || "Price")}</th><th class="px-4 py-4 text-center font-bold" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.qty") || "Qty")}</th><th class="px-4 py-4 text-center font-bold" data-v-f7ed6902>${ssrInterpolate(unref(t)("tokens") || "Tokens")}</th><th class="px-4 py-4 text-right font-bold" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.lineTotal") || "Total")}</th><th class="px-6 py-4 text-right font-bold w-[80px]" data-v-f7ed6902></th></tr></thead><tbody class="divide-y divide-gray-100" data-v-f7ed6902><!--[-->`);
          ssrRenderList(unref(itemsRef), (it) => {
            _push(`<tr class="hover:bg-[#f0fdfc]/30 transition-colors" data-v-f7ed6902><td class="px-6 py-5" data-v-f7ed6902><div class="flex items-start gap-4" data-v-f7ed6902>`);
            if (it?.image) {
              _push(ssrRenderComponent(_component_NuxtImg, {
                src: it.image,
                width: "80",
                height: "80",
                modifiers: { fit: "cover" },
                class: "h-20 w-20 rounded-xl border border-gray-200 bg-white object-contain p-1",
                alt: ""
              }, null, _parent));
            } else {
              _push(`<div class="h-20 w-20 rounded-xl border border-gray-200 bg-gray-50 grid place-items-center text-gray-400" data-v-f7ed6902>—</div>`);
            }
            _push(`<div class="min-w-0 pt-1" data-v-f7ed6902>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product/${it?.slug}`,
              class: "line-clamp-2 text-base font-bold leading-snug hover:text-[#0e5e6f] hover:underline text-gray-900 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(it?.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(it?.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="mt-2 flex flex-wrap items-center gap-2 text-xs" data-v-f7ed6902>`);
            if (it?.sku) {
              _push(`<span class="inline-flex rounded-md bg-gray-100 px-2 py-0.5 text-gray-600 font-mono" data-v-f7ed6902>SKU: ${ssrInterpolate(it.sku)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div></td><td class="px-4 py-5 text-right tabular-nums font-medium text-gray-600" data-v-f7ed6902>$${ssrInterpolate(price(it?.price))}</td><td class="px-4 py-5" data-v-f7ed6902><div class="flex justify-center" data-v-f7ed6902><div class="inline-flex items-center rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden" data-v-f7ed6902><button type="button" class="h-8 w-9 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 hover:text-[#0e5e6f] font-bold transition-colors"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} aria-label="Decrease quantity" data-v-f7ed6902>−</button><input${ssrRenderAttr("value", it?.qty)} inputmode="numeric" pattern="[0-9]*" class="h-8 w-10 border-x border-gray-100 text-center outline-none disabled:opacity-60 text-gray-900 font-semibold text-sm"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} data-v-f7ed6902><button type="button" class="h-8 w-9 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 hover:text-[#0e5e6f] font-bold transition-colors"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} aria-label="Increase quantity" data-v-f7ed6902>+</button></div></div></td><td class="px-4 py-5 text-center" data-v-f7ed6902>`);
            if (it?.meta?.tokens) {
              _push(`<span class="tabular-nums font-medium text-[#0e5e6f] bg-[#f0fdfc] px-2 py-1 rounded-lg text-xs" data-v-f7ed6902>${ssrInterpolate(it?.qty * it.meta.tokens)}</span>`);
            } else {
              _push(`<span class="text-gray-300" data-v-f7ed6902>—</span>`);
            }
            _push(`</td><td class="px-4 py-5 text-right text-base font-bold tabular-nums text-[#0e5e6f]" data-v-f7ed6902> $${ssrInterpolate(price(lineTotal(it)))}</td><td class="px-6 py-5 text-right" data-v-f7ed6902><button class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} aria-label="Remove item" data-v-f7ed6902><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f7ed6902><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-f7ed6902></path></svg></button></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        if (unref(mounted)) {
          _push(`<div class="md:hidden space-y-4" data-v-f7ed6902><!--[-->`);
          ssrRenderList(unref(itemsRef), (it) => {
            _push(`<div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm" data-v-f7ed6902><div class="flex items-start gap-4" data-v-f7ed6902>`);
            if (it?.image) {
              _push(ssrRenderComponent(_component_NuxtImg, {
                src: it.image,
                width: "96",
                height: "96",
                modifiers: { fit: "cover" },
                class: "h-24 w-24 rounded-xl border border-gray-100 bg-white object-contain p-1",
                alt: ""
              }, null, _parent));
            } else {
              _push(`<div class="h-24 w-24 rounded-xl border bg-gray-50 grid place-items-center text-gray-400" data-v-f7ed6902>—</div>`);
            }
            _push(`<div class="min-w-0 flex-1" data-v-f7ed6902>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product/${it?.slug}`,
              class: "line-clamp-2 font-bold text-gray-900 leading-snug hover:text-[#0e5e6f]"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(it?.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(it?.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="mt-1 flex flex-wrap items-center gap-2 text-xs" data-v-f7ed6902><span class="font-medium text-[#0e5e6f]" data-v-f7ed6902>$${ssrInterpolate(price(it?.price))} / unit</span></div><div class="mt-4 flex items-center justify-between" data-v-f7ed6902><div class="inline-flex items-center rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden h-9" data-v-f7ed6902><button type="button" class="h-full w-9 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 font-bold"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} data-v-f7ed6902>−</button><input${ssrRenderAttr("value", it?.qty)} inputmode="numeric" pattern="[0-9]*" class="h-full w-10 border-x border-gray-100 text-center outline-none disabled:opacity-60 text-sm font-semibold"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} data-v-f7ed6902><button type="button" class="h-full w-9 grid place-items-center hover:bg-gray-50 disabled:opacity-50 text-gray-500 font-bold"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} data-v-f7ed6902>+</button></div><div class="text-right" data-v-f7ed6902><div class="text-[10px] uppercase tracking-wide text-gray-400 font-bold" data-v-f7ed6902>Total</div><div class="text-lg font-bold text-[#0e5e6f]" data-v-f7ed6902>$${ssrInterpolate(price(lineTotal(it)))}</div></div></div></div></div><div class="mt-3 pt-3 border-t border-gray-100 flex justify-end" data-v-f7ed6902><button class="text-xs font-semibold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} data-v-f7ed6902> Remove Item </button></div></div>`);
          });
          _push(`<!--]-->`);
          if (unref(itemsLen)) {
            _push(`<div class="flex items-center justify-between pt-2" data-v-f7ed6902>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "text-sm font-medium text-gray-600 hover:text-[#0e5e6f] transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` ← ${ssrInterpolate(unref(t)("common.continueShopping") || "Continue shopping")}`);
                } else {
                  return [
                    createTextVNode(" ← " + toDisplayString(unref(t)("common.continueShopping") || "Continue shopping"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`<button type="button" class="text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.clear") || "Clear cart")}</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><aside class="lg:col-span-4" data-v-f7ed6902><div class="lg:sticky lg:top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm" data-v-f7ed6902><div class="border-b border-gray-100 bg-gradient-to-r from-[#0e5e6f]/5 to-[#3adbc4]/10 px-6 py-4" data-v-f7ed6902><h2 class="text-lg font-bold text-gray-900" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.summary") || "Order Summary")}</h2></div><div class="p-6 space-y-4" data-v-f7ed6902><div class="flex justify-between text-sm" data-v-f7ed6902><span class="text-gray-600" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.subtotal") || "Subtotal")}</span><span class="font-bold tabular-nums text-gray-900" data-v-f7ed6902>$${ssrInterpolate(price(unref(subtotal)))}</span></div><div class="border-t border-gray-100 pt-4 flex justify-between items-center" data-v-f7ed6902><span class="text-base font-bold text-gray-900" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.total") || "Total")}</span><span class="text-3xl font-black tabular-nums text-[#0e5e6f]" data-v-f7ed6902>$${ssrInterpolate(price(unref(subtotal)))}</span></div><div class="pt-2" data-v-f7ed6902>`);
        if (unref(isLoggedIn)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/checkout",
            class: "btn w-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("cart.checkout") || "Proceed to Checkout")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("cart.checkout") || "Proceed to Checkout"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/login",
            class: "btn w-full"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("cart.loginToCheckout") || "Login to checkout")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("cart.loginToCheckout") || "Login to checkout"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<p class="mt-3 text-xs text-center text-gray-500" data-v-f7ed6902>${ssrInterpolate(unref(t)("cart.loginToCheckoutHint") || "You need to login to complete your purchase.")}</p><!--]-->`);
        }
        _push(`<div class="mt-3 text-center md:hidden" data-v-f7ed6902>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-sm text-gray-500 hover:text-[#0e5e6f]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("common.continueShopping") || "Continue shopping")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("common.continueShopping") || "Continue shopping"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></aside></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7ed6902"]]);

export { cart as default };
//# sourceMappingURL=cart-BbMF__Ls.mjs.map
