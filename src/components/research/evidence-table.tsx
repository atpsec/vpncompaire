import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { ResearchEvidenceItem } from "@/data/research";
import { ConfidenceLabel, EvidenceStatusBadge } from "./evidence-status";
import { Freshness } from "./freshness";
import { TrackedSourceLink } from "./tracked-source-link";

function displayValue(value: ResearchEvidenceItem["value"]): string {
  if (value === null || value === "") return "Unknown";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export function EvidenceTable({
  items,
  showProvider = false,
}: {
  items: ResearchEvidenceItem[];
  showProvider?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="min-w-[980px] w-full text-left text-sm">
        <caption className="sr-only">VPN Advisor canonical research evidence</caption>
        <thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted">
          <tr>
            {showProvider ? <th scope="col" className="px-5 py-4">Provider</th> : null}
            <th scope="col" className="px-5 py-4">Field</th>
            <th scope="col" className="px-5 py-4">Status</th>
            <th scope="col" className="px-5 py-4">Current value</th>
            <th scope="col" className="px-5 py-4">Evidence and source</th>
            <th scope="col" className="px-5 py-4">Last verified</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface-base">
          {items.map((item) => (
            <tr id={item.id} key={item.id} className="align-top">
              {showProvider ? (
                <th scope="row" className="px-5 py-5 font-semibold text-ink-strong">
                  <Link href={`/research/providers/${item.providerSlug}`} className="hover:text-brand-700 hover:underline">
                    {item.providerName}
                  </Link>
                </th>
              ) : null}
              <th scope="row" className="px-5 py-5 font-semibold text-ink-strong">{item.fieldLabel}</th>
              <td className="px-5 py-5">
                <EvidenceStatusBadge status={item.status} />
                <div className="mt-2"><ConfidenceLabel confidence={item.confidence} /></div>
              </td>
              <td className="max-w-sm px-5 py-5 leading-relaxed text-ink">
                {displayValue(item.value)}
                {item.notes ? <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.notes}</p> : null}
              </td>
              <td className="px-5 py-5">
                {item.sourceUrl ? (
                  <TrackedSourceLink href={item.sourceUrl} sourceId={item.sourceId ?? item.id} sourceType={item.sourceType} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline">
                    {item.sourceTitle ?? "Open source"}<ExternalLink className="size-3.5" aria-hidden="true" />
                  </TrackedSourceLink>
                ) : (
                  <span className="text-ink-muted">Source not attached</span>
                )}
                {item.claimType === "provider_claim" ? <p className="mt-2 text-xs text-ink-muted">Provider statement; not independent verification.</p> : null}
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-xs"><Freshness checkedAt={item.checkedAt} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
