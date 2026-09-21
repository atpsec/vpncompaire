import { getProviderEvidenceBySlug, getResearchProvider, researchEdition } from "@/data/research";

export const dynamic = "force-static";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const provider = getResearchProvider(slug);
  if (!provider) return Response.json({ error: "Provider not found" }, { status: 404 });
  return Response.json({ schemaVersion: "1.0", edition: researchEdition(), provider, evidence: getProviderEvidenceBySlug(slug) });
}
