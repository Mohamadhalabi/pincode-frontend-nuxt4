import { computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "privacy-policy",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useI18n();
    const config = useRuntimeConfig();
    const siteUrl = config.public.siteUrl || "https://pin-code.com";
    const pageUrl = computed(() => {
      const prefix = locale.value === "en" ? "" : `${locale.value}/`;
      return `${siteUrl}/${prefix}privacy-policy`;
    });
    const privacySchema = computed(() => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": t("pages.privacy.seo.title"),
      "description": t("pages.privacy.seo.description"),
      "url": pageUrl.value,
      "inLanguage": locale.value,
      "isPartOf": {
        "@type": "WebSite",
        "name": "PIN Code Platform",
        "url": siteUrl
      }
    }));
    useHead({
      title: t("pages.privacy.seo.title"),
      meta: [
        { name: "description", content: t("pages.privacy.seo.description") },
        { property: "og:title", content: t("pages.privacy.seo.title") },
        { property: "og:description", content: t("pages.privacy.seo.description") },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl.value }
      ],
      link: [
        { rel: "canonical", href: pageUrl.value }
      ],
      script: [
        {
          id: "privacy-jsonld",
          type: "application/ld+json",
          innerHTML: JSON.stringify(privacySchema.value)
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        "privacy-jsonld": ["innerHTML"]
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 py-10" }, _attrs))}><h1 class="text-3xl font-bold tracking-tight mb-3">${ssrInterpolate(_ctx.$t("pages.privacy.title"))}</h1><p class="text-gray-600 mb-8">${ssrInterpolate(_ctx.$t("pages.privacy.subtitle"))}</p><div class="bg-white rounded-2xl shadow-sm border p-6 space-y-6 text-gray-700 leading-7"><section><h2 class="text-xl font-semibold mb-2">${ssrInterpolate(_ctx.$t("pages.privacy.sections.s1.title"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.privacy.sections.s1.body"))}</p></section><section><h2 class="text-xl font-semibold mb-2">${ssrInterpolate(_ctx.$t("pages.privacy.sections.s2.title"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.privacy.sections.s2.body"))}</p></section><section><h2 class="text-xl font-semibold mb-2">${ssrInterpolate(_ctx.$t("pages.privacy.sections.s3.title"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.privacy.sections.s3.body"))}</p></section><section><h2 class="text-xl font-semibold mb-2">${ssrInterpolate(_ctx.$t("pages.privacy.sections.s4.title"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.privacy.sections.s4.body"))}</p></section><section><h2 class="text-xl font-semibold mb-2">${ssrInterpolate(_ctx.$t("pages.privacy.sections.s5.title"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.privacy.sections.s5.body"))}</p></section></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-policy-DmHPcmHT.mjs.map
