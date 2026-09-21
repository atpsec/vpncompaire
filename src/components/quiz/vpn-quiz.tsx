"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, RotateCcw, Sparkles, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { getProduct } from "@/data/products";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";
import { CopyButton } from "@/components/tools/CopyButton";
import type { Locale } from "@/lib/site";
import {
  describeQuizAnswers,
  isCompleteQuizAnswers,
  rankQuizAnswers,
  VPN_QUIZ_QUESTIONS,
  type QuizAnswers,
  type QuizMatch,
  type QuizQuestionId,
} from "@/lib/vpn-quiz";

type RecommendationMeta = {
  intent: "privacy" | "streaming" | "travel" | "gaming" | "balanced";
  confidence: number;
};

type RecommendationResponse = {
  matches: Array<{ slug: string; score: number }>;
  mode: "deterministic" | "typesafe";
  intent?: RecommendationMeta["intent"];
  confidence?: number;
};

const RECOMMENDATION_INTENTS = new Set<RecommendationMeta["intent"]>([
  "privacy",
  "streaming",
  "travel",
  "gaming",
  "balanced",
]);

function validRecommendationIntent(
  value: unknown,
): value is RecommendationMeta["intent"] {
  return (
    typeof value === "string" &&
    RECOMMENDATION_INTENTS.has(value as RecommendationMeta["intent"])
  );
}

function validRecommendation(value: unknown): value is RecommendationResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<RecommendationResponse>;
  return (
    (response.mode === "deterministic" || response.mode === "typesafe") &&
    Array.isArray(response.matches) &&
    response.matches.length > 0 &&
    response.matches.length <= 3 &&
    response.matches.every(
      (match) =>
        match &&
        typeof match.slug === "string" &&
        typeof match.score === "number" &&
        Number.isFinite(match.score),
    ) &&
    (response.mode !== "typesafe" ||
      (validRecommendationIntent(response.intent) &&
        typeof response.confidence === "number" &&
        Number.isFinite(response.confidence) &&
        response.confidence >= 0 &&
        response.confidence <= 1))
  );
}

