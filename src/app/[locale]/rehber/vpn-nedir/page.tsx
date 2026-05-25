import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BookOpen, Lock, Globe, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "VPN Nedir? 5 Dakikalık Başlangıç Rehberi (2026)",
  description:
    "VPN'in ne olduğu, nasıl çalıştığı, seni neye karşı koruduğu ve hangi durumlarda kullanman gerektiği — basit ve net anlatım.",
};

type Props = { params: Promise<{ locale: string }> };

const faqs = [
  {
    q: "VPN'in açılımı ne?",
    a: "VPN, 'Virtual Private Network' (Sanal Özel Ağ) ifadesinin kısaltmasıdır.",
  },
  {
    q: "VPN'i kim kullanmalı?",
    a: "Halka açık Wi-Fi kullanan herkes, gizliliğini önemseyen kullanıcılar, yurt dışındaki Türkler, uzaktan çalışanlar ve seyahat edenler VPN'den fayda görür.",
  },
  {
    q: "VPN ücretsiz mi?",
    a: "Ücretsiz VPN'ler var ama çoğu güvensiz (veri satarlar, reklam enjekte ederler). Proton VPN'in ücretsiz planı istisnadır. Genelde ücretli bir VPN gizlilik ve güvenlik için daha güvenli.",
  },
  {
    q: "VPN internetimi yavaşlatır mı?",
    a: "Modern VPN'ler genelde %5-15 hız kaybına yol açar. Sunucu mesafesi ve protokol seçimi en büyük etkenler.",
  },
  {
    q: "VPN beni tamamen anonim yapar mı?",
    a: "Hayır. VPN, ISP'nin ve halka açık ağdaki diğer kullanıcıların seni izlemesini engeller ama %100 anonimlik sağlamaz. Tarayıcı parmak izi, cookie ve giriş yaptığın hesaplar üzerinden hâlâ izlenebilirsin.",
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
          { name: "VPN nedir?", path: "/rehber/vpn-nedir" },
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
          › <span className="text-ink-strong">VPN nedir?</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <BookOpen className="size-3" /> Başlangıç rehberi
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN nedir?
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            5 dakikada VPN&apos;in ne olduğunu, nasıl çalıştığını ve seni
            neye karşı koruduğunu net şekilde anlatıyoruz.
          </p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand-600" /> Tek cümlede VPN
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            VPN (Virtual Private Network), internet trafiğini şifreleyerek bir
            ara sunucu üzerinden yönlendiren ve böylece kimliğini ve
            verilerini gizleyen bir teknolojidir.
          </p>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>VPN nasıl çalışır?</h2>
          <p>
            Normalde internete bağlandığında, cihazından çıkan veri doğrudan
            internet servis sağlayıcına (ISP&apos;ye) gider; ISP de bu veriyi
            hedef siteye yönlendirir. Bu süreçte:
          </p>
          <ul>
            <li>ISP, hangi siteleri ziyaret ettiğini görür.</li>
            <li>Halka açık Wi-Fi&apos;deki diğer kullanıcılar trafiğini izleyebilir.</li>
            <li>Hedef site, gerçek IP adresini görür.</li>
          </ul>
          <p>
            VPN aktifken bu akış değişir:
          </p>
          <ol>
            <li>
              Cihazın, VPN uygulaması aracılığıyla VPN sunucusuna{" "}
              <strong>şifreli bir tünel</strong> kurar.
            </li>
            <li>
              Tüm internet trafiğin bu tünelden geçer. ISP yalnızca
              &quot;şifreli veri VPN sunucusuna gidiyor&quot; görür — içeriği
              göremez.
            </li>
            <li>
              VPN sunucusu trafiği çözer ve hedef siteye yönlendirir. Hedef
              site, gerçek IP&apos;ni değil VPN sunucusunun IP&apos;sini
              görür.
            </li>
            <li>Yanıt aynı yoldan, şifrelenmiş olarak sana döner.</li>
          </ol>

          <h2>VPN seni neye karşı korur?</h2>
        </article>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <Lock className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              ISP gözetimi
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              ISP&apos;n hangi siteleri ziyaret ettiğini, ne aradığını veya
              hangi içerikleri tükettiğini göremez.
            </p>
          </Card>
          <Card className="p-5">
            <Globe className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Halka açık Wi-Fi
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Otel, kafe, havaalanı ağlarındaki diğer kullanıcılar trafiğini
              dinleyemez.
            </p>
          </Card>
          <Card className="p-5">
            <ShieldCheck className="size-6 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              IP bazlı takip
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Web siteleri gerçek IP&apos;n yerine VPN sunucusunun IP&apos;sini
              görür. Coğrafi konumun maskelenir.
            </p>
          </Card>
        </div>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>VPN&apos;in koruyamadığı şeyler</h2>
          <p>VPN bir sihirli değnek değildir. Şunlara karşı korumaz:</p>
          <ul>
            <li>
              <strong>Tarayıcı parmak izi:</strong> Tarayıcı, ekran çözünürlüğü,
              tipografi gibi bilgiler birleşince seni hâlâ tanıyabilir.
            </li>
            <li>
              <strong>Cookies (çerezler):</strong> Eğer Google&apos;a giriş
              yaptıysan, Google seni VPN üzerinden de tanır.
            </li>
            <li>
              <strong>Bilinçli verdiğin bilgiler:</strong> Bir forma adını
              yazarsan, VPN bunu engelleyemez.
            </li>
            <li>
              <strong>Zararlı yazılım:</strong> VPN, bilgisayarına zararlı
              yazılım bulaşmasını engellemez (antivirus farklı bir araç).
            </li>
            <li>
              <strong>Phishing:</strong> Sahte siteye bilgi girersen, VPN seni
              bu hatadan kurtaramaz.
            </li>
          </ul>

          <h2>Hangi durumlarda VPN kullanmalısın?</h2>
          <ul>
            <li>
              <strong>Halka açık Wi-Fi kullanırken</strong> (otel, kafe,
              havaalanı) — pasif dinlemeye karşı koruma.
            </li>
            <li>
              <strong>Yurt dışındayken</strong> — evdeki içeriklere (BluTV,
              Exxen, Netflix TR, bankacılık) erişim için.
            </li>
            <li>
              <strong>Gizlilik öncelikli</strong> olduğunda — ISP&apos;nin
              tarama geçmişini görmemesi için.
            </li>
            <li>
              <strong>Kısıtlayıcı ağlarda</strong> — bazı işyeri/üniversite
              ağlarında engellenmiş sitelere erişim.
            </li>
            <li>
              <strong>Coğrafi kısıtlamayı aşmak</strong> için — Netflix US
              kütüphanesine erişmek gibi.
            </li>
          </ul>

          <h2>Hangi durumlarda VPN&apos;e ihtiyacın yok?</h2>
          <ul>
            <li>
              Sadece evdeki güvenli Wi-Fi&apos;den, sosyal medyada vakit
              geçirmek için.
            </li>
            <li>
              Banka uygulamasında işlem yaparken (bazı bankalar VPN tespit
              ederse oturumu kapatabilir).
            </li>
          </ul>

          <h2>VPN protokolleri nedir?</h2>
          <p>
            Protokol, VPN tünelinin nasıl kurulduğunu belirleyen teknik
            standardı ifade eder. En yaygın olanlar:
          </p>
          <ul>
            <li>
              <strong>WireGuard:</strong> Modern, hızlı, küçük kod tabanı.
              2026&apos;da altın standart.
            </li>
            <li>
              <strong>OpenVPN:</strong> Daha eski, daha yavaş ama çok yaygın
              destek.
            </li>
            <li>
              <strong>Lightway</strong> (ExpressVPN&apos;in özel protokolü):
              WireGuard ile rekabetçi, hızlı bağlantı kurulumu.
            </li>
            <li>
              <strong>NordLynx</strong> (NordVPN&apos;in özel protokolü):
              WireGuard tabanlı, optimize edilmiş.
            </li>
          </ul>

          <h2>İlk VPN&apos;ini seçerken</h2>
          <p>Üç temel kriter:</p>
          <ol>
            <li>
              <strong>Bağımsız denetim geçmişi:</strong> Sağlayıcının no-logs
              iddiası üçüncü bir taraf tarafından doğrulanmış mı?
            </li>
            <li>
              <strong>Yargı yetkisi:</strong> Sağlayıcı hangi ülke yasalarına
              tabi? 14 Eyes ittifakı dışı (Panama, İsviçre, Romanya) tercih
              edilir.
            </li>
            <li>
              <strong>Senin kullanım senaryona uyum:</strong> Streaming mi,
              gizlilik mi, çok cihaz mı?
            </li>
          </ol>
          <p>
            Bu üç kriteri en iyi karşılayan seçimler için{" "}
            <Link href="/en-iyi-vpn">2026&apos;nın en iyi VPN&apos;leri</Link>{" "}
            sıralamamıza göz at.
          </p>

          <h2>Sıkça sorulan sorular</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Sıradaki adım</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              En iyi 10 VPN sıralaması
            </Link>
            <Link
              href="/rehber/ucretsiz-vs-ucretli-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Ücretsiz vs Ücretli VPN
            </Link>
            <Link
              href="/rehber/vpn-guvenlik-kontrol-listesi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN güvenlik kontrol listesi
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
