import rawDataset from "../../data/research/canonical.json";

export const RESEARCH_STATUSES = [
  "verified",
  "partially_verified",
  "provider_claim_only",
  "conflicting",
  "outdated",
  "unknown",
] as const;

export type ResearchStatus = (typeof RESEARCH_STATUSES)[number];

export const RESEARCH_SOURCE_TYPES = [
  "official_documentation",
  "privacy_policy",
  "terms",
  "independent_audit",
  "court_record",
  "transparency_report",
  "standards_documentation",
  "reputable_secondary_source",
] as const;

export type ResearchSourceType = (typeof RESEARCH_SOURCE_TYPES)[number];
export type ResearchConfidence = "high" | "medium" | "low" | "unknown";
export type ResearchClaimType =
  | "independent_evidence"
  | "provider_claim"
  | "editorial_observation";

export const RESEARCH_FIELDS = [
  "jurisdiction",
  "ownership",
  "no_logs_policy",
  "independent_no_logs_audit",
  "independent_security_audit",
  "audit_details",
  "protocols",
  "wireguard",
  "openvpn",
  "ikev2",
  "kill_switch",
  "ram_only_servers",
  "open_source_apps",
  "supported_platforms",
  "simultaneous_devices",
  "pricing_reference",
  "refund_period",
  "free_plan",
  "server_network",
  "transparency_reports",
  "warrant_canary",
  "court_legal_evidence",
  "privacy_policy",
  "terms",
] as const;

export type ResearchField = (typeof RESEARCH_FIELDS)[number];

export const RESEARCH_FIELD_LABELS: Record<ResearchField, string> = {
  jurisdiction: "Jurisdiction",
  ownership: "Ownership",
  no_logs_policy: "No-logs policy",
  independent_no_logs_audit: "Independent no-logs audit",
  independent_security_audit: "Independent security audit",
  audit_details: "Audit details",
  protocols: "Supported protocols",
  wireguard: "WireGuard",
  openvpn: "OpenVPN",
  ikev2: "IKEv2",
  kill_switch: "Kill switch",
  ram_only_servers: "RAM-only servers",
  open_source_apps: "Open-source apps",
  supported_platforms: "Supported platforms",
  simultaneous_devices: "Simultaneous devices",
  pricing_reference: "Pricing reference",
  refund_period: "Refund period",
  free_plan: "Free plan",
  server_network: "Server / network claims",
  transparency_reports: "Transparency reports",
  warrant_canary: "Warrant canary",
  court_legal_evidence: "Court or legal evidence",
  privacy_policy: "Privacy policy",
  terms: "Terms",
};

type RawFact = {
  value?: string | number | boolean | null;
  status?: ResearchStatus;
  confidence?: ResearchConfidence;
  claimType?: ResearchClaimType;
  sourceId?: string;
  checkedAt?: string | null;
  publishedAt?: string | null;
  validFrom?: string | null;
  validTo?: string | null;
  notes?: string;
  archivedSourceUrl?: string;
};

type RawProvider = {
  id: string;
  slug: string;
  name: string;
  website: string;
  summary: string;
  affiliate: boolean;
  lastVerified: string | null;
  facts: Record<string, RawFact>;
};

type RawSource = {
  id: string;
  title: string;
  publisher: string;
  type: ResearchSourceType;
  providerId: string;
  url: string;
  firstChecked: string | null;
  lastChecked: string | null;
  status: string;
  notes?: string;
};

type RawDataset = {
  edition: string;
  providers: RawProvider[];
  sources: RawSource[];
  changes: ResearchChange[];
};

export type ResearchProvider = {
  id: string;
  slug: string;
  name: string;
  website: string;
  summary: string;
  affiliate: boolean;
  lastVerified: string | null;
  updatedAt: string;
};

export type ResearchEvidenceItem = {
  id: string;
  providerId: string;
  providerSlug: string;
  providerName: string;
  category: string;
  field: ResearchField;
  fieldLabel: string;
  value: string | number | boolean | null;
  status: ResearchStatus;
  confidence: ResearchConfidence;
  claimType: ResearchClaimType;
  sourceId: string | null;
  sourceTitle: string | null;
  sourceUrl: string | null;
  sourcePublisher: string | null;
  sourceType: ResearchSourceType | null;
  publishedAt: string | null;
  checkedAt: string | null;
  validFrom: string | null;
  validTo: string | null;
  notes: string;
  archivedSourceUrl?: string;
};

