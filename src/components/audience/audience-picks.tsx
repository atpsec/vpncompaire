import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check, CircleCheck, FileSearch, GitCompare } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { getProduct } from "@/data/products";
import type { Locale } from "@/lib/site";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate";

type Pick = {
  slug: string;
  reason: string;
  label?: string;
};

type Props = {
  picks: [Pick, Pick, Pick];
  heading?: string;
  subheading?: string;
};

const PICK_META = [
  { icon: CircleCheck, labelKey: "featured" as const, color: "text-accent-600" },
  { icon: GitCompare, labelKey: "alternative" as const, color: "text-brand-600" },
  { icon: FileSearch, labelKey: "reference" as const, color: "text-ink-muted" },
];

export function AudiencePicks({ picks, heading, subheading }: Props) {
  const t = useTranslations("audience");
  const locale = useLocale() as Locale;
  const educationalHeading =
    heading && /en iyi|best vpn|beste vpn|top\s*\d|top-\d|top-?20/i.test(heading)
      ? locale === "tr"
        ? "Bu senaryo için karşılaştırılabilecek sağlayıcı profilleri"
        : locale === "de"
          ? "Vergleichbare Anbieterprofile für dieses Szenario"
          : "Provider profiles to compare for this scenario"
      : heading;
  return (
    <section className="mt-12">
      {educationalHeading ? (
        <header className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            {educationalHeading}
          </h2>
          {subheading ? (
            <p className="mt-2 text-ink-muted">{subheading}</p>
          ) : null}
        </header>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        {picks.map((pick, idx) => {
          const product = getProduct(pick.slug, locale);
          if (!product) return null;
          const pickMeta = PICK_META[idx];
          const PickIcon = pickMeta.icon;
          const bestPlan =
            product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];

          return (
            <Card
              key={pick.slug}
              className="relative overflow-hidden p-5 flex flex-col"
            >
              {idx === 0 ? (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600" />
              ) : null}

              <div className="flex items-center gap-2 text-xs font-medium">
                <PickIcon className={`size-4 ${pickMeta.color}`} />
                <span className={pickMeta.color}>{t(pickMeta.labelKey)}</span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <VPNLogo slug={product.slug} size={56} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink-strong">
                    {product.brand}
                  </h3>
                  <p className="text-xs text-ink-muted truncate">
                    {pick.label ?? product.positioning}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-ink leading-relaxed">
                <span className="font-medium text-ink-strong">
                  {t("reasonLabel")}
                </span>{" "}
                {pick.reason}
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-ink-muted">
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-success-600 shrink-0 mt-0.5" />
                  <span>
                    {product.highlights.audits ?? t("fallbackAudit")}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-success-600 shrink-0 mt-0.5" />
                  <span>
                    {product.highlights.devices ?? t("fallbackDevices")}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-success-600 shrink-0 mt-0.5" />
                  <span>
                    {t("moneyBack", {
                      days: product.highlights.moneyBackDays ?? 30,
                    })}
                  </span>
                </li>
              </ul>

              <div className="mt-5 flex items-baseline gap-1.5 text-ink-strong">
                <span className="text-xs text-ink-muted">
                  {t("monthlyLabel")}
                </span>
                {product.pricingVerifiedAt && bestPlan ? <><span className="text-lg font-bold">{product.priceCurrency === "EUR" ? "€" : "$"}{bestPlan.monthlyPriceUsd.toFixed(2)}</span><span className="text-xs text-ink-muted">({bestPlan.name})</span></> : <span className="text-sm font-medium">{locale === "tr" ? "Resmi site" : locale === "de" ? "Offizielle Website" : "Official site"}</span>}
              </div>

              <div className="mt-auto pt-5 flex flex-col gap-2">
                <Button asChild variant="primary" size="sm">
                  <ProviderLink
                    href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "audience-pick" })}
                    rel={providerOutboundRel(product.slug, product.hasAffiliate)}
                    target="_blank"
                    provider={product.slug}
                    placement="audience-pick"
                  >
                    {t("ctaDeal", { brand: product.brand })}
                    <ArrowRight className="size-3.5" />
                  </ProviderLink>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/reviews/${product.slug}`}>
                    {t("readReview")}
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
