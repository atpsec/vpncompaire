import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Gauge,
  Network,
  ShieldCheck,
  Wifi,
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
    alternates: localizedAlternates("/araclar", locale),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/araclar", locale),
      type: "website",
    },
  };
}

const TOOLS: ReadonlyArray<{
  href: "/vpn-test" | "/araclar/dns-leak-test" | "/araclar/webrtc-leak-test" | "/araclar/vpn-hiz-testi";
  key: "vpnTest" | "dns" | "webrtc" | "speed";
  Icon: LucideIcon;
}> = [
  { href: "/vpn-test", key: "vpnTest", Icon: ShieldCheck },
  { href: "/araclar/dns-leak-test", key: "dns", Icon: Network },
  { href: "/araclar/webrtc-leak-test", key: "webrtc", Icon: Wifi },
  { href: "/araclar/vpn-hiz-testi", key: "speed", Icon: Gauge },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ToolsIndexView />;
}

function ToolsIndexView() {
  const t = useTranslations("tools");
  const tNav = useTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), path: "/" },
          { name: t("breadcrumb"), path: "/araclar" },
        ])}
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
              className="group block focus-visible:outline-none"
            >
              <Card className="h-full p-6 transition group-hover:border-brand-300 group-hover:shadow-md group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-brand-500">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                  <Icon className="size-6" aria-hidden="true" />
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

        <p className="mt-10 text-xs text-ink-muted">{t("common.privacyNote")}</p>
      </Container>
    </>
  );
}
