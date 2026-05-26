import type { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];
export type Localized<T> = { tr: T; en: T };

export function pickLocale<T>(field: Localized<T>, locale: Locale): T {
  return field[locale] ?? field.tr;
}
