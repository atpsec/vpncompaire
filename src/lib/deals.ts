/**
 * Deal calendar helper.
 *
 * Returns the currently active "discount event" for the year, used by the
 * DealCountdown marketing component to create urgency on review/landing pages.
 *
 * Calendar (UTC):
 * - Black Friday: last Friday of November → end of day
 * - Cyber Monday: Monday after Black Friday → end of day
 * - Christmas: Dec 20 – Dec 26
 * - New Year: Dec 27 – Dec 31 (default fallback for "year-end")
 *
 * If none of the dated windows are active, falls back to a generic
 * "year-end" deal that ends on Dec 31 23:59:59 UTC.
 */
export type DealEventName =
  | "black-friday"
  | "cyber-monday"
  | "christmas"
  | "new-year"
  | "year-end";

export type DealEvent = {
  name: DealEventName;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
};

function utc(
  year: number,
  monthIndex: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
): Date {
  return new Date(Date.UTC(year, monthIndex, day, hour, minute, second));
}

/** Last Friday of November in the given year (UTC). */
function lastFridayOfNovember(year: number): Date {
  // Nov has 30 days. Find the last day of Nov and walk back to Friday.
  const lastDay = utc(year, 10, 30); // November = 10
  const dow = lastDay.getUTCDay(); // 0 Sun, 5 Fri
  const offset = (dow - 5 + 7) % 7;
  return utc(year, 10, 30 - offset);
}

export function getCurrentDealEvent(now: Date = new Date()): DealEvent {
  const year = now.getUTCFullYear();

  const bfStart = lastFridayOfNovember(year);
  const bfEnd = utc(
    bfStart.getUTCFullYear(),
    bfStart.getUTCMonth(),
    bfStart.getUTCDate(),
    23,
    59,
    59,
  );

  const cmStart = utc(
    bfStart.getUTCFullYear(),
    bfStart.getUTCMonth(),
    bfStart.getUTCDate() + 3,
  );
  const cmEnd = utc(
    cmStart.getUTCFullYear(),
    cmStart.getUTCMonth(),
    cmStart.getUTCDate(),
    23,
    59,
    59,
  );

  const xmasStart = utc(year, 11, 20);
  const xmasEnd = utc(year, 11, 26, 23, 59, 59);

  const newYearStart = utc(year, 11, 27);
  const newYearEnd = utc(year, 11, 31, 23, 59, 59);

  const within = (start: Date, end: Date) => now >= start && now <= end;

  if (within(bfStart, bfEnd)) {
    return {
      name: "black-friday",
      startDate: bfStart,
      endDate: bfEnd,
      isActive: true,
    };
  }
  if (within(cmStart, cmEnd)) {
    return {
      name: "cyber-monday",
      startDate: cmStart,
      endDate: cmEnd,
      isActive: true,
    };
  }
  if (within(xmasStart, xmasEnd)) {
    return {
      name: "christmas",
      startDate: xmasStart,
      endDate: xmasEnd,
      isActive: true,
    };
  }
  if (within(newYearStart, newYearEnd)) {
    return {
      name: "new-year",
      startDate: newYearStart,
      endDate: newYearEnd,
      isActive: true,
    };
  }

  // Fallback: "year-end" — always points to Dec 31 of the current year.
  // If we are already past Dec 31 UTC (rare edge during the second between
  // years), roll forward.
  let endYear = year;
  const yearEndCandidate = utc(year, 11, 31, 23, 59, 59);
  if (now > yearEndCandidate) endYear = year + 1;
  const yearEndStart = utc(endYear, 0, 1);
  const yearEndEnd = utc(endYear, 11, 31, 23, 59, 59);

  return {
    name: "year-end",
    startDate: yearEndStart,
    endDate: yearEndEnd,
    isActive: false,
  };
}
