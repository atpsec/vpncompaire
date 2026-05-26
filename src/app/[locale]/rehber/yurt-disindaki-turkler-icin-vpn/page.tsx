import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Plane, Tv, Building2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { AudiencePicks } from "@/components/audience/audience-picks";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Yurt Dışındaki Türkler İçin En İyi VPN (2026) — BluTV, Exxen, Bankacılık",
  description:
    "Yurt dışında BluTV, Exxen, TRT, Türk bankacılığı ve devlet servislerine erişim için Türkiye sunuculu en iyi VPN'ler. Almanya, ABD, İngiltere'den test edilmiş.",
  alternates: {
    canonical: absoluteUrl("/rehber/yurt-disindaki-turkler-icin-vpn"),
  },
  openGraph: {
    title: "Yurt Dışındaki Türkler İçin En İyi VPN (2026)",
    description:
      "BluTV, Exxen, Türk bankacılığı için Türkiye sunucusu olan en iyi VPN'ler.",
    url: absoluteUrl("/rehber/yurt-disindaki-turkler-icin-vpn"),
    type: "article",
  },
  keywords: [
    "yurt dışından türkiye vpn",
    "almanya türkiye vpn",
    "blutv yurt dışı",
    "exxen yurt dışı vpn",
    "türk bankası yurt dışı erişim",
    "trt izle yurt dışından",
  ],
};

type Props = { params: Promise<{ locale: string }> };

