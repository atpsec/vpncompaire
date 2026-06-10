import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { sectionHubAlternates } from "@/lib/site";
import {
  findContentBySlug,
  getLocalizedLinkHref,
  getLocalizedSectionPath,
  DEFAULT_LOCALE,
  type AppLocale,
} from "@/lib/i18n-paths";

type Props = { params: Promise<{ locale: string }> };

function asAppLocale(locale: string): AppLocale {
  return locale === "en" || locale === "de" ? locale : DEFAULT_LOCALE;
}

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
  de: {
    metaTitle: "VPN-Ratgeber",
    metaDescription:
      "Alles, was du über VPNs wissen musst: Was ein VPN ist, wie du eines auswählst, die Rechtslage in der Türkei und typische Einsatzszenarien.",
    breadcrumbHome: "Startseite",
    breadcrumbHere: "Ratgeber",
    badge: "Ratgeber",
    h1: "VPN-Ratgeber",
    lede: "Die grundlegenden Fragen zu VPNs, Einsatzszenarien und Entscheidungshilfen.",
    cta: "Ratgeber lesen",
    guides: [
      { slug: "vpn-nedir", title: "Was ist ein VPN? Ein 5-Minuten-Einsteigerleitfaden", desc: "Was ein VPN ist, wie es funktioniert und wovor es dich tatsächlich schützt.", tag: "Einsteiger" },
      { slug: "turkiye-de-vpn-yasal-mi", title: "Ist VPN in der Türkei legal?", desc: "Ein ausführlicher Rechtsleitfaden: rechtlicher Rahmen, BTK-Sperren und Risikoszenarien.", tag: "Türkei" },
      { slug: "ucretsiz-vs-ucretli-vpn", title: "Kostenloses vs. kostenpflichtiges VPN: Lohnt es sich wirklich?", desc: "Wie kostenlose VPNs Geld verdienen und wann sie tatsächlich ausreichen.", tag: "Entscheidung" },
      { slug: "vpn-guvenlik-kontrol-listesi", title: "VPN-Sicherheits-Checkliste (12 Punkte)", desc: "Alles, was du vor der Wahl eines VPN prüfen solltest.", tag: "Entscheidung" },
      { slug: "ogrenciler-icin-vpn", title: "Das beste VPN für Studenten", desc: "Campus-WLAN, akademischer Zugang und Tipps fürs Studierendenbudget.", tag: "Studenten" },
      { slug: "yurt-disindaki-turkler-icin-vpn", title: "VPN für Türken im Ausland", desc: "VPNs mit türkischen Servern für BluTV, Exxen, türkisches Banking und e-Devlet.", tag: "Diaspora" },
      { slug: "aile-ve-cocuklar-icin-vpn", title: "VPN für Familien und Kinder", desc: "Mehrere Geräte, Kindersicherung und Inhaltsfilter.", tag: "Familie" },
      { slug: "uzaktan-calisanlar-icin-vpn", title: "VPN für Remote-Arbeit", desc: "Sicherheit in Hotel-/Café-WLAN, Kundendaten und stabile Verbindungen auf Reisen.", tag: "Arbeit" },
      { slug: "yaslilar-icin-vpn", title: "VPN für Senioren", desc: "Einfache Einrichtung, Schutz vor Betrug/Phishing und eine verständliche Oberfläche.", tag: "Senioren" },
      { slug: "gamerlar-icin-vpn", title: "VPN für Gamer", desc: "Niedriger Ping, DDoS-Schutz und Region-Bypass für Game-Server.", tag: "Gaming" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[asAppLocale(locale)];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Canonical, dilin yerelleştirilmiş hub slug'ını işaret eder
    // (/rehber, /en/guide) — bkz. i18n-paths.ts.
    alternates: sectionHubAlternates("guide", locale),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = asAppLocale(locale);
  const c = CONTENT[appLocale];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          {
            name: c.breadcrumbHome,
            path: appLocale === DEFAULT_LOCALE ? "/" : `/${appLocale}`,
          },
          {
            name: c.breadcrumbHere,
            path: getLocalizedSectionPath(appLocale, "guide"),
          },
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
              // Aktif dilin yerelleştirilmiş rehber URL'i (Link locale
              // prefix'ini kendisi ekler); kayıt yoksa TR slug'a düş.
              href={(() => {
                const found = findContentBySlug("guide", g.slug);
                return found
                  ? getLocalizedLinkHref({
                      locale: appLocale,
                      section: "guide",
                      contentId: found.contentId,
                    })
                  : `/rehber/${g.slug}`;
              })()}
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
