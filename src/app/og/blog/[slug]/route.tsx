import { ImageResponse } from "next/og";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import type { BlogLocale } from "@/lib/blog-slugs";
import { getBlogImage } from "@/lib/unsplash";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

type RouteParams = { params: Promise<{ slug: string }> };

function isBlogLocale(value: string | null): value is BlogLocale {
  return value === "tr" || value === "en" || value === "de";
}

export async function generateStaticParams() {
  const [trPosts, enPosts, dePosts] = await Promise.all([
    getBlogPosts("tr"),
    getBlogPosts("en"),
    getBlogPosts("de"),
  ]);
  const slugs = new Set<string>();
  trPosts.forEach((p) => {
    if (p.slug) slugs.add(p.slug);
  });
  enPosts.forEach((p) => {
    if (p.slug) slugs.add(p.slug);
  });
  dePosts.forEach((p) => {
    if (p.slug) slugs.add(p.slug);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}

async function findPost(slug: string, preferredLocale?: BlogLocale) {
  const locales = Array.from(
    new Set([preferredLocale, "tr", "en", "de"].filter(Boolean)),
  ) as BlogLocale[];

  for (const locale of locales) {
    const post = await getBlogPost(slug, locale);
    if (post) return { post, locale };
  }

  return null;
}

export async function GET(req: Request, ctx: RouteParams) {
  const { slug } = await ctx.params;
  const requestedLocale = new URL(req.url).searchParams.get("locale");
  const found = await findPost(
    slug,
    isBlogLocale(requestedLocale) ? requestedLocale : undefined,
  );

  const fallbackTitle = "VPN Advisor - VPN reviews & guides";
  const title = found?.post.frontmatter.title ?? fallbackTitle;
  const category = found?.post.frontmatter.category ?? "blog";
  const coverImageKey = found?.post.frontmatter.coverImage ?? "vpn-basics";
  const heroUrl = getBlogImage(coverImageKey, "hero").url;
  const heroSrc = heroUrl.startsWith("/")
    ? new URL(heroUrl, req.url).toString()
    : heroUrl;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui",
          color: "white",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(37,99,235,0.75) 100%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: 80,
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 800,
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              V
            </div>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
              VPN Advisor
            </span>
          </div>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "8px 16px",
                background: "rgba(245, 158, 11, 0.95)",
                color: "#1c1917",
                borderRadius: 999,
              }}
            >
              {category.replace(/-/g, " ")}
            </div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -2,
                maxWidth: 1040,
                display: "flex",
              }}
            >
              {title.length > 110 ? title.slice(0, 107) + "..." : title}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
