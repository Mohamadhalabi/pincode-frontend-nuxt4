import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

const tokens_get = defineEventHandler((event) => {
  const { lang = "en" } = getQuery(event);
  const map = {
    en: { bestPack: { title: "100 Tokens", priceFormatted: "$49.00" } },
    ar: { bestPack: { title: "100 \u062A\u0648\u0643\u064A\u0646", priceFormatted: "49.00$" } }
  };
  return map[lang] || map.en;
});

export { tokens_get as default };
//# sourceMappingURL=tokens.get.mjs.map
