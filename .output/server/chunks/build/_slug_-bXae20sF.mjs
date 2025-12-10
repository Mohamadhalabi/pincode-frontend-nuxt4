import { defineComponent, computed, ref, reactive, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useI18n, f as useRoute, c as useRouter, d as useNuxtApp } from './server.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto px-4 py-10 lg:py-16" }, _attrs))} data-v-679f2450>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-12" data-v-679f2450><div class="animate-spin h-8 w-8 border-4 border-[#0e5e6f] border-t-transparent rounded-full mx-auto mb-4" data-v-679f2450></div><p class="text-gray-500 font-medium" data-v-679f2450>${ssrInterpolate(unref(t)("common.loading") || "Loading service details…")}</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="rounded-2xl bg-red-50 border border-red-100 text-red-700 px-6 py-4 mb-6 text-sm font-medium text-center" data-v-679f2450>${ssrInterpolate(unref(error))}</div>`);
      } else if (unref(service)) {
        _push(`<!--[--><header class="text-center mb-10" data-v-679f2450><h1 class="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight" data-v-679f2450>${ssrInterpolate(unref(service).name)}</h1><div class="h-1 w-20 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mx-auto rounded-full" data-v-679f2450></div></header><div class="grid gap-5 sm:grid-cols-2 mb-8" data-v-679f2450><div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden" data-v-679f2450><div class="absolute top-0 right-0 w-16 h-16 bg-[#0e5e6f]/5 rounded-bl-full -mr-4 -mt-4" data-v-679f2450></div><div class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 z-10" data-v-679f2450>${ssrInterpolate(unref(t)("service.walletTokens") || "Your Balance")}</div><div class="text-4xl font-black text-[#0e5e6f] z-10" data-v-679f2450>${ssrInterpolate(unref(walletTokens))}</div></div><div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden" data-v-679f2450><div class="absolute top-0 right-0 w-16 h-16 bg-[#3adbc4]/10 rounded-bl-full -mr-4 -mt-4" data-v-679f2450></div><div class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 z-10" data-v-679f2450>${ssrInterpolate(unref(t)("service.costTokens") || "Cost per Calculation")}</div><div class="text-4xl font-black text-gray-900 z-10" data-v-679f2450>${ssrInterpolate(unref(costTokens))}</div></div></div><div class="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 mb-8" data-v-679f2450><h2 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2" data-v-679f2450><svg class="w-4 h-4 text-[#0e5e6f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-679f2450></path></svg> ${ssrInterpolate(unref(t)("service.instructions") || "Instructions")}</h2><pre class="whitespace-pre-wrap text-sm text-gray-600 font-sans leading-relaxed bg-white p-4 rounded-xl border border-gray-200" data-v-679f2450>${ssrInterpolate(unref(service).instruction_md || unref(t)("service.instructionsEmpty") || "No specific instructions provided for this service.")}
        </pre></div>`);
        if (unref(behavior) === "whatsapp" && unref(service).whatsapp_number) {
          _push(`<div class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 mb-8 text-sm text-emerald-900 flex items-start gap-3" data-v-679f2450><svg class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" data-v-679f2450><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-v-679f2450></path></svg><div data-v-679f2450><p class="font-bold mb-1" data-v-679f2450>${ssrInterpolate(unref(t)("service.whatsappHint") || "This service is processed via WhatsApp.")}</p><p data-v-679f2450>${ssrInterpolate(unref(t)("service.whatsappNumber") || "WhatsApp number:")} <span class="font-mono font-bold" data-v-679f2450>${ssrInterpolate(unref(service).whatsapp_number)}</span></p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 relative overflow-hidden" data-v-679f2450><div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4]" data-v-679f2450></div><h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" data-v-679f2450><svg class="w-5 h-5 text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-679f2450></path></svg> ${ssrInterpolate(unref(t)("service.requestTitle") || "Submit Request")}</h2><form class="space-y-5" data-v-679f2450><!--[-->`);
        ssrRenderList(unref(service).required_inputs || [], (rawKey) => {
          _push(`<div data-v-679f2450><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-679f2450><span class="text-red-500 mr-1" data-v-679f2450>*</span>${ssrInterpolate(rawKey.toUpperCase())}</label><input${ssrRenderAttr("value", unref(form)[rawKey.toLowerCase()])} type="text"${ssrRenderAttr("maxlength", rawKey.toLowerCase() === "vin" ? 17 : null)}${ssrRenderAttr("minlength", rawKey.toLowerCase() === "vin" ? 17 : null)} class="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3adbc4] focus:border-[#3adbc4] transition-all font-mono placeholder-gray-300"${ssrRenderAttr("placeholder", rawKey.toLowerCase() === "vin" ? "Enter 17-digit VIN" : "")} required data-v-679f2450>`);
          if (rawKey.toLowerCase() === "vin" && unref(form)[rawKey.toLowerCase()] && unref(form)[rawKey.toLowerCase()].length > 0 && unref(form)[rawKey.toLowerCase()].length !== 17) {
            _push(`<p class="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1" data-v-679f2450><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-679f2450></path></svg> ${ssrInterpolate(unref(t)("service.vin_size") || "VIN must be exactly 17 characters.")}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (unref(submitError)) {
          _push(`<div class="mt-2" data-v-679f2450>`);
          if (unref(isVinUnavailableError)) {
            _push(`<div class="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm space-y-3" data-v-679f2450><p class="font-bold flex items-center gap-2" data-v-679f2450><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-679f2450></path></svg> ${ssrInterpolate(unref(submitError))}</p><button type="button" class="inline-flex items-center rounded-lg bg-green-600 text-white px-4 py-2 text-xs font-bold hover:bg-green-700 transition-colors shadow-sm" data-v-679f2450>${ssrInterpolate(unref(t)("common.contact_whatsapp") || "Contact us on WhatsApp")}</button></div>`);
          } else {
            _push(`<div class="rounded-xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm font-medium" data-v-679f2450>${ssrInterpolate(unref(submitError))}</div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(submitSuccess)) {
          _push(`<div class="rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 text-sm font-bold flex items-center gap-2" data-v-679f2450><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-679f2450></path></svg> ${ssrInterpolate(unref(submitSuccess))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="btn w-full mt-2"${ssrIncludeBooleanAttr(unref(submitting) || !unref(canSubmit)) ? " disabled" : ""} data-v-679f2450>`);
        if (!unref(submitting)) {
          _push(`<span class="flex items-center justify-center gap-2" data-v-679f2450>${ssrInterpolate(unref(t)("service.submit") || "Calculate Code")} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-679f2450></path></svg></span>`);
        } else {
          _push(`<span class="flex items-center justify-center gap-2" data-v-679f2450><svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-679f2450><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-679f2450></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-679f2450></path></svg> ${ssrInterpolate(unref(t)("common.loading") || "Calculating…")}</span>`);
        }
        _push(`</button>`);
        if (unref(walletTokens) < unref(costTokens)) {
          _push(`<p class="text-center text-xs font-bold text-red-600 bg-red-50 py-2 rounded-lg border border-red-100" data-v-679f2450>${ssrInterpolate(unref(t)("service.notEnoughTokens") || "Insufficient tokens. Please purchase more to continue.")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form>`);
        if (unref(result) && (unref(result).vin || unref(result).pin_code || unref(result).key_code)) {
          _push(`<div class="mt-8 rounded-xl border-2 border-[#0e5e6f] bg-[#f0fdfc] p-6 shadow-md relative overflow-hidden" data-v-679f2450><div class="absolute top-0 right-0 w-12 h-12 bg-[#3adbc4]/20 rounded-bl-full" data-v-679f2450></div><div class="flex items-center justify-between mb-4 border-b border-[#0e5e6f]/10 pb-3" data-v-679f2450><div class="font-bold text-[#0e5e6f] uppercase tracking-wider text-sm flex items-center gap-2" data-v-679f2450><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-679f2450></path></svg> ${ssrInterpolate(unref(t)("service.resultTitle") || "Success")}</div><button type="button" class="text-xs font-bold text-[#0e5e6f] hover:text-[#3adbc4] bg-white border border-[#0e5e6f]/20 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm" data-v-679f2450>`);
          if (unref(copyStatus) !== "copied") {
            _push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" data-v-679f2450></path></svg>`);
          } else {
            _push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-679f2450><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-679f2450></path></svg>`);
          }
          _push(` ${ssrInterpolate(unref(copyStatus) === "copied" ? unref(t)("common.copied") || "Copied!" : unref(t)("common.copy") || "Copy Result")}</button></div><div class="space-y-3" data-v-679f2450>`);
          if (unref(result).vin) {
            _push(`<div class="flex justify-between items-center bg-white/60 p-2 rounded-lg border border-[#0e5e6f]/10" data-v-679f2450><span class="text-xs font-bold text-gray-500 uppercase" data-v-679f2450>VIN</span><span class="font-mono font-bold text-gray-900 tracking-wide" data-v-679f2450>${ssrInterpolate(unref(result).vin)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(result).key_code) {
            _push(`<div class="flex justify-between items-center bg-white/60 p-2 rounded-lg border border-[#0e5e6f]/10" data-v-679f2450><span class="text-xs font-bold text-gray-500 uppercase" data-v-679f2450>Key Code</span><span class="font-mono font-black text-xl text-[#0e5e6f] tracking-widest" data-v-679f2450>${ssrInterpolate(unref(result).key_code)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(result).pin_code) {
            _push(`<div class="flex justify-between items-center bg-white p-3 rounded-lg border border-[#3adbc4] shadow-sm" data-v-679f2450><span class="text-xs font-bold text-[#0e5e6f] uppercase" data-v-679f2450>PIN Code</span><span class="font-mono font-black text-2xl text-[#0e5e6f] tracking-[0.2em]" data-v-679f2450>${ssrInterpolate(unref(result).pin_code)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
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
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-679f2450"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-bXae20sF.mjs.map
