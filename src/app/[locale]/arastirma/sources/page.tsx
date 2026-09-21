import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ExternalLink, LibraryBig } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, datasetSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getResearchSources, researchEdition } from "@/data/research";

type Props = { params: Promise<{ locale: string }> };

const title = "VPN research source registry";
const description = "A public registry of source titles, publishers, source types, URLs, check dates and related evidence records.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return { title, description, alternates: localizedAlternates("/research/sources", "en"), openGraph: { title: `${title} | VPN Advisor`, description, url: absoluteUrl("/research/sources"), type: "article" } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sources = getResearchSources();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Sources", path: "/research/sources" }], "en")} />
      <JsonLd data={datasetSchema({ name: title, description, url: "/research/sources", creator: "/about", dateModified: researchEdition(), distributionUrl: "/api/research/sources", measurementTechnique: "Registry of configured public source records; source presence is not equivalent to claim verification." })} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">Home</Link> › <Link href="/research" className="hover:text-ink">Research</Link> › <span className="text-ink-strong">Sources</span></p>
        <header className="mt-6 max-w-4xl"><span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><LibraryBig className="size-3.5" aria-hidden="true" /> Source registry</span><h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">VPN research source registry</h1><p className="mt-5 text-lg leading-relaxed text-ink-muted">Every configured source has a title, publisher, type, original URL and review state. A source link is not automatically proof of every claim attached to it.</p></header>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border"><table className="min-w-[1000px] w-full text-left text-sm"><caption className="sr-only">VPN Advisor source registry</caption><thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted"><tr><th scope="col" className="px-5 py-4">Source</th><th scope="col" className="px-5 py-4">Provider</th><th scope="col" className="px-5 py-4">Type</th><th scope="col" className="px-5 py-4">Checked</th><th scope="col" className="px-5 py-4">Related evidence</th><th scope="col" className="px-5 py-4">State</th></tr></thead><tbody className="divide-y divide-border bg-surface-base">{sources.map((source) => <tr id={source.id} key={source.id} className="align-top"><th scope="row" className="px-5 py-5 font-semibold text-ink-strong"><Link href={`/research/sources/${source.id}`} className="hover:text-brand-700 hover:underline">{source.title}</Link><a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-normal text-brand-700 hover:underline">Open original <ExternalLink className="size-3" /></a></th><td className="px-5 py-5">{source.providerName}</td><td className="px-5 py-5 text-ink-muted">{source.type}</td><td className="whitespace-nowrap px-5 py-5 text-ink-muted">{source.lastChecked ?? "Not yet checked"}</td><td className="px-5 py-5 text-ink-muted">{source.relatedEvidenceIds.length} field record{source.relatedEvidenceIds.length === 1 ? "" : "s"}</td><td className="px-5 py-5"><span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-semibold text-ink-muted">{source.status}</span></td></tr>)}</tbody></table></div>
      </Container>
    </>
  );
}
