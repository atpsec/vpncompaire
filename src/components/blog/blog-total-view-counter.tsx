"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type BlogTotalViewCounterProps = {
  label: string;
  loadingLabel: string;
  locale: string;
};

type TotalViewsResponse = {
  views?: unknown;
};

function readCount(value: TotalViewsResponse): number | null {
  return typeof value.views === "number" && Number.isSafeInteger(value.views) && value.views >= 0
    ? value.views
    : null;
}

export function BlogTotalViewCounter({
  label,
  loadingLabel,
  locale,
}: BlogTotalViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    void fetch("/api/blog-views/total", {
      cache: "no-store",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
      referrerPolicy: "no-referrer",
    })
      .then(async (response) =>
        response.ok ? readCount((await response.json()) as TotalViewsResponse) : null,
      )
      .then((count) => {
        if (active && count !== null) setViews(count);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-brand-800 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-200"
      aria-live="polite"
      aria-busy={views === null}
    >
      <Eye className="size-3.5" aria-hidden="true" />
      <span className="font-semibold text-foreground">
        {views === null ? "…" : views.toLocaleString(locale)}
      </span>
      <span>{views === null ? loadingLabel : label}</span>
    </div>
  );
}
