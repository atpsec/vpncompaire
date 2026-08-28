"use client";

import { useSyncExternalStore } from "react";

type Labels = {
  fingerprint: string;
  userAgent: string;
  screen: string;
  language: string;
  platform: string;
  unknown: string;
};

const EMPTY_SUBSCRIBE = () => () => {};
let cachedSnapshot: { unknown: string; value: BrowserInfo } | null = null;

export function BrowserFingerprint({ labels }: { labels: Labels }) {
  const info = useSyncExternalStore(
    EMPTY_SUBSCRIBE,
    () => getBrowserInfo(labels.unknown),
    () => null,
  );

  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-ink-strong">{labels.fingerprint}</h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Row label={labels.userAgent} value={info?.ua ?? "…"} mono />
        <Row label={labels.screen} value={info?.screen ?? "…"} mono />
        <Row label={labels.language} value={info?.lang ?? "…"} mono />
        <Row label={labels.platform} value={info?.platform ?? "…"} mono />
      </dl>
    </section>
  );
}

function getBrowserInfo(unknown: string): BrowserInfo {
  if (cachedSnapshot?.unknown === unknown) return cachedSnapshot.value;

  const value = {
    ua: navigator.userAgent || unknown,
    screen:
      typeof window.screen !== "undefined"
        ? `${window.screen.width} × ${window.screen.height}`
        : unknown,
    lang: navigator.language || unknown,
    platform: navigator.platform || unknown,
  };

  cachedSnapshot = { unknown, value };
  return value;
}

type BrowserInfo = {
  ua: string;
  screen: string;
  lang: string;
  platform: string;
};

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle">
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {label}
      </dt>
      <dd
        className={`mt-1 text-sm text-ink-strong ${mono ? "break-all font-mono" : ""}`}
        suppressHydrationWarning
      >
        {value}
      </dd>
    </div>
  );
}
