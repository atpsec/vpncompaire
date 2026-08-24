import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { getVisibleBlogPostSummaries } from "@/lib/blog";
import { getBlogImage } from "@/lib/unsplash";

export async function AiEditorialBlock() {
  const posts = (await getVisibleBlogPostSummaries("en"))
    .filter(
      (post) =>
        post.category === "yapay-zeka-vpn" ||
        post.tags.some((tag) => /ai|privacy|chatgpt|claude|gemini/i.test(tag)),
    )
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="border-y border-border bg-brand-50/30 py-14 sm:py-18" aria-labelledby="ai-editorial-heading">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-700">AI privacy desk</div>
            <h2 id="ai-editorial-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-strong">Safer AI use starts with better privacy decisions</h2>
            <p className="mt-3 text-ink-muted">Practical, source-led articles about AI data controls, account security and the role of a VPN.</p>
          </div>
          <Link href="/ai" className="shrink-0 text-sm font-semibold text-brand-700 hover:underline">Explore the AI privacy hub →</Link>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {posts.map((post) => {
            const image = getBlogImage(post.coverImage, "hero", post.slug);
            return (
              <article key={post.slug} className="overflow-hidden rounded-2xl border border-border bg-surface-base shadow-sm">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-subtle"><Image src={image.url} alt={post.title} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" /></div>
                </Link>
                <div className="p-5">
                  <h3 className="line-clamp-2 text-lg font-bold leading-snug text-ink-strong"><Link href={`/blog/${post.slug}`} className="hover:text-brand-700">{post.title}</Link></h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
