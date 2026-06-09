import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["tr", "en", "de"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  // Accept-Language tabanlı otomatik tespiti kapat — locale sinyalini IP
  // ülkesi belirler (bkz. proxy.ts geo yönlendirmesi). Böylece "/" varsayılan
  // olarak TR kalır, yönlendirme kararını biz veririz.
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
