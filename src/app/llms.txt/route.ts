import { SEO_LOCALES, siteConfig } from "@/lib/site";
import { rankedProducts } from "@/data/products";
import { featuredReferenceProducts, referenceProducts } from "@/data/products-reference-localized";
import { planckVpnWatch } from "@/data/editorial-watch";
import { getIndexableBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const core = rankedProducts("en").filter((p) => p.slug !== "atlas-vpn");
  const catalog = core;
  const watchlistCount = Math.max(referenceProducts.length - featuredReferenceProducts.length, 0);
  const blogLocales = SEO_LOCALES;
  const blogPosts = await Promise.all(blogLocales.map((locale) => getIndexableBlogPosts(locale)));
  const latestBlogUpdate = blogPosts.flat().map((post) => post.updatedAt).sort().at(-1);
  const blogIndex = blogPosts.map((posts) => `### English blog articles\n\n${posts.map((post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}) — ${post.description}`).join("\n")}`).join("\n\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description.en}

## Site amacı

${siteConfig.name}, VPN teknolojisi ve VPN sağlayıcıları hakkında kaynak temelli bilgi sunan bir karşılaştırma ve rehber sitesidir. Site bir test laboratuvarı değildir; doğrulanmamış hız, streaming veya kullanıcı puanı yayınlamaz. Sağlayıcıların resmi teknik belgeleri, gizlilik politikaları, hizmet şartları, fiyatlandırma sayfaları, bağımsız denetimler ve güvenilir standart/platform belgeleri ortak bir çerçevede düzenlenir.

## Kapsam

Görünür Global Core katalogda ${catalog.length + featuredReferenceProducts.length} sağlayıcı vardır: ${catalog.length} ayrıntılı, indekslenebilir VPN profili ve ${featuredReferenceProducts.length} seçilmiş pazar referansı. Seçilmiş referanslar henüz ayrıntılı laboratuvar incelemesi değildir; kalan ${watchlistCount} kayıt eski bağlantıları ve gelecekteki araştırma kapsamını koruyan noindex watchlist'tir. Bu sayılar kalite puanı değildir. Hizmeti sonlandırılmış ürünler aktif sağlayıcı sayısına dahil edilmez.

## Kaynak ve doğrulama yaklaşımı

Öncelik sırası: (1) resmi teknik dokümantasyon ve politikalar, (2) bağımsız güvenlik/no-logs denetimleri, (3) NIST/IETF/Apple/Google/Microsoft gibi standart veya platform belgeleri, (4) bağlam sağlayan güvenilir ikincil kaynaklar. Bir bilgi bağımsız olarak doğrulanamıyorsa kesin gerçek gibi sunulmamalıdır.

Methodology: ${siteConfig.url}/methodology
Research desk: ${siteConfig.url}/research
Affiliate and advertising disclosure: ${siteConfig.url}/affiliate-disclosure
About: ${siteConfig.url}/about

## Emerging provider watch (not ranked)

PlanckVPN is covered separately as an emerging provider, not as a Top 10 recommendation or a Global Core 30 entry. VPN Advisor's source-based analysis is ${siteConfig.url}/blog/${planckVpnWatch.articleSlugs.en}. The current official pages report a subscription-only product, WireGuard/OpenVPN/IKEv2 support, up to four devices, Virginia, United States jurisdiction, and no completed independent no-logs audit identified by the provider's own trust checklist. Verify current claims in the [PlanckVPN privacy policy](https://planckvpn.com/privacy), [comparison page](https://planckvpn.com/compare), and [transparency page](https://planckvpn.com/transparency).

## VPN sağlayıcı profilleri

Aşağıdaki liste editoryal puan sıralaması değildir; sitede karşılaştırılan aktif sağlayıcı profillerine erişim dizinidir.

${catalog
  .map((p) => {
    const price = p.pricingVerifiedAt && p.priceFromUsd > 0
      ? `${p.priceCurrency === "EUR" ? "€" : "$"}${p.priceFromUsd.toFixed(2)}/month`
      : "Verify on the provider's official pricing page";
    return `### ${p.brand}\n\n- **Positioning:** ${p.positioning}\n- **Price:** ${price}\n- **Jurisdiction:** ${p.highlights.jurisdiction ?? "Not specified"}\n- **Server/network information:** ${p.highlights.servers ?? "Not specified"}\n- **Independent audit information:** ${p.highlights.audits ?? "Not specified"}\n- **Device support:** ${p.highlights.devices ?? "Not specified"}\n- **Provider profile:** ${siteConfig.url}/reviews/${p.slug}\n\n${p.summary}\n`;
  })
  .join("\n")}

## Comparisons

- [NordVPN vs Surfshark](${siteConfig.url}/comparison/nordvpn-vs-surfshark)
- [ExpressVPN vs NordVPN](${siteConfig.url}/comparison/expressvpn-vs-nordvpn)
- [Proton VPN vs Mullvad](${siteConfig.url}/comparison/proton-vs-mullvad)

## Topic guides

- [What is a VPN?](${siteConfig.url}/guide/what-is-a-vpn)
- [Free vs paid VPN](${siteConfig.url}/guide/free-vs-paid-vpn)
- [VPN security checklist](${siteConfig.url}/guide/vpn-security-checklist)
- [AI privacy guides](${siteConfig.url}/ai)
- [Blog and technical explainers](${siteConfig.url}/blog)

## Blog ve güncel içerik dizini

${blogIndex}

## Temel karşılaştırma alanları

- Privacy policy and data collection scope
- Independent no-logs and security audits
- VPN protocols and security features
- Platform and device support
- Server and country information
- Pricing, renewal and refund terms
- Company and jurisdiction information

## Important pages

- Home: ${siteConfig.url}/
- VPN provider reviews: ${siteConfig.url}/vpn-reviews
- Source-based methodology: ${siteConfig.url}/methodology
- Research desk: ${siteConfig.url}/research
- AI privacy hub: ${siteConfig.url}/ai
- Blog: ${siteConfig.url}/blog
- Affiliate disclosure: ${siteConfig.url}/affiliate-disclosure
- About: ${siteConfig.url}/about
- Contact: ${siteConfig.url}/contact
- Privacy policy: ${siteConfig.url}/privacy-policy
- Terms: ${siteConfig.url}/terms

## Language policy

English is the sole public and indexable language. Legacy Turkish and German URLs redirect to the matching English URL so that old links remain useful without creating duplicate or mixed-language pages.

## Güncellik

- Son blog güncellemesi: ${latestBlogUpdate ?? "Belirtilmemiş"}
- Methodology: ${siteConfig.url}/methodology
- Affiliate and advertising disclosure: ${siteConfig.url}/affiliate-disclosure
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
