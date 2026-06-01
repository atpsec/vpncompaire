"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Labels = {
  start: string;
  loading: string;
  resultsTitle: string;
  detectedIps: string;
  localIp: string;
  publicIp: string;
  noLeak: string;
  leakDetected: string;
  noIps: string;
  noLeakBody: string;
  leakBody: string;
  tryAgain: string;
};

type Detected = { ip: string; type: "local" | "public" };

const LOCAL_PATTERNS = [
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^127\./,
  /^fe80:/i,
  /^fc/i,
  /^fd/i,
  /^::1$/,
];

function classify(ip: string): "local" | "public" {
  return LOCAL_PATTERNS.some((r) => r.test(ip)) ? "local" : "public";
}

async function detect(): Promise<Detected[]> {
  return new Promise((resolve) => {
    const ips = new Map<string, "local" | "public">();
    let pc: RTCPeerConnection | null = null;
    try {
      pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
    } catch {
      resolve([]);
      return;
    }

    pc.createDataChannel("");

    pc.onicecandidate = (event) => {
      if (!event.candidate) return;
      const parts = event.candidate.candidate.split(" ");
      const ip = parts[4];
      if (!ip || ip === "0.0.0.0") return;
      if (ip.endsWith(".local")) return;
      if (!ips.has(ip)) ips.set(ip, classify(ip));
    };

    pc.createOffer()
      .then((offer) => pc?.setLocalDescription(offer))
      .catch(() => {});

    setTimeout(() => {
      try {
        pc?.close();
      } catch {
        // ignore
      }
      resolve(
        [...ips.entries()].map(([ip, type]) => ({ ip, type })),
      );
    }, 2500);
  });
}

export function WebRtcLeakTester({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [results, setResults] = useState<Detected[]>([]);

  const run = async () => {
    setStatus("loading");
    setResults([]);
    const detected = await detect();
    setResults(detected);
    setStatus("done");
  };

  const publicIps = results.filter((r) => r.type === "public");
  const localIps = results.filter((r) => r.type === "local");
  const leak = publicIps.length > 0;

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

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {labels.publicIp}
              </h3>
              {publicIps.length === 0 ? (
                <p className="mt-2 font-mono text-sm text-ink-muted">
                  {labels.noIps}
                </p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {publicIps.map((r) => (
                    <li
                      key={r.ip}
                      className="break-all font-mono text-sm font-semibold text-red-700 dark:text-red-300"
                    >
                      {r.ip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {labels.localIp}
              </h3>
              {localIps.length === 0 ? (
                <p className="mt-2 font-mono text-sm text-ink-muted">
                  {labels.noIps}
                </p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {localIps.map((r) => (
                    <li
                      key={r.ip}
                      className="break-all font-mono text-sm text-ink"
                    >
                      {r.ip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
