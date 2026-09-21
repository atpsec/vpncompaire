import { getResearchChanges, researchEdition } from "@/data/research";

export const dynamic = "force-static";

export function GET() {
  const changes = getResearchChanges();
  return Response.json({ schemaVersion: "1.0", edition: researchEdition(), count: changes.length, changes, publicationPolicy: "Changes require review before publication and are never auto-published by the fetch-and-diff utility." });
}
