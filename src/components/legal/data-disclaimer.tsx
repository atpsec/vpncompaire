import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { Link } from "@/i18n/routing";

type Props = {
  verifiedAt?: string;
  variant?: "inline" | "card";
};

export function DataDisclaimer({ verifiedAt, variant = "card" }: Props) {
  const t = useTranslations("legalNotices.dataDisclaimer");

  const text = t.rich("body", {
    legal: (chunks) => (
      <Link
        href="/yasal-uyari"
        className="font-medium text-brand-700 hover:underline whitespace-nowrap"
      >
        {chunks}
      </Link>
    ),
    disclosure: (chunks) => (
      <Link
        href="/reklam-aciklamasi"
        className="font-medium text-brand-700 hover:underline whitespace-nowrap"
      >
        {chunks}
      </Link>
    ),
  });

  if (variant === "inline") {
    return (
      <p className="text-xs text-ink-muted leading-relaxed">
        {verifiedAt ? (
          <span className="font-medium text-ink">
            {t("lastChecked")} {verifiedAt}.
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
              {t("lastChecked")} {verifiedAt}.{" "}
            </span>
          ) : null}
          {text}
        </p>
      </div>
    </div>
  );
}
