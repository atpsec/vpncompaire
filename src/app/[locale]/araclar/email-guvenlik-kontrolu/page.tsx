import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { EmailSecurityChecker } from "@/components/tools/EmailSecurityChecker";
import { ToolsCta } from "@/components/tools/ToolsCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "tools.emailSecurity",
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/araclar/email-guvenlik-kontrolu", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/araclar/email-guvenlik-kontrolu", locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EmailSecurityView />;
}

function EmailSecurityView() {
  const t = useTranslations("tools.emailSecurity");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("tools.common");
  const locale = useLocale();

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: absoluteUrl("/araclar/email-guvenlik-kontrolu"),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const labels = {
    emailLabel: t("emailLabel"),
    placeholder: t("placeholder"),
    submit: t("submit"),
    checking: t("checking"),
    runAgain: tCommon("tryAgain"),
    invalidEmail: t("invalidEmail"),
    errorTitle: t("errorTitle"),
    errorBody: t("errorBody"),
    rateLimitedBody: t("rateLimitedBody"),
    privacyNote: t("privacyNote"),
    privacyDetail: t("privacyDetail"),
    scoreLabel: t("scoreLabel"),
    riskLabels: {
      low: t("risk.low"),
      medium: t("risk.medium"),
      high: t("risk.high"),
    },
    statusLabels: {
      pass: t("status.pass"),
      warning: t("status.warning"),
      fail: t("status.fail"),
      unknown: t("status.unknown"),
    },
    checkedAt: t("checkedAt"),
    domainTitle: t("domainTitle"),
    breachTitle: t("breachTitle"),
    recommendationsTitle: t("recommendationsTitle"),
    noFindings: t("noFindings"),
    mx: {
      title: t("mx.title"),
      pass: t("mx.pass"),
      fail: t("mx.fail"),
    },
    spf: {
      title: t("spf.title"),
      pass: t("spf.pass"),
      warning: t("spf.warning"),
      fail: t("spf.fail"),
    },
    dmarc: {
      title: t("dmarc.title"),
      pass: t("dmarc.pass"),
      warning: t("dmarc.warning"),
      fail: t("dmarc.fail"),
    },
    breach: {
      clear: t("breach.clear"),
      found: t("breach.found"),
      unavailable: t("breach.unavailable"),
      methodHibp: t("breach.methodHibp"),
      methodXon: t("breach.methodXon"),
      visibleBreaches: t("breach.visibleBreaches"),
    },
    findings: {
      breach_found: t("findings.breach_found"),
      hibp_not_configured: t("findings.hibp_not_configured"),
      hibp_unavailable: t("findings.hibp_unavailable"),
      no_mx: t("findings.no_mx"),
      no_spf: t("findings.no_spf"),
      weak_spf: t("findings.weak_spf"),
      no_dmarc: t("findings.no_dmarc"),
      dmarc_monitor_only: t("findings.dmarc_monitor_only"),
      disposable_email: t("findings.disposable_email"),
      role_account: t("findings.role_account"),
    },
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: tNav("tools"), path: "/araclar" },
            { name: t("breadcrumb"), path: "/araclar/email-guvenlik-kontrolu" },
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
          <div className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700">
            {t("featured")}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            {t("subtitle")}
          </p>
        </header>

        <EmailSecurityChecker labels={labels} />

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
