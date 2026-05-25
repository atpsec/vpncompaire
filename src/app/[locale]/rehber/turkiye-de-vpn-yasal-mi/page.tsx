import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Scale, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Türkiye'de VPN Yasal mı? Tam Hukuki Rehber (2026)",
  description:
    "Türkiye'de VPN kullanımının yasal durumu, neyin yasal/yasadışı olduğu, risk senaryoları ve pratik kurallar. 2026 güncel rehber.",
};

type Props = { params: Promise<{ locale: string }> };

const faqs = [
  {
    q: "Türkiye'de VPN kullanmak yasal mı?",
    a: "Evet. VPN'in kendisi yasal bir teknolojidir ve gizlilik, kurumsal güvenlik, uzaktan çalışma gibi meşru amaçlarla yaygın olarak kullanılır. Türkiye'de VPN kullanımını yasaklayan özel bir yasa yok.",
  },
  {
    q: "Bazı VPN'lerin Türkiye'de yasaklı olduğu doğru mu?",
    a: "Bazı VPN sağlayıcılarının web siteleri Türkiye'den erişimi BTK tarafından kısıtlanabiliyor. Bu, VPN kullanmanın yasaklı olduğu anlamına gelmez — yalnızca o sağlayıcının web sitesine direkt erişim kısıtlı. Çoğu VPN uygulaması bu durumda dahi çalışmaya devam ediyor.",
  },
  {
    q: "VPN üzerinden ne yapmak yasadışı?",
    a: "VPN dışında ne yapmak yasadışıysa, VPN üzerinden de yasadışı. VPN bir 'yasallaştırıcı' değil, gizlilik aracıdır. Telif hakkı ihlali, dolandırıcılık, yasaklı içerik üretimi/yayılması gibi eylemler VPN kullansan da kullanmasan da yasadışı.",
  },
  {
    q: "İş yerinde VPN kullanmak yasal mı?",
    a: "Şirket politikası çerçevesinde — çoğu kurum çalışanlarının uzaktan erişim için VPN kullanmasını zorunlu kılar. Şahsi VPN kullanımı işyerinde yine yasal, ancak şirket ağ politikasıyla çelişebilir.",
  },
  {
    q: "VPN kullandığım için bana ceza gelebilir mi?",
    a: "Yalnızca VPN kullanmak nedeniyle Türkiye'de ceza işlemi yapıldığına dair somut bir hukuki örnek bilinmiyor. VPN üzerinden işlenen bir suç varsa o suça yönelik ceza uygulanır — VPN kullanmak ayrıca cezalandırılmaz.",
  },
  {
    q: "Yurt dışındaki Türkler VPN kullanırken farklı kurallar geçerli mi?",
    a: "Yurt dışındaysan, bulunduğun ülkenin yasaları geçerli. Çoğu AB ülkesi ve ABD'de VPN kullanımı yasal. BAE, Çin, Belarus, İran, Rusya, Türkmenistan gibi ülkelerde kısıtlamalar olabilir.",
  },
  {
    q: "Türk bankası VPN'imi tespit ederse hesabım kapatılır mı?",
    a: "Genelde hayır — banka VPN tespit ederse oturumu kapatır ama hesabını kapatmaz. Pratik strateji: bankacılık işlemleri için VPN'i geçici olarak kapat.",
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
            name: "Türkiye'de VPN yasal mı?",
            path: "/rehber/turkiye-de-vpn-yasal-mi",
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
          <span className="text-ink-strong">
            Türkiye&apos;de VPN yasal mı?
          </span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Scale className="size-3" /> Hukuki rehber
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Türkiye&apos;de VPN Yasal mı?
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Kısa cevap: <strong>Evet</strong>. VPN kullanmak Türkiye&apos;de
            yasal bir teknoloji. Ama nüanslar var — neyin yasal, neyin riskli
            olduğunu detaylı açıklıyoruz.
          </p>
        </header>

        <Card className="mt-8 p-6 bg-success-50/60">
          <h2 className="text-lg font-semibold text-success-700 flex items-center gap-2">
            <ShieldCheck className="size-5" /> Hızlı cevap
          </h2>
          <ul className="mt-3 space-y-2 text-ink leading-relaxed">
            <li>
              <strong>VPN kullanmak yasal:</strong> Türkiye&apos;de VPN
              kullanımını yasaklayan bir yasa yok.
            </li>
            <li>
              <strong>VPN bir &quot;yasallaştırıcı&quot; değil:</strong>{" "}
              VPN ile yapılan eylem yasadışı ise, eylemin kendisi yasadışıdır
              — VPN kullanmak da ek suç oluşturmaz, eylemi yasal hale de
              getirmez.
            </li>
            <li>
              <strong>Bazı VPN siteleri kısıtlanabilir:</strong> BTK zaman
              zaman bazı VPN sağlayıcılarının web sitelerini erişime
              kapatabiliyor. Bu, VPN kullanmanın yasaklı olduğu anlamına
              gelmiyor.
            </li>
          </ul>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>Yasal çerçeve</h2>
          <p>
            Türkiye&apos;de internet hizmetleri 5651 sayılı &quot;İnternet
            Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar
            Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun&quot;{" "}
            tarafından düzenlenir. Bu kanun, hangi içeriğin yayınlanabileceğine
            ve hangi platformların erişime kapatılabileceğine dair çerçeveyi
            belirler — ancak VPN teknolojisinin kullanımını doğrudan
            yasaklamaz.
          </p>
          <p>
            VPN, kurumsal güvenlik, uzaktan çalışma, gizlilik ve veri
            koruması gibi meşru amaçlarla yaygın olarak kullanılan bir
            teknoloji. Türk yasaları bu teknolojinin kullanımını yasak
            kılmaz; aksine, çoğu kurum ve şirket çalışanlarına VPN kullanımı
            zorunlu kılar (kurumsal ağa güvenli erişim için).
          </p>

          <h2>BTK ve VPN web sitelerine erişim kısıtlamaları</h2>
          <p>
            Bilgi Teknolojileri ve İletişim Kurumu (BTK), zaman zaman bazı
            VPN sağlayıcılarının web sitelerini Türkiye&apos;den erişime
            kapatabiliyor. Bu durumlar genelde aşağıdaki senaryolarda oluyor:
          </p>
          <ul>
            <li>Web sitesinin barındırdığı bilgi formatına dair bir bildirim</li>
            <li>İçerik moderasyonu süreçlerine dair karşılıklı uyumsuzluk</li>
            <li>Yasal taleplerin işletilme şekline dair anlaşmazlıklar</li>
          </ul>
          <p>
            <strong>Önemli nüans:</strong> Web sitesinin engellenmiş olması,
            VPN uygulamasının çalışmadığı anlamına gelmez. Çoğu kullanıcı,
            VPN uygulamasını yurt dışındayken indirip kurduktan sonra
            Türkiye&apos;ye döndüğünde sorunsuz kullanmaya devam ediyor.
          </p>

          <h2>VPN ile yapılması yasadışı olan şeyler</h2>
          <p>
            VPN bir gizlilik aracıdır, &quot;yasallaştırıcı&quot; değil.
            Aşağıdakiler VPN kullansan da kullanmasan da yasadışı:
          </p>
          <ul>
            <li>Telif hakkı ihlali (illegal torrent, korsan içerik dağıtımı)</li>
            <li>Dolandırıcılık ve kimlik hırsızlığı</li>
            <li>Çocuğa karşı işlenen suçlar</li>
            <li>Terör propagandası</li>
            <li>Yasaklı maddelerin alım/satımı</li>
          </ul>
          <p>
            Bu eylemler için VPN kullanmak ek bir suç oluşturmaz — ana
            eylem zaten yasadışı.
          </p>

          <h2>Pratik kullanım — neyi yapabilirsin?</h2>
          <ul>
            <li>
              <strong>Gizlilik için VPN kullanmak:</strong> ISP&apos;nin
              hangi siteleri ziyaret ettiğini görmemesi, halka açık
              Wi-Fi&apos;de güvenlik için.
            </li>
            <li>
              <strong>Uzaktan çalışma:</strong> Şirket ağına güvenli erişim.
            </li>
            <li>
              <strong>Yurt dışı içerik erişimi (genel):</strong> Yabancı
              streaming kütüphanelerine erişim. Hizmet sağlayıcının kullanım
              koşullarına uygun olmasa da yasadışı değil.
            </li>
            <li>
              <strong>BluTV/Exxen yurt dışından izleme:</strong>{" "}
              Tartışmasız yasal — kendi Türkiye aboneliğine kendi VPN ile
              eriştiğinde herhangi bir hak ihlali olmaz.
            </li>
          </ul>

          <h2>Pratik tavsiye</h2>
          <ul>
            <li>
              <strong>VPN&apos;i yurt dışındayken indir:</strong> BTK
              engellemelerine takılmamak için, mümkünse VPN uygulamasını
              Türkiye&apos;ye gelmeden önce kur.
            </li>
            <li>
              <strong>Bankacılık için VPN&apos;i kapat:</strong> Türk
              bankaları VPN tespit ederse oturumu güvenlik gereği kapatır.
            </li>
            <li>
              <strong>Denetlenmiş, güvenilir bir VPN seç:</strong> Ücretsiz
              VPN&apos;ler verini satabilir. Denetimli sağlayıcılarla devam
              et — {""}
              <Link href="/en-iyi-vpn">en iyi seçimlerimizi gör</Link>.
            </li>
          </ul>

          <h2>Sıkça sorulan sorular</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <Card className="mt-12 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Bu rehber hukuki tavsiye yerine geçmez
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                Bu sayfa genel bilgi amaçlıdır. Spesifik bir durum için
                hukuki tavsiye almak istiyorsan, bir avukatla görüşmeni
                öneririz.
              </p>
            </div>
          </div>
        </Card>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/en-iyi/turkiye"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Türkiye için en iyi VPN
            </Link>
            <Link
              href="/en-iyi/yurt-disindaki-turkler"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Yurt dışı Türkler için VPN
            </Link>
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              En iyi VPN&apos;ler 2026 <ArrowRight className="size-3" />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
