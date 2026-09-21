import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Database, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getResearchProviders, getResearchStats } from "@/data/research";

type Props = { params: Promise<{ locale: string }> };

const title = "VPN provider evidence profiles";
const description = "Canonical VPN provider evidence profiles with field-level statuses, source links and verification dates.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return {
    title,
    description,
    alternates: localizedAlternates("/research/providers", "en"),
    openGraph: { title: `${title} | VPN Advisor`, description, url: absoluteUrl("/research/providers"), type: "website" },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const providers = getResearchProviders();
  const stats = getResearchStats();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Provider evidence", path: "/research/providers" }], "en")} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: absoluteUrl("/research/providers"), numberOfItems: providers.length, isPartOf: { "@type": "WebSite", name: "VPN Advisor", url: absoluteUrl("/") } }} />
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted"><Link href="/" className="hover:text-ink">Home</Link> › <Link href="/research" className="hover:text-ink">Research</Link> › <span className="text-ink-strong">Provider evidence</span></p>
        <header className="mt-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"><Database className="size-3.5" aria-hidden="true" /> Canonical evidence profiles</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl">VPN provider evidence profiles</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">Each profile is generated from the same structured evidence records used by the question pages and JSON endpoints. Missing sources remain visible instead of becoming implied facts.</p>
        </header>
        <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="Research profile summary">
          <Metric value={stats.providersTracked} label="providers tracked" />
          <Metric value={stats.evidenceRecords} label="field records" />
          <Metric value={stats.needsReview} label="records needing review" />
        </section>
        <section className="mt-12 grid gap-5 md:grid-cols-2">
          {providers.map((provider) => (
            <Card key={provider.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Evidence profile</p>
                  <h2 className="mt-2 text-2xl font-bold text-ink-strong"><Link href={`/research/providers/${provider.slug}`} className="hover:text-brand-700 hover:underline">{provider.name}</Link></h2>
                </div>
                <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs text-ink-muted">{provider.affiliate ? "Affiliate relationship disclosed" : "No affiliate relationship recorded"}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{provider.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold">
                <Link href={`/research/providers/${provider.slug}`} className="inline-flex items-center gap-1 text-brand-700 hover:underline">Open evidence profile <ArrowRight className="size-4" aria-hidden="true" /></Link>
                <a href={provider.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink-muted hover:text-ink-strong">Official site <ExternalLink className="size-3.5" aria-hidden="true" /></a>
              </div>
            </Card>
          ))}
        </section>
        <p className="mt-10 text-sm leading-relaxed text-ink-muted">These are evidence records, not rankings or security certifications. Read the <Link href="/methodology" className="font-semibold text-brand-700 hover:underline">sources and limitations</Link> before using a record.</p>
      </Container>
    </>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return <div className="rounded-xl border border-border bg-surface-subtle/60 p-4"><p className="text-2xl font-bold tabular-nums text-ink-strong">{value}</p><p className="mt-1 text-sm text-ink-muted">{label}</p></div>;
}
