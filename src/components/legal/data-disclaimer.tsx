import { Info } from "lucide-react";
import { Link } from "@/i18n/routing";

type Props = {
  /** Optional last-verified date, e.g. "2026-05-25" */
  verifiedAt?: string;
  variant?: "inline" | "card";
};

/**
 * Soft disclaimer placed at the top of review/comparison/pricing pages.
 * States that provider data can change and links to legal pages.
 */
export function DataDisclaimer({ verifiedAt, variant = "card" }: Props) {
  const text = (
    <>
      Fiyatlar, özellikler, denetim raporları ve gizlilik politikaları
      sağlayıcı tarafından haber verilmeksizin değiştirilebilir. Satın
      almadan önce ilgili VPN sağlayıcısının resmi sitesinden güncel
      bilgileri doğrulamanı öneririz. Detaylar için{" "}
      <Link
        href="/yasal-uyari"
        className="font-medium text-brand-700 hover:underline whitespace-nowrap"
      >
        yasal uyarı
      </Link>{" "}
      ve{" "}
      <Link
        href="/reklam-aciklamasi"
        className="font-medium text-brand-700 hover:underline whitespace-nowrap"
      >
        reklam açıklaması
      </Link>
      .
    </>
  );

  if (variant === "inline") {
    return (
      <p className="text-xs text-ink-muted leading-relaxed">
        {verifiedAt ? (
          <span className="font-medium text-ink">
            Son kontrol: {verifiedAt}.
          </span>
        ) : null}{" "}
        {text}
      </p>
    );
  }

  return (
    <div className="mt-6 rounded-lg border border-border bg-surface-subtle/40 p-4">
      <div className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted">
        <Info
          className="mt-0.5 size-4 shrink-0 text-brand-600"
          aria-hidden="true"
        />
        <p>
          {verifiedAt ? (
            <span className="font-semibold text-ink">
              Son kontrol: {verifiedAt}.{" "}
            </span>
          ) : null}
          {text}
        </p>
      </div>
    </div>
  );
}
