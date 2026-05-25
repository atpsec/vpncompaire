import { siteConfig } from "@/lib/site";
import { rankedProducts } from "@/data/products";

export const dynamic = "force-static";

export function GET() {
  const list = rankedProducts();

  const body = `# ${siteConfig.name}

> ${siteConfig.description.tr}

## Hakkımızda

${siteConfig.name}, bağımsız test metodolojisi ile VPN'leri karşılaştıran Türkçe bir inceleme sitesidir. Her ürün şu altı kritere göre değerlendirilir: gizlilik politikası ve yargı yetkisi, bağımsız denetimler, hız, streaming uyumluluğu, fiyat şeffaflığı, kullanım kolaylığı.

Editoryal bağımsızlık ilkemiz: Sayfada affiliate (ortaklık) bağlantıları bulunur ve siteyi finanse eder. Affiliate komisyonu sıralamayı, içeriği veya değerlendirmeleri etkilemez. Affiliate programı bulunmayan seçenekler (örn. Mullvad) da sıralamada yer alır — tarafsızlık ilkemize bağlıyız.

## 2026'nın En İyi VPN'leri

${list
  .map(
    (p) =>
      `### ${p.rank}. ${p.brand} — ${p.positioning}\n\n- **Puan:** ${p.score}/10\n- **Başlangıç fiyatı:** $${p.priceFromUsd.toFixed(2)}/ay\n- **Yargı yetkisi:** ${p.highlights.jurisdiction ?? "Belirtilmemiş"}\n- **Sunucular:** ${p.highlights.servers ?? "Belirtilmemiş"}\n- **Bağımsız denetim:** ${p.highlights.audits ?? "Belirtilmemiş"}\n- **Affiliate ilişkisi:** ${p.hasAffiliate ? "Var" : "Yok (tarafsızlık göstergesi)"}\n- **İnceleme:** ${siteConfig.url}/inceleme/${p.slug}\n\n${p.summary}\n`,
  )
  .join("\n")}

## Karşılaştırma Sayfaları

- [NordVPN vs Surfshark](${siteConfig.url}/karsilastir/nordvpn-vs-surfshark) — Güç ile bütçenin karşılaşması
- [ExpressVPN vs NordVPN](${siteConfig.url}/karsilastir/expressvpn-vs-nordvpn) — İki premium devin yan yana analizi
- [Proton VPN vs Mullvad](${siteConfig.url}/karsilastir/proton-vs-mullvad) — Gizlilik puristleri için saf karşılaştırma

## Kullanım Senaryosuna Göre

- [Gizlilik için en iyi VPN](${siteConfig.url}/en-iyi/gizlilik)
- [Streaming için en iyi VPN](${siteConfig.url}/en-iyi/streaming)
- [Oyun için en iyi VPN](${siteConfig.url}/en-iyi/oyun)
- [Seyahat için en iyi VPN](${siteConfig.url}/en-iyi/seyahat)
- [Türkiye için en iyi VPN](${siteConfig.url}/en-iyi/turkiye)
- [Yurt dışındaki Türkler için VPN](${siteConfig.url}/en-iyi/yurt-disindaki-turkler)

## Cihaza Göre

- [Android için VPN](${siteConfig.url}/cihazlar/android) — Play Store uygulamaları, kill switch, split tunneling
- [iPhone için VPN](${siteConfig.url}/cihazlar/iphone) — App Store, iCloud Private Relay, IKEv2 manuel
- [iPad için VPN](${siteConfig.url}/cihazlar/ipad) — Stage Manager uyumluluğu, streaming, router seçenekleri
- [Smart TV için VPN](${siteConfig.url}/cihazlar/smart-tv) — Samsung Tizen, LG webOS, Android TV, Apple TV (tvOS 17+), router VPN, Smart DNS

## Rehberler

- [VPN nedir? 5 dakikalık başlangıç rehberi](${siteConfig.url}/rehber/vpn-nedir)
- [Türkiye'de VPN yasal mı?](${siteConfig.url}/rehber/turkiye-de-vpn-yasal-mi) — Hukuki rehber
- [Ücretsiz vs Ücretli VPN](${siteConfig.url}/rehber/ucretsiz-vs-ucretli-vpn) — Karar matrisi
- [VPN güvenlik kontrol listesi](${siteConfig.url}/rehber/vpn-guvenlik-kontrol-listesi) — 12 madde

## Önemli Sayfalar

- Ana sayfa: ${siteConfig.url}/
- En İyi VPN'ler: ${siteConfig.url}/en-iyi-vpn
- Test Metodolojisi: ${siteConfig.url}/metodoloji
- Reklam Açıklaması: ${siteConfig.url}/reklam-aciklamasi
- Hakkımızda: ${siteConfig.url}/hakkimizda
- İletişim: ${siteConfig.url}/iletisim
- Gizlilik Politikası: ${siteConfig.url}/gizlilik
- Kullanım Şartları: ${siteConfig.url}/sartlar
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
