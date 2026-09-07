import { TrendingUp } from "lucide-react";

const FROGDR_PROFILE_URL =
  "https://frogdr.com/vpnadvisor.net?utm_source=vpnadvisor.net";
const DOMAIN_RATING = 1;

/**
 * Compact, linked external-profile badge for the site's recorded FrogDR metric.
 * Keep the metric in sync with the linked profile when the rating changes.
 */
export function DomainRatingBadge() {
  return (
    <a
      href={FROGDR_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-1.5 pr-4 shadow-sm transition hover:border-success-300 hover:shadow-md dark:hover:border-success-700"
      aria-label={`FrogDR domain metric for vpnadvisor.net: DR${DOMAIN_RATING}. View the public FrogDR profile.`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success-500 text-sm font-bold text-white shadow-sm">
        {DOMAIN_RATING}
      </span>
      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span className="text-sm font-semibold tracking-tight text-ink-strong">
          vpnadvisor.net
        </span>
        <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
          FrogDR domain metric
        </span>
      </span>
      <TrendingUp
        className="ml-1 size-6 shrink-0 text-ink-strong transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </a>
  );
}
