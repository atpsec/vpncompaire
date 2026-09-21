import { getQuestionEvidence, getResearchQuestion, researchEdition } from "@/data/research";

export const dynamic = "force-static";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const question = getResearchQuestion(slug);
  if (!question) return Response.json({ error: "Question not found" }, { status: 404 });
  return Response.json({ schemaVersion: "1.0", edition: researchEdition(), question, evidence: getQuestionEvidence(question) });
}
