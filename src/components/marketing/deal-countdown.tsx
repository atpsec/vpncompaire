"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Flame, Tag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { getCurrentDealEvent, type DealEventName } from "@/lib/deals";

type Variant = "banner" | "inline" | "compact";

type DealCountdownProps = {
  /** Hedef tarih. Verilmezse o anki aktif "indirim olayı" otomatik seçilir. */
  targetDate?: Date;
  /** Görünüm modu. */
  variant?: Variant;
  /** Locale (TR/EN). */
  locale: "tr" | "en";
  /** CTA URL — default `/en-iyi-vpn`. */
  ctaUrl?: string;
  /** CTA metni override'ı. */
  ctaText?: string;
  /** Wrapper class override. */
  className?: string;
};

type Segments = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ZERO: Segments = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const COPY = {
  tr: {
    title: "Yıl Sonu VPN İndirimi",
    subtitle: "VPN'lerde yılın en büyük indirim dönemi",
    days: "Gün",
    hours: "Saat",
    minutes: "Dakika",
    seconds: "Saniye",
    cta: "İndirimli VPN'leri Gör",
    ended: "İndirim sona erdi",
    eventLabels: {
      "black-friday": "Black Friday",
      "cyber-monday": "Cyber Monday",
      christmas: "Yılbaşı Haftası",
      "new-year": "Yıl Sonu",
      "year-end": "Yıl Sonu",
    } as Record<DealEventName, string>,
  },
  en: {
    title: "Year-End VPN Deal",
    subtitle: "The biggest VPN discount window of the year",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    cta: "See Discounted VPNs",
    ended: "Deal ended",
    eventLabels: {
      "black-friday": "Black Friday",
      "cyber-monday": "Cyber Monday",
      christmas: "Christmas Week",
      "new-year": "New Year",
      "year-end": "Year-End",
    } as Record<DealEventName, string>,
  },
} as const;

function diffSegments(target: number, now: number): Segments {
  const totalMs = Math.max(0, target - now);
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function pad(n: number, w = 2) {
  return n.toString().padStart(w, "0");
}

function trackPlausible(variant: Variant) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  };
  if (typeof w.plausible === "function") {
    w.plausible("Deal Countdown CTA", { props: { variant } });
  }
}

