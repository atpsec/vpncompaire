import { transparencyIndexDataset } from "@/data/transparency-index";

export const revalidate = 3600;

export async function GET() {
  return new Response(`${JSON.stringify(transparencyIndexDataset(), null, 2)}\n`, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
