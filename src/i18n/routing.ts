import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["tr", "en", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Accept-Language tabanlı otomatik tespiti kapat — locale sinyalini IP
  // ülkesi belirler (bkz. proxy.ts geo yönlendirmesi). Böylece "/" varsayılan
  // olarak TR kalır, yönlendirme kararını biz veririz.
  localeDetection: false,
  // next-intl'in otomatik hreflang `Link` header'ını kapat: tüm path'leri üç
  // dilde de varmış gibi gösteriyordu (örn. 301'lenen /en/guide/vpn-nedir'i
  // alternatif ilan ediyordu). hreflang, sayfa metadata'sında içerik
  // mevcudiyetine göre (bkz. i18n-paths.ts) hassas şekilde üretiliyor.
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
