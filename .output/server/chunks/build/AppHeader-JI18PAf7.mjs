import { defineComponent, useSSRContext, computed, mergeProps, unref, ref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from 'vue/server-renderer';
import { a as useI18n, v as useLocalePath, x as useSwitchLocalePath, u as useHead, n as navigateTo } from './server.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-14 flex items-center gap-4" }, _attrs))}><button class="flex items-center gap-2 group shrink-0"><div class="h-9 w-9 rounded-xl bg-brand/10 grid place-items-center text-brand font-bold"> PK </div><span class="font-semibold text-gray-800 group-hover:text-brand transition"> PIN Code </span></button><nav class="ml-6 flex items-center gap-1"><button class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand transition">${ssrInterpolate(props.t("nav.kiaBefore2017") || "Kia / Hyundai VIN to PIN (before 2017)")}</button><button class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand transition">${ssrInterpolate(props.t("nav.kiaAfter2017") || "Kia / Hyundai VIN to PIN (2017 and after)")}</button><select${ssrRenderAttr("value", unref(currentLocale))} class="ml-1 border border-gray-200 rounded-lg px-2 py-1 text-sm bg-white hover:border-brand cursor-pointer transition"><option value="en">EN</option><option value="ar">العربية</option></select></nav><div class="flex-1"></div><div class="flex items-center gap-3">`);
      if (props.isLoggedIn) {
        _push(`<button class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand transition">${ssrInterpolate(props.helloText)}</button>`);
      } else {
        _push(`<button class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand transition">${ssrInterpolate(props.t("auth.login") || "Login")}</button>`);
      }
      _push(`<button class="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50" aria-label="Cart"><svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.2 10.9a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path></svg>`);
      if (props.cartCount > 0) {
        _push(`<span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] grid place-items-center bg-red-600 text-white">${ssrInterpolate(props.cartCount)}</span>`);
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
const HeaderDesktop = Object.assign(_sfc_main$2, { __name: "HeaderDesktop" });
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
  emits: ["toggle", "home", "categories", "lookups", "login", "account", "cart"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-3" }, _attrs))}><div class="flex items-center justify-between"><div class="flex items-center gap-2"><button class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50" aria-label="Menu"><span class="i-lucide:menu"></span></button><button class="flex items-center gap-2"><div class="h-9 w-9 rounded-xl bg-brand/10 grid place-items-center text-brand font-bold">PK</div><span class="font-semibold text-gray-800">PIN Code</span></button></div><div class="flex items-center gap-2"><select class="border border-gray-200 rounded-lg px-2 py-1 text-sm bg-white hover:border-brand"><option value="en"${ssrIncludeBooleanAttr(Array.isArray(props.locale) ? ssrLooseContain(props.locale, "en") : ssrLooseEqual(props.locale, "en")) ? " selected" : ""}>EN</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(props.locale) ? ssrLooseContain(props.locale, "ar") : ssrLooseEqual(props.locale, "ar")) ? " selected" : ""}>العربية</option></select><button class="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50" aria-label="Cart"><svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.2 10.9a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path></svg>`);
      if (props.cartCount > 0) {
        _push(`<span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] grid place-items-center bg-red-600 text-white">${ssrInterpolate(props.cartCount)}</span>`);
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
      if (l && typeof l === "object" && "value" in l) {
        return l.value;
      }
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
    const isLoggedIn = computed(() => {
      return !!user.value;
    });
    const displayName = computed(() => {
      const u = user.value;
      if (!u) return "";
      const first = u.first_name ?? u.firstName;
      const last = u.last_name ?? u.lastName;
      const full = (u.name || [first, last].filter(Boolean).join(" ")).trim();
      return full || String(u.email || "").split("@")[0] || "Account";
    });
    const helloText = computed(
      () => t("auth.hello", { name: displayName.value }) || `Hello ${displayName.value || "Account"}`
    );
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
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur" }, _attrs))} data-v-cf8cbba4><div class="mx-auto w-full max-w-6xl px-4" data-v-cf8cbba4>`);
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
        "onUpdate:locale": (v) => setLocale(v)
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
        onCategories: ($event) => go("/categories"),
        onLookups: ($event) => go("/lookups"),
        onLogin: ($event) => go("/login"),
        onAccount: ($event) => go("/account"),
        onCart: ($event) => go("/cart")
      }, null, _parent));
      _push(`</div>`);
      if (unref(mobileOpen)) {
        _push(`<div class="md:hidden border-t border-gray-200" data-v-cf8cbba4><div class="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2" data-v-cf8cbba4><button class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 text-left" data-v-cf8cbba4>${ssrInterpolate(unref(t)("nav.categories") || "Categories")}</button><button class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 text-left" data-v-cf8cbba4>${ssrInterpolate(unref(t)("nav.lookups") || "My Lookups")}</button><div class="flex items-center gap-2 pt-2" data-v-cf8cbba4><label class="text-sm text-gray-600" data-v-cf8cbba4>${ssrInterpolate(unref(t)("common.language") || "Language")}</label><select${ssrRenderAttr("value", unref(localeCode))} class="border border-gray-200 rounded-lg px-2 py-1 text-sm bg-white hover:border-brand transition" data-v-cf8cbba4><option value="en" data-v-cf8cbba4>EN</option><option value="ar" data-v-cf8cbba4>العربية</option></select></div><div class="pt-2" data-v-cf8cbba4>`);
        if (unref(isLoggedIn)) {
          _push(`<button class="btn w-full" data-v-cf8cbba4>${ssrInterpolate(unref(helloText))}</button>`);
        } else {
          _push(`<button class="btn w-full" data-v-cf8cbba4>${ssrInterpolate(unref(t)("auth.login") || "Login")}</button>`);
        }
        _push(`</div>`);
        if (unref(isLoggedIn)) {
          _push(`<div class="pt-1" data-v-cf8cbba4><button class="btn-ghost w-full" data-v-cf8cbba4>${ssrInterpolate(unref(t)("auth.logout") || "Logout")}</button></div>`);
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
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf8cbba4"]]);

export { AppHeader as default };
//# sourceMappingURL=AppHeader-JI18PAf7.mjs.map
