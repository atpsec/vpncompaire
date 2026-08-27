import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { VpnIpDiagnostic } from "@/components/tools/VpnIpDiagnostic";
import { ToolsCta } from "@/components/tools/ToolsCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools.vpnTest" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/vpn-test", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/vpn-test", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VpnTestView locale={locale} />;
}

function VpnTestView({ locale }: { locale: string }) {
  const t = useTranslations("tools.vpnTest");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("tools.common");

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: absoluteUrl("/vpn-test", locale as "tr" | "en" | "de"),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const labels = {
    locale,
    loading: tCommon("loading"),
    runAgain: tCommon("tryAgain"),
    checking: t("checking"),
    errorTitle: t("errorTitle"),
    errorBody: t("errorBody"),
    rateLimitedBody: t("rateLimitedBody"),
    degradedNote: t("degradedNote"),
    privacyNote: t("privacyNote"),
    lastChecked: t("lastChecked"),
    unknown: t("unknown"),
    publicIp: t("publicIp"),
    country: t("country"),
    city: t("city"),
    isp: t("isp"),
    asn: t("asn"),
    networkType: t("networkType"),
    detectionTitle: t("detectionTitle"),
    detectionDetected: t("detectionDetected"),
    detectionClear: t("detectionClear"),
    detectionUnavailable: t("detectionUnavailable"),
    detectionCaveat: t("detectionCaveat"),
    signals: {
      datacenter: t("signals.datacenter"),
      proxy: t("signals.proxy"),
      vpn: t("signals.vpn"),
      tor: t("signals.tor"),
    },
    signalYes: t("signalYes"),
    signalNo: t("signalNo"),
    signalUnknown: t("signalUnknown"),
    copy: tCommon("copy"),
    copied: tCommon("copied"),
    reportCopy: tCommon("copy"),
    reportCopied: tCommon("copied"),
    reportDownload: tCommon("downloadReport"),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: tNav("tools"), path: "/tools" },
            { name: t("breadcrumb"), path: "/vpn-test" },
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
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            {t("subtitle")}
          </p>
        </header>

        <VpnIpDiagnostic labels={labels} />

        <section className="mt-10 rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="text-xl font-bold text-ink-strong">
            {t("explainTitle")}
          </h2>
          <p className="mt-3 leading-relaxed text-ink">{t("explainBody")}</p>
        </section>

        <ToolsCta
          title={tCommon("ctaTitle")}
          body={tCommon("ctaBody")}
          buttonLabel={tCommon("ctaButton")}
        />
      </Container>
    </>
  );
}
