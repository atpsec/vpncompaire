import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { RefreshCcw, Clock, AlertTriangle, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { absoluteUrl } from "@/lib/site";
import { rankedProducts } from "@/data/products";

export const metadata: Metadata = {
  title:
    "VPN İptal ve İade Rehberi (2026) — 10 VPN için Adım Adım Talimatlar",
  description:
    "NordVPN, ExpressVPN, Surfshark ve diğer VPN sağlayıcılarında abonelik iptali ve para iade süreci. İade penceresi, yaygın tuzaklar ve adım adım talimatlar.",
  alternates: { canonical: absoluteUrl("/iptal-ve-iade") },
  openGraph: {
    title: "VPN İptal ve İade Rehberi",
    description: "10 VPN için iptal ve iade adımları, tek sayfada.",
    url: absoluteUrl("/iptal-ve-iade"),
    type: "article",
  },
  keywords: [
    "nordvpn iptal",
    "expressvpn iade",
    "surfshark iptal",
    "vpn iade rehberi",
    "vpn aboneliği iptal",
    "proton vpn iade",
  ],
};

type Props = { params: Promise<{ locale: string }> };

type CancelInfo = {
  /** Brand-specific guidance */
  via: string;
  /** Common pitfalls to warn the user about */
  pitfalls: string[];
};

const CANCEL_INFO: Record<string, CancelInfo> = {
  nordvpn: {
    via: "Hesap → Abonelik → Otomatik yenilemeyi kapat. İade için 30 gün içinde destek (canlı sohbet veya support@nordvpn.com) ile iletişime geç.",
    pitfalls: [
      "Otomatik yenilemeyi kapatmak iade vermez — iade için ayrıca destek talebi gerekir.",
      "App Store / Google Play üzerinden alınan abonelikler için iade Apple/Google&apos;a yapılmalı.",
    ],
  },
  surfshark: {
    via: "Hesap → Subscription → Cancel Subscription. İade için 30 gün içinde destek (canlı sohbet) ile iletişime geç.",
    pitfalls: [
      "Otomatik yenileme ile iade ayrı süreçtir.",
      "App Store / Google Play abonelikleri için iade ilgili platforma yapılır.",
    ],
  },
  expressvpn: {
    via: "Hesap → Subscription → Manage settings → Cancel automatic renewal. İade için 30 gün içinde 7/24 canlı sohbet en hızlı yöntem.",
    pitfalls: [
      "İade için yenileme döneminin başlangıcından itibaren 30 gün şartı vardır.",
      "Mobil mağaza üzerinden alındıysa iade Apple/Google üzerinden yapılır.",
    ],
  },
  "proton-vpn": {
    via: "account.proton.me → Subscription → Cancel. Ücretli plan için 30 gün içinde destek talebi açılarak iade istenebilir.",
    pitfalls: [
      "Ücretsiz plan abonelik sayılmaz — iptal gereksizdir.",
      "Pro-rata iade modeli kullanılır; kalan süre üzerinden hesaplanabilir.",
    ],
  },
  pia: {
    via: "Account → Subscription → Cancel. İade için 30 gün içinde destek (canlı sohbet) ile iletişime geç.",
    pitfalls: [
      "3 yıllık plan dahil tüm planlar 30 günlük iade hakkına sahiptir.",
      "App Store / Google Play abonelikleri ilgili platforma iade yapılır.",
    ],
  },
  cyberghost: {
    via: "Hesap → Subscription → Cancel. İade için 45 gün içinde destek talebi.",
    pitfalls: [
      "45 günlük süre yalnızca uzun dönem (1+ yıl) planlar için geçerlidir; aylık plan 14 gün.",
      "Mobil mağaza abonelikleri ilgili platforma iade edilir.",
    ],
  },
  ipvanish: {
    via: "Hesap → Subscription → Cancel. İade için yıllık planlarda 30 gün, aylık planlarda 7 gün içinde destek talebi.",
    pitfalls: [
      "Aylık plan iade süresi yalnızca 7 gündür — uzun dönem planın iade süresi farklıdır.",
      "Add-on hizmetler (örn. Boxcryptor) için iade kuralları farklı olabilir.",
    ],
  },
  windscribe: {
    via: "Hesap → My Account → Manage Subscription → Cancel. İade için yalnızca 3 gün içinde destek talebi.",
    pitfalls: [
      "İade penceresi 3 gün — sektördeki en kısa pencerelerden biri.",
      "Build-a-plan satın alımları için iade kuralları farklı olabilir.",
    ],
  },
  tunnelbear: {
    via: "Hesap → Cancel Subscription. Para iade garantisi sunulmaz — ücretli plana geçmeden 2 GB ücretsiz plan ile sınama önerilir.",
    pitfalls: [
      "Para iade garantisi yoktur; ücretli plan satın alındıktan sonra iade istisnai durumlarda destek kararına bağlıdır.",
      "Aboneliği iptal etmek hesabı silmez — verileri silmek için ayrı talep gerekir.",
    ],
  },
  mullvad: {
    via: "Hesap numarasıyla giriş → Manage account → Refund. İade için 30 gün içinde destek talebi.",
    pitfalls: [
      "Anonim hesap modelinde iadenin döneceği yöntem ödeme türüne göre değişir.",
      "Nakit ödeme ile yapılan iadeler için adres bilgisi destek talebinde belirtilmelidir.",
    ],
  },
};

const faqs = [
  {
    q: "Para iade süresini nasıl başlatırım?",
    a: "Sağlayıcı politikalarına göre genelde abonelik başlangıç tarihi referans alınır. Bazı sağlayıcılar yenileme döneminin başlangıcını kabul etmektedir. Güncel koşullar için sağlayıcının resmi destek sayfasını incelemeni öneririz.",
  },
  {
    q: "App Store / Google Play üzerinden satın aldım, iade nasıl olur?",
    a: "VPN sağlayıcısının kendi iade politikası geçerli olmaz; iade Apple App Store veya Google Play üzerinden talep edilmelidir. Bu platformların kendi iade kuralları uygulanır.",
  },
  {
    q: "Otomatik yenilemeyi kapatmak iade demek mi?",
    a: "Hayır. Otomatik yenilemeyi kapatmak yalnızca gelecek tahsilatları durdurur. Mevcut dönem için iade talep etmek istiyorsan, ayrıca sağlayıcının destek hattına iade talebi açman gerekir.",
  },
  {
    q: "İade talebim reddedilirse ne yapabilirim?",
    a: "Sağlayıcının destek hattıyla diyalog süreci genelde 2-3 adımdan oluşur. Reddedilirse, ödemeyi yaptığın kart sağlayıcısı (banka) veya PayPal üzerinden chargeback (ters ibraz) başlatılabilir; ancak bu, ileride o sağlayıcıyı kullanma hakkını etkileyebilir.",
  },
  {
    q: "Yıllık ödediğim VPN'i ay ortasında iptal edersem kalan ay için iade alırım mı?",
    a: "Genelde hayır. Çoğu VPN sağlayıcısı &quot;30 gün içinde tam iade, sonrası iade yok&quot; modeli uygular. Proton VPN pro-rata iade sunmaktadır; diğerlerinde abonelik bittiğinde otomatik olarak ücretsiz plana düşersin.",
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = rankedProducts();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "İptal ve İade", path: "/iptal-ve-iade" },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">İptal ve İade</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <RefreshCcw className="size-3" /> Tüketici rehberi
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN iptal ve iade rehberi
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            10 VPN sağlayıcısı için iptal adımları, iade penceresi ve yaygın
            tuzaklar — sağlayıcı politikalarına göre derlenmiştir. Yenileme
            yaklaştığında veya iade talep etmek istediğinde başvurabileceğin
            tek sayfa.
          </p>
        </header>

        <DataDisclaimer />

        <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Genel uyarı
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                İade ve iptal koşulları sağlayıcı tarafından haber
                verilmeksizin değişebilir. İade penceresi tipik olarak 30
                gündür (CyberGhost 45, Windscribe 3, IPVanish aylık plan
                için 7 gün). Satın almadan önce sağlayıcının kendi iade
                politikasını okumanı öneririz.
              </p>
            </div>
          </div>
        </Card>

        <nav aria-label="VPN seçimi" className="mt-8 flex flex-wrap gap-2">
          {products.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              <VPNLogo slug={p.slug} size={16} />
              {p.brand}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-6">
          {products.map((p) => {
            const info = CANCEL_INFO[p.slug];
            if (!info) return null;
            return (
              <Card
                key={p.slug}
                id={p.slug}
                className="p-6 scroll-mt-20"
              >
                <div className="flex items-start gap-3 flex-wrap">
                  <VPNLogo slug={p.slug} size={48} />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-ink-strong">
                      {p.brand}
                    </h2>
                    <p className="text-xs text-ink-muted">
                      {p.positioning}
                    </p>
                  </div>
                  <Badge variant="brand">
                    <Clock className="size-3" />{" "}
                    {p.highlights.moneyBackDays
                      ? `${p.highlights.moneyBackDays} gün iade`
                      : "İade penceresi sağlayıcıya sorulmalıdır"}
                  </Badge>
                </div>

                <div className="mt-4 rounded-lg bg-surface-subtle/50 p-3 text-sm">
                  <p className="font-medium text-ink-strong">
                    Nasıl iptal edilir?
                  </p>
                  <p className="mt-1 text-ink leading-relaxed">{info.via}</p>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-ink-strong">
                    Dikkat edilmesi gerekenler
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {info.pitfalls.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-ink"
                      >
                        <AlertTriangle className="size-4 text-accent-600 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <Link
                    href={`/inceleme/${p.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 hover:border-brand-300"
                  >
                    {p.brand} incelemesi →
                  </Link>
                  <a
                    href={p.pricingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 hover:border-brand-300"
                  >
                    Sağlayıcının resmi destek sayfası →
                  </a>
                </div>
              </Card>
            );
          })}
        </div>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>Genel iptal süreci — 4 adım</h2>
          <ol>
            <li>
              <strong>Otomatik yenilemeyi kapat.</strong> Sağlayıcının hesap
              panelinden &quot;auto-renewal&quot; veya &quot;otomatik yenileme&quot;
              seçeneğini kapat. Bu, gelecek tahsilatları durdurur.
            </li>
            <li>
              <strong>İade istiyorsan destek talebi aç.</strong> Otomatik
              yenilemeyi kapatmak iade vermez. İade penceresi içindeysen
              destek hattına başvur (canlı sohbet hızlı, e-posta yedek).
            </li>
            <li>
              <strong>Ödeme yöntemine göre iade yolunu doğrula.</strong>{" "}
              Kart ile alındıysa karta, PayPal ile alındıysa PayPal&apos;a;
              mobil mağaza üzerinden alındıysa Apple/Google üzerinden
              iade yapılır.
            </li>
            <li>
              <strong>İade tarihini takip et.</strong> Banka kartı
              iadeleri 3-10 iş günü, PayPal 1-3 iş günü, mağaza
              iadeleri 1-7 iş günü sürebilir.
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

        <Card className="mt-12 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <Check className="size-5 text-brand-600" /> Pratik öneri
          </h2>
          <p className="mt-3 text-ink leading-relaxed text-sm">
            VPN abonelik aldıktan sonra <strong>ilk gün</strong>{" "}
            otomatik yenilemeyi kapatmak en güvenli yoldur. Bu, yenileme
            tuzağına düşmeni engeller; istersen bitiş tarihinde yeni bir
            kampanya kullanarak veya başka sağlayıcıya geçerek devam
            edebilirsin.
          </p>
        </Card>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/hesaplayici"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Toplam maliyet hesaplayıcı
            </Link>
            <Link
              href="/rehber/ucretsiz-vs-ucretli-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Ücretsiz vs Ücretli VPN
            </Link>
            <Link
              href="/yasal-uyari"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Yasal uyarı
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
