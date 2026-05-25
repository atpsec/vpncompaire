export type AffiliateLink = {
  slug: string;
  brand: string;
  url: string;
  hasProgram: boolean;
};

/**
 * Affiliate hedef URL'lerin host allowlist'i.
 * Open redirect savunması için /go/[slug] handler'ı bu listeye karşı doğrulama yapar.
 * Yeni bir affiliate eklerken hem affiliateLinks'e hem allowedRedirectHosts'a ekleyin.
 */
export const allowedRedirectHosts: ReadonlySet<string> = new Set([
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

export const affiliateLinks: Record<string, AffiliateLink> = {
  nordvpn: {
    slug: "nordvpn",
    brand: "NordVPN",
    url: "https://nordvpn.com/",
    hasProgram: true,
  },
  surfshark: {
    slug: "surfshark",
    brand: "Surfshark",
    url: "https://surfshark.com/",
    hasProgram: true,
  },
  expressvpn: {
    slug: "expressvpn",
    brand: "ExpressVPN",
    url: "https://www.expressvpn.com/",
    hasProgram: true,
  },
  "proton-vpn": {
    slug: "proton-vpn",
    brand: "Proton VPN",
    url: "https://protonvpn.com/",
    hasProgram: true,
  },
  pia: {
    slug: "pia",
    brand: "Private Internet Access",
    url: "https://www.privateinternetaccess.com/",
    hasProgram: true,
  },
  cyberghost: {
    slug: "cyberghost",
    brand: "CyberGhost",
    url: "https://www.cyberghostvpn.com/",
    hasProgram: true,
  },
  mullvad: {
    slug: "mullvad",
    brand: "Mullvad",
    url: "https://mullvad.net/",
    hasProgram: false,
  },
  ipvanish: {
    slug: "ipvanish",
    brand: "IPVanish",
    url: "https://www.ipvanish.com/",
    hasProgram: true,
  },
  windscribe: {
    slug: "windscribe",
    brand: "Windscribe",
    url: "https://windscribe.com/",
    hasProgram: true,
  },
  tunnelbear: {
    slug: "tunnelbear",
    brand: "TunnelBear",
    url: "https://www.tunnelbear.com/",
    hasProgram: true,
  },
};

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
