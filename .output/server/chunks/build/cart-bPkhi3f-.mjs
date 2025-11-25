import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-ChoT4sHP.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useI18n } from './server.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
import { u as useAuth } from './useAuth-CJcUDK_S.mjs';
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
    const cart = useCart();
    const auth = useAuth();
    const isLoggedIn = computed(() => auth.isLoggedIn.value);
    const itemsRef = computed(() => {
      const raw = cart?.items;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-6xl px-4 py-6 lg:py-10" }, _attrs))}><h1 class="mb-6 text-2xl sm:text-3xl font-bold tracking-tight">${ssrInterpolate(unref(t)("cart.title") || "Cart")}</h1>`);
      if (unref(mounted) && unref(itemsLen) === 0) {
        _push(`<div class="rounded-2xl border border-dashed bg-white p-10 text-center text-gray-600"><p class="mb-3 text-base">${ssrInterpolate(unref(t)("cart.empty") || "Your cart is empty.")}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
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
        _push(`</div>`);
      } else {
        _push(`<div class="grid gap-6 lg:grid-cols-12"><section class="lg:col-span-8 space-y-4">`);
        if (!unref(mounted)) {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(3, (i) => {
            _push(`<div class="h-32 rounded-2xl border bg-gray-50 animate-pulse"></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="hidden md:block rounded-2xl border bg-white shadow-sm overflow-hidden"><table class="w-full text-sm"><thead class="bg-gray-50 text-gray-600"><tr><th class="px-4 py-3 text-left font-medium w-[520px]">${ssrInterpolate(unref(t)("cart.product") || "Product")}</th><th class="px-3 py-3 text-right font-medium">${ssrInterpolate(unref(t)("cart.price") || "Price")}</th><th class="px-3 py-3 text-center font-medium">${ssrInterpolate(unref(t)("cart.qty") || "Qty")}</th><th class="px-3 py-3 text-center font-medium">${ssrInterpolate(unref(t)("tokens") || "Tokens")}</th><th class="px-3 py-3 text-right font-medium">${ssrInterpolate(unref(t)("cart.lineTotal") || "Line total")}</th><th class="px-4 py-3 text-right font-medium w-[80px]">${ssrInterpolate(unref(t)("cart.actions") || "Actions")}</th></tr></thead><tbody><!--[-->`);
          ssrRenderList(unref(itemsRef), (it) => {
            _push(`<tr class="border-t hover:bg-gray-50/60 transition-colors"><td class="px-4 py-4"><div class="flex items-start gap-3">`);
            if (it?.image) {
              _push(ssrRenderComponent(_component_NuxtImg, {
                src: it.image,
                width: "80",
                height: "80",
                modifiers: { fit: "cover" },
                class: "h-20 w-20 rounded-xl border bg-gray-50 object-cover",
                alt: ""
              }, null, _parent));
            } else {
              _push(`<div class="h-20 w-20 rounded-xl border bg-gray-50 grid place-items-center text-gray-400">—</div>`);
            }
            _push(`<div class="min-w-0">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product/${it?.slug}`,
              class: "line-clamp-2 font-semibold leading-6 hover:underline text-gray-900"
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
            _push(`<div class="mt-1 flex flex-wrap items-center gap-2 text-xs">`);
            if (it?.sku) {
              _push(`<span class="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">SKU: ${ssrInterpolate(it.sku)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<span class="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700">$${ssrInterpolate(price(it?.price))} / ${ssrInterpolate(unref(t)("cart.unit") || "unit")}</span></div></div></div></td><td class="px-3 py-4 text-right tabular-nums">$${ssrInterpolate(price(it?.price))}</td><td class="px-3 py-4"><div class="flex justify-center"><div class="inline-flex items-center rounded-full border bg-white px-1 shadow-sm"><button type="button" class="h-8 w-8 grid place-items-center rounded-full hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-lg font-semibold leading-none"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} aria-label="Decrease quantity">−</button><input${ssrRenderAttr("value", it?.qty)} inputmode="numeric" pattern="[0-9]*" class="h-8 w-14 border-x border-gray-200 text-center outline-none disabled:opacity-60"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""}><button type="button" class="h-8 w-8 grid place-items-center rounded-full hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-lg font-semibold leading-none"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} aria-label="Increase quantity">+</button></div></div></td><td class="px-3 py-4 text-center">`);
            if (it?.meta?.tokens) {
              _push(`<span class="tabular-nums">${ssrInterpolate(it?.qty * it.meta.tokens)}</span>`);
            } else {
              _push(`<span>—</span>`);
            }
            _push(`</td><td class="px-3 py-4 text-right text-base font-semibold tabular-nums"> $${ssrInterpolate(price(lineTotal(it)))}</td><td class="px-4 py-4 text-right"><button class="text-sm text-red-600 hover:underline disabled:opacity-50"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""}>${ssrInterpolate(unref(t)("cart.remove") || "Remove")}</button></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        if (unref(mounted)) {
          _push(`<div class="md:hidden space-y-3"><!--[-->`);
          ssrRenderList(unref(itemsRef), (it) => {
            _push(`<div class="rounded-2xl border bg-white p-3 shadow-sm"><div class="flex items-start gap-3">`);
            if (it?.image) {
              _push(ssrRenderComponent(_component_NuxtImg, {
                src: it.image,
                width: "96",
                height: "96",
                modifiers: { fit: "cover" },
                class: "h-24 w-24 rounded-xl border bg-gray-50 object-cover",
                alt: ""
              }, null, _parent));
            } else {
              _push(`<div class="h-24 w-24 rounded-xl border bg-gray-50 grid place-items-center text-gray-400">—</div>`);
            }
            _push(`<div class="min-w-0 flex-1">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product/${it?.slug}`,
              class: "line-clamp-2 font-semibold leading-6 hover:underline"
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
            _push(`<div class="mt-1 flex flex-wrap items-center gap-2 text-xs">`);
            if (it?.sku) {
              _push(`<span class="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">SKU: ${ssrInterpolate(it.sku)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<span class="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700"> $${ssrInterpolate(price(it?.price))} / ${ssrInterpolate(unref(t)("cart.unit") || "unit")}</span></div><div class="mt-3 flex items-center justify-between"><div class="inline-flex items-center rounded-full border bg-white px-1 shadow-sm"><button type="button" class="h-8 w-8 grid place-items-center rounded-full hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-lg font-semibold leading-none"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} aria-label="Decrease quantity">−</button><input${ssrRenderAttr("value", it?.qty)} inputmode="numeric" pattern="[0-9]*" class="h-8 w-14 border-x border-gray-200 text-center outline-none disabled:opacity-60"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""}><button type="button" class="h-8 w-8 grid place-items-center rounded-full hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-lg font-semibold leading-none"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""} aria-label="Increase quantity">+</button></div><div class="text-right"><div class="text-[11px] uppercase tracking-wide text-gray-500">${ssrInterpolate(unref(t)("cart.lineTotal") || "Line total")}</div><div class="text-lg font-semibold">$${ssrInterpolate(price(lineTotal(it)))}</div></div></div><div class="mt-2"><button class="text-sm text-red-600 hover:underline disabled:opacity-50"${ssrIncludeBooleanAttr(unref(busyId) === cartId(it)) ? " disabled" : ""}>${ssrInterpolate(unref(t)("cart.remove") || "Remove")}</button></div></div></div></div>`);
          });
          _push(`<!--]-->`);
          if (unref(itemsLen)) {
            _push(`<div class="flex items-center justify-between pt-1">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "text-sm text-gray-700 hover:underline"
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
            _push(`<button type="button" class="text-sm text-red-600 hover:underline">${ssrInterpolate(unref(t)("cart.clear") || "Clear cart")}</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><aside class="lg:col-span-4"><div class="lg:sticky lg:top-24 overflow-hidden rounded-2xl border bg-white shadow-sm"><div class="border-b bg-gradient-to-r from-orange-100 to-amber-50 px-5 py-3"><h2 class="text-base font-semibold">${ssrInterpolate(unref(t)("cart.summary") || "Order Summary")}</h2></div><div class="p-5 space-y-3"><div class="flex justify-between text-sm"><span class="text-gray-600">${ssrInterpolate(unref(t)("cart.subtotal") || "Subtotal")}</span><span class="font-medium tabular-nums">$${ssrInterpolate(price(unref(subtotal)))}</span></div><div class="border-t pt-3 flex justify-between items-center"><span class="text-base font-semibold">${ssrInterpolate(unref(t)("cart.total") || "Total")}</span><span class="text-2xl font-bold tabular-nums">$${ssrInterpolate(price(unref(subtotal)))}</span></div>`);
        if (unref(isLoggedIn)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/checkout",
            class: "btn-primary w-full mt-2"
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
            class: "btn-primary w-full mt-2"
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
          _push(`<p class="mt-1 text-xs text-gray-500">${ssrInterpolate(unref(t)("cart.loginToCheckoutHint") || "You need to login to complete your purchase.")}</p><!--]-->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "btn-ghost w-full text-center"
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
        _push(`</div></div></aside></div>`);
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

export { _sfc_main as default };
//# sourceMappingURL=cart-bPkhi3f-.mjs.map
