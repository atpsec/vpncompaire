import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Info,
  ShieldAlert,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl, localizedAlternates, siteConfig } from "@/lib/site";
import {
  providerEvidenceRecords,
  type EvidenceItem,
  type EvidenceState,
} from "@/data/provider-evidence";

type Props = { params: Promise<{ locale: string }> };

const title = "VPN Provider Evidence Ledger — Sources, Dates and Open Gaps";
const description =
  "A transparent working register of VPN provider sources, pricing check dates, audit records and unresolved evidence gaps.";
const publicationDate = "2026-08-28";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return {
    title,
    description,
    alternates: localizedAlternates("/research/evidence-ledger", "en"),
    openGraph: {
      title: `${title} | VPN Advisor`,
      description,
      url: absoluteUrl("/research/evidence-ledger"),
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const records = providerEvidenceRecords("en");
  const datedPriceChecks = records.filter(
    (record) => record.primarySource.state === "source-checked",
  ).length;
  const auditSourceLinks = records.filter(
    (record) => record.audit.state === "source-linked",
  ).length;
  const openAuditGaps = records.filter(
    (record) => record.audit.state === "provider-reported" || record.audit.state === "needs-source",
  ).length;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${absoluteUrl("/research/evidence-ledger")}#dataset`,
    name: title,
    description,
    url: absoluteUrl("/research/evidence-ledger"),
    inLanguage: "en-US",
    dateModified: publicationDate,
    isAccessibleForFree: true,
    creator: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    license: absoluteUrl("/terms"),
    measurementTechnique:
      "Source classification of provider-published pages and dated pricing checks; not a laboratory performance test.",
    variableMeasured: [
      "Pricing source and check date",
      "Audit source availability and scope status",
      "Jurisdiction, network and device fields",
    ],
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: "Research", path: "/research" },
            { name: "Evidence ledger", path: "/research/evidence-ledger" },
          ],
          "en",
        )}
      />
      <JsonLd data={datasetSchema} />

      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">Home</Link> ›{" "}
          <Link href="/research" className="hover:text-ink">Research</Link> ›{" "}
          <span className="text-ink-strong">Evidence ledger</span>
        </p>

        <header className="mt-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <FileSearch className="size-3.5" aria-hidden="true" />
            Working source edition · {publicationDate}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-strong sm:text-5xl lg:text-6xl">
            Evidence before rankings.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
            This public ledger shows what is linked, what is dated and what still needs a field-specific source. Inclusion is not certification, a safety verdict or a laboratory result.
          </p>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="Ledger summary">
          <SummaryCard value={records.length} label="visible catalog records" />
          <SummaryCard value={datedPriceChecks} label="dated pricing checks" />
          <SummaryCard value={auditSourceLinks} label="dedicated audit source links" />
        </section>

        <section className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/50 p-5 dark:bg-brand-950/20 sm:p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-ink-strong">How to read this register</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                A source-linked row means a relevant provider record is linked; it does not mean the claim is universally true. “Provider-reported” means the profile preserves the provider’s wording without presenting it as independent verification. “Needs source” is an intentional gap, not a hidden assumption.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="ledger-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Current working dataset</p>
              <h2 id="ledger-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-strong">
                30 provider records, with gaps kept visible
              </h2>
            </div>
            <Link href="/research" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
              Source desk <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-[980px] w-full text-left text-sm">
              <caption className="sr-only">VPN Advisor provider evidence ledger</caption>
              <thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <tr>
                  <th scope="col" className="px-5 py-4">Provider</th>
                  <th scope="col" className="px-5 py-4">Primary pricing source</th>
                  <th scope="col" className="px-5 py-4">Audit evidence</th>
                  <th scope="col" className="px-5 py-4">Structured profile fields</th>
                  <th scope="col" className="px-5 py-4">Record type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-surface-base">
                {records.map((record) => (
                  <tr id={`provider-${record.slug}`} key={record.slug} className="align-top">
                    <th scope="row" className="px-5 py-5 font-semibold text-ink-strong">
                      <Link href={`/reviews/${record.slug}`} className="hover:text-brand-700 hover:underline">
                        {record.brand}
                      </Link>
                      <p className="mt-1 font-mono text-[11px] font-normal text-ink-subtle">/reviews/{record.slug}</p>
                    </th>
                    <td className="px-5 py-5">
                      <EvidenceCell item={record.primarySource} />
                    </td>
                    <td className="px-5 py-5">
                      <EvidenceCell item={record.audit} />
                    </td>
                    <td className="px-5 py-5">
                      <div className="space-y-1 text-xs text-ink-muted">
                        <p><span className="font-semibold text-ink-strong">Jurisdiction:</span> {record.jurisdiction}</p>
                        <p><span className="font-semibold text-ink-strong">Network:</span> {record.servers}</p>
                        <p><span className="font-semibold text-ink-strong">Devices:</span> {record.devices}</p>
                        <p className="pt-1 text-ink-subtle">{record.profileFields.note}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <Badge variant={record.recordType === "Detailed profile" ? "brand" : "outline"}>
                        {record.recordType}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
            {openAuditGaps} audit entries still require a dedicated source or a clearer scope record. That gap is deliberately counted here so the research program can improve it edition by edition.
          </p>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3" aria-labelledby="next-heading">
          <div className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Next evidence pass</p>
            <h2 id="next-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink-strong">What gets improved next</h2>
          </div>
          <NextStep icon={<ShieldAlert className="size-5" aria-hidden="true" />} title="Field-specific citations" body="Attach the exact privacy, terms, audit and security URLs to each material claim." />
          <NextStep icon={<CheckCircle2 className="size-5" aria-hidden="true" />} title="Audit scope" body="Record the auditor, publication date, tested systems, exclusions and whether the provider or auditor published the report." />
          <NextStep icon={<FileSearch className="size-5" aria-hidden="true" />} title="Corrections" body="Keep the ledger versioned and let readers submit a source-backed correction through the contact page." />
        </section>

        <p className="mt-12 text-sm leading-relaxed text-ink-muted">
          Read the <Link href="/methodology" className="font-semibold text-brand-700 hover:underline">source-based methodology</Link> for the hierarchy of evidence and the limits of provider profiles. Pricing and features can change; verify the official source before purchase.
        </p>
      </Container>
    </>
  );
}

function SummaryCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-base p-5">
      <p className="text-3xl font-bold tabular-nums text-ink-strong">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </div>
  );
}

