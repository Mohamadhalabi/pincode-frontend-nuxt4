import { _ as __nuxt_component_0$2 } from './nuxt-link-DhHsLoL_.mjs';
import { defineComponent, mergeProps, unref, mergeModels, useModel, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import AppHeader from './AppHeader-JI18PAf7.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-ChoT4sHP.mjs';
import { i as useState } from './server.mjs';
import './useCart-Djb1VdLO.mjs';
import './useAuth-CJcUDK_S.mjs';
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

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-[#F3F4F6] text-gray-700 pt-12 pb-6 mt-20 border-t border-gray-300" }, _attrs))} data-v-58756789><div class="container mx-auto px-6" data-v-58756789><div class="grid grid-cols-1 md:grid-cols-4 gap-12" data-v-58756789><div data-v-58756789><p class="text-sm mt-3" data-v-58756789> Got questions? Call or WhatsApp us </p><p class="text-lg font-semibold text-blue-600 mt-1" data-v-58756789> +971 50 6466398 </p><div class="mt-4 text-sm" data-v-58756789><p data-v-58756789><strong data-v-58756789>Contact info</strong></p><p data-v-58756789>Kia / Hyundai PIN Code</p><p data-v-58756789>Sharjah – United Arab Emirates</p><p data-v-58756789><a href="mailto:support@pin-code.com" class="hover:text-blue-600" data-v-58756789> support@pin-code.com </a></p></div><div class="flex space-x-5 mt-5 text-xl text-gray-600" data-v-58756789><a href="#" class="hover:text-blue-600" data-v-58756789><i class="ri-facebook-fill" data-v-58756789></i></a><a href="#" class="hover:text-blue-600" data-v-58756789><i class="ri-instagram-line" data-v-58756789></i></a><a href="#" class="hover:text-blue-600" data-v-58756789><i class="ri-youtube-fill" data-v-58756789></i></a><a href="#" class="hover:text-blue-600" data-v-58756789><i class="ri-whatsapp-line" data-v-58756789></i></a></div></div><div data-v-58756789><h4 class="font-semibold text-gray-900 mb-4" data-v-58756789>PIN Code</h4><ul class="space-y-3 text-sm" data-v-58756789><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/lookup",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`New VIN Lookup`);
      } else {
        return [
          createTextVNode("New VIN Lookup")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/tokens",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Buy Tokens`);
      } else {
        return [
          createTextVNode("Buy Tokens")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/faq",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`FAQ`);
      } else {
        return [
          createTextVNode("FAQ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div><div data-v-58756789><h4 class="font-semibold text-gray-900 mb-4" data-v-58756789>Services</h4><ul class="space-y-3 text-sm" data-v-58756789><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/kia-hyundai/old",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Kia / Hyundai (Old)`);
      } else {
        return [
          createTextVNode("Kia / Hyundai (Old)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/kia-hyundai/new",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Kia / Hyundai (New)`);
      } else {
        return [
          createTextVNode("Kia / Hyundai (New)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/pricing",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Pricing`);
      } else {
        return [
          createTextVNode("Pricing")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div><div data-v-58756789><h4 class="font-semibold text-gray-900 mb-4" data-v-58756789>Support</h4><ul class="space-y-3 text-sm" data-v-58756789><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/contact-us",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact Us`);
      } else {
        return [
          createTextVNode("Contact Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about-us",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About Us`);
      } else {
        return [
          createTextVNode("About Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/privacy-policy",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Privacy Policy`);
      } else {
        return [
          createTextVNode("Privacy Policy")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-58756789>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/terms-conditions",
    class: "hover:text-blue-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Terms &amp; Conditions`);
      } else {
        return [
          createTextVNode("Terms & Conditions")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="mt-10 pt-6 border-t border-gray-300 text-center text-sm text-gray-600" data-v-58756789> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Kia / Hyundai PIN Code. All Rights Reserved </div><div class="flex justify-center space-x-6 mt-4" data-v-58756789></div></div></footer>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-58756789"]]), { __name: "Footer" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AddedToast",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    img: {},
    title: {},
    sku: {}
  }, {
    "open": { type: Boolean, ...{ required: true } },
    "openModifiers": {}
  }),
  emits: ["update:open"],
  setup(__props) {
    const open = useModel(__props, "open");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      if (open.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed right-4 bottom-4 z-50 w-[320px] rounded-xl border bg-white shadow-lg p-3 flex gap-3" }, _attrs))}>`);
        if (__props.img) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: __props.img,
            class: "w-14 h-14 rounded-lg object-cover bg-gray-100",
            alt: ""
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex-1"><p class="text-sm text-gray-700"><span class="font-medium">${ssrInterpolate(__props.title)}</span>`);
        if (__props.sku) {
          _push(`<span class="text-gray-500"> · ${ssrInterpolate(__props.sku)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p><p class="text-emerald-700 text-sm mt-0.5">Added to cart</p></div><button class="text-gray-400 hover:text-gray-600">✕</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddedToast.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AddedToast = Object.assign(_sfc_main$1, { __name: "AddedToast" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useState("added-toast", () => ({
      open: false,
      img: null,
      title: "",
      sku: null
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Footer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-dvh flex flex-col bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(AppHeader, null, null, _parent));
      _push(`<main class="mx-auto w-full max-w-6xl px-4 py-6 flex-1">`);
      _push(ssrRenderComponent(AddedToast, {
        open: unref(toast).open,
        "onUpdate:open": ($event) => unref(toast).open = $event,
        img: unref(toast).img,
        title: unref(toast).title,
        sku: unref(toast).sku
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DfK3ZxL-.mjs.map
