/**
 * Client-safe affiliate link helpers.
 *
 * Personal tracking URLs stay server-only in `affiliate.ts`. The browser uses
 * the stable internal redirect for known affiliate-program providers; the
 * redirect handler decides whether to use a configured tracking URL or the
 * provider's public URL fallback. This keeps server/client HTML identical and
 * prevents affiliate IDs from entering the client bundle.
 */
const AFFILIATE_PROGRAM_SLUGS: ReadonlySet<string> = new Set([
  "nordvpn",
  "surfshark",
  "expressvpn",
  "proton-vpn",
  "pia",
  "cyberghost",
  "ipvanish",
  "windscribe",
  "tunnelbear",
  "purevpn",
  "vyprvpn",
  "ivpn",
  "hideme",
  "privado-vpn",
  "hotspot-shield",
  "strongvpn",
  "zoogvpn",
  "norton-vpn",
]);

function usesAffiliateRedirect(slug: string, hasAffiliate: boolean): boolean {
  return hasAffiliate && AFFILIATE_PROGRAM_SLUGS.has(slug);
}

export function providerOutboundHref({
  slug,
  fallbackUrl,
  hasAffiliate,
  source,
}: {
  slug: string;
  fallbackUrl: string;
  hasAffiliate: boolean;
  source: string;
}): string {
  if (!usesAffiliateRedirect(slug, hasAffiliate)) return fallbackUrl;
  return `/go/${slug}?source=${encodeURIComponent(source)}`;
}

export function providerOutboundRel(slug: string, hasAffiliate: boolean): string {
  return usesAffiliateRedirect(slug, hasAffiliate)
    ? "noopener nofollow sponsored"
    : "noopener nofollow";
}
