import { d as defineEventHandler, u as useRuntimeConfig, g as getQuery, $ as $fetch } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

const serviceCategories_get = defineEventHandler(async (event) => {
  const apiBase = useRuntimeConfig().apiBase;
  const query = getQuery(event);
  return await $fetch(`${apiBase}/api/service-categories`, { query });
});

export { serviceCategories_get as default };
//# sourceMappingURL=service-categories.get.mjs.map
