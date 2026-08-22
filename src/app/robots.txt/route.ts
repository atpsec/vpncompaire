import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# VPN Advisor — robots.txt
# AI ve arama crawler'larına açık erişim verilmiştir.

User-agent: *
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
Sitemap: ${siteConfig.url}/sitemap-vpn-providers.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
