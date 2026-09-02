import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Globe2, Tv, CreditCard, Flag } from "lucide-react";
import { Link } from "@/i18n/routing";
import NextLink from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { defaultLocaleAlternates } from "@/lib/site";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";

export const metadata: Metadata = {
  title: "Yurt Dışındaki Türkler İçin VPN Rehberi (2026)",
  description:
    "Yurt dışından Türkiye konumu gereken senaryolarda sunucu dizini, servis koşulları, bankacılık güvenliği ve VPN sınırlamalarını kontrol etme rehberi.",
  // İçerik yalnızca Türkçe servis ediliyor; EN/DE istekleri middleware 301'ler.
  alternates: defaultLocaleAlternates("/best-vpn/turks-abroad"),
};

type Props = { params: Promise<{ locale: string }> };

const picks = [
  {
    slug: "surfshark",
    why:
      "Sağlayıcının güncel dizininde Türkiye konumu ve sınırsız eşzamanlı bağlantı bilgisi bulunuyor. Bir Türkiye IP'si bazı konum senaryolarında yardımcı olabilir; servis erişimi ve uygulama uyumluluğu garanti değildir.",
    bestFor: "Türkiye konumu ve çoklu cihaz desteğini arayanlar",
  },
  {
    slug: "nordvpn",
    why:
      "Sağlayıcı NordLynx protokolünü, bağımsız denetim kayıtlarını ve geniş bir konum dizinini belgeliyor. Güncel Türkiye/Avrupa seçeneklerini resmi sunucu listesinde, gecikmeyi ise kendi ağınızda kontrol edin.",
    bestFor: "Denetim ve protokol belgelerini önceliklendirenler",
  },
  {
    slug: "expressvpn",
    why:
      "Sağlayıcı Lightway protokolünü ve MediaStreamer adlı Smart DNS seçeneğini belgeliyor. Smart DNS trafiği şifrelemez; konum ve servis uyumluluğu güncel resmi belgelerle ayrıca doğrulanmalıdır.",
    bestFor: "Akıllı TV veya konsolda resmi kurulum seçeneği arayanlar",
  },
];

