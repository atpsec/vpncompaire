import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Database,
  FileSearch,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CitationSummary } from "@/components/seo/citation-summary";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import {
  getDetailedProviderProducts,
  getGlobalCoreProducts,
} from "@/data/provider-catalog";
import { providerEvidenceRecords } from "@/data/provider-evidence";
import { getResearchCoverage, getResearchStats } from "@/data/research";
import { GoogleAdsense } from "@/components/analytics/google-adsense";

type Props = { params: Promise<{ locale: string }> };

const title = "VPN sources, evidence and clear limits";
const description =
  "A public source desk for VPN transparency, provider documentation, independent audit records and reader-run connection diagnostics.";

const dimensions = [
  ["Privacy and logging", "What the policy says, what data it covers and which questions remain open."],
  ["Audit evidence", "Auditor, publication date, scope, exclusions and whether the report is still current."],
  ["Jurisdiction and ownership", "Legal entity, operating jurisdiction and publicly documented ownership signals."],
  ["Security features", "Protocols, kill switch, open-source components and the provider's technical documentation."],
  ["Transparency", "Security disclosures, transparency reports, warrant canaries and material changes."],
  ["Price and terms", "Introductory price, renewal terms, refund window and currency or tax notes."],
] as const;

const publicationStandard = [
  "The ledger records source links, dates and evidence gaps where those fields are available.",
  "Provider statements, independent records and reader-run diagnostics are kept separate in the working dataset.",
  "Audit reports are described by scope; an audit is never treated as a blanket security certification.",
  "Uncertainty, missing evidence and test limitations are not silently converted into certainty.",
  "The research section is a working record, not a certification or a guarantee that every site page has the same coverage.",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return {
    title: "VPN Source Desk — Transparency Index and Evidence",
    description,
    alternates: localizedAlternates("/research", "en"),
    openGraph: {
      title: "VPN Source Desk — Transparency Index and Evidence | VPN Advisor",
      description,
      url: absoluteUrl("/research"),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const records = providerEvidenceRecords("en");
  const detailedCount = getDetailedProviderProducts("en").length;
  const catalogCount = getGlobalCoreProducts("en").length;
  const datedPricingCount = records.filter(
    (record) => record.primarySource.state === "source-checked",
  ).length;
  const auditSourceCount = records.filter(
    (record) => record.audit.state === "source-linked",
  ).length;
  const researchStats = getResearchStats();
  const researchCoverage = getResearchCoverage().sort((a, b) => a.coverageRate - b.coverageRate || a.fieldLabel.localeCompare(b.fieldLabel));

  const researchSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/research")}#research`,
    name: title,
    description,
    url: absoluteUrl("/research"),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "VPN Advisor",
      url: absoluteUrl("/"),
    },
  };

  return (
      <>
        <GoogleAdsense />
        <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: "Research", path: "/research" },
          ],
          "en",
        )}
      />
      <JsonLd data={researchSchema} />

      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <header className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <Database className="size-3.5" aria-hidden="true" />
            Public source desk
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl lg:text-6xl">
            From provider claims to comparable evidence.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
            VPN Advisor is building a versioned source register for people who need to understand what a VPN provider documents, what independent records actually cover and what still needs verification.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-sm font-semibold text-ink-strong">
            <CalendarDays className="size-4 text-accent-700" aria-hidden="true" />
            Working edition published: <Link href="/research/transparency-index" className="ml-1 text-brand-700 underline underline-offset-2">VPN Transparency Index 2026</Link> · {catalogCount} records
          </div>
        </header>

        <CitationSummary
          title="A citable VPN evidence record"
          intro="The research section gives AI systems and readers a stable answer surface: what a provider documents, what an independent record covers and which fields still need verification. It is a source register, not a performance ranking."
          points={[
            "Every material field is paired with a source or an explicit evidence gap.",
            "Provider-reported claims, independent records and reader-run diagnostics are separated.",
            "The Transparency Index counts documented coverage, not safety, speed or quality.",
            "Edition dates and correction paths make changes inspectable over time.",
          ]}
        />

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          <ResearchCard
            icon={<FileSearch className="size-5" aria-hidden="true" />}
            title="Evidence ledger"
            body="The first working register is live today: it separates dated source checks, provider-reported claims and evidence gaps instead of hiding the trail behind a single score."
          />
          <ResearchCard
            icon={<FlaskConical className="size-5" aria-hidden="true" />}
            title="Reader-run diagnostics"
            body="Browser and connection diagnostics document the current session and their limitations. A reader-run signal is never presented as a provider-wide verdict."
          />
          <ResearchCard
            icon={<BookOpenCheck className="size-5" aria-hidden="true" />}
            title="Citation-ready output"
            body="The ledger provides a stable, citable URL and a visible change path. Downloadable datasets and a data dictionary will follow once field-level citations are complete."
          />
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">The first index</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
              VPN Transparency Index 2026
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              The working edition starts with {catalogCount} visible records: {detailedCount} detailed profiles and selected market references. Depth comes before volume: a smaller set of well-documented records is more useful than a large directory with generic or untraceable claims.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResearchMetric value={catalogCount} label="visible provider records" />
            <ResearchMetric value={datedPricingCount} label="records with dated pricing checks" />
            <ResearchMetric value={auditSourceCount} label="audit records with dedicated links" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResearchMetric value={researchStats.evidenceRecords} label="canonical field records" />
            <ResearchMetric value={researchStats.independentlyMarked} label="verified or partially verified records" />
            <ResearchMetric value={researchStats.needsReview} label="canonical records needing review" />
          </div>

          <div className="mt-8">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold tracking-tight text-ink-strong">Evidence coverage by field</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Coverage shows how many of the seven tracked providers have a current structured value. It is a collection priority signal, not a safety score or provider ranking.
              </p>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
              <table className="min-w-[760px] w-full text-left text-sm">
                <caption className="sr-only">Canonical research evidence coverage by field</caption>
                <thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="px-5 py-4">Field</th>
                    <th className="px-5 py-4">Coverage</th>
                    <th className="px-5 py-4">Source linked</th>
                    <th className="px-5 py-4">Verified or partial</th>
                    <th className="px-5 py-4">Needs review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface-base">
                  {researchCoverage.map((item) => (
                    <tr key={item.field} className="align-top">
                      <th scope="row" className="px-5 py-4 font-semibold text-ink-strong">{item.fieldLabel}</th>
                      <td className="px-5 py-4 tabular-nums">{item.valueCount}/{item.providerCount} ({item.coverageRate}%)</td>
                      <td className="px-5 py-4 tabular-nums text-ink-muted">{item.sourceLinkedCount}</td>
                      <td className="px-5 py-4 tabular-nums text-ink-muted">{item.independentlyMarkedCount}</td>
                      <td className="px-5 py-4 tabular-nums text-ink-muted">{item.needsReviewCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-5 py-4">Information dimension</th>
                  <th className="px-5 py-4">What the record will show</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-surface-base">
                {dimensions.map(([dimension, body]) => (
                  <tr key={dimension} className="align-top">
                    <th className="px-5 py-4 font-semibold text-ink-strong">{dimension}</th>
                    <td className="px-5 py-4 leading-relaxed text-ink">{body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3" aria-labelledby="research-layer-heading">
          <div className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">New research layer</p>
            <h2 id="research-layer-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-strong">Browse the same evidence in several useful views</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">Provider profiles, question pages, source records and changes all read from the canonical dataset. This keeps visible answers and machine-readable outputs aligned.</p>
          </div>
          <ResearchLinkCard title="Provider evidence profiles" body="Field-level records for the initial seven-provider set." href="/research/providers" />
          <ResearchLinkCard title="Research questions" body="Concise answers generated from canonical fields, with caveats and sources." href="/research/questions" />
          <ResearchLinkCard title="Source registry and changes" body="Original URLs, check states and a reviewable change-log foundation." href="/research/sources" />
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Current working record</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-strong">What the source desk records</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              The source desk is a working information register. It shows the source and evidence limits where the record has them; it does not claim that every provider or every article has been checked to the same depth.
            </p>
          </div>
          <ul className="space-y-3">
            {publicationStandard.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface-base p-4 dark:bg-surface-subtle">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-2xl border border-brand-200 bg-brand-50/40 p-6 dark:bg-brand-950/20 sm:p-8">
          <h2 className="text-2xl font-bold text-ink-strong">Start with the evidence you can inspect today</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">
            Our live tools describe the current browser or connection context. The sources-and-limits page explains how to read the records; the evidence ledger is a working dataset that is incomplete and may need further checking.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/research/evidence-ledger" className="inline-flex items-center text-brand-700 hover:underline">
              Inspect the evidence ledger <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
            <Link href="/research/transparency-index" className="inline-flex items-center text-brand-700 hover:underline">
              View the Transparency Index <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
            <Link href="/tools" className="inline-flex items-center text-brand-700 hover:underline">
              Explore security tools <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
            <Link href="/methodology" className="inline-flex items-center text-brand-700 hover:underline">
              Read sources and limitations <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}

function ResearchCard({
  icon,
  title: cardTitle,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-base p-6 dark:bg-surface-subtle">
      <div className="flex size-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
        {icon}
      </div>
      <h2 className="mt-5 text-xl font-bold text-ink-strong">{cardTitle}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}

function ResearchMetric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-subtle/60 p-4">
      <p className="text-2xl font-bold tabular-nums text-ink-strong">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{label}</p>
    </div>
  );
}

function ResearchLinkCard({ title: cardTitle, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-border bg-surface-base p-6 transition-colors hover:border-brand-300 hover:bg-brand-50/40 dark:bg-surface-subtle">
      <h3 className="text-lg font-bold text-ink-strong">{cardTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Open section <ArrowRight className="size-4" aria-hidden="true" /></span>
    </Link>
  );
}
