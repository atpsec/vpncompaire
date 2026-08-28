import { clientIpFrom } from "@/lib/rate-limit";

export type GeoSource = "cloudflare" | "ipwho" | "none";

export type IpVersion = "ipv4" | "ipv6" | null;

export type RequestGeo = {
  ip: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  capital: string | null;
  timezone: string;
  source: GeoSource;
};

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

/** Classify a validated request IP without attempting to convert between families. */
export function ipVersionOf(ip: string | null | undefined): IpVersion {
  if (!ip) return null;
  const value = ip.trim();
  if (!value) return null;
  if (value.includes(":")) return "ipv6";

  const octets = value.split(".");
  if (
    octets.length === 4 &&
    octets.every((octet) => {
      if (!/^\d{1,3}$/.test(octet)) return false;
      const number = Number(octet);
      return number >= 0 && number <= 255;
    })
  ) {
    return "ipv4";
  }

  return null;
}

/** Country code from the optional CDN header. */
export function countryCodeFromHeaders(headers: Headers): string | null {
  const cf = headers.get("cf-ipcountry");
  if (cf && cf !== "XX") return cf.toUpperCase();

  return null;
}

/** Synchronous geo from request headers — no external lookup. */
export function geoFromHeaders(headers: Headers): RequestGeo {
  const ipRaw = clientIpFrom(headers);
  const ip = isPublicIp(ipRaw) ? ipRaw : null;
  const countryCode = countryCodeFromHeaders(headers);
  const hasCf = Boolean(headers.get("cf-ipcountry"));

  return {
    ip,
    countryCode,
    city: null,
    region: null,
    capital: null,
    timezone: "UTC",
    source: hasCf ? "cloudflare" : "none",
  };
}

type IpWhoResponse = {
  success?: boolean;
  country_code?: string;
  city?: string;
  region?: string;
  capital?: string;
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
    capital: data.capital ?? null,
    timezone: data.timezone?.id ?? "UTC",
    source: "ipwho",
  };
}

export type GeoResolveOptions = {
  /** Also resolve city, capital and timezone when a CDN only supplies country. */
  enrichDetails?: boolean;
};

/** Header-based geo with IP lookup fallback for Hostinger. */
export async function resolveRequestGeo(
  headers: Headers,
  options?: GeoResolveOptions,
): Promise<RequestGeo> {
  const base = geoFromHeaders(headers);
  const shouldLookup = Boolean(base.ip) &&
    (options?.enrichDetails === true || !base.countryCode);
  if (!shouldLookup || !base.ip) return base;

  try {
    const enriched = await lookupGeoFromIp(base.ip);
    if (!enriched.countryCode && !enriched.city && !enriched.capital) return base;

    return {
      ip: base.ip,
      countryCode: enriched.countryCode ?? base.countryCode,
      city: enriched.city ?? base.city,
      region: enriched.region ?? base.region,
      capital: enriched.capital ?? base.capital,
      timezone: enriched.timezone ?? base.timezone,
      source: enriched.source === "ipwho" ? "ipwho" : base.source,
    };
  } catch {
    return base;
  }
}
