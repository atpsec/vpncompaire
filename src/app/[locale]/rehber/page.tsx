import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle: "VPN Rehberleri",
    metaDescription:
      "VPN hakkında bilmen gerekenler: VPN nedir, nasıl seçilir, Türkiye'de yasal mı, hangi senaryolarda kullanılır.",
    breadcrumbHome: "Ana sayfa",
    breadcrumbHere: "Rehberler",
    badge: "Rehberler",
    h1: "VPN Rehberleri",
    lede: "VPN konusunda merak ettiğin temel sorular, kullanım senaryoları ve karar verme yardımcıları.",
    cta: "Rehberi oku",
    guides: [
      { slug: "vpn-nedir", title: "VPN nedir? 5 dakikalık başlangıç rehberi", desc: "VPN'in ne olduğu, nasıl çalıştığı ve seni neye karşı koruduğu.", tag: "Başlangıç" },
      { slug: "turkiye-de-vpn-yasal-mi", title: "Türkiye'de VPN yasal mı?", desc: "Detaylı hukuki rehber: yasal çerçeve, BTK engellemeleri, risk senaryoları.", tag: "Türkiye" },
      { slug: "ucretsiz-vs-ucretli-vpn", title: "Ücretsiz vs Ücretli VPN: Gerçekten değiyor mu?", desc: "Ücretsiz VPN'lerin nasıl para kazandığı ve hangi durumlarda yeterli olduğu.", tag: "Karar" },
      { slug: "vpn-guvenlik-kontrol-listesi", title: "VPN güvenlik kontrol listesi (12 madde)", desc: "Bir VPN seçmeden önce kontrol etmen gereken her şey.", tag: "Karar" },
      { slug: "ogrenciler-icin-vpn", title: "Öğrenciler için en iyi VPN", desc: "Kampüs Wi-Fi, akademik erişim, öğrenci bütçesine uygun seçimler.", tag: "Öğrenciler" },
      { slug: "yurt-disindaki-turkler-icin-vpn", title: "Yurt dışındaki Türkler için VPN", desc: "BluTV, Exxen, Türk bankacılığı ve e-Devlet erişimi için Türkiye sunuculu VPN'ler.", tag: "Diaspora" },
      { slug: "aile-ve-cocuklar-icin-vpn", title: "Aile ve çocuklar için VPN", desc: "Çoklu cihaz, ebeveyn kontrolü, zararlı içerik filtreleme.", tag: "Aile" },
      { slug: "uzaktan-calisanlar-icin-vpn", title: "Uzaktan çalışanlar için VPN", desc: "Otel/kafe Wi-Fi güvenliği, müşteri dosyaları, seyahat istikrarı.", tag: "İş" },
      { slug: "yaslilar-icin-vpn", title: "Yaşlılar için VPN", desc: "Basit kurulum, dolandırıcılık/phishing koruması, Türkçe arayüz.", tag: "Yaşlılar" },
      { slug: "gamerlar-icin-vpn", title: "Gamerlar için VPN", desc: "Düşük ping, DDoS koruması, oyun sunucusu bölge bypass.", tag: "Gaming" },
    ],
  },
  en: {
    metaTitle: "VPN Guides",
    metaDescription:
      "Everything you need to know about VPNs: what they are, how to pick one, legality in Türkiye and use-case scenarios.",
    breadcrumbHome: "Home",
    breadcrumbHere: "Guides",
    badge: "Guides",
    h1: "VPN Guides",
    lede: "The basic questions about VPNs, use-case scenarios and decision aids.",
    cta: "Read the guide",
    guides: [
      { slug: "vpn-nedir", title: "What is a VPN? A 5-minute starter guide", desc: "What a VPN is, how it works and what it actually protects you from.", tag: "Beginner" },
      { slug: "turkiye-de-vpn-yasal-mi", title: "Is VPN legal in Türkiye?", desc: "A detailed legal guide: the legal framework, BTK blocks and risk scenarios.", tag: "Türkiye" },
      { slug: "ucretsiz-vs-ucretli-vpn", title: "Free vs paid VPN: is it really worth it?", desc: "How free VPNs make money and when they're actually enough.", tag: "Decision" },
      { slug: "vpn-guvenlik-kontrol-listesi", title: "VPN security checklist (12 items)", desc: "Everything to check before picking a VPN.", tag: "Decision" },
      { slug: "ogrenciler-icin-vpn", title: "The best VPN for students", desc: "Campus Wi-Fi, academic access and student-budget picks.", tag: "Students" },
      { slug: "yurt-disindaki-turkler-icin-vpn", title: "VPN for Turks abroad", desc: "VPNs with Turkish servers for BluTV, Exxen, Turkish banking and e-Devlet.", tag: "Diaspora" },
      { slug: "aile-ve-cocuklar-icin-vpn", title: "VPN for families and kids", desc: "Multiple devices, parental controls and content filtering.", tag: "Family" },
      { slug: "uzaktan-calisanlar-icin-vpn", title: "VPN for remote workers", desc: "Hotel/café Wi-Fi safety, client files and travel stability.", tag: "Work" },
      { slug: "yaslilar-icin-vpn", title: "VPN for older users", desc: "Simple setup, scam/phishing protection and a Turkish-language UI.", tag: "Seniors" },
      { slug: "gamerlar-icin-vpn", title: "VPN for gamers", desc: "Low ping, DDoS protection and regional bypass for game servers.", tag: "Gaming" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : "tr"];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale === "en" ? "en" : "tr"];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.breadcrumbHome, path: "/" },
          { name: c.breadcrumbHere, path: "/rehber" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {c.breadcrumbHome}
          </Link>{" "}
          › <span className="text-ink-strong">{c.breadcrumbHere}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <BookOpen className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{c.lede}</p>
        </header>

        <div className="mt-10 space-y-3">
          {c.guides.map((g) => (
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
                  {c.cta} <ArrowRight className="ml-1 size-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
