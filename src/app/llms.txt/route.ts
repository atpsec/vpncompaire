import { siteConfig } from "@/lib/site";
import { rankedProducts } from "@/data/products";
import { referenceProducts } from "@/data/products-reference-localized";

export const dynamic = "force-static";

export function GET() {
  const core = rankedProducts();
  const catalog = [...core, ...referenceProducts];

  const body = `# ${siteConfig.name}

> ${siteConfig.description.tr}

## Site amacı

${siteConfig.name}, VPN teknolojisi ve VPN sağlayıcıları hakkında kaynak temelli bilgi sunan bir karşılaştırma ve rehber sitesidir. Site bir test laboratuvarı değildir; doğrulanmamış hız, streaming veya kullanıcı puanı yayınlamaz. Sağlayıcıların resmi teknik belgeleri, gizlilik politikaları, hizmet şartları, fiyatlandırma sayfaları, bağımsız denetimler ve güvenilir standart/platform belgeleri ortak bir çerçevede düzenlenir.

## Kapsam

VPN Advisor dizininde toplam ${catalog.length} VPN sağlayıcı profili bulunur. İlk grup daha ayrıntılı yapılandırılmış veri içerirken, genişletilmiş dizindeki sağlayıcılar pazar kapsamını artırmak için kaynak-temelli referans profili olarak sunulur. Bu sayı bir kalite sıralaması değildir.

## Kaynak ve doğrulama yaklaşımı

Öncelik sırası: (1) resmi teknik dokümantasyon ve politikalar, (2) bağımsız güvenlik/no-logs denetimleri, (3) NIST/IETF/Apple/Google/Microsoft gibi standart veya platform belgeleri, (4) bağlam sağlayan güvenilir ikincil kaynaklar. Bir bilgi bağımsız olarak doğrulanamıyorsa kesin gerçek gibi sunulmamalıdır.

Metodoloji: ${siteConfig.url}/metodoloji
Reklam ve gelir açıklaması: ${siteConfig.url}/reklam-aciklamasi
Hakkımızda: ${siteConfig.url}/hakkimizda

## VPN sağlayıcı profilleri

Aşağıdaki liste editoryal puan sıralaması değildir; sitede karşılaştırılan sağlayıcı profillerine erişim dizinidir.

${catalog
  .map((p) => {
    const price = p.priceFromUsd > 0 ? `$${p.priceFromUsd.toFixed(2)}/ay` : "Resmi fiyat sayfasından doğrulanmalı";
    return `### ${p.brand}\n\n- **Konumlandırma:** ${p.positioning}\n- **Fiyat:** ${price}\n- **Yargı yetkisi:** ${p.highlights.jurisdiction ?? "Belirtilmemiş"}\n- **Sunucu/ağ bilgisi:** ${p.highlights.servers ?? "Belirtilmemiş"}\n- **Bağımsız denetim bilgisi:** ${p.highlights.audits ?? "Belirtilmemiş"}\n- **Cihaz desteği:** ${p.highlights.devices ?? "Belirtilmemiş"}\n- **Sağlayıcı profili:** ${siteConfig.url}/inceleme/${p.slug}\n\n${p.summary}\n`;
  })
  .join("\n")}

## Karşılaştırmalar

- [NordVPN vs Surfshark](${siteConfig.url}/karsilastir/nordvpn-vs-surfshark)
- [ExpressVPN vs NordVPN](${siteConfig.url}/karsilastir/expressvpn-vs-nordvpn)
- [Proton VPN vs Mullvad](${siteConfig.url}/karsilastir/proton-vs-mullvad)

## Konu rehberleri

- [VPN nedir?](${siteConfig.url}/rehber/vpn-nedir)
- [Türkiye'de VPN yasal mı?](${siteConfig.url}/rehber/turkiye-de-vpn-yasal-mi)
- [Ücretsiz vs ücretli VPN](${siteConfig.url}/rehber/ucretsiz-vs-ucretli-vpn)
- [VPN güvenlik kontrol listesi](${siteConfig.url}/rehber/vpn-guvenlik-kontrol-listesi)
- [Blog ve güncel teknik açıklamalar](${siteConfig.url}/blog)

## Temel karşılaştırma alanları

- Gizlilik politikası ve veri toplama kapsamı
- Bağımsız no-logs / güvenlik denetimleri
- VPN protokolleri ve güvenlik özellikleri
- Platform ve cihaz desteği
- Sunucu / ülke bilgisi
- Fiyat, yenileme ve para iadesi koşulları
- Şirket ve yargı yetkisi bilgileri

## Önemli sayfalar

- Ana sayfa: ${siteConfig.url}/
- VPN sağlayıcı karşılaştırmaları: ${siteConfig.url}/en-iyi-vpn
- Kaynak temelli metodoloji: ${siteConfig.url}/metodoloji
- Blog: ${siteConfig.url}/blog
- Reklam Açıklaması: ${siteConfig.url}/reklam-aciklamasi
- Hakkımızda: ${siteConfig.url}/hakkimizda
- İletişim: ${siteConfig.url}/iletisim
- Gizlilik Politikası: ${siteConfig.url}/gizlilik
- Kullanım Şartları: ${siteConfig.url}/sartlar

## Dil sürümleri

Türkçe ana sürümdür. İngilizce içerik /en, Almanca içerik /de altında sunulur. Sayfalarda canonical ve hreflang ilişkileri içerik gerçekten mevcut olduğunda yayınlanır.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