export type ResearchSource = RawSource & {
  relatedEvidenceIds: string[];
  providerName: string;
};

export type ResearchCoverage = {
  field: ResearchField;
  fieldLabel: string;
  providerCount: number;
  valueCount: number;
  sourceLinkedCount: number;
  independentlyMarkedCount: number;
  needsReviewCount: number;
  missingCount: number;
  coverageRate: number;
};

export type ResearchChange = {
  id: string;
  providerId: string;
  field: ResearchField;
  detectedAt: string;
  previousValue: string | number | boolean | null;
  currentValue: string | number | boolean | null;
  sourceId: string | null;
  firstDetectedAt: string;
  status: "review_required" | "published" | "dismissed";
  notes?: string;
};

export type ResearchQuestion = {
  slug: string;
  title: string;
  question: string;
  directAnswerLabel: string;
  field: ResearchField;
  caveat: string;
  methodology: string;
};

const dataset = rawDataset as unknown as RawDataset;
const sourceById = new Map(dataset.sources.map((source) => [source.id, source]));
const providerById = new Map(dataset.providers.map((provider) => [provider.id, provider]));

function categoryForField(field: ResearchField): string {
  if (["pricing_reference", "refund_period", "free_plan"].includes(field)) return "Pricing and terms";
  if (["jurisdiction", "ownership", "court_legal_evidence"].includes(field)) return "Company and legal context";
  if (["no_logs_policy", "independent_no_logs_audit", "independent_security_audit", "audit_details", "transparency_reports", "warrant_canary"].includes(field)) return "Privacy and accountability";
  if (["server_network", "simultaneous_devices"].includes(field)) return "Network and account limits";
  return "Technical features";
}

function unknownFact(providerId: string, field: ResearchField): ResearchEvidenceItem {
  const provider = providerById.get(providerId);
  if (!provider) throw new Error(`Unknown research provider: ${providerId}`);
  return {
    id: `${providerId}-${field}`,
    providerId,
    providerSlug: provider.slug,
    providerName: provider.name,
    category: categoryForField(field),
    field,
    fieldLabel: RESEARCH_FIELD_LABELS[field],
    value: null,
    status: "unknown",
    confidence: "unknown",
    claimType: "editorial_observation",
    sourceId: null,
    sourceTitle: null,
    sourceUrl: null,
    sourcePublisher: null,
    sourceType: null,
    publishedAt: null,
    checkedAt: null,
    validFrom: null,
    validTo: null,
    notes: "No structured evidence record is currently attached for this field.",
  };
}

function toEvidence(provider: RawProvider, field: ResearchField): ResearchEvidenceItem {
  const raw = provider.facts[field];
  if (!raw) return unknownFact(provider.id, field);
  const source = raw.sourceId ? sourceById.get(raw.sourceId) : undefined;
  const value = raw.value === undefined ? null : raw.value;
  const status = raw.status ?? (value === null ? "unknown" : "provider_claim_only");
  return {
    id: `${provider.id}-${field}`,
    providerId: provider.id,
    providerSlug: provider.slug,
    providerName: provider.name,
    category: categoryForField(field),
    field,
    fieldLabel: RESEARCH_FIELD_LABELS[field],
    value,
    status,
    confidence: raw.confidence ?? "unknown",
    claimType: raw.claimType ?? "provider_claim",
    sourceId: raw.sourceId ?? null,
    sourceTitle: source?.title ?? null,
    sourceUrl: source?.url ?? null,
    sourcePublisher: source?.publisher ?? null,
    sourceType: source?.type ?? null,
    publishedAt: raw.publishedAt ?? null,
    checkedAt: raw.checkedAt ?? source?.lastChecked ?? null,
    validFrom: raw.validFrom ?? null,
    validTo: raw.validTo ?? null,
    notes: raw.notes ?? "",
    archivedSourceUrl: raw.archivedSourceUrl,
  };
}

export function researchEdition(): string {
  return dataset.edition;
}

export function getResearchProviders(): ResearchProvider[] {
  return dataset.providers.map(({ id, slug, name, website, summary, affiliate, lastVerified }) => ({
    id,
    slug,
    name,
    website,
    summary,
    affiliate,
    lastVerified,
    updatedAt: lastVerified ?? dataset.edition,
  }));
}

export function getResearchProvider(slug: string): ResearchProvider | undefined {
  return getResearchProviders().find((provider) => provider.slug === slug);
}