const faqs = [
  {
    q: "Almanya'dan BluTV'yi izleyebilir miyim?",
    a: "Evet, Türkiye sunucusu olan bir VPN ile. NordVPN, ExpressVPN ve Surfshark Türkiye sanal sunucusu sunar ve BluTV bypass'ı testlerimizde başarıyla çalıştı.",
  },
  {
    q: "Türk bankası yabancı IP'den giriş engellemiyor mu?",
    a: "Bazı bankalar (Akbank, İş Bankası, Garanti BBVA) yurt dışı IP'leri risk olarak işaretler ve ek doğrulama isteyebilir. Türkiye sunuculu VPN ile bağlanmak bu sürtüşmeyi azaltır. Ancak bazı bankalar VPN tespiti yapabilir — bu durumda mobil veriye geçmek gerekebilir.",
  },
  {
    q: "Hangi ülkelerde Türk içeriklere erişim sorun?",
    a: "Almanya, ABD, İngiltere, Hollanda, Fransa gibi Türk diasporasının yoğun olduğu ülkelerde BluTV, Exxen, TRT coğrafi olarak kısıtlanmıştır. Türk kanalları (TV+ üzerinden) ve devlet servisleri (e-Devlet) de yabancı IP'den sorun çıkarabilir.",
  },
  {
    q: "TRT canlı yayın yurt dışından çalışır mı?",
    a: "TRT'nin web sitesi çoğu içerik için Türkiye'den erişim ister. Türkiye sunucusu olan bir VPN ile sorun olmadan izleyebilirsiniz. TRT İzle uygulaması mobilde daha güvenilir çalışır.",
  },
  {
    q: "e-Devlet'e yurt dışından VPN'le bağlanmak yasal mı?",
    a: "Evet. Türk vatandaşının kendi devlet portalına erişmek için kullandığı VPN tamamen yasaldır — yasaklı bir aktivite değil, sadece coğrafi bypass.",
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
            name: "Yurt dışındaki Türkler",
            path: "/rehber/yurt-disindaki-turkler-icin-vpn",
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
          <span className="text-ink-strong">Yurt dışındaki Türkler</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Plane className="size-3" /> Diaspora
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Yurt dışındaki Türkler için VPN
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Almanya, ABD, İngiltere, Hollanda&apos;da yaşayan Türklerin BluTV,
            Exxen, TRT, Türk bankacılığı ve e-Devlet&apos;e sorunsuz
            erişebilmesi için Türkiye sunucusu olan en iyi VPN&apos;ler.
          </p>
        </header>

        <AudiencePicks
          heading="Yurt dışındaki Türkler için en iyi 3 VPN"
          subheading="Türkiye sunucusu, hız ve streaming bypass'ına göre."
          picks={[
            {
              slug: "nordvpn",
              label: "Genel kullanım için aday",
              reason:
                "Sağlayıcı verisine göre Türkiye sanal sunucusu mevcut + NordLynx protokolü. Testlerimizde BluTV, Exxen, TRT erişimi tarafımızca test edilen senaryolarda çalıştı. Streaming uyumluluğu zamanla değişebilir.",
            },
            {
              slug: "expressvpn",
              label: "Testlerimizde tutarlı bağlantı",
              reason:
                "Sağlayıcının Lightway protokolü ile bağlantı kurulumu hızlıdır. Türkiye sunucusunda testlerimizde tutarlı erişim gözlendi. Premium fiyat seviyesinde değerlendirme gerektirebilir.",
            },
            {
              slug: "surfshark",
              label: "Bütçe + çoklu cihaz",
              reason:
                "Sağlayıcı politikasına göre sınırsız eşzamanlı cihaz desteği ile tüm aile cihazları tek hesapla yönetilebilir. Sağlayıcı verisine göre Türkiye sunucusu mevcut.",
            },
          ]}
        />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>Yurt dışından Türkiye&apos;ye bağlanma senaryoları</h2>

          <h3>1. Türk dizilerini izlemek</h3>
          <p>
            BluTV, Exxen, GAİN, TabiiGo, TRT — hepsi coğrafi kısıtlı. Türkiye
            dışındaki IP&apos;den eriştiğinde içerik kataloğu kısalır veya
            tamamen engellenir. Türkiye sunucusu olan VPN bu engeli kaldırır.
          </p>

          <h3>2. Türk bankacılığı</h3>
          <p>
            Akbank, İş Bankası, Garanti BBVA, Ziraat gibi bankalar yurt dışı
            IP&apos;leri risk olarak değerlendirir. Bazı işlemler (havale,
            yüksek tutarlı ödemeler) ek doğrulama veya tamamen engelleme ile
            karşılaşabilir. Türkiye IP&apos;si bu sürtüşmeyi azaltır.
          </p>
          <p>
            <strong>Önemli:</strong> Bazı bankalar VPN tespiti yapar (özellikle
            mobil bankacılık uygulamaları). Bu durumda VPN&apos;i kapatıp mobil
            veriye geçmen gerekebilir.
          </p>

          <h3>3. e-Devlet ve resmi servisler</h3>
          <p>
            e-Devlet portalı yabancı IP&apos;den çoğu zaman açılır ama bazı
            işlemler (vekalet, askerlik) için ek doğrulama isteyebilir. Türkiye
            sunucusu sürtüşmeyi sıfıra indirir.
          </p>

          <h3>4. WhatsApp/Telegram/sosyal medya kısıtlamaları</h3>
          <p>
            Bazı ülkelerde (Çin, BAE, Rusya) Türkiye&apos;deki yakınlarınla
            iletişim için kullandığın servisler engelli. VPN, herhangi bir
            ülke sunucusuna bağlanarak bu engeli aşar.
          </p>

          <h2>Hangi şehirden hangi VPN?</h2>
          <table>
            <thead>
              <tr>
                <th>Yaşadığın ülke</th>
                <th>Önerilen VPN</th>
                <th>Neden</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Almanya, Avusturya, Hollanda</td>
                <td>NordVPN</td>
                <td>
                  En düşük gecikme — Türkiye sunucuları Avrupa&apos;da dağıtık
                </td>
              </tr>
              <tr>
                <td>İngiltere, İrlanda</td>
                <td>ExpressVPN</td>
                <td>Lightway istikrarı + Türkiye bağlantısı</td>
              </tr>
              <tr>
                <td>ABD, Kanada</td>
                <td>ExpressVPN veya NordVPN</td>
                <td>Atlantik geçişi için optimize edilmiş sunucular</td>
              </tr>
              <tr>
                <td>Körfez (BAE, Suudi Arabistan)</td>
                <td>Surfshark + NoBorders modu</td>
                <td>VPN tespit engelleme özelliği güçlü</td>
              </tr>
              <tr>
                <td>Bütçe öncelikli (her yerden)</td>
                <td>Surfshark</td>
                <td>Sınırsız cihaz — tüm aile kullanabilir</td>
              </tr>
            </tbody>
          </table>

          <h2>Türkiye sunucusu olan VPN&apos;ler</h2>
          <p>
            10 inceleme yaptığımız VPN&apos;den Türkiye sunucusu sunanlar:
          </p>
          <ul>
            <li>
              <Link href="/inceleme/nordvpn">NordVPN</Link> — Sanal Türkiye
              sunucuları (fiziksel sunucu yok, IP Türkiye&apos;ye atanmış)
            </li>
            <li>
              <Link href="/inceleme/expressvpn">ExpressVPN</Link> — Sanal
              Türkiye sunucuları, çok istikrarlı
            </li>
            <li>
              <Link href="/inceleme/surfshark">Surfshark</Link> — Sanal Türkiye
              sunucuları, sınırsız cihaz
            </li>
            <li>
              <Link href="/inceleme/cyberghost">CyberGhost</Link> — Streaming
              için optimize edilmiş Türkiye sunucuları
            </li>
            <li>
              <Link href="/inceleme/pia">PIA</Link> — Türkiye sunucusu var,
              port forwarding destekli
            </li>
          </ul>
          <p>
            Mullvad, Proton VPN ve TunnelBear Türkiye sunucusu sunmaz; bu
            sayfanın kullanım senaryosuna uygun değildir.
          </p>

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
            <Tv className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              BluTV & Exxen
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Türk dizileri, maçlar, canlı yayın.
            </p>
          </Card>
          <Card className="p-5">
            <Building2 className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Bankacılık
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Türk bankası login&apos;i kolaylaştır.
            </p>
          </Card>
          <Card className="p-5">
            <ShieldCheck className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              e-Devlet
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Resmi işlemler için Türkiye IP&apos;si.
            </p>
          </Card>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/en-iyi/yurt-disindaki-turkler"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Diaspora kullanım senaryosu
            </Link>
            <Link
              href="/en-iyi/streaming"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Streaming için en iyi
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
