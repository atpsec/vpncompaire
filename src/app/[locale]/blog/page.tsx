import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { getBlogPosts } from "@/lib/blog";
import { BlogFilter } from "@/components/blog/blog-filter";
import { BlogStats } from "@/components/blog/blog-stats";
import { JsonLd } from "@/components/seo/json-ld";
import {
  blogCollectionSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { absoluteUrl, localizedAlternates, siteConfig, type Locale } from "@/lib/site";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonical = absoluteUrl("/blog", locale);
  const ogLocale =
    locale === "tr" ? "tr_TR" : locale === "de" ? "de_DE" : "en_US";

  return {
    title,
    description,
    alternates: localizedAlternates("/blog", locale),
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: siteConfig.name,
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = await getBlogPosts(locale);
  const canonical = absoluteUrl("/blog", locale);
  const localePath = locale === "tr" ? "" : `/${locale}`;
  const homeName =
    locale === "tr" ? "Ana Sayfa" : locale === "de" ? "Startseite" : "Home";
  const latestArticlesLabel = t("latestArticles");
  const collectionLd = blogCollectionSchema({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    url: canonical,
    posts: posts.map((post) => ({ slug: post.slug, title: post.title })),
  });
  const breadcrumbLd = breadcrumbSchema(
    [
      { name: homeName, path: `${localePath}/` },
      { name: t("breadcrumbBlog"), path: `${localePath}/blog` },
    ],
    locale,
  );

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={collectionLd} />
      <JsonLd data={breadcrumbLd} />
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
            <BlogStats locale={locale} />
          </div>
        </div>

        {posts.length > 0 ? (
          <>
            <h2 className="sr-only">{latestArticlesLabel}</h2>
            <BlogFilter posts={posts} locale={locale} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-ink-muted">No blog posts available yet.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
