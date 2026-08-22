import { useLocale, useTranslations } from "next-intl";
import { Search, Home } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLocalizedLinkHref, type AppLocale } from "@/lib/i18n-paths";

export default function NotFoundPage() {
  const t = useTranslations("errors.notFound");
  const locale = useLocale() as AppLocale;
  const comparisonHref = getLocalizedLinkHref({ locale, section: "comparison" });
  const guideHref = getLocalizedLinkHref({ locale, section: "guide" });
  return (
    <Container size="md" className="py-20 sm:py-32">
      <div className="text-center">
        <p className="text-sm font-mono tracking-widest text-brand-700">{t("code")}</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          {t("h1")}
        </h1>
        <p className="mt-4 text-lg text-ink-muted max-w-xl mx-auto">
          {t("lede")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="primary">
            <Link href="/">
              <Home className="size-4" /> {t("ctaHome")}
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/en-iyi-vpn">
              <Search className="size-4" /> {t("ctaReviews")}
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <h2 className="font-semibold text-ink-strong">{t("cards.reviews.title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {t("cards.reviews.desc")}
          </p>
          <Link
            href="/en-iyi-vpn"
            className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
          >
            {t("cards.reviews.link")}
          </Link>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-ink-strong">{t("cards.compare.title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {t("cards.compare.desc")}
          </p>
          <Link
            href={comparisonHref}
            className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
          >
            {t("cards.compare.link")}
          </Link>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-ink-strong">{t("cards.guides.title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {t("cards.guides.desc")}
          </p>
          <Link
            href={guideHref}
            className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
          >
            {t("cards.guides.link")}
          </Link>
        </Card>
      </div>
    </Container>
  );
}

