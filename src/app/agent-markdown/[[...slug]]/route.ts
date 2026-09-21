import { getDetailedProviderProducts } from "@/data/provider-catalog";
import { getComparisonProduct } from "@/data/comparison-products";
import { providerEvidenceRecords } from "@/data/provider-evidence";
import { getVisibleBlogPosts } from "@/lib/blog";
import { CONTENT_REGISTRY } from "@/lib/i18n-paths";
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
- [Sources and limitations](${siteConfig.url}/methodology)
- [Evidence ledger](${siteConfig.url}/research/evidence-ledger)
- [AI privacy hub](${siteConfig.url}/ai)
- [Public security tools](${siteConfig.url}/tools)
- [Full agent-readable index](${siteConfig.url}/llms.txt)

- Canonical URL: ${siteConfig.url}/

## Agent citation guidance

Use the most specific page available, include its visible verification date when relevant, and recheck official provider pricing, server lists and platform policies before treating time-sensitive details as current.
`;
}

function collectionMarkdown({
  title,
  description,
  pathname,
  sections,
}: {
  title: string;
  description: string;
  pathname: string;
  sections: string[];
}): string {
  return `# ${title}

> ${description}

${sections.join("\n\n")}

- Canonical URL: ${siteConfig.url}${pathname}
`;
}

function methodologyMarkdown(): string {
  return collectionMarkdown({
    title: "VPN Sources and Limitations",
    description:
      "VPN Advisor presents public provider information, independent records and explicit limitations for informational use.",
    pathname: "/methodology",
    sections: [
      "## What VPN Advisor does\n\nVPN Advisor is an informational reference, not a real-time testing laboratory, certification body or professional newsroom. It does not publish unrun speed tests, fabricated user ratings or guaranteed streaming claims.",
      "## Source types\n\nPages may use official technical documentation, privacy policies, terms, pricing and app-store records, along with independent audits, court records, credible security research and standards documentation. A listed source does not automatically prove every related claim.",
      "## Information fields\n\nProfiles may discuss privacy, security, platform support, pricing, infrastructure and transparency. Provider claims, independent records, reader-run diagnostics and unresolved questions should remain separate. Coverage can differ by page.",
      "## Freshness and limitations\n\nA displayed date is a timestamp for the information beside it, not a guarantee that the page is complete or current. Pricing, audits, protocols and policies can change, so time-sensitive details should be rechecked on the provider's official page. VPN Advisor does not guarantee network performance, streaming access or legal outcomes.",
      `## Related evidence\n\n- [Research desk](${siteConfig.url}/research)\n- [Evidence ledger](${siteConfig.url}/research/evidence-ledger)\n- [Transparency index](${siteConfig.url}/research/transparency-index)\n- [Advertising and affiliate disclosure](${siteConfig.url}/affiliate-disclosure)`,
    ],
  });
}

function researchMarkdown(): string {
  return collectionMarkdown({
    title: "VPN Research Desk",
    description:
      "A source-led research hub for provider documentation, independent audits, pricing verification, transparency signals and evidence limits.",
    pathname: "/research",
    sections: [
      "## How to use this desk\n\nStart with the evidence ledger for claim-level records, then use the transparency index to compare how clearly providers document privacy, security, audits, incidents, ownership and pricing.",
      `## Research surfaces\n\n- [Evidence ledger](${siteConfig.url}/research/evidence-ledger): working records with source type, date, scope and limitations.\n- [Transparency index](${siteConfig.url}/research/transparency-index): documentation signals without treating them as a laboratory score.\n- [AI Citation Watch](${siteConfig.url}/research/ai-citation-watch): fixed questions and evaluation rules for measuring independent AI citation visibility.\n- [Sources and limitations](${siteConfig.url}/methodology): how to read the site's information and limits.`,
      "## Evidence limits\n\nA provider statement is not independent proof. An audit has a scope and date. Pricing, policies, server lists and platform support can change. The site keeps those limits visible rather than converting incomplete evidence into certainty.",
    ],
  });
}

