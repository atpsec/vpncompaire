import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, ListChecks } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "VPN Güvenlik Kontrol Listesi (12 Madde) (2026)",
  description:
    "Bir VPN seçmeden önce kontrol etmen gereken 12 madde — gizlilik, denetim, teknik altyapı ve kullanım hakları.",
};

type Props = { params: Promise<{ locale: string }> };

const items = [
  {
    title: "1. Yargı yetkisi (Jurisdiction)",
    question: "VPN sağlayıcı hangi ülke yasalarına tabi?",
    answer:
      "Beş/Dokuz/On Dört Göz ittifaklarının dışı (Panama, İsviçre, Romanya, BVI) genelde daha güçlü gizlilik koruması sağlar. ABD veya UK merkezli sağlayıcılar — no-logs uygulasa bile — yasal baskıya daha açık.",
  },
  {
    title: "2. Bağımsız denetim kanıtı",
    question: "No-logs iddiası üçüncü taraf tarafından doğrulanmış mı?",
    answer:
      "Deloitte, KPMG, Cure53, Securitum veya Assured AB gibi tanınmış denetim firmalarının raporu olmalı. Tek seferlik denetim yetersiz — tekrarlanan denetimler tercih edilir. NordVPN'in 6x Deloitte örneği referans.",
  },
  {
    title: "3. No-logs politikası",
    question: "Sağlayıcı ne tür log tutuyor?",
    answer:
      "İdeal: ziyaret edilen siteler, IP adresleri, bağlantı zaman damgaları, kullanılan bant genişliği — hiçbiri tutulmamalı. Sadece hesap için gereken minimum bilgi (e-posta, ödeme).",
  },
  {
    title: "4. Şifreleme standardı",
    question: "Hangi şifreleme algoritması ve anahtar uzunluğu?",
    answer:
      "AES-256-GCM endüstri standardı. WireGuard ChaCha20-Poly1305 kullanır (daha hızlı, modern). Eski PPTP veya L2TP/IPsec'i kullanan sağlayıcılardan kaçın.",
  },
  {
    title: "5. Protokol seçenekleri",
    question: "Hangi VPN protokollerini destekliyor?",
    answer:
      "Minimum: WireGuard veya WireGuard tabanlı (NordLynx). OpenVPN seçeneği olsa iyi (esneklik için). Sadece eski protokol sunanları (PPTP, L2TP) eleyin.",
  },
  {
    title: "6. DNS sızıntı koruması",
    question: "VPN aktifken DNS sorguları nereye gidiyor?",
    answer:
      "VPN sağlayıcısının kendi DNS sunucularına gitmeli. ISS'nin DNS sunucusuna sızıntı olursa, ISS hangi siteleri ziyaret ettiğini görür. Sızıntı testi: dnsleaktest.com.",
  },
  {
    title: "7. Kill switch (öldürme anahtarı)",
    question: "VPN bağlantısı koparsa ne olur?",
    answer:
      "Kill switch, VPN bağlantısı koptuğunda tüm internet trafiğini otomatik keser — gerçek IP'nin sızmasını engeller. Sistem geneli (system-wide) kill switch tercih edilir, sadece uygulama bazlı değil.",
  },
  {
    title: "8. RAM-only sunucu altyapısı",
    question: "Sunucular nasıl çalışıyor?",
    answer:
      "Modern üst seviye sağlayıcılar (NordVPN, ExpressVPN, Surfshark) yalnızca RAM üzerinde çalışan sunucular kullanır. Yeniden başlatıldığında tüm veri silinir — kalıcı log fiziksel olarak imkânsız.",
  },
  {
    title: "9. Açık kaynak istemciler",
    question: "VPN uygulamasının kodu kamuya açık mı?",
    answer:
      "Açık kaynak istemciler, bağımsız güvenlik araştırmacılarının kodu incelemesine izin verir — arka kapı veya zafiyet tespit edilebilir. Proton VPN, Mullvad, PIA tüm istemcileri açık kaynak; ExpressVPN Lightway protokolünü açtı.",
  },
  {
    title: "10. Cihaz sayısı sınırı",
    question: "Aynı abonelikten kaç cihazda kullanabilirsin?",
    answer:
      "Aile veya çoklu cihaz senaryolarında 5+ cihaz minimum gereksinim. Surfshark sınırsız sunar; NordVPN 10, ExpressVPN 8 cihaz. Mullvad'da 5 cihaz limiti var.",
  },
  {
    title: "11. Mahkeme kanıtı (varsa)",
    question: "No-logs iddiası bir hukuki davada test edildi mi?",
    answer:
      "Çok az sağlayıcı bu test geçmişine sahip. PIA, 2016 ve 2018 federal davalarında no-logs iddiasını mahkemede doğruladı. ExpressVPN, 2017'de Türkiye'de sunucusuna el konulmasına rağmen veri ifşası yapamadı. Bu, en güçlü kanıt seviyesidir.",
  },
  {
    title: "12. Fiyatlandırma şeffaflığı",
    question: "Yenileme fiyatı belli mi?",
    answer:
      "Çoğu sağlayıcı 'ilk dönem ucuz, yenileme pahalı' modeli kullanır. Bunu önceden bilmek önemli — sürpriz yüksek fişle karşılaşmamak için. Mullvad sabit fiyat sunar, indirim/yenileme tuzağı yok.",
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
            name: "VPN güvenlik kontrol listesi",
            path: "/rehber/vpn-guvenlik-kontrol-listesi",
          },
        ])}
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
          › <span className="text-ink-strong">Güvenlik kontrol listesi</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <ListChecks className="size-3" /> Kontrol listesi
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN güvenlik kontrol listesi
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Bir VPN seçmeden önce kontrol etmen gereken 12 madde. Her madde,
            sağlayıcının pazarlama söyleminden bağımsız olarak doğrulayabileceğin
            objektif bir kriter.
          </p>
        </header>

        <ol className="mt-10 space-y-4">
          {items.map((item) => (
            <Card key={item.title} className="p-6">
              <div className="flex items-start gap-3">
                <div className="inline-flex items-center justify-center size-6 rounded-full bg-success-50 text-success-700 shrink-0 mt-0.5">
                  <Check className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-ink-strong">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-ink-muted">
                    {item.question}
                  </p>
                  <p className="mt-2 text-ink leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </ol>

        <Card className="mt-12 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong">
            Bu listeyi nasıl kullan?
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            Bir VPN seçerken bu 12 maddeyi sağlayıcının kendi sitesinde,
            denetim raporlarında ve bağımsız incelemelerde doğrula.
            İncelemelerimiz zaten bu kriterleri kullanıyor — kendi sıralamamızı
            görmek için{" "}
            <Link href="/en-iyi-vpn" className="text-brand-700 underline">
              en iyi 10 VPN
            </Link>{" "}
            sayfasını ziyaret edebilirsin.
          </p>
        </Card>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
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
              Ücretsiz vs Ücretli VPN
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Test metodolojimiz
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
