import { NextResponse, type NextRequest } from "next/server";
import {
  blogReaderToken,
  blogSlugExists,
  getBlogViewCount,
  isValidBlogSlug,
  recordBlogView,
} from "@/lib/blog-views";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
  "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  Vary: "Sec-Fetch-Site",
};

type Context = { params: Promise<{ slug: string }> };

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: RESPONSE_HEADERS });
}

async function validateSlug(context: Context): Promise<string | null> {
  const { slug } = await context.params;
  return isValidBlogSlug(slug) && blogSlugExists(slug) ? slug : null;
}

export async function GET(request: NextRequest, context: Context) {
  const slug = await validateSlug(context);
  if (!slug) return errorResponse("not_found", 404);

  const limiter = await rateLimit(`blog-views:read:${clientIpFrom(request.headers)}`, 120, 60);
  if (!limiter.allowed) return errorResponse("rate_limited", 429);

  const result = await getBlogViewCount(slug);
  return NextResponse.json(result, { headers: RESPONSE_HEADERS });
}

export async function POST(request: NextRequest, context: Context) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return errorResponse("same_origin_only", 403);
  }

  const slug = await validateSlug(context);
  if (!slug) return errorResponse("not_found", 404);

  const clientIp = clientIpFrom(request.headers);
  const [clientLimit, slugLimit] = await Promise.all([
    rateLimit(`blog-views:write:${clientIp}`, 30, 60),
    rateLimit(`blog-views:slug:${slug}`, 600, 60),
  ]);
  if (!clientLimit.allowed || !slugLimit.allowed) {
    return errorResponse("rate_limited", 429);
  }

  const result = await recordBlogView(slug, blogReaderToken(request.headers));
  return NextResponse.json(result, { headers: RESPONSE_HEADERS });
}
