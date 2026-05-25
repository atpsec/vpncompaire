import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Mail, Edit3, Briefcase, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "vpncompaire ile iletişime geç — editoryal geri bildirim, düzeltme talepleri, iş birlikleri ve yasal başvurular.",
};

type Props = { params: Promise<{ locale: string }> };

const contacts = [
  {
    Icon: Edit3,
    title: "Editoryal geri bildirim",
    desc: "İçerikte hata, eksik bilgi veya güncelleme önerisi.",
    email: "editor@vpncompaire.com",
  },
  {
    Icon: Briefcase,
    title: "İş birliği & basın",
    desc: "Partnership talepleri, basın soruları, demo talepleri.",
    email: "partner@vpncompaire.com",
  },
  {
    Icon: AlertCircle,
    title: "Yasal & şikayet",
    desc: "DMCA talepleri, telif hakkı, hukuki başvurular.",
    email: "legal@vpncompaire.com",
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">İletişim</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Mail className="size-3" /> İletişim
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Bize ulaş
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Geri bildirim, düzeltme talepleri ve sorularınız için aşağıdaki
            ilgili adresleri kullanın. Genelde 1-3 iş günü içinde yanıt
            veriyoruz.
          </p>
        </header>

        <div className="mt-10 space-y-4">
          {contacts.map(({ Icon, title, desc, email }) => (
            <Card key={title} className="p-5">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center size-10 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-ink-strong">{title}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{desc}</p>
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

        <Card className="mt-12 p-6 bg-surface-subtle/60">
          <h2 className="font-semibold text-ink-strong">
            Hızlı bağlantılar
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/hakkimizda" className="text-brand-700 hover:underline">
                Hakkımızda
              </Link>{" "}
              — biz kimiz, nasıl çalışıyoruz
            </li>
            <li>
              <Link href="/metodoloji" className="text-brand-700 hover:underline">
                Metodoloji
              </Link>{" "}
              — VPN&apos;leri nasıl değerlendiriyoruz
            </li>
            <li>
              <Link
                href="/reklam-aciklamasi"
                className="text-brand-700 hover:underline"
              >
                Reklam Açıklaması
              </Link>{" "}
              — affiliate ilişkilerimiz
            </li>
            <li>
              <Link href="/gizlilik" className="text-brand-700 hover:underline">
                Gizlilik Politikası
              </Link>{" "}
              — kişisel veri uygulamamız
            </li>
          </ul>
        </Card>

        <p className="mt-8 text-xs text-ink-subtle text-center">
          {siteConfig.name} editör ekibi
        </p>
      </Container>
    </>
  );
}
