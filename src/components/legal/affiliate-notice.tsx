import { Tag } from "lucide-react";
import { Link } from "@/i18n/routing";

/**
 * Compact affiliate notice for inline placement (e.g. above a "Buy" button).
 * Used to surface the affiliate relationship at the point of click, not just
 * in the footer disclosure.
 */
export function AffiliateNotice() {
  return (
    <p className="text-[11px] text-ink-subtle leading-relaxed">
      <Tag className="inline-block size-3 mr-1 text-accent-600" aria-hidden />
      Reklam içeriği: bu bağlantı affiliate olabilir. Komisyon ödediğin
      fiyatı değiştirmez.{" "}
      <Link
        href="/reklam-aciklamasi"
        className="underline hover:text-ink"
      >
        Detay
      </Link>
    </p>
  );
}
