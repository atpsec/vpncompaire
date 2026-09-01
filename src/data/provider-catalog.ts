import type { Locale } from "@/lib/site";
import {
  getReferenceProduct,
  GLOBAL_CORE_REFERENCE_SLUGS,
} from "./products-reference-localized";
import {
  rankedProducts,
  TOP_RANKED_LIMIT,
  type Product,
} from "./products";

/**
 * Public catalog contract. The visible directory is intentionally split into
 * detailed profiles and selected market references; neither group is a lab
 * ranking or a universal quality verdict.
 */
export const GLOBAL_CORE_TARGET_COUNT = 30;

/**
 * Only these profiles have provider-specific editorial copy and a source
 * record deep enough to be presented as finished, indexable profiles. Other
 * market entries remain discoverable in the directory but are not described
 * to search engines as completed reviews.
 */
export const DETAILED_PROVIDER_SLUGS = [
  "nordvpn",
  "surfshark",
  "expressvpn",
  "proton-vpn",
  "pia",
  "cyberghost",
  "ipvanish",
  "windscribe",
  "tunnelbear",
  "mullvad",
] as const;

const detailedProviderSlugs = new Set<string>(DETAILED_PROVIDER_SLUGS);

export function isDetailedProviderSlug(slug: string): boolean {
  return detailedProviderSlugs.has(slug);
}

export function getDetailedProviderProducts(locale: Locale = "en"): Product[] {
  return rankedProducts(locale)
    .filter((product) => isDetailedProviderSlug(product.slug))
    .slice(0, TOP_RANKED_LIMIT);
}

export function getGlobalCoreProducts(locale: Locale = "en"): Product[] {
  const detailed = getDetailedProviderProducts(locale);
  const references = GLOBAL_CORE_REFERENCE_SLUGS
    .map((slug) => getReferenceProduct(slug, locale))
    .filter((product): product is Product => Boolean(product));

  const catalog = [...detailed, ...references].slice(0, GLOBAL_CORE_TARGET_COUNT);
  if (catalog.length !== GLOBAL_CORE_TARGET_COUNT) {
    throw new Error(
      `Global Core catalog invariant failed: expected ${GLOBAL_CORE_TARGET_COUNT}, received ${catalog.length}`,
    );
  }
  return catalog;
}
