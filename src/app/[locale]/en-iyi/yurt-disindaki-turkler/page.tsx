import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Globe2, Tv, CreditCard, Flag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { defaultLocaleAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yurt Dışındaki Türkler İçin En İyi VPN (2026)",
  description:
    "BluTV, Exxen, Netflix TR, e-Devlet ve Türk bankacılık uygulamalarına yurt dışından erişim için 2026'nın en iyi VPN seçimleri ve pratik kullanım rehberi.",
  // İçerik yalnızca Türkçe servis ediliyor; EN/DE istekleri middleware 301'ler.
  alternates: defaultLocaleAlternates("/en-iyi/yurt-disindaki-turkler"),
};

type Props = { params: Promise<{ locale: string }> };

const picks = [
  {
    slug: "surfshark",
    why:
      "Türkiye lokasyonlu sunucusu var — BluTV, Exxen, TRT, Netflix TR, e-Devlet ve Türk bankacılık uygulamaları için en doğal seçim. Sınırsız cihazla telefon, dizüstü, tablet, akıllı TV aynı abonelikten beslenebiliyor.",
    bestFor: "Türk içeriklere erişmek isteyen yurt dışı Türkler",
  },
  {
    slug: "nordvpn",
    why:
      "Türkiye sunucusu yok ama Avrupa'daki yakın lokasyonlarla istikrarlı performans. Streaming geneli (özellikle Netflix US, UK, JP) için en kararlı sağlayıcılardan.",
    bestFor: "TR + global streaming kombinasyonu isteyenler",
  },
  {
    slug: "expressvpn",
    why:
      "Lightway protokolünün hızlı bağlantı kurma özelliği, ülke değiştirme senaryolarında pratik. MediaStreamer DNS özelliği akıllı TV ve oyun konsollarında VPN olmadan bölge bypass'ı yapıyor.",
    bestFor: "Akıllı TV/konsol kullanan ve premium istisin isteyenler",
  },
];

const faqs = [
  {
    q: "Yurt dışından BluTV ve Exxen'i nasıl izlerim?",
    a: "Türkiye lokasyonlu sunucusu olan bir VPN (örn. Surfshark) ile Türkiye'ye bağlandığında, BluTV ve Exxen seni Türkiye'den bağlanıyor olarak görür. Erişim sorunsuz çalışır.",
  },
  {
    q: "e-Devlet'e yurt dışından girebilir miyim?",
    a: "Evet — e-Devlet teknik olarak yurt dışından erişilebilir. Ancak bazı işlemler (özellikle SMS doğrulama gerektirenler) Türk SIM kartı gerektirebilir. VPN kullanmak girişi engellemez ama bazı banka uygulamaları VPN tespit ederse oturum açmana izin vermeyebilir.",
  },
  {
    q: "Türk bankası uygulamasında VPN açık olabilir mi?",
    a: "Çoğu Türk banka uygulaması güvenlik nedeniyle VPN tespit edip oturumu kapatabilir. Bankacılık işlemleri için VPN'i geçici olarak kapatman önerilir. Sonrasında tekrar bağlayabilirsin.",
  },
  {
    q: "Netflix TR'yi yurt dışından izleyebilir miyim?",
    a: "Evet — Türkiye sunucusu olan bir VPN ile Netflix TR kütüphanesine erişebilirsin. Surfshark bu senaryoda en stabil performansı veriyor.",
  },
  {
    q: "Vatandaşlık veya konsolosluk işlemleri için VPN gerekir mi?",
    a: "Konsolosluk web siteleri genellikle global erişilebilir. Ancak randevu sistemlerinde TR IP avantaj sağlayabilir; aksi durumda işlem aynıdır.",
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
            { name: "Kullanım Alanları", path: "/en-iyi" },
            {
              name: "Yurt dışındaki Türkler için",
              path: "/en-iyi/yurt-disindaki-turkler",
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
          <Link href="/en-iyi-vpn" className="hover:text-ink">
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
            Yurt Dışındaki Türkler İçin En İyi VPN (2026)
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            BluTV, Exxen, Netflix TR, e-Devlet veya sadece evden bir parça
            uzakta olmadığını hissetmek için — TR sunucusu olan, hızlı ve
            güvenilir VPN seçimleri.
          </p>
        </header>

        <section className="mt-10 grid sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <Tv className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Streaming
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              BluTV, Exxen, Netflix TR, TRT World erişimi.
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
              Yemeksepeti, Trendyol, getir gibi servisler için bölge erişimi.
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
                          <a
                            href={product.pricingUrl}
                            rel="noopener nofollow"
                            target="_blank"
                          >
                            {product.brand} resmi sitesine git
                            <ArrowRight className="size-4" />
                          </a>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/inceleme/${product.slug}`}>
                            Tam incelemeyi oku →
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-ink-subtle">Puan</div>
                      <div className="text-2xl font-bold text-brand-700">
                        {product.score.toFixed(1)}
                        <span className="text-xs text-ink-subtle font-normal">
                          /10
                        </span>
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
            Yurt dışındayken BluTV veya Exxen&apos;e girmeye çalıştığında
            &quot;Bu hizmet bölgenizde kullanılamıyor&quot; mesajıyla
            karşılaşırsın. VPN&apos;ini Türkiye sunucusuna bağladıktan sonra
            sayfayı yenile — platform seni Türkiye&apos;den bağlanıyor olarak
            görecek ve içeriklere erişeceksin.
          </p>

          <h3>Bankacılık uygulamaları</h3>
          <p>
            Türk bankaları (Garanti BBVA, Akbank, İş Bankası, Ziraat vb.)
            uygulamalarında VPN tespit edildiğinde oturumun otomatik
            kapanabilir veya yasal işlem yapılamayabilir. Pratik strateji:
            <strong> bankacılık işlemleri için VPN&apos;i geçici olarak
            kapat</strong>, ardından tekrar aç.
          </p>

          <h3>e-Devlet erişimi</h3>
          <p>
            e-Devlet teknik olarak yurt dışından erişilebilir; VPN gerekli
            değil. Ancak bazı işlemler için Türk telefon numarasıyla SMS
            doğrulama gerekebilir — bu, VPN ile çözülen bir sorun değil.
          </p>

          <h3>Yerel hizmetler (Yemeksepeti, Trendyol, getir)</h3>
          <p>
            Bazı bu tip servisler yurt dışı IP&apos;leri kısıtlayabilir.
            Hesabına ulaşamıyorsan veya servis sayfası açılmıyorsa,
            VPN&apos;ini TR sunucusuna bağlamak çoğunlukla çözüyor.
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
            <Link
              href="/en-iyi/turkiye"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              <Flag className="size-3" /> Türkiye için
            </Link>
            <Link
              href="/en-iyi/streaming"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              <Tv className="size-3" /> Streaming için
            </Link>
            <Link
              href="/rehber/turkiye-de-vpn-yasal-mi"
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
