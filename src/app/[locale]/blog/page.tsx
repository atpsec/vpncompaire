import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { getBlogPosts } from "@/lib/blog";
import { BlogFilter } from "@/components/blog/blog-filter";
import { BlogStats } from "@/components/blog/blog-stats";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = await getBlogPosts(locale as "tr" | "en");

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700 mb-4">
            {t("breadcrumbBlog")}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-strong mb-4">
            {t("h1")}
          </h1>

          <p className="text-lg text-ink-muted leading-relaxed">
            {t("intro")}
          </p>

          <div className="mt-6 flex justify-center">
            <BlogStats locale={locale as "tr" | "en"} />
          </div>
        </div>

        {posts.length > 0 ? (
          <BlogFilter posts={posts} locale={locale as "tr" | "en"} />
        ) : (
          <div className="text-center py-12">
            <p className="text-ink-muted">No blog posts available yet.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
