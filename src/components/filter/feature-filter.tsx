"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Filter, RotateCcw, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts } from "@/data/products";
import type { Locale } from "@/lib/site";
import {
  featureMatrix,
  getFilterLabels,
  type FilterKey,
} from "@/data/features";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";

export function FeatureFilter() {
  const t = useTranslations("filter");
  const locale = useLocale() as Locale;
  const FILTER_LABELS = getFilterLabels(locale);
  const FILTER_KEYS = Object.keys(FILTER_LABELS) as FilterKey[];
  const products = rankedProducts(locale);
  const [active, setActive] = useState<Set<FilterKey>>(new Set());

  function toggle(key: FilterKey) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function reset() {
    setActive(new Set());
  }

  const matches = useMemo(() => {
    return products.filter((product) => {
      const flags = featureMatrix[product.slug];
      if (!flags) return false;
      for (const key of active) {
        if (!flags[key]) return false;
      }
      return true;
    });
  }, [active, products]);

  return (
    <div className="mt-8">
      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
          <Filter className="size-4" /> {t("panelLabel")}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTER_KEYS.map((key) => {
            const isActive = active.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-brand-600 text-white border border-brand-600"
                    : "border border-border bg-surface-base hover:border-brand-300"
                }`}
                title={FILTER_LABELS[key].help}
              >
                {isActive ? (
                  <Check className="size-3" />
                ) : (
                  <span className="size-3" />
                )}
                {FILTER_LABELS[key].label}
              </button>
            );
          })}
        </div>
        {active.size > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
          >
            <RotateCcw className="size-3" />{" "}
            {t("resetWithCount", { count: active.size })}
          </button>
        ) : null}
      </Card>

      <div className="mt-6 flex items-center justify-between text-sm text-ink-muted">
        <p>
          {t.rich("matchCount", {
            count: matches.length,
            strong: (chunks) => (
              <strong className="text-ink-strong">{chunks}</strong>
            ),
          })}
        </p>
        {active.size > 0 ? (
          <p>{t("activeCount", { count: active.size })}</p>
        ) : (
          <p>{t("allShown")}</p>
        )}
      </div>
      <AffiliateNotice className="mt-4" variant="surface" />

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((product) => {
          const flags = featureMatrix[product.slug];
          const activeFlags = FILTER_KEYS.filter((k) => flags[k]);
          return (
            <Card
              key={product.slug}
              className="p-5 flex flex-col hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <VPNLogo slug={product.slug} size={48} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink-strong">
                    {product.brand}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {product.positioning}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {activeFlags.slice(0, 5).map((k) => (
                  <Badge
                    key={k}
                    variant={active.has(k) ? "brand" : "outline"}
                    className="text-[10px]"
                  >
                    <Check className="size-2.5" /> {FILTER_LABELS[k].label}
                  </Badge>
                ))}
                {activeFlags.length > 5 ? (
                  <Badge variant="outline" className="text-[10px]">
                    +{activeFlags.length - 5}
                  </Badge>
                ) : null}
              </div>

              <div className="mt-auto pt-4 flex flex-col gap-2">
                <Button asChild variant="primary" size="sm">
                  <Link href={`/reviews/${product.slug}`}>
                    {t("readReview")}
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <ProviderLink
                    href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "feature-filter" })}
                    rel={providerOutboundRel(product.slug, product.hasAffiliate)}
                    target="_blank"
                    provider={product.slug}
                    placement="feature-filter"
                  >
                    {t("getDeal")}
                  </ProviderLink>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {matches.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <X className="mx-auto size-8 text-ink-muted" />
          <p className="mt-3 font-medium text-ink-strong">{t("emptyTitle")}</p>
          <p className="mt-1 text-sm text-ink-muted">{t("emptyBody")}</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={reset}
            className="mt-4"
          >
            <RotateCcw className="size-3.5" /> {t("emptyCta")}
          </Button>
        </Card>
      ) : null}
    </div>
  );
}
