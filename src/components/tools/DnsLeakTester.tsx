"use client";

import { useState } from "react";
import { Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultActions } from "@/components/tools/ResultActions";

type Labels = {
  start: string;
  loading: string;
  resultsTitle: string;
  experimentalTitle: string;
  experimentalBody: string;
  tryAgain: string;
  unknown: string;
  noResponseHint: string;
  observedAnswers: string;
  answerCount: string;
  ttl: string;
  reportCopy: string;
  reportCopied: string;
  reportDownload: string;
};

type DnsRecord = { domain: string; answer: string; ttl: string };

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
    return { domain, answer: first.data, ttl: String(first.TTL) };
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

  const uniqueAnswers = new Set(records.map((r) => r.answer));
  const report = [
    "VPN Advisor — DNS browser probe",
    `Probes completed: ${records.length}`,
    `Unique DNS answers observed: ${uniqueAnswers.size}`,
    ...records.map((record) => `${record.domain}: ${record.answer} (TTL ${record.ttl}s)`),
    "Important limitation: This browser probe queries Cloudflare DoH and does not identify the operating system's resolver or prove a system-wide DNS leak.",
  ].join("\n");

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
        <Card className="mt-6 p-6" aria-live="polite">
          <h2 className="text-lg font-bold text-ink-strong">
            {labels.resultsTitle}
          </h2>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <Info className="size-5 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="font-semibold">{labels.experimentalTitle}</p>
              <p className="mt-1 text-sm">{labels.experimentalBody}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
              {labels.observedAnswers}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              {labels.answerCount}: {uniqueAnswers.size}
            </p>
            {records.length === 0 ? (
              <>
                <p className="mt-2 font-mono text-sm text-ink-muted">
                  {labels.unknown}
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  {labels.noResponseHint}
                </p>
              </>
            ) : (
              <ul className="mt-3 space-y-2">
                {records.map((record) => (
                  <li
                    key={`${record.domain}-${record.answer}`}
                    className="rounded-lg border border-border bg-surface-subtle p-3 text-sm"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <code className="break-all font-semibold text-ink-strong">{record.domain}</code>
                      <span className="text-xs text-ink-muted">{labels.ttl}: {record.ttl}s</span>
                    </div>
                    <code className="mt-1 block break-all text-ink-muted">{record.answer}</code>
                  </li>
                ))}
              </ul>
            )}
            <ResultActions
              copyText={report}
              fileName="vpn-advisor-dns-probe.txt"
              copyLabel={labels.reportCopy}
              copiedLabel={labels.reportCopied}
              downloadLabel={labels.reportDownload}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
