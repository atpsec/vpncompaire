import {
  ArrowRight,
  ArrowLeftRight,
  Clock3,
  CreditCard,
  FileCheck2,
  Gauge,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { getVisibleBlogPostSummaries, type BlogPostSummary } from "@/lib/blog";
import { getBlogImage } from "@/lib/unsplash";
import type { Locale } from "@/lib/site";

type HomeBlogColumnsProps = {
  locale: Locale;
};

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Selects a new-looking set once per day without changing on every request.
 * The pool is limited to recent indexable posts so rotation never buries the
 * most useful editorial work under arbitrary old content.
 */
function rotatingPosts(posts: BlogPostSummary[], locale: Locale): BlogPostSummary[] {
  const daySeed = Math.floor(Date.now() / 86_400_000);
  const pool = posts.slice(0, 40);

  return pool
    .map((post) => ({
      post,
      score: hashString(`${locale}:${daySeed}:${post.slug}`),
    }))
    .sort((a, b) => a.score - b.score)
    .map(({ post }) => post)
    .slice(0, 8);
}

function categoryLabel(
  tBlog: (key: string) => string,
  category: string,
): string {
  const key = `categories.${category}`;
  try {
    return tBlog(key);
  } catch {
    return category;
  }
}

function FeaturedArticle({
  post,
  tBlog,
}: {
  post: BlogPostSummary;
  tBlog: (key: string, values?: Record<string, string | number>) => string;
}) {
  const image = getBlogImage(post.coverImage, "hero", post.slug);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface-base shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-subtle">
          <Image
            src={image.url}
            alt={post.title}
            fill
            sizes="(max-width: 1023px) 50vw, 42vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent-700">
          <span className="rounded-full bg-accent-50 px-2.5 py-1">
            {categoryLabel(tBlog, post.category)}
          </span>
          <span className="text-ink-faint">•</span>
          <span className="inline-flex items-center gap-1 text-ink-subtle normal-case tracking-normal">
            <Clock3 className="size-3" aria-hidden="true" />
            {tBlog("readingTime", { minutes: post.readingTime })}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`} className="group/title">
          <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug text-ink-strong transition-colors group-hover/title:text-accent-600">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {post.description}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-700"
        >
          {tBlog("readMore")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function CompactArticle({
  post,
  tBlog,
}: {
  post: BlogPostSummary;
  tBlog: (key: string, values?: Record<string, string | number>) => string;
}) {
  const image = getBlogImage(post.coverImage, "hero", post.slug);

  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-surface-subtle"
      >
        <div className="relative h-[72px] w-[108px] shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
          <Image
            src={image.url}
            alt={post.title}
            fill
            sizes="108px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 py-0.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-accent-700">
            {categoryLabel(tBlog, post.category)}
          </div>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink-strong group-hover:text-accent-700">
            {post.title}
          </h3>
          <div className="mt-1 text-[11px] text-ink-subtle">
            {tBlog("readingTime", { minutes: post.readingTime })}
          </div>
        </div>
      </Link>
    </li>
  );
}

function GuideExploreRail({
  tHome,
}: {
  tHome: (key: string, values?: Record<string, string | number>) => string;
}) {
  const links = [
    {
      href: "/vpn-reviews",
      label: tHome("guides.comparisonTitle"),
      description: tHome("guides.comparisonDescription"),
      icon: ArrowLeftRight,
    },
    {
      href: "/best-vpn/travel",
      label: tHome("guides.useCaseTitle"),
      description: tHome("guides.useCaseDescription"),
      icon: ListChecks,
    },
    {
      href: "/tools",
      label: tHome("guides.toolsTitle"),
      description: tHome("guides.toolsDescription"),
      icon: Gauge,
    },
  ];

  return (
    <aside className="rounded-2xl border border-border bg-surface-base p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent-700">
        <ListChecks className="size-3.5" aria-hidden="true" />
        {tHome("guides.exploreKicker")}
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug text-ink-strong">
        {tHome("guides.exploreTitle")}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {tHome("guides.exploreBody")}
      </p>

      <nav className="mt-5" aria-label={tHome("guides.exploreKicker")}>
        <ul className="space-y-2">
          {links.map(({ href, label, description, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-border hover:bg-surface-subtle"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-sm font-semibold text-ink-strong group-hover:text-accent-700">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-subtle">
                    {description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-ink-subtle">
        {tHome("guides.sourceNote")}
      </div>
    </aside>
  );
}

function SelectionMethodCard({
  tHome,
}: {
  tHome: (key: string, values?: Record<string, string | number>) => string;
}) {
  const criteria = [
    {
      label: tHome("guides.sourcesTitle"),
      description: tHome("guides.sourcesDescription"),
      icon: FileCheck2,
    },
    {
      label: tHome("guides.privacyTitle"),
      description: tHome("guides.privacyDescription"),
      icon: ShieldCheck,
    },
    {
      label: tHome("guides.valueTitle"),
      description: tHome("guides.valueDescription"),
      icon: CreditCard,
    },
  ];

  return (
    <section className="mt-5 rounded-2xl border border-border bg-surface-base p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-accent-700">
            {tHome("guides.selectionKicker")}
          </div>
          <h3 className="mt-2 text-lg font-bold leading-snug text-ink-strong">
            {tHome("guides.selectionTitle")}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {tHome("guides.selectionBody")}
          </p>
        </div>
        <Link
          href="/methodology"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-700"
        >
          {tHome("guides.selectionLink")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {criteria.map(({ label, description, icon: Icon }) => (
          <li key={label} className="rounded-xl bg-surface-subtle p-3">
            <Icon className="size-4 text-accent-700" aria-hidden="true" />
            <h4 className="mt-2 text-sm font-semibold text-ink-strong">{label}</h4>
            <p className="mt-1 text-xs leading-relaxed text-ink-subtle">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function HomeBlogColumns({ locale }: HomeBlogColumnsProps) {
  const [posts, tHome, tBlog] = await Promise.all([
    getVisibleBlogPostSummaries(locale),
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "blog" }),
  ]);
  const selected = rotatingPosts(posts, locale);

  if (selected.length === 0) return null;

  const featured = selected.slice(0, 3);
  const compact = selected.slice(3, 8);

  return (
    <section
      aria-labelledby="homepage-blog-heading"
      className="border-y border-border bg-surface-subtle/40 py-16 sm:py-20"
    >
      <Container size="xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {tHome("guides.title")}
            </div>
            <h2
              id="homepage-blog-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl"
            >
              {tBlog("latestArticles")}
            </h2>
            <p className="mt-3 text-ink-muted">{tHome("guides.subtitle")}</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-700"
          >
            {tBlog("backToBlog")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,1.55fr)_minmax(280px,0.8fr)] lg:gap-6 xl:gap-8">
          <GuideExploreRail tHome={tHome} />

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {featured.slice(0, 2).map((post) => (
                <FeaturedArticle key={post.slug} post={post} tBlog={tBlog} />
              ))}
            </div>
            <SelectionMethodCard tHome={tHome} />
          </div>

          <aside className="rounded-2xl border border-border bg-surface-base p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
              <h3 className="font-bold text-ink-strong">{tBlog("latestArticles")}</h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
                {tHome("guides.title")}
              </span>
            </div>
            <ul className="mt-3 divide-y divide-border">
              {[
                ...featured.slice(2),
                ...compact,
              ].map((post) => (
                <CompactArticle key={post.slug} post={post} tBlog={tBlog} />
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
