import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AlertTriangle, Scale } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yasal Uyarı (Disclaimer) — Bilgi Amaçlı İçerik",
  description:
    "vpncompaire içeriği bilgi amaçlıdır; hukuki, finansal veya siber güvenlik garantisi vermez. Kullanıcılar nihai kararı kendileri verir.",
  alternates: { canonical: absoluteUrl("/yasal-uyari") },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Yasal Uyarı", path: "/yasal-uyari" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Yasal Uyarı</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Scale className="size-3" /> Yasal Uyarı
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Yasal Uyarı (Disclaimer)
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            Son güncelleme: Mayıs 2026
          </p>
        </header>

        <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Lütfen önemli: bilgi amaçlı içerik
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                Bu sitedeki tüm içerik genel bilgi amaçlıdır.{" "}
                {siteConfig.name} hukuki, finansal veya siber güvenlik
                garantisi vermez. Bir VPN seçimi veya gizlilik kararı
                vermeden önce kendi durumunu değerlendirmek senin
                sorumluluğundadır.
              </p>
            </div>
          </div>
        </Card>

        <article className="mt-10 prose prose-stone max-w-none">
          <h2>1. Garantilerin reddi</h2>
          <p>
            {siteConfig.name}, sitedeki bilgilerin{" "}
            <strong>doğruluğu, eksiksizliği veya güncelliği</strong>{" "}
            konusunda hiçbir açık veya örtük garanti vermez. İçerik
            &quot;olduğu gibi&quot; sunulur. Site:
          </p>
          <ul>
            <li>
              Belirli bir VPN&apos;in <strong>seni koruyacağını</strong>{" "}
              garanti etmez.
            </li>
            <li>
              Hiçbir VPN&apos;in <strong>tam anonimlik sağladığını</strong>{" "}
              iddia etmez. VPN, gizliliği artıran bir araçtır; anonimliğin
              tek garantisi değildir.
            </li>
            <li>
              Yasal süreçlerde sağlayıcıların{" "}
              <strong>kullanıcı verisini ifşa etmeyeceğini</strong>{" "}
              garanti etmez. Geçmişteki davranış, gelecekteki davranışın
              kanıtı değildir.
            </li>
            <li>
              Streaming uyumluluğunun veya bypass başarısının{" "}
              <strong>kalıcılığını</strong> garanti etmez. Platform
              kontrolleri sürekli değişir.
            </li>
          </ul>

          <h2>2. Sağlayıcı verisinin değişkenliği</h2>
          <p>
            VPN sağlayıcıların aşağıdaki bilgileri, biz fark etmeden veya
            sayfayı güncelleyemeden değişebilir:
          </p>
          <ul>
            <li>Aylık/yıllık fiyatlar ve indirim kampanyaları</li>
            <li>Yenileme dönemi fiyatlandırması</li>
            <li>Para iade süresi ve koşulları</li>
            <li>Sunucu sayısı, ülke listesi, yeni/kaldırılan lokasyonlar</li>
            <li>Eşzamanlı cihaz limiti</li>
            <li>Bağımsız denetim sıklığı ve son denetim tarihi</li>
            <li>Gizlilik politikası ve no-log uygulaması</li>
            <li>Yargı yetkisi (örn. şirket satın alımları, taşınma)</li>
            <li>Desteklenen ödeme yöntemleri</li>
            <li>Streaming platform uyumluluğu</li>
          </ul>
          <p>
            <strong>
              Satın alma kararı vermeden önce, ilgili sağlayıcının resmi
              web sitesinden en güncel bilgileri kontrol etmek senin
              sorumluluğundır.
            </strong>
          </p>

          <h2>3. Hukuki tavsiye değildir</h2>
          <p>
            Sitede yer alan &quot;Türkiye&apos;de VPN yasal mı?&quot; veya
            benzeri rehberler{" "}
            <strong>hukuki tavsiye olarak yorumlanamaz</strong>. Yasalar
            zaman içinde değişir; bireysel durumlar farklılık gösterir.
            Spesifik bir hukuki sorun için bir avukatla görüşmeni
            öneririz.
          </p>

          <h2>4. Finansal tavsiye değildir</h2>
          <p>
            Fiyat karşılaştırmaları ve maliyet hesaplayıcı{" "}
            <strong>finansal tavsiye yerine geçmez</strong>. Bir
            aboneliğin senin için uygun olup olmadığını kendi bütçen ve
            ihtiyacın çerçevesinde değerlendirmek senin
            sorumluluğundadır.
          </p>

          <h2>5. Siber güvenlik garantisi değildir</h2>
          <p>
            VPN, kapsamlı bir siber güvenlik çözümünün yalnızca bir
            parçasıdır. Hiçbir VPN tek başına seni:
          </p>
          <ul>
            <li>Kötü amaçlı yazılımdan korumaz (antivirüs gerekir).</li>
            <li>
              Phishing/sosyal mühendislikten tek başına korumaz (bilinçli
              kullanım gerekir).
            </li>
            <li>
              Tarayıcı parmak izinden veya cookie tabanlı izlemeden
              korumaz.
            </li>
            <li>
              Bilinçli olarak verdiğin kişisel bilgilerin kaybından
              korumaz.
            </li>
            <li>
              Hukuki süreçlerde kimliğinin ortaya çıkmasından kesin
              olarak korumaz.
            </li>
          </ul>

          <h2>6. Üçüncü taraf hizmetleri</h2>
          <p>
            Bağlandığın VPN sağlayıcılarının kendi şartları, gizlilik
            politikaları ve hizmet kalitesi geçerlidir. {siteConfig.name}{" "}
            bu üçüncü tarafların hareketlerinden, fiyat değişikliklerinden,
            servis kesintilerinden veya politika değişikliklerinden
            sorumlu değildir.
          </p>

          <h2>7. Marka adları</h2>
          <p>
            Site içinde geçen marka adları (NordVPN, Surfshark, ExpressVPN,
            Proton VPN, PIA, CyberGhost, Mullvad, IPVanish, Windscribe,
            TunnelBear vb.) ilgili sahiplerinin tescilli markalarıdır ve
            yalnızca ürün tanımlama amacıyla nominatif adil kullanım
            (nominative fair use) çerçevesinde kullanılır.
          </p>

          <h2>8. Affiliate ilişkileri</h2>
          <p>
            Bazı bağlantılar affiliate (ortaklık) bağlantısıdır. Bir
            satın alma yapıldığında {siteConfig.name} komisyon
            kazanabilir; bu komisyon senin ödediğin fiyatı değiştirmez.
            Detaylar için{" "}
            <Link href="/reklam-aciklamasi">Reklam Açıklaması</Link>{" "}
            sayfasına bak.
          </p>

          <h2>9. Sorumluluğun sınırlandırılması</h2>
          <p>
            Yürürlükteki mevzuatın izin verdiği azami ölçüde,{" "}
            {siteConfig.name} ve yazarları/editörleri, bu sitedeki bilgilere
            dayanarak alınan kararlar sonucunda doğan{" "}
            <strong>doğrudan, dolaylı, arızi veya özel zararlar</strong>{" "}
            için sorumlu tutulamaz.
          </p>

          <h2>10. Nihai karar kullanıcıdadır</h2>
          <p>
            Hangi VPN&apos;i seçeceğin, hangi planı satın alacağın, VPN&apos;i
            nasıl yapılandıracağın ve hangi yasal/teknik bağlamda
            kullanacağın <strong>tamamen senin kararındır</strong>. Bu
            sitenin önerileri başlangıç noktası olarak değerlendirilmeli,
            kesin direktif olarak değil.
          </p>
        </article>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/reklam-aciklamasi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Reklam açıklaması
            </Link>
            <Link
              href="/sartlar"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Kullanım şartları
            </Link>
            <Link
              href="/gizlilik"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Gizlilik politikası
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Test metodolojimiz
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
