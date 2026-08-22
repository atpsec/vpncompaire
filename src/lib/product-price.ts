import type { Locale } from "@/lib/site";
import type { PriceCurrency } from "@/data/products";

export function formatProductPrice(
  amount: number,
  currency: PriceCurrency,
  locale: Locale = "en",
): string {
  const intlLocale = locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US";
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatProductPriceShort(amount: number, currency: PriceCurrency): string {
  return `${currency === "EUR" ? "€" : "$"}${amount.toFixed(2)}`;
}
