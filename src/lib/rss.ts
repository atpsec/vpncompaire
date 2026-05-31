import "server-only";

export type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  author: string;
  guid: string;
  categories: string[];
};

export type RssFeedOptions = {
  title: string;
  description: string;
  link: string;
  feedUrl: string;
  language: string;
  items: RssItem[];
};

/**
 * Escape XML special characters in plain-text contexts (attributes, element
 * text where CDATA is not used).
 */
function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Wrap content in CDATA. Splits any literal `]]>` occurrence so the CDATA is
 * not closed prematurely.
 */
function cdata(input: string): string {
  const safe = input.replace(/]]>/g, "]]]]><![CDATA[>");
  return `<![CDATA[${safe}]]>`;
}

/**
 * Generate a standards-compliant RSS 2.0 XML document.
 *
 * - Includes the atom namespace and `atom:link` self-reference (rel="self").
 * - Uses CDATA for `title`, `description` and item-level title/description so
 *   authored HTML/punctuation passes through safely.
 * - Emits `pubDate` in RFC 822 format via `toUTCString()`.
 */
export function generateRssFeed(opts: RssFeedOptions): string {
  const { title, description, link, feedUrl, language, items } = opts;
  const lastBuildDate = (
    items[0]?.pubDate ?? new Date()
  ).toUTCString();

  const itemsXml = items
    .map((item) => {
      const categoriesXml = item.categories
        .map((c) => `      <category>${cdata(c)}</category>`)
        .join("\n");

      return `    <item>
      <title>${cdata(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
      <description>${cdata(item.description)}</description>
      <author>${escapeXml(item.author)}</author>${
        categoriesXml ? `\n${categoriesXml}` : ""
      }
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${cdata(title)}</title>
    <link>${escapeXml(link)}</link>
    <description>${cdata(description)}</description>
    <language>${escapeXml(language)}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}
