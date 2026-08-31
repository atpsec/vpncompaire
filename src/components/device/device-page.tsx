import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Wrench,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { DeviceIcon } from "@/components/device/device-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import type { DeviceContent } from "@/data/devices";
import { cn } from "@/lib/utils";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";

const DIFFICULTY_TONE = {
  Kolay: "bg-success-50 text-success-700 border-success-100",
  Orta: "bg-accent-50 text-accent-600 border-accent-100",
  "İleri düzey": "bg-surface-strong/40 text-ink-strong border-border",
  Easy: "bg-success-50 text-success-700 border-success-100",
  Medium: "bg-accent-50 text-accent-600 border-accent-100",
  Advanced: "bg-surface-strong/40 text-ink-strong border-border",
} as const;

export async function DevicePage({
  device,
  locale,
}: {
  device: DeviceContent;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "device" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbHub"), path: "/devices" },
            { name: device.shortName, path: `/devices/${device.slug}` },
          ],
          locale as "tr" | "en" | "de",
        )}
      />
      <JsonLd data={faqSchema([...device.faqs])} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumbHome")}
          </Link>{" "}
          ›{" "}
          <Link href="/devices" className="hover:text-ink">
            {t("breadcrumbHub")}
          </Link>{" "}
          › <span className="text-ink-strong">{device.shortName}</span>
        </p>

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <DeviceIcon
            type={device.slug as "android" | "iphone" | "ipad" | "smart-tv"}
            size={88}
            className="sm:mt-2"
          />
          <div className="flex-1">
            <Badge variant="brand">{device.device}</Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
              {t("h1", { name: device.shortName })}
            </h1>
            <p className="mt-4 text-lg text-ink-muted">{device.tagline}</p>
          </div>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40 border-brand-100">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <Shield className="size-5 text-brand-600" />{" "}
            {t("whyTitle", { name: device.shortName })}
          </h2>
          <p className="mt-3 text-ink leading-relaxed">{device.summary}</p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-ink">
            {device.whyMatters.map((w, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Card>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Wrench className="size-5 text-ink-muted" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
              {t("setup.h2")}
            </h2>
          </div>
          <p className="mt-2 text-ink-muted">{t("setup.intro")}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {device.setupMethods.map((m) => (
              <Card key={m.name} className="p-5 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink-strong">
                    {m.name}
                  </h3>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                      DIFFICULTY_TONE[m.difficulty],
                    )}
                  >
                    {m.difficulty}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {m.description}
                </p>
                <p className="mt-3 text-xs text-ink-strong">
                  <span className="font-semibold">{t("setup.whenLabel")} </span>
                  {m.whenToUse}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            {t("picks.h2", {
              name: device.shortName,
              count: device.picks.length,
            })}
          </h2>
          <p className="mt-2 text-ink-muted">{t("picks.intro")}</p>
          <AffiliateNotice className="mt-4" variant="surface" />
          <div className="mt-6 space-y-4">
            {device.picks.map((pick, idx) => {
              const product = getProduct(pick.slug, locale as "tr" | "en");
              if (!product) return null;
              return (
                <Card key={pick.slug} className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start gap-4">
                    <VPNLogo slug={product.slug} size={56} />
                    <div className="flex-1 min-w-[220px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                          #{idx + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-ink-strong">
                          {product.brand}
                        </h3>
                        <Badge variant="brand">{pick.bestFor}</Badge>
                      </div>
                      <p className="mt-3 text-ink leading-relaxed text-[15px]">
                        {pick.why}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button asChild variant="primary" size="sm">
                          <ProviderLink
                            href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "device-pick" })}
                            rel={providerOutboundRel(product.slug, product.hasAffiliate)}
                            target="_blank"
                            provider={product.slug}
                            placement="device-pick"
                          >
                            {t("picks.ctaOfficial", { brand: product.brand })}
                            <ArrowRight className="size-4" />
                          </ProviderLink>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/reviews/${product.slug}`}>
                            {t("picks.readReview")}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {device.pitfalls.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-accent-600" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
                {t("pitfallsH2")}
              </h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {device.pitfalls.map((p) => (
                <Card
                  key={p.title}
                  className="p-5 border-accent-100 bg-accent-50/30"
                >
                  <h3 className="text-base font-semibold text-ink-strong">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink leading-relaxed">
                    {p.body}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>{t("faqH2")}</h2>
          {device.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{t("relatedTitle")}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {device.relatedLinks.map((l) => (
              l.href === "/best-vpn/turkey" ||
              l.href === "/best-vpn/turks-abroad" ? (
                <a
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
                >
                  {l.label}
                </Link>
              )
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
