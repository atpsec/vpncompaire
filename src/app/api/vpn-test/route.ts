import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";
import { geoFromHeaders } from "@/lib/request-geo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type VpnTestResult = {
  ip: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  isp: string | null;
  asn: string | null;
  networkType: string | null;
  signals: {
    datacenter: boolean | null;
    proxy: boolean | null;
    vpn: boolean | null;
    tor: boolean | null;
  };
  detected: boolean | null;
  degraded: boolean;
  source: "ipapi.is" | "request-headers";
  checkedAt: string;
};

type IpApiResponse = {
  ip?: unknown;
  is_datacenter?: unknown;
  is_proxy?: unknown;
  is_vpn?: unknown;
  is_tor?: unknown;
  company?: {
    name?: unknown;
    type?: unknown;
  };
  asn?: {
    asn?: unknown;
    org?: unknown;
    descr?: unknown;
    type?: unknown;
  };
  location?: {
    country?: unknown;
    country_code?: unknown;
    state?: unknown;
    city?: unknown;
  };
};

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function hashIdentity(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

function isPublicIpCandidate(ip: string): boolean {
  if (!ip || ip === "unknown") return false;
  if (
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("169.254.") ||
    ip.toLowerCase().startsWith("fc") ||
    ip.toLowerCase().startsWith("fd")
  ) {
    return false;
  }

  const private172 = ip.match(/^172\.(\d{1,2})\./);
  if (private172) {
    const secondOctet = Number(private172[1]);
    if (secondOctet >= 16 && secondOctet <= 31) return false;
  }

  return true;
}

function fallbackResult(req: NextRequest, ip: string): VpnTestResult {
  const geo = geoFromHeaders(req.headers);
  const countryCode = geo.countryCode;

  return {
    ip: isPublicIpCandidate(ip) ? ip : null,
    country: countryCode,
    countryCode,
    city: geo.city,
    region: geo.region,
    isp: null,
    asn: null,
    networkType: null,
    signals: {
      datacenter: null,
      proxy: null,
      vpn: null,
      tor: null,
    },
    detected: null,
    degraded: true,
    source: "request-headers",
    checkedAt: new Date().toISOString(),
  };
}

async function lookupIp(ip: string): Promise<VpnTestResult | null> {
  if (!isPublicIpCandidate(ip)) return null;

  const res = await fetch(
    `https://api.ipapi.is/?q=${encodeURIComponent(ip)}`,
    {
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
    },
  );
  if (!res.ok) return null;

  const data = (await res.json()) as IpApiResponse;
  const signals = {
    datacenter: asBoolean(data.is_datacenter),
    proxy: asBoolean(data.is_proxy),
    vpn: asBoolean(data.is_vpn),
    tor: asBoolean(data.is_tor),
  };
  const signalValues = Object.values(signals).filter(
    (value): value is boolean => value !== null,
  );

  return {
    ip: asString(data.ip) ?? ip,
    country: asString(data.location?.country),
    countryCode: asString(data.location?.country_code)?.toUpperCase() ?? null,
    city: asString(data.location?.city),
    region: asString(data.location?.state),
    isp: asString(data.company?.name) ?? asString(data.asn?.org),
    asn:
      typeof data.asn?.asn === "number"
        ? `AS${data.asn.asn}`
        : asString(data.asn?.asn),
    networkType:
      asString(data.company?.type) ??
      asString(data.asn?.type) ??
      asString(data.asn?.descr),
    signals,
    detected:
      signalValues.length === 0
        ? null
        : signalValues.some((value) => value === true),
    degraded: false,
    source: "ipapi.is",
    checkedAt: new Date().toISOString(),
  };
}

export async function GET(req: NextRequest) {
  const clientIp = clientIpFrom(req.headers);
  const fallbackIdentity = req.headers.get("user-agent") ?? "unknown";
  const identity = isPublicIpCandidate(clientIp) ? clientIp : fallbackIdentity;
  const rl = await rateLimit(`vpn-test:${hashIdentity(identity)}`, 20, 60);

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

  try {
    const result = await lookupIp(clientIp);
    if (result) {
      return NextResponse.json(result, { headers: NO_STORE_HEADERS });
    }
  } catch {
    // Fall through to request-header fallback below.
  }

  return NextResponse.json(fallbackResult(req, clientIp), {
    headers: NO_STORE_HEADERS,
  });
}
