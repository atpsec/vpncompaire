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

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: Mistral-AI
Allow: /

User-agent: YouBot
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
Sitemap: ${siteConfig.url}/sitemap-vpn-providers.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
