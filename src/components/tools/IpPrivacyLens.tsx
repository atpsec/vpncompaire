"use client";

import { useMemo, useState } from "react";
import { Check, Download, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/tools/CopyButton";

type Labels = {
  title: string;
  subtitle: string;
  approximateLocation: string;
  maskedIp: string;
  privacy: string;
  copy: string;
  copied: string;
  download: string;
  downloaded: string;
  sceneAlt: string;
};

type Props = {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  labels: Labels;
};

function maskIp(ip: string): string {
  if (!ip) return "••••••••";

  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) return `${parts.slice(0, 3).join(".")}.•••`;
  }

  if (ip.includes(":")) {
    const parts = ip.split(":").filter(Boolean);
    return parts.length >= 2 ? `${parts.slice(0, 2).join(":")}:••••:••••` : "IPv6 · ••••••••";
  }

  return "••••••••";
}

function stableSeed(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash) % 360;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildShareSvg({
  location,
  maskedIp,
  seed,
}: {
  location: string;
  maskedIp: string;
  seed: number;
}): string {
  const accent = `hsl(${seed} 78% 52%)`;
  const secondary = `hsl(${(seed + 72) % 360} 82% 62%)`;
  const sky = `hsl(${(seed + 190) % 360} 72% 92%)`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${sky}"/>
  <circle cx="972" cy="132" r="84" fill="${secondary}" opacity=".92"/>
  <path d="M0 472 184 286l128 116 174-202 180 166 152-112 382 218v158H0Z" fill="${accent}" opacity=".92"/>
  <path d="M0 520 206 374l160 102 146-88 194 116 146-82 348 128v80H0Z" fill="#111827" opacity=".9"/>
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#111827" stroke-width="4"/>
  <text x="80" y="116" fill="#111827" font-family="Arial,sans-serif" font-size="28" font-weight="800" letter-spacing="2">VPN ADVISOR · IP PRIVACY LENS</text>
  <text x="80" y="250" fill="#111827" font-family="Arial,sans-serif" font-size="76" font-weight="900">${escapeXml(location)}</text>
  <text x="80" y="318" fill="#111827" font-family="monospace" font-size="32">${escapeXml(maskedIp)}</text>
  <text x="80" y="544" fill="#fff" font-family="Arial,sans-serif" font-size="26" font-weight="700">Share-safe summary · drawn in your browser</text>
</svg>`;
}

export function IpPrivacyLens({ ip, city, region, country, labels }: Props) {
  const [downloaded, setDownloaded] = useState(false);
  const location = [city, region, country].filter(Boolean).join(", ") || labels.approximateLocation;
  const maskedIp = maskIp(ip);
  const seed = useMemo(() => stableSeed(`${location}:${maskedIp}`), [location, maskedIp]);
  const shareText = `${labels.title}\n${labels.approximateLocation}: ${location}\n${labels.maskedIp}: ${maskedIp}\n${labels.privacy}`;
  const svg = useMemo(
    () => buildShareSvg({ location, maskedIp, seed }),
    [location, maskedIp, seed],
  );

  const download = () => {
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vpn-advisor-ip-privacy-lens.svg";
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 1800);
  };

  return (
    <section className="mt-8" aria-labelledby="ip-privacy-lens-title">
      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <h2 id="ip-privacy-lens-title" className="text-xl font-bold text-ink-strong">
                  {labels.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{labels.subtitle}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-surface-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {labels.maskedIp}
                </p>
                <p className="mt-2 break-all font-mono text-sm font-bold text-ink-strong">{maskedIp}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {labels.approximateLocation}
                </p>
                <p className="mt-2 text-sm font-bold text-ink-strong">{location}</p>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
              <EyeOff className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{labels.privacy}</span>
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <CopyButton value={shareText} copyLabel={labels.copy} copiedLabel={labels.copied} />
              <Button type="button" variant="secondary" size="sm" onClick={download}>
                {downloaded ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Download className="size-4" aria-hidden="true" />
                )}
                {downloaded ? labels.downloaded : labels.download}
              </Button>
            </div>
          </div>

          <div className="flex min-h-56 items-center justify-center border-t border-border bg-surface-subtle p-5 md:border-l md:border-t-0">
            <svg
              viewBox="0 0 1200 630"
              className="h-auto w-full max-w-md"
              role="img"
              aria-label={labels.sceneAlt}
            >
              <rect width="1200" height="630" fill={`hsl(${(seed + 190) % 360} 72% 92%)`} />
              <circle cx="972" cy="132" r="84" fill={`hsl(${(seed + 72) % 360} 82% 62%)`} opacity=".92" />
              <path
                d="M0 472 184 286l128 116 174-202 180 166 152-112 382 218v158H0Z"
                fill={`hsl(${seed} 78% 52%)`}
                opacity=".92"
              />
              <path d="M0 520 206 374l160 102 146-88 194 116 146-82 348 128v80H0Z" fill="#111827" opacity=".9" />
              <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#111827" strokeWidth="4" />
              <text x="80" y="116" fill="#111827" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="800" letterSpacing="2">
                IP PRIVACY LENS
              </text>
              <text x="80" y="250" fill="#111827" fontFamily="Arial, sans-serif" fontSize="76" fontWeight="900">
                {location}
              </text>
              <text x="80" y="318" fill="#111827" fontFamily="monospace" fontSize="32">
                {maskedIp}
              </text>
              <text x="80" y="544" fill="#fff" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700">
                Local-only visual
              </text>
            </svg>
          </div>
        </div>
      </Card>
    </section>
  );
}
