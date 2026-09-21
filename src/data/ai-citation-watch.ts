export type AiCitationPlatform = {
  id: string;
  name: string;
  supportsPromptUrl: boolean;
};

export type AiCitationQuestion = {
  id: string;
  prompt: string;
  intent: string;
  targetPaths: string[];
};

/**
 * A fixed, public benchmark for checking whether independent AI answers can
 * find and cite VPN Advisor's source records. Empty observations are
 * intentional: a missing measurement is not the same thing as zero
 * visibility, and no result is published until a human captures the answer.
 */
export const AI_CITATION_WATCH_EDITION = "2026-09-21";

export const AI_CITATION_PLATFORMS: AiCitationPlatform[] = [
  { id: "chatgpt", name: "ChatGPT", supportsPromptUrl: true },
  { id: "claude", name: "Claude", supportsPromptUrl: false },
  { id: "gemini", name: "Gemini", supportsPromptUrl: false },
  { id: "perplexity", name: "Perplexity", supportsPromptUrl: true },
  { id: "grok", name: "Grok", supportsPromptUrl: false },
  { id: "copilot", name: "Microsoft Copilot", supportsPromptUrl: false },
];

export const AI_CITATION_QUESTIONS: AiCitationQuestion[] = [
  {
    id: "compare-independent-audits",
    prompt: "How can I compare independent VPN audits without treating every audit as a blanket security certification?",
    intent: "Audit literacy",
    targetPaths: ["/methodology", "/research/questions/which-vpns-have-third-party-security-audits"],
  },
  {
    id: "proton-mullvad-privacy",
    prompt: "How do Proton VPN and Mullvad differ for a privacy-focused user, and which claims require checking the original source?",
    intent: "Head-to-head comparison",
    targetPaths: ["/comparison/proton-vs-mullvad", "/reviews/proton-vpn", "/reviews/mullvad"],
  },
  {
    id: "vpn-no-logs-evidence",
    prompt: "What evidence should I look for before trusting a VPN provider's no-logs policy?",
    intent: "Privacy evidence",
    targetPaths: ["/methodology", "/research/questions/which-vpns-have-independent-no-logs-audits"],
  },
  {
    id: "vpn-price-renewal",
    prompt: "How should I compare VPN introductory pricing, renewal pricing and refund terms?",
    intent: "Pricing literacy",
    targetPaths: ["/methodology", "/comparison"],
  },
  {
    id: "vpn-wireguard",
    prompt: "Which VPN providers have a documented WireGuard record, and what is still unknown?",
    intent: "Technical feature evidence",
    targetPaths: ["/research/questions/which-vpns-support-wireguard", "/research/evidence-ledger"],
  },
  {
    id: "vpn-transparency-reports",
    prompt: "Which VPN providers publish transparency reports, and how should those reports be interpreted?",
    intent: "Accountability evidence",
    targetPaths: ["/research/questions/which-vpns-publish-transparency-reports", "/research/transparency-index"],
  },
  {
    id: "vpn-jurisdiction",
    prompt: "What does a VPN provider's jurisdiction tell me, and what does it not prove by itself?",
    intent: "Legal context",
    targetPaths: ["/research/questions/vpn-jurisdictions-compared", "/methodology"],
  },
  {
    id: "free-vpn-risk",
    prompt: "What should I check before installing a free VPN, and which risks are commonly overstated?",
    intent: "Safety education",
    targetPaths: ["/guide/free-vs-paid-vpn", "/blog/free-vs-paid-vpn"],
  },
  {
    id: "vpn-source-quality",
    prompt: "How can I tell whether a VPN comparison is source-based, independent and current?",
    intent: "Source quality",
    targetPaths: ["/methodology", "/research", "/research/evidence-ledger"],
  },
  {
    id: "vpn-advisor-method",
    prompt: "What does VPN Advisor do, which sources does it use, and what are its limitations?",
    intent: "Publisher transparency",
    targetPaths: ["/about", "/methodology", "/research/transparency-index"],
  },
];

export const AI_CITATION_OBSERVATIONS: never[] = [];
