import { reactive, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "contact-us",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useI18n();
    const config = useRuntimeConfig();
    const form = reactive({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const loading = ref(false);
    const success = ref(false);
    const siteUrl = config.public.siteUrl || "https://pin-code.com";
    const pageUrl = computed(() => {
      const prefix = locale.value === "en" ? "" : `${locale.value}/`;
      return `${siteUrl}/${prefix}contact-us`;
    });
    const contactSchema = computed(() => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": t("pages.contact.seo.title"),
      "description": t("pages.contact.seo.description"),
      "url": pageUrl.value,
      "inLanguage": locale.value,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@pin-code.com",
        "telephone": "+971504429045",
        "availableLanguage": ["en", "tr", "ar"]
      }
    }));
    useHead({
      title: t("pages.contact.seo.title"),
      meta: [
        { name: "description", content: t("pages.contact.seo.description") },
        { property: "og:title", content: t("pages.contact.seo.title") },
        { property: "og:description", content: t("pages.contact.seo.description") },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl.value }
      ],
      link: [
        { rel: "canonical", href: pageUrl.value }
      ],
      script: [
        {
          id: "contact-jsonld",
          type: "application/ld+json",
          innerHTML: JSON.stringify(contactSchema.value)
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        "contact-jsonld": ["innerHTML"]
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 py-10" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold tracking-tight">${ssrInterpolate(_ctx.$t("pages.contact.title"))}</h1><p class="text-gray-600 mt-2">${ssrInterpolate(_ctx.$t("pages.contact.subtitle"))}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white rounded-2xl shadow-sm border p-6"><h2 class="text-xl font-semibold mb-4">${ssrInterpolate(_ctx.$t("pages.contact.form.title"))}</h2><form class="space-y-4"><div><label class="block text-sm font-medium mb-1">${ssrInterpolate(_ctx.$t("pages.contact.form.name"))}</label><input${ssrRenderAttr("value", form.name)} type="text" class="w-full rounded-xl border px-3 py-2"${ssrRenderAttr("placeholder", _ctx.$t("pages.contact.form.name_ph"))} required></div><div><label class="block text-sm font-medium mb-1">${ssrInterpolate(_ctx.$t("pages.contact.form.email"))}</label><input${ssrRenderAttr("value", form.email)} type="email" class="w-full rounded-xl border px-3 py-2"${ssrRenderAttr("placeholder", _ctx.$t("pages.contact.form.email_ph"))} required></div><div><label class="block text-sm font-medium mb-1">${ssrInterpolate(_ctx.$t("pages.contact.form.subject"))}</label><input${ssrRenderAttr("value", form.subject)} type="text" class="w-full rounded-xl border px-3 py-2"${ssrRenderAttr("placeholder", _ctx.$t("pages.contact.form.subject_ph"))} required></div><div><label class="block text-sm font-medium mb-1">${ssrInterpolate(_ctx.$t("pages.contact.form.message"))}</label><textarea rows="5" class="w-full rounded-xl border px-3 py-2"${ssrRenderAttr("placeholder", _ctx.$t("pages.contact.form.message_ph"))} required>${ssrInterpolate(form.message)}</textarea></div><button type="submit" class="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-2 font-semibold transition"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>${ssrInterpolate(loading.value ? _ctx.$t("pages.contact.form.sending") : _ctx.$t("pages.contact.form.send"))}</button>`);
      if (success.value) {
        _push(`<p class="text-green-600 text-sm mt-2">${ssrInterpolate(_ctx.$t("pages.contact.form.success"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div><div class="bg-white rounded-2xl shadow-sm border p-6 space-y-5"><h2 class="text-xl font-semibold">${ssrInterpolate(_ctx.$t("pages.contact.info.title"))}</h2><div class="space-y-3 text-gray-700"><div><div class="text-sm text-gray-500">${ssrInterpolate(_ctx.$t("pages.contact.info.email_label"))}</div><div class="font-medium">support@pin-code.com</div></div><div><div class="text-sm text-gray-500">${ssrInterpolate(_ctx.$t("pages.contact.info.whatsapp_label"))}</div><div class="font-medium">+971 50 442 9045</div></div><div><div class="text-sm text-gray-500">${ssrInterpolate(_ctx.$t("pages.contact.info.hours_label"))}</div><div class="font-medium">${ssrInterpolate(_ctx.$t("pages.contact.info.hours_value"))}</div></div></div><div class="rounded-xl bg-orange-50 border border-orange-100 p-4 text-sm text-orange-900">${ssrInterpolate(_ctx.$t("pages.contact.info.note"))}</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-us-DXNUar4B.mjs.map
