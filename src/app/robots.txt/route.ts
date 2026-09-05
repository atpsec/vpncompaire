import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# VPN Advisor — robots.txt
# AI ve arama crawler'larına açık erişim verilmiştir.

User-agent: *
Allow: /
Disallow: /go/

# Keep Bing's crawler policy explicit. The wildcard rule above already allows
# these URLs; this group makes the intended Bing behavior easy to inspect.
User-agent: Bingbot
Allow: /
Disallow: /go/

# AI crawlers — explicitly allowed for citability
User-agent: GPTBot
Allow: /
Disallow: /go/

User-agent: ChatGPT-User
Allow: /
Disallow: /go/

User-agent: OAI-SearchBot
Allow: /
Disallow: /go/

User-agent: ClaudeBot
Allow: /
Disallow: /go/

User-agent: Claude-User
Allow: /
Disallow: /go/

User-agent: Claude-SearchBot
Allow: /
Disallow: /go/

User-agent: anthropic-ai
Allow: /
Disallow: /go/

User-agent: PerplexityBot
Allow: /
Disallow: /go/

User-agent: Perplexity-User
Allow: /
Disallow: /go/

User-agent: Google-Extended
Allow: /
Disallow: /go/

User-agent: GoogleOther
Allow: /
Disallow: /go/

User-agent: Applebot
Allow: /
Disallow: /go/

User-agent: Applebot-Extended
Allow: /
Disallow: /go/

User-agent: meta-externalagent
Allow: /
Disallow: /go/

User-agent: cohere-ai
Allow: /
Disallow: /go/

User-agent: Amazonbot
Allow: /
Disallow: /go/

User-agent: Bytespider
Allow: /
Disallow: /go/

User-agent: DuckAssistBot
Allow: /
Disallow: /go/

User-agent: Mistral-AI
Allow: /
Disallow: /go/

User-agent: YouBot
Allow: /
Disallow: /go/

Sitemap: ${siteConfig.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Robots is a small SEO control plane document. Revalidate it quickly
      // so a domain or crawler-policy fix is not held for a full page-cache
      // window after deployment.
      "Cache-Control": "public, max-age=0, s-maxage=300, must-revalidate",
    },
  });
}