function EvidenceCell({ item }: { item: EvidenceItem }) {
  return (
    <div className="max-w-[230px]">
      <StateBadge state={item.state} />
      {item.sourceUrl && item.sourceLabel ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
        >
          {item.sourceLabel} <ExternalLink className="size-3" aria-hidden="true" />
        </a>
      ) : null}
      {item.checkedAt ? <p className="mt-1 text-[11px] text-ink-subtle">Checked {item.checkedAt}</p> : null}
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.note}</p>
    </div>
  );
}

function StateBadge({ state }: { state: EvidenceState }) {
  const labels: Record<EvidenceState, string> = {
    "source-checked": "Source checked",
    "source-linked": "Source linked",
    "provider-reported": "Provider-reported",
    "needs-refresh": "Needs dated check",
    "needs-source": "Needs source",
  };
  const styles: Record<EvidenceState, string> = {
    "source-checked": "border-success-300 bg-success-50 text-success-800",
    "source-linked": "border-brand-300 bg-brand-50 text-brand-800",
    "provider-reported": "border-accent-300 bg-accent-50 text-accent-800",
    "needs-refresh": "border-amber-300 bg-amber-50 text-amber-800",
    "needs-source": "border-border bg-surface-subtle text-ink-muted",
  };
  return <span className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold ${styles[state]}`}>{labels[state]}</span>;
}

function NextStep({ icon, title: stepTitle, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-border bg-surface-base p-5">
      <div className="flex size-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">{icon}</div>
      <h3 className="mt-4 font-semibold text-ink-strong">{stepTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
    </article>
  );
}
