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

const hero_get = defineEventHandler((event) => {
  const { lang = "en" } = getQuery(event);
  const map = {
    en: { headline: "Why choose our PIN Code platform?", image: "/hero-fallback.jpg" },
    ar: { headline: "\u0644\u0645\u0627\u0630\u0627 \u062A\u062E\u062A\u0627\u0631 \u0645\u0646\u0635\u0651\u0629 PIN Code\u061F", image: "/hero-fallback.jpg" }
  };
  return map[lang] || map.en;
});

export { hero_get as default };
//# sourceMappingURL=hero.get.mjs.map
