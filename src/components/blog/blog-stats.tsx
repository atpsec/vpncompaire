import { getBlogStats } from "@/lib/blog-stats";
import type { Locale } from "@/lib/site";
import { BlogTotalViewCounter } from "@/components/blog/blog-total-view-counter";
import { Link } from "@/i18n/routing";

type BlogStatsProps = {
  locale: Locale;
};

export async function BlogStats({ locale }: BlogStatsProps) {
  const stats = await getBlogStats(locale);

  const labels = {
    tr: {
      posts: "Blog Yazısı",
      totalViews: "Toplam Okunma",
      totalViewsLoading: "Okunma yükleniyor",
      categories: "Kategori",
      avgReading: "Ort. Okuma",
      minutes: "dk",
      updated: "Son Güncelleme",
    },
    en: {
      posts: "Blog Posts",
      totalViews: "Total article reads",
      totalViewsLoading: "Loading total reads…",
      categories: "Categories",
      avgReading: "Avg. Reading",
      minutes: "min",
      updated: "Last Updated",
    },
    de: {
      posts: "Blogbeiträge",
      totalViews: "Gesamte Aufrufe",
      totalViewsLoading: "Aufrufe werden geladen",
      categories: "Kategorien",
      avgReading: "Ø Lesezeit",
      minutes: "Min.",
      updated: "Aktualisiert",
    },
  };

  const t = labels[locale];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const dateLocale =
      locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US";
    return date.toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-ink-subtle">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1">
        <span className="font-semibold text-foreground">{stats.totalPosts}</span>
        <span>{t.posts}</span>
      </div>

      <BlogTotalViewCounter
        label={t.totalViews}
        loadingLabel={t.totalViewsLoading}
        locale={locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US"}
      />

      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1">
        <span className="font-semibold text-foreground">{stats.categories.length}</span>
        <span>{t.categories}</span>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1">
        <span>{t.avgReading}:</span>
        <span className="font-semibold text-foreground">{stats.avgReadingTime} {t.minutes}</span>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1">
        <span>{t.updated}:</span>
        <span className="font-semibold text-foreground">{formatDate(stats.latestUpdate)}</span>
      </div>

      <Link
        href="/research/blog-readership"
        className="inline-flex items-center px-1 text-xs font-semibold text-brand-700 hover:underline"
      >
        Audit the counter →
      </Link>
    </div>
  );
}