export function DealCountdown({
  targetDate,
  variant = "inline",
  locale,
  ctaUrl = "/en-iyi-vpn",
  ctaText,
  className,
}: DealCountdownProps) {
  const copy = COPY[locale];

  // Hedef tarih ve etiket — server ve ilk client render aynı sonucu üretir
  // (saf tarih aritmetiği, locale değişkeni yok). Sayaç ise mount sonrası başlar.
  const [{ target, eventLabel }] = useState(() => {
    if (targetDate) {
      return { target: targetDate.getTime(), eventLabel: copy.title };
    }
    const event = getCurrentDealEvent();
    return {
      target: event.endDate.getTime(),
      eventLabel:
        event.name === "year-end"
          ? copy.title
          : `${copy.eventLabels[event.name]} — ${copy.title}`,
    };
  });

  const [segments, setSegments] = useState<Segments>(ZERO);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setSegments(diffSegments(target, now));
      setEnded(now >= target);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const items: Array<{ label: string; value: number }> = [
    { label: copy.days, value: segments.days },
    { label: copy.hours, value: segments.hours },
    { label: copy.minutes, value: segments.minutes },
    { label: copy.seconds, value: segments.seconds },
  ];

  // ---------- COMPACT ----------
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "rounded-xl border border-accent-200/70 bg-gradient-to-br from-accent-50 to-amber-50 p-3 shadow-sm dark:border-accent-700/40 dark:from-accent-900/30 dark:to-amber-950/30",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent-700 dark:text-accent-300">
          <Tag className="size-3" />
          <span>{copy.title}</span>
        </div>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 font-mono text-sm font-bold tabular-nums text-ink-strong"
          suppressHydrationWarning
        >
          {ended ? (
            <span className="text-xs font-medium text-ink-muted">
              {copy.ended}
            </span>
          ) : (
            <>
              {pad(segments.days)}
              <span className="text-ink-subtle">g </span>
              {pad(segments.hours)}:{pad(segments.minutes)}:
              {pad(segments.seconds)}
            </>
          )}
        </div>
        <Link
          href={ctaUrl}
          onClick={() => trackPlausible("compact")}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline dark:text-brand-300"
        >
          {ctaText ?? copy.cta} <ArrowRight className="size-3" />
        </Link>
      </div>
    );
  }

  // ---------- BANNER ----------
  if (variant === "banner") {
    return (
      <section className={cn("relative", className)}>
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-accent-200/70 bg-gradient-to-br from-amber-50 via-accent-50 to-orange-50 p-5 shadow-sm dark:border-accent-700/40 dark:from-amber-950/40 dark:via-accent-900/30 dark:to-orange-950/40 sm:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-12 -bottom-12 size-40 rounded-full bg-accent-200/50 blur-3xl dark:bg-accent-500/10"
            />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-800 dark:bg-accent-900/50 dark:text-accent-200">
                  <Flame className="size-3" />
                  {eventLabel}
                </span>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-ink-strong sm:text-2xl">
                  {copy.title}
                </h2>
                <p className="mt-1 max-w-xl text-sm text-ink-muted sm:text-base">
                  {copy.subtitle}
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="grid grid-cols-4 gap-2 sm:gap-3"
                  suppressHydrationWarning
                >
                  {items.map((it) => (
                    <Segment key={it.label} label={it.label} value={it.value} />
                  ))}
                </div>
                <Button
                  asChild
                  variant="accent"
                  size="md"
                  className="shrink-0"
                >
                  <Link
                    href={ctaUrl}
                    onClick={() => trackPlausible("banner")}
                  >
                    {ctaText ?? copy.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {ended && (
              <p className="relative mt-3 text-sm font-medium text-ink-muted">
                {copy.ended}
              </p>
            )}
          </div>
        </Container>
      </section>
    );
  }

  // ---------- INLINE (default) ----------
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-accent-200/70 bg-gradient-to-br from-amber-50 via-accent-50 to-orange-50 p-5 shadow-sm dark:border-accent-700/40 dark:from-amber-950/40 dark:via-accent-900/30 dark:to-orange-950/40 sm:p-6",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-800 dark:bg-accent-900/50 dark:text-accent-200">
          <Flame className="size-3" />
          {eventLabel}
        </span>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-ink-strong sm:text-xl">
          {copy.title}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{copy.subtitle}</p>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-4 grid grid-cols-4 gap-2 sm:gap-3"
          suppressHydrationWarning
        >
          {items.map((it) => (
            <Segment key={it.label} label={it.label} value={it.value} />
          ))}
        </div>

        <Button
          asChild
          variant="accent"
          size="md"
          className="mt-4 w-full sm:w-auto"
        >
          <Link href={ctaUrl} onClick={() => trackPlausible("inline")}>
            {ctaText ?? copy.cta}
            <ArrowRight className="size-4" />
          </Link>
        </Button>

        {ended && (
          <p className="mt-3 text-sm font-medium text-ink-muted">
            {copy.ended}
          </p>
        )}
      </div>
    </div>
  );
}

function Segment({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-0 flex-col items-center rounded-lg border border-border bg-white/70 px-2 py-2 shadow-sm backdrop-blur dark:bg-surface-subtle/80 sm:px-3 sm:py-2.5">
      <span
        className="font-mono text-xl font-bold leading-none tracking-tight tabular-nums text-ink-strong transition-transform duration-200 sm:text-2xl"
        suppressHydrationWarning
      >
        {pad(value)}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-ink-subtle sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}
