import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Authorized Digital Sellers (ads.txt) — Google AdSense doğrulaması.
 *
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID set ise (ca-pub-XXXX) DIRECT satırını döner;
 * publisher ID'nin "ca-" prefix'i ads.txt formatında kullanılmaz (pub-XXXX).
 * ID yoksa boş 204 döner — GA/AdSense ile aynı env-gated davranış.
 */
export function GET() {
  const clientId = siteConfig.adsenseClientId;

  if (!clientId) {
    return new Response(null, { status: 204 });
  }

  // ca-pub-1234... → pub-1234...
  const publisherId = clientId.replace(/^ca-/, "");
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
