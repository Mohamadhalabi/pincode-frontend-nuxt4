import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-JZu4Om2_.mjs';
import { defineComponent, computed, reactive, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderList, ssrLooseContain } from 'vue/server-renderer';
import { a as useI18n, c as useRouter, d as useNuxtApp, b as useRuntimeConfig } from './server.mjs';
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
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const cart = useCart();
    useRouter();
    const { $api } = useNuxtApp();
    const auth = typeof useAuth === "function" ? useAuth() : null;
    const user = computed(() => auth?.user?.value);
    const userEmail = computed(() => user.value?.email || "");
    const runtimeConfig = useRuntimeConfig();
    const usdtWallet = computed(() => runtimeConfig.public?.usdtWallet || "");
    computed(() => runtimeConfig.public?.whatsappNumber || "");
    const itemsRef = computed(() => {
      const raw = cart?.items;
      if (Array.isArray(raw?.value)) return raw.value;
      if (Array.isArray(raw)) return raw;
      return [];
    });
    const itemsLen = computed(() => itemsRef.value.length);
    const subtotal = computed(
      () => itemsRef.value.reduce(
        (sum, i) => sum + Number(i?.price || 0) * Number(i?.qty || 0),
        0
      )
    );
    const price = (n) => Number(n || 0).toFixed(2);
    const lineTotal = (it) => Number(it?.price || 0) * Number(it?.qty || 0);
    const form = reactive({
      full_name: "",
      company: "",
      vat_number: "",
      notes: "",
      payment_method: "",
      accept_terms: false
    });
    const placing = ref(false);
    const errorMsg = ref("");
    const successMsg = ref("");
    const copiedWallet = ref(false);
    const canSubmit = computed(() => {
      return !!form.full_name && !!userEmail.value && !!form.payment_method && form.accept_terms && itemsLen.value > 0 && !placing.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-6xl px-4 py-8 lg:py-12" }, _attrs))} data-v-93cfe058><h1 class="mb-8 text-3xl font-extrabold tracking-tight text-gray-900" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.title") || "Checkout")}</h1>`);
      if (unref(itemsLen) === 0) {
        _push(`<div class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-600" data-v-93cfe058><p class="mb-4 text-lg font-medium" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.empty") || "Your cart is empty. Add products before checking out.")}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#0e5e6f] transition-colors"
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
        _push(`<div class="grid gap-8 lg:grid-cols-12" data-v-93cfe058><section class="lg:col-span-8 space-y-6" data-v-93cfe058><div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" data-v-93cfe058><h2 class="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.details") || "Billing Details")}</h2><form class="space-y-5" data-v-93cfe058><div class="grid gap-5 sm:grid-cols-2" data-v-93cfe058><div data-v-93cfe058><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.fullName") || "Full name")}</label><input${ssrRenderAttr("value", unref(form).full_name)} type="text" class="input" required data-v-93cfe058></div><div data-v-93cfe058><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.email") || "Email")}</label><input${ssrRenderAttr("value", unref(userEmail))} type="email" disabled class="input bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200" data-v-93cfe058><p class="mt-1.5 text-[11px] text-gray-400" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.emailFromAccount") || "Linked to your account.")}</p></div></div><div data-v-93cfe058><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.notes") || "Order notes (optional)")}</label><textarea rows="3" class="input resize-none"${ssrRenderAttr("placeholder", unref(t)("checkout.notesPlaceholder") || "Any special instructions…")} data-v-93cfe058>${ssrInterpolate(unref(form).notes)}</textarea></div><div class="pt-6 mt-2 border-t border-gray-100" data-v-93cfe058><h3 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.paymentMethod") || "Payment Method")}</h3><div class="space-y-3" data-v-93cfe058><label class="${ssrRenderClass([unref(form).payment_method === "paypal" ? "border-[#3adbc4] bg-[#f0fdfc] shadow-sm" : "border-gray-200 hover:border-[#3adbc4]/50 hover:bg-gray-50", "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200"])}" data-v-93cfe058><input type="radio" value="paypal"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).payment_method, "paypal")) ? " checked" : ""} class="mt-1 text-[#0e5e6f] focus:ring-[#3adbc4]" data-v-93cfe058><div class="flex items-start gap-3" data-v-93cfe058><div class="mt-0.5 h-9 w-9 rounded-full bg-[#00457C] text-white flex items-center justify-center text-sm font-bold shadow-sm" data-v-93cfe058> P </div><div data-v-93cfe058><div class="font-bold text-gray-900" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.paypal.title") || "PayPal")}</div><div class="text-sm text-gray-600 mt-0.5" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.paypal.desc") || "Secure payment via PayPal. Invoice sent to email.")}</div></div></div></label><label class="${ssrRenderClass([unref(form).payment_method === "usdt" ? "border-[#3adbc4] bg-[#f0fdfc] shadow-sm" : "border-gray-200 hover:border-[#3adbc4]/50 hover:bg-gray-50", "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200"])}" data-v-93cfe058><input type="radio" value="usdt"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).payment_method, "usdt")) ? " checked" : ""} class="mt-1 text-[#0e5e6f] focus:ring-[#3adbc4]" data-v-93cfe058><div class="flex-1 flex items-start gap-3" data-v-93cfe058><div class="mt-0.5 h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-sm" data-v-93cfe058> ₮ </div><div class="flex-1" data-v-93cfe058><div class="font-bold text-gray-900" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.usdt.title") || "USDT Transfer")}</div><div class="text-sm text-gray-600 mt-0.5" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.usdt.desc") || "Send USDT to our wallet and verify via WhatsApp.")}</div>`);
        if (unref(form).payment_method === "usdt") {
          _push(`<div class="mt-3 p-3 rounded-lg bg-white border border-gray-200 space-y-2 text-sm" data-v-93cfe058><div class="font-semibold text-[#0e5e6f]" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.usdt.walletLabel") || "Wallet Address (TRC20)")}</div><div class="flex items-center gap-2" data-v-93cfe058><code class="flex-1 bg-gray-50 px-2 py-1.5 rounded border border-gray-100 text-xs text-gray-600 break-all font-mono" data-v-93cfe058>${ssrInterpolate(unref(usdtWallet) || "USDT_WALLET_ADDRESS_MISSING")}</code><button type="button" class="inline-flex items-center rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-bold hover:bg-gray-50 hover:text-[#0e5e6f] transition-colors" data-v-93cfe058>`);
          if (unref(copiedWallet)) {
            _push(`<span class="text-emerald-600 flex items-center gap-1" data-v-93cfe058><span class="text-lg" data-v-93cfe058>✔</span> ${ssrInterpolate(unref(t)("checkout.copied") || "Copied")}</span>`);
          } else {
            _push(`<span data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.copy") || "Copy")}</span>`);
          }
          _push(`</button></div><div class="text-xs text-gray-500 leading-relaxed" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.usdt.afterPayment") || "After transfer, please send screenshot to WhatsApp support.")}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></label><label class="${ssrRenderClass([unref(form).payment_method === "transfer" ? "border-[#3adbc4] bg-[#f0fdfc] shadow-sm" : "border-gray-200 hover:border-[#3adbc4]/50 hover:bg-gray-50", "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200"])}" data-v-93cfe058><input type="radio" value="transfer"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).payment_method, "transfer")) ? " checked" : ""} class="mt-1 text-[#0e5e6f] focus:ring-[#3adbc4]" data-v-93cfe058><div class="flex items-start gap-3" data-v-93cfe058><div class="mt-0.5 h-9 w-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-bold shadow-sm" data-v-93cfe058> $ </div><div data-v-93cfe058><div class="font-bold text-gray-900" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.transfer.title") || "International Transfer")}</div><div class="text-sm text-gray-600 mt-0.5" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.methods.transfer.desc") || "Western Union or Bank Transfer details sent after order.")}</div></div></div></label></div></div></form></div></section><aside class="lg:col-span-4" data-v-93cfe058><div class="lg:sticky lg:top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm" data-v-93cfe058><div class="border-b border-gray-100 bg-gradient-to-r from-[#0e5e6f]/5 to-[#3adbc4]/10 px-6 py-4" data-v-93cfe058><h2 class="text-lg font-bold text-gray-900" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.summary") || "Order Summary")}</h2></div><div class="p-6 space-y-4" data-v-93cfe058><ul class="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar" data-v-93cfe058><!--[-->`);
        ssrRenderList(unref(itemsRef), (it) => {
          _push(`<li class="flex items-start justify-between gap-3" data-v-93cfe058><div class="shrink-0" data-v-93cfe058>`);
          if (it?.image) {
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: it.image,
              width: "48",
              height: "48",
              modifiers: { fit: "cover" },
              class: "h-12 w-12 rounded-lg border border-gray-100 bg-white object-cover",
              alt: ""
            }, null, _parent));
          } else {
            _push(`<div class="h-12 w-12 rounded-lg border border-gray-100 bg-gray-50 grid place-items-center text-gray-300 text-xs" data-v-93cfe058>—</div>`);
          }
          _push(`</div><div class="flex-1 min-w-0 pt-0.5" data-v-93cfe058><div class="line-clamp-2 text-sm font-bold text-gray-900 leading-tight" data-v-93cfe058>${ssrInterpolate(it?.name)}</div><div class="text-xs text-gray-500 mt-1" data-v-93cfe058> x${ssrInterpolate(it?.qty)} · <span class="font-medium" data-v-93cfe058>$${ssrInterpolate(price(it?.price))}</span></div></div><div class="text-right tabular-nums text-sm font-bold text-[#0e5e6f]" data-v-93cfe058> $${ssrInterpolate(price(lineTotal(it)))}</div></li>`);
        });
        _push(`<!--]--></ul><div class="flex justify-between text-sm pt-4 border-t border-gray-100" data-v-93cfe058><span class="text-gray-600 font-medium" data-v-93cfe058>${ssrInterpolate(unref(t)("cart.subtotal") || "Subtotal")}</span><span class="font-bold tabular-nums text-gray-900" data-v-93cfe058>$${ssrInterpolate(price(unref(subtotal)))}</span></div><div class="border-t border-gray-100 pt-3 flex justify-between items-center" data-v-93cfe058><span class="text-base font-bold text-gray-900" data-v-93cfe058>${ssrInterpolate(unref(t)("cart.total") || "Total")}</span><span class="text-2xl font-black tabular-nums text-[#0e5e6f]" data-v-93cfe058>$${ssrInterpolate(price(unref(subtotal)))}</span></div><div class="mt-4 pt-4 border-t border-gray-100 space-y-3" data-v-93cfe058><label class="flex items-start gap-3 cursor-pointer group" data-v-93cfe058><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).accept_terms) ? ssrLooseContain(unref(form).accept_terms, null) : unref(form).accept_terms) ? " checked" : ""} type="checkbox" class="mt-1 rounded border-gray-300 text-[#0e5e6f] focus:ring-[#3adbc4]" data-v-93cfe058><span class="text-xs text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed" data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.acceptTermsPre") || "I accept the")} `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/terms-conditions",
          target: "_blank",
          class: "text-[#0e5e6f] underline hover:text-[#3adbc4]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("checkout.acceptTermsLink") || "Terms & Conditions")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("checkout.acceptTermsLink") || "Terms & Conditions"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span></label>`);
        if (unref(errorMsg)) {
          _push(`<div class="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-700 border border-red-100" data-v-93cfe058>${ssrInterpolate(unref(errorMsg))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(successMsg)) {
          _push(`<div class="rounded-xl bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700 border border-emerald-100" data-v-93cfe058>${ssrInterpolate(unref(successMsg))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="btn w-full shadow-md hover:shadow-lg transition-all"${ssrIncludeBooleanAttr(unref(placing) || !unref(canSubmit)) ? " disabled" : ""} data-v-93cfe058>`);
        if (unref(placing)) {
          _push(`<span class="flex items-center justify-center gap-2" data-v-93cfe058><svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-93cfe058><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-93cfe058></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-93cfe058></path></svg> ${ssrInterpolate(unref(t)("checkout.placing") || "Processing...")}</span>`);
        } else {
          _push(`<span data-v-93cfe058>${ssrInterpolate(unref(t)("checkout.placeOrder") || "Complete Order")}</span>`);
        }
        _push(`</button></div></div></div></aside></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checkout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93cfe058"]]);

export { checkout as default };
//# sourceMappingURL=checkout-C-ymGo6e.mjs.map
