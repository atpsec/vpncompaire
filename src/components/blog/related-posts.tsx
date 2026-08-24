import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { BlogPost } from "@/lib/blog";
import { getBlogImage } from "@/lib/unsplash";
import { BlogCard } from "./blog-card";

type RelatedPostsProps = {
  posts: BlogPost[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const t = useTranslations("blog");

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-border pt-12">
      <h2 className="text-2xl font-bold text-ink-strong mb-6">
        {t("relatedPosts")}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const imageUrl = getBlogImage(post.coverImage, "hero").url;

          return (
            <BlogCard key={post.slug} post={{ ...post, imageUrl }} />
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
        >
          <ArrowLeft className="size-4" />
          {t("backToBlog")}
        </Link>
      </div>
    </section>
  );
}
