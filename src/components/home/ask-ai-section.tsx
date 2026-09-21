"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, ExternalLink } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import {
  siAnthropic,
  siGooglegemini,
  siPerplexity,
} from "simple-icons";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToolId = "chatgpt" | "claude" | "gemini" | "perplexity" | "grok";

type Tool = {
  id: ToolId;
  href: string;
  queryParam?: string;
  icon: SimpleIcon | { src: string };
};

const TOOLS: Tool[] = [
  {
    id: "chatgpt",
    href: "https://chatgpt.com/",
    queryParam: "q",
    icon: { src: "/ai-logos/chatgpt.svg" },
  },
  {
    id: "claude",
    href: "https://claude.ai/new",
    icon: siAnthropic,
  },
  {
    id: "gemini",
    href: "https://gemini.google.com/app",
    icon: siGooglegemini,
  },
  {
    id: "perplexity",
    href: "https://www.perplexity.ai/search/new",
    queryParam: "q",
    icon: siPerplexity,
  },
  {
    id: "grok",
    href: "https://grok.com/",
    icon: { src: "/ai-logos/grok.svg" },
  },
];

function isSimpleIcon(icon: Tool["icon"]): icon is SimpleIcon {
  return "path" in icon;
}

function BrandLogo({ tool, name }: { tool: Tool; name: string }) {
  if (!isSimpleIcon(tool.icon)) {
    return (
      <Image
        src={tool.icon.src}
        alt={`${name} resmi logosu`}
        width={48}
        height={48}
        unoptimized
        className="size-12 rounded-lg bg-white p-1 object-contain"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${name} resmi logosu`}
      className="size-12"
      style={{ color: `#${tool.icon.hex}` }}
    >
      <path d={tool.icon.path} fill="currentColor" />
    </svg>
  );
}

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.setAttribute("aria-hidden", "true");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);
    return copied;
  } catch {
    return false;
  }
}

export function AskAiSection() {
  const t = useTranslations("home.askAi");
  const [copiedTool, setCopiedTool] = useState<ToolId | null>(null);
  const [failedTool, setFailedTool] = useState<ToolId | null>(null);

  async function handleAsk(tool: Tool) {
    const prompt = t("prompt");
    const targetUrl = tool.queryParam
      ? `${tool.href}?${tool.queryParam}=${encodeURIComponent(prompt)}`
      : tool.href;

    // Open synchronously so popup blockers do not treat the tab as a delayed
    // navigation while the clipboard fallback runs.
    window.open(targetUrl, "_blank", "noopener,noreferrer");
    const copied = await copyToClipboard(prompt);

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        window.gtag("event", "ai_prompt_open", {
          ai_platform: tool.id,
          prompt_copied: copied ? "true" : "false",
        });
      } catch {
        // Analytics must never block opening the selected AI tool.
      }
    }

    if (copied) {
      setCopiedTool(tool.id);
      setFailedTool(null);
      window.setTimeout(() => setCopiedTool(null), 2200);
    } else {
      setFailedTool(tool.id);
      setCopiedTool(null);
    }
  }

  return (
    <section
      id="ask-ai"
      className="border-y border-border bg-brand-50/30 py-14 sm:py-18"
      aria-labelledby="ask-ai-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            <Copy className="size-3.5" aria-hidden="true" />
            {t("kicker")}
          </div>
          <h2 id="ask-ai-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-ink-muted">{t("subtitle")}</p>
          <p className="mt-3 text-sm text-ink-subtle">{t("disclaimer")}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TOOLS.map((tool) => {
            const name = t(`tools.${tool.id}.name` as never);
            const description = t(`tools.${tool.id}.description` as never);
            const copied = copiedTool === tool.id;
            const failed = failedTool === tool.id;

            return (
              <Card key={tool.id} className="flex h-full flex-col p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-subtle p-1.5 dark:bg-surface-muted">
                    <BrandLogo tool={tool} name={name} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink-strong">{name}</h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-5 w-full"
                  onClick={() => void handleAsk(tool)}
                  aria-label={`${t("action")} — ${name}`}
                >
                  {copied ? (
                    <>
                      <Check className="size-4" aria-hidden="true" />
                      {t("copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" aria-hidden="true" />
                      {t("action")}
                    </>
                  )}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Button>
                {failed ? (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-ink-subtle" aria-live="polite">
                      {t("copyFailed")}
                    </p>
                    <textarea
                      readOnly
                      value={t("prompt")}
                      aria-label={t("fallbackLabel")}
                      onFocus={(event) => event.currentTarget.select()}
                      className={cn(
                        "min-h-24 w-full resize-y rounded-md border border-border bg-surface-base p-2 text-xs leading-relaxed text-ink",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                      )}
                    />
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>

        <p className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-1.5 text-center text-xs text-ink-subtle">
          <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
          {t("footerNote")}
        </p>
      </Container>
    </section>
  );
}