function evidenceLedgerMarkdown(): string {
  return collectionMarkdown({
    title: "VPN Evidence Ledger",
    description:
      "A structured catalogue of VPN claims, source types, verification dates, coverage and known limits.",
    pathname: "/research/evidence-ledger",
    sections: [
      "## What the ledger records\n\nEach record is interpreted with the claim, provider or topic, source category, verification date, scope and evidence limitation. The ledger is designed to make citation and rechecking easier.",
      "## Reading rules\n\nOfficial provider material describes what a provider says or documents. Independent audit and research records provide a separate evidence layer. Missing or outdated evidence is not silently upgraded to a positive claim.",
      `## Related pages\n\n- [Research desk](${siteConfig.url}/research)\n- [Transparency index](${siteConfig.url}/research/transparency-index)\n- [Sources and limitations](${siteConfig.url}/methodology)`,
    ],
  });
}

function transparencyMarkdown(): string {
  return collectionMarkdown({
    title: "VPN Provider Transparency Index",
    description:
      "A documentation-focused view of VPN provider transparency across privacy policies, audits, security disclosures, ownership and pricing clarity.",
    pathname: "/research/transparency-index",
    sections: [
      "## What this index means\n\nThe index describes the availability and clarity of public documentation. It is not a universal product score, speed result or guarantee of provider behaviour.",
      "## Signals considered\n\nSignals include published privacy and logging information, independent audit records, security incident or vulnerability disclosures, company and jurisdiction details, pricing and renewal clarity, and the date and scope of supporting documents.",
      `## Related evidence\n\n- [Evidence ledger](${siteConfig.url}/research/evidence-ledger)\n- [Sources and limitations](${siteConfig.url}/methodology)\n- [Provider directory](${siteConfig.url}/vpn-reviews)`,
    ],
  });
}

async function blogIndexMarkdown(): Promise<string> {
  const posts = (await getVisibleBlogPosts("en")).slice(0, 40);
  const entries = posts.length
    ? posts
        .map(
          (post) =>
            `- [${post.title}](${siteConfig.url}/blog/${post.slug}) — ${post.description} (updated ${post.updatedAt})`,
        )
        .join("\n")
    : "No published articles are currently available.";

  return collectionMarkdown({
    title: "VPN Advisor Blog",
    description:
      "Source-led articles about VPN privacy, security, provider documentation, AI privacy and current cyber-security developments.",
    pathname: "/blog",
    sections: [
      "## Latest published articles\n\n" + entries,
      `## Editorial limits\n\nArticles show an author, publication and update date, with source links and limits where available. This does not mean that every article has the same depth of independent verification. [Read sources and limitations](${siteConfig.url}/methodology).`,
    ],
  });
}

async function aiMarkdown(): Promise<string> {
  const posts = (await getVisibleBlogPosts("en"))
    .filter((post) => post.category === "yapay-zeka-vpn" || post.tags.some((tag) => /ai|privacy|chatgpt|claude|gemini/i.test(tag)))
    .slice(0, 20);
  const entries = posts.length
    ? posts.map((post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}) — ${post.description}`).join("\n")
    : "No AI privacy articles are currently available.";

  return collectionMarkdown({
    title: "AI, Privacy and VPN Security",
    description:
      "Evidence-led guidance for protecting AI conversations, API keys, accounts and devices without overstating what a VPN can do.",
    pathname: "/ai",
    sections: [
      "## What a VPN can protect\n\nA VPN can encrypt the connection between a device and a VPN server, reducing exposure on an untrusted network.",
      "## What a VPN cannot replace\n\nA VPN does not replace strong passwords, multi-factor authentication, careful sharing or the privacy controls inside an AI service. API keys and account credentials need separate protection.",
      "## AI privacy articles\n\n" + entries,
    ],
  });
}

function guideIndexMarkdown(): string {
  const guides = Object.values(CONTENT_REGISTRY)
    .flatMap((entry) => {
      const translation = entry.translations.en;
      return translation?.section === "guide" ? [translation] : [];
    })
    .map((entry) => `- [${entry.title}](${siteConfig.url}/guide/${entry.slug})`)
    .join("\n");

  return collectionMarkdown({
    title: "VPN Guides",
    description:
      "Practical VPN explainers covering how VPNs work, security checks, free versus paid services and privacy decisions.",
    pathname: "/guide",
    sections: [
      "## Guide directory\n\n" + (guides || "No guides are currently available."),
      `## Use the guides carefully\n\nVPN features, prices, laws and platform policies can change. Use the visible source links and dates on each guide, then confirm time-sensitive details with the relevant official source.`,
    ],
  });
}

