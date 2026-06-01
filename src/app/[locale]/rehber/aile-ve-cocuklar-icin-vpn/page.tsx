import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Users, Filter, Smartphone, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { AudiencePicks } from "@/components/audience/audience-picks";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

const baseMeta: Metadata = {
  title: "Aile ve Çocuklar İçin En İyi VPN (2026) — Ebeveyn Kontrolü + Çoklu Cihaz",
  description:
    "Aile için VPN: çoklu cihaz desteği, ebeveyn kontrolü, zararlı içerik filtreleme, çocukların güvenli internet kullanımı. Sınırsız cihazlı en iyi 3 VPN.",
  alternates: { canonical: absoluteUrl("/rehber/aile-ve-cocuklar-icin-vpn") },
  openGraph: {
    title: "Aile ve Çocuklar İçin En İyi VPN (2026)",
    description:
      "Çoklu cihaz, ebeveyn kontrolü ve zararlı içerik filtreleme için en iyi aile VPN'leri.",
    url: absoluteUrl("/rehber/aile-ve-cocuklar-icin-vpn"),
    type: "article",
  },
  keywords: [
    "aile vpn",
    "çocuklar için vpn",
    "ebeveyn kontrolü vpn",
    "zararlı içerik filtreleme",
    "çoklu cihaz vpn",
    "güvenli internet çocuk",
  ],
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...baseMeta,
    alternates: localizedAlternates("/rehber/aile-ve-cocuklar-icin-vpn", locale),
    openGraph: {
      ...baseMeta.openGraph,
      url: absoluteUrl("/rehber/aile-ve-cocuklar-icin-vpn", locale),
    },
  };
}

