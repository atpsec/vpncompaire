"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  AtSign,
  CheckCircle2,
  CircleHelp,
  DatabaseZap,
  Loader2,
  MailCheck,
  RefreshCw,
  Search,
  ShieldCheck,
  ShieldX,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultActions } from "@/components/tools/ResultActions";

type CheckStatus = "pass" | "warning" | "fail" | "unknown";
type Risk = "low" | "medium" | "high";

type FindingKey =
  | "breach_found"
  | "hibp_not_configured"
  | "hibp_unavailable"
  | "no_mx"
  | "no_spf"
  | "weak_spf"
  | "no_dmarc"
  | "dmarc_monitor_only"
  | "disposable_email"
  | "role_account";

type EmailSecurityResult = {
  emailMasked: string;
  domain: string;
  checkedAt: string;
  score: number;
  risk: Risk;
  findings: FindingKey[];
  domainChecks: {
    mx: { status: CheckStatus; count: number };
    spf: { status: CheckStatus; record: string | null };
    dmarc: { status: CheckStatus; policy: string | null; record: string | null };
  };
  breachCheck:
    | {
        status: "checked";
        method: "hibp" | "xposedornot";
        found: boolean;
        count: number;
        breaches: string[];
      }
    | { status: "unavailable" };
  flags: {
    disposable: boolean;
    roleAccount: boolean;
  };
};

type Labels = {
  emailLabel: string;
  placeholder: string;
  submit: string;
  checking: string;
  runAgain: string;
  invalidEmail: string;
  errorTitle: string;
  errorBody: string;
  rateLimitedBody: string;
  privacyNote: string;
  privacyDetail: string;
  scoreLabel: string;
  riskLabels: Record<Risk, string>;
  statusLabels: Record<CheckStatus, string>;
  checkedAt: string;
  domainTitle: string;
  breachTitle: string;
  recommendationsTitle: string;
  noFindings: string;
  scoreCaveat: string;
  reportCopy: string;
  reportCopied: string;
  reportDownload: string;
  mx: {
    title: string;
    pass: string;
    fail: string;
  };
  spf: {
    title: string;
    pass: string;
    warning: string;
    fail: string;
  };
  dmarc: {
    title: string;
    pass: string;
    warning: string;
    fail: string;
  };
  breach: {
    clear: string;
    found: string;
    unavailable: string;
    methodHibp: string;
    methodXon: string;
    visibleBreaches: string;
  };
  findings: Record<FindingKey, string>;
};

type RequestResult =
  | { ok: true; data: EmailSecurityResult }
  | { ok: false; rateLimited: boolean; invalidEmail: boolean };

async function requestEmailSecurity(email: string): Promise<RequestResult> {
  try {
    const res = await fetch("/api/email-security", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });
    if (res.status === 429) {
      return { ok: false, rateLimited: true, invalidEmail: false };
    }
    if (res.status === 400) {
      return { ok: false, rateLimited: false, invalidEmail: true };
    }
    if (!res.ok) {
      return { ok: false, rateLimited: false, invalidEmail: false };
    }
    return { ok: true, data: (await res.json()) as EmailSecurityResult };
  } catch {
    return { ok: false, rateLimited: false, invalidEmail: false };
  }
}

function riskTone(risk: Risk) {
  if (risk === "low") {
    return {
      icon: ShieldCheck,
      className:
        "border-emerald-300 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/35 dark:text-emerald-100",
    };
  }
  if (risk === "medium") {
    return {
      icon: AlertTriangle,
      className:
        "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/35 dark:text-amber-100",
    };
  }
  return {
    icon: ShieldX,
    className:
      "border-red-300 bg-red-50 text-red-950 dark:bg-red-950/35 dark:text-red-100",
  };
}

const STATUS_ICONS: Record<CheckStatus, LucideIcon> = {
  pass: CheckCircle2,
  warning: AlertTriangle,
  fail: ShieldX,
  unknown: CircleHelp,
};

function statusClass(status: CheckStatus) {
  if (status === "pass") return "text-emerald-600";
  if (status === "warning") return "text-amber-600";
  if (status === "fail") return "text-red-600";
  return "text-ink-muted";
}

