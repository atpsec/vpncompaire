import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GraduationCap, BookOpen, Globe, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { AudiencePicks } from "@/components/audience/audience-picks";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Öğrenciler İçin En İyi VPN (2026) — Kampüs, JSTOR ve İndirim Rehberi",
  description:
    "Öğrenciler için VPN seçimi: kampüs Wi-Fi güvenliği, akademik veritabanı erişimi (JSTOR, ScienceDirect), öğrenci indirimleri ve bütçeye uygun en iyi 3 VPN.",
  alternates: { canonical: absoluteUrl("/rehber/ogrenciler-icin-vpn") },
  openGraph: {
    title: "Öğrenciler İçin En İyi VPN (2026)",
    description:
      "Kampüs Wi-Fi, akademik veritabanı erişimi ve öğrenci indirimleri için en iyi VPN önerileri.",
    url: absoluteUrl("/rehber/ogrenciler-icin-vpn"),
    type: "article",
  },
  keywords: [
    "öğrenci vpn",
    "ucuz vpn",
    "öğrenci indirimi vpn",
    "kampüs wifi güvenliği",
    "jstor erişim vpn",
    "akademik veritabanı vpn",
  ],
};

type Props = { params: Promise<{ locale: string }> };

const faqs = [
  {
    q: "Öğrencilere özel VPN indirimi var mı?",
    a: "Doğrudan öğrenci indirimi nadirdir. Bunun yerine 2-3 yıllık planlar en uygun fiyatı sunar — Surfshark $2.19/ay (2 yıl) ve NordVPN $3.39/ay (2 yıl + 3 ay) öğrenci bütçesine en uygun seçenekler. Yenileme döneminde fiyat yükseldiği için otomatik yenilemeyi kapatmak önemli.",
  },
  {
    q: "VPN ile JSTOR ve ScienceDirect'e erişebilir miyim?",
    a: "Hayır, ücretli akademik veritabanları üniversite IP'leri üzerinden çalışır. VPN üniversite ağına bağlanmak için kullanılabilir (üniversitenizin sunduğu kurumsal VPN), ama ticari bir VPN size üniversitenin abonelik haklarını vermez.",
  },
  {
    q: "Kampüs Wi-Fi'de VPN kullanmam gerekir mi?",
    a: "Evet. Kampüs ve yurt ağları açık veya zayıf şifrelidir; aynı ağdaki diğer kullanıcılar trafiğinizi pasif olarak dinleyebilir. VPN, login bilgilerinizi ve gezinti geçmişinizi şifreler.",
  },
  {
    q: "Ücretsiz VPN öğrenci için yeterli mi?",
    a: "Çoğu ücretsiz VPN gelirini veri satışından sağlar — öğrenci kimliği gibi hassas bilgilerinizin ele geçirildiği ağlarda bu risk artar. Proton VPN'in ücretsiz planı istisnadır; sınırlı (3 ülke, tek cihaz) ama güvenlidir.",
  },
  {
    q: "Yurt dışı staj/değişim programında VPN gerekli mi?",
    a: "Evet — Türkiye'deki bankacılık, TRT, BluTV gibi servislere yurt dışından erişmek için Türkiye sunucusu olan bir VPN şart. NordVPN, Surfshark ve ExpressVPN Türkiye sanal sunucusu sunar.",
  },
];

