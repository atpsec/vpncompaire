"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { BlogPost } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import type { Locale } from "@/lib/site";

type BlogFilterProps = {
  posts: BlogPost[];
  locale: Locale;
};

export function BlogFilter({ posts, locale }: BlogFilterProps) {
  const t = useTranslations("blog");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Build category list with counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    for (const post of posts) {
      categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
    }
    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const allLabel =
    locale === "tr" ? "Tümü" : locale === "de" ? "Alle" : "All";

  return (
    <div>
      {/* Category filter chips */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedCategory === null
              ? "border-accent-500 bg-accent-500 text-white"
              : "border-border bg-surface-base text-ink-muted hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
          }`}
        >
          {allLabel}
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              selectedCategory === null
                ? "bg-background/20 text-white"
                : "bg-ink-subtle/10 text-ink-subtle"
            }`}
          >
            {posts.length}
          </span>
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          return (
            <button
              key={category.name}
              type="button"
              onClick={() => setSelectedCategory(category.name)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isSelected
                  ? "border-accent-500 bg-accent-500 text-white"
                  : "border-border bg-surface-base text-ink-muted hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
              }`}
            >
              {t(`categories.${category.name}`)}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isSelected
                    ? "bg-background/20 text-white"
                    : "bg-ink-subtle/10 text-ink-subtle"
                }`}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filtered posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-ink-muted">
            {locale === "tr"
              ? "Bu kategoride henüz yazı yok."
              : locale === "de"
                ? "In dieser Kategorie gibt es noch keine Beiträge."
              : "No posts in this category yet."}
          </p>
        </div>
      )}
    </div>
  );
}