export function getProviderEvidence(providerId: string): ResearchEvidenceItem[] {
  const provider = providerById.get(providerId);
  if (!provider) return [];
  return RESEARCH_FIELDS.map((field) => toEvidence(provider, field));
}

export function getProviderEvidenceBySlug(slug: string): ResearchEvidenceItem[] {
  const provider = getResearchProvider(slug);
  return provider ? getProviderEvidence(provider.id) : [];
}

export function getAllResearchEvidence(): ResearchEvidenceItem[] {
  return getResearchProviders().flatMap((provider) => getProviderEvidence(provider.id));
}

export function getResearchSources(): ResearchSource[] {
  const evidence = getAllResearchEvidence();
  return dataset.sources.map((source) => ({
    ...source,
    providerName: providerById.get(source.providerId)?.name ?? source.providerId,
    relatedEvidenceIds: evidence
      .filter((item) => item.sourceId === source.id)
      .map((item) => item.id),
  }));
}

/**
 * Field-level coverage for prioritising the next evidence collection pass.
 * Coverage counts are deliberately descriptive; they are not provider scores.
 */
export function getResearchCoverage(): ResearchCoverage[] {
  const evidence = getAllResearchEvidence();
  return RESEARCH_FIELDS.map((field) => {
    const records = evidence.filter((item) => item.field === field);
    const valueCount = records.filter((item) => item.value !== null).length;
    const sourceLinkedCount = records.filter((item) => item.sourceId !== null).length;
    const independentlyMarkedCount = records.filter(
      (item) => item.status === "verified" || item.status === "partially_verified",
    ).length;
    const needsReviewCount = records.filter(
      (item) => item.status === "unknown" || item.status === "outdated" || item.status === "conflicting",
    ).length;
    return {
      field,
      fieldLabel: RESEARCH_FIELD_LABELS[field],
      providerCount: records.length,
      valueCount,
      sourceLinkedCount,
      independentlyMarkedCount,
      needsReviewCount,
      missingCount: records.length - valueCount,
      coverageRate: records.length ? Math.round((valueCount / records.length) * 100) : 0,
    };
  });
}

export function getResearchSource(id: string): ResearchSource | undefined {
  return getResearchSources().find((source) => source.id === id);
}

export function getResearchChanges(): ResearchChange[] {
  return dataset.changes;
}

