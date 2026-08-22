import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { TopVPNList } from "@/components/home/top-vpn-list";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/seo";
import { topRankedProducts } from "@/data/products";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import {
  absoluteUrl,
  bilingualAlternates,
  type Locale,
} from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviewsHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: bilingualAlternates("/en-iyi-vpn", locale, "en"),
    robots: locale === "de" ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/en-iyi-vpn", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ReviewsHubView />;
}

function ReviewsHubView() {
  const t = useTranslations("reviewsHub");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <>
      <JsonLd data={itemListSchema(topRankedProducts(locale), locale)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: tNav("reviews"), path: "/en-iyi-vpn" },
          ],
          locale,
        )}
      />

      <Container className="pt-12 sm:pt-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-brand-700">
            {t("breadcrumb")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-5 text-lg text-ink-muted">{t("intro")}</p>
        </header>
        <DataDisclaimer />
      </Container>

      <TopVPNList />
    </>
  );
}