const faqs = [
  {
    q: "Yurt dışından BluTV ve Exxen'i nasıl izlerim?",
    a: "Türkiye konumu IP sinyalini değiştirebilir, ancak BluTV ve Exxen VPN trafiğini engelleyebilir; hesap bölgesi, lisans ve hizmet şartları da sonucu etkiler. Güncel uyumluluğu kendi hesabınızda kontrol edin; kesintisiz erişim garantisi yoktur.",
  },
  {
    q: "e-Devlet'e yurt dışından girebilir miyim?",
    a: "e-Devlet'in güncel giriş ve doğrulama seçeneklerini resmi e-Devlet kanallarından kontrol edin. VPN gerekli olmayabilir; güvenlik kontrolleri, SMS veya diğer kimlik doğrulama adımları VPN'den bağımsızdır.",
  },
  {
    q: "Türk bankası uygulamasında VPN açık olabilir mi?",
    a: "Banka uygulamalarının güvenlik politikaları değişir ve yabancı ya da VPN IP'lerinde ek doğrulama isteyebilir. Bankanızın resmi güvenlik yönlendirmesini izleyin; VPN'i kapatmanız gerekiyorsa güvenilir bir ağ kullanın.",
  },
  {
    q: "Netflix TR'yi yurt dışından izleyebilir miyim?",
    a: "Türkiye konumu katalog sinyalini etkileyebilir; fakat Netflix erişimi hesap, lisans, hizmet şartları ve VPN tespitine göre değişebilir. Belirli bir sağlayıcı için erişim veya istikrar garantisi vermiyoruz.",
  },
  {
    q: "Vatandaşlık veya konsolosluk işlemleri için VPN gerekir mi?",
    a: "Resmi konsolosluk ve kamu hizmetleri için yalnızca kurumun yayımladığı giriş talimatlarını izleyin. VPN kullanmanın avantaj sağladığını varsaymayın; bağlantı sorunu varsa kurumun resmi destek kanalına başvurun.",
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Ana sayfa", path: "/" },
            { name: "Kullanım Alanları", path: "/best-vpn" },
            {
              name: "Yurt dışındaki Türkler için",
              path: "/best-vpn/turks-abroad",
            },
          ],
          "tr",
        )}
      />
      <JsonLd data={faqSchema(faqs)} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          ›{" "}
          <Link href="/vpn-reviews" className="hover:text-ink">
            Kullanım Alanları
          </Link>{" "}
          ›{" "}
          <span className="text-ink-strong">Yurt dışındaki Türkler için</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Globe2 className="size-3" /> Expat odaklı
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Yurt Dışındaki Türkler İçin VPN Rehberi (2026)
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Türkiye konumu, cihaz desteği ve doğrulanabilir sağlayıcı belgeleri
            üzerinden üç VPN profilini karşılaştırın; servis erişimi ve resmi
            işlemler için güncel koşulları ayrıca kontrol edin.
          </p>
        </header>

        <section className="mt-10 grid sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <Tv className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Streaming
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Konum sinyali, hesap koşulları ve güncel platform uyumluluğu.
            </p>
          </Card>
          <Card className="p-4">
            <CreditCard className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Bankacılık & e-Devlet
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              TR IP avantajı (banka uygulamalarında VPN kapatmak gerekebilir).
            </p>
          </Card>
          <Card className="p-4">
            <Flag className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Yerel servisler
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Yerel servislerin bölge ve hesap koşullarını kontrol etme.
            </p>
          </Card>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            Yurt dışı Türk kullanıcılar için ilk 3 seçim
          </h2>
          <div className="mt-6 space-y-4">
            {picks.map((pick, idx) => {
              const product = getProduct(pick.slug)!;
              return (
                <Card key={pick.slug} className="p-6">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex items-center justify-center size-12 rounded-full bg-brand-600 text-white font-bold text-lg shrink-0">
                      #{idx + 1}
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-ink-strong">
                          {product.brand}
                        </h3>
                        <Badge variant="brand">{pick.bestFor}</Badge>
                      </div>
                      <p className="mt-3 text-ink leading-relaxed">
                        {pick.why}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button asChild variant="primary" size="sm">
                          <ProviderLink
                            href={providerOutboundHref({ slug: product.slug, fallbackUrl: product.pricingUrl, hasAffiliate: product.hasAffiliate, source: "turks-abroad-guide" })}
                            rel={providerOutboundRel(product.slug, product.hasAffiliate)}
                            target="_blank"
                            provider={product.slug}
                            placement="turks-abroad-guide"
                          >
                            {product.brand} resmi sitesine git
                            <ArrowRight className="size-4" />
                          </ProviderLink>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/reviews/${product.slug}`}>
                            Tam incelemeyi oku →
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>Pratik kullanım senaryoları</h2>

          <h3>BluTV / Exxen yurt dışından izleme</h3>
          <p>
            Türkiye konumu, platforma Türkiye IP sinyali gönderebilir; ancak
            hesap bölgesi, lisans koşulları ve VPN tespiti erişimi etkileyebilir.
            Platformun hizmet şartlarını kontrol edin ve belirli bir VPN&apos;in
            sürekli çalışacağını varsaymayın.
          </p>

          <h3>Bankacılık uygulamaları</h3>
          <p>
            Banka uygulamaları yabancı veya VPN IP&apos;lerinde ek doğrulama
            isteyebilir. Bankanızın resmi güvenlik talimatını izleyin; VPN&apos;i
            kapatmanız istenirse işlemi yalnız güvenilir bir ağda yapın.
          </p>

          <h3>e-Devlet erişimi</h3>
          <p>
            Giriş ve kimlik doğrulama seçenekleri için resmi e-Devlet
            yönlendirmelerini kullanın. SMS veya diğer kimlik doğrulama
            adımları, IP konumundan ayrı gereksinimlerdir.
          </p>

          <h3>Yerel hizmetler (Yemeksepeti, Trendyol, getir)</h3>
          <p>
            Yerel hizmetlerin bölge, teslimat ve hesap politikaları farklıdır.
            Türkiye IP&apos;si tek başına hizmet kullanılabilirliğini garanti etmez;
            uygulamanın güncel koşullarını ve destek bilgisini kontrol edin.
          </p>

          <h2>Sıkça sorulan sorular</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <NextLink
              href="/best-vpn/turkey"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              <Flag className="size-3" /> Türkiye için
            </NextLink>
            <Link
              href="/best-vpn/streaming"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              <Tv className="size-3" /> Streaming için
            </Link>
            <Link
              href="/guide/is-vpn-legal-in-turkey"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Türkiye&apos;de VPN yasal mı?
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
