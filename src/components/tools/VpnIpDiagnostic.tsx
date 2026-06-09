"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  CircleHelp,
  Loader2,
  MapPin,
  RefreshCw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/tools/CopyButton";

type VpnTestResult = {
  ip: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  isp: string | null;
  asn: string | null;
  networkType: string | null;
  signals: {
    datacenter: boolean | null;
    proxy: boolean | null;
    vpn: boolean | null;
    tor: boolean | null;
  };
  detected: boolean | null;
  degraded: boolean;
  source: "ipapi.is" | "request-headers";
  checkedAt: string;
};

type Labels = {
  locale: string;
  loading: string;
  runAgain: string;
  checking: string;
  errorTitle: string;
  errorBody: string;
  rateLimitedBody: string;
  degradedNote: string;
  privacyNote: string;
  lastChecked: string;
  unknown: string;
  publicIp: string;
  country: string;
  city: string;
  isp: string;
  asn: string;
  networkType: string;
  detectionTitle: string;
  detectionDetected: string;
  detectionClear: string;
  detectionUnavailable: string;
  detectionCaveat: string;
  signals: {
    datacenter: string;
    proxy: string;
    vpn: string;
    tor: string;
  };
  signalYes: string;
  signalNo: string;
  signalUnknown: string;
  copy: string;
  copied: string;
};

type Status = "loading" | "done" | "error";

type RequestResult =
  | { ok: true; data: VpnTestResult }
  | { ok: false; rateLimited: boolean };

async function requestVpnTest(): Promise<RequestResult> {
  try {
    const res = await fetch("/api/vpn-test", { cache: "no-store" });
    if (res.status === 429) return { ok: false, rateLimited: true };
    if (!res.ok) return { ok: false, rateLimited: false };
    return { ok: true, data: (await res.json()) as VpnTestResult };
  } catch {
    return { ok: false, rateLimited: false };
  }
}

function countryName(countryCode: string | null, fallback: string | null, locale: string) {
  if (!countryCode) return fallback;
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(countryCode) ?? fallback;
  } catch {
    return fallback;
  }
}

function signalLabel(value: boolean | null, labels: Labels) {
  if (value === true) return labels.signalYes;
  if (value === false) return labels.signalNo;
  return labels.signalUnknown;
}

