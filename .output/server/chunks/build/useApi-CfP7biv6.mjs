import { $ as $fetch } from '../nitro/nitro.mjs';
import { a as useI18n, b as useRuntimeConfig } from './server.mjs';

const useApi = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const client = $fetch.create({
    baseURL: config.public.apiBase,
    // e.g. '/api' via proxy
    headers: { Accept: "application/json" },
    retry: 1,
    onResponseError(ctx) {
      console.error("[API ERROR]", ctx.response.status, ctx.request, ctx.response._data);
    }
  });
  const get = (url, opts = {}) => {
    const q = { ...opts.query || {}, lang: locale.value };
    return client(url, { method: "GET", ...opts, query: q });
  };
  return { get, client };
};

export { useApi as u };
//# sourceMappingURL=useApi-CfP7biv6.mjs.map
