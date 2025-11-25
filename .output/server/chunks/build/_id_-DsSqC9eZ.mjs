import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { defineComponent, ref, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useApi } from './useApi-CfP7biv6.mjs';
import { f as useRoute } from './server.mjs';
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

const fallback = "https://dummyimage.com/600x400/e5e7eb/111827&text=Category";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    useRoute();
    const cat = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(cat)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid md:grid-cols-3 gap-6" }, _attrs))}><div class="md:col-span-2 card overflow-hidden"><img${ssrRenderAttr("src", unref(cat).image_url || fallback)} class="w-full h-56 object-cover"><div class="p-5 space-y-4"><h1 class="text-2xl font-semibold">${ssrInterpolate(unref(cat).name)}</h1><div class="flex flex-wrap gap-2"><span class="pill bg-gray-100">Behavior: <b>${ssrInterpolate(unref(cat).behavior)}</b></span>`);
        if (unref(cat).cost_tokens) {
          _push(`<span class="pill bg-brand/10 text-brand">${ssrInterpolate(unref(cat).cost_tokens)} token(s)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><h3 class="font-medium mb-2">Required Inputs</h3><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(cat).required_inputs || [], (k) => {
          _push(`<span class="pill bg-gray-100">${ssrInterpolate(k)}</span>`);
        });
        _push(`<!--]--></div></div></div></div><div class="space-y-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "btn w-full",
          to: "/lookups/new"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Start Lookup`);
            } else {
              return [
                createTextVNode("Start Lookup")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DsSqC9eZ.mjs.map
