type AcceptEntry = {
  type: string;
  subtype: string;
  q: number;
  order: number;
};

export type Representation = "text/html" | "text/markdown";

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((part, order) => {
      const [mediaRange, ...parameters] = part.trim().split(";");
      const [type, subtype] = mediaRange.trim().toLowerCase().split("/");

      if (!type || !subtype) return null;

      const qParameter = parameters.find((parameter) =>
        /^\s*q\s*=/i.test(parameter),
      );
      const parsedQ = qParameter
        ? Number.parseFloat(qParameter.split("=")[1]?.trim() ?? "0")
        : 1;

      return {
        type,
        subtype,
        q: Number.isFinite(parsedQ) ? Math.min(Math.max(parsedQ, 0), 1) : 0,
        order,
      };
    })
    .filter((entry): entry is AcceptEntry => Boolean(entry));
}

function specificity(entry: AcceptEntry, candidate: Representation): number {
  const [type, subtype] = candidate.split("/");
  if (entry.type === type && entry.subtype === subtype) return 2;
  if (entry.type === type && entry.subtype === "*") return 1;
  if (entry.type === "*" && entry.subtype === "*") return 0;
  return -1;
}

function qualityFor(
  entries: AcceptEntry[],
  candidate: Representation,
): { q: number; order: number } {
  const matches = entries
    .map((entry) => ({ entry, specificity: specificity(entry, candidate) }))
    .filter(({ specificity: score }) => score >= 0)
    .sort(
      (a, b) =>
        b.specificity - a.specificity || a.entry.order - b.entry.order,
    );

  const best = matches[0];
  return best
    ? { q: best.entry.q, order: best.entry.order }
    : { q: 0, order: Number.POSITIVE_INFINITY };
}

/** Select the best representation available for an HTTP Accept header. */
export function preferredRepresentation(
  header: string | null,
): Representation | null {
  if (!header?.trim()) return "text/html";

  const entries = parseAccept(header);
  // A wildcard means "anything". Keep the normal browser-facing HTML
  // representation as the deterministic default unless Markdown is explicitly
  // preferred by the client.
  const candidates: Representation[] = ["text/html", "text/markdown"];
  const ranked = candidates
    .map((candidate) => ({ candidate, ...qualityFor(entries, candidate) }))
    .filter(({ q }) => q > 0)
    .sort((a, b) => b.q - a.q || a.order - b.order);

  return ranked[0]?.candidate ?? null;
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept, Accept-Encoding");
    return;
  }

  const tokens = existing
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
  if (!tokens.includes("accept")) tokens.push("Accept");
  if (!tokens.includes("accept-encoding")) tokens.push("Accept-Encoding");
  headers.set("Vary", tokens.join(", "));
}
