export const VPN_QUIZ_QUESTIONS = [
  {
    id: "priority",
    optionsPoints: [
      { nordvpn: 3, expressvpn: 3, surfshark: 2, cyberghost: 3 },
      { mullvad: 4, "proton-vpn": 3, pia: 2, nordvpn: 1 },
      { nordvpn: 2, surfshark: 2, expressvpn: 2, "proton-vpn": 2 },
      { nordvpn: 3, expressvpn: 3, pia: 2 },
    ],
  },
  {
    id: "budget",
    optionsPoints: [
      { "proton-vpn": 5, windscribe: 2 },
      { surfshark: 4, pia: 3, ipvanish: 2 },
      { nordvpn: 3, "proton-vpn": 2, mullvad: 3 },
      { expressvpn: 4, nordvpn: 3 },
    ],
  },
  {
    id: "devices",
    optionsPoints: [
      { mullvad: 2, "proton-vpn": 2 },
      { nordvpn: 2, expressvpn: 2, pia: 2 },
      { nordvpn: 3, ipvanish: 2 },
      { surfshark: 5, windscribe: 2 },
    ],
  },
  {
    id: "location",
    optionsPoints: [
      {
        nordvpn: 3,
        expressvpn: 3,
        surfshark: 3,
        cyberghost: 2,
        pia: 1,
      },
      { mullvad: 3, "proton-vpn": 2 },
      { nordvpn: 1, surfshark: 1 },
    ],
  },
  {
    id: "trust",
    optionsPoints: [
      {
        nordvpn: 3,
        expressvpn: 3,
        mullvad: 2,
        "proton-vpn": 3,
        tunnelbear: 2,
      },
      { "proton-vpn": 4, mullvad: 4, pia: 3 },
      { pia: 4, expressvpn: 3 },
      { nordvpn: 2, expressvpn: 2, surfshark: 1 },
    ],
  },
  {
    id: "ease",
    optionsPoints: [
      { surfshark: 2, nordvpn: 2, expressvpn: 3, tunnelbear: 3 },
      { nordvpn: 2, "proton-vpn": 2, surfshark: 2 },
      { pia: 4, mullvad: 3, "proton-vpn": 2 },
    ],
  },
] as const;

export type QuizQuestionId = (typeof VPN_QUIZ_QUESTIONS)[number]["id"];
export type QuizAnswers = Record<QuizQuestionId, number>;
export type QuizMatch = readonly [slug: string, score: number];

const ANSWER_DESCRIPTIONS = {
  priority: [
    "Streaming and regional media access",
    "Privacy and anonymity",
    "Everyday security on public Wi-Fi",
    "Gaming and DDoS protection",
  ],
  budget: [
    "Free option preferred",
    "Low price, under roughly 3 USD per month",
    "Mid-range price, roughly 3 to 7 USD per month",
    "No fixed budget; quality is the priority",
  ],
  devices: [
    "One or two devices",
    "Three to five devices",
    "Five to ten devices",
    "Unlimited devices for a household",
  ],
  location: [
    "A Turkish server is required",
    "A Turkish server is not needed",
    "Uncertain whether a Turkish server is needed",
  ],
  trust: [
    "Independent audit history matters most",
    "Open-source clients matter most",
    "A documented response to a legal request matters most",
    "Brand recognition is a sufficient trust signal",
  ],
  ease: [
    "Beginner who wants a simple experience",
    "Intermediate user who adjusts settings",
    "Advanced user interested in port forwarding or multi-hop",
  ],
} as const satisfies Record<QuizQuestionId, readonly string[]>;

export function isCompleteQuizAnswers(
  answers: Partial<QuizAnswers>,
): answers is QuizAnswers {
  return VPN_QUIZ_QUESTIONS.every((question) => {
    const answer = answers[question.id];
    return (
      answer !== undefined &&
      Number.isInteger(answer) &&
      answer >= 0 &&
      answer < question.optionsPoints.length
    );
  });
}

export function describeQuizAnswers(answers: QuizAnswers) {
  return Object.fromEntries(
    VPN_QUIZ_QUESTIONS.map((question) => [
      question.id,
      ANSWER_DESCRIPTIONS[question.id][answers[question.id]],
    ]),
  ) as Record<QuizQuestionId, string>;
}

export function scoreQuizAnswers(
  answers: Partial<QuizAnswers>,
): Record<string, number> {
  return VPN_QUIZ_QUESTIONS.reduce<Record<string, number>>((scores, question) => {
    const optionIndex = answers[question.id];
    if (optionIndex === undefined) return scores;

    const points = question.optionsPoints[optionIndex] as
      | Partial<Record<string, number>>
      | undefined;
    if (!points) return scores;

    for (const [slug, value] of Object.entries(points)) {
      scores[slug] = (scores[slug] ?? 0) + (value ?? 0);
    }
    return scores;
  }, {});
}

export function rankQuizScores(
  scores: Record<string, number>,
  limit = 3,
): QuizMatch[] {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export function rankQuizAnswers(
  answers: Partial<QuizAnswers>,
  limit = 3,
): QuizMatch[] {
  return rankQuizScores(scoreQuizAnswers(answers), limit);
}
