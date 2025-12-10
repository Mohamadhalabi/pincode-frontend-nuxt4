import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { a as useI18n, b as useRuntimeConfig, u as useHead } from './server.mjs';
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

const _sfc_main = {
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useI18n();
    const config = useRuntimeConfig();
    const faqItems = computed(() => [
      { q: t("pages.faq.items.i1.q"), a: t("pages.faq.items.i1.a") },
      { q: t("pages.faq.items.i2.q"), a: t("pages.faq.items.i2.a") },
      { q: t("pages.faq.items.i3.q"), a: t("pages.faq.items.i3.a") },
      { q: t("pages.faq.items.i4.q"), a: t("pages.faq.items.i4.a") },
      { q: t("pages.faq.items.i5.q"), a: t("pages.faq.items.i5.a") },
      { q: t("pages.faq.items.i6.q"), a: t("pages.faq.items.i6.a") },
      { q: t("pages.faq.items.i7.q"), a: t("pages.faq.items.i7.a") },
      { q: t("pages.faq.items.i8.q"), a: t("pages.faq.items.i8.a") }
    ]);
    const siteUrl = config.public.siteUrl || "https://pin-code.com";
    const pageUrl = computed(() => {
      const prefix = locale.value === "en" ? "" : `${locale.value}/`;
      return `${siteUrl}/${prefix}faq`;
    });
    const faqSchema = computed(() => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "url": pageUrl.value,
      "inLanguage": locale.value,
      "mainEntity": faqItems.value.map((x) => ({
        "@type": "Question",
        "name": x.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": x.a
        }
      }))
    }));
    useHead({
      title: t("pages.faq.seo.title"),
      meta: [
        { name: "description", content: t("pages.faq.seo.description") },
        { property: "og:title", content: t("pages.faq.seo.title") },
        { property: "og:description", content: t("pages.faq.seo.description") },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl.value }
      ],
      link: [
        { rel: "canonical", href: pageUrl.value }
      ],
      script: [
        {
          id: "faq-jsonld",
          type: "application/ld+json",
          innerHTML: JSON.stringify(faqSchema.value)
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        "faq-jsonld": ["innerHTML"]
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 py-10 sm:py-16" }, _attrs))}><div class="mb-10 text-center"><h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">${ssrInterpolate(_ctx.$t("pages.faq.title"))}</h1><div class="h-1.5 w-24 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mt-4 rounded-full mx-auto"></div><p class="text-gray-600 mt-4 text-lg">${ssrInterpolate(_ctx.$t("pages.faq.subtitle"))}</p></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(faqItems), (item, i) => {
        _push(`<details class="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"${ssrIncludeBooleanAttr(i === 0) ? " open" : ""}><summary class="cursor-pointer list-none flex items-center justify-between p-5 sm:p-6 hover:bg-gray-50 transition-colors"><h2 class="text-lg font-bold text-gray-900 pr-4">${ssrInterpolate(item.q)}</h2><span class="shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#f0fdfc] text-[#0e5e6f] font-bold transition-transform group-open:rotate-45 group-open:bg-[#0e5e6f] group-open:text-white"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></span></summary><div class="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/30">${ssrInterpolate(item.a)}</div></details>`);
      });
      _push(`<!--]--></div><div class="mt-10 rounded-2xl bg-[#f0fdfc] border border-[#3adbc4]/30 p-6 sm:p-8 text-center"><h3 class="text-xl font-bold text-[#0e5e6f] mb-2">${ssrInterpolate(_ctx.$t("pages.faq.help.title"))}</h3><p class="text-[#0e5e6f]/80 mb-4">${ssrInterpolate(_ctx.$t("pages.faq.help.body"))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact-us",
        class: "inline-flex items-center justify-center rounded-xl bg-white text-[#0e5e6f] border border-[#3adbc4]/50 px-6 py-2 font-bold hover:bg-[#0e5e6f] hover:text-white hover:border-transparent transition-all shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact Support `);
          } else {
            return [
              createTextVNode(" Contact Support ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=faq-JWpXwaxE.mjs.map
