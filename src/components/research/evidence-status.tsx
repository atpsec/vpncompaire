import type { ResearchConfidence, ResearchStatus } from "@/data/research";

const labels: Record<ResearchStatus, string> = {
  verified: "Verified",
  partially_verified: "Partially verified",
  provider_claim_only: "Provider claim",
  conflicting: "Conflicting evidence",
  outdated: "Outdated",
  unknown: "Unknown",
};

const styles: Record<ResearchStatus, string> = {
  verified: "bg-success-50 text-success-700 ring-success-200",
  partially_verified: "bg-brand-50 text-brand-700 ring-brand-200",
  provider_claim_only: "bg-accent-50 text-accent-700 ring-accent-200",
  conflicting: "bg-red-50 text-red-700 ring-red-200",
  outdated: "bg-orange-50 text-orange-700 ring-orange-200",
  unknown: "bg-surface-muted text-ink-muted ring-border",
};

export function EvidenceStatusBadge({ status }: { status: ResearchStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export function ConfidenceLabel({ confidence }: { confidence: ResearchConfidence }) {
  const label = confidence === "unknown" ? "Not assessed" : `${confidence} confidence`;
  return <span className="text-xs text-ink-muted">{label}</span>;
}

export function evidenceStatusLabel(status: ResearchStatus): string {
  return labels[status];
}
