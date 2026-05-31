/**
 * Normalize a string for accent/diacritic-insensitive, case-insensitive search.
 * Handles Turkish-specific characters (ı/i, ş/s, ğ/g, ü/u, ö/o, ç/c) so that
 * a query like "sifre" can match a term containing "şifre".
 */
export function normalizeForSearch(text: string): string {
  if (!text) return "";
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "c")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Find all matching ranges of `needle` (already-normalized) inside `haystack`
 * (original casing/diacritics preserved). Returns [start, end) index pairs
 * relative to the original haystack — suitable for slicing to add <mark> tags.
 *
 * We normalize the haystack character-by-character so each normalized char maps
 * back to its original index. Two-char expansions are not common in our inputs,
 * but we conservatively use a one-to-one mapping based on the first normalized
 * character of each source char (sufficient for Turkish + ASCII).
 */
export function findMatchRanges(
  haystack: string,
  normalizedNeedle: string,
): Array<[number, number]> {
  if (!normalizedNeedle) return [];
  const map: number[] = [];
  let normalized = "";
  for (let i = 0; i < haystack.length; i++) {
    const ch = haystack[i];
    const n = normalizeForSearch(ch);
    if (!n) continue;
    // Map each normalized char back to the original index `i`.
    for (let j = 0; j < n.length; j++) {
      map.push(i);
    }
    normalized += n;
  }

  const ranges: Array<[number, number]> = [];
  let from = 0;
  while (from <= normalized.length - normalizedNeedle.length) {
    const idx = normalized.indexOf(normalizedNeedle, from);
    if (idx === -1) break;
    const startOrig = map[idx];
    const endNormIdx = idx + normalizedNeedle.length - 1;
    const endOrig = map[endNormIdx] + 1;
    if (
      ranges.length > 0 &&
      ranges[ranges.length - 1][1] >= startOrig
    ) {
      // Merge overlapping ranges
      ranges[ranges.length - 1][1] = Math.max(
        ranges[ranges.length - 1][1],
        endOrig,
      );
    } else {
      ranges.push([startOrig, endOrig]);
    }
    from = idx + normalizedNeedle.length;
  }
  return ranges;
}
