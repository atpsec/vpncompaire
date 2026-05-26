import { useTranslations } from "next-intl";
import {
  siX,
  siFacebook,
  siInstagram,
  siYoutube,
  siTiktok,
  siReddit,
} from "simple-icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type IconData = { title: string; path: string };

// LinkedIn brand mark is no longer distributed via simple-icons (LinkedIn
// brand-guideline restrictions). Hand-encoded official-style glyph below.
const siLinkedin: IconData = {
  title: "LinkedIn",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

type SocialLink = {
  name: string;
  url: string;
  icon: IconData;
  brandHex: string;
};

/**
 * Placeholder URLs — replace with real accounts when they exist.
 * Empty string disables the icon.
 */
const SOCIALS: SocialLink[] = [
  {
    name: "X (Twitter)",
    url: siteConfig.social.twitter || "https://x.com/",
    icon: siX,
    brandHex: "#000000",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/",
    icon: siInstagram,
    brandHex: "#E4405F",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/",
    icon: siYoutube,
    brandHex: "#FF0000",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/",
    icon: siFacebook,
    brandHex: "#1877F2",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/",
    icon: siLinkedin,
    brandHex: "#0A66C2",
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/",
    icon: siTiktok,
    brandHex: "#000000",
  },
  {
    name: "Reddit",
    url: "https://reddit.com/",
    icon: siReddit,
    brandHex: "#FF4500",
  },
];

type Variant = "footer" | "header" | "menu";

type Props = {
  variant?: Variant;
  className?: string;
};

const VARIANT_STYLES: Record<
  Variant,
  { wrapper: string; item: string; iconSize: number }
> = {
  // Full size: footer block with 6 icons
  footer: {
    wrapper: "flex flex-wrap gap-2",
    item: "size-9 border border-border bg-white text-ink-muted hover:text-ink-strong hover:border-brand-300",
    iconSize: 16,
  },
  // Compact: header inline strip
  header: {
    wrapper: "flex items-center gap-0.5",
    item: "size-8 text-ink-muted hover:text-ink-strong hover:bg-surface-subtle rounded-md",
    iconSize: 14,
  },
  // Mobile drawer: horizontal row, slightly larger touch targets
  menu: {
    wrapper: "flex items-center gap-2 pt-4 mt-2 border-t border-border",
    item: "size-10 border border-border bg-white text-ink-muted hover:text-ink-strong hover:border-brand-300",
    iconSize: 18,
  },
};

export function SocialLinks({ variant = "footer", className }: Props) {
  const style = VARIANT_STYLES[variant];
  const t = useTranslations("social");

  return (
    <ul className={cn(style.wrapper, className)} aria-label={t("listLabel")}>
      {SOCIALS.filter((s) => s.url).map((s) => (
        <li key={s.name}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${s.name} ${t("soonSuffix")}`}
            title={`${s.name} ${t("titleSoonSuffix")}`}
            className={cn(
              "group inline-flex items-center justify-center transition-colors",
              style.item,
            )}
            style={{ ["--brand-hex" as string]: s.brandHex }}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              width={style.iconSize}
              height={style.iconSize}
              aria-hidden="true"
              className="group-hover:[color:var(--brand-hex)]"
              fill="currentColor"
            >
              <title>{s.icon.title}</title>
              <path d={s.icon.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
