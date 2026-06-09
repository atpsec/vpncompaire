import { createHash } from "node:crypto";
import { resolveMx, resolveTxt } from "node:dns/promises";
import { domainToASCII } from "node:url";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

const HIBP_USER_AGENT = "VPN Advisor Email Security Tool";

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "sharklasers.com",
  "temp-mail.org",
  "tempmail.com",
  "throwawaymail.com",
  "trashmail.com",
  "yopmail.com",
]);

const ROLE_ALIASES = new Set([
  "admin",
  "billing",
  "contact",
  "help",
  "hello",
  "info",
  "office",
  "sales",
  "security",
  "support",
  "webmaster",
]);

type CheckStatus = "pass" | "warning" | "fail" | "unknown";

type FindingKey =
  | "breach_found"
  | "hibp_not_configured"
  | "hibp_unavailable"
  | "no_mx"
  | "no_spf"
  | "weak_spf"
  | "no_dmarc"
  | "dmarc_monitor_only"
  | "disposable_email"
  | "role_account";

type EmailSecurityResult = {
  emailMasked: string;
  domain: string;
  checkedAt: string;
  score: number;
  risk: "low" | "medium" | "high";
  findings: FindingKey[];
  domainChecks: {
    mx: { status: CheckStatus; count: number };
    spf: { status: CheckStatus; record: string | null };
    dmarc: { status: CheckStatus; policy: string | null; record: string | null };
  };
  breachCheck:
    | {
        status: "checked";
        method: "hibp-k-anonymity";
        found: boolean;
        count: number;
        breaches: string[];
      }
    | { status: "not_configured" }
    | { status: "unavailable" };
  flags: {
    disposable: boolean;
    roleAccount: boolean;
  };
};

type HibpRangeRow = {
  hashSuffix?: unknown;
  websites?: unknown;
};

