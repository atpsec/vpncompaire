import { getBlogStats } from "@/lib/blog-stats";

type BlogStatsProps = {
  locale: "tr" | "en";
};

export async function BlogStats({ locale }: BlogStatsProps) {
  const stats = await getBlogStats(locale);

  const labels = {
    tr: {
      posts: "Blog Yazısı",
      categories: "Kategori",
      avgReading: "Ort. Okuma",
      minutes: "dk",
      updated: "Son Güncelleme",
    },
    en: {
      posts: "Blog Posts",
      categories: "Categories",
      avgReading: "Avg. Reading",
      minutes: "min",
      updated: "Last Updated",
    },
  };

  const t = labels[locale];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return locale === "tr"
      ? date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
      : date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-ink-subtle">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1">
        <span className="font-semibold text-foreground">{stats.totalPosts}</span>
        <span>{t.posts}</span>
      </div>

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
    </div>
  );
}