function providerDirectoryMarkdown(): string {
  const products = getDetailedProviderProducts("en");
  const entries = products
    .map((product) => {
      const price = product.pricingVerifiedAt && product.priceFromUsd > 0
        ? `${product.priceCurrency} ${product.priceFromUsd.toFixed(2)}/month from the recorded plan`
        : "pricing requires an official-site check";
      return `- [${product.brand}](${siteConfig.url}/reviews/${product.slug}) — ${product.summary} Price note: ${price}. Audit: ${product.highlights.audits ?? "not specified"}.`;
    })
    .join("\n");

  return collectionMarkdown({
    title: "VPN Provider Directory",
    description:
      "Source-based VPN provider profiles covering privacy, security, audits, pricing, devices, infrastructure and editorial limits.",
    pathname: "/vpn-reviews",
    sections: [
      "## Provider profiles\n\n" + entries,
      "## Directory limits\n\nProfiles are not laboratory benchmarks or universal rankings. Pricing, renewal conditions, server lists and platform support should be rechecked on the provider's official site before purchase.",
    ],
  });
}

function utilityMarkdown(pathname: string): string | null {
  const pages: Record<string, { title: string; description: string; sections: string[] }> = {
    "/about": {
      title: "About VPN Advisor",
      description: "VPN Advisor is an English-language, source-based VPN and digital-security reference project led by cybersecurity practitioner Ahmet Tepe.",
      sections: [
        "## Publishing lead\n\nAhmet Tepe is the publishing lead for VPN Advisor. Documented background includes security awareness, phishing simulations, OSINT research, vulnerability scanning, reporting, DevSecOps/CI/CD security checks and incident-response support. Records list CompTIA Security+ CE (valid through 31 May 2029), 1,960 hours of Cyber Security Engineer training, an ISO/IEC 27001:2022 Auditor/Lead Auditor course and an ISC2-authorized Coursera Certified in Cybersecurity specialization.",
        "## Editorial position\n\nThe site organizes public provider documentation, independent audit records, standards, security research and practical diagnostic signals. It is not a VPN testing laboratory and does not publish unrun speed tests or fabricated user ratings.",
        `## Trust and corrections\n\nProvider claims, independent evidence, diagnostic signals and unresolved questions should be kept separate. The publishing lead's credentials do not turn provider profiles into laboratory tests or first-hand reviews. See [sources and limitations](${siteConfig.url}/methodology), the [research desk](${siteConfig.url}/research) and the [contact page](${siteConfig.url}/contact).`,
      ],
    },
    "/tools": {
      title: "VPN Advisor Security and Privacy Tools",
      description: "Public diagnostic tools for IP context, DNS leaks, WebRTC leaks, VPN speed and email-security signals.",
      sections: [
        "## Available diagnostics\n\n- IP and internet context\n- DNS leak check\n- WebRTC leak check\n- VPN speed test\n- Email security check\n\nTool results are limited signals for the current session; they are not provider-wide benchmarks or security certifications.",
        "## Data-flow limits\n\nSome tools use disclosed external services to process a public IP, DNS or submitted email address. The relevant tool page explains the data flow before use. Do not treat a diagnostic result as proof of a provider's complete privacy or security posture.",
      ],
    },
    "/security-tools": {
      title: "VPN Advisor Security Tools",
      description: "Security and privacy diagnostics with explicit data-flow and interpretation limits.",
      sections: [
        `Use the [security tools hub](${siteConfig.url}/tools) for DNS, WebRTC, IP, speed and email-security checks. Results are session-specific signals, not certifications or provider-wide benchmarks.`,
      ],
    },
    "/devices": {
      title: "VPN Device Support Guides",
      description: "Device and platform guidance for VPN use across desktop, mobile, streaming and router environments.",
      sections: [
        "## How to compare device support\n\nCheck the provider's official application and support documentation for operating-system versions, simultaneous-device limits, router support and feature differences between platforms.",
        `## Related pages\n\n- [Provider directory](${siteConfig.url}/vpn-reviews)\n- [Sources and limitations](${siteConfig.url}/methodology)\n- [VPN security checklist](${siteConfig.url}/guide/vpn-security-checklist)`,
      ],
    },
    "/affiliate-disclosure": {
      title: "Advertising and Affiliate Disclosure",
      description: "How advertising and affiliate links are handled on VPN Advisor.",
      sections: [
        "## Editorial independence\n\nGoogle AdSense advertising and some affiliate links may appear. Advertising or commission does not decide whether a technical claim is classified as verified, provider-reported or unresolved.",
        "## Reader safety\n\nOutbound links can lead to provider sites. Review the destination, price, renewal conditions, privacy policy and terms before subscribing. VPN Advisor does not complete a purchase on a reader's behalf.",
      ],
    },
    "/privacy-policy": {
      title: "VPN Advisor Privacy Policy",
      description: "Privacy information for the VPN Advisor website and its public diagnostic tools.",
      sections: [
        "## Before using a diagnostic\n\nTool pages explain whether a request is sent to an external processing service. Avoid submitting information that you do not want processed for the stated diagnostic purpose.",
        `Read the full [privacy policy](${siteConfig.url}/privacy-policy) and the individual tool's data-flow explanation before submitting data.`,
      ],
    },
    "/contact": {
      title: "Contact and Corrections",
      description: "Contact VPN Advisor about factual corrections, source updates and editorial questions.",
      sections: [
        "## Corrections\n\nWhen reporting a correction, include the exact URL, the claim that needs review, the relevant source and its publication or verification date.",
        `Use the [contact page](${siteConfig.url}/contact).`,
      ],
    },
    "/terms": {
      title: "VPN Advisor Terms",
      description: "Terms and usage limits for VPN Advisor content and diagnostic tools.",
      sections: [
        "## Scope\n\nVPN Advisor provides general information and diagnostic signals. It is not legal, financial or security advice, and tool output is not a guarantee or certification.",
        `Read the full [terms](${siteConfig.url}/terms) before relying on the site or its tools.`,
      ],
    },
  };
  const page = pages[pathname];
  return page ? collectionMarkdown({ ...page, pathname }) : null;
}

