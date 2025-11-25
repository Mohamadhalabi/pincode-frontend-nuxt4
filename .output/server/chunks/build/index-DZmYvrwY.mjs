import { _ as __nuxt_component_0 } from './nuxt-link-DhHsLoL_.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useApi } from './useApi-CfP7biv6.mjs';
import './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LookupCard",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const statusClass = computed(() => ({
      "bg-gray-100": props.item.status === "pending",
      "bg-green-100 text-green-700": props.item.status === "done",
      "bg-red-100 text-red-700": props.item.status === "failed"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card p-4 space-y-2" }, _attrs))}><div class="flex items-center justify-between"><div class="font-medium">${ssrInterpolate(__props.item.category_name)}</div><span class="${ssrRenderClass([unref(statusClass), "pill"])}">${ssrInterpolate(__props.item.status)}</span></div><div class="text-xs text-gray-500">#${ssrInterpolate(__props.item.id)} · ${ssrInterpolate(new Date(__props.item.created_at).toLocaleString())}</div>`);
      if (__props.item.result_payload) {
        _push(`<pre class="text-xs bg-gray-50 rounded-xl p-2 overflow-auto">${ssrInterpolate(JSON.stringify(__props.item.result_payload, null, 2))}</pre>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.error_message) {
        _push(`<div class="text-xs"><span class="text-red-600">Error:</span> ${ssrInterpolate(__props.item.error_message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LookupCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LookupCard = Object.assign(_sfc_main$1, { __name: "LookupCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const list = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-xl font-semibold">My Lookups</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "btn",
        to: "/lookups/new"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`New Lookup`);
          } else {
            return [
              createTextVNode("New Lookup")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(unref(list), (it) => {
        _push(ssrRenderComponent(LookupCard, {
          key: it.id,
          item: it
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lookups/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DZmYvrwY.mjs.map