function hashIdentity(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

function normalizeEmail(input: unknown): { email: string; local: string; domain: string } | null {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return null;
  if (/\s/.test(email)) return null;

  const at = email.lastIndexOf("@");
  if (at <= 0 || at !== email.indexOf("@") || at === email.length - 1) {
    return null;
  }

  const local = email.slice(0, at);
  const rawDomain = email.slice(at + 1);
  const domain = domainToASCII(rawDomain);
  if (!domain || domain.length > 253 || !domain.includes(".")) return null;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return null;
  if (!/^[a-z0-9.-]+$/.test(domain)) return null;
  if (domain.split(".").some((part) => !part || part.length > 63)) return null;

  return { email: `${local}@${domain}`, local, domain };
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  const visible =
    local.length <= 2 ? `${local[0] ?? ""}*` : `${local.slice(0, 2)}***`;
  return `${visible}@${domain}`;
}

function flattenTxt(records: string[][]): string[] {
  return records.map((record) => record.join(""));
}

async function safeTxt(name: string): Promise<string[]> {
  try {
    return flattenTxt(await resolveTxt(name));
  } catch {
    return [];
  }
}

async function checkMx(domain: string) {
  try {
    const records = await resolveMx(domain);
    return { status: records.length > 0 ? "pass" : "fail", count: records.length } as const;
  } catch {
    return { status: "fail", count: 0 } as const;
  }
}

function spfStatus(record: string | null): CheckStatus {
  if (!record) return "fail";
  if (/\+all/i.test(record)) return "fail";
  if (/(^|\s)redirect=/i.test(record)) return "pass";
  if (/(^|\s)(~all|-all)(\s|$)/i.test(record)) return "pass";
  return "warning";
}

function dmarcPolicy(record: string | null): string | null {
  if (!record) return null;
  const match = record.match(/(?:^|;)\s*p\s*=\s*([^;\s]+)/i);
  return match?.[1]?.toLowerCase() ?? null;
}

function dmarcStatus(policy: string | null): CheckStatus {
  if (!policy) return "fail";
  if (policy === "reject" || policy === "quarantine") return "pass";
  if (policy === "none") return "warning";
  return "unknown";
}

async function checkDomainAuth(domain: string) {
  const [mx, rootTxt, dmarcTxt] = await Promise.all([
    checkMx(domain),
    safeTxt(domain),
    safeTxt(`_dmarc.${domain}`),
  ]);

  const spfRecord = rootTxt.find((record) => /^v=spf1\b/i.test(record)) ?? null;
  const dmarcRecord = dmarcTxt.find((record) => /^v=DMARC1\b/i.test(record)) ?? null;
  const policy = dmarcPolicy(dmarcRecord);

  return {
    mx,
    spf: { status: spfStatus(spfRecord), record: spfRecord },
    dmarc: { status: dmarcStatus(policy), policy, record: dmarcRecord },
  };
}

async function checkHibp(email: string): Promise<EmailSecurityResult["breachCheck"]> {
  if (!env.HIBP_API_KEY) return { status: "not_configured" };

  const hash = createHash("sha1").update(email).digest("hex").toUpperCase();
  const prefix = hash.slice(0, 6);
  const suffix = hash.slice(6);

  try {
    const res = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/range/${prefix}`,
      {
        headers: {
          "hibp-api-key": env.HIBP_API_KEY,
          "user-agent": HIBP_USER_AGENT,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!res.ok) return { status: "unavailable" };

    const body = (await res.json()) as unknown;
    const rows = Array.isArray(body) ? (body as HibpRangeRow[]) : [];
    const match = rows.find(
      (row) =>
        typeof row.hashSuffix === "string" &&
        row.hashSuffix.toUpperCase() === suffix,
    );

    if (!match) {
      return {
        status: "checked",
        method: "hibp-k-anonymity",
        found: false,
        count: 0,
        breaches: [],
      };
    }

    const breaches = (Array.isArray(match.websites) ? match.websites : [])
      .filter((name): name is string => typeof name === "string")
      .map((name) => name.trim())
      .filter(Boolean)
      .slice(0, 20);

    return {
      status: "checked",
      method: "hibp-k-anonymity",
      found: breaches.length > 0,
      count: breaches.length,
      breaches,
    };
  } catch {
    return { status: "unavailable" };
  }
}

function scoreResult(params: {
  domainChecks: EmailSecurityResult["domainChecks"];
  breachCheck: EmailSecurityResult["breachCheck"];
  disposable: boolean;
  roleAccount: boolean;
}): Pick<EmailSecurityResult, "score" | "risk" | "findings"> {
  const findings: FindingKey[] = [];
  let score = 100;

  if (params.domainChecks.mx.status === "fail") {
    findings.push("no_mx");
    score -= 35;
  }
  if (params.domainChecks.spf.status === "fail") {
    findings.push("no_spf");
    score -= 15;
  } else if (params.domainChecks.spf.status === "warning") {
    findings.push("weak_spf");
    score -= 8;
  }
  if (params.domainChecks.dmarc.status === "fail") {
    findings.push("no_dmarc");
    score -= 20;
  } else if (params.domainChecks.dmarc.status === "warning") {
    findings.push("dmarc_monitor_only");
    score -= 10;
  }
  if (params.breachCheck.status === "checked" && params.breachCheck.found) {
    findings.push("breach_found");
    score -= 35;
  } else if (params.breachCheck.status === "not_configured") {
    findings.push("hibp_not_configured");
    score -= 5;
  } else if (params.breachCheck.status === "unavailable") {
    findings.push("hibp_unavailable");
    score -= 5;
  }
  if (params.disposable) {
    findings.push("disposable_email");
    score -= 15;
  }
  if (params.roleAccount) {
    findings.push("role_account");
    score -= 5;
  }

  score = Math.max(0, Math.min(100, score));
  const risk =
    score < 55 ||
    params.domainChecks.mx.status === "fail" ||
    (params.breachCheck.status === "checked" && params.breachCheck.found)
      ? "high"
      : score < 80
        ? "medium"
        : "low";

  return { score, risk, findings };
}

export async function POST(req: NextRequest) {
  const clientIp = clientIpFrom(req.headers);
  const rl = await rateLimit(`email-security:${hashIdentity(clientIp)}`, 10, 60);

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          ...NO_STORE_HEADERS,
          "Retry-After": "60",
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const emailInput =
    body && typeof body === "object"
      ? (body as { email?: unknown }).email
      : undefined;
  const parsed = normalizeEmail(emailInput);
  if (!parsed) {
    return NextResponse.json(
      { error: "invalid_email" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const [domainChecks, breachCheck] = await Promise.all([
    checkDomainAuth(parsed.domain),
    checkHibp(parsed.email),
  ]);
  const disposable = DISPOSABLE_DOMAINS.has(parsed.domain);
  const roleAccount = ROLE_ALIASES.has(parsed.local.split("+")[0]);
  const scored = scoreResult({
    domainChecks,
    breachCheck,
    disposable,
    roleAccount,
  });

  const result: EmailSecurityResult = {
    emailMasked: maskEmail(parsed.email),
    domain: parsed.domain,
    checkedAt: new Date().toISOString(),
    ...scored,
    domainChecks,
    breachCheck,
    flags: {
      disposable,
      roleAccount,
    },
  };

  return NextResponse.json(result, { headers: NO_STORE_HEADERS });
}
