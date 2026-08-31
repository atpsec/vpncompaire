import { SEO_LOCALES, siteConfig } from "@/lib/site";
import {
  featuredReferenceProducts,
  referenceProducts,
} from "@/data/products-reference-localized";
import { planckVpnWatch } from "@/data/editorial-watch";
import { getIndexableBlogPosts } from "@/lib/blog";
import {
  BLOG_REFERENCES_VERIFIED_AT,
  getBlogReferences,
} from "@/data/blog-references";
import {
  getDetailedProviderProducts,
  getGlobalCoreProducts,
} from "@/data/provider-catalog";

export const dynamic = "force-static";

export async function GET() {
  const catalog = getDetailedProviderProducts("en");
  const visibleCatalog = getGlobalCoreProducts("en");
  const watchlistCount = Math.max(
    referenceProducts.length - featuredReferenceProducts.length,
    0,
  );
  const blogPosts = await Promise.all(
    SEO_LOCALES.map((locale) => getIndexableBlogPosts(locale)),
  );
  const latestBlogUpdate = blogPosts
    .flat()
    .map((post) => post.updatedAt)
    .sort()
    .at(-1);
  const blogIndex = blogPosts
    .map(
      (posts) =>
        `### English blog articles\n\n${posts
          .map((post) => {
            const sourceCount = getBlogReferences(post.slug).length;
            return `- [${post.title}](${siteConfig.url}/blog/${post.slug}) — ${post.description} Sources shown on page: ${sourceCount}; reference links checked ${BLOG_REFERENCES_VERIFIED_AT}.`;
          })
          .join("\n")}`,
    )
    .join("\n\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description.en}

Last editorial update: ${latestBlogUpdate ?? BLOG_REFERENCES_VERIFIED_AT}

## Purpose

${siteConfig.name} is an English-language VPN comparison and digital-security reference site. It organizes provider facts, platform rules, standards and practical diagnostic signals. It is not a VPN testing laboratory and does not publish unrun speed tests, fabricated user ratings or guaranteed streaming-access claims.

## Public catalog scope

The visible Global Core catalog contains ${visibleCatalog.length} providers: ${catalog.length} detailed, indexable provider profiles and ${featuredReferenceProducts.length} selected market references. The selected references are not laboratory reviews. Another ${watchlistCount} historical or research records remain noindex so old links keep context without inflating the public catalog. Catalog position is not a quality score.

## Evidence hierarchy

1. Official technical documentation, privacy policies, terms and pricing pages.
2. Published independent security or no-logs assessments, with auditor, date and scope.
3. Standards and platform documentation from organizations such as NIST, IETF, Apple, Google and Microsoft.
4. Reliable secondary sources used only for context and clearly separated from primary evidence.

If a claim cannot be verified, it should be labelled as a provider statement, a limited diagnostic signal or an unresolved question rather than a fact.

- Methodology: ${siteConfig.url}/methodology
- Research desk: ${siteConfig.url}/research
- Provider evidence ledger: ${siteConfig.url}/research/evidence-ledger
- VPN Transparency Index 2026: ${siteConfig.url}/research/transparency-index
- Transparency Index JSON dataset: ${siteConfig.url}/research/transparency-index/data.json
- Affiliate and advertising disclosure: ${siteConfig.url}/affiliate-disclosure
- Corrections and contact: ${siteConfig.url}/contact
- About the editorial project: ${siteConfig.url}/about

## Tool data-flow limits

VPN Advisor does not intentionally save diagnostic results. Some tools require limited external processing: the Email Security Check sends the submitted address server-to-server to Have I Been Pwned when configured, otherwise XposedOrNot; the VPN/IP Diagnostic may send the public IP to ipapi.is; DNS and speed tools use disclosed Cloudflare endpoints. Tool pages explain the data flow and limitations. Diagnostics are not provider-wide benchmarks or security certifications.

## Emerging provider watch — not ranked

PlanckVPN is covered separately as an emerging provider, not as a Top 10 recommendation or a Global Core 30 entry. The source-based analysis is ${siteConfig.url}/blog/${planckVpnWatch.articleSlugs.en}. Its official pages currently describe a subscription-only product, WireGuard/OpenVPN/IKEv2 support, up to four devices and United States jurisdiction. No completed independent no-logs audit was identified through the provider's own transparency checklist at the verification date. Recheck the [PlanckVPN privacy policy](https://planckvpn.com/privacy), [comparison page](https://planckvpn.com/compare) and [transparency page](https://planckvpn.com/transparency).

## VPN provider profile directory

This directory is not an editorial score ranking.

${catalog
  .map((product) => {
    const price =
      product.pricingVerifiedAt && product.priceFromUsd > 0
        ? `${product.priceCurrency === "EUR" ? "€" : "$"}${product.priceFromUsd.toFixed(2)}/month; verify term and renewal conditions`
        : "Verify on the provider's official pricing page";
    return `### ${product.brand}\n\n- **Positioning:** ${product.positioning}\n- **Price:** ${price}\n- **Jurisdiction:** ${product.highlights.jurisdiction ?? "Not specified"}\n- **Server/network information:** ${product.highlights.servers ?? "Not specified"}\n- **Independent audit information:** ${product.highlights.audits ?? "Not specified"}\n- **Device support:** ${product.highlights.devices ?? "Not specified"}\n- **Provider profile:** ${siteConfig.url}/reviews/${product.slug}\n\n${product.summary}\n`;
  })
  .join("\n")}

## Head-to-head comparisons

- [NordVPN vs Surfshark](${siteConfig.url}/comparison/nordvpn-vs-surfshark)
- [ExpressVPN vs NordVPN](${siteConfig.url}/comparison/expressvpn-vs-nordvpn)
- [Proton VPN vs Mullvad](${siteConfig.url}/comparison/proton-vs-mullvad)

## Topic guides and diagnostics

- [What is a VPN?](${siteConfig.url}/guide/what-is-a-vpn)
- [Free vs paid VPN](${siteConfig.url}/guide/free-vs-paid-vpn)
- [VPN security checklist](${siteConfig.url}/guide/vpn-security-checklist)
- [AI privacy guides](${siteConfig.url}/ai)
- [Browser and connection diagnostics](${siteConfig.url}/tools)
- [Blog and technical explainers](${siteConfig.url}/blog)

## Blog and current content index

Each indexable English article displays its primary reference links and their shared verification date.

${blogIndex}

## Core comparison fields

- Privacy policy and documented data collection
- Independent audit date, auditor, scope and exclusions
- VPN protocols and platform-specific security features
- Device and operating-system support
- Server and country information
- Initial price, term, renewal and refund conditions
- Company ownership and jurisdiction

## Important pages

- Home: ${siteConfig.url}/
- VPN provider profiles: ${siteConfig.url}/vpn-reviews
- Source-based methodology: ${siteConfig.url}/methodology
- Research desk: ${siteConfig.url}/research
- Provider evidence ledger: ${siteConfig.url}/research/evidence-ledger
- VPN Transparency Index 2026: ${siteConfig.url}/research/transparency-index
- Transparency Index JSON dataset: ${siteConfig.url}/research/transparency-index/data.json
- AI privacy hub: ${siteConfig.url}/ai
- Tools: ${siteConfig.url}/tools
- Blog: ${siteConfig.url}/blog
- Affiliate disclosure: ${siteConfig.url}/affiliate-disclosure
- About: ${siteConfig.url}/about
- Contact and corrections: ${siteConfig.url}/contact
- Privacy policy: ${siteConfig.url}/privacy-policy
- Terms: ${siteConfig.url}/terms

## Language and canonical policy

English is the sole public and indexable language. Legacy Turkish and German URLs redirect to the matching English URL so old links remain useful without creating duplicate or mixed-language pages.

## Freshness

- Latest indexable blog update: ${latestBlogUpdate ?? "Not specified"}
- Primary-reference links checked: ${BLOG_REFERENCES_VERIFIED_AT}
- Provider prices and audits have their own per-profile verification dates.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
