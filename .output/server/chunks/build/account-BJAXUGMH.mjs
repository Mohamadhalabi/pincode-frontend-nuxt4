import { defineComponent, computed, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { a as useI18n, c as useRouter, d as useNuxtApp } from './server.mjs';
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
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useRouter();
    const { $api } = useNuxtApp();
    const auth = typeof useAuth === "function" ? useAuth() : null;
    computed(() => auth?.user?.value || null);
    const activeTab = ref("overview");
    ref(false);
    const overviewError = ref(null);
    const profile = ref(null);
    const stats = ref(null);
    const wallets = ref([]);
    const kiaBeforeTokens = computed(() => {
      const w = wallets.value.find(
        (w2) => w2.service_slug === "kia-hyundai-before-2017"
      );
      return w ? Number(w.tokens || 0) : 0;
    });
    const kiaAfterTokens = computed(() => {
      const w = wallets.value.find(
        (w2) => w2.service_slug === "kia-hyundai-after-2017"
      );
      return w ? Number(w.tokens || 0) : 0;
    });
    const editingProfile = ref(false);
    const savingProfile = ref(false);
    const profileError = ref(null);
    const profileSuccess = ref(null);
    const profileForm = reactive({
      name: "",
      email: "",
      phone: ""
    });
    ref(false);
    const ordersError = ref(null);
    const orders = ref([]);
    const ordersMeta = ref({ current_page: 1, last_page: 1 });
    ref(false);
    const lookupsError = ref(null);
    const lookups = ref([]);
    const lookupsMeta = ref({ current_page: 1, last_page: 1 });
    const formatDate = (value) => {
      if (!value) return "";
      return new Date(value).toLocaleString();
    };
    const formatMoney = (value) => {
      return "$" + Number(value || 0).toFixed(2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto px-4 py-8" }, _attrs))} data-v-318ac972><h1 class="text-2xl sm:text-3xl font-bold mb-6" data-v-318ac972>${ssrInterpolate(unref(t)("account.title") || "My account")}</h1><div class="border-b mb-4" data-v-318ac972><nav class="-mb-px flex gap-4 text-sm" data-v-318ac972><button type="button" class="${ssrRenderClass([
        unref(activeTab) === "overview" ? "border-orange-500 text-orange-600 font-semibold" : "border-transparent text-gray-500 hover:text-gray-800",
        "border-b-2 pb-2 px-1"
      ])}" data-v-318ac972>${ssrInterpolate(unref(t)("account.tabs.overview") || "Overview")}</button><button type="button" class="${ssrRenderClass([
        unref(activeTab) === "orders" ? "border-orange-500 text-orange-600 font-semibold" : "border-transparent text-gray-500 hover:text-gray-800",
        "border-b-2 pb-2 px-1"
      ])}" data-v-318ac972>${ssrInterpolate(unref(t)("account.tabs.orders") || "Orders")}</button><button type="button" class="${ssrRenderClass([
        unref(activeTab) === "lookups" ? "border-orange-500 text-orange-600 font-semibold" : "border-transparent text-gray-500 hover:text-gray-800",
        "border-b-2 pb-2 px-1"
      ])}" data-v-318ac972>${ssrInterpolate(unref(t)("account.tabs.lookups") || "VIN lookups")}</button></nav></div>`);
      if (unref(activeTab) === "overview") {
        _push(`<section data-v-318ac972>`);
        if (unref(overviewError)) {
          _push(`<div class="rounded-xl bg-red-50 text-red-700 px-3 py-2 mb-3 text-sm" data-v-318ac972>${ssrInterpolate(unref(overviewError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid gap-4 md:grid-cols-3 mb-5" data-v-318ac972><div class="rounded-2xl border bg-white p-4" data-v-318ac972><div class="text-xs text-gray-500 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("account.cards.totalOrders") || "Total orders")}</div><div class="text-2xl font-bold" data-v-318ac972>${ssrInterpolate(unref(stats)?.total_orders ?? 0)}</div></div><div class="rounded-2xl border bg-white p-4" data-v-318ac972><div class="text-xs text-gray-500 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("account.cards.totalLookups") || "VIN lookups")}</div><div class="text-2xl font-bold" data-v-318ac972>${ssrInterpolate(unref(stats)?.total_lookups ?? 0)}</div><div class="text-xs text-gray-500 mt-1" data-v-318ac972>${ssrInterpolate(unref(t)("account.cards.completed") || "Completed")}: ${ssrInterpolate(unref(stats)?.completed_lookups ?? 0)}</div></div><div class="rounded-2xl border bg-white p-4" data-v-318ac972><div class="text-xs text-gray-500 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("account.cards.tokensSpent") || "Tokens spent")}</div><div class="text-2xl font-bold" data-v-318ac972>${ssrInterpolate(unref(stats)?.total_tokens_spent ?? 0)}</div></div></div><div class="grid gap-4 md:grid-cols-2 mb-5" data-v-318ac972><div class="rounded-2xl border bg-white p-4" data-v-318ac972><div class="text-xs text-gray-500 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("account.cards.kiaBefore") || "Kia / Hyundai tokens (before 2017)")}</div><div class="text-2xl font-bold" data-v-318ac972>${ssrInterpolate(unref(kiaBeforeTokens))}</div></div><div class="rounded-2xl border bg-white p-4" data-v-318ac972><div class="text-xs text-gray-500 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("account.cards.kiaAfter") || "Kia / Hyundai tokens (2017 and after)")}</div><div class="text-2xl font-bold" data-v-318ac972>${ssrInterpolate(unref(kiaAfterTokens))}</div></div></div><div class="grid gap-4 md:grid-cols-[2fr_3fr]" data-v-318ac972><div class="rounded-2xl border bg-white p-4" data-v-318ac972><div class="flex items-center justify-between mb-3" data-v-318ac972><h2 class="text-sm font-semibold" data-v-318ac972>${ssrInterpolate(unref(t)("account.profile.title") || "Profile")}</h2><button type="button" class="text-xs font-medium text-orange-600 hover:text-orange-700" data-v-318ac972>${ssrInterpolate(unref(editingProfile) ? unref(t)("common.cancel") || "Cancel" : unref(t)("account.profile.edit") || "Edit")}</button></div>`);
        if (!unref(editingProfile)) {
          _push(`<div class="space-y-2 text-sm" data-v-318ac972><div data-v-318ac972><div class="text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("common.name") || "Name")}</div><div class="font-medium" data-v-318ac972>${ssrInterpolate(unref(profile)?.name || "-")}</div></div><div data-v-318ac972><div class="text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("common.email") || "Email")}</div><div class="font-medium" data-v-318ac972>${ssrInterpolate(unref(profile)?.email || "-")}</div></div><div data-v-318ac972><div class="text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("common.phone") || "Phone")}</div><div class="font-medium" data-v-318ac972>${ssrInterpolate(unref(profile)?.phone || "-")}</div></div><div data-v-318ac972><div class="text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("account.profile.memberSince") || "Member since")}</div><div class="font-medium" data-v-318ac972>${ssrInterpolate(unref(profile)?.created_at ? formatDate(unref(profile).created_at) : "-")}</div></div></div>`);
        } else {
          _push(`<form class="space-y-3 text-sm" data-v-318ac972><div data-v-318ac972><label class="block text-xs text-gray-600 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("common.name") || "Name")}</label><input${ssrRenderAttr("value", unref(profileForm).name)} type="text" class="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required data-v-318ac972></div><div data-v-318ac972><label class="block text-xs text-gray-600 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("common.email") || "Email")}</label><input${ssrRenderAttr("value", unref(profileForm).email)} type="email" class="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required data-v-318ac972></div><div data-v-318ac972><label class="block text-xs text-gray-600 mb-1" data-v-318ac972>${ssrInterpolate(unref(t)("common.phone") || "Phone")}</label><input${ssrRenderAttr("value", unref(profileForm).phone)} type="text" class="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" data-v-318ac972></div>`);
          if (unref(profileError)) {
            _push(`<div class="text-xs text-red-600" data-v-318ac972>${ssrInterpolate(unref(profileError))}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(profileSuccess)) {
            _push(`<div class="text-xs text-emerald-600" data-v-318ac972>${ssrInterpolate(unref(profileSuccess))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button type="submit" class="inline-flex items-center justify-center rounded-xl bg-orange-500 text-white px-4 py-2 text-xs font-medium hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(unref(savingProfile)) ? " disabled" : ""} data-v-318ac972>`);
          if (!unref(savingProfile)) {
            _push(`<span data-v-318ac972>${ssrInterpolate(unref(t)("common.save") || "Save")}</span>`);
          } else {
            _push(`<span data-v-318ac972>${ssrInterpolate(unref(t)("common.loading") || "Saving…")}</span>`);
          }
          _push(`</button></form>`);
        }
        _push(`</div><div class="rounded-2xl border bg-white p-4" data-v-318ac972><h2 class="text-sm font-semibold mb-3" data-v-318ac972>${ssrInterpolate(unref(t)("account.wallets.title") || "Service wallets")}</h2>`);
        if (!unref(wallets).length) {
          _push(`<div class="text-xs text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("account.wallets.empty") || "No wallets yet.")}</div>`);
        } else {
          _push(`<ul class="divide-y text-sm" data-v-318ac972><!--[-->`);
          ssrRenderList(unref(wallets), (w) => {
            _push(`<li class="flex items-center justify-between py-2" data-v-318ac972><div data-v-318ac972><div class="font-medium" data-v-318ac972>${ssrInterpolate(w.service_name || "Service #" + w.service_id)}</div><div class="text-xs text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("account.wallets.tokens") || "Tokens")}</div></div><div class="text-lg font-bold" data-v-318ac972>${ssrInterpolate(w.tokens)}</div></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div></div></section>`);
      } else if (unref(activeTab) === "orders") {
        _push(`<section data-v-318ac972>`);
        if (unref(ordersError)) {
          _push(`<div class="rounded-xl bg-red-50 text-red-700 px-3 py-2 mb-3 text-sm" data-v-318ac972>${ssrInterpolate(unref(ordersError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="rounded-2xl border bg-white overflow-hidden w-full" data-v-318ac972><table class="w-full min-w-full border-collapse text-sm" data-v-318ac972><thead class="bg-gray-50 text-xs uppercase text-gray-500" data-v-318ac972><tr data-v-318ac972><th class="px-6 py-2 text-left" data-v-318ac972>#</th><th class="px-6 py-2 text-left" data-v-318ac972>${ssrInterpolate(unref(t)("account.orders.date") || "Date")}</th><th class="px-6 py-2 text-left" data-v-318ac972>${ssrInterpolate(unref(t)("account.orders.status") || "Status")}</th><th class="px-6 py-2 text-left" data-v-318ac972>${ssrInterpolate(unref(t)("account.orders.payment") || "Payment")}</th><th class="px-6 py-2 text-right" data-v-318ac972>${ssrInterpolate(unref(t)("account.orders.total") || "Total")}</th></tr></thead><tbody data-v-318ac972>`);
        if (!unref(orders).length) {
          _push(`<tr data-v-318ac972><td colspan="5" class="px-6 py-4 text-center text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("account.orders.empty") || "No orders yet.")}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(orders), (o) => {
          _push(`<tr class="border-t" data-v-318ac972><td class="px-6 py-2" data-v-318ac972>#${ssrInterpolate(o.id)}</td><td class="px-6 py-2" data-v-318ac972>${ssrInterpolate(formatDate(o.created_at))}</td><td class="px-6 py-2 capitalize" data-v-318ac972>${ssrInterpolate(o.status)}</td><td class="px-6 py-2 capitalize" data-v-318ac972>${ssrInterpolate(o.payment_method)}</td><td class="px-6 py-2 text-right font-medium" data-v-318ac972>${ssrInterpolate(formatMoney(o.subtotal))}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
        if (unref(ordersMeta).last_page > 1) {
          _push(`<div class="flex items-center justify-end gap-2 mt-3 text-xs" data-v-318ac972><button type="button" class="px-2 py-1 rounded border"${ssrIncludeBooleanAttr(unref(ordersMeta).current_page <= 1) ? " disabled" : ""} data-v-318ac972> ‹ </button><span data-v-318ac972>${ssrInterpolate(unref(ordersMeta).current_page)} / ${ssrInterpolate(unref(ordersMeta).last_page)}</span><button type="button" class="px-2 py-1 rounded border"${ssrIncludeBooleanAttr(unref(ordersMeta).current_page >= unref(ordersMeta).last_page) ? " disabled" : ""} data-v-318ac972> › </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      } else if (unref(activeTab) === "lookups") {
        _push(`<section data-v-318ac972>`);
        if (unref(lookupsError)) {
          _push(`<div class="rounded-xl bg-red-50 text-red-700 px-3 py-2 mb-3 text-sm" data-v-318ac972>${ssrInterpolate(unref(lookupsError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="rounded-2xl border bg-white overflow-hidden w-full" data-v-318ac972><table class="w-full min-w-full border-collapse text-sm" data-v-318ac972><thead class="bg-gray-50 text-xs uppercase text-gray-500" data-v-318ac972><tr data-v-318ac972><th class="px-6 py-2 text-left" data-v-318ac972>#</th><th class="px-6 py-2 text-left" data-v-318ac972>${ssrInterpolate(unref(t)("account.lookups.service") || "Service")}</th><th class="px-6 py-2 text-left" data-v-318ac972>${ssrInterpolate(unref(t)("account.lookups.status") || "Status")}</th><th class="px-6 py-2 text-right" data-v-318ac972>${ssrInterpolate(unref(t)("account.lookups.cost") || "Tokens")}</th><th class="px-6 py-2 text-left" data-v-318ac972>${ssrInterpolate(unref(t)("account.lookups.date") || "Date")}</th></tr></thead><tbody data-v-318ac972>`);
        if (!unref(lookups).length) {
          _push(`<tr data-v-318ac972><td colspan="5" class="px-6 py-4 text-center text-gray-500" data-v-318ac972>${ssrInterpolate(unref(t)("account.lookups.empty") || "No VIN lookups yet.")}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(lookups), (l) => {
          _push(`<tr class="border-t" data-v-318ac972><td class="px-6 py-2" data-v-318ac972>#${ssrInterpolate(l.id)}</td><td class="px-6 py-2" data-v-318ac972>${ssrInterpolate(l.service_name || "Service #" + l.service_id)}</td><td class="px-6 py-2 capitalize" data-v-318ac972>${ssrInterpolate(l.status)}</td><td class="px-6 py-2 text-right font-medium" data-v-318ac972>${ssrInterpolate(l.cost_tokens)}</td><td class="px-6 py-2" data-v-318ac972>${ssrInterpolate(formatDate(l.created_at))}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
        if (unref(lookupsMeta).last_page > 1) {
          _push(`<div class="flex items-center justify-end gap-2 mt-3 text-xs" data-v-318ac972><button type="button" class="px-2 py-1 rounded border"${ssrIncludeBooleanAttr(unref(lookupsMeta).current_page <= 1) ? " disabled" : ""} data-v-318ac972> ‹ </button><span data-v-318ac972>${ssrInterpolate(unref(lookupsMeta).current_page)} / ${ssrInterpolate(unref(lookupsMeta).last_page)}</span><button type="button" class="px-2 py-1 rounded border"${ssrIncludeBooleanAttr(unref(lookupsMeta).current_page >= unref(lookupsMeta).last_page) ? " disabled" : ""} data-v-318ac972> › </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const account = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-318ac972"]]);

export { account as default };
//# sourceMappingURL=account-BJAXUGMH.mjs.map
