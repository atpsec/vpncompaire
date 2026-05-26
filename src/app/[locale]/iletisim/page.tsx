import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Mail, Edit3, Briefcase, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const channels = [
  { Icon: Edit3, key: "editorial", email: "editor@vpncompaire.com" },
  { Icon: Briefcase, key: "partnership", email: "partner@vpncompaire.com" },
  { Icon: AlertCircle, key: "legal", email: "legal@vpncompaire.com" },
] as const;

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbHere"), path: "/iletisim" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {t("breadcrumbHome")}
          </Link>{" "}
          › <span className="text-ink-strong">{t("breadcrumbHere")}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Mail className="size-3" /> {t("badge")}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            {t("lede")}
          </p>
        </header>

        <ChannelList />

        <Card className="mt-12 p-6 bg-surface-subtle/60">
          <h2 className="font-semibold text-ink-strong">
            {t("quickLinksTitle")}
          </h2>
          <QuickLinks />
        </Card>

        <p className="mt-8 text-xs text-ink-subtle text-center">
          {t("footer", { site: siteConfig.name })}
        </p>
      </Container>
    </>
  );
}

function ChannelList() {
  const t = useTranslations("contact.channels");
  return (
    <div className="mt-10 space-y-4">
      {channels.map(({ Icon, key, email }) => (
        <Card key={key} className="p-5">
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center size-10 rounded-lg bg-brand-50 text-brand-600 shrink-0">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-ink-strong">{t(`${key}.title`)}</h2>
              <p className="mt-1 text-sm text-ink-muted">{t(`${key}.desc`)}</p>
              <a
                href={`mailto:${email}`}
                className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline break-all"
              >
                {email}
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function QuickLinks() {
  const t = useTranslations();
  return (
    <ul className="mt-3 space-y-2 text-sm">
      <li>
        <Link href="/hakkimizda" className="text-brand-700 hover:underline">
          {t("footer.links.about")}
        </Link>{" "}
        {t("contact.quickLinks.aboutSuffix")}
      </li>
      <li>
        <Link href="/metodoloji" className="text-brand-700 hover:underline">
          {t("footer.links.methodology")}
        </Link>{" "}
        {t("contact.quickLinks.methodologySuffix")}
      </li>
      <li>
        <Link
          href="/reklam-aciklamasi"
          className="text-brand-700 hover:underline"
        >
          {t("footer.links.disclosure")}
        </Link>{" "}
        {t("contact.quickLinks.disclosureSuffix")}
      </li>
      <li>
        <Link href="/gizlilik" className="text-brand-700 hover:underline">
          {t("footer.links.privacy")}
        </Link>{" "}
        {t("contact.quickLinks.privacySuffix")}
      </li>
    </ul>
  );
}
