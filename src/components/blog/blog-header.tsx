"use client";

import { Clock, Calendar, Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { BlogPostFrontmatter } from "@/lib/blog";
import type { Locale } from "@/lib/site";

type BlogHeaderProps = {
  post: BlogPostFrontmatter;
};

export function BlogHeader({ post }: BlogHeaderProps) {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const dateLocale = locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US";
  const publishedDate = new Intl.DateTimeFormat(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));
  const updatedDate = new Intl.DateTimeFormat(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.updatedAt));
  const isUpdated = post.updatedAt !== post.publishedAt;
  const displayedDate = isUpdated ? updatedDate : publishedDate;
  const dateLabel = isUpdated ? t("updatedOn") : t("publishedOn");
  const publisherLabel = "VPN Advisor";

  return (
    <header className="space-y-4">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-700">
        {t(`categories.${post.category}`)}
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-strong leading-tight">
        {post.title}
      </h1>

      <p className="text-lg text-ink-muted leading-relaxed">
        {post.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-ink-subtle">
        <div className="flex items-center gap-1.5">
          <Building2 className="size-4" />
          <span>{publisherLabel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="size-4" />
          <span>{dateLabel}: {displayedDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-4" />
          <span>{t("readingTime", { minutes: post.readingTime })}</span>
        </div>
      </div>
    </header>
  );
}