export function VpnIpDiagnostic({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<Status>("loading");
  const [result, setResult] = useState<VpnTestResult | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  const run = async () => {
    setStatus("loading");
    setRateLimited(false);
    const response = await requestVpnTest();
    if (response.ok) {
      setResult(response.data);
      setStatus("done");
    } else {
      setRateLimited(response.rateLimited);
      setStatus("error");
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const response = await requestVpnTest();
      if (cancelled) return;
      if (response.ok) {
        setResult(response.data);
        setStatus("done");
      } else {
        setRateLimited(response.rateLimited);
        setStatus("error");
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayCountry = useMemo(
    () => countryName(result?.countryCode ?? null, result?.country ?? null, labels.locale),
    [labels.locale, result?.country, result?.countryCode],
  );

  const detectionCopy = useMemo(() => {
    if (!result || result.detected === null) {
      return {
        icon: AlertTriangle,
        title: labels.detectionUnavailable,
        className:
          "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/35 dark:text-amber-100",
      };
    }
    if (result.detected) {
      return {
        icon: ShieldAlert,
        title: labels.detectionDetected,
        className:
          "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/35 dark:text-amber-100",
      };
    }
    return {
      icon: ShieldCheck,
      title: labels.detectionClear,
      className:
        "border-emerald-300 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/35 dark:text-emerald-100",
    };
  }, [labels.detectionClear, labels.detectionDetected, labels.detectionUnavailable, result]);

  const DetectionIcon = detectionCopy.icon;

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
          ) : (
            <>
              <RefreshCw className="size-4" aria-hidden="true" />
              {labels.runAgain}
            </>
          )}
        </Button>
        <p className="text-sm text-ink-muted">{labels.privacyNote}</p>
      </div>

      {status === "loading" && (
        <Card className="mt-6 p-6" aria-live="polite">
          <div className="flex items-center gap-3 text-ink-muted">
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            <p className="font-medium">{labels.checking}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[labels.publicIp, labels.country, labels.isp, labels.detectionTitle].map(
              (label) => (
                <div
                  key={label}
                  className="h-24 rounded-lg border border-border bg-surface-subtle p-4"
                >
                  <div className="h-3 w-24 rounded bg-surface-muted" />
                  <div className="mt-4 h-5 w-3/4 rounded bg-surface-muted" />
                </div>
              ),
            )}
          </div>
        </Card>
      )}

      {status === "error" && (
        <Card
          className="mt-6 border-red-300 bg-red-50 p-6 text-red-950 dark:bg-red-950/35 dark:text-red-100"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="font-bold">{labels.errorTitle}</h2>
              <p className="mt-1 text-sm">
                {rateLimited ? labels.rateLimitedBody : labels.errorBody}
              </p>
            </div>
          </div>
        </Card>
      )}

      {status === "done" && result && (
        <div aria-live="polite">
          {result.degraded && (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/35 dark:text-amber-100">
              <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />
              <p>{labels.degradedNote}</p>
            </div>
          )}

          <Card className="mt-6 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {labels.publicIp}
                </p>
                <p className="mt-2 break-all font-mono text-3xl font-bold tabular-nums text-ink-strong sm:text-5xl">
                  {result.ip ?? labels.unknown}
                </p>
                <p className="mt-3 text-xs text-ink-muted">
                  {labels.lastChecked}
                </p>
              </div>
              {result.ip && (
                <CopyButton
                  value={result.ip}
                  copyLabel={labels.copy}
                  copiedLabel={labels.copied}
                />
              )}
            </div>
          </Card>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailCard
              icon={MapPin}
              label={labels.country}
              value={displayCountry ?? labels.unknown}
            />
            <DetailCard
              icon={MapPin}
              label={labels.city}
              value={[result.city, result.region].filter(Boolean).join(", ") || labels.unknown}
            />
            <DetailCard
              icon={Building2}
              label={labels.isp}
              value={result.isp ?? labels.unknown}
            />
            <DetailCard
              icon={Wifi}
              label={labels.asn}
              value={result.asn ?? labels.unknown}
              mono
            />
            <DetailCard
              icon={Server}
              label={labels.networkType}
              value={result.networkType ?? labels.unknown}
            />
            <div className={`rounded-lg border p-5 ${detectionCopy.className}`}>
              <div className="flex items-start gap-3">
                <DetectionIcon className="size-5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide opacity-75">
                    {labels.detectionTitle}
                  </dt>
                  <dd className="mt-1 font-semibold">{detectionCopy.title}</dd>
                </div>
              </div>
            </div>
          </dl>

          <Card className="mt-6 p-6">
            <h2 className="text-lg font-bold text-ink-strong">
              {labels.detectionTitle}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(result.signals).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-subtle px-4 py-3"
                >
                  <span className="text-sm font-medium text-ink">
                    {labels.signals[key as keyof Labels["signals"]]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-strong">
                    {value === true ? (
                      <AlertTriangle className="size-4 text-amber-600" aria-hidden="true" />
                    ) : value === false ? (
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <CircleHelp className="size-4 text-ink-muted" aria-hidden="true" />
                    )}
                    {signalLabel(value, labels)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              {labels.detectionCaveat}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-lg border border-border bg-surface-base p-5 dark:bg-surface-subtle">
      <Icon className="size-5 shrink-0 text-brand-600" aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {label}
        </dt>
        <dd
          className={`mt-1 truncate text-sm font-semibold text-ink-strong ${
            mono ? "font-mono" : ""
          }`}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
