import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Award, Server, Smartphone, MapPin, FileSearch } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { PricingPlans } from "@/components/product/pricing-plans";
import { topRankedProducts, type Product } from "@/data/products";
import { positioningFor } from "@/lib/editorial-positioning";
import type { Locale } from "@/lib/site";

export function TopVPNList() {
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const copy = positioningFor(locale);
  const list = topRankedProducts(locale).filter((p) => p.slug !== "atlas-vpn");
  const featured = list[0];
  const next = list.slice(1, 10);
  const extended = list.slice(10);

  const extendedTitle = locale === "tr" ? "Daha fazla VPN sağlayıcısı" : locale === "de" ? "Weitere VPN-Anbieter" : "More VPN providers";
  const extendedSubtitle = locale === "tr"
    ? "Aynı alanlarda karşılaştırabileceğiniz ek sağlayıcı profilleri."
    : locale === "de"
      ? "Weitere Anbieterprofile mit denselben Vergleichsfeldern."
      : "Additional provider profiles using the same comparison fields.";

  return (
    <section id="top" className="py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {copy.profile}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
            {copy.sectionTitle}
          </h2>
          <p className="mt-3 text-ink-muted">{copy.sectionSubtitle}</p>
        </div>

        {featured && <FeaturedCard product={featured} tCommon={tCommon} label={copy.featured} profileLabel={copy.viewProfile} />}

        <ul className="mt-6 space-y-4">
          {next.map((p) => (
            <ProviderRow key={p.slug} product={p} tCommon={tCommon} profileLabel={copy.viewProfile} />
          ))}
        </ul>

        {extended.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 max-w-2xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                {copy.profile}
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
                {extendedTitle}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{extendedSubtitle}</p>
            </div>
            <ul className="space-y-3">
              {extended.map((p) => (
                <CompactRow key={p.slug} product={p} tCommon={tCommon} />
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

function FeaturedCard({ product, tCommon, label, profileLabel }: { product: Product; tCommon: ReturnType<typeof useTranslations>; label: string; profileLabel: string }) {
  return (
    <Card className="relative overflow-hidden border-brand-200 shadow-md">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 p-6 sm:p-7">
        <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:justify-start lg:border-r lg:border-border lg:pr-7 lg:w-44">
          <VPNLogo slug={product.slug} size={64} />
          <div className="lg:mt-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-600">
              <FileSearch className="size-3" /> {label}
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold text-ink-strong tracking-tight">{product.brand}</h3>
            <Badge variant="brand">{product.positioning}</Badge>
          </div>
          <p className="mt-3 text-[15px] text-ink-muted leading-relaxed">{product.summary}</p>
          <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {product.highlights.audits && <Highlight icon={<Award className="size-4" />} label={product.highlights.audits} tone="success" />}
            {product.highlights.servers && <Highlight icon={<Server className="size-4" />} label={product.highlights.servers} />}
            {product.highlights.devices && <Highlight icon={<Smartphone className="size-4" />} label={product.highlights.devices} />}
            {product.highlights.jurisdiction && <Highlight icon={<MapPin className="size-4" />} label={product.highlights.jurisdiction} />}
          </dl>
        </div>

        <div className="flex flex-col gap-3 lg:w-72 lg:justify-center lg:border-l lg:border-border lg:pl-7">
          <PricingPlans plans={product.plans} verifiedAt={product.pricingVerifiedAt} />
          <Button asChild variant="primary" size="md">
            <a href={product.pricingUrl} rel="noopener nofollow" target="_blank">{tCommon("visitSite")}<ArrowRight className="size-4" /></a>
          </Button>
          <Button asChild variant="ghost" size="sm"><Link href={`/inceleme/${product.slug}`}>{profileLabel}</Link></Button>
        </div>
      </div>
    </Card>
  );
}

function ProviderRow({ product, tCommon, profileLabel }: { product: Product; tCommon: ReturnType<typeof useTranslations>; profileLabel: string }) {
  return (
    <Card className="group transition hover:shadow-md hover:-translate-y-0.5">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-5 p-5 sm:p-6">
        <div className="flex items-center gap-4 lg:w-36 lg:border-r lg:border-border lg:pr-6"><VPNLogo slug={product.slug} size={52} /></div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2"><h3 className="text-xl font-semibold text-ink-strong">{product.brand}</h3><Badge variant={product.hasAffiliate ? "brand" : "outline"}>{product.positioning}</Badge></div>
          <p className="mt-2 text-sm text-ink-muted">{product.summary}</p>
          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {product.highlights.audits && <Highlight icon={<Award className="size-3.5" />} label={product.highlights.audits} tone="success" compact />}
            {product.highlights.servers && <Highlight icon={<Server className="size-3.5" />} label={product.highlights.servers} compact />}
            {product.highlights.devices && <Highlight icon={<Smartphone className="size-3.5" />} label={product.highlights.devices} compact />}
            {product.highlights.jurisdiction && <Highlight icon={<MapPin className="size-3.5" />} label={product.highlights.jurisdiction} compact />}
          </dl>
        </div>
        <div className="flex flex-col gap-3 lg:w-64 lg:justify-center lg:border-l lg:border-border lg:pl-6">
          <PricingPlans plans={product.plans} verifiedAt={product.pricingVerifiedAt} variant="compact" />
          <Button asChild variant="primary" size="md"><a href={product.pricingUrl} rel="noopener nofollow" target="_blank">{tCommon("visitSite")}<ArrowRight className="size-4" /></a></Button>
          <Button asChild variant="ghost" size="sm"><Link href={`/inceleme/${product.slug}`}>{profileLabel}</Link></Button>
        </div>
      </div>
    </Card>
  );
}

function CompactRow({ product, tCommon }: { product: Product; tCommon: ReturnType<typeof useTranslations> }) {
  return (
    <Card className="transition hover:shadow-sm hover:border-brand-200">
      <Link href={`/inceleme/${product.slug}`} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
        <VPNLogo slug={product.slug} size={40} />
        <div className="flex-1 min-w-[180px]">
          <div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-semibold text-ink-strong">{product.brand}</h3><Badge variant={product.hasAffiliate ? "brand" : "outline"}>{product.positioning}</Badge></div>
          <p className="mt-1 text-xs text-ink-muted line-clamp-1">{product.summary}</p>
        </div>
        <div className="text-right"><div className="text-xs text-ink-subtle">${product.priceFromUsd.toFixed(2)}/{tCommon("perMonth")}</div></div>
        <ArrowRight className="size-4 text-ink-subtle" />
      </Link>
    </Card>
  );
}

function Highlight({ icon, label, tone = "neutral", compact = false }: { icon: React.ReactNode; label: string; tone?: "neutral" | "success"; compact?: boolean }) {
  return (
    <div className={"flex items-center gap-1.5 rounded-md " + (compact ? "px-2 py-1.5 " : "px-3 py-2 ") + (tone === "success" ? "bg-success-50 text-success-700" : "bg-surface-subtle text-ink-muted")}>
      <span aria-hidden="true">{icon}</span><span className="line-clamp-1">{label}</span>
    </div>
  );
}
