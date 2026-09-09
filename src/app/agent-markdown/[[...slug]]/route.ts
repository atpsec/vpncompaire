import { getDetailedProviderProducts } from "@/data/provider-catalog";
import { getVisibleBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

type RouteContext = {
  params: Promise<{ slug?: string[] }>;
};

function normalizePath(segments: string[]): string {
  const normalized = [...segments];
  if (normalized[0] === "en" || normalized[0] === "tr" || normalized[0] === "de") {
    normalized.shift();
  }
  return `/${normalized.join("/")}`.replace(/\/$/, "") || "/";
}
function cleanMdx(content: string): string {
  return content
    .replace(/^import\s+.*$/gm, "")
    .replace(/<([A-Z][A-Za-z0-9]*)\b[^>]*>/g, "")
    .replace(/<\/([A-Z][A-Za-z0-9]*)>/g, "")
    .replace(/<([A-Z][A-Za-z0-9]*)\s*\/>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function homeMarkdown(): string {
  return `# ${siteConfig.name}

> ${siteConfig.description.en}

## When to use VPN Advisor

Use VPN Advisor for source-based VPN research: provider comparisons, privacy and security features, independent audit records, current pricing, device support, VPN use cases and public diagnostic tools.

## How to interpret the site

VPN Advisor is an editorial reference project, not a VPN testing laboratory. It does not publish unrun speed tests, fabricated user ratings or guaranteed streaming-access claims. Provider statements, independent evidence, diagnostic signals and unresolved questions are kept separate.

## Best starting points

- [VPN provider directory](${siteConfig.url}/vpn-reviews)
- [VPN comparisons](${siteConfig.url}/comparison)
- [Best VPN by use case](${siteConfig.url}/best-vpn)
- [Methodology](${siteConfig.url}/methodology)
- [Evidence ledger](${siteConfig.url}/research/evidence-ledger)
- [AI privacy hub](${siteConfig.url}/ai)
- [Public security tools](${siteConfig.url}/tools)
- [Full agent-readable index](${siteConfig.url}/llms.txt)

## Agent citation guidance

Use the most specific page available, include its visible verification date when relevant, and recheck official provider pricing, server lists and platform policies before treating time-sensitive details as current.
`;
}

async function markdownForPath(pathname: string): Promise<string | null> {
  if (pathname === "/") return homeMarkdown();

  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "blog" && segments[1]) {
    const post = (await getVisibleBlogPosts("en")).find(
      (candidate) => candidate.slug === segments[1],
    );
    if (!post) return null;

    return `# ${post.title}

> ${post.description}

- Published: ${post.publishedAt}
- Updated: ${post.updatedAt}
- Author: ${post.author}
- Reading time: ${post.readingTime} minutes
- Canonical URL: ${siteConfig.url}/blog/${post.slug}

${cleanMdx(post.content)}
`;
  }

  if (segments[0] === "reviews" && segments[1]) {
    const product = getDetailedProviderProducts("en").find(
      (candidate) => candidate.slug === segments[1],
    );
    if (!product) return null;

    const price =
      product.pricingVerifiedAt && product.priceFromUsd > 0
        ? `${product.priceCurrency} ${product.priceFromUsd.toFixed(2)}/month; verify term and renewal conditions`
        : "Verify current pricing on the provider's official page";

    return `# ${product.brand}: VPN profile

> ${product.summary}

- Positioning: ${product.positioning}
- Price: ${price}
- Jurisdiction: ${product.highlights.jurisdiction ?? "Not specified"}
- Server/network information: ${product.highlights.servers ?? "Not specified"}
- Independent audit information: ${product.highlights.audits ?? "Not specified"}
- Device support: ${product.highlights.devices ?? "Not specified"}
- Profile URL: ${siteConfig.url}/reviews/${product.slug}

## Editorial limits

This profile is a source-based reference, not a laboratory benchmark or universal ranking. Check the provider's current official pricing, privacy policy, server list and terms before subscribing.
`;
  }

  return null;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug = [] } = await params;
  const pathname = normalizePath(slug);
  const body = await markdownForPath(pathname);

  if (!body) {
    return new Response("Not found\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
      },
    });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
