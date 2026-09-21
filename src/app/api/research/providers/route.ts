import { getAllResearchEvidence, getResearchProviders, researchEdition } from "@/data/research";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const providers = getResearchProviders().map((provider) => ({
    ...provider,
    evidenceUrl: absoluteUrl(`/research/providers/${provider.slug}`),
    evidenceCount: getAllResearchEvidence().filter((item) => item.providerId === provider.id).length,
  }));
  return Response.json({ schemaVersion: "1.0", edition: researchEdition(), count: providers.length, providers });
}
