import { env } from "@/env";

/**
 * Reject browser requests initiated by a different site before a public API
 * performs an expensive lookup or writes visitor data.
 *
 * Fetch Metadata is the strongest signal when present. Origin is checked as
 * a second line of defence for browsers that send it but omit Fetch Metadata.
 * Requests without either header remain allowed for privacy-focused browsers,
 * command-line clients and health checks.
 */
export function isCrossSiteRequest(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();
  if (fetchSite === "cross-site") return true;

  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const requestUrl = new URL(request.url);
    const forwardedProto = firstForwardedValue(
      request.headers.get("x-forwarded-proto"),
    );
    const protocol = forwardedProto
      ? `${forwardedProto}:`
      : requestUrl.protocol;
    const trustedOrigins = new Set<string>([
      new URL(env.NEXT_PUBLIC_SITE_URL).origin,
      requestUrl.origin,
    ]);

    for (const host of [
      firstForwardedValue(request.headers.get("x-forwarded-host")),
      request.headers.get("host")?.trim(),
    ]) {
      if (host) trustedOrigins.add(`${protocol}//${host}`);
    }

    return !trustedOrigins.has(new URL(origin).origin);
  } catch {
    // An invalid Origin is not a trustworthy same-origin signal.
    return true;
  }
}

function firstForwardedValue(value: string | null): string | null {
  const first = value?.split(",", 1)[0]?.trim().toLowerCase();
  return first || null;
}