const faqs = [
  {
    q: "VPN çocuğumun zararlı içeriklere erişmesini engelleyebilir mi?",
    a: "Bazıları evet. Surfshark CleanWeb, NordVPN Threat Protection ve Proton VPN NetShield reklam, kötü amaçlı yazılım ve yetişkin içerik kategorilerini DNS düzeyinde engelleyebilir. Tam ebeveyn kontrolü değildir (Qustodio gibi yazılımlar tam çözüm sunar) ama temel filtreleme için yeterli.",
  },
  {
    q: "Bir aile aboneliği kaç cihaz desteklemeli?",
    a: "Tipik bir 4 kişilik ailede: 4 telefon + 2 dizüstü + 1-2 tablet + 1 akıllı TV = en az 8-9 cihaz. Surfshark sınırsız sunar; NordVPN 10, ExpressVPN 8 cihaz. Tek hesap tüm aile için yeterli.",
  },
  {
    q: "Aile üyeleri farklı ülke sunucularına aynı anda bağlanabilir mi?",
    a: "Evet. NordVPN, Surfshark, ExpressVPN tüm aile cihazlarına izin verir ve her cihaz farklı bir ülkeden bağlanabilir — birisi Türkiye, birisi ABD, birisi Almanya sunucusunda olabilir.",
  },
  {
    q: "Çocuğumun akıllı TV'sinde VPN nasıl kullanırım?",
    a: "Android TV uygulaması olan VPN (Surfshark, NordVPN, ExpressVPN) doğrudan kurulabilir. Apple TV veya eski TV'ler için VPN'i router'da kurarak tüm ev ağına uygulayabilirsiniz — bu durumda tek 'cihaz' sayılır.",
  },
  {
    q: "Aile VPN'i ne kadar tutar?",
    a: "Aylık ortalama $2-5 (uzun dönem planlarda). Surfshark $2.19/ay (2 yıl), NordVPN $3.39/ay (2 yıl + 3 ay). 4 kişilik bir aile için ayrı ayrı ödemek yerine tek hesap çok daha ekonomiktir.",
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
            name: "Aile ve çocuklar için VPN",
            path: "/rehber/aile-ve-cocuklar-icin-vpn",
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
          <span className="text-ink-strong">Aile ve çocuklar</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Users className="size-3" /> Aile
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Aile ve çocuklar için en iyi VPN
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Çoklu cihaz desteği, zararlı içerik filtreleme ve tüm aile ev ağı
            koruması için en iyi 3 VPN. Tek hesap, sınırsız aile üyesi.
          </p>
        </header>

        <AudiencePicks
          heading="Aile için en iyi 3 VPN"
          subheading="Cihaz limiti, içerik filtreleme ve fiyata göre."
          picks={[
            {
              slug: "surfshark",
              label: "Çoklu cihaz odaklı seçenek",
              reason:
                "Sağlayıcı politikasına göre sınırsız eşzamanlı cihaz desteği — aile içi paylaşım için değerlendirilebilir. CleanWeb özelliği içerik filtreleme katmanı sunar.",
            },
            {
              slug: "nordvpn",
              label: "Threat Protection özelliği",
              reason:
                "Sağlayıcı verisine göre 10 cihaz limiti çoğu aile için yeterli olabilir. Threat Protection özelliği reklam, izleyici ve zararlı yazılım engelleme katmanı sunar; tam ebeveyn kontrolü değildir, ek koruma yazılımı önerilir.",
            },
            {
              slug: "proton-vpn",
              label: "Açık kaynak istemci",
              reason:
                "Sağlayıcı verisine göre NetShield ile reklam/zararlı yazılım filtreleme ve açık kaynak istemciler sunulmaktadır. Kod GitHub&apos;da yayınlanmıştır; bağımsız denetim için referans alınabilir.",
            },
          ]}
        />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>Aile için VPN — basit bir karar matrisi</h2>
          <p>
            4 kişilik bir ailede ortalama 8-10 cihaz var: telefonlar, dizüstüler,
            tabletler, akıllı TV. VPN&apos;in aile için anlamlı olması için 3
            temel özellik olmalı:
          </p>
          <ol>
            <li>
              <strong>Yeterli cihaz limiti</strong> — minimum 8, ideali sınırsız.
            </li>
            <li>
              <strong>İçerik filtreleme</strong> — DNS düzeyinde reklam,
              izleyici, zararlı içerik engelleme.
            </li>
            <li>
              <strong>Kolay kurulum</strong> — eşin/çocuğun teknik bilgisi
              olmadan kullanabilmeli.
            </li>
          </ol>

          <h2>Çocukların internet güvenliği için VPN ne yapar?</h2>

          <h3>Yapar:</h3>
          <ul>
            <li>
              <strong>Halka açık Wi-Fi koruması:</strong> Tatilde, alışveriş
              merkezinde, kafede çocuğun cihazını dinlemeden korur.
            </li>
            <li>
              <strong>Reklam/izleyici engelleme:</strong> Surfshark CleanWeb,
              NordVPN Threat Protection, Proton NetShield bu özelliği sunar.
            </li>
            <li>
              <strong>Zararlı site engelleme:</strong> Phishing ve malware
              dağıtan bilinen domain&apos;leri DNS düzeyinde bloklar.
            </li>
            <li>
              <strong>Coğrafi bypass:</strong> Yurt dışında Türkçe çocuk
              içeriklerine (TRT Çocuk, vb.) erişim.
            </li>
          </ul>

          <h3>Yapmaz:</h3>
          <ul>
            <li>
              <strong>Detaylı ebeveyn kontrolü:</strong> Ekran süresi, uygulama
              kısıtlaması, içerik kategori bazlı engelleme için Qustodio,
              Norton Family veya Apple Screen Time gibi araçlar gerekir.
            </li>
            <li>
              <strong>Sosyal medya kullanımı izleme:</strong> VPN, mesaj
              içeriğini görmez — sadece şifreler.
            </li>
            <li>
              <strong>Yaş bazlı içerik kısıtlaması:</strong> Google Family Link
              veya işletim sistemi düzeyinde kontroller daha etkili.
            </li>
          </ul>

          <h2>Router&apos;a kurmak: tüm ev ağı korunsun</h2>
          <p>
            VPN&apos;i ev router&apos;ına kurarak tüm cihazları (akıllı TV,
            oyun konsolu, IoT cihazlar) tek seferde korumak mümkün. Avantajlar:
          </p>
          <ul>
            <li>Tek &quot;cihaz&quot; sayılır — cihaz limiti dert değil.</li>
            <li>
              VPN uygulaması olmayan cihazlar (akıllı TV, eski tablet) da
              korunur.
            </li>
            <li>Misafirler de otomatik korunur.</li>
          </ul>
          <p>
            <strong>Dezavantaj:</strong> Bazı router&apos;lar (özellikle ISP&apos;den
            verilen) VPN istemci desteklemez. ASUS, GL.iNet veya OPNsense
            tabanlı router&apos;lar destekler. NordVPN, ExpressVPN ve Surfshark
            router kurulum kılavuzları sunar.
          </p>

          <h2>Aile üyeleri farklı ülkelerden bağlanabilir mi?</h2>
          <p>
            Evet. Eş Türkiye sunucusunda BluTV izlerken, çocuk Almanya
            sunucusundan ödev yapabilir, sen ABD sunucusundan Netflix US&apos;te
            içerik izleyebilirsin — hepsi aynı hesapla, aynı anda.
          </p>

          <h2>Cihaz başına maliyet karşılaştırması</h2>
          <table>
            <thead>
              <tr>
                <th>VPN</th>
                <th>Cihaz limiti</th>
                <th>Aylık fiyat</th>
                <th>9 cihaz için cihaz başı</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Surfshark</td>
                <td>Sınırsız</td>
                <td>$2.19</td>
                <td>$0.24/cihaz</td>
              </tr>
              <tr>
                <td>NordVPN</td>
                <td>10</td>
                <td>$3.39</td>
                <td>$0.34/cihaz</td>
              </tr>
              <tr>
                <td>Proton VPN Plus</td>
                <td>10</td>
                <td>$4.99</td>
                <td>$0.50/cihaz</td>
              </tr>
              <tr>
                <td>ExpressVPN</td>
                <td>8</td>
                <td>$6.67</td>
                <td>$0.83/cihaz</td>
              </tr>
            </tbody>
          </table>

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
            <Smartphone className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Çoklu cihaz
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Tek hesap, tüm aile.
            </p>
          </Card>
          <Card className="p-5">
            <Filter className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              İçerik filtreleme
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Reklam, izleyici, zararlı site.
            </p>
          </Card>
          <Card className="p-5">
            <ShieldCheck className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Halka açık Wi-Fi
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Tatil, AVM, kafe — çocuk güvende.
            </p>
          </Card>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/cihazlar"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Cihaz bazlı kurulum
            </Link>
            <Link
              href="/rehber/uzaktan-calisanlar-icin-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Uzaktan çalışanlar
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
