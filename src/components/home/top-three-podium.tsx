import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, FileSearch } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { homepagePopularProducts, type Product } from "@/data/products";
import { positioningFor } from "@/lib/editorial-positioning";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";

export function TopThreePodium() {
  const locale = useLocale() as Locale;
  const top = homepagePopularProducts(locale).slice(0, 3);
  const copy = positioningFor(locale);
  const label = copy.featured;
  return (
    <section aria-label={label} className="relative -mt-2 sm:-mt-4 pb-8 sm:pb-12">
      <Container>
        <ul className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
          {top.map((p, i) => <li key={p.slug}><ProviderCard product={p} featured={i === 0} /></li>)}
        </ul>
        <AffiliateNotice className="mt-4" />
      </Container>
    </section>
  );
}

function ProviderCard({ product, featured }: { product: Product; featured: boolean }) {
  const t = useTranslations("homeBlocks.podium");
  const locale = useLocale() as Locale;
  const copy = positioningFor(locale);
  const bestPlan = product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];
  const priceLabel = product.slug === "proton-vpn"
    ? locale === "tr" ? "Ücretsiz plan" : locale === "de" ? "Kostenloser Tarif" : "Free plan"
    : locale === "tr" ? "Resmi site" : locale === "de" ? "Offizielle Website" : "Official site";

  return (
    <article className={cn("relative h-full overflow-hidden rounded-2xl border bg-surface-base shadow-sm", featured ? "border-brand-300 shadow-md ring-1 ring-brand-200/50" : "border-border")}>
      {featured && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500" />}
      <div aria-hidden="true" className={cn("pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl", featured ? "bg-brand-100/50" : "bg-surface-subtle")} />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
            <FileSearch className="size-3" /> {featured ? copy.featured : copy.profile}
          </span>
        </div>
        <div className="mt-4 flex justify-center"><VPNLogo slug={product.slug} size={96} className="drop-shadow-md" /></div>
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-ink-strong tracking-tight">{product.brand}</h3>
          <p className="mt-1 text-xs text-ink-subtle">{product.positioning}</p>
        </div>
        <div className="mt-4 flex items-baseline justify-center gap-1">
          <span className="text-2xl font-bold text-ink-strong tabular-nums">{product.pricingVerifiedAt && bestPlan ? `${product.priceCurrency === "EUR" ? "€" : "$"}${bestPlan.monthlyPriceUsd.toFixed(2)}` : priceLabel}</span>
          {product.pricingVerifiedAt && bestPlan ? <span className="text-xs text-ink-subtle">{t("perMonthStart")}</span> : null}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <Button asChild variant="primary" size="md" className="w-full"><ProviderLink href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "homepage-podium" })} rel={providerOutboundRel(product.slug, product.hasAffiliate)} target="_blank" provider={product.slug} placement="homepage-podium">{t("ctaOfficial")}<ArrowRight className="size-4" /></ProviderLink></Button>
          <Button asChild variant="ghost" size="sm" className="w-full"><Link href={`/reviews/${product.slug}`}>{copy.viewProfile}</Link></Button>
        </div>
      </div>
    </article>
  );
}