function formattedTime(value: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function EmailSecurityChecker({ labels }: { labels: Labels }) {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<EmailSecurityResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [rateLimited, setRateLimited] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const run = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setStatus("loading");
    setRateLimited(false);
    setInvalidEmail(false);
    const response = await requestEmailSecurity(email);
    if (response.ok) {
      setResult(response.data);
      setStatus("done");
    } else {
      setRateLimited(response.rateLimited);
      setInvalidEmail(response.invalidEmail);
      setStatus("error");
    }
  };

  const recommendations = useMemo(() => {
    if (!result) return [];
    return result.findings.filter(
      (finding) =>
        finding !== "hibp_not_configured" && finding !== "hibp_unavailable",
    );
  }, [result]);

  const risk = result ? riskTone(result.risk) : null;
  const RiskIcon = risk?.icon;
  const report = result
    ? [
        "VPN Advisor — email security check",
        `Checked: ${result.checkedAt}`,
        `Address: ${result.emailMasked}`,
        `Domain: ${result.domain}`,
        `Triage score: ${result.score}/100 (${result.risk})`,
        `MX: ${result.domainChecks.mx.status}`,
        `SPF: ${result.domainChecks.spf.status}`,
        `DMARC: ${result.domainChecks.dmarc.status}`,
        `Breach check: ${result.breachCheck.status === "checked" ? (result.breachCheck.found ? "known match" : "no known match") : "unavailable"}`,
        `Recommendations: ${recommendations.map((finding) => labels.findings[finding]).join(" | ") || labels.noFindings}`,
        "Important limitation: This is a domain and breach-signal triage result, not a guarantee that an account or mailbox is secure.",
      ].join("\n")
    : "";

  return (
    <div className="mt-8">
      <Card className="p-5 sm:p-6">
        <form onSubmit={run} className="space-y-4">
          <div>
            <label
              htmlFor="email-security-input"
              className="text-sm font-semibold text-ink-strong"
            >
              {labels.emailLabel}
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <AtSign
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden="true"
                />
                <input
                  id="email-security-input"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={labels.placeholder}
                  className="h-12 w-full rounded-md border border-border bg-background pl-10 pr-3 text-base text-foreground outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "loading"}
                className="shrink-0"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    {labels.checking}
                  </>
                ) : result ? (
                  <>
                    <RefreshCw className="size-4" aria-hidden />
                    {labels.runAgain}
                  </>
                ) : (
                  <>
                    <Search className="size-4" aria-hidden />
                    {labels.submit}
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-border bg-surface-subtle p-3 text-xs leading-relaxed text-ink-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-600" />
            <p>
              <span className="font-semibold text-ink">{labels.privacyNote}</span>{" "}
              {labels.privacyDetail}
            </p>
          </div>
        </form>
      </Card>

      {status === "loading" && (
        <Card className="mt-6 p-6" aria-live="polite">
          <div className="flex items-center gap-3 text-ink-muted">
            <Loader2 className="size-5 animate-spin" aria-hidden />
            <p className="font-medium">{labels.checking}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {["score", "mx", "spf"].map((key) => (
              <div
                key={key}
                className="h-28 rounded-lg border border-border bg-surface-subtle p-4"
              >
                <div className="h-3 w-24 rounded bg-surface-muted" />
                <div className="mt-5 h-7 w-2/3 rounded bg-surface-muted" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {status === "error" && (
        <Card
          className="mt-6 border-red-300 bg-red-50 p-6 text-red-950 dark:bg-red-950/35 dark:text-red-100"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 shrink-0" aria-hidden />
            <div>
              <h2 className="font-bold">{labels.errorTitle}</h2>
              <p className="mt-1 text-sm">
                {invalidEmail
                  ? labels.invalidEmail
                  : rateLimited
                    ? labels.rateLimitedBody
                    : labels.errorBody}
              </p>
            </div>
          </div>
        </Card>
      )}

      {status === "done" && result && risk && RiskIcon && (
        <div className="mt-6 space-y-6" aria-live="polite">
          <div className={`rounded-xl border p-6 ${risk.className}`}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <RiskIcon className="mt-1 size-6 shrink-0" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-75">
                    {labels.scoreLabel}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">
                    {labels.riskLabels[result.risk]}
                  </h2>
                  <p className="mt-1 text-sm opacity-80">
                    {result.emailMasked} | {result.domain}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-5xl font-bold tabular-nums">{result.score}</p>
                <p className="mt-1 text-xs opacity-75">
                  {labels.checkedAt}: {formattedTime(result.checkedAt)}
                </p>
                <p className="mt-2 max-w-sm text-xs opacity-75">
                  {labels.scoreCaveat}
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-ink-strong">
              <MailCheck className="size-5 text-brand-600" aria-hidden />
              {labels.domainTitle}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <DomainCheckCard
                icon={MailCheck}
                title={labels.mx.title}
                status={result.domainChecks.mx.status}
                statusLabel={labels.statusLabels[result.domainChecks.mx.status]}
                body={
                  result.domainChecks.mx.status === "pass"
                    ? labels.mx.pass
                    : labels.mx.fail
                }
                detail={
                  result.domainChecks.mx.count > 0
                    ? `${result.domainChecks.mx.count} MX`
                    : undefined
                }
              />
              <DomainCheckCard
                icon={ShieldCheck}
                title={labels.spf.title}
                status={result.domainChecks.spf.status}
                statusLabel={labels.statusLabels[result.domainChecks.spf.status]}
                body={
                  result.domainChecks.spf.status === "pass"
                    ? labels.spf.pass
                    : result.domainChecks.spf.status === "warning"
                      ? labels.spf.warning
                      : labels.spf.fail
                }
                detail={result.domainChecks.spf.record ?? undefined}
              />
              <DomainCheckCard
                icon={ShieldCheck}
                title={labels.dmarc.title}
                status={result.domainChecks.dmarc.status}
                statusLabel={labels.statusLabels[result.domainChecks.dmarc.status]}
                body={
                  result.domainChecks.dmarc.status === "pass"
                    ? labels.dmarc.pass
                    : result.domainChecks.dmarc.status === "warning"
                      ? labels.dmarc.warning
                      : labels.dmarc.fail
                }
                detail={result.domainChecks.dmarc.record ?? undefined}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-ink-strong">
              <DatabaseZap className="size-5 text-brand-600" aria-hidden />
              {labels.breachTitle}
            </h2>
            <BreachStatus result={result} labels={labels} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-ink-strong">
              {labels.recommendationsTitle}
            </h2>
            {recommendations.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {recommendations.map((finding) => (
                  <li key={finding} className="flex items-start gap-2 text-sm text-ink">
                    <AlertTriangle
                      className="mt-0.5 size-4 shrink-0 text-amber-600"
                      aria-hidden
                    />
                    <span>{labels.findings[finding]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-muted">{labels.noFindings}</p>
            )}
          </Card>

          <ResultActions
            copyText={report}
            fileName="vpn-advisor-email-security-report.txt"
            copyLabel={labels.reportCopy}
            copiedLabel={labels.reportCopied}
            downloadLabel={labels.reportDownload}
          />
        </div>
      )}
    </div>
  );
}

function DomainCheckCard({
  icon: Icon,
  title,
  status,
  statusLabel,
  body,
  detail,
}: {
  icon: LucideIcon;
  title: string;
  status: CheckStatus;
  statusLabel: string;
  body: string;
  detail?: string;
}) {
  const StatusIcon = STATUS_ICONS[status];

  return (
    <div className="rounded-lg border border-border bg-surface-subtle p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-brand-600" aria-hidden />
          <h3 className="font-semibold text-ink-strong">{title}</h3>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${statusClass(
            status,
          )}`}
        >
          <StatusIcon className="size-4" aria-hidden />
          {statusLabel}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
      {detail ? (
        <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-ink-subtle">
          {detail}
        </p>
      ) : null}
    </div>
  );
}

function breachMethodLabel(
  method: "hibp" | "xposedornot",
  labels: Labels,
): string {
  return method === "hibp" ? labels.breach.methodHibp : labels.breach.methodXon;
}

function BreachStatus({
  result,
  labels,
}: {
  result: EmailSecurityResult;
  labels: Labels;
}) {
  if (result.breachCheck.status === "unavailable") {
    return (
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {labels.breach.unavailable}
      </p>
    );
  }

  if (!result.breachCheck.found) {
    return (
      <div className="mt-4 flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-950 dark:bg-emerald-950/35 dark:text-emerald-100">
        <CheckCircle2 className="size-5 shrink-0" aria-hidden />
        <div>
          <p className="font-semibold">{labels.breach.clear}</p>
          <p className="mt-1 text-xs opacity-80">
            {breachMethodLabel(result.breachCheck.method, labels)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-950 dark:bg-red-950/35 dark:text-red-100">
      <div className="flex items-start gap-3">
        <ShieldX className="size-5 shrink-0" aria-hidden />
        <div>
          <p className="font-semibold">{labels.breach.found}</p>
          <p className="mt-1 text-xs opacity-80">
            {breachMethodLabel(result.breachCheck.method, labels)}
          </p>
        </div>
      </div>
      {result.breachCheck.breaches.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-75">
            {labels.breach.visibleBreaches}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.breachCheck.breaches.slice(0, 10).map((name) => (
              <span
                key={name}
                className="rounded-full bg-background/70 px-2.5 py-1 text-xs font-semibold text-ink-strong"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
