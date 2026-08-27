"use client";

import { useState } from "react";
import { Loader2, Gauge, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultActions } from "@/components/tools/ResultActions";

type Labels = {
  start: string;
  loading: string;
  tryAgain: string;
  downloadSpeed: string;
  latency: string;
  jitter: string;
  fileSize: string;
  error: string;
  saveBaseline: string;
  baselineSaved: string;
  comparisonTitle: string;
  comparisonHint: string;
  downloadChange: string;
  latencyChange: string;
  downloadImproved: string;
  downloadReduced: string;
  latencyImproved: string;
  latencyIncreased: string;
  unchanged: string;
  reportCopy: string;
  reportCopied: string;
  reportDownload: string;
};

const TEST_BYTES = 10 * 1024 * 1024; // 10 MB
const TEST_URL = `https://speed.cloudflare.com/__down?bytes=${TEST_BYTES}`;
const PING_URL = "https://speed.cloudflare.com/__down?bytes=1000";

type Measurement = {
  mbps: number;
  latency: number;
  jitter: number;
  checkedAt: string;
};

async function measureLatency(): Promise<{ median: number; jitter: number }> {
  const samples: number[] = [];
  for (let i = 0; i < 4; i++) {
    const start = performance.now();
    try {
      const response = await fetch(PING_URL, { cache: "no-store" });
      if (response.ok) samples.push(performance.now() - start);
    } catch {
      // Keep failed probes out of the latency sample.
    }
  }
  if (samples.length === 0) throw new Error("Latency probe failed");
  samples.sort((a, b) => a - b);
  return {
    median: samples[Math.floor(samples.length / 2)] ?? 0,
    jitter: (samples.at(-1) ?? 0) - (samples[0] ?? 0),
  };
}

async function measureDownload(): Promise<number> {
  const start = performance.now();
  const res = await fetch(`${TEST_URL}&cacheBust=${Date.now()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Download probe failed");
  const reader = res.body?.getReader();
  let received = 0;
  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value?.byteLength ?? 0;
    }
  } else {
    received = (await res.arrayBuffer()).byteLength;
  }
  const elapsed = (performance.now() - start) / 1000;
  if (elapsed <= 0 || received === 0) throw new Error("Empty download probe");
  const bits = received * 8;
  return bits / elapsed / 1_000_000; // Mbps
}

function signed(value: number, digits = 1) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(digits)}`;
}

function changeLabel(
  value: number,
  positive: string,
  negative: string,
  unchanged: string,
) {
  if (Math.abs(value) < 0.05) return unchanged;
  return value > 0 ? positive : negative;
}

export function SpeedTester({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [current, setCurrent] = useState<Measurement | null>(null);
  const [baseline, setBaseline] = useState<Measurement | null>(null);
  const [error, setError] = useState(false);

  const run = async () => {
    setStatus("loading");
    setCurrent(null);
    setError(false);
    try {
      const latency = await measureLatency();
      const speed = await measureDownload();
      setCurrent({
        mbps: speed,
        latency: latency.median,
        jitter: latency.jitter,
        checkedAt: new Date().toISOString(),
      });
    } catch {
      setError(true);
    } finally {
      setStatus("done");
    }
  };

  const report = current
    ? [
        "VPN Advisor — connection speed comparison",
        `Measured: ${current.checkedAt}`,
        `Download: ${current.mbps.toFixed(1)} Mbps`,
        `Median latency: ${current.latency.toFixed(0)} ms`,
        `Latency jitter: ${current.jitter.toFixed(0)} ms`,
        baseline
          ? `Baseline download: ${baseline.mbps.toFixed(1)} Mbps\nBaseline latency: ${baseline.latency.toFixed(0)} ms\nBaseline jitter: ${baseline.jitter.toFixed(0)} ms`
          : "Baseline: not saved",
        "Note: This is a one-time browser measurement, not a provider-wide performance rating.",
      ].join("\n")
    : "";

  const comparison = current && baseline
    ? {
        download: current.mbps - baseline.mbps,
        downloadPercent: baseline.mbps > 0 ? ((current.mbps - baseline.mbps) / baseline.mbps) * 100 : 0,
        latency: current.latency - baseline.latency,
      }
    : null;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
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
        {current && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => setBaseline(current)}
          >
            {baseline ? labels.baselineSaved : labels.saveBaseline}
          </Button>
        )}
      </div>

      <p className="mt-3 text-sm text-ink-muted">{labels.comparisonHint}</p>

      {status !== "idle" && error && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-900 dark:bg-red-950/40 dark:text-red-200"
        >
          {labels.error}
        </p>
      )}

      {status !== "idle" && !error && current && (
        <div className="mt-6" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              <Gauge className="size-4" aria-hidden="true" />
              {labels.downloadSpeed}
            </div>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-ink-strong">
              {current.mbps.toFixed(1)}
              <span className="ml-1 text-base font-medium text-ink-muted">
                Mbps
              </span>
            </p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              <Timer className="size-4" aria-hidden="true" />
              {labels.latency}
            </div>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-ink-strong">
              {current.latency.toFixed(0)}
              <span className="ml-1 text-base font-medium text-ink-muted">
                ms
              </span>
            </p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              <Timer className="size-4" aria-hidden="true" />
              {labels.jitter}
            </div>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-ink-strong">
              {current.jitter.toFixed(0)}
              <span className="ml-1 text-base font-medium text-ink-muted">
                ms
              </span>
            </p>
          </Card>
          </div>

          {comparison ? (
            <Card className="mt-4 border-brand-200 bg-brand-50/40 p-5 dark:bg-brand-950/20">
              <h2 className="text-lg font-bold text-ink-strong">
                {labels.comparisonTitle}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    {labels.downloadChange}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-ink-strong">
                    {signed(comparison.download)} Mbps
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {signed(comparison.downloadPercent)}% · {changeLabel(
                      comparison.downloadPercent,
                      labels.downloadImproved,
                      labels.downloadReduced,
                      labels.unchanged,
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface-base p-4 dark:bg-surface-subtle">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    {labels.latencyChange}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-ink-strong">
                    {signed(comparison.latency, 0)} ms
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {changeLabel(
                      -comparison.latency,
                      labels.latencyImproved,
                      labels.latencyIncreased,
                      labels.unchanged,
                    )}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-surface-subtle p-4 text-sm text-ink-muted">
              {labels.comparisonHint}
            </div>
          )}

          <ResultActions
            copyText={report}
            fileName="vpn-advisor-speed-report.txt"
            copyLabel={labels.reportCopy}
            copiedLabel={labels.reportCopied}
            downloadLabel={labels.reportDownload}
          />
        </div>
      )}
    </div>
  );
}
