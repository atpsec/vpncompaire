import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { getVisibleBlogPostSummaries } from "@/lib/blog";
import { getBlogImage } from "@/lib/unsplash";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "AI, Privacy and VPN Security";
  const description =
    "Practical guides to AI privacy, ChatGPT and Claude data controls, API key security, browser privacy and VPN choices.";
  const canonical = absoluteUrl("/ai", "en");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: canonical, "x-default": canonical },
    },
    openGraph: { title, description, url: canonical, type: "website" },
    robots: { index: true, follow: true },
  };
}

export default async function AiHubPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "en" ? "en" : "en";
  setRequestLocale(locale);

  const posts = (await getVisibleBlogPostSummaries(locale))
    .filter(
      (post) =>
        post.category === "yapay-zeka-vpn" ||
        post.tags.some((tag) => /ai|privacy|chatgpt|claude|gemini/i.test(tag)),
    )
    .slice(0, 12);

  const canonical = absoluteUrl("/ai", "en");
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI, Privacy and VPN Security",
    description:
      "Evidence-led guidance for protecting AI conversations, credentials and connected devices.",
    url: canonical,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "VPN Advisor", url: absoluteUrl("/") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`, "en"),
      })),
    },
  };

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={pageSchema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "AI privacy and VPN security", item: canonical },
          ],
        }}
      />
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            AI privacy research
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">
            AI, privacy and VPN security
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Clear, practical guidance for protecting AI conversations, API keys, accounts and devices without overstating what a VPN can do.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/best-vpn/privacy" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
              Compare privacy-focused VPNs
            </Link>
            <Link href="/security-tools" className="rounded-full border border-border bg-surface-base px-5 py-2.5 text-sm font-semibold text-ink-strong hover:border-brand-300">
              Run security checks
            </Link>
          </div>
        </header>

        <section className="mt-12" aria-labelledby="ai-guides-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="ai-guides-heading" className="text-2xl font-bold text-ink-strong sm:text-3xl">
                AI privacy guides
              </h2>
              <p className="mt-2 text-ink-muted">Updated explainers on data controls, identity protection and safer AI workflows.</p>
            </div>
            <Link href="/blog" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:block">Browse all articles →</Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const image = getBlogImage(post.coverImage, "hero", post.slug);
              return (
                <article key={post.slug} className="overflow-hidden rounded-2xl border border-border bg-surface-base shadow-sm transition-shadow hover:shadow-md">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden bg-surface-subtle">
                      <Image src={image.url} alt={post.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-accent-700">AI & privacy</div>
                    <h3 className="mt-2 line-clamp-3 text-lg font-bold leading-snug text-ink-strong">
                      <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">{post.title}</Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{post.description}</p>
                    <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:underline">Read the guide →</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 grid gap-6 border-t border-border pt-10 md:grid-cols-3">
          <div><h2 className="font-bold text-ink-strong">What a VPN can protect</h2><p className="mt-2 text-sm leading-relaxed text-ink-muted">A VPN can encrypt the connection between your device and the VPN server, reducing exposure on untrusted networks.</p></div>
          <div><h2 className="font-bold text-ink-strong">What it cannot protect</h2><p className="mt-2 text-sm leading-relaxed text-ink-muted">A VPN does not replace strong passwords, MFA, careful sharing or the privacy controls inside an AI service.</p></div>
          <div><h2 className="font-bold text-ink-strong">How to choose carefully</h2><p className="mt-2 text-sm leading-relaxed text-ink-muted">Check documented logging, audits, protocols, device support and renewal pricing before choosing a provider.</p></div>
        </section>
      </Container>
    </div>
  );
}
