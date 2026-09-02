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
    return new URL(origin).origin !== new URL(request.url).origin;
  } catch {
    // An invalid Origin is not a trustworthy same-origin signal.
    return true;
  }
}
