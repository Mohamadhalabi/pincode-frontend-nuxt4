import { defineComponent, useSSRContext, computed, mergeProps, ref, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './NuxtImg-JZu4Om2_.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { a as useI18n, o as useLocalePath, q as useSwitchLocalePath, u as useHead, n as navigateTo } from './server.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
import { u as useAuth } from './useAuth-DyorHlVq.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HeaderDesktop",
  __ssrInlineRender: true,
  props: {
    isLoggedIn: { type: Boolean },
    helloText: {},
    cartCount: {},
    locale: {},
    t: { type: Function }
  },
  emits: [
    "home",
    "productsOld",
    "productsNew",
    "kia-before",
    "kia-after",
    "login",
    "account",
    "cart",
    "update:locale"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const currentLocale = computed(
      () => typeof props.locale === "object" && props.locale !== null && "value" in props.locale ? props.locale.value : props.locale
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-24 flex items-center justify-between gap-4 relative z-50 px-4" }, _attrs))} data-v-b794b498><div class="flex-1 flex justify-start" data-v-b794b498><button class="flex items-center gap-2 group shrink-0" data-v-b794b498>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/logo/3.webp",
        alt: "4Pincode",
        class: "h-20 w-auto object-contain",
        format: "webp"
      }, null, _parent));
      _push(`<span class="sr-only" data-v-b794b498>4Pincode</span></button></div><nav class="flex-none flex items-center rounded-xl border border-gray-200 bg-white px-2" aria-label="Primary" data-v-b794b498><div class="relative group" data-v-b794b498><button class="nav-item flex items-center gap-2" data-v-b794b498><svg class="w-5 h-5 nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-v-b794b498><circle cx="9" cy="21" r="1" data-v-b794b498></circle><circle cx="20" cy="21" r="1" data-v-b794b498></circle><path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.9a2 2 0 0 0 2-1.6L23 6H6" data-v-b794b498></path></svg><span class="nav-text" data-v-b794b498>${ssrInterpolate(props.t("nav.tokens") || "Tokens")}</span><svg class="w-4 h-4 ml-1 text-gray-400 group-hover:text-[#0e5e6f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b794b498><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-b794b498></path></svg></button><div class="absolute top-full left-0 w-64 pt-2 hidden group-hover:block z-50" data-v-b794b498><div class="bg-white border border-gray-200 rounded-lg shadow-xl py-1 overflow-hidden" data-v-b794b498><button class="dropdown-item w-full text-left flex items-center gap-2" data-v-b794b498><span data-v-b794b498>${ssrInterpolate(props.t("nav.buyKiaOld") || "Old Kia / Hyundai Tokens")}</span></button><button class="dropdown-item w-full text-left flex items-center gap-2" data-v-b794b498><span data-v-b794b498>${ssrInterpolate(props.t("nav.buyKiaNew") || "New Kia / Hyundai Tokens")}</span></button></div></div></div><div class="h-8 w-px bg-gray-200 mx-1" data-v-b794b498></div><div class="relative group" data-v-b794b498><button class="nav-item flex items-center gap-2" data-v-b794b498><svg width="20" height="20" class="nav-icon" viewBox="0 0 24 24" fill="currentColor" data-v-b794b498><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 4h10V4H7v2zm0 2v12h10V8H7zm2 2h2v2H9v-2zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-8h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" data-v-b794b498></path></svg><span class="nav-text" data-v-b794b498>${ssrInterpolate(props.t("nav.calculators") || "Calculators")}</span><svg class="w-4 h-4 ml-1 text-gray-400 group-hover:text-[#0e5e6f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b794b498><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-b794b498></path></svg></button><div class="absolute top-full left-0 w-72 pt-2 hidden group-hover:block z-50" data-v-b794b498><div class="bg-white border border-gray-200 rounded-lg shadow-xl py-1 overflow-hidden" data-v-b794b498><button class="dropdown-item w-full text-left flex items-center gap-2" data-v-b794b498><span data-v-b794b498>${ssrInterpolate(props.t("nav.calcKiaOld") || "Kia / Hyundai (before 2017)")}</span></button><button class="dropdown-item w-full text-left flex items-center gap-2" data-v-b794b498><span data-v-b794b498>${ssrInterpolate(props.t("nav.calcKiaNew") || "Kia / Hyundai (2017+)")}</span></button></div></div></div></nav><div class="flex-1 flex items-center justify-end gap-3" data-v-b794b498><div class="relative" data-v-b794b498><select${ssrRenderAttr("value", currentLocale.value)} class="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-base font-medium bg-white hover:border-[#3adbc4] cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-[#3adbc4]/20" data-v-b794b498><option value="en" data-v-b794b498>EN</option><option value="ar" data-v-b794b498>العربية</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500" data-v-b794b498><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b794b498><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-b794b498></path></svg></div></div>`);
      if (props.isLoggedIn) {
        _push(`<button class="px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0e5e6f] transition" data-v-b794b498>${ssrInterpolate(props.helloText)}</button>`);
      } else {
        _push(`<button class="px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0e5e6f] transition" data-v-b794b498>${ssrInterpolate(props.t("auth.login") || "Login")}</button>`);
      }
      _push(`<button class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] hover:border-[#3adbc4] transition-colors" aria-label="Cart" data-v-b794b498><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b794b498><circle cx="9" cy="21" r="1" data-v-b794b498></circle><circle cx="20" cy="21" r="1" data-v-b794b498></circle><path d="M1 1h4l2.2 10.9a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" data-v-b794b498></path></svg>`);
      if (props.cartCount > 0) {
        _push(`<span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] grid place-items-center bg-red-600 text-white" data-v-b794b498>${ssrInterpolate(props.cartCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/HeaderDesktop.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const HeaderDesktop = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-b794b498"]]), { __name: "HeaderDesktop" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeaderMobile",
  __ssrInlineRender: true,
  props: {
    isLoggedIn: { type: Boolean },
    helloText: {},
    cartCount: {},
    locale: {},
    t: { type: Function },
    open: { type: Boolean }
  },
  emits: [
    "toggle",
    "home",
    "productsOld",
    "productsNew",
    "serviceOld",
    "serviceNew",
    "login",
    "account",
    "cart",
    "update:locale"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-3" }, _attrs))}><div class="flex items-center justify-between"><div class="flex items-center gap-3"><button class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] hover:border-[#3adbc4]/50 transition-all" aria-label="Menu"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button><button class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/logo/3.webp",
        alt: "4Pincode",
        class: "h-16 w-auto object-contain",
        format: "webp"
      }, null, _parent));
      _push(`</button></div><div class="flex items-center gap-2"><button class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-[#f0fdfc] hover:text-[#0e5e6f] hover:border-[#3adbc4]/50 transition-all" aria-label="Cart"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.2 10.9a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path></svg>`);
      if (props.cartCount > 0) {
        _push(`<span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] grid place-items-center bg-red-600 text-white font-bold border-2 border-white shadow-sm">${ssrInterpolate(props.cartCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/HeaderMobile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HeaderMobile = Object.assign(_sfc_main$1, { __name: "HeaderMobile" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const cart = typeof useCart === "function" ? useCart() : null;
    const i18n = useI18n();
    const { t, locale } = i18n;
    const localePath = useLocalePath();
    useSwitchLocalePath();
    const safeLocales = computed(() => {
      const raw = i18n?.locales;
      const arr = Array.isArray(raw?.value) ? raw.value : Array.isArray(raw) ? raw : null;
      return arr ?? [{ code: "en", dir: "ltr" }];
    });
    const localeCode = computed(() => {
      const l = locale;
      if (l && typeof l === "object" && "value" in l) return l.value;
      return String(l);
    });
    function setLocale(code) {
      const l = locale;
      if (l && typeof l === "object" && "value" in l) {
        l.value = code;
      } else if (i18n.setLocale) {
        i18n.setLocale(code);
      } else {
        i18n.locale = code;
      }
    }
    const auth = typeof useAuth === "function" ? useAuth() : null;
    const user = computed(() => auth && auth.user ? auth.user.value : null);
    const isLoggedIn = computed(() => !!auth?.isLoggedIn?.value);
    const displayName = computed(() => {
      const u = user.value;
      if (!u) return "";
      const first = u.first_name ?? u.firstName;
      const last = u.last_name ?? u.lastName;
      const full = (u.name || [first, last].filter(Boolean).join(" ")).trim();
      return full || String(u.email || "").split("@")[0] || "Account";
    });
    const helloText = computed(() => {
      if (!isLoggedIn.value) return "";
      return t("auth.hello", { name: displayName.value }) || `Hello ${displayName.value || "Account"}`;
    });
    const currentLocale = computed(
      () => safeLocales.value.find((l) => l.code === localeCode.value) ?? { code: localeCode.value, dir: "ltr" }
    );
    const dir = computed(() => currentLocale.value?.dir || "ltr");
    useHead({ htmlAttrs: { lang: () => localeCode.value, dir: () => dir.value } });
    const cartItems = computed(() => {
      const itemsRef = cart?.items;
      return Array.isArray(itemsRef?.value) ? itemsRef.value : [];
    });
    const cartCount = computed(
      () => cartItems.value.reduce((n, i) => n + Number(i?.qty || 0), 0)
    );
    const mobileOpen = ref(false);
    const go = (p) => navigateTo(localePath(p));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm" }, _attrs))} data-v-f0c7352a><div class="mx-auto w-full max-w-6xl px-4" data-v-f0c7352a>`);
      _push(ssrRenderComponent(HeaderDesktop, {
        class: "hidden md:flex",
        "is-logged-in": unref(isLoggedIn),
        "hello-text": unref(helloText),
        "cart-count": unref(cartCount),
        locale: unref(localeCode),
        t: unref(t),
        onHome: ($event) => go("/"),
        onKiaBefore: ($event) => go("/services/kia-hyundai-before-2017"),
        onKiaAfter: ($event) => go("/services/kia-hyundai-after-2017"),
        onLogin: ($event) => go("/login"),
        onAccount: ($event) => go("/account"),
        onCart: ($event) => go("/cart"),
        "onUpdate:locale": (v) => setLocale(v),
        onProductsOld: ($event) => go("/product/kia-hyundai-pincode-old"),
        onProductsNew: ($event) => go("/product/kia-hyundai-pincode-new")
      }, null, _parent));
      _push(ssrRenderComponent(HeaderMobile, {
        class: "md:hidden",
        "is-logged-in": unref(isLoggedIn),
        "hello-text": unref(helloText),
        "cart-count": unref(cartCount),
        locale: unref(localeCode),
        t: unref(t),
        open: unref(mobileOpen),
        onToggle: ($event) => mobileOpen.value = !unref(mobileOpen),
        onHome: ($event) => go("/"),
        onLogin: ($event) => go("/login"),
        onAccount: ($event) => go("/account"),
        onCart: ($event) => go("/cart")
      }, null, _parent));
      _push(`</div>`);
      if (unref(mobileOpen)) {
        _push(`<div class="md:hidden border-t border-gray-100 bg-white shadow-xl absolute w-full left-0" data-v-f0c7352a><div class="mx-auto px-4 py-4 flex flex-col text-sm text-gray-700 space-y-1" data-v-f0c7352a><div class="px-2 pb-2 pt-1 text-xs font-bold text-gray-400 uppercase tracking-wider" data-v-f0c7352a>${ssrInterpolate(unref(t)("nav.tokens") || "Tokens")}</div><button class="group w-full py-3 px-3 rounded-xl text-left hover:bg-[#f0fdfc] flex items-center gap-3 transition-colors" data-v-f0c7352a><div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:text-[#0e5e6f] transition-colors" data-v-f0c7352a><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-v-f0c7352a><circle cx="9" cy="21" r="1" data-v-f0c7352a></circle><circle cx="20" cy="21" r="1" data-v-f0c7352a></circle><path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.9a2 2 0 0 0 2-1.6L23 6H6" data-v-f0c7352a></path></svg></div><span class="font-medium group-hover:text-[#0e5e6f]" data-v-f0c7352a>${ssrInterpolate(unref(t)("nav.buyKiaOld") || "Old Kia / Hyundai Tokens")}</span></button><button class="group w-full py-3 px-3 rounded-xl text-left hover:bg-[#f0fdfc] flex items-center gap-3 transition-colors" data-v-f0c7352a><div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:text-[#0e5e6f] transition-colors" data-v-f0c7352a><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-v-f0c7352a><circle cx="9" cy="21" r="1" data-v-f0c7352a></circle><circle cx="20" cy="21" r="1" data-v-f0c7352a></circle><path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.9a2 2 0 0 0 2-1.6L23 6H6" data-v-f0c7352a></path></svg></div><span class="font-medium group-hover:text-[#0e5e6f]" data-v-f0c7352a>${ssrInterpolate(unref(t)("nav.buyKiaNew") || "New Kia / Hyundai Tokens")}</span></button><div class="h-px bg-gray-100 my-2" data-v-f0c7352a></div><div class="px-2 pb-2 pt-1 text-xs font-bold text-gray-400 uppercase tracking-wider" data-v-f0c7352a>${ssrInterpolate(unref(t)("nav.calculators") || "Calculators")}</div><button class="group w-full py-3 px-3 rounded-xl text-left hover:bg-[#f0fdfc] flex items-center gap-3 transition-colors" data-v-f0c7352a><div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:text-[#0e5e6f] transition-colors" data-v-f0c7352a><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" data-v-f0c7352a><rect x="4" y="2" width="16" height="20" rx="2" data-v-f0c7352a></rect><line x1="8" y1="6" x2="16" y2="6" data-v-f0c7352a></line><line x1="8" y1="10" x2="8" y2="10" data-v-f0c7352a></line><line x1="12" y1="10" x2="12" y2="10" data-v-f0c7352a></line><line x1="16" y1="10" x2="16" y2="10" data-v-f0c7352a></line><line x1="8" y1="14" x2="8" y2="14" data-v-f0c7352a></line><line x1="12" y1="14" x2="12" y2="14" data-v-f0c7352a></line><line x1="16" y1="14" x2="16" y2="14" data-v-f0c7352a></line><line x1="8" y1="18" x2="8" y2="18" data-v-f0c7352a></line><line x1="12" y1="18" x2="12" y2="18" data-v-f0c7352a></line><line x1="16" y1="18" x2="16" y2="18" data-v-f0c7352a></line></svg></div><span class="font-medium group-hover:text-[#0e5e6f]" data-v-f0c7352a>${ssrInterpolate(unref(t)("nav.calcKiaOld") || "Before 2017 Calculator")}</span></button><button class="group w-full py-3 px-3 rounded-xl text-left hover:bg-[#f0fdfc] flex items-center gap-3 transition-colors" data-v-f0c7352a><div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:text-[#0e5e6f] transition-colors" data-v-f0c7352a><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" data-v-f0c7352a><rect x="4" y="2" width="16" height="20" rx="2" data-v-f0c7352a></rect><line x1="8" y1="6" x2="16" y2="6" data-v-f0c7352a></line><line x1="8" y1="10" x2="8" y2="10" data-v-f0c7352a></line><line x1="12" y1="10" x2="12" y2="10" data-v-f0c7352a></line><line x1="16" y1="10" x2="16" y2="10" data-v-f0c7352a></line><line x1="8" y1="14" x2="8" y2="14" data-v-f0c7352a></line><line x1="12" y1="14" x2="12" y2="14" data-v-f0c7352a></line><line x1="16" y1="14" x2="16" y2="14" data-v-f0c7352a></line><line x1="8" y1="18" x2="8" y2="18" data-v-f0c7352a></line><line x1="12" y1="18" x2="12" y2="18" data-v-f0c7352a></line><line x1="16" y1="18" x2="16" y2="18" data-v-f0c7352a></line></svg></div><span class="font-medium group-hover:text-[#0e5e6f]" data-v-f0c7352a>${ssrInterpolate(unref(t)("nav.calcKiaNew") || "2017+ Calculator")}</span></button><div class="h-px bg-gray-100 my-2" data-v-f0c7352a></div><div class="flex items-center justify-between px-3 py-2" data-v-f0c7352a><label class="text-sm font-medium text-gray-500" data-v-f0c7352a>${ssrInterpolate(unref(t)("common.language") || "Language")}</label><div class="relative" data-v-f0c7352a><select${ssrRenderAttr("value", unref(localeCode))} class="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm bg-white hover:border-[#3adbc4] focus:ring-2 focus:ring-[#3adbc4]/20 outline-none" data-v-f0c7352a><option value="en" data-v-f0c7352a>EN</option><option value="ar" data-v-f0c7352a>العربية</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500" data-v-f0c7352a><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f0c7352a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-f0c7352a></path></svg></div></div></div><div class="pt-2" data-v-f0c7352a>`);
        if (unref(isLoggedIn)) {
          _push(`<button class="btn w-full" data-v-f0c7352a>${ssrInterpolate(unref(helloText))}</button>`);
        } else {
          _push(`<button class="btn w-full" data-v-f0c7352a>${ssrInterpolate(unref(t)("auth.login") || "Login")}</button>`);
        }
        _push(`</div>`);
        if (unref(isLoggedIn)) {
          _push(`<div class="pb-2" data-v-f0c7352a><button class="btn-ghost w-full" data-v-f0c7352a>${ssrInterpolate(unref(t)("auth.logout") || "Logout")}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/AppHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0c7352a"]]);

export { AppHeader as default };
//# sourceMappingURL=AppHeader-DVkgbCjz.mjs.map
