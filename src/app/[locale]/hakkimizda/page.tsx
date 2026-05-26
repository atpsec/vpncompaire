import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Eye, Scale, FileSearch, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbHere"), path: "/hakkimizda" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumbHome")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumbHere")}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">{t("badge")}</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1", { site: siteConfig.name })}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            {t.rich("lede", {
              site: siteConfig.name,
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <p className="text-sm text-ink leading-relaxed">
            <strong className="text-ink-strong">{t("explainer.title")}</strong>{" "}
            {t.rich("explainer.body", {
              site: siteConfig.name,
              disclosure: (chunks) => (
                <Link href="/reklam-aciklamasi">{chunks}</Link>
              ),
              legal: (chunks) => <Link href="/yasal-uyari">{chunks}</Link>,
            })}
          </p>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{t("approach.h2")}</h2>
          <p>{t("approach.body")}</p>

          <h2>{t("principlesH2")}</h2>
        </article>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <ShieldCheck className="size-7 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              {t("principles.transparent.title")}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              {t("principles.transparent.body")}
            </p>
          </Card>
          <Card className="p-5">
            <Eye className="size-7 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              {t("principles.independence.title")}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              {t("principles.independence.body")}
            </p>
          </Card>
          <Card className="p-5">
            <FileSearch className="size-7 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              {t("principles.evidence.title")}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              {t("principles.evidence.body")}
            </p>
          </Card>
        </div>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>{t("howWeTest.h2")}</h2>
          <p>
            {t.rich("howWeTest.body", {
              methodology: (chunks) => <Link href="/metodoloji">{chunks}</Link>,
            })}
          </p>

          <h2>{t("revenue.h2")}</h2>
          <p>
            {t.rich("revenue.body1", {
              disclosure: (chunks) => (
                <Link href="/reklam-aciklamasi">{chunks}</Link>
              ),
            })}
          </p>
          <p>
            {t.rich("revenue.body2", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          <h2>{t("authors.h2")}</h2>
          <p>{t("authors.body", { site: siteConfig.name })}</p>

          <h2>{t("why.h2")}</h2>
          <p>{t("why.body", { site: siteConfig.name })}</p>

          <h2>{t("contactSection.h2")}</h2>
          <p>
            {t.rich("contactSection.body", {
              contact: (chunks) => <Link href="/iletisim">{chunks}</Link>,
            })}
          </p>
        </article>

        <Card className="mt-12 p-6 bg-brand-50/40 text-center">
          <Mail className="size-6 text-brand-600 mx-auto" />
          <p className="mt-3 font-semibold text-ink-strong">
            {t("errorCard.title")}
          </p>
          <p className="mt-1 text-sm text-ink-muted">{t("errorCard.body")}</p>
          <Link
            href="/iletisim"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
          >
            {t("errorCard.cta")}
          </Link>
        </Card>

        <section className="mt-12 flex flex-wrap gap-2 justify-center">
          <Link
            href="/metodoloji"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
          >
            <Scale className="size-3" /> {t("footerLinks.methodology")}
          </Link>
          <Link
            href="/reklam-aciklamasi"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
          >
            {t("footerLinks.disclosure")}
          </Link>
          <Link
            href="/gizlilik"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
          >
            {t("footerLinks.privacy")}
          </Link>
        </section>
      </Container>
    </>
  );
}
