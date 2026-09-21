"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Calculator, CalendarClock, Info, Save, Trash2, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { rankedProducts } from "@/data/products";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/lib/site";

type Horizon = 1 | 2 | 3;

const HORIZONS: ReadonlyArray<Horizon> = [1, 2, 3];
const RENEWAL_PLAN_STORAGE_KEY = "vpnadvisor.renewal-plan";

type RenewalPlan = {
  slug: string;
  date: string;
};

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
  const locale = useLocale() as Locale;
  const [horizon, setHorizon] = useState<Horizon>(3);
  const [trackedSlug, setTrackedSlug] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [savedPlan, setSavedPlan] = useState<RenewalPlan | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [todayMs, setTodayMs] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(RENEWAL_PLAN_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<RenewalPlan>;
          if (typeof parsed.slug === "string" && typeof parsed.date === "string") {
            setSavedPlan({ slug: parsed.slug, date: parsed.date });
            setTrackedSlug(parsed.slug);
            setRenewalDate(parsed.date);
          }
        }
      } catch {
        // A blocked or malformed local storage entry should not affect the calculator.
      } finally {
        setStorageReady(true);
        setTodayMs(Date.now());
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      if (savedPlan) {
        window.localStorage.setItem(RENEWAL_PLAN_STORAGE_KEY, JSON.stringify(savedPlan));
      } else {
        window.localStorage.removeItem(RENEWAL_PLAN_STORAGE_KEY);
      }
    } catch {
      // The plan remains usable for this visit even when storage is unavailable.
    }
  }, [savedPlan, storageReady]);

  const horizonMonths = horizon * 12;

  const rows = rankedProducts(locale)
    .filter((product) => product.priceCurrency === "USD" && product.pricingVerifiedAt && product.plans.length > 0)
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
  const selectedSlug = trackedSlug || rows[0]?.product.slug || "";
  const selectedRow = rows.find((row) => row.product.slug === selectedSlug) ?? rows[0];
  const savedRow = savedPlan
    ? rows.find((row) => row.product.slug === savedPlan.slug) ?? null
    : null;
  const daysUntilRenewal = savedPlan
    && todayMs !== null
    ? Math.ceil(
        (new Date(`${savedPlan.date}T00:00:00`).getTime() - todayMs) /
          (1000 * 60 * 60 * 24),
      )
    : null;
  const formattedRenewalDate = savedPlan
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
        new Date(`${savedPlan.date}T00:00:00`),
      )
    : "";

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
              aria-pressed={horizon === value}
              onClick={() => setHorizon(value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                horizon === value
                  ? "bg-brand-600 text-white"
                  : "border border-border bg-surface-base hover:border-brand-300"
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

      {selectedRow ? (
        <Card className="mt-6 border-accent-300 bg-accent-50/35 p-6 dark:border-accent-800/70 dark:bg-accent-950/20">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300">
              <CalendarClock className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-strong">{t("renewalGuardTitle")}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t("renewalGuardBody")}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,13rem)_auto] sm:items-end">
            <label className="grid gap-1.5 text-sm font-medium text-ink-strong">
              <span>{t("renewalProviderLabel")}</span>
              <select
                value={selectedSlug}
                onChange={(event) => setTrackedSlug(event.target.value)}
                className="h-10 rounded-md border border-border bg-surface-base px-3 text-sm font-normal text-ink-strong outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              >
                {rows.map((row) => (
                  <option key={row.product.slug} value={row.product.slug}>
                    {row.product.brand}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-ink-strong">
              <span>{t("renewalDateLabel")}</span>
              <input
                type="date"
                value={renewalDate}
                onChange={(event) => setRenewalDate(event.target.value)}
                className="h-10 rounded-md border border-border bg-surface-base px-3 text-sm font-normal text-ink-strong outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </label>
            <Button
              type="button"
              variant="primary"
              disabled={!selectedSlug || !renewalDate}
              onClick={() => setSavedPlan({ slug: selectedSlug, date: renewalDate })}
            >
              <Save className="size-4" aria-hidden="true" />
              {t("renewalSave")}
            </Button>
          </div>
          <p className="mt-2 text-xs text-ink-muted">{t("renewalDateHint")}</p>

          {savedPlan && savedRow && daysUntilRenewal !== null ? (
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-success-300 bg-success-50/70 p-4 dark:border-success-800/70 dark:bg-success-950/20 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-success-800 dark:text-success-200">
                  {t("renewalSaved", { brand: savedRow.product.brand, date: formattedRenewalDate })}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {daysUntilRenewal >= 0
                    ? t("renewalDays", { days: daysUntilRenewal })
                    : t("renewalOverdue", { days: Math.abs(daysUntilRenewal) })} {t("renewalRate", { monthly: savedRow.renewalRate.toFixed(2) })}
                </p>
                <Link href={`/reviews/${savedRow.product.slug}`} className="mt-1 inline-flex text-xs font-semibold text-brand-700 hover:underline dark:text-brand-300">
                  {t("renewalReview")}
                </Link>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSavedPlan(null);
                  setRenewalDate("");
                }}
              >
                <Trash2 className="size-4" aria-hidden="true" />
                {t("renewalClear")}
              </Button>
            </div>
          ) : null}
          <p className="mt-3 text-xs text-ink-muted">{t("renewalPrivacy")}</p>
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
