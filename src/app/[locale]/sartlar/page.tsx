import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FileText, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description:
    "vpncompaire sitesinin kullanım şartları, sorumluluk sınırları ve yasal çerçeve.",
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
          { name: "Kullanım Şartları", path: "/sartlar" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Kullanım Şartları</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <FileText className="size-3" /> Yasal
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Kullanım Şartları
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            Son güncelleme: Mayıs 2026
          </p>
        </header>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>1. Hizmet açıklaması</h2>
          <p>
            {siteConfig.name} (&quot;site&quot;), VPN servislerini bağımsız
            metodoloji ile inceleyen ve karşılaştıran bilgi amaçlı bir web
            sitesidir. Site, kullanıcılara VPN sağlayıcıları hakkında editoryal
            içerik, karşılaştırma ve rehber sunar.
          </p>

          <h2>2. Kabul</h2>
          <p>
            Bu siteyi kullanarak işbu Kullanım Şartları&apos;nı, Gizlilik
            Politikası&apos;nı ve Reklam Açıklaması&apos;nı kabul etmiş
            sayılırsın. Bu şartları kabul etmiyorsan siteyi kullanmamalısın.
          </p>

          <h2>3. İçeriğin amacı ve sorumluluk sınırı</h2>
          <p>
            Sitedeki tüm içerikler genel bilgi sağlama amaçlıdır. İçerikler:
          </p>
          <ul>
            <li>Hukuki tavsiye yerine geçmez</li>
            <li>Mali tavsiye yerine geçmez</li>
            <li>Kişiselleştirilmiş güvenlik danışmanlığı değildir</li>
            <li>Bireysel durumlara özel uygunluk garantisi vermez</li>
          </ul>
          <p>
            Önerilerimiz bağımsız test ve genel kanıtlara dayanır; bireysel
            ihtiyacın için spesifik bir kararı vermeden önce kendi durumunu
            değerlendirmen önerilir.
          </p>

          <h2>4. Üçüncü taraf bağlantıları</h2>
          <p>
            Site, VPN sağlayıcılarının kendi sitelerine bağlantı içerir. Bu
            bağlantıların bazıları affiliate (ortaklık) ilişkisi
            çerçevesindedir — detaylar için{" "}
            <Link href="/reklam-aciklamasi">Reklam Açıklaması</Link>{" "}
            sayfasına bak. Bağlantıyı takip ettiğinde dış sitenin kendi
            şartları geçerli olur; o sitelerin içeriği veya hizmetlerinden
            sorumlu değiliz.
          </p>

          <h2>5. Garantilerin sınırlanması</h2>
          <p>
            Site &quot;olduğu gibi&quot; sunulur. İçeriklerin güncelliği,
            doğruluğu, eksiksizliği konusunda azami özen gösteririz; ancak:
          </p>
          <ul>
            <li>
              VPN sağlayıcıların fiyat, özellik veya hizmet politikaları
              haber verilmeksizin değişebilir
            </li>
            <li>Audit raporları ve denetimler güncellenebilir</li>
            <li>
              Streaming uyumluluğu, sağlayıcı blokları nedeniyle anlık
              olarak değişebilir
            </li>
          </ul>
          <p>
            En son durum için ilgili VPN sağlayıcısının kendi sitesini
            doğrulamanı öneririz.
          </p>

          <h2>6. Sorumluluğun sınırlandırılması</h2>
          <p>
            Yürürlükteki mevzuatın izin verdiği azami ölçüde, {siteConfig.name}{" "}
            siteyle ilişkili olarak doğrudan, dolaylı, arızi veya özel zararlar
            için sorumlu tutulamaz. Bu sınırlama, içerikteki bilgilerin
            kullanılmasından doğan zararları da kapsar.
          </p>

          <h2>7. Fikri mülkiyet</h2>
          <p>
            Sitedeki tüm özgün metin, görsel ve tasarım {siteConfig.name}{" "}
            tarafından üretilmiş olup telif hakkıyla korunur. Adil kullanım
            sınırları içinde alıntı yapılabilir; ancak kaynak belirtilmeden
            kopyalama, sistematik yeniden yayın yasaktır.
          </p>
          <p>
            Marka isimleri (NordVPN, Surfshark, ExpressVPN, Proton VPN, PIA,
            CyberGhost, Mullvad vb.) ilgili sahiplerinin tescilli markalarıdır
            ve burada yalnızca tanımlama amaçlı kullanılır.
          </p>

          <h2>8. Yasaklı kullanımlar</h2>
          <p>Site üzerinden veya site içerikleriyle ilgili olarak:</p>
          <ul>
            <li>Otomatik veri sıyırma (scraping) yapmayacaksın</li>
            <li>
              Siteyi normal kullanım dışında hizmet aksaklığına yol açacak
              şekilde sorgulayamayacaksın (DDoS, vb.)
            </li>
            <li>
              Telif hakkı veya marka haklarını ihlal edecek şekilde içerik
              yeniden yayınlamayacaksın
            </li>
          </ul>

          <h2>9. Şartların değişmesi</h2>
          <p>
            Bu şartları zaman zaman güncelleyebiliriz. Önemli değişiklikler
            sayfa üstündeki &quot;Son güncelleme&quot; tarihiyle belirtilir.
            Güncellemeden sonra siteyi kullanmaya devam etmen, güncel şartları
            kabul ettiğin anlamına gelir.
          </p>

          <h2>10. Uygulanacak hukuk</h2>
          <p>
            İşbu şartlar Türkiye Cumhuriyeti yasalarına tabidir. Doğabilecek
            uyuşmazlıklar için Türk mahkemeleri yetkilidir.
          </p>

          <h2>11. İletişim</h2>
          <p>
            Kullanım şartlarıyla ilgili sorularınız için{" "}
            <Link href="/iletisim">iletişim sayfamızdan</Link> bize
            ulaşabilirsin.
          </p>
        </article>

        <Card className="mt-12 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Bu sayfa hukuki tavsiye yerine geçmez
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                Spesifik bir hukuki durumda profesyonel danışmanlık almak için
                bir avukatla görüşmeni öneririz.
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}
