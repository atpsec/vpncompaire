"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, RotateCcw, Sparkles, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { getProduct } from "@/data/products";

type QuestionData = {
  id: string;
  /** Per-option per-VPN points awarded. Index matches option position. */
  optionsPoints: ReadonlyArray<Partial<Record<string, number>>>;
};

const QUESTIONS: ReadonlyArray<QuestionData> = [
  {
    id: "priority",
    optionsPoints: [
      { nordvpn: 3, expressvpn: 3, surfshark: 2, cyberghost: 3 },
      { mullvad: 4, "proton-vpn": 3, pia: 2, nordvpn: 1 },
      { nordvpn: 2, surfshark: 2, expressvpn: 2, "proton-vpn": 2 },
      { nordvpn: 3, expressvpn: 3, pia: 2 },
    ],
  },
  {
    id: "budget",
    optionsPoints: [
      { "proton-vpn": 5, windscribe: 2 },
      { surfshark: 4, pia: 3, ipvanish: 2 },
      { nordvpn: 3, "proton-vpn": 2, mullvad: 3 },
      { expressvpn: 4, nordvpn: 3 },
    ],
  },
  {
    id: "devices",
    optionsPoints: [
      { mullvad: 2, "proton-vpn": 2 },
      { nordvpn: 2, expressvpn: 2, pia: 2 },
      { nordvpn: 3, ipvanish: 2 },
      { surfshark: 5, windscribe: 2 },
    ],
  },
  {
    id: "location",
    optionsPoints: [
      {
        nordvpn: 3,
        expressvpn: 3,
        surfshark: 3,
        cyberghost: 2,
        pia: 1,
      },
      { mullvad: 3, "proton-vpn": 2 },
      { nordvpn: 1, surfshark: 1 },
    ],
  },
  {
    id: "trust",
    optionsPoints: [
      {
        nordvpn: 3,
        expressvpn: 3,
        mullvad: 2,
        "proton-vpn": 3,
        tunnelbear: 2,
      },
      { "proton-vpn": 4, mullvad: 4, pia: 3 },
      { pia: 4, expressvpn: 3 },
      { nordvpn: 2, expressvpn: 2, surfshark: 1 },
    ],
  },
  {
    id: "ease",
    optionsPoints: [
      { surfshark: 2, nordvpn: 2, expressvpn: 3, tunnelbear: 3 },
      { nordvpn: 2, "proton-vpn": 2, surfshark: 2 },
      { pia: 4, mullvad: 3, "proton-vpn": 2 },
    ],
  },
];

export function VPNQuiz() {
  const t = useTranslations("quiz");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const currentIdx = QUESTIONS.findIndex((q) => answers[q.id] === undefined);
  const allAnswered = currentIdx === -1;

  function select(questionId: string, optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  }

  function reset() {
    setAnswers({});
    setShowResult(false);
  }

  const scores = QUESTIONS.reduce<Record<string, number>>((acc, q) => {
    const optionIdx = answers[q.id];
    if (optionIdx === undefined) return acc;
    const pts = q.optionsPoints[optionIdx];
    for (const [slug, p] of Object.entries(pts)) {
      acc[slug] = (acc[slug] ?? 0) + (p ?? 0);
    }
    return acc;
  }, {});

  const ranked = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (showResult && ranked.length > 0) {
    const top = ranked[0];
    const product = getProduct(top[0]);
    if (!product) return null;
    const bestPlan =
      product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];

    return (
      <div className="mt-8">
        <Card className="p-8 border-brand-300 bg-gradient-to-br from-brand-50/60 to-accent-50/40">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <Sparkles className="size-4" />
            {t("result.kicker")}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <VPNLogo slug={product.slug} size={88} />
            <div>
              <h2 className="text-3xl font-bold text-ink-strong">
                {product.brand}
              </h2>
              <p className="text-sm text-ink-muted">{product.positioning}</p>
              <Badge variant="success" className="mt-2">
                {t("result.scoreBadge", { score: top[1] })}
              </Badge>
            </div>
          </div>

          <p className="mt-6 text-ink leading-relaxed">{product.summary}</p>

          <p className="mt-3 text-xs text-ink-muted leading-relaxed">
            {t("result.disclaimer")}
          </p>

          <div className="mt-6 flex items-baseline gap-2 text-ink-strong">
            <span className="text-sm text-ink-muted">
              {t("result.monthlyLabel")}
            </span>
            <span className="text-2xl font-bold">
              ${bestPlan.monthlyPriceUsd.toFixed(2)}
            </span>
            <span className="text-sm text-ink-muted">
              ({bestPlan.name})
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="primary">
              <Link href={`/go/${product.slug}`}>
                {t("result.ctaDeal", { brand: product.brand })}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/inceleme/${product.slug}`}>
                {t("result.ctaReview")}
              </Link>
            </Button>
            <Button variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> {t("result.ctaReset")}
            </Button>
          </div>
        </Card>

        {ranked.length > 1 ? (
          <div className="mt-6">
            <h3 className="font-semibold text-ink-strong">
              {t("result.altsHeading")}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {ranked.slice(1).map(([slug, score]) => {
                const alt = getProduct(slug);
                if (!alt) return null;
                return (
                  <Card key={slug} className="p-4 flex items-center gap-3">
                    <VPNLogo slug={alt.slug} size={48} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink-strong truncate">
                        {alt.brand}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {t("result.altScore", {
                          positioning: alt.positioning,
                          score,
                        })}
                      </p>
                    </div>
                    <Link
                      href={`/inceleme/${alt.slug}`}
                      className="text-sm font-medium text-brand-700 hover:underline shrink-0"
                    >
                      {t("result.altLink")}
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {QUESTIONS.map((q, qIdx) => {
        const isAnswered = answers[q.id] !== undefined;
        const isActive = qIdx === currentIdx || isAnswered;
        if (!isActive) return null;

        const helper = t(`questions.${q.id}.helper`);

        return (
          <Card key={q.id} className="p-6">
            <h3 className="font-semibold text-ink-strong text-lg">
              {t(`questions.${q.id}.prompt`)}
            </h3>
            {helper ? (
              <p className="mt-1 text-sm text-ink-muted">{helper}</p>
            ) : null}
            <div className="mt-4 grid gap-2">
              {q.optionsPoints.map((_, idx) => {
                const isSelected = answers[q.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => select(q.id, idx)}
                    className={`text-left rounded-lg border px-4 py-3 text-sm transition-all flex items-center gap-3 ${
                      isSelected
                        ? "border-brand-500 bg-brand-50 text-ink-strong"
                        : "border-border hover:border-brand-300 hover:bg-surface-subtle"
                    }`}
                  >
                    <span
                      className={`inline-flex size-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-border"
                      }`}
                    >
                      {isSelected ? <Check className="size-3" /> : null}
                    </span>
                    <span>{t(`questions.${q.id}.options.${idx}`)}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        );
      })}

      {allAnswered ? (
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowResult(true)}
          >
            <Sparkles className="size-4" /> {t("showResult")}
          </Button>
          <Button variant="ghost" onClick={reset}>
            <RotateCcw className="size-4" /> {t("reset")}
          </Button>
        </div>
      ) : (
        <p className="text-center text-xs text-ink-muted">
          {t("progress", {
            current: Math.max(currentIdx, 0) + 1,
            total: QUESTIONS.length,
          })}
        </p>
      )}
    </div>
  );
}
