import { getAffiliate, isAllowedRedirectHost } from "@/lib/affiliate";
import { rateLimit, clientIpFrom } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "edge";

/**
 * Affiliate redirect handler.
 *
 * Güvenlik katmanları:
 *  1) Slug regex doğrulaması (yalnızca [a-z0-9-], 1-32 karakter)
 *  2) Bilinen affiliate map'inde olma kontrolü
 *  3) Hedef URL parse edilebilirlik kontrolü
 *  4) URL host'unun allowlist'te olma kontrolü (open-redirect savunması)
 *  5) Cache-Control: no-store (tıklama analitiği için doğru sayım)
 *  6) Referrer-Policy: no-referrer (hedef siteye ek bilgi sızdırma)
 *  7) X-Robots-Tag: noindex, nofollow (arama motorlarında index'lenmesin)
 *
 * Hedef URL kararı:
 *  - env'de AFFILIATE_<SLUG>_URL set ise: o URL'e gider (tracking aktif).
 *    Sub-id varsa (?source=...) parametresi affiliate URL'e eklenir.
 *  - Yoksa: brand'in public URL'sine utm_* parametreleri eklenerek gider
 *    (tracking yok ama UTM kampanya analizi için işaretli).
 */

const SLUG_PATTERN = /^[a-z0-9-]{1,32}$/;
const SOURCE_PATTERN = /^[a-z0-9_-]{1,32}$/;

type Context = { params: Promise<{ slug: string }> };

const COMMON_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow",
  "Content-Type": "text/plain; charset=utf-8",
};

function textResponse(body: string, status: number): Response {
  return new Response(body, { status, headers: COMMON_HEADERS });
}

export async function GET(req: Request, { params }: Context): Promise<Response> {
  const { slug } = await params;

  if (!SLUG_PATTERN.test(slug)) {
    return textResponse("Geçersiz bağlantı.", 400);
  }

  // Distributed rate limit (Vercel KV). Generous cap — a comparison-shopper may
  // open several links. No-op when KV is unconfigured; fails open on any error.
  const rl = await rateLimit(`go:${clientIpFrom(req.headers)}`, 30, 60);
  if (!rl.allowed) {
    return textResponse("Çok fazla istek. Lütfen biraz sonra tekrar deneyin.", 429);
  }

  const link = getAffiliate(slug);
  if (!link) {
    return textResponse("Bilinmeyen bağlantı.", 404);
  }

  // Optional sub-id / campaign source from caller (e.g. /go/nordvpn?source=review-card)
  const reqUrl = new URL(req.url);
  const rawSource = reqUrl.searchParams.get("source");
  const source =
    rawSource && SOURCE_PATTERN.test(rawSource) ? rawSource : null;

  // Resolve destination URL: env tracking URL if set, else public + utm
  const destinationUrl = link.trackingUrl ?? link.url;

  if (!isAllowedRedirectHost(destinationUrl)) {
    // Asla buraya ulaşılmamalı (allowlist hem affiliate.ts'te hem burada).
    // Ulaşılırsa bu kritik bir yapılandırma hatasıdır.
    console.error(
      `[/go/${slug}] Reddedildi: ${destinationUrl} allowlist'te değil.`,
    );
    return textResponse("İzin verilmeyen hedef.", 403);
  }

  const target = new URL(destinationUrl);

  if (link.trackingUrl) {
    // Tracking URL already carries the affiliate ID. Optionally append
    // a sub-id parameter for campaign attribution. We use a generic
    // "sub1" name; some networks accept this (Impact, Pepperjam), others
    // ignore unknown params. Safe to add.
    if (source) {
      target.searchParams.set("sub1", source);
    }
  } else if (link.hasProgram) {
    // No env tracking URL — fall back to public site with UTM markers
    target.searchParams.set("utm_source", "vpncompaire");
    target.searchParams.set("utm_medium", "affiliate");
    target.searchParams.set(
      "utm_campaign",
      source ? `${slug}-${source}` : `${slug}-go`,
    );
  } else if (source) {
    // No affiliate program at all (e.g. Mullvad) — keep utm_source
    // for our own analytics, no medium/campaign.
    target.searchParams.set("utm_source", "vpncompaire");
    target.searchParams.set("utm_campaign", `${slug}-${source}`);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
