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
const MAX_REQUEST_BODY_BYTES = 4_096;

const BREACH_USER_AGENT = "VPN Advisor Email Security Tool";
const XON_API_BASE = "https://api.xposedornot.com/v1";

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
        method: "hibp" | "xposedornot";
        found: boolean;
        count: number;
        breaches: string[];
      }
    | { status: "unavailable" };
  flags: {
    disposable: boolean;
    roleAccount: boolean;
  };
};

type HibpBreachRow = {
  Name?: unknown;
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

function parseXonBreaches(body: unknown): string[] {
  if (!body || typeof body !== "object") return [];
  const row = body as { Error?: unknown; breaches?: unknown };
  if (row.Error === "Not found") return [];
  if (!Array.isArray(row.breaches)) return [];

  const names: string[] = [];
  for (const group of row.breaches) {
    if (!Array.isArray(group)) continue;
    for (const name of group) {
      if (typeof name === "string" && name.trim()) names.push(name.trim());
    }
  }
  return [...new Set(names)].slice(0, 20);
}

async function checkXposedOrNot(
  email: string,
): Promise<Extract<EmailSecurityResult["breachCheck"], { status: "checked" }> | { status: "unavailable" }> {
  try {
    const res = await fetch(
      `${XON_API_BASE}/check-email/${encodeURIComponent(email)}`,
      {
        headers: { "user-agent": BREACH_USER_AGENT },
        cache: "no-store",
        signal: AbortSignal.timeout(12_000),
      },
    );

    if (res.status === 429 || !res.ok) return { status: "unavailable" };

    const body = (await res.json()) as unknown;
    const breaches = parseXonBreaches(body);

    return {
      status: "checked",
      method: "xposedornot",
      found: breaches.length > 0,
      count: breaches.length,
      breaches,
    };
  } catch {
    return { status: "unavailable" };
  }
}

async function checkHibp(
  email: string,
): Promise<Extract<EmailSecurityResult["breachCheck"], { status: "checked" }> | { status: "unavailable" }> {
  try {
    const res = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        headers: {
          "hibp-api-key": env.HIBP_API_KEY!,
          "user-agent": BREACH_USER_AGENT,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(12_000),
      },
    );

    if (res.status === 404) {
      return {
        status: "checked",
        method: "hibp",
        found: false,
        count: 0,
        breaches: [],
      };
    }

    if (res.status === 429 || !res.ok) return { status: "unavailable" };

    const body = (await res.json()) as unknown;
    if (!Array.isArray(body)) return { status: "unavailable" };

    const breaches = (body as HibpBreachRow[])
      .map((row) => (typeof row.Name === "string" ? row.Name.trim() : ""))
      .filter(Boolean)
      .slice(0, 20);

    return {
      status: "checked",
      method: "hibp",
      found: breaches.length > 0,
      count: breaches.length,
      breaches,
    };
  } catch {
    return { status: "unavailable" };
  }
}

/** HIBP anahtarı varsa öncelik HIBP; yoksa ücretsiz XposedOrNot API. */
async function checkBreaches(
  email: string,
): Promise<EmailSecurityResult["breachCheck"]> {
  if (env.HIBP_API_KEY) return checkHibp(email);
  return checkXposedOrNot(email);
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

  const contentLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
    return NextResponse.json(
      { error: "request_too_large" },
      { status: 413, headers: NO_STORE_HEADERS },
    );
  }

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BODY_BYTES) {
      return NextResponse.json(
        { error: "request_too_large" },
        { status: 413, headers: NO_STORE_HEADERS },
      );
    }
    body = JSON.parse(rawBody) as unknown;
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
    checkBreaches(parsed.email),
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
