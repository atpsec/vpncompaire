"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  Check,
  ExternalLink,
  MapPin,
  Server,
  Smartphone,
  X,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts, type Product } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

const MIN = 2;
const MAX = 4;

export function ComparePicker() {
  const t = useTranslations("homeBlocks.comparePicker");
  const locale = useLocale() as "tr" | "en";
  const all = rankedProducts(locale);
  const [selected, setSelected] = useState<string[]>(() =>
    all.slice(0, 2).map((p) => p.slug),
  );

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        if (prev.length <= MIN) return prev;
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= MAX) return prev;
      return [...prev, slug];
    });
  };

  const clear = () => setSelected(all.slice(0, 2).map((p) => p.slug));

  const compared = useMemo(
    () =>
      selected
        .map((slug) => all.find((p) => p.slug === slug))
        .filter((p): p is Product => Boolean(p)),
    [selected, all],
  );

  return (
    <section className="py-16 sm:py-20 bg-surface-subtle/40 border-y border-border">
      <Container>
        <div className="mb-8 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {t("kicker")}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-strong">
            {t("h2")}
          </h2>
          <p className="mt-3 text-ink-muted">{t("intro")}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="text-sm text-ink-muted">
            {t("selectedLabel")}{" "}
            <span className="font-semibold text-ink-strong tabular-nums">
              {selected.length}
            </span>
            <span className="text-ink-faint"> {t("ofMax", { max: MAX })}</span>
          </p>
          {selected.length > MIN && (
            <button
              type="button"
              onClick={clear}
              className="text-xs text-ink-muted hover:text-ink underline-offset-2 hover:underline"
            >
              {t("reset")}
            </button>
          )}
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
          {all.map((p) => {
            const isSelected = selected.includes(p.slug);
            const isDisabled = !isSelected && selected.length >= MAX;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => toggle(p.slug)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  className={cn(
                    "w-full flex flex-col items-center gap-2 rounded-xl border bg-white p-3 transition-all text-center",
                    isSelected
                      ? "border-brand-500 ring-2 ring-brand-200 shadow-sm"
                      : "border-border hover:border-brand-300",
                    isDisabled &&
                      "opacity-40 cursor-not-allowed hover:border-border",
                  )}
                >
                  <span className="relative">
                    <VPNLogo slug={p.slug} size={44} />
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-brand-600 text-white shadow ring-2 ring-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-semibold text-ink-strong line-clamp-1">
                    {p.brand}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <CompareTable products={compared} />
      </Container>
    </section>
  );
}

function CompareTable({ products }: { products: Product[] }) {
  const t = useTranslations("homeBlocks.comparePicker");
  if (products.length < MIN) {
    return (
      <Card className="p-6 text-center text-sm text-ink-muted">
        {t("needAtLeast", { min: MIN })}
      </Card>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-3 min-w-[640px]"
        style={{
          gridTemplateColumns: `repeat(${products.length}, minmax(220px, 1fr))`,
        }}
      >
        {products.map((p) => (
          <ProductColumn key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

function ProductColumn({ product }: { product: Product }) {
  const t = useTranslations("homeBlocks.comparePicker");
  const bestPlan =
    product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];
  const monthlyPlan = product.plans.find((pl) => pl.durationMonths === 1);

  return (
    <Card className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <VPNLogo slug={product.slug} size={44} />
          <div className="min-w-0">
            <h3 className="font-bold text-ink-strong leading-tight">
              {product.brand}
            </h3>
            <p className="text-xs text-ink-subtle line-clamp-1">
              {product.positioning}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-brand-700 tabular-nums">
            {product.score.toFixed(1)}
          </span>
          <span className="text-xs text-ink-subtle">/10</span>
        </div>
      </div>

      <dl className="p-4 space-y-3 text-xs flex-1">
        <Row
          icon={<Award className="size-3.5" />}
          label={t("rows.audit")}
          value={product.highlights.audits ?? "—"}
          missing={!product.highlights.audits}
        />
        <Row
          icon={<Server className="size-3.5" />}
          label={t("rows.servers")}
          value={product.highlights.servers ?? "—"}
        />
        <Row
          icon={<Smartphone className="size-3.5" />}
          label={t("rows.devices")}
          value={product.highlights.devices ?? "—"}
        />
        <Row
          icon={<MapPin className="size-3.5" />}
          label={t("rows.jurisdiction")}
          value={product.highlights.jurisdiction ?? "—"}
        />
        <Row
          icon={<Check className="size-3.5" />}
          label={t("rows.moneyBack")}
          value={
            product.highlights.moneyBackDays
              ? `${product.highlights.moneyBackDays} ${t("rows.days")}`
              : "—"
          }
        />
        <Row
          icon={<Check className="size-3.5" />}
          label={t("rows.affiliate")}
          value={product.hasAffiliate ? t("rows.yes") : t("rows.no")}
        />
      </dl>

      <div className="p-4 border-t border-border bg-surface-subtle/30 rounded-b-xl">
        <div className="text-[10px] uppercase tracking-wider text-ink-subtle font-semibold">
          {t("bestValueLabel")}
        </div>
        <div className="mt-1 text-sm font-medium text-ink-strong line-clamp-1">
          {bestPlan.name}
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-xl font-bold text-ink-strong tabular-nums">
            ${bestPlan.monthlyPriceUsd.toFixed(2)}
          </span>
          <span className="text-xs text-ink-subtle">{t("perMonth")}</span>
        </div>
        {monthlyPlan && monthlyPlan !== bestPlan && (
          <div className="mt-1 text-[11px] text-ink-faint">
            {t("monthlyLabel")} ${monthlyPlan.monthlyPriceUsd.toFixed(2)}
          </div>
        )}
        <div className="mt-3 flex flex-col gap-1.5">
          <Button
            asChild
            variant={product.hasAffiliate ? "primary" : "secondary"}
            size="sm"
          >
            <a
              href={
                product.hasAffiliate
                  ? affiliatePath(product.slug)
                  : product.pricingUrl
              }
              rel={product.hasAffiliate ? "sponsored nofollow" : "noopener"}
              target={product.hasAffiliate ? "_self" : "_blank"}
            >
              {product.hasAffiliate ? t("ctaDeal") : t("ctaOfficial")}
              {product.hasAffiliate ? (
                <ArrowRight className="size-3.5" />
              ) : (
                <ExternalLink className="size-3.5" />
              )}
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/inceleme/${product.slug}`}>{t("readReview")}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function Row({
  icon,
  label,
  value,
  missing = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  missing?: boolean;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-ink-subtle text-[11px] uppercase tracking-wider font-medium">
        {icon}
        {label}
      </dt>
      <dd
        className={cn(
          "mt-0.5 text-ink-strong leading-snug",
          missing && "text-ink-faint",
        )}
      >
        {missing ? <X className="inline size-3.5" /> : value}
      </dd>
    </div>
  );
}
