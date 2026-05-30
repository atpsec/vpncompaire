"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  initialIso: string;
  timezone: string;
  locale: string;
};

export function IpSecurityBannerClock({ initialIso, timezone, locale }: Props) {
  const [now, setNow] = useState(() => new Date(initialIso));

  useEffect(() => {
    const id = setInterval(() => {
      setNow((prev) => {
        const next = new Date();
        return Math.floor(next.getTime() / 60_000) ===
          Math.floor(prev.getTime() / 60_000)
          ? prev
          : next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now),
    [now, timezone, locale],
  );

  const dateLine = useMemo(() => {
    try {
      const weekday = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        weekday: "long",
      }).format(now);
      const date = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);
      return `${weekday} · ${date}`;
    } catch {
      return now.toISOString().slice(0, 10);
    }
  }, [now, timezone, locale]);

  return (
    <>
      <p className="font-mono text-2xl font-bold tracking-tight tabular-nums text-ink-strong">
        <time suppressHydrationWarning>{time}</time>
      </p>
      <p
        className="mt-1 text-sm text-ink-subtle"
        suppressHydrationWarning
      >
        {dateLine}
      </p>
    </>
  );
}
