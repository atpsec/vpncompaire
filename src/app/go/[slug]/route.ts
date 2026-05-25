import { getAffiliate, isAllowedRedirectHost } from "@/lib/affiliate";

export const dynamic = "force-dynamic";
export const runtime = "edge";

/**
 * Affiliate redirect handler.
 *
 * Güvenlik katmanları:
 *  1) Slug regex doğrulaması (yalnızca [a-z0-9-], 1-32 karakter)
 *  2) Bilinen affiliate map'inde olma kontrolü
 *  3) URL parse edilebilirlik kontrolü
 *  4) URL host'unun allowlist'te olma kontrolü (open-redirect savunması)
 *  5) Cache-Control: no-store (tıklama analitiği için doğru sayım)
 *  6) Referrer-Policy: no-referrer (hedef siteye ek bilgi sızdırma)
 *  7) X-Robots-Tag: noindex, nofollow (arama motorlarında index'lenmesin)
 */

const SLUG_PATTERN = /^[a-z0-9-]{1,32}$/;

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

export async function GET(_req: Request, { params }: Context): Promise<Response> {
  const { slug } = await params;

  if (!SLUG_PATTERN.test(slug)) {
    return textResponse("Geçersiz bağlantı.", 400);
  }

  const link = getAffiliate(slug);
  if (!link) {
    return textResponse("Bilinmeyen bağlantı.", 404);
  }

  if (!isAllowedRedirectHost(link.url)) {
    // Asla buraya ulaşılmamalı (allowlist hem affiliate.ts'te hem burada).
    // Ulaşılırsa bu kritik bir yapılandırma hatasıdır.
    console.error(
      `[/go/${slug}] Reddedildi: ${link.url} allowlist'te değil.`,
    );
    return textResponse("İzin verilmeyen hedef.", 403);
  }

  const target = new URL(link.url);
  if (link.hasProgram) {
    target.searchParams.set("utm_source", "vpncompaire");
    target.searchParams.set("utm_medium", "affiliate");
    target.searchParams.set("utm_campaign", `${slug}-go`);
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
