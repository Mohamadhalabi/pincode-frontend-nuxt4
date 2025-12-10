import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { defineComponent, reactive, ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderDynamicModel, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useI18n, c as useRouter, d as useNuxtApp } from './server.mjs';
import { u as useAuth } from './useAuth-DyorHlVq.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useRouter();
    const { $api } = useNuxtApp();
    typeof useAuth === "function" ? useAuth() : null;
    useCart();
    const loginForm = reactive({ email: "", password: "" });
    const loadingLogin = ref(false);
    const errLogin = ref(null);
    const showLoginPass = ref(false);
    const regForm = reactive({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const loadingRegister = ref(false);
    const errRegister = ref(null);
    const showRegPass = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 py-10 sm:py-16" }, _attrs))} data-v-84ce1497><nav class="flex items-center text-sm text-gray-500 mb-8" aria-label="Breadcrumb" data-v-84ce1497>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-[#0e5e6f] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.home") || "Home")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.home") || "Home"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="mx-2 text-gray-300" data-v-84ce1497>›</span><span class="text-gray-900 font-medium" data-v-84ce1497>${ssrInterpolate(unref(t)("auth.login") || "Login")}</span></nav><h1 class="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight text-center sm:text-left" data-v-84ce1497>${ssrInterpolate(unref(t)("auth.welcome") || "Welcome Back")}</h1><div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden" data-v-84ce1497><div class="grid lg:grid-cols-[1fr_auto_1fr]" data-v-84ce1497><section class="p-8 lg:p-10" data-v-84ce1497><h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" data-v-84ce1497><svg class="w-5 h-5 text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-84ce1497><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" data-v-84ce1497></path></svg> ${ssrInterpolate(unref(t)("auth.login") || "Login")}</h2><form class="space-y-5" data-v-84ce1497><div data-v-84ce1497><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-84ce1497>${ssrInterpolate(unref(t)("common.email") || "Email")}</label><input${ssrRenderAttr("value", unref(loginForm).email)} type="email" required class="input" data-v-84ce1497></div><div data-v-84ce1497><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-84ce1497>${ssrInterpolate(unref(t)("auth.password") || "Password")}</label><div class="relative" data-v-84ce1497><input${ssrRenderAttr("type", unref(showLoginPass) ? "text" : "password")}${ssrRenderDynamicModel(unref(showLoginPass) ? "text" : "password", unref(loginForm).password, null)} required class="input pr-10" data-v-84ce1497><button type="button" class="absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-[#0e5e6f] transition-colors" data-v-84ce1497><span class="${ssrRenderClass(unref(showLoginPass) ? "i-lucide:eye-off" : "i-lucide:eye")}" data-v-84ce1497></span></button></div></div><button class="btn w-full"${ssrIncludeBooleanAttr(unref(loadingLogin)) ? " disabled" : ""} data-v-84ce1497>`);
      if (!unref(loadingLogin)) {
        _push(`<span data-v-84ce1497>${ssrInterpolate(unref(t)("auth.login") || "Login")}</span>`);
      } else {
        _push(`<span class="flex items-center justify-center gap-2" data-v-84ce1497><svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-84ce1497><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-84ce1497></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-84ce1497></path></svg> ${ssrInterpolate(unref(t)("common.loading") || "Loading…")}</span>`);
      }
      _push(`</button>`);
      if (unref(errLogin)) {
        _push(`<p class="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-center" data-v-84ce1497>${ssrInterpolate(unref(errLogin))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></section><div class="relative flex items-center justify-center" data-v-84ce1497><div class="hidden lg:block w-px h-3/4 bg-gray-200" data-v-84ce1497></div><div class="lg:hidden h-px w-3/4 bg-gray-200 my-4" data-v-84ce1497></div><div class="absolute bg-white p-2 text-xs font-bold text-gray-400 uppercase tracking-widest" data-v-84ce1497>OR</div></div><section class="p-8 lg:p-10 bg-gray-50/30" data-v-84ce1497><h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" data-v-84ce1497><svg class="w-5 h-5 text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-84ce1497><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-84ce1497></path></svg> ${ssrInterpolate(unref(t)("auth.register") || "Create Account")}</h2><form class="space-y-5" data-v-84ce1497><div class="grid sm:grid-cols-2 gap-4" data-v-84ce1497><div data-v-84ce1497><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-84ce1497>${ssrInterpolate(unref(t)("auth.firstName") || "First name")}</label><input${ssrRenderAttr("value", unref(regForm).first_name)} type="text" required class="input" data-v-84ce1497></div><div data-v-84ce1497><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-84ce1497>${ssrInterpolate(unref(t)("auth.lastName") || "Last name")}</label><input${ssrRenderAttr("value", unref(regForm).last_name)} type="text" required class="input" data-v-84ce1497></div></div><div data-v-84ce1497><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-84ce1497>${ssrInterpolate(unref(t)("common.email") || "Email")}</label><input${ssrRenderAttr("value", unref(regForm).email)} type="email" required class="input" data-v-84ce1497></div><div data-v-84ce1497><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-84ce1497>${ssrInterpolate(unref(t)("auth.password") || "Password")}</label><div class="relative" data-v-84ce1497><input${ssrRenderAttr("type", unref(showRegPass) ? "text" : "password")}${ssrRenderDynamicModel(unref(showRegPass) ? "text" : "password", unref(regForm).password, null)} required minlength="6" class="input pr-10" data-v-84ce1497><button type="button" class="absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-[#0e5e6f] transition-colors" data-v-84ce1497><span class="${ssrRenderClass(unref(showRegPass) ? "i-lucide:eye-off" : "i-lucide:eye")}" data-v-84ce1497></span></button></div></div><div data-v-84ce1497><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5" data-v-84ce1497>${ssrInterpolate(unref(t)("auth.confirmPassword") || "Confirm password")}</label><input${ssrRenderAttr("type", unref(showRegPass) ? "text" : "password")}${ssrRenderDynamicModel(unref(showRegPass) ? "text" : "password", unref(regForm).password_confirmation, null)} required minlength="6" class="input" data-v-84ce1497></div><button class="btn w-full"${ssrIncludeBooleanAttr(unref(loadingRegister)) ? " disabled" : ""} data-v-84ce1497>`);
      if (!unref(loadingRegister)) {
        _push(`<span data-v-84ce1497>${ssrInterpolate(unref(t)("auth.createAccount") || "Register")}</span>`);
      } else {
        _push(`<span class="flex items-center justify-center gap-2" data-v-84ce1497><svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-84ce1497><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-84ce1497></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-84ce1497></path></svg> ${ssrInterpolate(unref(t)("common.loading") || "Loading…")}</span>`);
      }
      _push(`</button>`);
      if (unref(errRegister)) {
        _push(`<p class="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-center" data-v-84ce1497>${ssrInterpolate(unref(errRegister))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></section></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84ce1497"]]);

export { login as default };
//# sourceMappingURL=login-C-Bv_KQA.mjs.map
