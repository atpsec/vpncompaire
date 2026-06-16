import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { SpeedTester } from "@/components/tools/SpeedTester";
import { ToolsCta } from "@/components/tools/ToolsCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools.speed" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/araclar/vpn-hiz-testi", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/araclar/vpn-hiz-testi", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SpeedTestView />;
}

function SpeedTestView() {
  const t = useTranslations("tools.speed");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("tools.common");
  const locale = useLocale();

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: absoluteUrl("/araclar/vpn-hiz-testi"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const labels = {
    start: t("startButton"),
    loading: tCommon("loading"),
    tryAgain: tCommon("tryAgain"),
    downloadSpeed: t("downloadSpeed"),
    latency: t("latency"),
    fileSize: t("fileSize"),
    error: t("error"),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: tNav("tools"), path: "/araclar" },
            { name: t("breadcrumb"), path: "/araclar/vpn-hiz-testi" },
          ],
          locale as "tr" | "en" | "de",
        )}
      />
      <JsonLd data={webAppSchema} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {tNav("home")}
          </Link>{" "}
          ›{" "}
          <Link href="/araclar" className="hover:text-ink">
            {tNav("tools")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumb")}</span>
        </p>

        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base text-ink-muted">{t("subtitle")}</p>
        </header>

        <SpeedTester labels={labels} />

        <section className="mt-12 rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="text-xl font-bold text-ink-strong">
            {t("embedTitle")}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">{t("embedNote")}</p>
          <a
            href="https://speed.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
          >
            {t("openCloudflare")}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="text-xl font-bold text-ink-strong">
            {t("explainTitle")}
          </h2>
          <p className="mt-3 leading-relaxed text-ink">{t("explainBody")}</p>
        </section>

        <p className="mt-6 text-xs text-ink-muted">{tCommon("privacyNote")}</p>

        <ToolsCta
          title={tCommon("ctaTitle")}
          body={tCommon("ctaBody")}
          buttonLabel={tCommon("ctaButton")}
        />
      </Container>
    </>
  );
}
