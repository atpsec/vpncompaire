import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { BlogPost } from "@/lib/blog";
import { UnsplashImage } from "./unsplash-image";
import { useTranslations } from "next-intl";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("blog");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <UnsplashImage
            keyword={post.unsplashKeyword}
            alt={post.title}
            width={600}
            height={338}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-700">
          {t(`categories.${post.category}`)}
        </div>

        <Link href={`/blog/${post.slug}`} className="group/title">
          <h3 className="text-xl font-bold text-ink-strong leading-snug group-hover/title:text-accent-600 transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-subtle">
          <span>{t("readingTime", { minutes: post.readingTime })}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-medium text-accent-600 hover:text-accent-700 transition-colors"
          >
            {t("readMore")}
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
