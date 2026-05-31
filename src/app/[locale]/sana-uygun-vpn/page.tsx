import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { VPNQuiz } from "@/components/quiz/vpn-quiz";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: absoluteUrl("/sana-uygun-vpn") },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: absoluteUrl("/sana-uygun-vpn"),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <QuizPageView />;
}

function QuizPageView() {
  const t = useTranslations("quiz");
  const tNav = useTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), path: "/" },
          { name: t("breadcrumb"), path: "/sana-uygun-vpn" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {tNav("home")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumb")}</span>
        </p>

        <header className="mt-6 text-center">
          <Badge variant="brand">
            <Sparkles className="size-3" /> {t("badge")}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </header>

        <VPNQuiz />

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("altDirectHeading")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("altLinks.top")}
            </Link>
            <Link
              href="/karsilastir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("altLinks.compare")}
            </Link>
            <Link
              href="/hesaplayici"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              {t("altLinks.calculator")}
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
