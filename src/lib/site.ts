import { env } from "@/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  brand: env.NEXT_PUBLIC_SITE_BRAND,
  url: env.NEXT_PUBLIC_SITE_URL,
  defaultLocale: "tr" as const,
  locales: ["tr"] as const,
  plausibleDomain: env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || undefined,
  description: {
    tr: "Bağımsız test metodolojisine dayalı, dürüst VPN incelemeleri ve karşılaştırmaları. Gizlilik, streaming, seyahat ve günlük güvenlik için doğru VPN'i bul.",
  },
  author: {
    name: "vpncompaire Editör Ekibi",
    url: "/hakkimizda",
  },
  social: {
    twitter: "",
    github: "",
  },
  ogImage: "/og-default.png",
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
