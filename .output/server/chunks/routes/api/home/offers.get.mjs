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

const offers_get = defineEventHandler((event) => {
  const { lang = "en" } = getQuery(event);
  const en = [
    {
      id: 1,
      title: "BCM to PIN Calculator",
      badge: "-68% Discount",
      price: 48,
      compareAt: 150,
      bullets: ["Fully Unlocked", "No HWID/dongle", "Free Unlimited 24/7"],
      href: "/offers/bcm"
    },
    {
      id: 2,
      title: "FDOK/DAS Calculator",
      badge: "-70% Discount",
      price: 175,
      compareAt: 580,
      bullets: ["Fully Unlocked", "No HWID/dongle", "Free Unlimited 24/7"],
      href: "/offers/fdok"
    },
    {
      id: 3,
      title: "Carrier Repair Tool",
      badge: "-72% Discount",
      price: 85,
      compareAt: 300,
      bullets: ["Fully Unlocked", "No HWID/dongle", "Free Unlimited 24/7"],
      href: "/offers/carrier"
    }
  ];
  const ar = [
    {
      id: 1,
      title: "\u062D\u0627\u0633\u0628\u0629 BCM \u0625\u0644\u0649 PIN",
      badge: "\u062E\u0635\u0645 %68-",
      price: 48,
      compareAt: 150,
      bullets: ["\u0645\u0641\u062A\u0648\u062D\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644", "\u0628\u062F\u0648\u0646 HWID/\u062F\u0627\u0646\u062C\u0644", "\u063A\u064A\u0631 \u0645\u062D\u062F\u0648\u062F 24/7"],
      href: "/ar/offers/bcm"
    },
    {
      id: 2,
      title: "\u062D\u0627\u0633\u0628\u0629 FDOK/DAS",
      badge: "\u062E\u0635\u0645 %70-",
      price: 175,
      compareAt: 580,
      bullets: ["\u0645\u0641\u062A\u0648\u062D\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644", "\u0628\u062F\u0648\u0646 HWID/\u062F\u0627\u0646\u062C\u0644", "\u063A\u064A\u0631 \u0645\u062D\u062F\u0648\u062F 24/7"],
      href: "/ar/offers/fdok"
    },
    {
      id: 3,
      title: "\u0623\u062F\u0627\u0629 \u0625\u0635\u0644\u0627\u062D Carrier",
      badge: "\u062E\u0635\u0645 %72-",
      price: 85,
      compareAt: 300,
      bullets: ["\u0645\u0641\u062A\u0648\u062D\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644", "\u0628\u062F\u0648\u0646 HWID/\u062F\u0627\u0646\u062C\u0644", "\u063A\u064A\u0631 \u0645\u062D\u062F\u0648\u062F 24/7"],
      href: "/ar/offers/carrier"
    }
  ];
  return { items: lang === "ar" ? ar : en };
});

export { offers_get as default };
//# sourceMappingURL=offers.get.mjs.map
