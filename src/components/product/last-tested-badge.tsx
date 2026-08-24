"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  CalendarCheck,
  ChevronDown,
  Globe2,
  Hourglass,
  Quote,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type LastTestedBadgeProps = {
  lastTestedAt: string;
  testEnvironment?: {
    testerLocation: string;
    vpnVersion: string;
    testDuration: string;
  };
  editorNotes?: string;
  className?: string;
};

export function LastTestedBadge({
  lastTestedAt,
  testEnvironment,
  editorNotes,
  className,
}: LastTestedBadgeProps) {
  const locale = useLocale();
  const t = useTranslations("lastTested");
  const [open, setOpen] = useState(false);

  if (!lastTestedAt) return null;

  const formatter = new Intl.DateTimeFormat(
    locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
  const formattedDate = formatter.format(new Date(lastTestedAt));

  const hasDetails = Boolean(testEnvironment);
  const detailsId = "last-tested-details";

  return (
    <section
      aria-label={t("label")}
      className={cn(
        "mt-6 rounded-xl border border-success-200 bg-success-50/70 p-4 sm:p-5",
        "dark:border-success-700/40 dark:bg-success-900/20",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full",
            "bg-success-100 text-success-700",
            "dark:bg-success-800/40 dark:text-success-300",
          )}
        >
          <ShieldCheck className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-success-700 dark:text-success-300">
              {t("label")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-strong dark:text-ink">
              <CalendarCheck
                className="size-4 text-success-600 dark:text-success-400"
                aria-hidden="true"
              />
              <time dateTime={lastTestedAt}>{formattedDate}</time>
            </span>
          </div>

          {hasDetails && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={detailsId}
              className={cn(
                "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                "text-success-700 hover:text-success-800",
                "dark:text-success-300 dark:hover:text-success-200",
              )}
            >
              {t("environment")}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
          )}

          {hasDetails && open && (
            <dl
              id={detailsId}
              className={cn(
                "mt-3 grid gap-2 rounded-lg border border-success-200/70 bg-white/70 p-3 text-xs sm:grid-cols-3",
                "dark:border-success-700/40 dark:bg-success-950/30",
              )}
            >
              <EnvRow
                icon={<Globe2 className="size-3.5" aria-hidden="true" />}
                label={t("testerLocation")}
                value={testEnvironment!.testerLocation}
              />
              <EnvRow
                icon={<Tag className="size-3.5" aria-hidden="true" />}
                label={t("vpnVersion")}
                value={testEnvironment!.vpnVersion}
              />
              <EnvRow
                icon={<Hourglass className="size-3.5" aria-hidden="true" />}
                label={t("testDuration")}
                value={testEnvironment!.testDuration}
              />
            </dl>
          )}

          {editorNotes && (
            <figure
              className={cn(
                "mt-3 border-l-2 border-success-400 pl-3",
                "dark:border-success-500/60",
              )}
            >
              <figcaption className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-success-700 dark:text-success-300">
                <Quote className="size-3" aria-hidden="true" />
                {t("editorNote")}
              </figcaption>
              <blockquote className="mt-1 text-sm italic leading-relaxed text-ink dark:text-ink-muted">
                {editorNotes}
              </blockquote>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

function EnvRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-ink-subtle">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 break-words font-medium text-ink-strong dark:text-ink">
        {value}
      </dd>
    </div>
  );
}
