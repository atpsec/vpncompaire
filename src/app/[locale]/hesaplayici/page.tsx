import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Calculator } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { CostCalculator } from "@/components/calc/cost-calculator";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculator" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/hesaplayici", locale),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: absoluteUrl("/hesaplayici", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CalculatorPageView />;
}

function CalculatorPageView() {
  const t = useTranslations("calculator");
  const tNav = useTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), path: "/" },
          { name: t("breadcrumb"), path: "/hesaplayici" },
        ])}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {tNav("home")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumb")}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Calculator className="size-3" /> {t("badgeLabel")}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-ink-muted max-w-3xl">{t("intro")}</p>
        </header>

        <CostCalculator />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>{t("howSection.calcTitle")}</h2>
          <p>{t("howSection.calcBody")}</p>

          <h2>{t("howSection.trapTitle")}</h2>
          <ol>
            <li>
              <strong>{t("howSection.trap1Bold")}</strong>
              {t("howSection.trap1Body")}
            </li>
            <li>
              <strong>{t("howSection.trap2Bold")}</strong>
              {t("howSection.trap2Body")}
            </li>
            <li>
              <strong>{t("howSection.trap3Bold")}</strong>
              {t("howSection.trap3Body")}
            </li>
          </ol>

          <h2>{t("howSection.termsTitle")}</h2>
          <ul>
            <li>
              <strong>{t("howSection.term1Bold")}</strong>
              {t("howSection.term1Body")}
            </li>
            <li>
              <strong>{t("howSection.term2Bold")}</strong>
              {t("howSection.term2Body")}
            </li>
            <li>
              <strong>{t("howSection.term3Bold")}</strong>
              {t("howSection.term3Body")}
            </li>
          </ul>
        </article>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("altDirectHeading")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/sana-uygun-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("altLinks.quiz")}
            </Link>
            <Link
              href="/karsilastir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("altLinks.compare")}
            </Link>
            <Link
              href="/sunucu-haritasi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("altLinks.filter")}
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