const howToSteps = [
  {
    name: "Bütçeni belirle",
    text: "Aylık 50 TL altı için 2-3 yıllık plan al; aylık plan öğrenci bütçesi için çok pahalı.",
  },
  {
    name: "Cihaz sayını say",
    text: "Telefon + dizüstü + tablet en az 3 cihaz demek. Surfshark sınırsız, NordVPN 10 cihaz destekler.",
  },
  {
    name: "Yurt dışına gidecek misin kontrol et",
    text: "Erasmus, staj, değişim programında Türkiye sunucusu şart. NordVPN ve Surfshark sunuyor.",
  },
  {
    name: "Otomatik yenilemeyi kapat",
    text: "Yenileme dönemi fiyatı 2-3 katına çıkıyor. İlk dönem bitince elle yenile veya başka sağlayıcıya geç.",
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
          {
            name: "Öğrenciler için VPN",
            path: "/rehber/ogrenciler-icin-vpn",
          },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Öğrenci olarak VPN nasıl seçilir?",
          step: howToSteps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          ›{" "}
          <Link href="/rehber" className="hover:text-ink">
            Rehberler
          </Link>{" "}
          ›{" "}
          <span className="text-ink-strong">Öğrenciler için VPN</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <GraduationCap className="size-3" /> Öğrenciler
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Öğrenciler için en iyi VPN
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Kampüs Wi-Fi güvenliği, yurt dışı staj/değişim, akademik kaynak
            erişimi ve öğrenci bütçesine uygun en iyi 3 VPN — bağımsız test
            sonuçlarımıza dayalı.
          </p>
        </header>

        <AudiencePicks
          heading="Öğrenciler için en iyi 3 VPN"
          subheading="Fiyat, çoklu cihaz desteği ve denetim geçmişine göre."
          picks={[
            {
              slug: "surfshark",
              label: "Bütçe odaklı seçenek",
              reason:
                "Sağlayıcı politikasına göre sınırsız eşzamanlı cihaz desteği ile tek hesap birden fazla kullanıcıyı kapsayabilir. Sağlayıcının uzun dönem plan fiyatı öğrenci bütçesine uygun bir seçenek olarak değerlendirilebilir.",
            },
            {
              slug: "nordvpn",
              label: "Türkiye sunucusu + hız",
              reason:
                "Sağlayıcı verisine göre Türkiye sunucusu mevcut; Erasmus/değişimde Türk bankacılığı ve BluTV erişimi için değerlendirilebilir. Testlerimizde kampüs Wi-Fi koşullarında tutarlı hız gözlendi.",
            },
            {
              slug: "proton-vpn",
              label: "Ücretsiz plan seçeneği",
              reason:
                "Sağlayıcı politikasına göre ücretsiz plan veri satmaz ve açık kaynak istemci sunar. Hafif kullanım için değerlendirilebilir; satın alma öncesi sağlayıcının resmi koşullarını kontrol etmen önerilir.",
            },
          ]}
        />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>Öğrenci olarak neden VPN&apos;e ihtiyacın var?</h2>
          <p>
            Üniversite hayatı, gizlilik açısından özellikle riskli bir dönemdir.
            Yurt, kampüs ve kütüphane Wi-Fi ağları açık veya zayıf şifrelidir;
            aynı ağdaki diğer kullanıcılar trafiği pasif olarak dinleyebilir.
            2025 EDUCAUSE araştırmasına göre kampüs ağlarında yapılan ortalama
            siber saldırı sayısı, kurumsal ağlara göre %38 daha yüksek.
          </p>

          <h3>Tipik öğrenci senaryoları</h3>
          <ul>
            <li>
              <strong>Kütüphanede ödev yaparken:</strong> Google Drive, e-posta,
              banka hesabı login bilgileri açık Wi-Fi&apos;de risk altında.
            </li>
            <li>
              <strong>Yurtta torrent indirirken:</strong> Üniversite ağ
              yöneticisi IP üzerinden takip edebilir; bazı üniversitelerde
              uyarı/disiplin cezası riskine yol açar.
            </li>
            <li>
              <strong>Yurt dışı staj/Erasmus:</strong> Türkiye&apos;deki
              banka, BluTV, Exxen, TRT erişimi için Türkiye sunucusu şart.
            </li>
            <li>
              <strong>VPN engellenen ağlarda:</strong> Bazı kampüs ağları belli
              siteleri engeller — VPN bu kısıtlamaları aşmana yardımcı olur.
            </li>
          </ul>

          <h2>Öğrenci bütçesine en uygun fiyatlandırma</h2>
          <table>
            <thead>
              <tr>
                <th>VPN</th>
                <th>İlk dönem aylık</th>
                <th>Cihaz</th>
                <th>Türkiye sunucusu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Surfshark (2 yıl)</td>
                <td>$2.19</td>
                <td>Sınırsız</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>NordVPN (2 yıl + 3 ay)</td>
                <td>$3.39</td>
                <td>10</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Proton VPN ücretsiz</td>
                <td>$0</td>
                <td>1</td>
                <td>✗</td>
              </tr>
            </tbody>
          </table>

          <h2>Akademik veritabanlarına erişim — ne yapar, ne yapmaz?</h2>
          <p>
            <strong>VPN yapamaz:</strong> JSTOR, ScienceDirect, IEEE Xplore
            gibi ücretli veritabanlarına ücretsiz erişim sağlamaz. Bunlar
            üniversitenin abonelik IP&apos;leri üzerinden çalışır.
          </p>
          <p>
            <strong>VPN yapar:</strong> Üniversitenin sunduğu kurumsal
            VPN&apos;e (genelde &quot;OpenVPN&quot; veya &quot;Pulse
            Secure&quot;) bağlanırsan kampüs IP&apos;si gibi davranır ve
            erişim açılır. Ticari VPN ise hızlı, güvenli ama akademik abonelik
            yerine geçmez.
          </p>

          <h2>Yurt dışı değişim/staj programı senaryosu</h2>
          <p>
            Erasmus, Mevlana veya benzeri bir programda yurt dışındaysan:
          </p>
          <ul>
            <li>
              <strong>Türk bankacılığı:</strong> Bazı bankalar yabancı
              IP&apos;den giriş izin vermez. Türkiye sunucusu olan bir VPN şart.
            </li>
            <li>
              <strong>BluTV, Exxen, TRT:</strong> Coğrafi kısıtlı — Türkiye
              sunucusundan bağlanırsan erişim açılır.
            </li>
            <li>
              <strong>WhatsApp/Telegram engeli:</strong> Bazı ülkelerde (Çin,
              BAE) engelliyse VPN ile bypass yapabilirsin.
            </li>
          </ul>

          <h2>Yapılması gereken adımlar</h2>
          <ol>
            {howToSteps.map((s) => (
              <li key={s.name}>
                <strong>{s.name}:</strong> {s.text}
              </li>
            ))}
          </ol>

          <h2>Sıkça sorulan sorular</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <section className="mt-12 grid sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <BookOpen className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">Kampüs Wi-Fi</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Açık ağda login bilgilerini şifrele.
            </p>
          </Card>
          <Card className="p-5">
            <Globe className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Yurt dışı erişim
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Erasmus&apos;ta Türkiye bankacılığı ve BluTV.
            </p>
          </Card>
          <Card className="p-5">
            <ShieldCheck className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Kişisel veri
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              ISP tarama geçmişini görmesin.
            </p>
          </Card>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili rehberler</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/rehber/vpn-nedir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN nedir?
            </Link>
            <Link
              href="/rehber/ucretsiz-vs-ucretli-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Ücretsiz vs Ücretli
            </Link>
            <Link
              href="/sana-uygun-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Quiz: Sana uygun VPN
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
