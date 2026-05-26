"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Calculator, Info, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { products } from "@/data/products";

type Horizon = 1 | 2 | 3;

const HORIZONS: ReadonlyArray<Horizon> = [1, 2, 3];

function estimateTotal(
  initialMonthlyUsd: number,
  initialDurationMonths: number,
  renewalMonthlyUsd: number,
  horizonMonths: number,
): { initial: number; renewal: number; total: number } {
  const coveredMonths = Math.min(initialDurationMonths, horizonMonths);
  const remaining = Math.max(0, horizonMonths - coveredMonths);
  const initial = initialMonthlyUsd * coveredMonths;
  const renewal = renewalMonthlyUsd * remaining;
  return { initial, renewal, total: initial + renewal };
}

export function CostCalculator() {
  const t = useTranslations("calculator.tool");
  const [horizon, setHorizon] = useState<Horizon>(3);

  const horizonMonths = horizon * 12;

  const rows = products
    .map((product) => {
      const bestPlan =
        product.plans.find((p) => p.isBestValue) ?? product.plans[0];
      const monthly = product.plans.find((p) => p.durationMonths === 1);
      const renewalRate = monthly?.monthlyPriceUsd ?? bestPlan.monthlyPriceUsd;
      const { initial, renewal, total } = estimateTotal(
        bestPlan.monthlyPriceUsd,
        bestPlan.durationMonths,
        renewalRate,
        horizonMonths,
      );
      const effectiveMonthly = total / horizonMonths;
      return {
        product,
        bestPlan,
        renewalRate,
        initial,
        renewal,
        total,
        effectiveMonthly,
      };
    })
    .sort((a, b) => a.effectiveMonthly - b.effectiveMonthly);

  const cheapest = rows[0];

  return (
    <div className="mt-8">
      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
          <Calculator className="size-4" /> {t("horizonHeading")}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {HORIZONS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setHorizon(value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                horizon === value
                  ? "bg-brand-600 text-white"
                  : "border border-border bg-white hover:border-brand-300"
              }`}
            >
              {t(`horizon${value}`)}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-md bg-accent-50/60 border border-accent-200 p-3 text-xs text-ink leading-relaxed">
          <Info className="size-4 text-accent-600 mt-0.5 shrink-0" />
          <p>{t("explanation")}</p>
        </div>
      </Card>

      {cheapest ? (
        <Card className="mt-6 p-6 border-success-300 bg-gradient-to-br from-success-50/40 to-brand-50/30">
          <div className="flex items-center gap-2 text-sm font-medium text-success-700">
            <TrendingUp className="size-4" />{" "}
            {t("cheapestKicker", { years: horizon })}
          </div>
          <div className="mt-3 flex items-center gap-4">
            <VPNLogo slug={cheapest.product.slug} size={64} />
            <div>
              <h3 className="text-xl font-bold text-ink-strong">
                {cheapest.product.brand}
              </h3>
              <p className="text-sm text-ink-muted">
                {t("cheapestSummary", {
                  total: cheapest.total.toFixed(2),
                  monthly: cheapest.effectiveMonthly.toFixed(2),
                })}
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-subtle/50">
              <th className="text-left p-3 font-semibold">{t("table.vpn")}</th>
              <th className="text-right p-3 font-semibold">
                {t("table.initial")}
              </th>
              <th className="text-right p-3 font-semibold">
                {t("table.renewal")}
              </th>
              <th className="text-right p-3 font-semibold">
                {t("table.totalYears", { years: horizon })}
              </th>
              <th className="text-right p-3 font-semibold">
                {t("table.effectiveMonthly")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.product.slug}
                className="border-b border-border last:border-0 hover:bg-surface-subtle/30"
              >
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <VPNLogo slug={row.product.slug} size={28} />
                    <span className="font-medium text-ink-strong">
                      {row.product.brand}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-right">${row.initial.toFixed(2)}</td>
                <td className="p-3 text-right text-ink-muted">
                  ${row.renewal.toFixed(2)}
                </td>
                <td className="p-3 text-right font-semibold text-ink-strong">
                  ${row.total.toFixed(2)}
                </td>
                <td className="p-3 text-right">
                  ${row.effectiveMonthly.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
