import type { Locale } from "@/i18n/pick";
import type { Product } from "./products";
import { referenceProducts as baseReferenceProducts } from "./products-reference";
import { currentSupplementProducts } from "./products-current";

export const referenceProducts: Product[] = [
  ...baseReferenceProducts,
  ...currentSupplementProducts,
];

/**
 * Visible supplement for the Global Core 30 directory.
 *
 * This is a cross-source market-visibility selection, not a safety ranking
 * or an endorsement. The remaining reference records stay available as a
 * noindex watchlist so existing URLs and future research coverage are kept.
 */
export const GLOBAL_CORE_REFERENCE_SLUGS = [
  "mozilla-vpn",
  "adguard-vpn",
  "torguard",
  "airvpn",
  "privatevpn",
  "astrill-vpn",
  "hma-vpn",
  "turbo-vpn",
  "bitdefender-vpn",
  "avast-secureline",
  "avg-secure-vpn",
] as const;

export const featuredReferenceProducts: Product[] = GLOBAL_CORE_REFERENCE_SLUGS
  .map((slug) => referenceProducts.find((product) => product.slug === slug))
  .filter((product): product is Product => Boolean(product));

const copy = {
  en: {
    positioning: "Source-based VPN provider profile",
    summary: (brand: string) => `${brand} is included in VPN Advisor's extended provider directory. This profile is informational, is not a lab review, and should be read alongside the provider's current official documentation, privacy policy and pricing terms.`,
    pros: [
      "Official product and support documentation is available for verification",
      "Included in the extended market directory for side-by-side research",
    ],
    cons: [
      "Features, server coverage and pricing may change over time",
      "Verify privacy, audit and subscription claims on primary sources before purchase",
    ],
    note: "Informational provider profile; VPN Advisor has not performed a laboratory test.",
  },
  de: {
    positioning: "Quellenbasiertes VPN-Anbieterprofil",
    summary: (brand: string) => `${brand} ist im erweiterten Anbieterverzeichnis von VPN Advisor enthalten. Dieses Profil dient der Information, ist kein Labortest und sollte zusammen mit der aktuellen offiziellen Dokumentation, Datenschutzerklärung und den Preisbedingungen des Anbieters gelesen werden.`,
    pros: [
      "Offizielle Produkt- und Supportdokumentation kann zur Prüfung herangezogen werden",
      "Im erweiterten Marktverzeichnis für strukturierte Vergleiche enthalten",
    ],
    cons: [
      "Funktionen, Serverabdeckung und Preise können sich ändern",
      "Datenschutz-, Audit- und Abo-Angaben vor dem Kauf in Primärquellen prüfen",
    ],
    note: "Informationsprofil; VPN Advisor hat keinen Labortest durchgeführt.",
  },
} as const;

export function getReferenceProduct(slug: string, locale: Locale = "tr"): Product | undefined {
  const product = referenceProducts.find((item) => item.slug === slug);
  if (!product || locale === "tr") return product;
  const localized = locale === "de" ? copy.de : copy.en;
  return {
    ...product,
    positioning: localized.positioning,
    summary: localized.summary(product.brand),
    pros: [...localized.pros],
    cons: [...localized.cons],
    editorNotes: localized.note,
  };
}
