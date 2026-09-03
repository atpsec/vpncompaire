"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";

const ENGAGED_READER_DELAY_MS = 8_000;
const recordedThisTab = new Set<string>();
const pendingRecordRequests = new Map<string, Promise<number | null>>();

type ViewResponse = {
  views?: unknown;
};

function readCount(value: ViewResponse): number | null {
  return typeof value.views === "number" && Number.isSafeInteger(value.views) && value.views >= 0
    ? value.views
    : null;
}

async function requestCount(slug: string, method: "GET" | "POST"): Promise<number | null> {
  try {
    const response = await fetch(`/api/blog-views/${encodeURIComponent(slug)}`, {
      method,
      cache: "no-store",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
      keepalive: method === "POST",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) return null;
    return readCount((await response.json()) as ViewResponse);
  } catch {
    return null;
  }
}

function recordCountOnce(slug: string): Promise<number | null> {
  const pending = pendingRecordRequests.get(slug);
  if (pending) return pending;

  const request = requestCount(slug, "POST").finally(() => {
    pendingRecordRequests.delete(slug);
  });
  pendingRecordRequests.set(slug, request);
  return request;
}

export function BlogViewCounter({ slug }: { slug: string }) {
  const t = useTranslations("blog");
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    let timerId: number | null = null;

    void requestCount(slug, "GET").then((count) => {
      if (active && count !== null) setViews(count);
    });

    const cancelTimer = () => {
      if (timerId !== null) window.clearTimeout(timerId);
      timerId = null;
    };

    const startTimer = () => {
      cancelTimer();
      if (document.visibilityState !== "visible" || recordedThisTab.has(slug)) return;

      timerId = window.setTimeout(() => {
        recordedThisTab.add(slug);
        void recordCountOnce(slug).then((count) => {
          if (active && count !== null) {
            setViews(count);
          } else if (count === null) {
            recordedThisTab.delete(slug);
            // A transient network/KV failure should not permanently disable
            // this article's counter for the current visit.
            if (active) startTimer();
          }
        });
      }, ENGAGED_READER_DELAY_MS);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") startTimer();
      else cancelTimer();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    startTimer();

    return () => {
      active = false;
      cancelTimer();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [slug]);

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-200"
      aria-live="polite"
      aria-busy={views === null}
    >
      <Eye className="size-3.5" aria-hidden="true" />
      <span>{views === null ? t("viewsLoading") : t("views", { count: views })}</span>
    </div>
  );
}
