import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ExternalLink, FileSearch, Link2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { EvidenceTable } from "@/components/research/evidence-table";
import { LastVerified } from "@/components/research/freshness";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getProviderEvidenceBySlug, getResearchProvider, getResearchProviders } from "@/data/research";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getResearchProviders().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = getResearchProvider(slug);
  if (!provider) return {};
  const title = `${provider.name} Evidence Profile`;
  const description = `${provider.name} field-level evidence profile with source status, limitations and verification dates.`;
  return { title, description, alternates: localizedAlternates(`/research/providers/${slug}`, "en"), openGraph: { title: `${title} | VPN Advisor`, description, url: absoluteUrl(`/research/providers/${slug}`), type: "article" } };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const provider = getResearchProvider(slug);
  if (!provider) notFound();
  const evidence = getProviderEvidenceBySlug(slug);
  const sourceCount = new Set(evidence.filter((item) => item.sourceId).map((item) => item.sourceId)).size;
  const nonUnknown = evidence.filter((item) => item.value !== null).length;
  const pageTitle = `${provider.name} Evidence Profile`;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Provider evidence", path: "/research/providers" }, { name: provider.name, path: `/research/providers/${slug}` }], "en")} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", "@id": `${absoluteUrl(`/research/providers/${slug}`)}#page`, name: pageTitle, description: provider.summary, url: absoluteUrl(`/research/providers/${slug}`), dateModified: provider.updatedAt, about: { "@type": "Organization", name: provider.name, url: provider.website }, isPartOf: { "@type": "WebSite", name: "VPN Advisor", url: absoluteUrl("/") } }} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">Home</Link> › <Link href="/research" className="hover:text-ink">Research</Link> › <Link href="/research/providers" className="hover:text-ink">Provider evidence</Link> › <span className="text-ink-strong">{provider.name}</span></p>
        <header className="mt-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><FileSearch className="size-3.5" aria-hidden="true" /> Structured provider record</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">{pageTitle}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{provider.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><LastVerified value={provider.lastVerified} /><a href={provider.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline">Official website <ExternalLink className="size-3.5" aria-hidden="true" /></a><Link href={`/reviews/${provider.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline">Legacy profile <Link2 className="size-3.5" aria-hidden="true" /></Link></div>
        </header>
        <Card className="mt-8 border-brand-200 bg-brand-50/40 p-5 dark:bg-brand-950/20">
          <h2 className="font-semibold text-ink-strong">How to read this profile</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">Provider claims, partial source links and unknown fields are kept separate. “Verified” describes the evidence record shown here, not a blanket guarantee about the provider. Affiliate relationships do not change evidence status or source interpretation.</p>
        </Card>
        <section id="evidence" className="mt-12" aria-labelledby="evidence-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Citation-ready record</p><h2 id="evidence-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-strong">Field-level evidence</h2><p className="mt-3 text-sm text-ink-muted">{nonUnknown} of {evidence.length} tracked fields currently have a value; {sourceCount} source records are attached.</p></div><Link href="/research/sources" className="text-sm font-semibold text-brand-700 hover:underline">Browse source registry</Link></div>
          <div className="mt-6"><EvidenceTable items={evidence} /></div>
        </section>
        <section id="limitations" className="mt-12 rounded-2xl border border-border bg-surface-subtle/50 p-6"><h2 className="text-xl font-bold text-ink-strong">Open research gaps</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted"><li>Field-specific official links are still missing for several provider claims.</li><li>Audit scope, exclusions and publication dates have not been normalized for every linked audit record.</li><li>Unknown does not mean false; it means the canonical dataset does not currently carry usable evidence.</li></ul></section>
      </Container>
    </>
  );
}
