import { _ as __nuxt_component_0 } from './NuxtImg-JZu4Om2_.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DhHsLoL_.mjs';
import { defineComponent, computed, ref, reactive, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { a as useI18n, c as useRouter, d as useNuxtApp } from './server.mjs';
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
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useRouter();
    const { $api } = useNuxtApp();
    const auth = typeof useAuth === "function" ? useAuth() : null;
    const user = computed(() => auth?.user?.value || null);
    const clientToken = computed(
      () => null
    );
    const activeTab = ref("overview");
    const expandedOrderId = ref(null);
    ref(false);
    const overviewError = ref(null);
    const profile = ref(null);
    const stats = ref(null);
    const wallets = ref([]);
    const kiaBeforeTokens = computed(() => {
      const w = wallets.value.find((w2) => w2.service_slug === "kia-hyundai-before-2017");
      return w ? Number(w.tokens || 0) : 0;
    });
    const kiaAfterTokens = computed(() => {
      const w = wallets.value.find((w2) => w2.service_slug === "kia-hyundai-after-2017");
      return w ? Number(w.tokens || 0) : 0;
    });
    const editingProfile = ref(false);
    const savingProfile = ref(false);
    const profileError = ref(null);
    const profileSuccess = ref(null);
    const profileForm = reactive({ name: "", email: "", phone: "" });
    ref(false);
    const ordersError = ref(null);
    const orders = ref([]);
    const ordersMeta = ref({ current_page: 1, last_page: 1 });
    ref(false);
    const lookupsError = ref(null);
    const lookups = ref([]);
    const lookupsMeta = ref({ current_page: 1, last_page: 1 });
    const formatDate = (value) => value ? new Date(value).toLocaleString() : "";
    const formatMoney = (value) => "$" + Number(value || 0).toFixed(2);
    const statusBadge = (s) => {
      const v = (s || "").toLowerCase();
      if (v === "completed" || v === "paid") return "badge badge--ok";
      if (v === "failed" || v === "cancelled") return "badge badge--bad";
      return "badge badge--wait";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto px-4 py-8" }, _attrs))} data-v-6c7b7956><div class="flex items-center justify-between mb-8" data-v-6c7b7956><div data-v-6c7b7956><h1 class="text-3xl font-extrabold text-gray-900 tracking-tight" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.title") || "My account")}</h1><p class="text-sm text-gray-500 mt-1" data-v-6c7b7956>Manage your profile, orders, and tokens.</p></div>`);
      if (unref(user) || unref(clientToken)) {
        _push(`<button class="btn-ghost text-xs sm:text-sm" data-v-6c7b7956>${ssrInterpolate(unref(t)("auth.logout") || "Logout")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="border-b border-gray-200 mb-8" data-v-6c7b7956><nav class="-mb-px flex gap-6 text-sm font-medium" data-v-6c7b7956><button type="button" class="${ssrRenderClass([unref(activeTab) === "overview" ? "tab-btn--active" : "", "tab-btn"])}" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.tabs.overview") || "Overview")}</button><button type="button" class="${ssrRenderClass([unref(activeTab) === "orders" ? "tab-btn--active" : "", "tab-btn"])}" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.tabs.orders") || "Orders")}</button><button type="button" class="${ssrRenderClass([unref(activeTab) === "lookups" ? "tab-btn--active" : "", "tab-btn"])}" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.tabs.lookups") || "VIN lookups")}</button></nav></div>`);
      if (unref(activeTab) === "overview") {
        _push(`<section class="space-y-6" data-v-6c7b7956>`);
        if (unref(overviewError)) {
          _push(`<div class="alert alert--bad" data-v-6c7b7956>${ssrInterpolate(unref(overviewError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid gap-5 md:grid-cols-3" data-v-6c7b7956><div class="stat-card" data-v-6c7b7956><div class="stat-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.cards.totalOrders") || "Total orders")}</div><div class="stat-value" data-v-6c7b7956>${ssrInterpolate(unref(stats)?.total_orders ?? 0)}</div></div><div class="stat-card" data-v-6c7b7956><div class="stat-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.cards.totalLookups") || "VIN lookups")}</div><div class="stat-value" data-v-6c7b7956>${ssrInterpolate(unref(stats)?.total_lookups ?? 0)}</div><div class="stat-sub text-[#0e5e6f]" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.cards.completed") || "Completed")}: ${ssrInterpolate(unref(stats)?.completed_lookups ?? 0)}</div></div><div class="stat-card" data-v-6c7b7956><div class="stat-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.cards.tokensSpent") || "Tokens spent")}</div><div class="stat-value" data-v-6c7b7956>${ssrInterpolate(unref(stats)?.total_tokens_spent ?? 0)}</div></div></div><div class="grid gap-5 md:grid-cols-2" data-v-6c7b7956><div class="stat-card border-l-4 border-l-[#0e5e6f]" data-v-6c7b7956><div class="stat-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.cards.kiaBefore") || "Kia / Hyundai tokens (before 2017)")}</div><div class="stat-value text-[#0e5e6f]" data-v-6c7b7956>${ssrInterpolate(unref(kiaBeforeTokens))}</div></div><div class="stat-card border-l-4 border-l-[#3adbc4]" data-v-6c7b7956><div class="stat-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.cards.kiaAfter") || "Kia / Hyundai tokens (2017 and after)")}</div><div class="stat-value text-[#0e5e6f]" data-v-6c7b7956>${ssrInterpolate(unref(kiaAfterTokens))}</div></div></div><div class="grid gap-6 md:grid-cols-[2fr_3fr]" data-v-6c7b7956><div class="card" data-v-6c7b7956><div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100" data-v-6c7b7956><h2 class="text-base font-bold text-gray-900" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.profile.title") || "Profile")}</h2><button class="text-xs font-semibold text-[#0e5e6f] hover:text-[#3adbc4] hover:underline" data-v-6c7b7956>${ssrInterpolate(unref(editingProfile) ? unref(t)("common.cancel") || "Cancel" : unref(t)("account.profile.edit") || "Edit")}</button></div>`);
        if (!unref(editingProfile)) {
          _push(`<div class="space-y-4 text-sm" data-v-6c7b7956><div class="field" data-v-6c7b7956><div class="field-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("common.name") || "Name")}</div><div class="field-value" data-v-6c7b7956>${ssrInterpolate(unref(profile)?.name || "-")}</div></div><div class="field" data-v-6c7b7956><div class="field-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("common.email") || "Email")}</div><div class="field-value" data-v-6c7b7956>${ssrInterpolate(unref(profile)?.email || "-")}</div></div><div class="field" data-v-6c7b7956><div class="field-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("common.phone") || "Phone")}</div><div class="field-value" data-v-6c7b7956>${ssrInterpolate(unref(profile)?.phone || "-")}</div></div><div class="field" data-v-6c7b7956><div class="field-label" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.profile.memberSince") || "Member since")}</div><div class="field-value" data-v-6c7b7956>${ssrInterpolate(unref(profile)?.created_at ? formatDate(unref(profile).created_at) : "-")}</div></div></div>`);
        } else {
          _push(`<form class="space-y-4 text-sm" data-v-6c7b7956><div data-v-6c7b7956><label class="label" data-v-6c7b7956>${ssrInterpolate(unref(t)("common.name") || "Name")}</label><input${ssrRenderAttr("value", unref(profileForm).name)} class="input" required data-v-6c7b7956></div><div data-v-6c7b7956><label class="label" data-v-6c7b7956>${ssrInterpolate(unref(t)("common.email") || "Email")}</label><input${ssrRenderAttr("value", unref(profileForm).email)} class="input" type="email" required data-v-6c7b7956></div><div data-v-6c7b7956><label class="label" data-v-6c7b7956>${ssrInterpolate(unref(t)("common.phone") || "Phone")}</label><input${ssrRenderAttr("value", unref(profileForm).phone)} class="input" data-v-6c7b7956></div>`);
          if (unref(profileError)) {
            _push(`<p class="text-xs text-red-600" data-v-6c7b7956>${ssrInterpolate(unref(profileError))}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(profileSuccess)) {
            _push(`<p class="text-xs text-emerald-600" data-v-6c7b7956>${ssrInterpolate(unref(profileSuccess))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="btn w-full"${ssrIncludeBooleanAttr(unref(savingProfile)) ? " disabled" : ""} data-v-6c7b7956>${ssrInterpolate(unref(savingProfile) ? unref(t)("common.loading") || "Saving…" : unref(t)("common.save") || "Save Changes")}</button></form>`);
        }
        _push(`</div><div class="card" data-v-6c7b7956><h2 class="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.wallets.title") || "Service wallets")}</h2>`);
        if (!unref(wallets).length) {
          _push(`<div class="text-sm text-gray-500 italic" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.wallets.empty") || "No wallets found.")}</div>`);
        } else {
          _push(`<ul class="divide-y divide-gray-100 text-sm" data-v-6c7b7956><!--[-->`);
          ssrRenderList(unref(wallets), (w) => {
            _push(`<li class="flex items-center justify-between py-3" data-v-6c7b7956><div data-v-6c7b7956><div class="font-bold text-gray-800" data-v-6c7b7956>${ssrInterpolate(w.service_name || "Service #" + w.service_id)}</div><div class="text-xs text-gray-500" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.wallets.tokens") || "Current Balance")}</div></div><div class="text-xl font-black tabular-nums text-[#0e5e6f] bg-[#f0fdfc] px-3 py-1 rounded-lg" data-v-6c7b7956>${ssrInterpolate(w.tokens)}</div></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div></div></section>`);
      } else if (unref(activeTab) === "orders") {
        _push(`<section class="space-y-5" data-v-6c7b7956>`);
        if (unref(ordersError)) {
          _push(`<div class="alert alert--bad" data-v-6c7b7956>${ssrInterpolate(unref(ordersError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card overflow-hidden !p-0" data-v-6c7b7956><table class="w-full text-sm" data-v-6c7b7956><thead class="thead" data-v-6c7b7956><tr data-v-6c7b7956><th class="th" data-v-6c7b7956>#</th><th class="th" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.orders.date") || "Date")}</th><th class="th" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.orders.status") || "Status")}</th><th class="th" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.orders.payment") || "Payment")}</th><th class="th text-right" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.orders.total") || "Total")}</th></tr></thead><tbody data-v-6c7b7956>`);
        if (!unref(orders).length) {
          _push(`<tr data-v-6c7b7956><td colspan="5" class="px-6 py-10 text-center text-gray-500 italic" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.orders.empty") || "No orders found.")}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(orders), (o) => {
          _push(`<!--[--><tr class="tr cursor-pointer hover:bg-[#f0fdfc]/50 transition-colors" data-v-6c7b7956><td class="td font-bold text-[#0e5e6f]" data-v-6c7b7956>#${ssrInterpolate(o.id)}</td><td class="td text-gray-600" data-v-6c7b7956>${ssrInterpolate(formatDate(o.created_at))}</td><td class="td" data-v-6c7b7956><span class="${ssrRenderClass(statusBadge(o.status))}" data-v-6c7b7956>${ssrInterpolate(o.status)}</span></td><td class="td capitalize text-gray-600" data-v-6c7b7956>${ssrInterpolate(o.payment_method)}</td><td class="td text-right font-bold text-[#0e5e6f]" data-v-6c7b7956>${ssrInterpolate(formatMoney(o.subtotal))}</td></tr>`);
          if (unref(expandedOrderId) === o.id) {
            _push(`<tr class="bg-gray-50 border-b border-gray-200 shadow-inner" data-v-6c7b7956><td colspan="5" class="px-6 py-5" data-v-6c7b7956><div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.orders.items") || "Order items")}</div>`);
            if (!o.items?.length) {
              _push(`<div class="text-xs text-gray-500" data-v-6c7b7956>—</div>`);
            } else {
              _push(`<ul class="space-y-3" data-v-6c7b7956><!--[-->`);
              ssrRenderList(o.items, (it) => {
                _push(`<li class="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl p-3 shadow-sm" data-v-6c7b7956><div class="flex items-center gap-3 min-w-0" data-v-6c7b7956>`);
                if (it.image_url) {
                  _push(ssrRenderComponent(_component_NuxtImg, {
                    src: it.image_url,
                    class: "h-12 w-12 rounded-lg border border-gray-100 bg-white object-contain p-1",
                    format: "webp",
                    alt: ""
                  }, null, _parent));
                } else {
                  _push(`<!---->`);
                }
                _push(`<div class="min-w-0" data-v-6c7b7956>`);
                if (it.product_slug) {
                  _push(ssrRenderComponent(_component_NuxtLink, {
                    to: `/product/${it.product_slug}`,
                    class: "font-semibold text-[#0e5e6f] hover:text-[#3adbc4] hover:underline line-clamp-1 transition-colors"
                  }, {
                    default: withCtx((_, _push2, _parent2, _scopeId) => {
                      if (_push2) {
                        _push2(`${ssrInterpolate(it.product_name || "Product #" + it.product_id)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(it.product_name || "Product #" + it.product_id), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent));
                } else {
                  _push(`<div class="font-medium line-clamp-1" data-v-6c7b7956>${ssrInterpolate(it.product_name || "Product #" + it.product_id)}</div>`);
                }
                _push(`<div class="text-xs text-gray-500 mt-0.5" data-v-6c7b7956> Qty: <span class="font-medium" data-v-6c7b7956>${ssrInterpolate(it.qty)}</span> · Unit: <span class="font-medium" data-v-6c7b7956>${ssrInterpolate(formatMoney(it.price))}</span></div></div></div><div class="text-sm font-bold text-gray-900 tabular-nums" data-v-6c7b7956>${ssrInterpolate(formatMoney(it.line_total))}</div></li>`);
              });
              _push(`<!--]--></ul>`);
            }
            _push(`</td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></tbody></table></div>`);
        if (unref(ordersMeta).last_page > 1) {
          _push(`<div class="flex items-center justify-end gap-2 text-xs font-medium" data-v-6c7b7956><button class="pager-btn"${ssrIncludeBooleanAttr(unref(ordersMeta).current_page <= 1) ? " disabled" : ""} data-v-6c7b7956>‹ Prev</button><span class="px-2" data-v-6c7b7956>${ssrInterpolate(unref(ordersMeta).current_page)} / ${ssrInterpolate(unref(ordersMeta).last_page)}</span><button class="pager-btn"${ssrIncludeBooleanAttr(unref(ordersMeta).current_page >= unref(ordersMeta).last_page) ? " disabled" : ""} data-v-6c7b7956>Next ›</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      } else if (unref(activeTab) === "lookups") {
        _push(`<section class="space-y-4" data-v-6c7b7956>`);
        if (unref(lookupsError)) {
          _push(`<div class="alert alert--bad" data-v-6c7b7956>${ssrInterpolate(unref(lookupsError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card overflow-hidden !p-0" data-v-6c7b7956><table class="w-full text-sm" data-v-6c7b7956><thead class="thead" data-v-6c7b7956><tr data-v-6c7b7956><th class="th" data-v-6c7b7956>#</th><th class="th" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.lookups.vin") || "VIN")}</th><th class="th" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.lookups.service") || "Service")}</th><th class="th" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.lookups.status") || "Status")}</th><th class="th text-right" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.lookups.cost") || "Tokens")}</th><th class="th" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.lookups.date") || "Date")}</th></tr></thead><tbody data-v-6c7b7956>`);
        if (!unref(lookups).length) {
          _push(`<tr data-v-6c7b7956><td colspan="6" class="px-6 py-10 text-center text-gray-500 italic" data-v-6c7b7956>${ssrInterpolate(unref(t)("account.lookups.empty") || "No VIN lookups yet.")}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(lookups), (l) => {
          _push(`<tr class="tr hover:bg-gray-50 transition-colors" data-v-6c7b7956><td class="td font-bold text-[#0e5e6f]" data-v-6c7b7956>#${ssrInterpolate(l.id)}</td><td class="td font-mono text-xs sm:text-sm tracking-wide bg-gray-50 rounded px-2 py-1" data-v-6c7b7956>${ssrInterpolate(l.vin || "—")}</td><td class="td font-medium text-gray-700" data-v-6c7b7956>${ssrInterpolate(l.service_name || "Service #" + l.service_id)}</td><td class="td" data-v-6c7b7956><span class="${ssrRenderClass(statusBadge(l.status))}" data-v-6c7b7956>${ssrInterpolate(l.status)}</span></td><td class="td text-right font-bold tabular-nums text-gray-900" data-v-6c7b7956>${ssrInterpolate(l.cost_tokens)}</td><td class="td text-gray-500" data-v-6c7b7956>${ssrInterpolate(formatDate(l.created_at))}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
        if (unref(lookupsMeta).last_page > 1) {
          _push(`<div class="flex items-center justify-end gap-2 text-xs font-medium" data-v-6c7b7956><button class="pager-btn"${ssrIncludeBooleanAttr(unref(lookupsMeta).current_page <= 1) ? " disabled" : ""} data-v-6c7b7956>‹ Prev</button><span class="px-2" data-v-6c7b7956>${ssrInterpolate(unref(lookupsMeta).current_page)} / ${ssrInterpolate(unref(lookupsMeta).last_page)}</span><button class="pager-btn"${ssrIncludeBooleanAttr(unref(lookupsMeta).current_page >= unref(lookupsMeta).last_page) ? " disabled" : ""} data-v-6c7b7956>Next ›</button></div>`);
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
const account = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c7b7956"]]);

export { account as default };
//# sourceMappingURL=account-S_-GPtFU.mjs.map
