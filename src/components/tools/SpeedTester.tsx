"use client";

import { useState } from "react";
import { Loader2, Gauge, Timer, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Labels = {
  start: string;
  loading: string;
  tryAgain: string;
  downloadSpeed: string;
  latency: string;
  fileSize: string;
};

const TEST_BYTES = 10 * 1024 * 1024; // 10 MB
const TEST_URL = `https://speed.cloudflare.com/__down?bytes=${TEST_BYTES}`;
const PING_URL = "https://speed.cloudflare.com/__down?bytes=1000";

async function measureLatency(): Promise<number> {
  const samples: number[] = [];
  for (let i = 0; i < 4; i++) {
    const start = performance.now();
    try {
      await fetch(PING_URL, { cache: "no-store" });
    } catch {
      // ignore
    }
    samples.push(performance.now() - start);
  }
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)] ?? 0;
}

async function measureDownload(): Promise<number> {
  const start = performance.now();
  const res = await fetch(`${TEST_URL}&cacheBust=${Date.now()}`, {
    cache: "no-store",
  });
  const reader = res.body?.getReader();
  let received = 0;
  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value?.byteLength ?? 0;
    }
  }
  const elapsed = (performance.now() - start) / 1000;
  if (elapsed <= 0) return 0;
  const bits = received * 8;
  return bits / elapsed / 1_000_000; // Mbps
}

export function SpeedTester({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [mbps, setMbps] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);

  const run = async () => {
    setStatus("loading");
    setMbps(null);
    setPing(null);
    try {
      const latency = await measureLatency();
      setPing(latency);
      const speed = await measureDownload();
      setMbps(speed);
    } catch {
      setMbps(0);
    } finally {
      setStatus("done");
    }
  };

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

      {status !== "idle" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              <Gauge className="size-4" aria-hidden="true" />
              {labels.downloadSpeed}
            </div>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-ink-strong">
              {mbps === null ? "—" : mbps.toFixed(1)}
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
              {ping === null ? "—" : ping.toFixed(0)}
              <span className="ml-1 text-base font-medium text-ink-muted">
                ms
              </span>
            </p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              <FileDown className="size-4" aria-hidden="true" />
              {labels.fileSize}
            </div>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-ink-strong">
              10
              <span className="ml-1 text-base font-medium text-ink-muted">
                MB
              </span>
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
