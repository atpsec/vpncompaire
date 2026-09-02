import type { Locale } from "@/lib/site";
import type { Product } from "./products";
import {
  getDetailedProviderProducts,
  getGlobalCoreProducts,
} from "./provider-catalog";

export type EvidenceState =
  | "source-checked"
  | "source-linked"
  | "provider-reported"
  | "needs-refresh"
  | "needs-source";

export type EvidenceItem = {
  state: EvidenceState;
  sourceUrl: string | null;
  sourceLabel: string | null;
  checkedAt: string | null;
  note: string;
};

export type ProviderEvidenceRecord = {
  slug: string;
  brand: string;
  recordType: "Detailed profile" | "Market reference";
  primarySource: EvidenceItem;
  audit: EvidenceItem;
  profileFields: EvidenceItem;
  jurisdiction: string;
  servers: string;
  devices: string;
};

/**
 * Dedicated audit links are only added when the site already has a known
 * first-party record for them. Missing links remain visible as gaps; they are
 * never replaced with an unrelated pricing URL or an invented citation.
 */
const auditSources: Record<string, { label: string; url: string }> = {
  nordvpn: {
    label: "NordVPN Trust Center",
    url: "https://nordvpn.com/trust/",
  },
  surfshark: {
    label: "Surfshark Trust Center",
    url: "https://surfshark.com/trust-center",
  },
  expressvpn: {
    label: "ExpressVPN Trust Center",
    url: "https://www.expressvpn.com/trust",
  },
  "proton-vpn": {
    label: "Proton VPN Transparency Report",
    url: "https://protonvpn.com/blog/transparency-report",
  },
  mullvad: {
    label: "Mullvad Security Audits",
    url: "https://mullvad.net/en/blog/tag/audits",
  },
};

function hasValue(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function auditEvidence(product: Product): EvidenceItem {
  const description = product.highlights.audits;
  if (!hasValue(description)) {
    return {
      state: "needs-source",
      sourceUrl: null,
      sourceLabel: null,
      checkedAt: null,
      note: "No audit record is currently stated in this profile.",
    };
  }

  const source = auditSources[product.slug];
  if (source) {
    return {
      state: "source-linked",
      sourceUrl: source.url,
      sourceLabel: source.label,
      checkedAt: null,
      note: `${description}. Scope and date still need to be checked on the linked record for each edition.`,
    };
  }

  return {
    state: "provider-reported",
    sourceUrl: null,
    sourceLabel: null,
    checkedAt: null,
    note: `${description}. A dedicated, field-specific source link is not attached yet.`,
  };
}

function profileFieldsEvidence(product: Product): EvidenceItem {
  const fieldCount = [
    product.highlights.jurisdiction,
    product.highlights.servers,
    product.highlights.devices,
  ].filter(hasValue).length;

  if (fieldCount === 0) {
    return {
      state: "needs-source",
      sourceUrl: null,
      sourceLabel: null,
      checkedAt: null,
      note: "No structured jurisdiction, network or device field is recorded.",
    };
  }

  return {
    state: "provider-reported",
    sourceUrl: null,
    sourceLabel: null,
    checkedAt: null,
    note: `${fieldCount} structured profile field${fieldCount === 1 ? "" : "s"} displayed; field-specific source URLs are still required for an independent evidence record.`,
  };
}

function primarySourceEvidence(product: Product): EvidenceItem {
  if (!product.pricingUrl) {
    return {
      state: "needs-source",
      sourceUrl: null,
      sourceLabel: null,
      checkedAt: null,
      note: "No primary pricing source is recorded.",
    };
  }

  if (!product.pricingVerifiedAt) {
    return {
      state: "needs-refresh",
      sourceUrl: product.pricingUrl,
      sourceLabel: "Provider pricing page",
      checkedAt: null,
      note: "A pricing URL is recorded, but the profile has no dated check yet.",
    };
  }

  return {
    state: "source-checked",
    sourceUrl: product.pricingUrl,
    sourceLabel: "Provider pricing page",
    checkedAt: product.pricingVerifiedAt,
    note: "Displayed pricing is tied to this provider page and its recorded check date; renewal terms can still change.",
  };
}

export function providerEvidenceRecords(
  locale: Locale = "en",
): ProviderEvidenceRecord[] {
  const detailedSlugs = new Set(
    getDetailedProviderProducts(locale).map((product) => product.slug),
  );

  return getGlobalCoreProducts(locale).map((product) => ({
    slug: product.slug,
    brand: product.brand,
    recordType: detailedSlugs.has(product.slug)
      ? "Detailed profile"
      : "Market reference",
    primarySource: primarySourceEvidence(product),
    audit: auditEvidence(product),
    profileFields: profileFieldsEvidence(product),
    jurisdiction: product.highlights.jurisdiction ?? "Not recorded",
    servers: product.highlights.servers ?? "Not recorded",
    devices: product.highlights.devices ?? "Not recorded",
  }));
}
