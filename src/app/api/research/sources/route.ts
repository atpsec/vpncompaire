import { getResearchSources, researchEdition } from "@/data/research";

export const dynamic = "force-static";

export function GET() {
  const sources = getResearchSources();
  return Response.json({ schemaVersion: "1.0", edition: researchEdition(), count: sources.length, sources });
}
