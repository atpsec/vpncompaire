import { useLocale } from "next-intl";
import { Info } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/lib/site";

type Props = {
  verifiedAt?: string;
  variant?: "inline" | "card";
};

const copy = {
  tr: {
    checked: "Veri kontrol tarihi:",
    body: "Fiyatlar ve sağlayıcı özellikleri zamanla değişebilir. Bu sayfadaki bilgiler resmi sağlayıcı kaynakları ve uygun olduğunda bağımsız doğrulamalar temel alınarak derlenir; laboratuvar testi veya kullanıcı puanı değildir.",
    methodology: "Metodoloji",
    disclosure: "Reklam açıklaması",
  },
  en: {
    checked: "Data checked:",
    body: "Pricing and provider features can change. Information on this page is compiled from official provider sources and, where available, independent verification; it is not a laboratory test or user rating.",
    methodology: "Methodology",
    disclosure: "Advertising disclosure",
  },
  de: {
    checked: "Daten geprüft:",
    body: "Preise und Anbietermerkmale können sich ändern. Die Informationen auf dieser Seite werden aus offiziellen Anbieterquellen und, wenn verfügbar, unabhängiger Verifikation zusammengestellt; sie sind kein Labortest und keine Nutzerbewertung.",
    methodology: "Methodik",
    disclosure: "Werbehinweis",
  },
} as const;

export function DataDisclaimer({ verifiedAt, variant = "card" }: Props) {
  const rawLocale = useLocale();
  const locale = (rawLocale === "en" || rawLocale === "de" ? rawLocale : "tr") as Locale;
  const t = copy[locale];

  const content = (
    <>
      {verifiedAt ? <span className="font-semibold text-ink">{t.checked} {verifiedAt}. </span> : null}
      {t.body}{" "}
      <Link href="/metodoloji" className="font-medium text-brand-700 hover:underline whitespace-nowrap">{t.methodology}</Link>{" · "}
      <Link href="/reklam-aciklamasi" className="font-medium text-brand-700 hover:underline whitespace-nowrap">{t.disclosure}</Link>
    </>
  );

  if (variant === "inline") {
    return <p className="text-xs text-ink-muted leading-relaxed">{content}</p>;
  }

  return (
    <div className="mt-6 rounded-lg border border-border bg-surface-subtle/40 p-4">
      <div className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted">
        <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
        <p>{content}</p>
      </div>
    </div>
  );
}
