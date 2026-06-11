import { clientIpFrom } from "@/lib/rate-limit";

export type GeoSource = "vercel" | "cloudflare" | "ipwho" | "none";

export type RequestGeo = {
  ip: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  timezone: string;
  source: GeoSource;
};

function safeDecode(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function isPrivateOrLocal(ip: string | null | undefined): boolean {
  if (!ip) return true;
  const trimmed = ip.trim();
  if (!trimmed) return true;
  if (trimmed === "::1" || trimmed === "127.0.0.1") return true;
  if (
    trimmed.startsWith("10.") ||
    trimmed.startsWith("127.") ||
    trimmed.startsWith("192.168.") ||
    trimmed.startsWith("0.")
  ) {
    return true;
  }
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(trimmed)) return true;
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("fe80:") ||
    lower.startsWith("fc") ||
    lower.startsWith("fd")
  ) {
    return true;
  }
  return false;
}

export function isPublicIp(ip: string | null | undefined): boolean {
  if (!ip || ip === "unknown") return false;
  return !isPrivateOrLocal(ip);
}

/** Country code from CDN/platform headers (Vercel, Cloudflare). */
export function countryCodeFromHeaders(headers: Headers): string | null {
  const vercel = headers.get("x-vercel-ip-country");
  if (vercel) return vercel.toUpperCase();

  const cf = headers.get("cf-ipcountry");
  if (cf && cf !== "XX") return cf.toUpperCase();

  return null;
}

/** Synchronous geo from request headers — no external lookup. */
export function geoFromHeaders(headers: Headers): RequestGeo {
  const ipRaw = clientIpFrom(headers);
  const ip = isPublicIp(ipRaw) ? ipRaw : null;
  const countryCode = countryCodeFromHeaders(headers);
  const hasVercel = Boolean(headers.get("x-vercel-ip-country"));
  const hasCf = Boolean(headers.get("cf-ipcountry"));

  return {
    ip,
    countryCode,
    city: safeDecode(headers.get("x-vercel-ip-city")),
    region: safeDecode(headers.get("x-vercel-ip-region")),
    timezone: headers.get("x-vercel-ip-timezone") ?? "UTC",
    source: hasVercel ? "vercel" : hasCf ? "cloudflare" : "none",
  };
}

type IpWhoResponse = {
  success?: boolean;
  country_code?: string;
  city?: string;
  region?: string;
  timezone?: { id?: string };
};

async function lookupGeoFromIp(ip: string): Promise<Partial<RequestGeo>> {
  const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) return {};

  const data = (await res.json()) as IpWhoResponse;
  if (!data.success) return {};

  const countryCode = data.country_code?.toUpperCase() ?? null;
  return {
    countryCode,
    city: data.city ?? null,
    region: data.region ?? null,
    timezone: data.timezone?.id ?? "UTC",
    source: "ipwho",
  };
}

/** Header-based geo with IP lookup fallback for non-Vercel hosts (e.g. Hostinger). */
export async function resolveRequestGeo(headers: Headers): Promise<RequestGeo> {
  const base = geoFromHeaders(headers);
  if (base.countryCode || !base.ip) return base;

  try {
    const enriched = await lookupGeoFromIp(base.ip);
    if (!enriched.countryCode) return base;

    return {
      ip: base.ip,
      countryCode: enriched.countryCode,
      city: enriched.city ?? base.city,
      region: enriched.region ?? base.region,
      timezone: enriched.timezone ?? base.timezone,
      source: "ipwho",
    };
  } catch {
    return base;
  }
}
