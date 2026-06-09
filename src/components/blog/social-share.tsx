"use client";

import { useSyncExternalStore, useState } from "react";
import {
  MessageCircle,
  Link as LinkIcon,
  Share2,
  Check,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Brand icons — inlined SVG (lucide-react removed brand icons in recent versions).
// Single-color, currentColor-aware, no runtime dependency on lucide-react brand support.

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

type SocialShareProps = {
  url: string;
  title: string;
  description: string;
  className?: string;
};

function track(platform: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", "share", { method: platform });
    } catch {
      // graceful skip — analytics never blocks UX
    }
  }
}

function truncateForTwitter(title: string): string {
  // X/Twitter counts URL as 23 chars; total limit 280. Leave breathing room.
  const reservedForUrl = 25;
  const max = 280 - reservedForUrl - 1;
  if (title.length <= max) return title;
  return title.slice(0, max - 1).trimEnd() + "…";
}

function subscribeNoop() {
  return () => {};
}
function getNativeShareSnapshot() {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}
function getNativeShareServerSnapshot() {
  return false;
}

export function SocialShare({
  url,
  title,
  description,
  className,
}: SocialShareProps) {
  const t = useTranslations("share");
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    subscribeNoop,
    getNativeShareSnapshot,
    getNativeShareServerSnapshot
  );

  const encodedUrl = encodeURIComponent(url);
  const twitterText = encodeURIComponent(truncateForTwitter(title));
  const whatsappText = encodeURIComponent(`${title} ${url}`);

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${twitterText}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappHref = `https://wa.me/?text=${whatsappText}`;

  async function handleCopy() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for very old browsers
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      track("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  async function handleNativeShare() {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
      return;
    }
    try {
      await navigator.share({ title, text: description, url });
      track("native");
    } catch {
      // user cancelled — silent
    }
  }

  function handlePlatformClick(platform: string) {
    track(platform);
  }

  const baseBtn =
    "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";
  const sizeBtn = "size-9";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 sm:gap-3",
        className
      )}
      aria-label={t("title")}
    >
      <span className="text-sm font-medium text-ink-muted mr-1 hidden sm:inline">
        {t("title")}:
      </span>

      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("twitter")}
        aria-label={t("platforms.twitter")}
        title={t("platforms.twitter")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#000] hover:text-white dark:bg-surface-muted dark:hover:bg-[#000]"
        )}
      >
        <XIcon className="size-4" />
      </a>

      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("linkedin")}
        aria-label={t("platforms.linkedin")}
        title={t("platforms.linkedin")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#0A66C2] hover:text-white dark:bg-surface-muted dark:hover:bg-[#0A66C2]"
        )}
      >
        <LinkedinIcon className="size-4" />
      </a>

      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("facebook")}
        aria-label={t("platforms.facebook")}
        title={t("platforms.facebook")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#1877F2] hover:text-white dark:bg-surface-muted dark:hover:bg-[#1877F2]"
        )}
      >
        <FacebookIcon className="size-4" />
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("whatsapp")}
        aria-label={t("platforms.whatsapp")}
        title={t("platforms.whatsapp")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#25D366] hover:text-white dark:bg-surface-muted dark:hover:bg-[#25D366]"
        )}
      >
        <MessageCircle className="size-4" />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? t("copied") : t("copyLink")}
        title={copied ? t("copied") : t("copyLink")}
        className={cn(
          baseBtn,
          // Mobile-da daha buyuk; desktop-ta diger butonlarla ayni
          "h-11 px-4 sm:h-9 sm:px-0 sm:size-9 gap-2 text-sm font-medium",
          copied
            ? "bg-emerald-500 text-white"
            : "bg-surface-subtle text-ink hover:bg-brand-600 hover:text-white dark:bg-surface-muted dark:hover:bg-brand-600"
        )}
      >
        {copied ? (
          <Check className="size-4" />
        ) : (
          <LinkIcon className="size-4" />
        )}
        <span className="sm:hidden">
          {copied ? t("copied") : t("copyLink")}
        </span>
      </button>

      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label={t("platforms.native")}
          title={t("platforms.native")}
          className={cn(
            baseBtn,
            sizeBtn,
            "bg-surface-subtle text-ink hover:bg-brand-600 hover:text-white dark:bg-surface-muted dark:hover:bg-brand-600 sm:inline-flex"
          )}
        >
          <Share2 className="size-4" />
        </button>
      ) : null}

    </div>
  );
}