export const RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    slug: "which-vpns-have-independent-no-logs-audits",
    title: "Which VPNs have independent no-logs audits?",
    question: "Which VPN providers have independently audited no-logs policies?",
    directAnswerLabel: "Independent no-logs audit records",
    field: "independent_no_logs_audit",
    caveat: "A linked audit-related source is not the same as a complete audit verification. Scope, exclusions and report date must be extracted before a record can be treated as fully verified.",
    methodology: "This answer aggregates only the canonical independent_no_logs_audit field. Provider claims and partial source links remain visibly labelled and are not converted into a certification.",
  },
  {
    slug: "which-vpns-support-wireguard",
    title: "Which VPNs support WireGuard?",
    question: "Which VPN providers currently have a WireGuard record in the dataset?",
    directAnswerLabel: "WireGuard support",
    field: "wireguard",
    caveat: "A provider feature claim can change by platform, plan or app version. The current dataset contains a provider claim for PIA, but no field-specific source link is attached yet.",
    methodology: "Only the canonical wireguard field is aggregated. Unknown records are not treated as negative answers.",
  },
  {
    slug: "which-vpns-have-open-source-apps",
    title: "Which VPNs have open-source apps?",
    question: "Which VPN providers have open-source app records?",
    directAnswerLabel: "Open-source app records",
    field: "open_source_apps",
    caveat: "The current records preserve provider statements; a repository or field-specific official documentation link is still needed for independent verification.",
    methodology: "The answer counts only canonical open_source_apps evidence and reports its status for each provider.",
  },
  {
    slug: "which-vpns-use-ram-only-servers",
    title: "Which VPNs use RAM-only servers?",
    question: "Which VPN providers document RAM-only server architecture?",
    directAnswerLabel: "RAM-only server records",
    field: "ram_only_servers",
    caveat: "RAM-only architecture is shown as a provider claim unless an independent, field-specific record is attached.",
    methodology: "The answer aggregates the canonical ram_only_servers field without inferring architecture from marketing language elsewhere.",
  },
  {
    slug: "vpn-jurisdictions-compared",
    title: "VPN jurisdictions compared",
    question: "What jurisdictions are recorded for the VPN providers in this dataset?",
    directAnswerLabel: "Jurisdiction records",
    field: "jurisdiction",
    caveat: "Jurisdiction is a legal-context field, not a standalone privacy or safety score. Ownership and applicable legal process may need separate review.",
    methodology: "The table reproduces the canonical jurisdiction field and its status; unknown values are not inferred.",
  },
  {
    slug: "vpn-device-limits",
    title: "VPN device limits",
    question: "What simultaneous device limits are recorded for these VPN providers?",
    directAnswerLabel: "Simultaneous device records",
    field: "simultaneous_devices",
    caveat: "Device limits can vary by account type, plan and current terms. Verify the provider's current subscription conditions before purchase.",
    methodology: "The answer aggregates only the canonical simultaneous_devices field and keeps provider claims visibly labelled.",
  },
  {
    slug: "vpn-refund-periods",
    title: "VPN refund periods",
    question: "What refund periods are recorded for these VPN providers?",
    directAnswerLabel: "Refund-period records",
    field: "refund_period",
    caveat: "Eligibility, payment method, region and renewal conditions can affect refund rights. This is an informational source record, not a legal conclusion.",
    methodology: "The answer uses only the canonical refund_period field and links the configured provider pricing source where available.",
  },
  {
    slug: "which-vpns-offer-a-free-plan",
    title: "Which VPNs offer a free plan?",
    question: "Which VPN providers have a free-plan record?",
    directAnswerLabel: "Free-plan records",
    field: "free_plan",
    caveat: "Free tiers can have data, location, speed, device or feature limits. The current record status is shown beside every row.",
    methodology: "Only the canonical free_plan field is used; missing records stay unknown rather than being inferred from a low price.",
  },
  {
    slug: "which-vpns-publish-transparency-reports",
    title: "Which VPNs publish transparency reports?",
    question: "Which VPN providers have transparency-report records?",
    directAnswerLabel: "Transparency-report records",
    field: "transparency_reports",
    caveat: "An audit page, legal page and transparency report are different source types. They are not merged into one status.",
    methodology: "The answer aggregates only the canonical transparency_reports field and does not infer publication from a general trust page.",
  },
  {
    slug: "which-vpns-have-third-party-security-audits",
    title: "Which VPNs have third-party security audits?",
    question: "Which VPN providers have a third-party audit record?",
    directAnswerLabel: "Third-party audit records",
    field: "independent_security_audit",
    caveat: "A security audit has a scope, date, exclusions and target. A linked provider archive is not a blanket security certification or a no-logs finding.",
    methodology: "Only the canonical independent_security_audit field is aggregated. No-logs audit records are kept in a separate field because the two audit types answer different questions.",
  },
];

export function getResearchQuestion(slug: string): ResearchQuestion | undefined {
  return RESEARCH_QUESTIONS.find((question) => question.slug === slug);
}

export function getQuestionEvidence(question: ResearchQuestion): ResearchEvidenceItem[] {
  return getAllResearchEvidence().filter((item) => item.field === question.field);
}

export function getResearchStats() {
  const evidence = getAllResearchEvidence();
  const valueBearing = evidence.filter((item) => item.value !== null);
  const independentlyMarked = evidence.filter(
    (item) => item.status === "verified" || item.status === "partially_verified",
  );
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const checkedLast30Days = evidence.filter((item) => {
    if (!item.checkedAt) return false;
    const checkedAt = new Date(item.checkedAt);
    return !Number.isNaN(checkedAt.valueOf()) && checkedAt >= thirtyDaysAgo;
  });
  const needsReview = evidence.filter(
    (item) => item.status === "unknown" || item.status === "outdated" || item.status === "conflicting",
  );
  return {
    providersTracked: getResearchProviders().length,
    evidenceRecords: evidence.length,
    recordsWithValues: valueBearing.length,
    independentlyMarked: independentlyMarked.length,
    checkedLast30Days: checkedLast30Days.length,
    needsReview: needsReview.length,
    recentChanges: getResearchChanges().length,
  };
}

export function researchDataset() {
  return {
    name: "VPN Advisor canonical research evidence",
    edition: researchEdition(),
    providers: getResearchProviders(),
    evidence: getAllResearchEvidence(),
    sources: getResearchSources(),
    changes: getResearchChanges(),
  };
}
