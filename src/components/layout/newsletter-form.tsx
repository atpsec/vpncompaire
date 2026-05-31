"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Lightweight email regex (RFC-friendly, intentionally simple)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

// window.plausible is declared globally in src/types/plausible.d.ts

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = React.useState("");
  // Honeypot field — real users won't fill this; bots usually will
  const [website, setWebsite] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState<string>("");

  const inputId = React.useId();
  const honeyId = React.useId();
  const helpId = React.useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setMessage(t("invalidEmail"));
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = (await res.json()) as { success?: boolean };
      if (!data.success) {
        throw new Error("not-success");
      }

      // PII-safe Plausible event — only the email domain is sent
      const domain = trimmed.split("@")[1] ?? "unknown";
      if (typeof window !== "undefined" && typeof window.plausible === "function") {
        window.plausible("Newsletter Signup", {
          props: { email_domain: domain },
        });
      }

      setStatus("success");
      setMessage(t("success"));
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(t("error"));
    }
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div>
      <h3 className="text-sm font-semibold text-ink-strong">{t("title")}</h3>
      <p className="mt-2 text-sm text-ink-muted">{t("description")}</p>

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch"
        noValidate
      >
        {/* Honeypot — visually hidden but reachable for bots */}
        <div
          aria-hidden="true"
          className="absolute h-0 w-0 overflow-hidden opacity-0"
          style={{ position: "absolute", left: "-10000px" }}
        >
          <label htmlFor={honeyId}>Website</label>
          <input
            id={honeyId}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="relative min-w-0 flex-1">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            disabled={isLoading || isSuccess}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder={t("emailPlaceholder")}
            aria-label={t("emailPlaceholder")}
            aria-describedby={helpId}
            aria-invalid={isError || undefined}
            className={cn(
              "h-11 w-full min-w-0 rounded-md border bg-surface-base pl-9 pr-3 text-sm text-ink",
              "placeholder:text-ink-subtle",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
              "disabled:opacity-60",
              "dark:bg-surface-subtle",
              isError ? "border-red-500" : "border-border",
            )}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading || isSuccess}
          className="shrink-0"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          {t("submit")}
        </Button>
      </form>

      <p
        id={helpId}
        role={isError ? "alert" : undefined}
        aria-live="polite"
        className={cn(
          "mt-2 flex items-start gap-1.5 text-[12px] leading-snug",
          isSuccess && "text-emerald-600 dark:text-emerald-400",
          isError && "text-red-600 dark:text-red-400",
          !isSuccess && !isError && "text-ink-subtle",
        )}
      >
        {isSuccess ? (
          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        ) : isError ? (
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        ) : null}
        <span className="break-words">
          {message || t("privacy")}
        </span>
      </p>
    </div>
  );
}
