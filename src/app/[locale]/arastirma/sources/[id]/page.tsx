import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ExternalLink, LibraryBig } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { EvidenceTable } from "@/components/research/evidence-table";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getResearchSource, getResearchSources, getAllResearchEvidence } from "@/data/research";

type Props = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return getResearchSources().map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const source = getResearchSource(id);
  if (!source) return {};
  return { title: `${source.title} — source record`, description: source.notes ?? source.title, alternates: localizedAlternates(`/research/sources/${id}`, "en"), openGraph: { title: `${source.title} — source record | VPN Advisor`, url: absoluteUrl(`/research/sources/${id}`), type: "article" } };
}

export default async function Page({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const source = getResearchSource(id);
  if (!source) notFound();
  const evidence = getAllResearchEvidence().filter((item) => item.sourceId === id);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Sources", path: "/research/sources" }, { name: source.title, path: `/research/sources/${id}` }], "en")} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: source.title, description: source.notes ?? source.title, url: absoluteUrl(`/research/sources/${id}`), dateModified: source.lastChecked ?? "2026-09-19", mainEntity: { "@type": "CreativeWork", name: source.title, url: source.url, publisher: { "@type": "Organization", name: source.publisher } } }} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">Home</Link> › <Link href="/research" className="hover:text-ink">Research</Link> › <Link href="/research/sources" className="hover:text-ink">Sources</Link> › <span className="text-ink-strong">{source.title}</span></p>
        <header className="mt-6 max-w-4xl"><span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><LibraryBig className="size-3.5" aria-hidden="true" /> Source record</span><h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">{source.title}</h1><p className="mt-4 text-lg text-ink-muted">Published by {source.publisher} · {source.type}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline">Open original source <ExternalLink className="size-4" /></a></header>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3"><Fact label="First checked" value={source.firstChecked ?? "Not yet checked"} /><Fact label="Last checked" value={source.lastChecked ?? "Not yet checked"} /><Fact label="Registry state" value={source.status} /></dl>
        <section className="mt-10 rounded-2xl border border-accent-300 bg-accent-50/60 p-6 dark:bg-accent-950/20"><h2 className="font-semibold text-ink-strong">Source interpretation</h2><p className="mt-2 text-sm leading-relaxed text-ink-muted">{source.notes ?? "This source is registered for future field-level review."} Source presence does not turn a provider statement into independent verification.</p></section>
        <section className="mt-12"><h2 className="text-3xl font-bold tracking-tight text-ink-strong">Related evidence records</h2><div className="mt-6"><EvidenceTable items={evidence} showProvider /></div></section>
      </Container>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-border bg-surface-subtle/50 p-4"><dt className="text-xs uppercase tracking-wide text-ink-muted">{label}</dt><dd className="mt-2 font-semibold text-ink-strong">{value}</dd></div>; }
