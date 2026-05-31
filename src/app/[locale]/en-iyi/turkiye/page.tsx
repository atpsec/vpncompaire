import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Flag,
  Tv,
  Lock,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getProduct } from "@/data/products";
import { affiliatePath } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Türkiye İçin En İyi VPN'ler (2026)",
  description:
    "Türkiye'de yasalı, hızlı ve güvenilir VPN seçimi. TR sunucusu, DPI bypass, BluTV/Exxen erişimi ve gizlilik için 2026'nın en iyi seçimleri.",
};

type Props = { params: Promise<{ locale: string }> };

const picks = [
  {
    slug: "surfshark",
    why:
      "Türkiye'de aktif sunucusu olan ve Camouflage Mode (DPI bypass) sunan tek üst-seviye sağlayıcı. Sınırsız cihaz desteğiyle aile/iş ihtiyaçlarını tek abonelikten karşılıyor.",
    bestFor: "Türkiye'deki çoğu kullanıcı için en dengeli seçim",
  },
  {
    slug: "nordvpn",
    why:
      "Geniş sunucu ağı, NordLynx hızı ve altı kez Deloitte denetimi. Türkiye sunucusu yok ama yakın Avrupa lokasyonlarıyla düşük gecikme.",
    bestFor: "Streaming ve genel kullanım için maksimum istikrar isteyenler",
  },
  {
    slug: "expressvpn",
    why:
      "Lightway protokolünün obfuscation özelliği, Türkiye'deki ISP filtreleme girişimlerine karşı dirençli. 2017'de Türk yetkililerinin sunucu el koyma denemesine rağmen no-logs politikası kanıtlandı.",
    bestFor: "Premium deneyim arayanlar; teknik konfigürasyon istemeyenler",
  },
];

const faqs = [
  {
    q: "Türkiye'de VPN kullanmak yasal mı?",
    a: "Evet, VPN kullanımı Türkiye'de yasal bir teknolojidir. VPN'in kendisi yasaklı değil; yasal sorumluluk, VPN üzerinden yapılan eylemin niteliğine bağlıdır.",
  },
  {
    q: "Türkiye için en iyi VPN sunucusu hangisi?",
    a: "Türkiye'de aktif sunucusu olan üst-seviye sağlayıcılar arasında en dengeli olanı Surfshark. NordVPN ve ExpressVPN Türkiye sunucusu sunmuyor ama yakın Avrupa lokasyonlarıyla yeterli performans veriyor.",
  },
  {
    q: "VPN, ISP'min beni izlemesini engeller mi?",
    a: "Evet. VPN aktifken ISP yalnızca şifreli trafiğin VPN sunucusuna gittiğini görür; hangi siteleri ziyaret ettiğin, ne aradığın gibi içerik bilgileri şifrelidir.",
  },
  {
    q: "BluTV ve Exxen'i yurt dışından izleyebilir miyim?",
    a: "Evet. Türkiye sunucusu sunan bir VPN (Surfshark gibi) ile yurt dışındaki konumundan Türkiye'ye bağlanarak BluTV, Exxen ve diğer Türk streaming platformlarına erişebilirsin.",
  },
  {
    q: "Camouflage Mode veya obfuscation nedir?",
    a: "VPN trafiğini, sıradan HTTPS trafiği gibi görünmesini sağlayan teknik. Türkiye gibi VPN engelleme girişimlerinin olduğu ülkelerde, ISP'lerin DPI (Deep Packet Inspection) tespitini bypass etmek için kullanılır.",
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
            Türkiye İçin En İyi VPN&apos;ler (2026)
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Türkiye&apos;de güvenilir performans, TR sunucusu, DPI bypass ve
            yasal çerçeveye uygun kullanım için 2026&apos;da öne çıkan üç
            seçim — gerçek kullanım senaryolarına göre değerlendirildi.
          </p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand-600" /> Hızlı özet
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            Türkiye&apos;de VPN kullanmak yasal. Pratik öncelikler:{" "}
            <strong>TR sunucusu</strong> (yurt dışından TR içeriklerine
            erişim için), <strong>obfuscation</strong> (ISP&apos;lerin DPI
            engellemelerini bypass etmek için) ve{" "}
            <strong>bağımsız denetim geçmişi</strong> (güven için). Bu üç
            kriteri en dengeli şekilde Surfshark karşılıyor.
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
                        <Button
                          asChild
                          variant={product.hasAffiliate ? "primary" : "secondary"}
                          size="sm"
                        >
                          <a
                            href={affiliatePath(product.slug)}
                            rel="sponsored nofollow"
                          >
                            {product.brand} fırsatına git
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
          <h2>Türkiye&apos;de VPN seçerken dikkat edilmesi gerekenler</h2>

          <h3>1. TR sunucusu</h3>
          <p>
            Yurt dışında yaşayan Türkler veya geçici olarak yurt dışındayken
            BluTV, Exxen, TRT World gibi platformlara erişmek isteyenler için
            <strong> Türkiye lokasyonlu bir sunucu kritik</strong>. Listelenen
            üç sağlayıcı arasında yalnızca Surfshark&apos;ın Türkiye
            sunucusu var.
          </p>

          <h3>2. DPI bypass (obfuscation)</h3>
          <p>
            Bazı Türk ISP&apos;ler zaman zaman VPN trafiğini Deep Packet
            Inspection (DPI) ile tespit edip yavaşlatmaya veya engellemeye
            çalışıyor. Surfshark&apos;ın <strong>Camouflage Mode</strong>{" "}
            özelliği veya ExpressVPN&apos;in Lightway protokolü gibi
            obfuscation seçenekleri bu durumlara karşı koruma sağlıyor.
          </p>

          <h3>3. Bağımsız denetim geçmişi</h3>
          <p>
            VPN&apos;in &quot;no-logs&quot; iddiasının gerçek olduğunu
            doğrulamak için üçüncü taraf denetimleri kritik. NordVPN (6x
            Deloitte), Surfshark (Cure53 + Deloitte) ve ExpressVPN (KPMG +
            Cure53) bu açıdan kanıtlı seçimler.
          </p>

          <h3>4. Yasal çerçeve</h3>
          <p>
            Türkiye&apos;de VPN kullanımı yasal — ancak yasal sorumluluk VPN
            üzerinden yapılan eylemin niteliğine bağlı. Detaylar için{" "}
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
            <Link
              href="/en-iyi/yurt-disindaki-turkler"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Yurt dışındaki Türkler için
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