function comparisonMarkdown(slug: string): string | null {
  const pairs: Record<string, readonly [string, string]> = {
    "nordvpn-vs-surfshark": ["nordvpn", "surfshark"],
    "expressvpn-vs-nordvpn": ["expressvpn", "nordvpn"],
    "proton-vs-mullvad": ["proton-vpn", "mullvad"],
    "opera-vpn-vs-proton-vpn": ["opera-vpn", "proton-vpn"],
  };
  const pair = pairs[slug];
  if (!pair) return null;

  const left = getComparisonProduct(pair[0], "en");
  const right = getComparisonProduct(pair[1], "en");
  if (!left || !right) return null;

  const fact = (product: typeof left) => {
    const price = product.pricingVerifiedAt && product.priceFromUsd > 0
      ? `${product.priceCurrency} ${product.priceFromUsd.toFixed(2)}/month from the recorded plan`
      : "verify current pricing on the official site";
    return `### ${product.brand}\n\n${product.summary}\n\n- Positioning: ${product.positioning}\n- Price note: ${price}\n- Jurisdiction: ${product.highlights.jurisdiction ?? "not specified"}\n- Audit information: ${product.highlights.audits ?? "not specified"}\n- Device information: ${product.highlights.devices ?? "not specified"}\n- Open-source information: ${product.highlights.openSource ? "listed in the provider profile" : "not listed in the provider profile"}`;
  };

  return collectionMarkdown({
    title: `${left.brand} vs ${right.brand}`,
    description: `A factual comparison of ${left.brand} and ${right.brand} using documented pricing, privacy, audit, device and jurisdiction fields.`,
    pathname: `/comparison/${slug}`,
    sections: [
      "## How to read this comparison\n\nThe comparison exposes the same fields for both providers. It does not declare a universal winner, and provider claims are not treated as independent proof.",
      fact(left),
      fact(right),
      `## Recheck before subscribing\n\nConfirm current pricing, renewal terms, privacy policy, server list and platform support on the official provider pages. [Open the provider directory](${siteConfig.url}/vpn-reviews).`,
    ],
  });
}