export function VPNQuiz() {
  const t = useTranslations("quiz");
  const locale = useLocale() as Locale;
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showResult, setShowResult] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [refinedMatches, setRefinedMatches] = useState<QuizMatch[] | null>(null);
  const [recommendationMeta, setRecommendationMeta] =
    useState<RecommendationMeta | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const currentIdx = VPN_QUIZ_QUESTIONS.findIndex(
    (q) => answers[q.id] === undefined,
  );
  const allAnswered = currentIdx === -1;

  function select(questionId: QuizQuestionId, optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setRefinedMatches(null);
    setRecommendationMeta(null);
  }

  function reset() {
    setAnswers({});
    setShowResult(false);
    setIsRefining(false);
    setRefinedMatches(null);
    setRecommendationMeta(null);
  }

  const deterministicMatches = rankQuizAnswers(answers);
  const matches = refinedMatches ?? deterministicMatches;
  const topMatchSlug = matches[0]?.[0];

  async function showRecommendation() {
    if (!isCompleteQuizAnswers(answers)) return;

    setIsRefining(true);
    setRefinedMatches(null);
    setRecommendationMeta(null);

    try {
      const response = await fetch("/api/vpn-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const payload = (await response.json()) as unknown;

      if (response.ok && validRecommendation(payload)) {
        setRefinedMatches(
          payload.matches.map(({ slug, score }) => [slug, score] as const),
        );
        if (
          payload.mode === "typesafe" &&
          payload.intent &&
          payload.confidence !== undefined
        ) {
          setRecommendationMeta({
            intent: payload.intent,
            confidence: payload.confidence,
          });
        }
      }
    } catch {
      // The local scoring model remains the reliable fallback.
    } finally {
      setIsRefining(false);
      setShowResult(true);
    }
  }

  useEffect(() => {
    if (!showResult || !topMatchSlug) return;
    window.gtag?.("event", "quiz_complete", {
      top_match: topMatchSlug,
      answer_count: Object.keys(answers).length,
      recommendation_mode: recommendationMeta ? "typesafe" : "deterministic",
      locale: document.documentElement.lang || undefined,
    });
  }, [answers, recommendationMeta, showResult, topMatchSlug]);

  // The result replaces the quiz in the DOM, so keyboard and mobile users
  // should be taken directly to the new content instead of being left at the
  // old "Show result" button near the bottom of a long page.
  useEffect(() => {
    if (!showResult || matches.length === 0) return;
    const frame = window.requestAnimationFrame(() => {
      const result = resultRef.current;
      if (!result) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      result.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      result.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [showResult, matches.length]);

  if (showResult && matches.length > 0) {
    const top = matches[0];
    const product = getProduct(top[0], locale);
    if (!product) return null;
    const bestPlan =
      product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];
    const completedAnswers = isCompleteQuizAnswers(answers) ? answers : null;
    const answerDescriptions = completedAnswers
      ? describeQuizAnswers(completedAnswers)
      : null;
    const nextMatch = matches[1] ? getProduct(matches[1][0], locale) : null;
    const decisionReport = [
      `${product.brand} — ${product.positioning}`,
      product.summary,
      answerDescriptions
        ? `${t("result.decisionSignals")}: ${Object.values(answerDescriptions).join(" · ")}`
        : null,
      `${t("result.ctaReview")}: /reviews/${product.slug}`,
    ]
      .filter(Boolean)
      .join("\n");

    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        aria-labelledby="quiz-result-heading"
        className="mt-8 outline-none"
      >
        <Card className="p-8 border-brand-300 bg-gradient-to-br from-brand-50/60 to-accent-50/40">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <Sparkles className="size-4" />
            {t("result.kicker")}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <VPNLogo slug={product.slug} size={88} />
            <div>
              <h2 id="quiz-result-heading" className="text-3xl font-bold text-ink-strong">
                {product.brand}
              </h2>
              <p className="text-sm text-ink-muted">{product.positioning}</p>
              <Badge variant="success" className="mt-2">
                {t("result.matchBadge")}
              </Badge>
              {recommendationMeta ? (
                <p className="mt-2 text-xs text-ink-muted">
                  {t("result.aiSignal", {
                    intent: t(`result.intentLabels.${recommendationMeta.intent}`),
                    confidence: Math.round(recommendationMeta.confidence * 100),
                  })}
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-6 text-ink leading-relaxed">{product.summary}</p>

          <p className="mt-3 text-xs text-ink-muted leading-relaxed">
            {t("result.disclaimer")}
          </p>

          <div className="mt-6 rounded-xl border border-brand-200/80 bg-white/75 p-4 dark:border-brand-800/70 dark:bg-surface-subtle/70">
            <h3 className="text-sm font-bold text-ink-strong">
              {t("result.decisionTitle")}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              {t("result.decisionSubtitle")}
            </p>
            {answerDescriptions ? (
              <div className="mt-3 flex flex-wrap gap-2" aria-label={t("result.decisionSignals")}>
                {Object.values(answerDescriptions).map((description) => (
                  <span
                    key={description}
                    className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs text-brand-800 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-200"
                  >
                    {description}
                  </span>
                ))}
              </div>
            ) : null}
            <ul className="mt-3 grid gap-2 text-sm text-ink">
              {product.pros.slice(0, 3).map((pro) => (
                <li key={pro} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success-600" aria-hidden="true" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
            {nextMatch ? (
              <p className="mt-3 border-t border-border/70 pt-3 text-xs leading-relaxed text-ink-muted">
                {t("result.decisionAlternative", { brand: nextMatch.brand })}
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex items-baseline gap-2 text-ink-strong">
            <span className="text-sm text-ink-muted">
              {t("result.monthlyLabel")}
            </span>
            <span className="text-2xl font-bold">
              {product.pricingVerifiedAt ? `${product.priceCurrency === "EUR" ? "€" : "$"}${bestPlan.monthlyPriceUsd.toFixed(2)}` : locale === "tr" ? "Resmi site" : locale === "de" ? "Offizielle Website" : "Official site"}
            </span>
            <span className="text-sm text-ink-muted">
              ({bestPlan.name})
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="primary">
              <ProviderLink
                href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "quiz-result" })}
                rel={providerOutboundRel(product.slug, product.hasAffiliate)}
                target="_blank"
                provider={product.slug}
                placement="quiz-result"
              >
                {t("result.ctaDeal", { brand: product.brand })}
                <ArrowRight className="size-4" />
              </ProviderLink>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/reviews/${product.slug}`}>
                {t("result.ctaReview")}
              </Link>
            </Button>
            <Button variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> {t("result.ctaReset")}
            </Button>
            <CopyButton
              value={decisionReport}
              copyLabel={t("result.copyLink")}
              copiedLabel={t("result.linkCopied")}
            />
          </div>
          <AffiliateNotice className="mt-4" variant="surface" />
        </Card>

        {matches.length > 1 ? (
          <div className="mt-6">
            <h3 className="font-semibold text-ink-strong">
              {t("result.altsHeading")}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {matches.slice(1).map(([slug]) => {
                const alt = getProduct(slug, locale);
                if (!alt) return null;
                return (
                  <Card key={slug} className="p-4 flex items-center gap-3">
                    <VPNLogo slug={alt.slug} size={48} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink-strong truncate">
                        {alt.brand}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {t("result.altMatch", { positioning: alt.positioning })}
                      </p>
                    </div>
                    <Link
                      href={`/reviews/${alt.slug}`}
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
      {VPN_QUIZ_QUESTIONS.map((q, qIdx) => {
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
                    disabled={isRefining}
                    aria-pressed={isSelected}
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
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center pt-2">
          <Button
            variant="primary"
            size="lg"
            disabled={isRefining}
            aria-busy={isRefining}
            onClick={showRecommendation}
          >
            <Sparkles className="size-4" />
            {isRefining ? t("analyzing") : t("showResult")}
          </Button>
          <Button variant="ghost" disabled={isRefining} onClick={reset}>
            <RotateCcw className="size-4" /> {t("reset")}
          </Button>
          <p className="basis-full text-center text-xs text-ink-muted">
            {t("analysisDisclosure")}
          </p>
        </div>
      ) : (
        <p className="text-center text-xs text-ink-muted">
          {t("progress", {
            current: Math.max(currentIdx, 0) + 1,
            total: VPN_QUIZ_QUESTIONS.length,
          })}
        </p>
      )}
    </div>
  );
}
