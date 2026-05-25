import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { Link } from "@/i18n/routing";

export function DisclosureBanner() {
  const t = useTranslations("disclosure");

  return (
    <div className="border-b border-border bg-accent-50/60 text-ink-muted">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed">
          <Info
            className="mt-0.5 size-4 shrink-0 text-accent-600"
            aria-hidden="true"
          />
          <p>
            <span className="hidden sm:inline">{t("banner")}</span>
            <span className="sm:hidden">{t("short")}</span>{" "}
            <Link
              href="/reklam-aciklamasi"
              className="font-medium text-brand-700 hover:underline whitespace-nowrap"
            >
              {t("learnMore")} →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
