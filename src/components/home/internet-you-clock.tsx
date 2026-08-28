"use client";

import { useEffect, useState } from "react";

type ClockValue = {
  digital: string;
  hour: number;
  minute: number;
  second: number;
};

type InternetYouClockProps = {
  timeZone: string | null;
  digitalLabel: string;
  analogLabel: string;
  unavailableLabel: string;
};

function readClock(timeZone: string): ClockValue | null {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    const parts = formatter.formatToParts(now);
    const valueFor = (type: "hour" | "minute" | "second") =>
      Number(parts.find((part) => part.type === type)?.value);
    const hour = valueFor("hour");
    const minute = valueFor("minute");
    const second = valueFor("second");

    if (![hour, minute, second].every(Number.isFinite)) return null;

    return {
      digital: formatter.format(now),
      hour,
      minute,
      second,
    };
  } catch {
    return null;
  }
}

export function InternetYouClock({
  timeZone,
  digitalLabel,
  analogLabel,
  unavailableLabel,
}: InternetYouClockProps) {
  const [clock, setClock] = useState<ClockValue | null>(null);

  useEffect(() => {
    const update = () => setClock(timeZone ? readClock(timeZone) : null);
    update();
    const intervalId = window.setInterval(update, 1000);

    return () => window.clearInterval(intervalId);
  }, [timeZone]);

  const hourDegrees = clock
    ? ((clock.hour % 12) + clock.minute / 60) * 30
    : 0;
  const minuteDegrees = clock
    ? (clock.minute + clock.second / 60) * 6
    : 0;
  const secondDegrees = clock ? clock.second * 6 : 0;

  return (
    <div className="flex min-w-0 items-center gap-3" aria-live="polite">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          {digitalLabel}
        </p>
        <p className="mt-1 font-mono text-xl font-bold tabular-nums text-ink-strong">
          {clock?.digital ?? "— — : — —"}
        </p>
        <p className="mt-1 max-w-32 truncate text-[11px] text-ink-subtle">
          {timeZone ?? unavailableLabel}
        </p>
      </div>

      <div
        className="relative size-14 shrink-0 rounded-full border-2 border-brand-200 bg-white shadow-sm dark:border-brand-800 dark:bg-surface-base"
        role="img"
        aria-label={`${analogLabel}: ${clock?.digital ?? unavailableLabel}`}
      >
        <span className="absolute inset-1 rounded-full border border-border" />
        {[0, 1, 2, 3, 4, 5].map((tick) => (
          <span
            key={tick}
            className="absolute left-1/2 top-1/2 h-1 w-px origin-[50%_25px] bg-ink-subtle"
            style={{ transform: `translate(-50%, -25px) rotate(${tick * 60}deg)` }}
          />
        ))}
        <span
          className="absolute left-1/2 top-1/2 h-[17px] w-0.5 origin-bottom rounded-full bg-ink-strong"
          style={{ transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)` }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-[22px] w-px origin-bottom rounded-full bg-brand-600"
          style={{ transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)` }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-[23px] w-px origin-bottom rounded-full bg-accent-500"
          style={{ transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)` }}
        />
        <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600" />
      </div>
    </div>
  );
}
