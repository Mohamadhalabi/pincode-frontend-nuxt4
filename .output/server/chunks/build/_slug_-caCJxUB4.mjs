import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-JZu4Om2_.mjs';
import { defineComponent, ref, computed, withAsyncContext, watch, reactive, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { f as useRoute, a as useI18n, b as useRuntimeConfig, u as useHead, e as useRequestEvent } from './server.mjs';
import { a as useApi, u as useAddedToast, b as useAsyncData, r as refreshNuxtData } from './useApi-KWNj2I5b.mjs';
import { u as useCart } from './useCart-Djb1VdLO.mjs';
import { C as getRequestURL } from '../nitro/nitro.mjs';
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import 'perfect-debounce';

function useRequestURL(opts) {
  {
    return getRequestURL(useRequestEvent(), opts);
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { t, locale, locales } = useI18n();
    const { get } = useApi();
    useCart();
    useAddedToast();
    const qty = ref(1);
    const key = computed(() => String(route.params.slug || ""));
    const { data: pack, pending, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      () => `pack:${key.value}:${locale.value}`,
      () => get(`/token-packs/${key.value}`),
      { server: true, immediate: true }
    )), __temp = await __temp, __restore(), __temp);
    watch(locale, () => {
      refreshNuxtData(`pack:${key.value}:${locale.value}`);
    });
    const packCategory = computed(
      () => pack.value?.category ?? (pack.value?.service_category_id ? { id: pack.value.service_category_id, name: t("product.category"), slug: void 0 } : null)
    );
    const waForm = reactive({});
    const isWaFormValid = computed(() => {
      if (!pack.value?.order_by_whatsapp) return true;
      const req = pack.value.category?.required_inputs;
      if (!req || !req.length) return true;
      return req.every((field) => {
        const key2 = typeof field === "string" ? field : field.name;
        const val = waForm[key2];
        return val && val.trim().length > 0;
      });
    });
    function normalizedTiers(p) {
      return (p.pricing_tiers || []).slice().sort((a, b) => (a.min_qty || 1) - (b.min_qty || 1));
    }
    function activeTierIndex(p, qtyNum) {
      const q = Math.max(1, Number(qtyNum || 1));
      const tiers = normalizedTiers(p);
      for (let i = 0; i < tiers.length; i++) {
        const tr = tiers[i];
        const max = tr.max_qty ?? Number.POSITIVE_INFINITY;
        if (q >= (tr.min_qty || 1) && q <= max) return i;
      }
      return -1;
    }
    function unitPriceFor(qty2, p) {
      const q = Math.max(1, Number(qty2 || 1));
      const tiers = normalizedTiers(p);
      for (const tr of tiers) {
        const max = tr.max_qty ?? Number.POSITIVE_INFINITY;
        if (q >= (tr.min_qty || 1) && q <= max) {
          return Number((tr.sale_price_usd ?? tr.price_usd) || 0);
        }
      }
      return Number((p.sale_price_usd ?? p.price_usd) || 0);
    }
    const effectivePrice = computed(() => pack.value ? unitPriceFor(qty.value, pack.value) : 0);
    const strikePrice = computed(() => {
      if (!pack.value) return 0;
      const q = Math.max(1, Number(qty.value || 1));
      const tiers = normalizedTiers(pack.value);
      for (const tr of tiers) {
        const max = tr.max_qty ?? Number.POSITIVE_INFINITY;
        if (q >= (tr.min_qty || 1) && q <= max) {
          return Number(tr.sale_price_usd ? tr.price_usd : 0);
        }
      }
      return Number(pack.value.sale_price_usd ? pack.value.price_usd : 0);
    });
    const showStrike = computed(() => Number(strikePrice.value) > 0);
    const tabs = computed(() => [
      { key: "desc", label: t("common.description") || "Description" },
      { key: "faq", label: t("common.faq") || "FAQ" },
      { key: "contact", label: t("common.contactUs") || "Contact Us" }
    ]);
    const activeTab = ref("desc");
    const contact = reactive({ name: "", email: "", message: "" });
    const sending = ref(false);
    const sentOk = ref(false);
    const sendErr = ref(null);
    const errMsg = computed(() => {
      const e = error.value;
      return e?.statusMessage || e?.message || "";
    });
    const zoomOpen = ref(false);
    const related = ref([]);
    const relLoading = ref(false);
    const relTried = ref(false);
    ref(null);
    const config = useRuntimeConfig();
    const reqUrl = useRequestURL();
    const baseUrl = computed(() => {
      const fromEnv = config.public?.siteUrl;
      if (fromEnv) return String(fromEnv).replace(/\/+$/, "");
      if (reqUrl?.origin) return reqUrl.origin;
      return "";
    });
    const cleanText = (html) => (html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const pagePath = computed(() => `/product/${pack.value?.slug ?? key.value}`);
    const canonicalUrl = computed(() => `${baseUrl.value}${pagePath.value}`);
    const seoTitle = computed(
      () => pack.value?.seo_title?.trim() || pack.value?.name || t("seo.title") || "PIN Code Product"
    );
    const seoDescription = computed(
      () => pack.value?.seo_description?.trim() || cleanText(pack.value?.description).slice(0, 160) || t("seo.description") || "Professional Kia / Hyundai PIN code service."
    );
    const seoImage = computed(() => {
      const img = pack.value?.image_url || config.public?.ogImage;
      if (!img) return void 0;
      return img.startsWith("http") ? img : `${baseUrl.value}${img}`;
    });
    const alternates = computed(() => {
      const slug = pack.value?.slug ?? key.value;
      const all = (locales.value || []).map((l) => l.code || l);
      const defaultCode = locales.value?.find?.((x) => x.default)?.code || all[0];
      return all.map((code) => {
        const prefix = code === defaultCode ? "" : `/${code}`;
        return { hreflang: code, href: `${baseUrl.value}${prefix}/product/${slug}` };
      });
    });
    useHead(() => {
      const title = seoTitle.value;
      const desc = seoDescription.value;
      const img = seoImage.value;
      const bcItems = [
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl.value}/` },
        { "@type": "ListItem", position: 2, name: t("nav.categories") || "Categories", item: `${baseUrl.value}/categories` }
      ];
      if (packCategory.value) {
        bcItems.push({
          "@type": "ListItem",
          position: 3,
          name: packCategory.value.name,
          item: `${baseUrl.value}/categories/${packCategory.value.slug ?? packCategory.value.id}`
        });
      }
      bcItems.push({
        "@type": "ListItem",
        position: bcItems.length + 1,
        name: pack.value?.name || "",
        item: canonicalUrl.value
      });
      const ldBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: bcItems
      };
      const price = Number(effectivePrice.value ?? pack.value?.price_usd ?? 0).toFixed(2);
      const availability = (pack.value?.stock_status ?? "instock") === "outofstock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";
      const ldProduct = pack.value ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: pack.value.name,
        image: img ? [img] : void 0,
        description: cleanText(pack.value.description),
        category: packCategory.value?.name,
        sku: pack.value.sku || pack.value.slug || String(pack.value.id),
        brand: {
          "@type": "Brand",
          name: pack.value.brand_name || config.public?.siteName || "Brand"
        },
        offers: {
          "@type": "Offer",
          url: canonicalUrl.value,
          priceCurrency: "USD",
          price,
          availability,
          itemCondition: "https://schema.org/NewCondition"
        }
      } : null;
      return {
        title,
        link: [
          { rel: "canonical", href: canonicalUrl.value },
          ...alternates.value.map((a) => ({ rel: "alternate", hreflang: a.hreflang, href: a.href })),
          { rel: "alternate", hreflang: "x-default", href: canonicalUrl.value }
        ],
        meta: [
          { name: "description", content: desc },
          { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
          // OG
          { property: "og:title", content: title },
          { property: "og:description", content: desc },
          { property: "og:type", content: "product" },
          { property: "og:url", content: canonicalUrl.value },
          ...img ? [{ property: "og:image", content: img }] : [],
          ...img ? [{ property: "og:image:secure_url", content: img }] : [],
          { property: "og:locale", content: locale.value },
          ...config.public?.siteName ? [{ property: "og:site_name", content: config.public.siteName }] : [],
          // Twitter
          { name: "twitter:card", content: img ? "summary_large_image" : "summary" },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: desc },
          ...img ? [{ name: "twitter:image", content: img }] : []
        ],
        script: [
          {
            id: "ld-breadcrumb",
            type: "application/ld+json",
            innerHTML: JSON.stringify(ldBreadcrumb)
          },
          ...ldProduct ? [{
            id: "ld-product",
            type: "application/ld+json",
            innerHTML: JSON.stringify(ldProduct)
          }] : []
        ],
        __dangerouslyDisableSanitizersByTagID: {
          "ld-breadcrumb": ["innerHTML"],
          "ld-product": ["innerHTML"]
        }
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8" }, _attrs))}>`);
      if (!unref(pending)) {
        _push(`<nav class="mb-4 sm:mb-6" aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-1 text-sm text-gray-600"><li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-[#0e5e6f] hover:underline transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("common.home") || "Home")}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("common.home") || "Home"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="px-1 text-gray-400">/</li><li class="text-gray-900 font-medium truncate max-w-[60%] sm:max-w-none">${ssrInterpolate(unref(pack)?.name)}</li></ol></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pending)) {
        _push(`<div class="grid gap-6 md:gap-8 md:grid-cols-2"><div class="h-[320px] rounded-2xl bg-gray-100 animate-pulse"></div><div class="space-y-4"><div class="h-10 w-4/5 bg-gray-100 rounded animate-pulse"></div><div class="h-6 w-2/5 bg-gray-100 rounded animate-pulse"></div><div class="h-12 w-40 bg-gray-100 rounded animate-pulse"></div><div class="h-24 bg-gray-100 rounded animate-pulse"></div></div></div>`);
      } else if (unref(errMsg)) {
        _push(`<div class="text-red-600 text-sm">${ssrInterpolate(unref(errMsg))}</div>`);
      } else if (unref(pack)) {
        _push(`<div class="grid gap-6 md:gap-8 md:grid-cols-2"><div class="space-y-3"><button type="button" class="block w-full text-left group" aria-label="Open image">`);
        if (unref(pack).image_url) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(pack).image_url,
            format: "webp",
            modifiers: { fit: "contain", background: "white" },
            class: "w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm group-hover:shadow-md transition duration-300 group-hover:border-[#3adbc4]/50",
            alt: ""
          }, null, _parent));
        } else {
          _push(`<div class="w-full rounded-2xl border bg-gray-50 grid place-items-center text-gray-400 h-72">${ssrInterpolate(_ctx.$t("common.noImage") || "No image")}</div>`);
        }
        _push(`</button></div><aside class="space-y-6 lg:space-y-8 lg:sticky lg:top-24 self-start"><header class="space-y-3"><h1 class="text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900">${ssrInterpolate(unref(pack).name)}</h1><div class="flex flex-wrap items-center gap-2"><span class="badge badge-tokens">${ssrInterpolate(unref(pack).tokens)} ${ssrInterpolate(_ctx.$t("tokens") || "tokens")}</span>`);
        if (unref(pack).sku) {
          _push(`<span class="badge badge-sku"> SKU: ${ssrInterpolate(unref(pack).sku)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(packCategory)) {
          _push(`<span${ssrRenderAttr("to", `/categories/${unref(packCategory).slug ?? unref(packCategory).id}`)} class="badge badge-cat transition">${ssrInterpolate(unref(packCategory).name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></header><div class="py-2">`);
        if (unref(showStrike)) {
          _push(`<div class="flex items-end gap-3"><div class="text-4xl font-black text-[#e63946] tracking-tight leading-none"> $${ssrInterpolate(Number(unref(effectivePrice)).toFixed(2))}</div><div class="text-xl text-gray-400 line-through leading-none pb-1"> $${ssrInterpolate(Number(unref(strikePrice)).toFixed(2))}</div></div>`);
        } else {
          _push(`<div class="text-4xl font-black text-[#0e5e6f] tracking-tight leading-none"> $${ssrInterpolate(Number(unref(effectivePrice)).toFixed(2))}</div>`);
        }
        _push(`</div><div class="space-y-6"><div class="qty-control max-w-[140px]"><button type="button" class="qty-btn" aria-label="Decrease"> – </button><input${ssrRenderAttr("value", unref(qty))} type="number" min="1" class="qty-input"><button type="button" class="qty-btn" aria-label="Increase"> + </button></div>`);
        if (unref(pack).order_by_whatsapp) {
          _push(`<div class="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4">`);
          if (unref(pack).category?.required_inputs?.length) {
            _push(`<!--[--><h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">${ssrInterpolate(_ctx.$t("common.required_info") || "Required Information")}</h3><!--[-->`);
            ssrRenderList(unref(pack).category.required_inputs, (field, index) => {
              _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">${ssrInterpolate(typeof field === "string" ? field : field.label || field.name)} <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(waForm)[typeof field === "string" ? field : field.name])} type="text" class="input w-full bg-white"${ssrRenderAttr("placeholder", typeof field === "string" ? "" : field.placeholder || "")}></div>`);
            });
            _push(`<!--]--><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button style="${ssrRenderStyle({ "background-color": "#25D366" })}"${ssrIncludeBooleanAttr(!unref(isWaFormValid)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": !unref(isWaFormValid) }, "btn w-full bg-[#25D366] hover:bg-[#128C7E] border-none text-white !bg-none"])}"><svg class="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg> ${ssrInterpolate(_ctx.$t("btn.orderWhatsApp") || "Order on WhatsApp")}</button>`);
          if (!unref(isWaFormValid)) {
            _push(`<p class="text-xs text-red-500 text-center"> * ${ssrInterpolate(_ctx.$t("msg.fillRequired") || "Please fill all required fields.")}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<button class="btn w-full sm:w-auto">${ssrInterpolate(_ctx.$t("btn.addToCart") || "Add to Cart")}</button>`);
        }
        _push(`</div>`);
        if (unref(pack)?.pricing_tiers?.length) {
          _push(`<div class="tier-wrap"><table class="tier-table"><thead><tr><th class="${ssrRenderClass([unref(locale) === "ar" ? "text-right" : "text-left", "bg-gray-50 text-gray-500"])}">${ssrInterpolate(_ctx.$t("common.quantity") || "Quantity")}</th><th class="text-right bg-gray-50 text-gray-500">${ssrInterpolate(_ctx.$t("common.price") || "Price")}</th></tr></thead><tbody><!--[-->`);
          ssrRenderList(normalizedTiers(unref(pack)), (r, i) => {
            _push(`<tr class="${ssrRenderClass(i === activeTierIndex(unref(pack), unref(qty)) ? "tier-row--active" : "hover:bg-gray-50 transition-colors")}"><td>`);
            if (r.max_qty) {
              _push(`<span>${ssrInterpolate(r.min_qty)}–${ssrInterpolate(r.max_qty)}</span>`);
            } else {
              _push(`<span>${ssrInterpolate(r.min_qty)}+</span>`);
            }
            _push(`</td><td class="text-right">`);
            if (r.sale_price_usd) {
              _push(`<!--[--><span class="text-[#e63946] font-bold"> $${ssrInterpolate(Number(r.sale_price_usd).toFixed(2))}</span><span class="text-gray-400 line-through ml-1 text-xs"> $${ssrInterpolate(Number(r.price_usd).toFixed(2))}</span><!--]-->`);
            } else {
              _push(`<span class="text-gray-900 font-semibold"> $${ssrInterpolate(Number(r.price_usd).toFixed(2))}</span>`);
            }
            _push(`</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</aside></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pack)) {
        _push(`<div class="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"><div class="flex flex-wrap gap-2 border-b border-gray-100 px-3 sm:px-6 pt-2 sm:pt-3 bg-gray-50/50"><!--[-->`);
        ssrRenderList(unref(tabs), (tab) => {
          _push(`<button type="button" class="${ssrRenderClass([unref(activeTab) === tab.key ? "bg-white border-b-2 border-[#3adbc4] text-[#0e5e6f] font-bold -mb-px shadow-sm" : "text-gray-500 hover:text-[#0e5e6f] hover:bg-white/50", "px-4 py-3 rounded-t-xl text-sm sm:text-base transition-all focus:outline-none"])}">${ssrInterpolate(tab.label)}</button>`);
        });
        _push(`<!--]--></div><div class="p-6 sm:p-8">`);
        if (unref(activeTab) === "desc") {
          _push(`<section>`);
          if (unref(pack).description) {
            _push(`<div class="prose max-w-none text-gray-700"><div>${unref(pack).description ?? ""}</div></div>`);
          } else {
            _push(`<p class="text-sm text-gray-500 italic">${ssrInterpolate(_ctx.$t("common.noDescription") || "No description available.")}</p>`);
          }
          _push(`</section>`);
        } else if (unref(activeTab) === "faq") {
          _push(`<section>`);
          if (unref(pack).faq) {
            _push(`<div class="prose max-w-none text-gray-700">${unref(pack).faq ?? ""}</div>`);
          } else {
            _push(`<p class="text-sm text-gray-500 italic">${ssrInterpolate(_ctx.$t("common.noFaq") || "No FAQ available.")}</p>`);
          }
          _push(`</section>`);
        } else {
          _push(`<section><form class="space-y-5 max-w-2xl"><div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium mb-1.5 text-gray-700">${ssrInterpolate(_ctx.$t("common.name") || "Name")}</label><input${ssrRenderAttr("value", unref(contact).name)} type="text" required class="input"></div><div><label class="block text-sm font-medium mb-1.5 text-gray-700">${ssrInterpolate(_ctx.$t("common.email") || "Email")}</label><input${ssrRenderAttr("value", unref(contact).email)} type="email" required class="input"></div></div><div><label class="block text-sm font-medium mb-1.5 text-gray-700">${ssrInterpolate(_ctx.$t("common.message") || "Message")}</label><textarea rows="5" required class="input resize-y"${ssrRenderAttr("placeholder", _ctx.$t("common.contactPlaceholder") || "How can we help?")}>${ssrInterpolate(unref(contact).message)}</textarea></div><button class="btn px-8"${ssrIncludeBooleanAttr(unref(sending)) ? " disabled" : ""}>`);
          if (!unref(sending)) {
            _push(`<span>${ssrInterpolate(_ctx.$t("common.send") || "Send Message")}</span>`);
          } else {
            _push(`<span>${ssrInterpolate(_ctx.$t("common.sending") || "Sending…")}</span>`);
          }
          _push(`</button>`);
          if (unref(sentOk)) {
            _push(`<p class="text-[#0e5e6f] font-medium text-sm mt-3 flex items-center gap-2"><span class="text-[#3adbc4] text-lg">✔</span> ${ssrInterpolate(_ctx.$t("common.sentThanks") || "Thanks! We will reply shortly.")}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(sendErr)) {
            _push(`<p class="text-red-600 text-sm mt-3">${ssrInterpolate(unref(sendErr))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</form></section>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pack)) {
        _push(`<section class="mt-12 border-t border-gray-100 pt-8"><h2 class="text-xl sm:text-2xl font-bold mb-6 text-gray-900">${ssrInterpolate(_ctx.$t("product.related") || "Related Token Packs")}</h2>`);
        if (unref(relLoading)) {
          _push(`<div class="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"><!--[-->`);
          ssrRenderList(4, (i) => {
            _push(`<div class="h-64 rounded-2xl bg-gray-100 animate-pulse"></div>`);
          });
          _push(`<!--]--></div>`);
        } else if (unref(related).length) {
          _push(`<div class="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"><!--[-->`);
          ssrRenderList(unref(related), (r) => {
            _push(`<article class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#3adbc4]/40 transition-all duration-300 overflow-hidden group">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product/${r.slug}`,
              class: "block relative"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (r.image_url) {
                    _push2(ssrRenderComponent(_component_NuxtImg, {
                      src: r.image_url,
                      format: "webp",
                      modifiers: { fit: "contain", background: "white" },
                      class: "w-full bg-white p-4 aspect-[4/3] object-contain group-hover:scale-105 transition-transform duration-300",
                      alt: ""
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<div class="w-full h-40 grid place-items-center text-gray-400 bg-gray-50"${_scopeId}>—</div>`);
                  }
                } else {
                  return [
                    r.image_url ? (openBlock(), createBlock(_component_NuxtImg, {
                      key: 0,
                      src: r.image_url,
                      format: "webp",
                      modifiers: { fit: "contain", background: "white" },
                      class: "w-full bg-white p-4 aspect-[4/3] object-contain group-hover:scale-105 transition-transform duration-300",
                      alt: ""
                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "w-full h-40 grid place-items-center text-gray-400 bg-gray-50"
                    }, "—"))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="p-4 space-y-2 border-t border-gray-50">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/product/${r.slug}`,
              class: "block font-bold leading-tight hover:text-[#0e5e6f] transition-colors line-clamp-2 text-gray-900"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(r.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(r.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="text-lg font-bold">`);
            if (r.sale_price_usd && !r.pricing_tiers?.length) {
              _push(`<!--[--><span class="text-[#e63946]">$${ssrInterpolate(Number(r.sale_price_usd).toFixed(2))}</span><span class="text-gray-400 line-through ml-1 text-sm">$${ssrInterpolate(Number(r.price_usd).toFixed(2))}</span><!--]-->`);
            } else {
              _push(`<span class="text-[#0e5e6f]">$${ssrInterpolate(Number(r.price_usd).toFixed(2))}</span>`);
            }
            _push(`</div><button class="btn w-full mt-2 text-sm py-2">${ssrInterpolate(_ctx.$t("btn.addToCart") || "Add to Cart")}</button></div></article>`);
          });
          _push(`<!--]--></div>`);
        } else if (unref(relTried)) {
          _push(`<p class="text-sm text-gray-500 italic">${ssrInterpolate(_ctx.$t("product.noRelated") || "No related packs found.")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(zoomOpen) && unref(pack)?.image_url) {
        _push(`<div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 grid place-items-center p-4"><button class="absolute top-4 right-4 text-white hover:text-[#3adbc4] transition text-4xl leading-none">×</button>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(pack).image_url,
          format: "webp",
          class: "w-full lg:w-3/5 rounded-2xl max-w-[800px] bg-white p-4 shadow-2xl",
          alt: ""
        }, null, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-caCJxUB4.mjs.map
