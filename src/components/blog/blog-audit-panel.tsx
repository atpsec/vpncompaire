"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

type AuditArticle = {
  slug: string;
  views: number;
  lastAcceptedAt: string | null;
};

type AuditSnapshot = {
  generatedAt: string;
  policy: {
    version: string;
    qualifyingEvent: string;
    visibleSeconds: number;
    deduplication: string;
    rawIpStored: boolean;
  };
  storage: {
    mode: "kv" | "file" | "process";
    durable: boolean;
    shared: boolean;
  };
  verification: {
    status: "verifiable" | "limited";
    note: string;
  };
  articleCount: number;
  totalReads: number;
  articleSum: number;
  totalMatchesArticleSum: boolean;
  articles: AuditArticle[];
  integrity: {
    algorithm: string;
    input: string;
    canonicalJson: string;
    digest: string;
  };
};

function formatTimestamp(value: string | null) {
  if (!value) return "No accepted read yet";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

function storageLabel(mode: AuditSnapshot["storage"]["mode"]) {
  return mode === "kv" ? "Shared KV" : mode === "file" ? "Server file" : "Process memory";
}

export function BlogAuditPanel() {
  const [snapshot, setSnapshot] = useState<AuditSnapshot | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadSnapshot = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/blog-readership-audit", {
        cache: "no-store",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
        referrerPolicy: "no-referrer",
      });
      if (!response.ok) throw new Error("audit snapshot unavailable");
      setSnapshot((await response.json()) as AuditSnapshot);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadSnapshot();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadSnapshot]);

  if (loading && !snapshot) {
    return <p className="mt-8 text-ink-muted">Loading the current audit snapshot…</p>;
  }

  if (error && !snapshot) {
    return (
      <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
        <p className="font-semibold">The audit snapshot could not be loaded.</p>
        <button
          type="button"
          onClick={() => void loadSnapshot()}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-800"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  }

  if (!snapshot) return null;

  const isVerifiable = snapshot.verification.status === "verifiable";

  return (
    <div className="mt-10 space-y-8">
      <section
        className={`rounded-2xl border p-5 sm:p-6 ${
          isVerifiable
            ? "border-brand-200 bg-brand-50/50 dark:bg-brand-950/20"
            : "border-amber-300 bg-amber-50/60 dark:bg-amber-950/20"
        }`}
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          {isVerifiable ? (
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden="true" />
          ) : (
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
          )}
          <div>
            <h2 className="font-semibold text-ink-strong">
              {isVerifiable ? "Server-side snapshot is verifiable" : "Verification is limited by storage configuration"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{snapshot.verification.note}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Audit summary">
        <AuditMetric label="Total article reads" value={snapshot.totalReads.toLocaleString("en-US")} />
        <AuditMetric label="Articles included" value={snapshot.articleCount.toLocaleString("en-US")} />
        <AuditMetric label="Storage" value={`${storageLabel(snapshot.storage.mode)}${snapshot.storage.shared ? " · shared" : ""}`} />
        <AuditMetric
          label="Total matches article sum"
          value={snapshot.totalMatchesArticleSum ? "Yes" : "No"}
          tone={snapshot.totalMatchesArticleSum ? "default" : "warning"}
        />
      </section>

      <section className="rounded-2xl border border-border bg-surface-base p-5 dark:bg-surface-subtle sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden="true" />
          <div className="min-w-0">
            <h2 className="font-semibold text-ink-strong">Counting policy</h2>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <AuditDetail label="Qualifying event" value="8 seconds with the article visible" />
              <AuditDetail label="Deduplication" value="One pseudonymous reader token per article every 48 hours" />
              <AuditDetail label="Raw IP stored" value={snapshot.policy.rawIpStored ? "Yes" : "No"} />
              <AuditDetail label="Policy version" value={snapshot.policy.version} />
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="article-audit-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Machine-readable register</p>
            <h2 id="article-audit-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink-strong sm:text-3xl">
              Every current English article
            </h2>
          </div>
          <button
            type="button"
            onClick={() => void loadSnapshot()}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-surface-base px-3 py-2 text-sm font-semibold text-ink hover:border-brand-300 hover:text-brand-700 sm:self-auto"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Refresh
          </button>
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-[680px] w-full text-left text-sm">
            <caption className="sr-only">Blog article readership audit register</caption>
            <thead className="bg-surface-subtle text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="px-5 py-4">Article slug</th>
                <th scope="col" className="px-5 py-4">Accepted reads</th>
                <th scope="col" className="px-5 py-4">Last accepted read (UTC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface-base">
              {snapshot.articles.map((article) => (
                <tr key={article.slug} className="align-top">
                  <th scope="row" className="px-5 py-3 font-medium text-ink-strong">{article.slug}</th>
                  <td className="px-5 py-3 tabular-nums text-ink">{article.views.toLocaleString("en-US")}</td>
                  <td className="px-5 py-3 text-ink-muted">{formatTimestamp(article.lastAcceptedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface-subtle p-5 text-sm text-ink-muted">
        <p>
          Snapshot generated at <time dateTime={snapshot.generatedAt}>{formatTimestamp(snapshot.generatedAt)}</time>.
          The {snapshot.integrity.algorithm} digest below is calculated from the exact canonical JSON payload returned by the endpoint, so an external checker can recompute it.
        </p>
        <p className="mt-3 break-all font-mono text-xs text-ink">{snapshot.integrity.digest}</p>
        <a
          href="/api/blog-readership-audit"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline"
        >
          Open raw JSON snapshot <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

function AuditMetric({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "warning";
}) {
  return (
    <div className={`rounded-xl border p-4 ${tone === "warning" ? "border-amber-300 bg-amber-50/60 dark:bg-amber-950/20" : "border-border bg-surface-subtle/60"}`}>
      <p className="text-2xl font-bold tabular-nums text-ink-strong">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{label}</p>
    </div>
  );
}

function AuditDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="mt-1 leading-relaxed text-ink">{value}</dd>
    </div>
  );
}
