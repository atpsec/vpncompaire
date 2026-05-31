import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Wallet, AlertTriangle, Check, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ücretsiz vs Ücretli VPN: Gerçekten Değiyor mu? (2026)",
  description:
    "Ücretsiz VPN'ler gerçekten ücretsiz mi? Gelir modelleri, riskler ve hangi durumlarda hangisini seçmen gerektiğine dair net rehber.",
};

type Props = { params: Promise<{ locale: string }> };

const faqs = [
  {
    q: "Ücretsiz VPN'ler güvenli mi?",
    a: "Çoğu değil. Ücretsiz VPN sağlayıcılarının büyük bir kısmı, geliri kullanıcı verisi satışı, reklam enjeksiyonu veya zararlı yazılım dağıtımı üzerinden elde ediyor. Proton VPN'in ücretsiz planı önemli bir istisnadır.",
  },
  {
    q: "Proton VPN gerçekten ücretsiz mi?",
    a: "Evet — sınırsız veri, ücretsiz hesap. Veri satışı, reklam veya zararlı yazılım yok. Gelir modeli, ücretli planlar (Plus, Unlimited) üzerinden çalışıyor. Sınırlamalar: 3 ülke seçeneği ve düşük öncelik (yoğun saatlerde hız sınırlı).",
  },
  {
    q: "Ücretli VPN ne kadar tutar?",
    a: "İlk dönem fiyatları aylık ~$2-5 arasında. Yenileme dönemi $5-10 civarına yükselebilir. Mullvad sabit €5/ay sunar; promosyon yapmaz.",
  },
  {
    q: "Ücretsiz VPN ile streaming yapabilir miyim?",
    a: "Çoğu ücretsiz VPN'in streaming bypass'ı çalışmaz; Netflix, Disney+ gibi platformlar bu IP'leri proaktif olarak engeller. Proton VPN'in ücretsiz planı da streaming için optimize değil — kasıtlı tasarım.",
  },
  {
    q: "Hangi durumlarda ücretsiz VPN yeterli?",
    a: "Tek seferlik düşük riskli kullanım (örn. yurt dışında otel Wi-Fi'sinde e-posta kontrol etmek) için Proton VPN'in ücretsiz planı yeterli. Sürekli streaming, çoklu cihaz veya iş kullanımı için ücretli plan şart.",
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
            name: "Ücretsiz vs Ücretli VPN",
            path: "/rehber/ucretsiz-vs-ucretli-vpn",
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
          › <span className="text-ink-strong">Ücretsiz vs Ücretli VPN</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Wallet className="size-3" /> Karar rehberi
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Ücretsiz vs Ücretli VPN: Gerçekten değiyor mu?
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            &quot;Ücretsiz&quot; her zaman bedava demek değil. Çoğu ücretsiz
            VPN&apos;in gerçek maliyeti gizlilik. İstisnalar var ama nadir.
          </p>
        </header>

        <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Tek cümlede karar
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                Ücretsiz VPN istiyorsan <strong>yalnızca Proton VPN</strong>{" "}
                kullan. Diğer ücretsiz seçenekler genelde verini satıyor veya
                güvenliğini risk altına atıyor.
              </p>
            </div>
          </div>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>Ücretsiz VPN&apos;ler nasıl para kazanıyor?</h2>
          <p>
            Bir VPN sağlayıcısının altyapı (sunucu, bant genişliği) maliyeti
            kullanıcı başına aylık $1-3 civarındadır. &quot;Ücretsiz&quot;
            sunan bir sağlayıcı bu maliyeti farklı bir yerden çıkarmak
            zorundadır. Tipik gelir modelleri:
          </p>
        </article>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Card className="p-5 border-danger-500/30 bg-danger-500/5">
            <X className="size-5 text-danger-500" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Veri satışı
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Hangi siteleri ziyaret ettiğin, ne aradığın, hangi uygulamaları
              kullandığın gibi davranış verilerin reklam verici şirketlere
              satılır. 2017 PureVPN — 2019 Hotspot Shield gibi örnekler var.
            </p>
          </Card>
          <Card className="p-5 border-danger-500/30 bg-danger-500/5">
            <X className="size-5 text-danger-500" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Reklam enjeksiyonu
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              VPN sunucusu, ziyaret ettiğin siteye geçişte reklam ekler veya
              orijinal reklamı kendi reklamıyla değiştirir.
            </p>
          </Card>
          <Card className="p-5 border-danger-500/30 bg-danger-500/5">
            <X className="size-5 text-danger-500" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Zararlı yazılım
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Uygulamanın kendisi zararlı yazılım içerir. CSIRO 2016 araştırması:
              ücretsiz VPN uygulamalarının %38&apos;i zararlı yazılım barındırıyor.
            </p>
          </Card>
          <Card className="p-5 border-danger-500/30 bg-danger-500/5">
            <X className="size-5 text-danger-500" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Bant genişliği satışı
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Senin cihazını başka kullanıcıların trafiğini taşıyan bir &quot;çıkış
              noktasına&quot; dönüştürür. Hola VPN 2015 olayı meşhur örnek.
            </p>
          </Card>
        </div>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>İstisna: Proton VPN&apos;in ücretsiz planı</h2>
          <p>
            Tüm ücretsiz VPN&apos;lere şüpheyle yaklaşmak doğru ama Proton VPN
            önemli bir istisna. Neden?
          </p>
          <ul>
            <li>
              Aynı no-logs politikası ücretsiz ve ücretli planlar için geçerli.
            </li>
            <li>
              Aynı şifreleme ve teknik altyapı kullanılıyor.
            </li>
            <li>İstemciler açık kaynak; bağımsız olarak denetleniyor.</li>
            <li>
              Gelir modeli ücretli planlardan (Plus, Unlimited) — ücretsiz
              kullanıcılardan değil.
            </li>
            <li>
              İsviçre yargı yetkisi ve düzenli no-logs denetimleri.
            </li>
          </ul>
          <p>
            Ücretsiz planın sınırlamaları:
          </p>
          <ul>
            <li>Yalnızca 3 ülke seçimi (Hollanda, ABD, Japonya)</li>
            <li>Düşük öncelik (yoğun saatlerde hız sınırlı)</li>
            <li>Streaming bypass çalışmıyor (kasıtlı)</li>
            <li>Birden fazla cihaz desteklenmiyor (tek cihaz)</li>
          </ul>

          <h2>Ücretli VPN&apos;e ne zaman geçmeli?</h2>
        </article>

        <Card className="mt-6 p-6">
          <h3 className="font-semibold text-ink-strong">Ücretli VPN şart</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink">
            <li className="flex items-start gap-2">
              <Check className="size-4 text-success-600 mt-0.5 shrink-0" />
              <span>
                Sürekli streaming için (Netflix US, BluTV, Disney+ vb.)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="size-4 text-success-600 mt-0.5 shrink-0" />
              <span>
                Birden fazla cihazı (telefon + dizüstü + tablet + akıllı TV)
                korumak için
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="size-4 text-success-600 mt-0.5 shrink-0" />
              <span>İş veya hassas iletişim için</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="size-4 text-success-600 mt-0.5 shrink-0" />
              <span>
                Tutarlı yüksek hız ihtiyacı (4K streaming, oyun) için
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="size-4 text-success-600 mt-0.5 shrink-0" />
              <span>
                Türkiye sunucusu, port forwarding, multi-hop gibi gelişmiş
                özellikler için
              </span>
            </li>
          </ul>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>Ücretli VPN ne kadar tutar?</h2>
          <p>2026&apos;da gerçekçi aralıklar:</p>
          <ul>
            <li>
              <strong>İlk dönem promosyonu (1-3 yıllık plan):</strong>{" "}
              ~$2-5/ay
            </li>
            <li>
              <strong>Yenileme dönemi:</strong> ~$5-10/ay (yenileme tuzağına
              dikkat — otomatik yenilemeyi kapat)
            </li>
            <li>
              <strong>Aylık plan:</strong> ~$10-15/ay (çok kötü değer; uzun
              dönem her zaman daha iyi)
            </li>
            <li>
              <strong>İstisna: Mullvad</strong> — sabit €5/ay, indirim yok,
              yenileme tuzağı yok.
            </li>
          </ul>

          <h2>Karar matrisi</h2>
          <table>
            <thead>
              <tr>
                <th>Kullanım senaryon</th>
                <th>Önerim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tek seferlik, düşük riskli kullanım</td>
                <td>Proton VPN ücretsiz</td>
              </tr>
              <tr>
                <td>Streaming + birden fazla cihaz</td>
                <td>
                  <Link href="/inceleme/surfshark">Surfshark</Link> veya{" "}
                  <Link href="/inceleme/nordvpn">NordVPN</Link>
                </td>
              </tr>
              <tr>
                <td>Maksimum gizlilik + anonim</td>
                <td>
                  <Link href="/inceleme/mullvad">Mullvad</Link> veya{" "}
                  <Link href="/inceleme/proton-vpn">Proton VPN</Link>
                </td>
              </tr>
              <tr>
                <td>Premium istikrar + kolay kullanım</td>
                <td>
                  <Link href="/inceleme/expressvpn">ExpressVPN</Link>
                </td>
              </tr>
              <tr>
                <td>Teknik kontrol + port forwarding</td>
                <td>
                  <Link href="/inceleme/pia">PIA</Link>
                </td>
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

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili rehberler</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/rehber/vpn-nedir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN nedir?
            </Link>
            <Link
              href="/rehber/vpn-guvenlik-kontrol-listesi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              Güvenlik kontrol listesi
            </Link>
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
            >
              En iyi 10 VPN
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
