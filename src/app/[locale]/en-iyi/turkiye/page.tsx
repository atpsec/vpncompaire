import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, ShieldCheck, Flag, Tv, Lock } from "lucide-react";
import { Link } from "@/i18n/routing";
import NextLink from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { defaultLocaleAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Türkiye İçin VPN Seçim Rehberi (2026)",
  description:
    "Türkiye için VPN seçerken güncel sunucu dizini, gizlilik belgeleri, obfuscation seçenekleri ve bağımsız denetim kaynaklarını nasıl kontrol edeceğinizi öğrenin.",
  // İçerik yalnızca Türkçe servis ediliyor; EN/DE istekleri middleware 301'ler.
  alternates: defaultLocaleAlternates("/en-iyi/turkiye"),
};

type Props = { params: Promise<{ locale: string }> };

const picks = [
  {
    slug: "surfshark",
    why:
      "Sağlayıcı belgelerinde Türkiye konumu, Camouflage Mode ve sınırsız eşzamanlı bağlantı yer alıyor. Sunucu konumunu ve özelliğin kullandığınız platformdaki güncel durumunu resmi uygulamada doğrulayın.",
    bestFor: "Türkiye konumu ve çoklu cihaz desteğini birlikte arayanlar",
  },
  {
    slug: "nordvpn",
    why:
      "NordLynx protokolü, bağımsız denetim kayıtları ve geniş sunucu dizini belgeleniyor. Türkiye konumu ile yakın Avrupa seçeneklerini güncel sunucu listesinde kontrol edip kendi bağlantınızda gecikmeyi ölçün.",
    bestFor: "Protokol ve denetim belgelerini önceliklendirenler",
  },
  {
    slug: "expressvpn",
    why:
      "Sağlayıcı Lightway protokolünü ve farklı platformlar için bağlantı seçeneklerini belgeliyor. Türkiye konumu, gizleme davranışı ve ağınızdaki uyumluluk satın almadan önce resmi kaynaklardan ve iade süresi içinde doğrulanmalı.",
    bestFor: "Basit kurulum ve geniş platform desteği arayanlar",
  },
];

const faqs = [
  {
    q: "Türkiye'de VPN kullanmak yasal mı?",
    a: "VPN teknolojisi, erişim kısıtları ve VPN üzerinden yapılan eylemler aynı hukuki konu değildir. Mevzuat ve uygulama değişebileceğinden güncel resmi kaynakları kontrol edin; bu sayfa hukuki danışmanlık değildir.",
  },
  {
    q: "Türkiye için en iyi VPN sunucusu hangisi?",
    a: "Tek bir sunucu herkes için en iyi sonucu vermez. Fiziksel mesafe, sunucu yükü, protokol ve internet sağlayıcınız gecikmeyi etkiler; güncel Türkiye ve yakın Avrupa konumlarını kendi bağlantınızda karşılaştırın.",
  },
  {
    q: "VPN, ISP'min beni izlemesini engeller mi?",
    a: "VPN, cihazınız ile VPN sunucusu arasındaki trafiği şifreler ve ziyaret ettiğiniz hedefleri ISP'den önemli ölçüde gizleyebilir. ISP yine VPN sunucusuna bağlandığınızı, zamanlamayı ve veri hacmini görebilir; hesaplar, çerezler ve cihaz takibi ayrıca değerlendirilmelidir.",
  },
  {
    q: "BluTV ve Exxen'i yurt dışından izleyebilir miyim?",
    a: "Türkiye konumu IP sinyalini değiştirebilir; ancak yayın platformları VPN trafiğini engelleyebilir ve erişim hesap bölgesi, lisans koşulları veya hizmet şartlarına göre değişebilir. Hiçbir sağlayıcı için kesintisiz erişim garantisi vermiyoruz.",
  },
  {
    q: "Camouflage Mode veya obfuscation nedir?",
    a: "Obfuscation, VPN trafiğinin kolayca sınıflandırılmasını zorlaştırmayı amaçlayan tekniklerin genel adıdır. Davranış protokole, uygulamaya ve ağa göre değişir; sağlayıcının platform belgelerini kontrol edin.",
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
          { name: "Kullanım Alanları", path: "/en-iyi" },
          { name: "Türkiye için en iyi VPN", path: "/en-iyi/turkiye" },
        ])}
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
          › <span className="text-ink-strong">Türkiye için</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Flag className="size-3" /> Türkiye odaklı
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Türkiye İçin VPN Seçim Rehberi (2026)
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            TR sunucusu, gizleme seçenekleri, bağımsız denetimler ve platform
            desteği için üç sağlayıcı profili — resmi belgeler ve doğrulanabilir
            kaynaklar üzerinden değerlendirildi.
          </p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand-600" /> Hızlı özet
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            Pratik kontrol listesi: <strong>güncel sunucu konumları</strong>,{" "}
            <strong>obfuscation belgeleri</strong>, bağımsız denetimin kapsamı
            ve tarihi ile iade koşulları. Performans ve servis erişimini kendi
            ağınızda doğrulamadan kesin sonuç varsaymayın.
          </p>
        </Card>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-strong">
            Türkiye için ilk 3 seçim
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
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-16 prose prose-stone max-w-none">
          <h2>Türkiye&apos;de VPN seçerken dikkat edilmesi gerekenler</h2>

          <h3>1. TR sunucusu</h3>
          <p>
            Yurt dışında yaşayan Türkler veya geçici olarak yurt dışındayken
            BluTV, Exxen ve TRT gibi platformlarda Türkiye IP sinyalini
            değerlendirmek isteyenler için <strong>Türkiye lokasyonu ilgili
            bir kriterdir</strong>. Sunucu dizinleri değişebildiğinden mevcut
            konumu doğrudan sağlayıcının resmi listesinde doğrulayın.
          </p>

          <h3>2. DPI bypass (obfuscation)</h3>
          <p>
            Normal VPN bağlantısı bir ağda çalışmıyorsa sağlayıcının
            <strong> obfuscation</strong> veya gizlenmiş sunucu seçeneği
            değerlendirilebilir. Özelliğin hangi protokol ve platformlarda
            bulunduğunu resmi destek sayfasından kontrol edin.
          </p>

          <h3>3. Bağımsız denetim geçmişi</h3>
          <p>
            VPN&apos;in &quot;no-logs&quot; iddiasını değerlendirirken bağımsız
            denetimin tarihine, kapsamına ve raporun erişilebilirliğine bakın.
            Denetim sayıları ve kapsamları değişebildiğinden güncel raporu
            sağlayıcının resmi güven merkezi üzerinden açın.
          </p>

          <h3>4. Yasal çerçeve</h3>
          <p>
            VPN teknolojisi, erişim kısıtları ve kullanım amacı farklı hukuki
            değerlendirmeler gerektirebilir. Bu sayfa hukuki danışmanlık
            değildir. Güncel çerçeve için{" "}
            <Link href="/rehber/turkiye-de-vpn-yasal-mi">
              Türkiye&apos;de VPN Yasal mı? rehberimizi
            </Link>{" "}
            inceleyebilirsin.
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
          <p className="text-sm text-ink-muted">Diğer kullanım alanları</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/en-iyi/gizlilik"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              <Lock className="size-3" /> Gizlilik için
            </Link>
            <Link
              href="/en-iyi/streaming"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              <Tv className="size-3" /> Streaming için
            </Link>
            <NextLink
              href="/en-iyi/yurt-disindaki-turkler"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Yurt dışındaki Türkler için
            </NextLink>
          </div>
        </section>
      </Container>
    </>
  );
}
