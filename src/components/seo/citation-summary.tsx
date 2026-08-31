import { FileCheck2 } from "lucide-react";

type CitationSummaryProps = {
  title: string;
  intro: string;
  points: readonly string[];
};

/**
 * A compact, human-first answer block for pages that are likely to be cited.
 * It keeps the core answer in visible server-rendered HTML and makes the
 * evidence boundary explicit without adding AI-specific markup.
 */
export function CitationSummary({
  title,
  intro,
  points,
}: CitationSummaryProps) {
  return (
    <aside
      aria-labelledby="source-summary-heading"
      className="mt-8 rounded-2xl border border-brand-200 bg-brand-50/40 p-5 sm:p-6 dark:bg-brand-950/20"
    >
      <div className="flex items-start gap-3">
        <FileCheck2
          className="mt-0.5 size-5 shrink-0 text-brand-700"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Source-led answer
          </p>
          <h2
            id="source-summary-heading"
            className="mt-1 text-xl font-bold tracking-tight text-ink-strong"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">{intro}</p>
          <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-ink sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="rounded-lg border border-brand-200/70 bg-surface-base/80 p-3">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
