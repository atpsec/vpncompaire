import type { Metadata } from "next";
import { headers } from "next/headers";
import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { Globe2, MapPin, Clock, Building2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { CopyButton } from "@/components/tools/CopyButton";
import { BrowserFingerprint } from "@/components/tools/BrowserFingerprint";
import { ToolsCta } from "@/components/tools/ToolsCta";
import { resolveRequestGeo } from "@/lib/request-geo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools.ip" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/tools/ip-adresim", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/tools/ip-adresim", locale),
      type: "website",
    },
  };
}

function resolveCountryName(code: string, locale: string): string {
  try {
    const dn = new Intl.DisplayNames([locale], { type: "region" });
    return dn.of(code) ?? code;
  } catch {
    return code;
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const h = await headers();
  const geo = await resolveRequestGeo(h);
  const ip = geo.ip ?? "";
  const country = geo.countryCode;
  const decodedCity = geo.city;
  const decodedRegion = geo.region;
  const timezone = geo.timezone;

  const [t, tNav, tCommon, tIp, currentLocale] = await Promise.all([
    getTranslations("tools.ip"),
    getTranslations("nav"),
    getTranslations("tools.common"),
    getTranslations("tools.ip"),
    getLocale(),
  ]);

  const ipVersion = ip.includes(":") ? "IPv6" : "IPv4";
  const countryCode = country?.toLowerCase() ?? null;
  const countryName = country
    ? resolveCountryName(country, currentLocale)
    : null;

  const fingerprintLabels = {
    fingerprint: tIp("fingerprint"),
    userAgent: tIp("userAgent"),
    screen: tIp("screen"),
    language: tIp("language"),
    platform: tIp("platform"),
    unknown: tIp("unknown"),
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: absoluteUrl("/tools/ip-adresim"),
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
            { name: tCommon("ctaTitle"), path: "/tools" },
            { name: t("breadcrumb"), path: "/tools/ip-adresim" },
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

        <Card className="mt-8 p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {t("ipKicker")} · {ipVersion}
              </p>
              <p className="mt-2 break-all font-mono text-2xl font-bold tabular-nums text-ink-strong sm:text-4xl">
                {ip || t("unknown")}
              </p>
            </div>
            {ip && (
              <CopyButton
                value={ip}
                copyLabel={tCommon("copy")}
                copiedLabel={tCommon("copied")}
              />
            )}
          </div>
        </Card>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailRow
            icon={Building2}
            label={t("isp")}
            value={t("unknown")}
          />
          <DetailRow
            icon={MapPin}
            label={t("country")}
            value={countryName ?? t("unknown")}
            flag={countryCode}
          />
          <DetailRow
            icon={MapPin}
            label={t("city")}
            value={decodedCity ?? t("unknown")}
          />
          <DetailRow
            icon={MapPin}
            label={t("region")}
            value={decodedRegion ?? t("unknown")}
          />
          <DetailRow
            icon={Clock}
            label={t("timezone")}
            value={timezone ?? t("unknown")}
          />
          <DetailRow
            icon={Globe2}
            label="IP"
            value={ip || t("unknown")}
            mono
          />
        </dl>

        <BrowserFingerprint labels={fingerprintLabels} />

        <section className="mt-10 rounded-xl border border-border bg-surface-subtle p-6 dark:bg-surface-subtle">
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

function DetailRow({
  icon: Icon,
  label,
  value,
  flag,
  mono,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  flag?: string | null;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle">
      <Icon className="size-5 shrink-0 text-brand-600" aria-hidden />
      <div className="min-w-0 flex-1">
        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {label}
        </dt>
        <dd className="mt-1 flex items-center gap-2">
          {flag && (
            <Image
              src={`https://flagcdn.com/h40/${flag}.png`}
              alt=""
              width={20}
              height={14}
              className="h-4 w-auto rounded-sm shadow-sm ring-1 ring-black/5"
              unoptimized
            />
          )}
          <span
            className={`min-w-0 truncate text-sm font-semibold text-ink-strong ${
              mono ? "font-mono break-all" : ""
            }`}
          >
            {value}
          </span>
        </dd>
      </div>
    </div>
  );
}
