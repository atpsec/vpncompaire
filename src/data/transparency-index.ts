import { providerEvidenceRecords, type EvidenceState } from "./provider-evidence";

export const TRANSPARENCY_INDEX_EDITION = "2026-08-31";
export const TRANSPARENCY_INDEX_DIMENSIONS = [
  {
    key: "detailedProfile",
    label: "Detailed profile",
    description: "A dedicated provider profile is available in the VPN Advisor catalog.",
  },
  {
    key: "datedPricing",
    label: "Dated pricing check",
    description: "The displayed pricing link has a recorded provider-page check date.",
  },
  {
    key: "auditSource",
    label: "Dedicated audit source",
    description: "A relevant provider audit or transparency record has its own source link.",
  },
  {
    key: "structuredFields",
    label: "Structured profile fields",
    description: "Jurisdiction, network and device fields are recorded in the evidence ledger.",
  },
] as const;

export type TransparencyIndexDimensionKey = (typeof TRANSPARENCY_INDEX_DIMENSIONS)[number]["key"];

export type TransparencyIndexRecord = {
  slug: string;
  brand: string;
  recordType: "Detailed profile" | "Market reference";
  coverageCount: number;
  coverageLabel: string;
  dimensions: Record<TransparencyIndexDimensionKey, boolean>;
  evidenceStates: {
    pricing: EvidenceState;
    audit: EvidenceState;
    profileFields: EvidenceState;
  };
  jurisdiction: string;
  servers: string;
  devices: string;
};

function toRecord(record: ReturnType<typeof providerEvidenceRecords>[number]): TransparencyIndexRecord {
  const dimensions = {
    detailedProfile: record.recordType === "Detailed profile",
    datedPricing: record.primarySource.state === "source-checked",
    auditSource: record.audit.state === "source-linked",
    structuredFields: record.profileFields.state !== "needs-source",
  } satisfies Record<TransparencyIndexDimensionKey, boolean>;
  const coverageCount = Object.values(dimensions).filter(Boolean).length;

  return {
    slug: record.slug,
    brand: record.brand,
    recordType: record.recordType,
    coverageCount,
    coverageLabel: `${coverageCount} of ${TRANSPARENCY_INDEX_DIMENSIONS.length} documentation dimensions recorded`,
    dimensions,
    evidenceStates: {
      pricing: record.primarySource.state,
      audit: record.audit.state,
      profileFields: record.profileFields.state,
    },
    jurisdiction: record.jurisdiction,
    servers: record.servers,
    devices: record.devices,
  };
}

export function getTransparencyIndexRecords(): TransparencyIndexRecord[] {
  return providerEvidenceRecords("en").map(toRecord);
}

export function transparencyIndexDataset() {
  return {
    name: "VPN Advisor Transparency Index",
    edition: TRANSPARENCY_INDEX_EDITION,
    description:
      "A documentation coverage dataset for VPN provider records. It is not a safety certification, performance ranking or endorsement.",
    methodologyUrl: "https://vpnadvisor.net/methodology",
    pageUrl: "https://vpnadvisor.net/research/transparency-index",
    dataUrl: "https://vpnadvisor.net/research/transparency-index/data.json",
    dimensions: TRANSPARENCY_INDEX_DIMENSIONS,
    records: getTransparencyIndexRecords(),
  };
}
