import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-ChoT4sHP.mjs';
import { defineComponent, computed, reactive, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderList, ssrLooseContain } from 'vue/server-renderer';
import { a as useI18n, c as useRouter, d as useNuxtApp, b as useRuntimeConfig } from './server.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
import { u as useAuth } from './useAuth-CJcUDK_S.mjs';
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
    const whatsappNumber = computed(() => runtimeConfig.public?.whatsappNumber || "");
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
    const acceptTermsHtml = computed(
      () => t("checkout.acceptTermsHtml") || 'I accept the <a href="/terms" class="text-orange-600 underline" target="_blank">terms &amp; conditions</a>.'
    );
    const copiedWallet = ref(false);
    const canSubmit = computed(() => {
      return !!form.full_name && !!userEmail.value && !!form.payment_method && form.accept_terms && itemsLen.value > 0 && !placing.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-6xl px-4 py-6 lg:py-10" }, _attrs))} data-v-8dac0de8><h1 class="mb-6 text-2xl sm:text-3xl font-bold tracking-tight" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.title") || "Checkout")}</h1>`);
      if (unref(itemsLen) === 0) {
        _push(`<div class="rounded-2xl border border-dashed bg-white p-10 text-center text-gray-600" data-v-8dac0de8><p class="mb-3 text-base" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.empty") || "Your cart is empty. Add products before checking out.")}</p>`);
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
        _push(`<div class="grid gap-6 lg:grid-cols-12" data-v-8dac0de8><section class="lg:col-span-8 space-y-4" data-v-8dac0de8><div class="rounded-2xl border bg-white p-5 shadow-sm" data-v-8dac0de8><h2 class="text-base font-semibold mb-4" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.details") || "Billing details")}</h2><form class="space-y-4" data-v-8dac0de8><div class="grid gap-4 sm:grid-cols-2" data-v-8dac0de8><div data-v-8dac0de8><label class="block text-sm font-medium text-gray-700 mb-1" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.fullName") || "Full name")}</label><input${ssrRenderAttr("value", unref(form).full_name)} type="text" class="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" required data-v-8dac0de8></div></div><div class="grid gap-4 sm:grid-cols-2" data-v-8dac0de8><div data-v-8dac0de8><label class="block text-sm font-medium text-gray-700 mb-1" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.email") || "Email")}</label><input${ssrRenderAttr("value", unref(userEmail))} type="email" disabled class="w-full rounded-xl border px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" data-v-8dac0de8><p class="mt-1 text-xs text-gray-500" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.emailFromAccount") || "Your email comes from your account and cannot be changed here.")}</p></div></div><div data-v-8dac0de8><label class="block text-sm font-medium text-gray-700 mb-1" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.notes") || "Order notes (optional)")}</label><textarea rows="3" class="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"${ssrRenderAttr("placeholder", unref(t)("checkout.notesPlaceholder") || "Any special instructions…")} data-v-8dac0de8>${ssrInterpolate(unref(form).notes)}</textarea></div><div class="pt-4 border-t" data-v-8dac0de8><h3 class="text-sm font-semibold mb-2" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.paymentMethod") || "Payment method")}</h3><div class="space-y-2" data-v-8dac0de8><label class="${ssrRenderClass([{ "border-orange-500 bg-orange-50/40": unref(form).payment_method === "paypal" }, "flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:border-orange-400 transition"])}" data-v-8dac0de8><input type="radio" value="paypal"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).payment_method, "paypal")) ? " checked" : ""} class="mt-1" data-v-8dac0de8><div class="flex items-start gap-3" data-v-8dac0de8><div class="mt-0.5 h-8 w-8 rounded-full bg-[#00457C] text-white flex items-center justify-center text-xs font-semibold" data-v-8dac0de8> P </div><div class="text-sm" data-v-8dac0de8><div class="font-medium" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.paypal.title") || "PayPal")}</div><div class="text-xs text-gray-600" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.paypal.desc") || "An invoice will be created in PayPal and sent to your email.")}</div></div></div></label><label class="${ssrRenderClass([{ "border-orange-500 bg-orange-50/40": unref(form).payment_method === "usdt" }, "flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:border-orange-400 transition"])}" data-v-8dac0de8><input type="radio" value="usdt"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).payment_method, "usdt")) ? " checked" : ""} class="mt-1" data-v-8dac0de8><div class="flex-1 flex items-start gap-3" data-v-8dac0de8><div class="mt-0.5 h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-semibold" data-v-8dac0de8> ₮ </div><div class="flex-1 text-sm" data-v-8dac0de8><div class="font-medium" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.usdt.title") || "USDT transfer")}</div><div class="text-xs text-gray-600" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.usdt.desc") || "Send USDT to our wallet and WhatsApp us the proof of payment.")}</div>`);
        if (unref(form).payment_method === "usdt") {
          _push(`<div class="mt-2 text-xs text-gray-700 space-y-1" data-v-8dac0de8><div class="font-semibold" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.usdt.walletLabel") || "USDT wallet address")}</div><div class="rounded-lg bg-gray-100 px-3 py-2 break-all text-[11px] flex items-center justify-between gap-2" data-v-8dac0de8><span class="truncate" data-v-8dac0de8>${ssrInterpolate(unref(usdtWallet) || "USDT WALLET !")}</span><button type="button" class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-2 py-1 text-[11px] font-medium hover:bg-gray-50" data-v-8dac0de8><svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8dac0de8><rect x="9" y="9" width="13" height="13" rx="2" ry="2" data-v-8dac0de8></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" data-v-8dac0de8></path></svg><span class="ml-1" data-v-8dac0de8>${ssrInterpolate(unref(copiedWallet) ? unref(t)("checkout.copied") || "Copied" : unref(t)("checkout.copy") || "Copy")}</span></button></div>`);
          if (unref(copiedWallet)) {
            _push(`<div class="text-[11px] text-emerald-600" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.walletCopied") || "Wallet address copied to clipboard.")}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-[11px] text-gray-600" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.usdt.afterPayment", {
            phone: unref(whatsappNumber) || "WhatsApp"
          }) || "After sending USDT, please send the payment proof to us on WhatsApp.")}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></label><label class="${ssrRenderClass([{ "border-orange-500 bg-orange-50/40": unref(form).payment_method === "transfer" }, "flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:border-orange-400 transition"])}" data-v-8dac0de8><input type="radio" value="transfer"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).payment_method, "transfer")) ? " checked" : ""} class="mt-1" data-v-8dac0de8><div class="flex items-start gap-3" data-v-8dac0de8><div class="mt-0.5 h-8 w-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-semibold" data-v-8dac0de8> $ </div><div class="text-sm" data-v-8dac0de8><div class="font-medium" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.transfer.title") || "International transfer")}</div><div class="text-xs text-gray-600" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.methods.transfer.desc") || "You can pay via Western Union or international bank transfer. We will send you the details after you place the order.")}</div></div></div></label></div></div></form></div></section><aside class="lg:col-span-4" data-v-8dac0de8><div class="lg:sticky lg:top-24 overflow-hidden rounded-2xl border bg-white shadow-sm" data-v-8dac0de8><div class="border-b bg-gradient-to-r from-orange-100 to-amber-50 px-5 py-3" data-v-8dac0de8><h2 class="text-base font-semibold" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.summary") || "Order summary")}</h2></div><div class="p-5 space-y-3" data-v-8dac0de8><ul class="space-y-2 max-h-56 overflow-y-auto pr-1 text-sm" data-v-8dac0de8><!--[-->`);
        ssrRenderList(unref(itemsRef), (it) => {
          _push(`<li class="flex items-start justify-between gap-3" data-v-8dac0de8><div class="shrink-0" data-v-8dac0de8>`);
          if (it?.image) {
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: it.image,
              width: "48",
              height: "48",
              modifiers: { fit: "cover" },
              class: "h-12 w-12 rounded-lg border bg-gray-50 object-cover",
              alt: ""
            }, null, _parent));
          } else {
            _push(`<div class="h-12 w-12 rounded-lg border bg-gray-50 grid place-items-center text-gray-400 text-xs" data-v-8dac0de8> — </div>`);
          }
          _push(`</div><div class="flex-1 min-w-0" data-v-8dac0de8><div class="line-clamp-2 font-medium text-gray-900" data-v-8dac0de8>${ssrInterpolate(it?.name)}</div><div class="text-xs text-gray-500" data-v-8dac0de8> x${ssrInterpolate(it?.qty)} · $${ssrInterpolate(price(it?.price))}</div></div><div class="text-right tabular-nums font-semibold" data-v-8dac0de8> $${ssrInterpolate(price(lineTotal(it)))}</div></li>`);
        });
        _push(`<!--]--></ul><div class="flex justify-between text-sm pt-2 border-t" data-v-8dac0de8><span class="text-gray-600" data-v-8dac0de8>${ssrInterpolate(unref(t)("cart.subtotal") || "Subtotal")}</span><span class="font-medium tabular-nums" data-v-8dac0de8> $${ssrInterpolate(price(unref(subtotal)))}</span></div><div class="border-t pt-3 flex justify-between items-center" data-v-8dac0de8><span class="text-base font-semibold" data-v-8dac0de8>${ssrInterpolate(unref(t)("cart.total") || "Total")}</span><span class="text-2xl font-bold tabular-nums" data-v-8dac0de8> $${ssrInterpolate(price(unref(subtotal)))}</span></div><p class="text-[11px] text-gray-500 pt-1" data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.info") || "You will be contacted or redirected to complete the payment after placing your order.")}</p><div class="mt-3 space-y-2 border-t pt-3" data-v-8dac0de8><label class="flex items-start gap-2 text-xs text-gray-700" data-v-8dac0de8><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).accept_terms) ? ssrLooseContain(unref(form).accept_terms, null) : unref(form).accept_terms) ? " checked" : ""} type="checkbox" class="mt-0.5" data-v-8dac0de8><span data-v-8dac0de8>${unref(acceptTermsHtml) ?? ""}</span></label>`);
        if (unref(errorMsg)) {
          _push(`<div class="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700" data-v-8dac0de8>${ssrInterpolate(unref(errorMsg))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(successMsg)) {
          _push(`<div class="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700" data-v-8dac0de8>${ssrInterpolate(unref(successMsg))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="btn-primary w-full mt-1"${ssrIncludeBooleanAttr(unref(placing) || !unref(canSubmit)) ? " disabled" : ""} data-v-8dac0de8>`);
        if (unref(placing)) {
          _push(`<span data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.placing") || "Placing order…")}</span>`);
        } else {
          _push(`<span data-v-8dac0de8>${ssrInterpolate(unref(t)("checkout.placeOrder") || "Place order")}</span>`);
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
const checkout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8dac0de8"]]);

export { checkout as default };
//# sourceMappingURL=checkout-1W7hy-ee.mjs.map
