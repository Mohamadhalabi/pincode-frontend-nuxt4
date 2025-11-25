import { defineComponent, computed, ref, reactive, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useI18n, f as useRoute, c as useRouter, d as useNuxtApp } from './server.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useI18n();
    const route = useRoute();
    useRouter();
    const { $api } = useNuxtApp();
    computed(() => route.params.slug);
    const service = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const result = ref(null);
    const form = reactive({});
    watch(
      () => form.vin,
      (val) => {
        if (!val) return;
        let updated = val.toUpperCase();
        updated = updated.replace(/O/gi, "0");
        if (updated !== val) {
          form.vin = updated;
        }
      }
    );
    const submitting = ref(false);
    const submitError = ref(null);
    const submitSuccess = ref(null);
    const copyStatus = ref("idle");
    const auth = typeof useAuth === "function" ? useAuth() : null;
    computed(() => auth?.user?.value || null);
    const walletTokens = computed(() => Number(service.value?.wallet_tokens || 0));
    const costTokens = computed(() => Number(service.value?.cost_tokens || 0));
    const behavior = computed(() => service.value?.behavior || "decoder");
    const canSubmit = computed(() => {
      if (!service.value) return false;
      if (walletTokens.value < costTokens.value) return false;
      const required = service.value.required_inputs || [];
      for (const rawKey of required) {
        const fieldKey = rawKey.toLowerCase();
        const val = (form[fieldKey] || "").trim();
        if (!val) return false;
        if (fieldKey === "vin" && val.length !== 17) return false;
      }
      return true;
    });
    const isVinUnavailableError = computed(() => {
      if (!submitError.value) return false;
      return submitError.value === t("decoder.vin_unavailable");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto px-4 py-8" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="text-center text-gray-500">${ssrInterpolate(unref(t)("common.loading") || "Loading…")}</div>`);
      } else if (unref(error)) {
        _push(`<div class="rounded-xl bg-red-50 text-red-700 px-3 py-2 mb-4 text-sm">${ssrInterpolate(unref(error))}</div>`);
      } else if (unref(service)) {
        _push(`<!--[--><h1 class="text-2xl sm:text-3xl font-bold mb-2">${ssrInterpolate(unref(service).name)}</h1><div class="grid gap-4 sm:grid-cols-2 mb-6"><div class="rounded-2xl border bg-white p-4"><div class="text-xs text-gray-500 mb-1">${ssrInterpolate(unref(t)("service.walletTokens") || "Available Tokens")}</div><div class="text-2xl font-bold">${ssrInterpolate(unref(walletTokens))}</div></div><div class="rounded-2xl border bg-white p-4"><div class="text-xs text-gray-500 mb-1">${ssrInterpolate(unref(t)("service.costTokens") || "Required Tokens")}</div><div class="text-2xl font-bold">${ssrInterpolate(unref(costTokens))}</div></div></div><div class="rounded-2xl border bg-white p-4 mb-6"><h2 class="text-sm font-semibold mb-2">${ssrInterpolate(unref(t)("service.instructions") || "Instructions")}</h2><pre class="whitespace-pre-wrap text-sm text-gray-700">${ssrInterpolate(unref(service).instruction_md || unref(t)("service.instructionsEmpty") || "No instructions yet.")}
        </pre></div>`);
        if (unref(behavior) === "whatsapp" && unref(service).whatsapp_number) {
          _push(`<div class="rounded-xl border border-green-200 bg-green-50 px-3 py-2 mb-4 text-xs text-green-800">${ssrInterpolate(unref(t)("service.whatsappHint") || "This service is processed via WhatsApp.")} <br> ${ssrInterpolate(unref(t)("service.whatsappNumber") || "WhatsApp number:")} <strong>${ssrInterpolate(unref(service).whatsapp_number)}</strong></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="rounded-2xl border bg-white p-4"><h2 class="text-sm font-semibold mb-3">${ssrInterpolate(unref(t)("service.requestTitle") || "Request")}</h2><form class="space-y-3"><!--[-->`);
        ssrRenderList(unref(service).required_inputs || [], (rawKey) => {
          _push(`<div><label class="block text-md text-gray-600 mb-1"><span class="text-red-600">*</span>${ssrInterpolate(rawKey.toUpperCase())}</label><input${ssrRenderAttr("value", unref(form)[rawKey.toLowerCase()])} type="text"${ssrRenderAttr("maxlength", rawKey.toLowerCase() === "vin" ? 17 : null)}${ssrRenderAttr("minlength", rawKey.toLowerCase() === "vin" ? 17 : null)} class="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" required>`);
          if (rawKey.toLowerCase() === "vin" && unref(form)[rawKey.toLowerCase()] && unref(form)[rawKey.toLowerCase()].length > 0 && unref(form)[rawKey.toLowerCase()].length !== 17) {
            _push(`<p class="mt-1 text-xs text-red-600">${ssrInterpolate(unref(t)("service.vin_size") || "VIN must be exactly 17 characters.")}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (unref(submitError)) {
          _push(`<div class="mt-2">`);
          if (unref(isVinUnavailableError)) {
            _push(`<div class="rounded-xl bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-xs space-y-2"><div>${ssrInterpolate(unref(submitError))}</div><button type="button" class="inline-flex items-center rounded-lg bg-green-500 text-white px-3 py-1 text-xs font-medium hover:bg-green-600">${ssrInterpolate(unref(t)("common.contact_whatsapp") || "Contact us on WhatsApp")}</button></div>`);
          } else {
            _push(`<div class="text-xs text-red-600">${ssrInterpolate(unref(submitError))}</div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(submitSuccess)) {
          _push(`<div class="text-xs text-emerald-600 mt-1">${ssrInterpolate(unref(submitSuccess))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="mt-2 inline-flex items-center justify-center rounded-xl bg-orange-500 text-white px-4 py-2 text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(unref(submitting) || !unref(canSubmit)) ? " disabled" : ""}>`);
        if (!unref(submitting)) {
          _push(`<span>${ssrInterpolate(unref(t)("service.submit") || "Submit Request")}</span>`);
        } else {
          _push(`<span>${ssrInterpolate(unref(t)("common.loading") || "Submitting…")}</span>`);
        }
        _push(`</button>`);
        if (unref(walletTokens) < unref(costTokens)) {
          _push(`<p class="mt-2 text-xs text-red-600">${ssrInterpolate(unref(t)("service.notEnoughTokens") || "You don’t have enough tokens for this service.")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form>`);
        if (unref(result) && (unref(result).vin || unref(result).pin_code || unref(result).key_code)) {
          _push(`<div class="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><div class="flex items-center justify-between mb-1"><div class="font-semibold">${ssrInterpolate(unref(t)("service.resultTitle") || "Decoded Result")}</div><button type="button" class="text-xs font-medium underline underline-offset-2">${ssrInterpolate(unref(copyStatus) === "copied" ? unref(t)("common.copied") || "Copied" : unref(t)("common.copy") || "Copy")}</button></div>`);
          if (unref(result).vin) {
            _push(`<div><strong>${ssrInterpolate(unref(result).vin)}</strong></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(result).key_code) {
            _push(`<div><strong>${ssrInterpolate(unref(result).key_code)}</strong></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(result).pin_code) {
            _push(`<div><strong>${ssrInterpolate(unref(result).pin_code)}</strong></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-BJbmDp7S.mjs.map
