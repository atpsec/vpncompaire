import { getResearchCoverage, researchEdition } from "@/data/research";

export const dynamic = "force-static";

export function GET() {
  const coverage = getResearchCoverage();
  return Response.json({
    schemaVersion: "1.0",
    edition: researchEdition(),
    providerCount: coverage[0]?.providerCount ?? 0,
    count: coverage.length,
    coverage,
    interpretation: "Coverage is a documentation completeness signal, not a safety score, certification or provider ranking.",
  });
}
