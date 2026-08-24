import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { WebRtcLeakTester } from "@/components/tools/WebRtcLeakTester";
import { ToolsCta } from "@/components/tools/ToolsCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools.webrtc" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/tools/webrtc-leak-test", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/tools/webrtc-leak-test", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WebRtcLeakView />;
}

function WebRtcLeakView() {
  const t = useTranslations("tools.webrtc");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("tools.common");
  const locale = useLocale();

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: absoluteUrl("/tools/webrtc-leak-test"),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const labels = {
    start: t("startButton"),
    loading: tCommon("loading"),
    resultsTitle: t("resultsTitle"),
    detectedIps: t("detectedIps"),
    localIp: t("localIp"),
    publicIp: t("publicIp"),
    noLeak: t("noLeak"),
    leakDetected: t("leakDetected"),
    noIps: t("noIps"),
    noLeakBody: t("noLeakBody"),
    leakBody: t("leakBody"),
    tryAgain: tCommon("tryAgain"),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: tNav("tools"), path: "/tools" },
            { name: t("breadcrumb"), path: "/tools/webrtc-leak-test" },
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
          <Link href="/tools" className="hover:text-ink">
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

        <WebRtcLeakTester labels={labels} />

        <section className="mt-12 rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="text-xl font-bold text-ink-strong">
            {t("fixTitle")}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-ink leading-relaxed">
            <li>{t("fixChrome")}</li>
            <li>{t("fixFirefox")}</li>
            <li>{t("fixBrave")}</li>
          </ul>
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
