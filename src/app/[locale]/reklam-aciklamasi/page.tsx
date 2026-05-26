import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Tag, ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reklam Açıklaması (Affiliate Disclosure)",
  description:
    "vpncompaire affiliate (ortaklık) ilişkileri, gelir modelimiz ve editoryal bağımsızlığımız hakkında şeffaf açıklama. FTC ve Türkiye Reklam Kurulu uyumlu.",
  alternates: { canonical: absoluteUrl("/reklam-aciklamasi") },
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
          { name: "Reklam Açıklaması", path: "/reklam-aciklamasi" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Reklam Açıklaması</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Tag className="size-3" /> Affiliate Disclosure
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Reklam Açıklaması
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            Son güncelleme: Mayıs 2026
          </p>
        </header>

        <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Net açıklama
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                {siteConfig.name}, incelediği bazı VPN sağlayıcılarıyla{" "}
                <strong>affiliate (ortaklık) ilişkisine sahiptir</strong>.
                Sayfadaki bağlantılardan birini takip edip satın alırsan,
                bize <strong>komisyon</strong> ödenebilir. Bu komisyon
                senin ödediğin fiyatı değiştirmez ve kullanım deneyimini
                etkilemez.
              </p>
            </div>
          </div>
        </Card>

        <article className="mt-10 prose prose-stone max-w-none">
          <h2>Gelir modelimiz nasıl çalışıyor?</h2>
          <p>
            {siteConfig.name} reklam göstermez ve kullanıcı verisini
            satmaz. Tek gelir kaynağımız, sayfadaki bağlantılardan birini
            takip ederek bir VPN aboneliği satın alan kullanıcılar için
            sağlayıcı tarafından bize ödenen komisyondur. Bu &quot;cost-per-action&quot;
            modelidir: yalnızca senin için bir abonelik başlatılırsa
            komisyon oluşur, sadece bağlantıya tıkladığın için değil.
          </p>

          <h2>Editoryal bağımsızlık</h2>
          <p>
            Affiliate komisyonu;{" "}
            <strong>
              sıralamamızı, içeriğimizi, değerlendirme puanlarımızı veya
              eleştirilerimizi etkilemez
            </strong>
            . Bu bağımsızlığı korumak için:
          </p>
          <ul>
            <li>
              Editoryal puanlama ve affiliate yönetimi sitemizde ayrı
              kararlardır. Bir sağlayıcı yüksek komisyon teklif ettiği
              için sıralaması yükseltilmez.
            </li>
            <li>
              Affiliate programı bulunmayan sağlayıcıları (örn. Mullvad)
              da sıralamamıza dahil ediyoruz; başka bir sağlayıcı yerine
              daha uygun olduklarında önerebiliriz.
            </li>
            <li>
              Sağlayıcıdan içerik kontrolü veya yayın öncesi onay talep
              etmiyoruz. Hiçbir VPN sağlayıcısı yayınlanmadan önce
              içeriğimizi göremez.
            </li>
            <li>
              Bir sağlayıcı bizden yanlış/yanıltıcı içerik talep ederse
              programı sonlandırırız.
            </li>
          </ul>

          <h2>Hangi markalarla affiliate ilişkimiz var?</h2>
          <p>
            Bu sayfa düzenli olarak güncellenir. Mevcut durum:
          </p>
          <ul>
            <li>
              <strong>Affiliate ilişkisi olan:</strong> NordVPN, Surfshark,
              ExpressVPN, Proton VPN, Private Internet Access (PIA),
              CyberGhost, IPVanish, Windscribe, TunnelBear
            </li>
            <li>
              <strong>Affiliate ilişkisi olmayan:</strong> Mullvad
              (affiliate programı yok — yine de gizlilik odaklı kullanıcılar
              için iyi bir seçenek olduğunu düşündüğümüzde öneriyoruz)
            </li>
          </ul>
          <p>
            Bir markayla ilişkimiz değişirse bu liste güncellenir.
          </p>

          <h2>Bağlantıları nasıl tanıyabilirsin?</h2>
          <p>
            Sitemizdeki tüm affiliate bağlantıları:
          </p>
          <ul>
            <li>
              <code>rel=&quot;sponsored nofollow&quot;</code> özniteliği
              ile işaretlenir (arama motorlarına şeffaflık için).
            </li>
            <li>
              Sayfadaki &quot;Fırsata git&quot;, &quot;Hemen dene&quot;,
              &quot;Siteyi ziyaret et&quot; gibi CTA butonları affiliate
              bağlantıyı içerir.
            </li>
            <li>
              Yakınında veya sayfanın altında bir açıklama notu (örneğin
              &quot;Reklam açıklaması&quot;) bulunur.
            </li>
            <li>
              <code>/go/[slug]</code> formatlı bir yönlendirme URL&apos;si
              üzerinden çalışır. Bu, hangi bağlantıya tıklandığını
              izlememizi sağlar ama kişisel veri toplamaz.
            </li>
          </ul>

          <h2>İçerik nasıl ortaya çıkıyor?</h2>
          <p>
            İncelemelerimiz aşağıdaki kaynaklara dayalıdır:
          </p>
          <ul>
            <li>
              <strong>Resmi sağlayıcı verisi:</strong> Sağlayıcının kendi
              web sitesi, gizlilik politikası, fiyat sayfası — &quot;Son
              kontrol&quot; tarihiyle birlikte.
            </li>
            <li>
              <strong>Üçüncü taraf denetim raporları:</strong> Deloitte,
              Cure53, Securitum gibi tanınmış güvenlik firmalarının
              kamuya açık raporları.
            </li>
            <li>
              <strong>Kendi testlerimiz:</strong> Hız, streaming
              uyumluluğu, kill switch davranışı gibi laboratuvar
              testleri. Metodolojimiz{" "}
              <Link href="/metodoloji">/metodoloji</Link> sayfasında
              açıklanmıştır.
            </li>
            <li>
              <strong>Açık kaynak kod incelemesi:</strong> İstemcileri
              açık kaynak olan sağlayıcılar için GitHub repolarının
              değerlendirilmesi.
            </li>
          </ul>
          <p>
            Bilgi tarihinden sonra değişmiş olabilir; sağlayıcının resmi
            sitesini her zaman doğrulamanı öneririz.
          </p>

          <h2>Yasal dayanak</h2>
          <p>
            Bu açıklama aşağıdaki düzenlemelere uygun olarak hazırlanmıştır:
          </p>
          <ul>
            <li>
              <strong>FTC Endorsement Guides (ABD)</strong>: Affiliate
              ilişkisinin görünür ve net açıklanması.
            </li>
            <li>
              <strong>
                Türkiye Cumhuriyeti Tüketicinin Korunması Hakkında Kanun
                (6502 sayılı)
              </strong>{" "}
              ve <strong>Ticari Reklam ve Haksız Ticari Uygulamalar
              Yönetmeliği</strong>: Reklam ilişkilerinin tüketiciye
              gösterilmesi.
            </li>
            <li>
              <strong>EU Digital Services Act</strong>: Online platformlar
              için şeffaflık yükümlülükleri.
            </li>
          </ul>

          <h2>Soruların ya da geri bildirim için</h2>
          <p>
            Şeffaflık politikamız, içerik yöntemimiz veya affiliate
            ilişkilerimizle ilgili soruların varsa{" "}
            <Link href="/iletisim">iletişim sayfamızdan</Link> bize
            ulaşabilirsin.
          </p>
        </article>

        <Card className="mt-12 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Affiliate yokmuş gibi davransak ne olurdu?
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                Aynı önerileri yapardık. Çünkü sıralamamız affiliate
                komisyon oranına göre değil, bağımsız test ve doğrulanabilir
                kanıta göre belirlenir.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-ink-strong">
                Hatırlatma
              </p>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                Bu sayfa bir{" "}
                <Link
                  href="/yasal-uyari"
                  className="text-brand-700 underline"
                >
                  yasal uyarı
                </Link>{" "}
                değildir; içerik garantisi vermez. Sağlayıcı verileri
                değişebilir; satın alma kararı vermeden önce ilgili VPN
                sağlayıcısının resmi sayfasından güncel bilgiyi
                doğrulamanı öneririz.
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}
