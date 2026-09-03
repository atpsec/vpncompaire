import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Database, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogAuditPanel } from "@/components/blog/blog-audit-panel";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const title = "Blog Readership Audit — VPN Advisor";
const description =
  "A public, machine-readable audit snapshot of VPN Advisor article reads, counting rules, timestamps and consistency checks.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return {
    title,
    description,
    alternates: localizedAlternates("/research/blog-readership", "en"),
    openGraph: {
      title,
      description,
      url: absoluteUrl("/research/blog-readership"),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const pageUrl = absoluteUrl("/research/blog-readership");
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${pageUrl}#dataset`,
    name: title,
    description,
    url: pageUrl,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    measurementTechnique:
      "Server-side accepted article-read events after eight seconds of visible page time, with pseudonymous 48-hour deduplication.",
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: "Research", path: "/research" },
            { name: "Blog readership audit", path: "/research/blog-readership" },
          ],
          "en",
        )}
      />
      <JsonLd data={pageSchema} />

      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">Home</Link> ›{" "}
          <Link href="/research" className="hover:text-ink">Research</Link> ›{" "}
          <span className="text-ink-strong">Blog readership audit</span>
        </p>

        <header className="mt-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <Database className="size-3.5" aria-hidden="true" />
            Public counter register
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl lg:text-6xl">
            Blog readership you can inspect.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
            This page exposes the same server-side snapshot as the JSON endpoint. It shows which articles are included, how reads qualify, when the latest read was accepted and whether the total matches the article-level sum.
          </p>
          <a
            href="/api/blog-readership-audit"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
          >
            Open machine-readable JSON <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </header>

        <BlogAuditPanel />
      </Container>
    </>
  );
}
