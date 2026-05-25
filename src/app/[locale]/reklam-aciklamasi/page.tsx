import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Reklam Açıklaması (Affiliate Disclosure)",
  description:
    "vpncompaire affiliate (ortaklık) ilişkileri, gelir modelimiz ve editoryal bağımsızlığımız hakkında şeffaf açıklama.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container size="md" className="py-16 sm:py-24">
      <article className="prose prose-stone max-w-none">
        <h1 className="text-4xl font-bold tracking-tight text-ink-strong">
          Reklam Açıklaması
        </h1>
        <p className="mt-4 text-ink-muted">
          Son güncelleme: Mayıs 2026
        </p>

        <h2 className="mt-10 text-2xl font-semibold text-ink-strong">
          Affiliate (ortaklık) ilişkileri
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          vpncompaire, bu sayfada yer alan bazı VPN sağlayıcıları ile affiliate
          (ortaklık) ilişkisine sahiptir. Bu, sayfamızdaki bir bağlantı
          aracılığıyla bir VPN aboneliği satın aldığında bizim komisyon
          kazandığımız anlamına gelir. Bu komisyon, ödediğin fiyatı{" "}
          <strong>etkilemez</strong>.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-ink-strong">
          Editoryal bağımsızlık
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          Affiliate komisyonu, sıralamamızı, içeriğimizi veya değerlendirme
          puanlarımızı etkilemez. Sitedeki her VPN aynı altı objektif kritere
          göre değerlendirilir: gizlilik politikası ve yargı yetkisi, bağımsız
          denetimler, hız, streaming uyumluluğu, fiyat şeffaflığı ve kullanım
          kolaylığı.
        </p>
        <p className="mt-3 text-ink leading-relaxed">
          Şeffaflık için, affiliate programı bulunmayan VPN sağlayıcılarını
          (örn. Mullvad) da sıralamamıza dahil ediyoruz — bunu en iyi seçim
          olduklarında yapıyoruz, finansal çıkarımız olmadığı için değil.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-ink-strong">
          Ortaklık ilişkimiz olan markalar
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          Şu anda şu markalarla affiliate ilişkimiz bulunuyor: NordVPN,
          Surfshark, ExpressVPN, Proton VPN, Private Internet Access (PIA),
          CyberGhost. Mullvad ve IVPN ile affiliate ilişkimiz yoktur.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-ink-strong">
          Yasal dayanak
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          Bu açıklama, ABD Federal Ticaret Komisyonu (FTC) Endorsement
          Guides'a ve Türkiye Cumhuriyeti Tüketicinin Korunması Hakkında Kanun
          ile Reklam Kurulu yönetmeliklerine uygun olarak hazırlanmıştır. Tüm
          affiliate bağlantıları{" "}
          <code className="rounded bg-surface-muted px-1 py-0.5 text-sm">
            rel=&quot;sponsored nofollow&quot;
          </code>{" "}
          özniteliği ile işaretlenir.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-ink-strong">
          Sorularınız için
        </h2>
        <p className="mt-3 text-ink leading-relaxed">
          Şeffaflık veya editoryal politikamızla ilgili sorularınız olursa,
          iletişim sayfamızdan bize ulaşabilirsiniz.
        </p>
      </article>
    </Container>
  );
}
