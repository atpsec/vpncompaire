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

export function getDetailedProviderProducts(locale: Locale = "en"): Product[] {
  return rankedProducts(locale)
    .filter((product) => product.slug !== "atlas-vpn")
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
