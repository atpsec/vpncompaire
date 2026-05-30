import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { SecurityToolsBody, getSecurityContent } from "./_body";

type Props = { params: Promise<{ locale: string }> };

const META = {
  tr: {
    title:
      "VPN ile Birlikte Kullanılacak Güvenlik Araçları (2026) — Tamamlayıcı Stack",
    description:
      "VPN tek başına yetmez. Şifre yöneticisi, şifreli e-posta, antivirüs, tarayıcı genişletmeleri ve 2FA — gerçek bir gizlilik/güvenlik yığını için tamamlayıcı araç önerileri.",
    ogTitle: "VPN ile Birlikte Kullanılacak Güvenlik Araçları",
    ogDescription:
      "Şifre yöneticisi, şifreli e-posta, antivirüs ve 2FA — VPN'i tamamlayan stack.",
  },
  en: {
    title:
      "Security Tools to Use With a VPN (2026) — A Complementary Stack",
    description:
      "A VPN alone isn't enough. Password manager, encrypted email, antivirus, browser extensions and 2FA — complementary tools for a real privacy/security stack.",
    ogTitle: "Security Tools to Use With a VPN",
    ogDescription:
      "Password manager, encrypted email, antivirus and 2FA — the stack that complements a VPN.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale === "en" ? "en" : "tr"];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: absoluteUrl("/guvenlik-araclari") },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: absoluteUrl("/guvenlik-araclari"),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { strings } = getSecurityContent(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: strings.breadcrumbHome, path: "/" },
          { name: strings.breadcrumbHere, path: "/guvenlik-araclari" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <SecurityToolsBody locale={locale} />
      </Container>
    </>
  );
}
