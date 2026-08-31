import { useTranslations } from "next-intl";
import { Tag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type AffiliateNoticeProps = {
  className?: string;
  variant?: "plain" | "surface";
};

export function AffiliateNotice({
  className,
  variant = "plain",
}: AffiliateNoticeProps = {}) {
  const t = useTranslations("legalNotices.affiliate");
  return (
    <aside
      aria-label={t("label")}
      className={cn(
        "flex items-start gap-2 text-xs leading-relaxed text-ink-subtle",
        variant === "surface" &&
          "rounded-lg border border-border/80 bg-surface-subtle/45 px-3 py-2.5",
        className,
      )}
    >
      <Tag className="mt-0.5 size-3.5 shrink-0 text-accent-600" aria-hidden />
      <p>
        <span className="font-semibold text-ink-muted">{t("label")}:</span>{" "}
        {t("prefix")}{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
        >
          {t("detail")}
        </Link>
      </p>
    </aside>
  );
}