async function markdownForPath(pathname: string): Promise<string | null> {
  if (pathname === "/") return homeMarkdown();

  if (pathname === "/methodology") return methodologyMarkdown();
  if (pathname === "/research") return researchMarkdown();
  if (pathname === "/research/evidence-ledger") return evidenceLedgerMarkdown();
  if (pathname === "/research/transparency-index") return transparencyMarkdown();
  if (pathname === "/blog") return blogIndexMarkdown();
  if (pathname === "/ai") return aiMarkdown();
  if (pathname === "/guide") return guideIndexMarkdown();
  if (pathname === "/vpn-reviews" || pathname === "/reviews") return providerDirectoryMarkdown();

  const utilityPage = utilityMarkdown(pathname);
  if (utilityPage) return utilityPage;

  if (pathname === "/comparison" || pathname === "/karsilastir") {
    return collectionMarkdown({
      title: "VPN Comparisons",
      description: "Side-by-side VPN comparisons using consistent, source-based fields rather than a declared universal winner.",
      pathname: "/comparison",
      sections: [
        `## Available comparisons\n\n- [NordVPN vs Surfshark](${siteConfig.url}/comparison/nordvpn-vs-surfshark)\n- [ExpressVPN vs NordVPN](${siteConfig.url}/comparison/expressvpn-vs-nordvpn)\n- [Proton VPN vs Mullvad](${siteConfig.url}/comparison/proton-vs-mullvad)\n- [Opera VPN vs Proton VPN](${siteConfig.url}/comparison/opera-vpn-vs-proton-vpn)`,
        `## Reading this comparison\n\nUse [sources and limitations](${siteConfig.url}/methodology) and the [evidence ledger](${siteConfig.url}/research/evidence-ledger) to interpret source quality, dates and limitations.`,
      ],
    });
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "comparison" || segments[0] === "karsilastir") {
    return comparisonMarkdown(segments[1] ?? "");
  }
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
    const evidence = providerEvidenceRecords("en").find(
      (record) => record.slug === product.slug,
    );

    const price =
      product.pricingVerifiedAt && product.priceFromUsd > 0
        ? `${product.priceCurrency} ${product.priceFromUsd.toFixed(2)}/month; verify term and renewal conditions`
        : "Verify current pricing on the provider's official page";

    const sourceLines = [
      evidence?.profileFields.sourceUrl
        ? `- Profile evidence: [${evidence.profileFields.sourceLabel ?? "Provider profile source"}](${evidence.profileFields.sourceUrl})${evidence.profileFields.checkedAt ? ` (checked ${evidence.profileFields.checkedAt})` : ""}`
        : "- Profile evidence: field-specific source link is not recorded",
      evidence?.primarySource.sourceUrl
        ? `- Pricing source: [${evidence.primarySource.sourceLabel ?? "Provider pricing page"}](${evidence.primarySource.sourceUrl})${evidence.primarySource.checkedAt ? ` (checked ${evidence.primarySource.checkedAt})` : ""}`
        : "- Pricing source: verify on the provider's official page",
      evidence?.audit.sourceUrl
        ? `- Audit source: [${evidence.audit.sourceLabel ?? "Audit source"}](${evidence.audit.sourceUrl})${evidence.audit.checkedAt ? ` (checked ${evidence.audit.checkedAt})` : ""}`
        : "- Audit source: dedicated scope link is not recorded",
    ].join("\n");

    return `# ${product.brand}: VPN profile

> ${product.summary}

- Positioning: ${product.positioning}
- Price: ${price}
- Jurisdiction: ${product.highlights.jurisdiction ?? "Not specified"}
- Server/network information: ${product.highlights.servers ?? "Not specified"}
- Independent audit information: ${product.highlights.audits ?? "Not specified"}
- Device support: ${product.highlights.devices ?? "Not specified"}
- Profile URL: ${siteConfig.url}/reviews/${product.slug}
${sourceLines}

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
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
      "X-Robots-Tag": "noindex, follow, noarchive",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
