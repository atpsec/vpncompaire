import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, Trophy, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { cn } from "@/lib/utils";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";

export const metadata: Metadata = {
  title: "NordVPN vs Surfshark Karşılaştırması (2026)",
  description:
    "NordVPN ve Surfshark'ı 6 kritere göre karşılaştırdık: gizlilik, denetimler, hız, streaming, fiyat ve cihaz desteği. Hangisinin sana uygun olabileceğini değerlendir.",
};

type Props = { params: Promise<{ locale: string }> };

const categories = [
  {
    name: "Gizlilik ve yargı yetkisi",
    winner: "tie" as const,
    nord: "Panama (14 Eyes dışı, zorunlu veri saklama yok)",
    surf: "Hollanda (14 Eyes ama AB'nin sıkı veri koruma yasaları)",
    reasoning:
      "Her ikisi de güçlü no-logs politikası uyguluyor. Panama hukuki olarak biraz daha avantajlı; Hollanda da AB veri koruma yasaları çerçevesinde güçlü konumda.",
  },
  {
    name: "Bağımsız denetimler",
    winner: "nordvpn" as const,
    nord: "Deloitte no-logs (6 defa, son: 2025) + Cure53 istemci denetimleri (3x)",
    surf: "Cure53 + Deloitte denetimleri (2023)",
    reasoning:
      "NordVPN'in tekrarlanan altı kez Deloitte denetimi, sektördeki en kapsamlı no-logs ispatlarından biri. Surfshark da denetlendi ama süreklilik açısından NordVPN önde.",
  },
  {
    name: "Hız performansı",
    winner: "nordvpn" as const,
    nord: "NordLynx (WireGuard tabanlı) — %91-96 yakın, %72-80 uzak",
    surf: "WireGuard — %85-92 yakın, %65-75 uzak",
    reasoning:
      "NordLynx'in özel optimizasyonu sayesinde Surfshark'ın WireGuard implementasyonundan %5-7 daha yüksek throughput sağlıyor. Pratikte günlük kullanımda fark sınırlı.",
  },
  {
    name: "Streaming uyumluluğu",
    winner: "tie" as const,
    nord: "Netflix US/UK/JP/TR, Disney+, BBC iPlayer, BluTV, Exxen — stabil",
    surf: "Netflix US/UK/JP/TR/BR, Disney+, BBC iPlayer, BluTV, Exxen, HBO Max — stabil",
    reasoning:
      "İkisi de sektörün üst seviye streaming bypass'ına sahip. Surfshark'ın Türkiye sunucusu, yurt dışından Türk içeriklere erişim için somut bir avantaj.",
  },
  {
    name: "Fiyat (uzun dönem)",
    winner: "surfshark" as const,
    nord: "2 yıllık plan: ~$3.39/ay (ilk dönem)",
    surf: "2 yıllık plan: ~$2.19/ay (ilk dönem)",
    reasoning:
      "Surfshark, NordVPN'den yaklaşık %35 daha ucuz. Yenileme dönemi ikisi için de yükseliyor — ancak Surfshark'ın temel fiyatı kalıcı olarak daha düşük.",
  },
  {
    name: "Cihaz desteği",
    winner: "surfshark" as const,
    nord: "10 eşzamanlı cihaz",
    surf: "Sınırsız eşzamanlı cihaz",
    reasoning:
      "Surfshark'ın sınırsız cihaz politikası, aile veya çok cihazlı kullanıcılar için belirleyici avantaj. NordVPN'in 10 cihaz limiti çoğu birey/çekirdek aile için yeterli ama tam aile + akıllı ev senaryosunda yetersiz kalabilir.",
  },
] as const;

