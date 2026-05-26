import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Heart, AlertTriangle, MousePointerClick, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { AudiencePicks } from "@/components/audience/audience-picks";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yaşlılar İçin En İyi VPN (2026) — Basit Kurulum + Dolandırıcılık Koruması",
  description:
    "Yaşlı kullanıcılar için VPN: tek tıklama bağlantı, dolandırıcılık/phishing koruması, sade Türkçe arayüz. Anne-baban için en uygun 3 VPN.",
  alternates: { canonical: absoluteUrl("/rehber/yaslilar-icin-vpn") },
  openGraph: {
    title: "Yaşlılar İçin En İyi VPN (2026)",
    description:
      "Basit kurulum, dolandırıcılık koruması ve sade arayüzlü VPN'ler.",
    url: absoluteUrl("/rehber/yaslilar-icin-vpn"),
    type: "article",
  },
  keywords: [
    "yaşlılar için vpn",
    "kolay kurulum vpn",
    "dolandırıcılık koruması vpn",
    "phishing koruması",
    "basit vpn türkçe",
    "anne baba vpn",
  ],
};

type Props = { params: Promise<{ locale: string }> };

const faqs = [
  {
    q: "Yaşlı biri VPN'i tek başına kullanabilir mi?",
    a: "Modern VPN uygulamaları büyük 'Bağlan' butonu ile tasarlandı. NordVPN, Surfshark ve ExpressVPN tek tıklamayla bağlantı sunar. İlk kurulumu birinin yapması (öneririz: sen) ve otomatik başlatmayı açman yeterli.",
  },
  {
    q: "VPN sahte SMS ve dolandırıcılığı engelliyor mu?",
    a: "Tamamen değil ama önemli yardım eder. NordVPN Threat Protection, Surfshark CleanWeb, Proton NetShield bilinen phishing ve dolandırıcılık sitelerini DNS düzeyinde engeller. 'banka mesajı' diye gelen sahte linke tıklasa bile, çoğu zaman site açılmaz.",
  },
  {
    q: "Telefonda VPN yaşlılar için çok karmaşık değil mi?",
    a: "Hayır. iPhone ve Android uygulamaları tek ekranlı: büyük bağlan butonu + ülke seçimi. Otomatik bağlantı özelliği açılırsa kullanıcı manuel müdahale yapmaz — sadece açtığında bağlı olur.",
  },
  {
    q: "Yanlışlıkla bir tuşa basarsa zarar verir mi?",
    a: "Hayır. VPN uygulamasında yanlış tuşa basmak en fazla bağlantıyı koparır — internet erişimi sürer (kill switch açık değilse). Veri kaybı veya finansal zarar mümkün değildir.",
  },
  {
    q: "Hangi VPN'i annem/babam için kuralım?",
    a: "Surfshark veya NordVPN. Türkçe arayüz, büyük bağlan butonu, otomatik başlatma, içerik filtreleme. ExpressVPN de iyi ama daha pahalı; yaşlı kullanıcı için ek özellikler boşa gidiyor.",
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
            name: "Yaşlılar için VPN",
            path: "/rehber/yaslilar-icin-vpn",
          },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

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
          <span className="text-ink-strong">Yaşlılar için VPN</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Heart className="size-3" /> Yaşlılar
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Yaşlılar için en iyi VPN
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Anne-baban veya büyüklerin için: basit kurulum, dolandırıcılık
            koruması, sade Türkçe arayüz. Tek tıklamayla bağlantı, otomatik
            başlatma.
          </p>
        </header>

        <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Önemli istatistik
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                Yaşlı bireyler, kamuya yansıyan araştırmalara göre siber
                dolandırıcılık vakalarının önemli bir kısmında risk
                grubundadır. VPN&apos;in DNS düzeyinde içerik filtreleme
                özelliği bilinen sahte siteleri engelleme katmanı sunabilir;
                ancak tek başına bir koruma garantisi değildir. Bilinçli
                kullanım ve aile içi eğitim önerilir.
              </p>
            </div>
          </div>
        </Card>

        <AudiencePicks
          heading="Yaşlılar için en iyi 3 VPN"
          subheading="Kolay kullanım, içerik filtreleme ve fiyata göre."
          picks={[
            {
              slug: "surfshark",
              label: "Sade arayüz odaklı seçenek",
              reason:
                "Sağlayıcı uygulamasında tek ekranlı sade arayüz, Türkçe dil desteği mevcuttur. CleanWeb özelliği bilinen sahte siteleri DNS düzeyinde engelleme katmanı sunar. Sınırsız cihaz politikası tek hesapla aile kullanımı için değerlendirilebilir.",
            },
            {
              slug: "nordvpn",
              label: "Threat Protection",
              reason:
                "Sağlayıcının Threat Protection özelliği, sahte banka SMS&apos;leri ve phishing linklerine karşı koruma katmanı sunar. Türkçe arayüz ve sade kullanım, yaşlı kullanıcılar için değerlendirilebilir.",
            },
            {
              slug: "expressvpn",
              label: "Maksimum İstikrar",
              reason:
                "Testlerimizde tutarlı bağlantı gözlenen sağlayıcılardan. Sağlayıcı politikasına göre 7/24 canlı sohbet desteği mevcut (Türkçe destek bulunmamaktadır). Premium fiyat seviyesinde değerlendirme gerektirebilir.",
            },
          ]}
        />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>Yaşlılar için VPN&apos;in en önemli özellikleri</h2>

          <h3>1. Tek tıklamayla bağlantı</h3>
          <p>
            Modern VPN uygulamaları artık &quot;ülke seç, protokol seç, bağlan&quot;
            ekranı değil. NordVPN, Surfshark ve ExpressVPN uygulamaları açılır
            açılmaz büyük bir &quot;Bağlan&quot; butonu gösterir. Tek dokunuş
            yeter.
          </p>

          <h3>2. Otomatik başlatma</h3>
          <p>
            Telefon açılınca VPN&apos;in otomatik bağlanması. Yaşlı kullanıcı
            manuel müdahale yapmaz; cihazı her açtığında zaten korunur durumda
            olur.
          </p>

          <h3>3. Dolandırıcılık/phishing koruması</h3>
          <p>
            DNS düzeyinde bilinen sahte siteleri engelleme:
          </p>
          <ul>
            <li>
              <strong>NordVPN Threat Protection:</strong> Kötü amaçlı URL
              veritabanı sürekli güncellenir. Sahte banka, sahte kargo, sahte
              ödüllendirme linkleri engelli.
            </li>
            <li>
              <strong>Surfshark CleanWeb:</strong> Reklam + phishing + malware
              engelleme.
            </li>
            <li>
              <strong>Proton VPN NetShield:</strong> Aynı kategoride çalışır,
              açık kaynak doğrulanabilir.
            </li>
          </ul>

          <h3>4. Türkçe arayüz</h3>
          <p>
            NordVPN, Surfshark ve ExpressVPN uygulamaları Türkçe destekler.
            Proton VPN ve Mullvad Türkçe yok — bu sayfa için uygun değiller.
          </p>

          <h2>Yaşlı bireyi en çok hedef alan dolandırıcılık türleri</h2>
          <ul>
            <li>
              <strong>Sahte banka SMS&apos;leri:</strong> &quot;Kart kullanım
              limitiniz aşıldı, bu linke tıklayın&quot; — link sahte siteye gider.
              VPN bunu DNS&apos;te engeller.
            </li>
            <li>
              <strong>Kargo bildirimleri:</strong> &quot;Paketiniz
              gönderilemedi, gümrük ödeyin&quot; — sahte ödeme sayfası.
            </li>
            <li>
              <strong>Sahte SGK/devlet mesajları:</strong> &quot;Ek emekli
              ödemesi&quot; veya &quot;ceza ödemesi&quot; vaadi.
            </li>
            <li>
              <strong>Romantizm dolandırıcılığı:</strong> Sosyal medyada tanışan
              &quot;asker&quot; veya &quot;dul kadın&quot; — burada VPN
              koruyamaz, eğitim/uyarı şart.
            </li>
          </ul>
          <p>
            <strong>VPN sınırı:</strong> VPN sosyal mühendislik (ikna ederek
            bilgi alma) tabanlı dolandırıcılığa karşı koruyamaz. Aile içi
            eğitim ve şüpheci yaklaşım şart.
          </p>

          <h2>Kurulum adımları (sevdiğin için sen yap)</h2>
          <ol>
            <li>
              VPN hesabını <strong>kendi e-postanla aç</strong> — kullanıcının
              değil. Böylece yenileme ve sorunla sen ilgilenirsin.
            </li>
            <li>
              Telefona/tablete uygulamayı <strong>kur, giriş yap</strong>.
            </li>
            <li>
              <strong>Otomatik bağlantı</strong> ayarını aç (Ayarlar → Otomatik
              Bağlantı → Açık).
            </li>
            <li>
              <strong>Threat Protection / CleanWeb / NetShield</strong>
              özelliğini etkinleştir.
            </li>
            <li>
              <strong>Türkçe dili</strong> ayarla.
            </li>
            <li>
              Telefonu yeniden başlat, uygulamanın otomatik bağlandığını
              doğrula.
            </li>
            <li>
              Kullanıcıya <strong>tek bir şey öğret</strong>: &quot;Yeşil yazıyorsa
              güvendesin, gri ise bağlantı yok&quot;.
            </li>
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
            <MousePointerClick className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Tek tıkla bağlan
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Büyük buton, sade arayüz.
            </p>
          </Card>
          <Card className="p-5">
            <ShieldCheck className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Phishing engelleme
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Sahte banka/kargo linkleri engelli.
            </p>
          </Card>
          <Card className="p-5">
            <Heart className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Türkçe destek
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Anlaşılır arayüz, Türkçe metin.
            </p>
          </Card>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/rehber/vpn-nedir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN nedir?
            </Link>
            <Link
              href="/rehber/aile-ve-cocuklar-icin-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Aile için VPN
            </Link>
            <Link
              href="/sana-uygun-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Quiz: Sana uygun VPN
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
