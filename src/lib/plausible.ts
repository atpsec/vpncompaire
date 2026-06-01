export type PageViews = {
  slug: string;
  views: number;
};

export type PostView = {
  slug: string;
  views: number;
  title?: string;
};

import { env } from "@/env";

/** Strip scheme and any trailing slash so Plausible's site_id matches exactly. */
function plausibleSiteId(siteUrl: string): string {
  return siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export async function getPageViews(slug: string): Promise<number> {
  const apiKey = env.PLAUSIBLE_API_KEY;
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;

  // Strict validation: both must be set
  if (!apiKey || !siteUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Plausible configuration incomplete (API key or site URL missing)");
    }
    return 0;
  }

  const siteId = plausibleSiteId(siteUrl);

  try {
    const response = await fetch(
      `https://plausible.io/api/v1/stats/breakdown?site_id=${siteId}&period=6mo&property=event:page&filters=event:page==/blog/${encodeURIComponent(slug)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error(`Plausible API error: ${response.status}`);
      }
      return 0;
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].visitors || 0;
    }

    return 0;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch page views:", error);
    }
    return 0;
  }
}

export async function getTopPosts(limit = 10): Promise<PostView[]> {
  const apiKey = env.PLAUSIBLE_API_KEY;
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;

  // Strict validation: both must be set
  if (!apiKey || !siteUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Plausible configuration incomplete (API key or site URL missing)");
    }
    return [];
  }

  const siteId = plausibleSiteId(siteUrl);

  try {
    const response = await fetch(
      `https://plausible.io/api/v1/stats/breakdown?site_id=${siteId}&period=30d&property=event:page&filters=event:page==/blog/**&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error(`Plausible API error: ${response.status}`);
      }
      return [];
    }

    const data = await response.json();

    if (data.results) {
      return data.results.map((result: { page: string; visitors: number }) => {
        const slug = result.page.replace(/^\/blog\//, "").replace(/\/$/, "");
        return {
          slug,
          views: result.visitors,
        };
      });
    }

    return [];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch top posts:", error);
    }
    return [];
  }
}

export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
