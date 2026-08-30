"use client";

import { useSyncExternalStore, useState } from "react";
import {
  Link as LinkIcon,
  Share2,
  Check,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { SimpleIcon } from "simple-icons";
import {
  siDiscord,
  siFacebook,
  siPinterest,
  siReddit,
  siTelegram,
  siThreads,
  siWhatsapp,
  siX,
} from "simple-icons";
import { cn } from "@/lib/utils";

// Official Simple Icons brand paths are bundled locally so sharing never depends
// on an external image host or an additional network request.
function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={icon.path} />
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
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 .003 22.225 0z" />
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
  const [copiedKind, setCopiedKind] = useState<"link" | "discord" | null>(null);
  const canNativeShare = useSyncExternalStore(
    subscribeNoop,
    getNativeShareSnapshot,
    getNativeShareServerSnapshot
  );

  const encodedUrl = encodeURIComponent(url);
  const twitterText = encodeURIComponent(truncateForTwitter(title));
  const whatsappText = encodeURIComponent(`${title} ${url}`);
  const redditTitle = encodeURIComponent(title);
  const telegramText = encodeURIComponent(title);
  const pinterestDescription = encodeURIComponent(title);
  const threadsText = encodeURIComponent(`${title} ${url}`);

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${twitterText}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappHref = `https://wa.me/?text=${whatsappText}`;
  const redditHref = `https://www.reddit.com/submit?url=${encodedUrl}&title=${redditTitle}`;
  const telegramHref = `https://t.me/share/url?url=${encodedUrl}&text=${telegramText}`;
  const pinterestHref = `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${pinterestDescription}`;
  const threadsHref = `https://www.threads.net/intent/post?text=${threadsText}`;

  async function writeToClipboard(value: string) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for very old browsers
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      return true;
    } catch {
      return false;
    }
  }

  async function handleCopy() {
    if (!(await writeToClipboard(url))) return;
    setCopiedKind("link");
    track("copy");
    setTimeout(() => setCopiedKind(null), 2000);
  }

  async function handleDiscordCopy() {
    if (!(await writeToClipboard(`${title}\n${url}`))) return;
    setCopiedKind("discord");
    track("discord");
    setTimeout(() => setCopiedKind(null), 2000);
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
        <BrandIcon icon={siX} className="size-4" />
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
        <BrandIcon icon={siFacebook} className="size-4" />
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
        <BrandIcon icon={siWhatsapp} className="size-4" />
      </a>

      <a
        href={redditHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("reddit")}
        aria-label={t("platforms.reddit")}
        title={t("platforms.reddit")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#FF4500] hover:text-white dark:bg-surface-muted dark:hover:bg-[#FF4500]"
        )}
      >
        <BrandIcon icon={siReddit} className="size-4" />
      </a>

      <button
        type="button"
        onClick={handleDiscordCopy}
        aria-label={copiedKind === "discord" ? t("platforms.discordCopied") : t("platforms.discord")}
        title={copiedKind === "discord" ? t("platforms.discordCopied") : t("platforms.discord")}
        className={cn(
          baseBtn,
          sizeBtn,
          copiedKind === "discord"
            ? "bg-emerald-500 text-white"
            : "bg-surface-subtle text-ink hover:bg-[#5865F2] hover:text-white dark:bg-surface-muted dark:hover:bg-[#5865F2]"
        )}
      >
        {copiedKind === "discord" ? (
          <Check className="size-4" />
        ) : (
          <BrandIcon icon={siDiscord} className="size-4" />
        )}
      </button>

      <a
        href={telegramHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("telegram")}
        aria-label={t("platforms.telegram")}
        title={t("platforms.telegram")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#229ED9] hover:text-white dark:bg-surface-muted dark:hover:bg-[#229ED9]"
        )}
      >
        <BrandIcon icon={siTelegram} className="size-4" />
      </a>

      <a
        href={pinterestHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("pinterest")}
        aria-label={t("platforms.pinterest")}
        title={t("platforms.pinterest")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#E60023] hover:text-white dark:bg-surface-muted dark:hover:bg-[#E60023]"
        )}
      >
        <BrandIcon icon={siPinterest} className="size-4" />
      </a>

      <a
        href={threadsHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick("threads")}
        aria-label={t("platforms.threads")}
        title={t("platforms.threads")}
        className={cn(
          baseBtn,
          sizeBtn,
          "bg-surface-subtle text-ink hover:bg-[#000] hover:text-white dark:bg-surface-muted dark:hover:bg-[#000]"
        )}
      >
        <BrandIcon icon={siThreads} className="size-4" />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copiedKind === "link" ? t("copied") : t("copyLink")}
        title={copiedKind === "link" ? t("copied") : t("copyLink")}
        className={cn(
          baseBtn,
          // Mobile-da daha buyuk; desktop-ta diger butonlarla ayni
          "h-11 px-4 sm:h-9 sm:px-0 sm:size-9 gap-2 text-sm font-medium",
          copiedKind === "link"
            ? "bg-emerald-500 text-white"
            : "bg-surface-subtle text-ink hover:bg-brand-600 hover:text-white dark:bg-surface-muted dark:hover:bg-brand-600"
        )}
      >
        {copiedKind === "link" ? (
          <Check className="size-4" />
        ) : (
          <LinkIcon className="size-4" />
        )}
        <span className="sm:hidden">
          {copiedKind === "link" ? t("copied") : t("copyLink")}
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
