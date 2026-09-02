import type { Metadata } from "next";
import { headers } from "next/headers";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { CircleHelp } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolsCta } from "@/components/tools/ToolsCta";
import {
  InternetYouDashboard,
  type InternetYouServerSnapshot,
} from "@/components/tools/InternetYouDashboard";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { ipVersionOf, resolveRequestGeo } from "@/lib/request-geo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";
export const revalidate = 0;

type FaqItem = { q: string; a: string };

function resolveCountryName(code: string, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "region" });
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools.internetYou" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/tools/what-websites-can-see", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/tools/what-websites-can-see", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tNav, tTools, tCommon, currentLocale] = await Promise.all([
    getTranslations("tools.internetYou"),
    getTranslations("nav"),
    getTranslations("tools"),
    getTranslations("tools.common"),
    getLocale(),
  ]);
  const faqItems = t.raw("faq.items") as FaqItem[];
  const geo = await resolveRequestGeo(await headers());
  const ipVersion = ipVersionOf(geo.ip);
  const serverSnapshot: InternetYouServerSnapshot = {
    ip: geo.ip,
    ipv4: ipVersion === "ipv4" ? geo.ip : null,
    ipv6: ipVersion === "ipv6" ? geo.ip : null,
    currentIpVersion: ipVersion,
    countryCode: geo.countryCode,
    countryName: geo.countryCode
      ? resolveCountryName(geo.countryCode, currentLocale)
      : null,
    countrySource:
      geo.source === "ipwho"
        ? "lookup"
        : geo.source === "cloudflare"
          ? "header"
          : "none",
  };

  const copy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    subtitle: t("subtitle"),
    liveBadge: t("liveBadge"),
    noExternalLookup: t("noExternalLookup"),
    networkAddressesTitle: t("networkAddressesTitle"),
    networkAddressesSubtitle: t("networkAddressesSubtitle"),
    publicIp: t("publicIp"),
    ipv4: t("ipv4"),
    ipv6: t("ipv6"),
    detectedOnRequest: t("detectedOnRequest"),
    notDetectedOnRequest: t("notDetectedOnRequest"),
    visibilitySummaryTitle: t("visibilitySummaryTitle"),
    visibilitySummarySubtitle: t("visibilitySummarySubtitle"),
    visibleNowTitle: t("visibleNowTitle"),
    visibleNowBody: t("visibleNowBody"),
    approximateSignalsTitle: t("approximateSignalsTitle"),
    approximateSignalsBody: t("approximateSignalsBody"),
    notAccessibleTitle: t("notAccessibleTitle"),
    notAccessibleBody: t("notAccessibleBody"),
    signalsAvailable: t("signalsAvailable"),
    privacyControlsTitle: t("privacyControlsTitle"),
    privacyControlsKicker: t("privacyControlsKicker"),
    privacyControlsSubtitle: t("privacyControlsSubtitle"),
    secureConnection: t("secureConnection"),
    globalPrivacyControl: t("globalPrivacyControl"),
    doNotTrack: t("doNotTrack"),
    notSet: t("notSet"),
    comparisonTitle: t("comparisonTitle"),
    comparisonKicker: t("comparisonKicker"),
    comparisonSubtitle: t("comparisonSubtitle"),
    comparisonEmpty: t("comparisonEmpty"),
    saveSnapshot: t("saveSnapshot"),
    refreshSnapshot: t("refreshSnapshot"),
    baselineLabel: t("baselineLabel"),
    currentLabel: t("currentLabel"),
    changed: t("changed"),
    unchanged: t("unchanged"),
    approxLocation: t("approxLocation"),
    browser: t("browser"),
    device: t("device"),
    countryOnly: t("countryOnly"),
    countryLookup: t("countryLookup"),
    requestHeaders: t("requestHeaders"),
    unknown: t("unknown"),
    browserDeviceTitle: t("browserDeviceTitle"),
    browserDeviceSubtitle: t("browserDeviceSubtitle"),
    operatingSystem: t("operatingSystem"),
    screen: t("screen"),
    language: t("language"),
    timezone: t("timezone"),
    touchSupport: t("touchSupport"),
    cookies: t("cookies"),
    connection: t("connection"),
    enabled: t("enabled"),
    disabled: t("disabled"),
    yes: t("yes"),
    no: t("no"),
    online: t("online"),
    offline: t("offline"),
    desktop: t("desktop"),
    mobile: t("mobile"),
    tablet: t("tablet"),
    privacySignalsTitle: t("privacySignalsTitle"),
    privacySignalsSubtitle: t("privacySignalsSubtitle"),
    notChecked: t("notChecked"),
    nextStepsKicker: t("nextStepsKicker"),
    nextStepsTitle: t("nextStepsTitle"),
    nextStepsSubtitle: t("nextStepsSubtitle"),
    dnsActionTitle: t("dnsActionTitle"),
    dnsActionBody: t("dnsActionBody"),
    webrtcActionTitle: t("webrtcActionTitle"),
    webrtcActionBody: t("webrtcActionBody"),
    compareActionTitle: t("compareActionTitle"),
    compareActionBody: t("compareActionBody"),
    researchActionTitle: t("researchActionTitle"),
    researchActionBody: t("researchActionBody"),
    openNextStep: t("openNextStep"),
    dnsLeak: t("dnsLeak"),
    dnsLeakBody: t("dnsLeakBody"),
    webrtcLeak: t("webrtcLeak"),
    webrtcLeakBody: t("webrtcLeakBody"),
    openCheck: t("openCheck"),
    cannotSeeTitle: t("cannotSeeTitle"),
    macAddress: t("macAddress"),
    macAddressBody: t("macAddressBody"),
    filesAndPasswords: t("filesAndPasswords"),
    filesAndPasswordsBody: t("filesAndPasswordsBody"),
    exactLocation: t("exactLocation"),
    exactLocationBody: t("exactLocationBody"),
    privacyNote: t("privacyNote"),
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("title"),
    description: t("metaDescription"),
    url: absoluteUrl("/tools/what-websites-can-see", locale),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: tTools("breadcrumb"), path: "/tools" },
            { name: t("breadcrumb"), path: "/tools/what-websites-can-see" },
          ],
          locale as "tr" | "en" | "de",
        )}
      />
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema(faqItems)} />

      <Container size="lg" className="py-10 sm:py-14">
        <p className="text-xs font-medium text-ink-muted sm:text-sm">
          <Link href="/" className="hover:text-ink">{tNav("home")}</Link>{" "}›{" "}
          <Link href="/tools" className="hover:text-ink">{tTools("breadcrumb")}</Link>{" "}›{" "}
          <span className="text-ink-strong">{t("breadcrumb")}</span>
        </p>

        <InternetYouDashboard serverSnapshot={serverSnapshot} copy={copy} />

        <section className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-surface-subtle p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/40">
                  <CircleHelp className="size-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.16em]">FAQ</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-strong sm:text-3xl">{t("faqTitle")}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
                {t("subtitle")}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-base px-5 sm:px-7 dark:bg-surface-subtle">
              {faqItems.map((item) => (
                <details key={item.q} className="group border-b border-border py-5 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-ink-strong marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500">
                    <span>{item.q}</span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-200 text-lg font-normal text-brand-700 transition group-open:rotate-45 dark:border-brand-800 dark:text-brand-300" aria-hidden="true">＋</span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
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
