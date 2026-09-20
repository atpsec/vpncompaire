import "server-only";
import { choice, TypeSafeClient } from "@typesafe-ai/sdk";
import { env } from "@/env";
import {
  describeQuizAnswers,
  rankQuizScores,
  scoreQuizAnswers,
  type QuizAnswers,
  type QuizMatch,
} from "@/lib/vpn-quiz";

const MINIMUM_CONFIDENCE = 0.55;

const INTENT_CRITERIA = {
  privacy:
    "Privacy or anonymity is dominant, especially when audits, open-source clients, legal-request history, or advanced privacy controls matter.",
  streaming:
    "Reliable streaming or regional media access is dominant, including access that depends on a Turkish server.",
  travel:
    "Secure, simple use while travelling or on public Wi-Fi is dominant, including access to home-region services from abroad.",
  gaming:
    "Gaming performance and DDoS protection are dominant.",
  balanced:
    "No specialist use case clearly dominates; the answers call for a balanced everyday VPN.",
} as const;

type RecommendationIntent = keyof typeof INTENT_CRITERIA;

const INTENT_BONUSES: Record<
  RecommendationIntent,
  Readonly<Partial<Record<string, number>>>
> = {
  privacy: { mullvad: 2.5, "proton-vpn": 2.5, pia: 1 },
  streaming: { nordvpn: 2.5, expressvpn: 2.5, cyberghost: 2, surfshark: 1.5 },
  travel: { expressvpn: 2.5, nordvpn: 2, surfshark: 2, "proton-vpn": 1 },
  gaming: { nordvpn: 2.5, expressvpn: 2, pia: 2 },
  balanced: {},
};

export type VpnRecommendation = {
  matches: QuizMatch[];
  mode: "deterministic" | "typesafe";
  intent?: RecommendationIntent;
  confidence?: number;
};

let typesafeClient: TypeSafeClient | undefined;

function client(): TypeSafeClient | null {
  if (!env.TYPESAFE_API_KEY) return null;
  typesafeClient ??= new TypeSafeClient({
    apiKey: env.TYPESAFE_API_KEY,
    logLevel: "error",
    timeout: 5_000,
    retry: { maxRetries: 0 },
  });
  return typesafeClient;
}

function deterministicRecommendation(answers: QuizAnswers): VpnRecommendation {
  return {
    matches: rankQuizScores(scoreQuizAnswers(answers)),
    mode: "deterministic",
  };
}

function finiteProbability(value: number | undefined): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value ?? 0)) : 0;
}

export async function recommendVpn(
  answers: QuizAnswers,
): Promise<VpnRecommendation> {
  const fallback = deterministicRecommendation(answers);

  try {
    const sdk = client();
    if (!sdk) return fallback;

    const result = await sdk.systemOne({
      state: {
        task: "Classify a VPN shopper's primary use-case from six fixed quiz answers.",
        preferences: describeQuizAnswers(answers),
      },
      questions: {
        intent: choice(
          "Which use-case profile best represents the complete set of answers? Treat the stated priority as a strong signal, then use location, trust, technical level, device count, and budget to resolve ambiguity. Choose balanced when no specialist profile clearly dominates.",
          INTENT_CRITERIA,
        ),
      },
    });

    const intentAnswer = result.answers.intent;
    if (
      !Number.isFinite(intentAnswer.confidence) ||
      intentAnswer.confidence < MINIMUM_CONFIDENCE
    ) {
      return fallback;
    }

    const adjustedScores = scoreQuizAnswers(answers);
    for (const intent of Object.keys(INTENT_CRITERIA) as RecommendationIntent[]) {
      const probability = finiteProbability(intentAnswer.probabilities[intent]);
      for (const [slug, bonus] of Object.entries(INTENT_BONUSES[intent])) {
        adjustedScores[slug] =
          (adjustedScores[slug] ?? 0) +
          probability * (bonus ?? 0) * intentAnswer.confidence;
      }
    }

    return {
      matches: rankQuizScores(adjustedScores),
      mode: "typesafe",
      intent: intentAnswer.choice,
      confidence: Math.round(intentAnswer.confidence * 1000) / 1000,
    };
  } catch {
    return fallback;
  }
}
