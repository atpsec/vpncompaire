import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "VPN Rehberleri",
  description:
    "VPN hakkında bilmen gerekenler: VPN nedir, nasıl seçilir, Türkiye'de yasal mı, hangi senaryolarda kullanılır.",
};

type Props = { params: Promise<{ locale: string }> };

const guides = [
  {
    slug: "vpn-nedir",
    title: "VPN nedir? 5 dakikalık başlangıç rehberi",
    desc: "VPN'in ne olduğu, nasıl çalıştığı ve seni neye karşı koruduğu.",
    available: true,
    tag: "Başlangıç",
  },
  {
    slug: "turkiye-de-vpn-yasal-mi",
    title: "Türkiye'de VPN yasal mı?",
    desc: "Detaylı hukuki rehber: yasal çerçeve, BTK engellemeleri, risk senaryoları.",
    available: true,
    tag: "Türkiye",
  },
  {
    slug: "ucretsiz-vs-ucretli-vpn",
    title: "Ücretsiz vs Ücretli VPN: Gerçekten değiyor mu?",
    desc: "Ücretsiz VPN'lerin nasıl para kazandığı ve hangi durumlarda yeterli olduğu.",
    available: true,
    tag: "Karar",
  },
  {
    slug: "vpn-guvenlik-kontrol-listesi",
    title: "VPN güvenlik kontrol listesi (12 madde)",
    desc: "Bir VPN seçmeden önce kontrol etmen gereken her şey.",
    available: true,
    tag: "Karar",
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
          { name: "Rehberler", path: "/rehber" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Rehberler</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <BookOpen className="size-3" /> Rehberler
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN Rehberleri
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            VPN konusunda merak ettiğin temel sorular, kullanım senaryoları
            ve karar verme yardımcıları.
          </p>
        </header>

        <div className="mt-10 space-y-3">
          {guides.map((g) =>
            g.available ? (
              <Link
                key={g.slug}
                href={`/rehber/${g.slug}`}
                className="group block"
              >
                <Card className="p-5 hover:border-brand-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-ink-strong group-hover:text-brand-700">
                        {g.title}
                      </h2>
                      <p className="mt-1 text-sm text-ink-muted">{g.desc}</p>
                    </div>
                    <Badge variant="brand">{g.tag}</Badge>
                  </div>
                  <div className="mt-3 inline-flex items-center text-xs font-medium text-brand-700">
                    Rehberi oku <ArrowRight className="ml-1 size-3" />
                  </div>
                </Card>
              </Link>
            ) : null,
          )}
        </div>
      </Container>
    </>
  );
}
