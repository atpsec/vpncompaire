import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import trMessages from "../../../messages/tr.json";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { VpnIpDiagnostic } from "@/components/tools/VpnIpDiagnostic";
import { ToolsCta } from "@/components/tools/ToolsCta";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipToContent } from "@/components/layout/skip-to-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "tr", namespace: "tools.vpnTest" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/vpn-test", "tr"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/vpn-test", "tr"),
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <NextIntlClientProvider locale="tr" messages={trMessages}>
      <SkipToContent />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <VpnTestView />
        </main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}

function VpnTestView() {
  const t = trMessages.tools.vpnTest;
  const tNav = trMessages.nav;
  const tCommon = trMessages.tools.common;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t.metaTitle,
    description: t.metaDescription,
    url: absoluteUrl("/vpn-test"),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const labels = {
    locale: "tr",
    loading: tCommon.loading,
    runAgain: tCommon.tryAgain,
    checking: t.checking,
    errorTitle: t.errorTitle,
    errorBody: t.errorBody,
    rateLimitedBody: t.rateLimitedBody,
    degradedNote: t.degradedNote,
    privacyNote: t.privacyNote,
    lastChecked: t.lastChecked,
    unknown: t.unknown,
    publicIp: t.publicIp,
    country: t.country,
    city: t.city,
    isp: t.isp,
    asn: t.asn,
    networkType: t.networkType,
    detectionTitle: t.detectionTitle,
    detectionDetected: t.detectionDetected,
    detectionClear: t.detectionClear,
    detectionUnavailable: t.detectionUnavailable,
    detectionCaveat: t.detectionCaveat,
    signals: {
      datacenter: t.signals.datacenter,
      proxy: t.signals.proxy,
      vpn: t.signals.vpn,
      tor: t.signals.tor,
    },
    signalYes: t.signalYes,
    signalNo: t.signalNo,
    signalUnknown: t.signalUnknown,
    copy: tCommon.copy,
    copied: tCommon.copied,
    reportCopy: tCommon.copy,
    reportCopied: tCommon.copied,
    reportDownload: tCommon.downloadReport,
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav.home, path: "/" },
            { name: tNav.tools, path: "/tools" },
            { name: t.breadcrumb, path: "/vpn-test" },
          ],
          "tr",
        )}
      />
      <JsonLd data={webAppSchema} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {tNav.home}
          </Link>{" "}
          ›{" "}
          <Link href="/tools" className="hover:text-ink">
            {tNav.tools}
          </Link>{" "}
          › <span className="text-ink-strong">{t.breadcrumb}</span>
        </p>

        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            {t.subtitle}
          </p>
        </header>

        <VpnIpDiagnostic labels={labels} />

        <section className="mt-10 rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="text-xl font-bold text-ink-strong">
            {t.explainTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-ink">{t.explainBody}</p>
        </section>

        <ToolsCta
          title={tCommon.ctaTitle}
          body={tCommon.ctaBody}
          buttonLabel={tCommon.ctaButton}
        />
      </Container>
    </>
  );
}
