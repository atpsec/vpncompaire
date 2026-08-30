import { env } from "@/env";

export function hasKvRest(): boolean {
  return Boolean(env.KV_REST_API_URL && env.KV_REST_API_TOKEN);
}

/** Minimal Upstash-compatible Redis REST client shared by server-only helpers. */
export async function kvRestCommand(command: string[]): Promise<unknown | null> {
  const url = env.KV_REST_API_URL;
  const token = env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const path = command.map((part) => encodeURIComponent(part)).join("/");
  const response = await fetch(`${url.replace(/\/$/, "")}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(2_500),
  });

  if (!response.ok) {
    throw new Error(`KV ${command[0]} ${response.status}`);
  }

  const body = (await response.json()) as { result?: unknown };
  return body.result ?? null;
}
