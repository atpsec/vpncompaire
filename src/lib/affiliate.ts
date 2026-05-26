import { env } from "@/env";

export type AffiliateLink = {
  slug: string;
  brand: string;
  /** Public brand URL — fallback when no env-based affiliate URL is set */
  url: string;
  /** True when the brand has an affiliate program we can route to */
  hasProgram: boolean;
  /** Resolved tracking URL (env-driven), or undefined if affiliate is not yet wired */
  trackingUrl?: string;
};

/**
 * Affiliate hedef URL'lerin host allowlist'i.
 *
 * Bu liste iki kaynaktan beslenir:
 *   1) Brand'in kendi domain'i (her zaman izinli — utm_* fallback için)
 *   2) Env'den okunan affiliate tracking URL'sinin host'u (varsa)
 *
 * Allowlist, /go/[slug] handler'ında open-redirect saldırılarına karşı
 * son savunma hattıdır. Yeni bir affiliate sağlayıcı eklerken hem
 * affiliate.ts'in tablosuna hem (env URL kullanılmıyorsa) `STATIC_ALLOWED_HOSTS`
 * setine eklemek gerekir.
 */
const STATIC_ALLOWED_HOSTS: ReadonlySet<string> = new Set([
  "nordvpn.com",
  "surfshark.com",
  "www.expressvpn.com",
  "protonvpn.com",
  "www.privateinternetaccess.com",
  "www.cyberghostvpn.com",
  "mullvad.net",
  "www.ipvanish.com",
  "windscribe.com",
  "www.tunnelbear.com",
]);

/**
 * Per-slug env-driven affiliate tracking URLs.
 *
 * Set the matching env var in Vercel (or .env.local) to the FULL personal
 * tracking URL from the affiliate dashboard. The /go/[slug] handler will
 * redirect to this URL instead of the brand's public URL.
 *
 * Example (Vercel project settings):
 *   AFFILIATE_NORDVPN_URL=https://go.nordvpn.net/aff_c?offer_id=15&aff_id=12345
 *
 * Leave empty/unset to disable affiliate for a provider (the /go handler
 * will still redirect to the brand's public site with utm_* params).
 */
const ENV_TRACKING_URLS: Record<string, string | undefined> = {
  nordvpn: env.AFFILIATE_NORDVPN_URL || undefined,
  surfshark: env.AFFILIATE_SURFSHARK_URL || undefined,
  expressvpn: env.AFFILIATE_EXPRESSVPN_URL || undefined,
  "proton-vpn": env.AFFILIATE_PROTON_VPN_URL || undefined,
  pia: env.AFFILIATE_PIA_URL || undefined,
  cyberghost: env.AFFILIATE_CYBERGHOST_URL || undefined,
  ipvanish: env.AFFILIATE_IPVANISH_URL || undefined,
  windscribe: env.AFFILIATE_WINDSCRIBE_URL || undefined,
  tunnelbear: env.AFFILIATE_TUNNELBEAR_URL || undefined,
};

const PUBLIC_URLS: Record<string, { brand: string; url: string; hasProgram: boolean }> = {
  nordvpn: { brand: "NordVPN", url: "https://nordvpn.com/", hasProgram: true },
  surfshark: { brand: "Surfshark", url: "https://surfshark.com/", hasProgram: true },
  expressvpn: { brand: "ExpressVPN", url: "https://www.expressvpn.com/", hasProgram: true },
  "proton-vpn": { brand: "Proton VPN", url: "https://protonvpn.com/", hasProgram: true },
  pia: { brand: "Private Internet Access", url: "https://www.privateinternetaccess.com/", hasProgram: true },
  cyberghost: { brand: "CyberGhost", url: "https://www.cyberghostvpn.com/", hasProgram: true },
  mullvad: { brand: "Mullvad", url: "https://mullvad.net/", hasProgram: false },
  ipvanish: { brand: "IPVanish", url: "https://www.ipvanish.com/", hasProgram: true },
  windscribe: { brand: "Windscribe", url: "https://windscribe.com/", hasProgram: true },
  tunnelbear: { brand: "TunnelBear", url: "https://www.tunnelbear.com/", hasProgram: true },
};

export const affiliateLinks: Record<string, AffiliateLink> = Object.fromEntries(
  Object.entries(PUBLIC_URLS).map(([slug, info]) => [
    slug,
    {
      slug,
      brand: info.brand,
      url: info.url,
      hasProgram: info.hasProgram,
      trackingUrl: ENV_TRACKING_URLS[slug],
    },
  ]),
);

/** Computed at module load: static hosts + env tracking URL hosts. */
export const allowedRedirectHosts: ReadonlySet<string> = (() => {
  const set = new Set(STATIC_ALLOWED_HOSTS);
  for (const url of Object.values(ENV_TRACKING_URLS)) {
    if (!url) continue;
    try {
      set.add(new URL(url).hostname);
    } catch {
      // Invalid URL — should not happen due to env.ts validation,
      // but guard anyway.
    }
  }
  return set;
})();

export function affiliatePath(slug: string): string {
  return `/go/${slug}`;
}

export function getAffiliate(slug: string): AffiliateLink | undefined {
  return affiliateLinks[slug];
}

/**
 * URL host'unun allowlist'te olup olmadığını kontrol eder.
 * Open redirect saldırılarına karşı son savunma hattı.
 */
export function isAllowedRedirectHost(url: string): boolean {
  try {
    const parsed = new URL(url);
    return allowedRedirectHosts.has(parsed.hostname);
  } catch {
    return false;
  }
}
