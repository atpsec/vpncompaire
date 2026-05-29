import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { ShieldAlert, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { IpSecurityBannerDismiss } from "@/components/home/IpSecurityBannerDismiss";

function isPrivateOrLocal(ip: string | null | undefined): boolean {
  if (!ip) return true;
  const trimmed = ip.trim();
  if (!trimmed) return true;
  if (trimmed === "::1" || trimmed === "127.0.0.1") return true;
  if (
    trimmed.startsWith("10.") ||
    trimmed.startsWith("127.") ||
    trimmed.startsWith("192.168.") ||
    trimmed.startsWith("0.")
  ) {
    return true;
  }
  // 172.16.0.0 – 172.31.255.255 private range
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(trimmed)) return true;
  // IPv6 link-local / unique-local
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("fe80:") ||
    lower.startsWith("fc") ||
    lower.startsWith("fd")
  ) {
    return true;
  }
  return false;
}

export async function IpSecurityBanner() {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null;
  const country = h.get("x-vercel-ip-country");
  const city = h.get("x-vercel-ip-city");
  // Region is read per spec but country + city are sufficient for display.
  void h.get("x-vercel-ip-region");

  // Hide silently on local dev, behind a private network, or when geo headers
  // are absent (non-Vercel runtime).
  if (!country || isPrivateOrLocal(ip)) return null;

  const t = await getTranslations("home.ipBanner");
  const decodedCity = city ? safeDecode(city) : null;
  const locationParts = [decodedCity, country].filter(Boolean).join(", ");

  return (
    <IpSecurityBannerDismiss dismissLabel={t("dismissLabel")}>
      <div className="border-b border-accent-300 bg-accent-50/60">
        <div className="mx-auto max-w-7xl px-4 py-2.5 pr-12 sm:px-6 sm:pr-16 lg:px-8">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-start gap-2 text-xs leading-relaxed text-ink sm:text-sm">
              <ShieldAlert
                className="mt-0.5 size-4 shrink-0 text-accent-600"
                aria-hidden="true"
              />
              <p>
                <span className="font-semibold">{t("exposed")}</span>{" "}
                <span className="tabular-nums">{ip}</span>
                {locationParts ? (
                  <span className="text-ink-muted"> ({locationParts})</span>
                ) : null}{" "}
                {t("tail")}
              </p>
            </div>
            <Link
              href="/en-iyi-vpn"
              className="inline-flex shrink-0 items-center gap-1 self-start text-xs font-medium text-brand-700 underline-offset-4 hover:underline sm:self-auto sm:text-sm"
            >
              {t("compareLink")}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </IpSecurityBannerDismiss>
  );
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
