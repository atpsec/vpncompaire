import { useLocale, useTranslations } from "next-intl";
import { Compass, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getProduct, homepagePopularProducts, type Product } from "@/data/products";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";
import type { Locale } from "@/lib/site";
import { PopularProviderDiscoveryClient, type DiscoveryCopy, type DiscoveryProvider } from "./popular-provider-discovery-client";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";

/**
 * This is deliberately separate from the stable editorial top-three block and
 * from the 30-provider directory. It is a small discovery pool, not a ranking.
 * IPVanish is omitted from this pool at the user's request; its profile remains
 * available in the provider directory.
 */
const DISCOVERY_POOL_SLUGS = [
  "nordvpn",
  "proton-vpn",
  "surfshark",
  "expressvpn",
  "cyberghost",
  "pia",
  "norton-vpn",
  "windscribe",
  "mullvad",
] as const;

function formatPrice(product: Product, locale: Locale): string {
  if (product.slug === "proton-vpn") {
    return locale === "tr" ? "Ücretsiz plan" : locale === "de" ? "Kostenloser Tarif" : "Free plan";
  }

  const bestPlan = product.plans.find((plan) => plan.isBestValue) ?? product.plans[0];
  if (!product.pricingVerifiedAt || !bestPlan) {
    return locale === "tr" ? "Resmi sitede kontrol edin" : locale === "de" ? "Offizielle Preise prüfen" : "Check official pricing";
  }

  const symbol = product.priceCurrency === "EUR" ? "€" : "$";
  const amount = `${symbol}${bestPlan.monthlyPriceUsd.toFixed(2)}`;
  return locale === "tr" ? `${amount}/ay başlangıç` : locale === "de" ? `ab ${amount}/Monat` : `${amount}/mo starting`;
}

function toDiscoveryProvider(product: Product, locale: Locale, profileLabel: string): DiscoveryProvider {
  return {
    slug: product.slug,
    brand: product.brand,
    positioning: product.positioning,
    summary: product.summary,
    logoSlug: product.slug,
    priceLabel: formatPrice(product, locale),
    officialHref: providerOutboundHref({
      slug: product.slug,
      fallbackUrl: product.pricingUrl,
      hasAffiliate: product.hasAffiliate,
      source: "homepage-discovery",
    }),
    officialRel: providerOutboundRel(product.slug, product.hasAffiliate),
    profileHref: `/reviews/${product.slug}`,
    profileLabel,
  };
}

export function PopularProviderDiscovery() {
  const locale = useLocale() as Locale;
  const t = useTranslations("homeBlocks.discovery");
  const copy: DiscoveryCopy = {
    ariaLabel: t("ariaLabel"),
    kicker: t("kicker"),
    title: t("title"),
    subtitle: t("subtitle"),
    sessionNote: t("sessionNote"),
    selectionLabel: t("selectionLabel"),
    official: t("official"),
    affiliateNote: t("affiliateNote"),
  };

  const profileLabel = t("profile");
  const providers = DISCOVERY_POOL_SLUGS
    .map((slug) => getProduct(slug, locale))
    .filter((product): product is Product => Boolean(product))
    .map((product) => toDiscoveryProvider(product, locale, profileLabel));
  const editorialTopThree = new Set(
    homepagePopularProducts(locale).slice(0, 3).map((product) => product.slug),
  );

  const opera: DiscoveryProvider = {
    slug: "opera-vpn",
    brand: "Opera VPN",
    positioning: locale === "tr"
      ? "Tarayıcıya entegre ücretsiz VPN"
      : locale === "de"
        ? "Integriertes kostenloses Browser-VPN"
        : "Browser-integrated free VPN",
    summary: locale === "tr"
      ? "Opera tarayıcısının içindeki ücretsiz VPN seçeneği; cihaz genelinde koruma için ayrı bir VPN Pro katmanı bulunur."
      : locale === "de"
        ? "Ein kostenloses VPN direkt im Opera-Browser; für den gesamten Geräteverkehr gibt es eine separate VPN-Pro-Stufe."
        : "A free VPN built into the Opera browser, with a separate VPN Pro tier for device-wide coverage.",
    logoSlug: "opera-vpn",
    priceLabel: locale === "tr" ? "Ücretsiz tarayıcı VPN" : locale === "de" ? "Kostenloses Browser-VPN" : "Free browser VPN",
    officialHref: "https://www.opera.com/features/free-vpn",
    officialRel: "noopener nofollow",
    profileHref: "/blog/opera-vpn-browser-vpn-review",
    profileLabel: t("operaProfile"),
  };

  return (
    <section aria-label={copy.ariaLabel} className="py-10 sm:py-14">
      <Container>
        <div className="mb-7 flex flex-col gap-3">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              <Compass className="size-3.5" /> {copy.kicker}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">{copy.title}</h2>
            <p className="mt-3 text-ink-muted">{copy.subtitle}</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-2 text-xs text-ink-muted">
            <RefreshCw className="size-3.5 text-brand-600" /> {copy.sessionNote}
          </span>
        </div>
        <PopularProviderDiscoveryClient
          providers={[...providers, opera]}
          excludedSlugs={[...editorialTopThree]}
          copy={copy}
        />
        <AffiliateNotice className="mt-5" variant="surface" />
      </Container>
    </section>
  );
}
