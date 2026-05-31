"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Labels = {
  start: string;
  loading: string;
  resultsTitle: string;
  detectedServers: string;
  noLeak: string;
  leakDetected: string;
  noLeakBody: string;
  leakBody: string;
  tryAgain: string;
  unknown: string;
};

type DnsRecord = { server: string; ttl: string };

async function queryDoh(domain: string): Promise<DnsRecord | null> {
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`,
      { headers: { Accept: "application/dns-json" } },
    );
    if (!res.ok) return null;
    const data: { Answer?: Array<{ data: string; TTL: number }> } =
      await res.json();
    const first = data.Answer?.[0];
    if (!first) return null;
    return { server: first.data, ttl: String(first.TTL) };
  } catch {
    return null;
  }
}

export function DnsLeakTester({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [records, setRecords] = useState<DnsRecord[]>([]);

  const run = async () => {
    setStatus("loading");
    setRecords([]);
    const domains = [
      "whoami.cloudflare",
      `${Math.random().toString(36).slice(2, 10)}.cloudflare.com`,
      `${Math.random().toString(36).slice(2, 10)}.example.com`,
    ];
    const results = await Promise.all(domains.map((d) => queryDoh(d)));
    const filtered = results.filter((r): r is DnsRecord => r !== null);
    setRecords(filtered);
    setStatus("done");
  };

  const uniqueServers = new Set(records.map((r) => r.server));
  const leak = uniqueServers.size > 1;

  return (
    <div className="mt-8">
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={run}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {labels.loading}
          </>
        ) : status === "done" ? (
          labels.tryAgain
        ) : (
          labels.start
        )}
      </Button>

      {status === "done" && (
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-bold text-ink-strong">
            {labels.resultsTitle}
          </h2>

          <div
            className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${
              leak
                ? "border-red-300 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200"
                : "border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
            }`}
          >
            {leak ? (
              <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <p className="font-semibold">
                {leak ? labels.leakDetected : labels.noLeak}
              </p>
              <p className="mt-1 text-sm">
                {leak ? labels.leakBody : labels.noLeakBody}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
              {labels.detectedServers}
            </h3>
            {records.length === 0 ? (
              <p className="mt-2 font-mono text-sm text-ink-muted">
                {labels.unknown}
              </p>
            ) : (
              <ul className="mt-2 space-y-1">
                {[...uniqueServers].map((server) => (
                  <li
                    key={server}
                    className="break-all font-mono text-sm text-ink-strong"
                  >
                    {server}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
