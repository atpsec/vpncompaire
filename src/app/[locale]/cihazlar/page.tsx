import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { DeviceIcon } from "@/components/device/device-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { devices } from "@/data/devices";
import { devicesEn } from "@/data/devices.en";
import { absoluteUrl, bilingualAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "deviceHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: bilingualAlternates("/cihazlar", locale, "tr"),
    robots: locale === "de" ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/cihazlar", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "deviceHub" });
  const list = locale === "en" ? devicesEn : devices;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbHere"), path: "/cihazlar" },
          ],
          locale as "tr" | "en" | "de",
        )}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumbHome")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumbHere")}</span>
        </p>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{t("lede")}</p>
        </header>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {list.map((d) => (
            <Link key={d.slug} href={`/cihazlar/${d.slug}`} className="group">
              <Card className="p-6 hover:border-brand-300 hover:shadow-md transition-all h-full">
                <div className="flex items-start gap-4">
                  <DeviceIcon
                    type={d.slug as "android" | "iphone" | "ipad" | "smart-tv"}
                    size={56}
                  />
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-ink-strong group-hover:text-brand-700">
                      {t("cardTitle", { name: d.shortName })}
                    </h2>
                    <p className="mt-1 text-sm text-ink-muted">{d.device}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink leading-relaxed">
                  {d.tagline}
                </p>
                <div className="mt-4 inline-flex items-center text-xs font-medium text-brand-700">
                  {t("cardCta")} <ArrowRight className="ml-1 size-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6">
          <h2 className="text-lg font-semibold text-ink-strong">
            {t("notListedTitle")}
          </h2>
          <p className="mt-2 text-sm text-ink leading-relaxed">
            {t("notListedBody")}
          </p>
        </section>
      </Container>
    </>
  );
}
