import { useTranslations } from "next-intl";
import { Tag } from "lucide-react";
import { Link } from "@/i18n/routing";

export function AffiliateNotice() {
  const t = useTranslations("legalNotices.affiliate");
  return (
    <p className="text-[11px] text-ink-subtle leading-relaxed">
      <Tag className="inline-block size-3 mr-1 text-accent-600" aria-hidden />
      {t("prefix")}{" "}
      <Link href="/affiliate-disclosure" className="underline hover:text-ink">
        {t("detail")}
      </Link>
    </p>
  );
}