const faqs = [
  {
    q: "NordVPN mi Surfshark mı daha iyi?",
    a: "Tek bir 'daha iyi' yok — önceliğine bağlı. Genel performans ve denetim geçmişi konusunda NordVPN, fiyat ve cihaz desteği konusunda Surfshark öne çıkıyor. Bütçe öncelikse ve çok cihaz koruman gerekiyorsa Surfshark; tekrarlanan denetim ve geniş ek özellikler önceliğin ise NordVPN değerlendirilebilir. Satın almadan önce her iki sağlayıcının kendi sitesinden güncel bilgileri kontrol etmeni öneririz.",
  },
  {
    q: "Aynı şirketin iki ürünü değil mi?",
    a: "Mart 2022'de kurumsal olarak birleştiler — Nord Security ana şirket olarak iki markayı da yönetiyor. Ancak ürün geliştirme, altyapı, no-logs denetimleri ve operasyonel ekipler ayrı çalışıyor. Pratik olarak iki farklı VPN olarak davranıyorlar.",
  },
  {
    q: "Hangisi Türkiye'de daha iyi çalışıyor?",
    a: "Surfshark — Türkiye lokasyonlu sunucusu ve Camouflage Mode (DPI bypass) özelliği var. NordVPN Türkiye sunucusu sunmuyor ama yakın Avrupa sunucularıyla iyi performans veriyor.",
  },
  {
    q: "İki abonelik birden almak mantıklı mı?",
    a: "Genelde hayır. Tek bir kaliteli VPN sıradan kullanıcı için yeterli. İki abonelik almak yerine, sana uygun olanı seçip diğerlerine harcayacağın parayı diğer güvenlik araçlarına (parola yöneticisi, şifreli e-posta vb.) yatırabilirsin.",
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nord = getProduct("nordvpn")!;
  const surf = getProduct("surfshark")!;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Karşılaştırma", path: "/karsilastir" },
          {
            name: "NordVPN vs Surfshark",
            path: "/karsilastir/nordvpn-vs-surfshark",
          },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          ›{" "}
          <Link href="/karsilastir" className="hover:text-ink">
            Karşılaştırma
          </Link>{" "}
          ›{" "}
          <span className="text-ink-strong">NordVPN vs Surfshark</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">Yan yana karşılaştırma</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            NordVPN vs Surfshark: 2026 Karşılaştırması
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Aynı şirket çatısı altında çalışan iki büyük VPN — ama farklı
            önceliklerle. 6 kritere göre yan yana karşılaştırdık. Hangisinin
            sana uygun olabileceğini değerlendirmen için.
          </p>
        </header>

        <DataDisclaimer verifiedAt={nord.pricingVerifiedAt} />

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-ink-strong">
                {nord.brand}
              </h2>
              <span className="text-2xl font-bold text-brand-700">
                {nord.score}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{nord.positioning}</p>
            <p className="mt-4 text-sm text-ink leading-relaxed">
              {nord.summary}
            </p>
            <Button asChild variant="primary" className="mt-4 w-full">
              <a
                href={nord.pricingUrl}
                rel="noopener nofollow"
                target="_blank"
              >
                {nord.brand} resmi sitesi <ArrowRight className="size-4" />
              </a>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-ink-strong">
                {surf.brand}
              </h2>
              <span className="text-2xl font-bold text-brand-700">
                {surf.score}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{surf.positioning}</p>
            <p className="mt-4 text-sm text-ink leading-relaxed">
              {surf.summary}
            </p>
            <Button asChild variant="primary" className="mt-4 w-full">
              <a
                href={surf.pricingUrl}
                rel="noopener nofollow"
                target="_blank"
              >
                {surf.brand} resmi sitesi <ArrowRight className="size-4" />
              </a>
            </Button>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            Kategori bazında karşılaştırma
          </h2>

          <div className="mt-6 space-y-4">
            {categories.map((cat) => (
              <Card key={cat.name} className="p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold text-ink-strong">
                    {cat.name}
                  </h3>
                  <WinnerBadge winner={cat.winner} />
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "nordvpn"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {cat.winner === "nordvpn" && (
                        <Trophy className="size-3.5 text-success-600" />
                      )}
                      NordVPN
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.nord}</p>
                  </div>
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      cat.winner === "surfshark"
                        ? "bg-success-50 border border-success-100"
                        : "bg-surface-subtle border border-border",
                    )}
                  >
                    <div className="font-medium text-ink-strong flex items-center gap-1">
                      {cat.winner === "surfshark" && (
                        <Trophy className="size-3.5 text-success-600" />
                      )}
                      Surfshark
                    </div>
                    <p className="mt-1 text-ink-muted">{cat.surf}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-ink leading-relaxed">
                  <span className="font-medium text-ink-strong">Neden: </span>
                  {cat.reasoning}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 grid sm:grid-cols-2 gap-6">
          <Card className="p-6 border-brand-200 bg-brand-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-brand-600" />
              NordVPN&apos;i seç eğer...
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              <li>Maksimum hız performansı isteğin var</li>
              <li>Tekrarlanan bağımsız denetimler kritik</li>
              <li>Streaming çok kullanıyorsun ve istikrar arıyorsun</li>
              <li>10 cihaz limiti senin için yeterli</li>
              <li>Threat Protection, Meshnet, Onion over VPN gibi ek özellikler değerli</li>
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href="/inceleme/nordvpn">
                NordVPN&apos;i incele
              </Link>
            </Button>
          </Card>

          <Card className="p-6 border-accent-300 bg-accent-50/40">
            <h3 className="text-xl font-bold text-ink-strong flex items-center gap-2">
              <Check className="size-5 text-accent-600" />
              Surfshark&apos;ı seç eğer...
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              <li>Bütçe önemli ve uzun dönem plan tercih ediyorsun</li>
              <li>Çok sayıda cihazı korumak istiyorsun (sınırsız)</li>
              <li>Türkiye lokasyonlu sunucu lazım</li>
              <li>Camouflage Mode (DPI bypass) önemli</li>
              <li>BluTV / Exxen erişimi yurt dışından</li>
            </ul>
            <Button asChild variant="primary" className="mt-5 w-full">
              <Link href="/inceleme/surfshark">
                Surfshark&apos;ı incele
              </Link>
            </Button>
          </Card>
        </section>

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>Sıkça sorulan sorular</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Diğer karşılaştırmalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/inceleme/expressvpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              ExpressVPN incelemesi
            </Link>
            <Link
              href="/inceleme/proton-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Proton VPN incelemesi
            </Link>
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Tüm sıralama <ArrowRight className="size-3" />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}

function WinnerBadge({
  winner,
}: {
  winner: "nordvpn" | "surfshark" | "tie";
}) {
  if (winner === "tie") {
    return <Badge variant="neutral">İkisi de güçlü</Badge>;
  }
  return (
    <Badge variant="brand">
      <Trophy className="size-3" />{" "}
      {winner === "nordvpn"
        ? "NordVPN bu kriterde öne çıkıyor"
        : "Surfshark bu kriterde öne çıkıyor"}
    </Badge>
  );
}
