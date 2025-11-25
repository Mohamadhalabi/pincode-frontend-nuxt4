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

const calculators_get = defineEventHandler((event) => {
  const { lang = "en" } = getQuery(event);
  const en = [
    { id: 101, title: "VIN \u2192 PIN (Hyundai/Kia)", description: "Fast VIN to PIN for supported models", href: "/calculators/vin-to-pin-hk" },
    { id: 102, title: "VIN \u2192 PIN (Nissan/Infiniti)", description: "Coverage for many Nissan platforms", href: "/calculators/vin-to-pin-nissan" },
    { id: 103, title: "Dump to PIN", description: "Calculate PIN from EEPROM dump", href: "/calculators/dump-to-pin" }
  ];
  const ar = [
    { id: 101, title: "VIN \u2192 PIN (\u0647\u064A\u0648\u0646\u062F\u0627\u064A/\u0643\u064A\u0627)", description: "\u062A\u062D\u0648\u064A\u0644 VIN \u0625\u0644\u0649 PIN \u0628\u0633\u0631\u0639\u0629 \u0644\u0644\u0637\u0631\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629", href: "/ar/calculators/vin-to-pin-hk" },
    { id: 102, title: "VIN \u2192 PIN (\u0646\u064A\u0633\u0627\u0646/\u0625\u0646\u0641\u064A\u0646\u064A\u062A\u064A)", description: "\u062A\u063A\u0637\u064A\u0629 \u0644\u0639\u062F\u0629 \u0645\u0646\u0635\u0627\u062A \u0645\u0646 \u0646\u064A\u0633\u0627\u0646", href: "/ar/calculators/vin-to-pin-nissan" },
    { id: 103, title: "Dump \u0625\u0644\u0649 PIN", description: "\u062D\u0633\u0627\u0628 PIN \u0645\u0646 \u062A\u0641\u0631\u064A\u063A EEPROM", href: "/ar/calculators/dump-to-pin" }
  ];
  return { items: lang === "ar" ? ar : en };
});

export { calculators_get as default };
//# sourceMappingURL=calculators.get.mjs.map
