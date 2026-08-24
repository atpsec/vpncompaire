/**
 * Runtime routing is English-first, but the legacy Turkish and German types
 * remain available while old URLs are redirected to their English targets.
 */
export type Locale = "tr" | "en" | "de";
export type Localized<T> = { tr: T; en: T; de?: T };

export function pickLocale<T>(field: Localized<T>, locale: Locale): T {
  return field[locale] ?? field.en ?? field.tr;
}
