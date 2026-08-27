import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowRight,
  Gauge,
  MailCheck,
  Network,
  ShieldCheck,
  Wifi,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/tools", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/tools", locale),
      type: "website",
    },
  };
}

const TOOLS: ReadonlyArray<{
  href:
    | "/tools/email-security-check"
    | "/tools/my-ip"
    | "/vpn-test"
    | "/tools/dns-leak-test"
    | "/tools/webrtc-leak-test"
    | "/tools/vpn-speed-test";
  key: "emailSecurity" | "vpnTest" | "ip" | "dns" | "webrtc" | "speed";
  Icon: LucideIcon;
}> = [
  {
    href: "/tools/email-security-check",
    key: "emailSecurity",
    Icon: MailCheck,
  },
  { href: "/vpn-test", key: "vpnTest", Icon: ShieldCheck },
  { href: "/tools/my-ip", key: "ip", Icon: Globe2 },
  { href: "/tools/dns-leak-test", key: "dns", Icon: Network },
  { href: "/tools/webrtc-leak-test", key: "webrtc", Icon: Wifi },
  { href: "/tools/vpn-speed-test", key: "speed", Icon: Gauge },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ToolsIndexView />;
}

function ToolsIndexView() {
  const t = useTranslations("tools");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const workflowSteps = t.raw("workflow.steps") as [string, string, string, string][];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: tNav("home"), path: "/" },
            { name: t("breadcrumb"), path: "/tools" },
          ],
          locale as "tr" | "en" | "de",
        )}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {tNav("home")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumb")}</span>
        </p>

        <header className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">
            {t("indexTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {t("indexSubtitle")}
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {TOOLS.map(({ href, key, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`group block focus-visible:outline-none ${
                key === "emailSecurity" ? "sm:col-span-2" : ""
              }`}
            >
              <Card
                className={`h-full p-6 transition group-hover:border-brand-300 group-hover:shadow-md group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-brand-500 ${
                  key === "emailSecurity"
                    ? "border-brand-200 bg-brand-50/40 dark:bg-brand-950/20"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  {key === "emailSecurity" && (
                    <span className="rounded-full bg-accent-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-strong">
                      {t("featuredLabel")}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-bold text-ink-strong">
                  {t(`cards.${key}.title`)}
                </h2>
                <p className="mt-2 text-sm text-ink-muted">
                  {t(`cards.${key}.description`)}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:underline">
                  {t("cards." + key + ".title")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </p>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-brand-200 bg-brand-50/40 p-6 dark:bg-brand-950/20 sm:p-8">
          <h2 className="text-2xl font-bold text-ink-strong">
            {t("workflow.title")}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
            {t("workflow.subtitle")}
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {workflowSteps.map((step, index) => (
              <li key={step[0]} className="rounded-xl border border-border bg-surface-base p-4 dark:bg-surface-subtle">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {index + 1}. {step[0]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink">{step[1]}</p>
                <Link href={step[2] as "/tools"} className="mt-3 inline-flex text-sm font-semibold text-brand-700 hover:underline">
                  {step[3]}
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink-strong">{t("researchCta.title")}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
            {t("researchCta.body")}
          </p>
          <Link href="/research" className="mt-4 inline-flex items-center font-semibold text-brand-700 hover:underline">
            {t("researchCta.button")}
            <ArrowRight className="ml-1 size-4" aria-hidden="true" />
          </Link>
        </section>

        <p className="mt-10 text-xs text-ink-muted">{t("common.privacyNote")}</p>
      </Container>
    </>
  );
}
