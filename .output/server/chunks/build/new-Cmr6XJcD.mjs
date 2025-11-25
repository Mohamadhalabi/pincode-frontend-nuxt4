import { defineComponent, ref, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useApi } from './useApi-CfP7biv6.mjs';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const categories = ref([]);
    const categoryId = ref("");
    const payload = reactive({});
    const dedupeKey = ref("");
    const loading = ref(false);
    const current = computed(() => categories.value.find((c) => c.id == categoryId.value));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto space-y-6" }, _attrs))}><h1 class="text-xl font-semibold">New VIN Lookup</h1><div class="card p-5 space-y-4"><div><label class="label">Category</label><select class="input"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), "") : ssrLooseEqual(unref(categoryId), "")) ? " selected" : ""}>Select a category…</option><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), c.id) : ssrLooseEqual(unref(categoryId), c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)} (${ssrInterpolate(c.cost_tokens)} tokens) </option>`);
      });
      _push(`<!--]--></select></div>`);
      if (unref(current)) {
        _push(`<div><label class="label">Inputs</label><div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!--[-->`);
        ssrRenderList(unref(current).required_inputs || [], (k) => {
          _push(`<div><input${ssrRenderAttr("placeholder", k)}${ssrRenderAttr("value", unref(payload)[k])} class="input"></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-3"><label class="label">Dedupe key (optional)</label><input${ssrRenderAttr("value", unref(dedupeKey))} class="input" placeholder="e.g., VIN-XXXX"></div><button class="btn w-full"${ssrIncludeBooleanAttr(!unref(categoryId) || unref(loading)) ? " disabled" : ""}>`);
      if (!unref(loading)) {
        _push(`<span>Submit Lookup</span>`);
      } else {
        _push(`<span>Submitting…</span>`);
      }
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lookups/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-Cmr6XJcD.mjs.map
