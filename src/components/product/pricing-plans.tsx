"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/data/products";
import type { PriceCurrency } from "@/data/products";
import { cn } from "@/lib/utils";
import { formatProductPrice } from "@/lib/product-price";

type Props = {
  plans: PricingPlan[];
  verifiedAt: string;
  currency?: PriceCurrency;
  variant?: "compact" | "default";
  className?: string;
};

export function PricingPlans({
  plans,
  verifiedAt,
  currency = "USD",
  variant = "default",
  className,
}: Props) {
  const locale = useLocale();
  const t = useTranslations("pricingPlans");
  const formatter = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const verifiedDate = verifiedAt ? formatter.format(new Date(verifiedAt)) : null;

  return (
    <div className={cn("min-w-0 space-y-2", className)}>
      <div
        className={cn(
          "grid gap-2",
          variant === "compact" ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        {verifiedAt
          ? plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} currency={currency} variant={variant} />
            ))
          : null}
      </div>
      <p className="text-[11px] text-ink-faint flex items-center gap-1">
        <Check className="size-3 text-success-600" />
        {verifiedDate
          ? t("verifiedAt", { date: verifiedDate })
          : t("verifyOnOfficialSite")}
      </p>
    </div>
  );
}

function PlanCard({
  plan,
  currency,
  variant,
}: {
  plan: PricingPlan;
  currency: PriceCurrency;
  variant: "compact" | "default";
}) {
  const t = useTranslations("pricingPlans");
  const isBest = plan.isBestValue;
  return (
    <div
      className={cn(
        "relative min-w-0 rounded-lg border p-3",
        isBest
          ? "border-brand-300 bg-brand-50/60"
          : "border-border bg-surface-subtle/50",
        variant === "compact" && "p-2.5",
        isBest && "pt-5",
      )}
    >
      {isBest && (
        <span className="absolute -top-2 left-2 whitespace-nowrap rounded-full bg-brand-600 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
          {t("bestValue")}
        </span>
      )}
      <div className="break-words text-[11px] font-medium leading-tight text-ink-subtle">
        {plan.name}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span
          className={cn(
            "font-bold tabular-nums text-ink-strong",
            variant === "compact" ? "text-base" : "text-lg",
          )}
        >
          {formatProductPrice(plan.monthlyPriceUsd, currency)}
        </span>
        <span className="text-[11px] text-ink-subtle">{t("perMonth")}</span>
      </div>
      {plan.savingsPercent && plan.savingsPercent > 0 ? (
        <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-success-50 px-1.5 py-0.5 text-[10px] font-semibold text-success-700">
          {t("discount", { percent: plan.savingsPercent })}
        </div>
      ) : null}
      {plan.campaign && !plan.savingsPercent ? (
        <div className="mt-0.5 text-[10px] text-accent-600 font-medium">
          {plan.campaign}
        </div>
      ) : null}
      <div className="mt-1 break-words text-[10px] text-ink-faint tabular-nums">
        {t("totalLabel")} {formatProductPrice(plan.totalPriceUsd, currency)}
        {plan.durationMonths > 1
          ? ` · ${plan.durationMonths} ${t("monthsSuffix")}`
          : ""}
      </div>
    </div>
  );
}
