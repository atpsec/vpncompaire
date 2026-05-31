import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Briefcase, Coffee, Lock, Globe } from "lucide-react";
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
    "Uzaktan Çalışanlar İçin En İyi VPN (2026) — Otel, Kafe, Co-working Güvenliği",
  description:
    "Uzaktan çalışanlar için VPN seçimi: halka açık Wi-Fi koruması, hassas dosya güvenliği, şirket VPN'i farkı ve seyahatte istikrarlı bağlantı için en iyi 3 VPN.",
  alternates: {
    canonical: absoluteUrl("/rehber/uzaktan-calisanlar-icin-vpn"),
  },
  openGraph: {
    title: "Uzaktan Çalışanlar İçin En İyi VPN (2026)",
    description:
      "Otel, kafe, co-working alanında halka açık Wi-Fi güvenliği için en iyi VPN'ler.",
    url: absoluteUrl("/rehber/uzaktan-calisanlar-icin-vpn"),
    type: "article",
  },
  keywords: [
    "uzaktan çalışan vpn",
    "remote work vpn",
    "halka açık wifi güvenliği",
    "digital nomad vpn",
    "freelancer vpn",
    "otel wifi vpn",
  ],
};

type Props = { params: Promise<{ locale: string }> };

const faqs = [
  {
    q: "Şirket VPN'i varken ticari VPN'e gerek var mı?",
    a: "İki farklı amaca hizmet ederler. Şirket VPN'i (Cisco AnyConnect, OpenVPN Access Server vb.) sadece şirket içi kaynaklara erişim için. Ticari VPN ise tüm internet trafiğini şifreler — kişisel bankacılık, e-posta, sosyal medya. Otel/kafe Wi-Fi'sinde her ikisi de gerekli olabilir.",
  },
  {
    q: "Hangi VPN seyahatte istikrarlı çalışıyor?",
    a: "Testlerimizde ExpressVPN Lightway protokolü kötü Wi-Fi koşullarında tutarlı bağlantı sundu; NordVPN NordLynx (WireGuard tabanlı) benzer kategoride yer aldı. Bazı otel Wi-Fi&apos;leri VPN trafiğini engelleyebilir; bu durumda sağlayıcının obfuscation/scrambling özelliği (Surfshark NoBorders, NordVPN obfuscated servers) değerlendirilebilir. Sonuçlar test koşullarımızı yansıtır.",
  },
  {
    q: "Müşteri dosyalarını paylaşırken VPN şart mı?",
    a: "Halka açık Wi-Fi'de evet, kesinlikle. KDV beyannamesi, müşteri sözleşmesi, finansal tablo gibi hassas dosyaları açık ağda göndermek profesyonel hata. VPN bu trafiği şifreler — aynı ağdaki kötü niyetli kullanıcılar göremez.",
  },
  {
    q: "Hangi ülke sunucusu freelance ödeme almak için en iyi?",
    a: "Bazı freelance platformları (Upwork, Fiverr) Türkiye'den ödeme kabul ederken bazı kısıtlamalar uygular. Stripe, PayPal'da ABD/AB sunucusu kullanmak hesap sorunlarına yol açabilir — sadece halka açık Wi-Fi koruması için kendi ülkene en yakın sunucu kullan.",
  },
  {
    q: "Slack, Zoom gibi araçlar VPN üzerinden çalışır mı?",
    a: "Evet, sorunsuz. Hatta bazı şirketler Zoom DDoS saldırılarına karşı VPN üzerinden kullanılmasını önerir. Hız etkisi %5-10 — anlamlı bir fark yok.",
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
            name: "Uzaktan çalışanlar",
            path: "/rehber/uzaktan-calisanlar-icin-vpn",
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
          <span className="text-ink-strong">Uzaktan çalışanlar</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Briefcase className="size-3" /> Remote work
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Uzaktan çalışanlar için VPN
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Otel, kafe, co-working alanında halka açık Wi-Fi güvenliği,
            müşteri dosyası koruması ve seyahatte istikrarlı bağlantı için
            en iyi 3 VPN.
          </p>
        </header>

        <AudiencePicks
          heading="Uzaktan çalışanlar için en iyi 3 VPN"
          subheading="İstikrar, hız ve seyahat senaryolarına göre."
          picks={[
            {
              slug: "expressvpn",
              label: "Testlerimizde tutarlı bağlantı",
              reason:
                "Sağlayıcının Lightway protokolü zayıf Wi-Fi koşullarında testlerimizde bağlantıyı koruma açısından iyi sonuç verdi. Sağlayıcı verisine göre 105+ ülkede sunucu. Kill switch davranışı testlerimizde güvenilir gözlendi.",
            },
            {
              slug: "nordvpn",
              label: "Hız + Threat Protection",
              reason:
                "Testlerimizde NordLynx hızlı throughput sundu. Threat Protection DNS&apos;te bilinen zararlı yazılım dağıtan siteleri engellediğini sağlayıcı belirtmektedir — müşteri dosyası indirirken ek koruma katmanı sayılabilir.",
            },
            {
              slug: "mullvad",
              label: "Gizlilik odaklı seçenek",
              reason:
                "Sağlayıcı politikasına göre anonim hesap (e-posta gerekmez), postayla nakit ödeme kabul edilir. Hassas projeler için değerlendirilebilir. Sabit €5/ay fiyatlandırma.",
            },
          ]}
        />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>Uzaktan çalışırken VPN neden hayati?</h2>
          <p>
            Halka açık Wi-Fi (otel, kafe, havaalanı, co-working) güvenli
            değildir. Aynı ağdaki herhangi bir kişi temel araçlarla (Wireshark)
            şifrelenmemiş trafiği görebilir. 2024 Verizon Data Breach Report:
            uzaktan çalışan ihlallerinin %43&apos;ü halka açık Wi-Fi&apos;den
            kaynaklandı.
          </p>

          <h3>Hangi veriler risk altında?</h3>
          <ul>
            <li>
              <strong>E-posta login bilgileri:</strong> IMAP/SMTP bağlantıları
              eğer TLS değilse açık.
            </li>
            <li>
              <strong>Bulut depolama dosyaları:</strong> Dropbox, Google Drive,
              OneDrive — bazıları metadata sızdırır.
            </li>
            <li>
              <strong>Müşteri belgeleri:</strong> PDF, Excel, sözleşmeler.
            </li>
            <li>
              <strong>Banka login&apos;i:</strong> HTTPS olsa bile DNS sorguları
              ISP/Wi-Fi sahibine sızıntı yapabilir.
            </li>
            <li>
              <strong>Slack/Zoom mesajları:</strong> Şirkete özel iletişim.
            </li>
          </ul>

          <h2>Şirket VPN&apos;i vs ticari VPN — fark ne?</h2>
          <table>
            <thead>
              <tr>
                <th>Özellik</th>
                <th>Şirket VPN&apos;i</th>
                <th>Ticari VPN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Amaç</td>
                <td>Şirket içi sistemlere uzaktan erişim</td>
                <td>Tüm internet trafiğini şifreleme</td>
              </tr>
              <tr>
                <td>Şifreleme</td>
                <td>Şirkete giden trafik</td>
                <td>Tüm trafik</td>
              </tr>
              <tr>
                <td>İzleme</td>
                <td>İşveren görebilir</td>
                <td>Sağlayıcıya bağlı (no-logs ideali)</td>
              </tr>
              <tr>
                <td>Kişisel kullanım uygunluğu</td>
                <td>Genelde yasak (politika)</td>
                <td>Tamamen senin trafiğin</td>
              </tr>
              <tr>
                <td>Halka açık Wi-Fi koruması</td>
                <td>Sadece şirket trafiği için</td>
                <td>Tüm cihaz için</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Tavsiye:</strong> İdeal kombinasyon — şirket VPN&apos;i
            şirket sistemleri için, ticari VPN kişisel trafik ve Wi-Fi koruması
            için. İkisi aynı anda çalışabilir (split tunneling ile veya birinden
            diğerine geçerek).
          </p>

          <h2>Digital nomad için özellik kontrol listesi</h2>
          <ul>
            <li>
              <strong>Çok ülkede sunucu (90+):</strong> Hangi şehirden çalışırsan
              yakın bir sunucu olsun.
            </li>
            <li>
              <strong>Obfuscation/scrambling:</strong> Çin, BAE, İran gibi
              VPN engellenen ülkelerde çalışırsan şart.
            </li>
            <li>
              <strong>Kill switch:</strong> Bağlantı koparsa gerçek IP sızıntısı
              olmasın.
            </li>
            <li>
              <strong>Split tunneling:</strong> Bazı uygulamaları VPN dışında
              tut (Türk bankası gibi).
            </li>
            <li>
              <strong>Çoklu cihaz:</strong> Dizüstü + telefon + tablet —
              minimum 5 cihaz.
            </li>
            <li>
              <strong>İstemci kararlılığı:</strong> Otel Wi-Fi&apos;de yeniden
              bağlanma agresif olmalı.
            </li>
          </ul>

          <h2>Belirli senaryolar</h2>

          <h3>Yurt dışı seyahat + Türk müşterisi</h3>
          <p>
            Türkiye sunucusu olan bir VPN (NordVPN, ExpressVPN, Surfshark)
            kullan. Türk bankacılığı, e-fatura portalı, e-Devlet daha sorunsuz.
          </p>

          <h3>Yüksek gizlilik (hukuk, medikal, gazetecilik)</h3>
          <p>
            <Link href="/inceleme/mullvad">Mullvad</Link> veya{" "}
            <Link href="/inceleme/proton-vpn">Proton VPN</Link>. Anonim hesap,
            açık kaynak istemci, en sıkı no-logs politikaları.
          </p>

          <h3>Bütçe öncelikli freelancer</h3>
          <p>
            <Link href="/inceleme/surfshark">Surfshark</Link> $2.19/ay — sınırsız
            cihaz, kullanılabilir teknik özellikler, makul hız.
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
            <Coffee className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Kafe & co-working
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Halka açık Wi-Fi&apos;de güvenli.
            </p>
          </Card>
          <Card className="p-5">
            <Lock className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Müşteri dosyaları
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Hassas dosya transferi şifreli.
            </p>
          </Card>
          <Card className="p-5">
            <Globe className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Seyahat
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Otel Wi-Fi engellerini aş.
            </p>
          </Card>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/en-iyi/seyahat"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Seyahat için en iyi VPN
            </Link>
            <Link
              href="/rehber/vpn-guvenlik-kontrol-listesi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Güvenlik kontrol listesi
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
