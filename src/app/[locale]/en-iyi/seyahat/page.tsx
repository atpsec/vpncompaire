import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Plane } from "lucide-react";
import { UseCasePage } from "@/components/use-case/use-case-page";

export const metadata: Metadata = {
  title: "Seyahat İçin En İyi VPN'ler (2026)",
  description:
    "Halka açık Wi-Fi güvenliği, kısıtlayıcı ülkelerde erişim, evdeki içeriklere uzaktan ulaşma — seyahat eden için en iyi VPN seçimleri.",
};

type Props = { params: Promise<{ locale: string }> };

const picks = [
  {
    slug: "expressvpn",
    bestFor: "Geniş ülke kapsamı (105 ülke)",
    why: "105 ülkede sunucu — gittiğin neredeyse her yerden hem evdeki içeriğe ulaşma hem de yerel ağdan güvenli çıkış imkanı. Lightway protokolünün hızlı bağlantı kurulumu, sık ağ değiştiren seyahatlerde pratik.",
  },
  {
    slug: "nordvpn",
    bestFor: "Otomatik koruma + obfuscation",
    why: "Auto-Connect özelliği güvensiz Wi-Fi tespit ettiğinde otomatik aktive oluyor. Obfuscation sunucuları, kısıtlayıcı ağlarda VPN trafiğini gizliyor — özellikle Çin, BAE, İran gibi VPN engellemesi yapan ülkelerde.",
  },
  {
    slug: "surfshark",
    bestFor: "Sınırsız cihaz + Camouflage Mode",
    why: "Telefon, tablet, dizüstü — seyahatte taşıdığın tüm cihazları aynı abonelikten koruyabilirsin. Camouflage Mode (DPI bypass) Türkiye dahil VPN tespiti yapan ülkelerde işe yarıyor.",
  },
] as const;

const considerations = [
  {
    title: "Halka açık Wi-Fi güvenliği",
    body: "Otel, kafe, havaalanı Wi-Fi'leri genelde şifresiz veya zayıf şifreli. Bu ağlardaki diğer kullanıcılar trafiğini görebilir (paket sniffing). VPN, bu ağda dahi trafiğini şifreleyerek pasif saldırılara karşı korur.",
  },
  {
    title: "Kısıtlayıcı ülkelerde VPN engellemesi",
    body: "Çin (Great Firewall), İran, Birleşik Arap Emirlikleri, Belarus, Türkmenistan gibi ülkelerde VPN trafiği aktif olarak tespit ve engellenir. Obfuscation/Camouflage özellikleri olan VPN'ler bu engellemelere karşı dirençli.",
  },
  {
    title: "Evdeki içeriklere uzaktan erişim",
    body: "Yurt dışındayken Türkiye'ye dönmek için TR sunucusu, BluTV/Exxen/Netflix TR için kritik. Surfshark TR sunucusu sunuyor; çoğu rakip sunmuyor.",
  },
  {
    title: "Kurulum öncesinde indirme",
    body: "Bazı ülkeler VPN sağlayıcılarının web sitelerini engelliyor — yani uygulamayı oradayken indiremeyebilirsin. Seyahat öncesi tüm cihazlarına VPN'i kur.",
  },
];

const faqs = [
  {
    q: "Hangi ülkelerde VPN kullanmak yasak?",
    a: "Çin, İran, Türkmenistan, Belarus ve Birleşik Arap Emirlikleri'nde VPN kullanımı sıkı şekilde düzenleniyor — bazılarında devlet onaylı VPN dışında yasak. Türkiye, AB, ABD, çoğu Asya ve Afrika ülkesinde VPN kullanımı yasal.",
  },
  {
    q: "Otelde VPN gerçekten gerekli mi?",
    a: "Evet. Otel Wi-Fi'leri genelde paylaşımlı, şifresiz veya zayıf şifreli. Aynı ağdaki diğer misafirler trafiğini görebilir. Bankacılık veya hassas iletişim yapacaksan VPN minimum güvenlik gereksinimi.",
  },
  {
    q: "Seyahatte VPN olmadan hangi riskler var?",
    a: "Paket sniffing (trafik dinleme), man-in-the-middle saldırıları (sahte Wi-Fi hotspot'ları), oturum çalma (cookie hijacking) ve DNS poisoning. VPN bu saldırı yüzeylerinin tümünü ortadan kaldırır.",
  },
  {
    q: "Çin'e gidiyorum, hangi VPN'i kullanmalıyım?",
    a: "ExpressVPN ve NordVPN, Great Firewall'a karşı en istikrarlı sağlayıcılardan. Çin'e gitmeden önce uygulamayı indir — Çin'de sağlayıcı web siteleri engelli. Obfuscation özelliği aktif olmalı.",
  },
];

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <UseCasePage
      slug="seyahat"
      title="Seyahat İçin En İyi VPN&apos;ler"
      tagline="Halka açık Wi-Fi güvenliği, kısıtlayıcı ülkelerde erişim ve evdeki içeriklere uzaktan ulaşma."
      summary="Seyahatte VPN dört şey için kritik: halka açık Wi-Fi'de trafik şifreleme, kısıtlayıcı ülkelerde obfuscation, evdeki içeriğe (özellikle Türk medyası) uzaktan erişim ve sık ağ değişiminde otomatik koruma. ExpressVPN kapsam, NordVPN obfuscation, Surfshark cihaz sayısı ile öne çıkıyor."
      Icon={Plane}
      badgeLabel="Seyahat"
      picks={picks}
      faqs={faqs}
      considerations={considerations}
      relatedLinks={[
        { label: "Yurt dışı Türkler için", href: "/en-iyi/yurt-disindaki-turkler" },
        { label: "Türkiye için", href: "/en-iyi/turkiye" },
        { label: "Gizlilik için", href: "/en-iyi/gizlilik" },
      ]}
    />
  );
}
