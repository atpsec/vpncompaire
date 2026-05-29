import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { ShieldAlert, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(trimmed)) return true;
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
  void h.get("x-vercel-ip-region");

  if (!country || isPrivateOrLocal(ip)) return null;

  const t = await getTranslations("home.ipBanner");
  const decodedCity = city ? safeDecode(city) : null;
  const locationParts = [decodedCity, country].filter(Boolean).join(", ");

  return (
    <IpSecurityBannerDismiss dismissLabel={t("dismissLabel")}>
      <section
        aria-label={t("title")}
        className="border-y border-accent-200/80 bg-gradient-to-b from-accent-50/80 to-accent-50/30"
      >
        <Container size="xl">
          <div className="flex flex-col gap-3 py-3 pr-10 sm:flex-row sm:items-center sm:gap-x-5 sm:gap-y-0 sm:py-3.5 sm:pr-12">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-accent-300/80"
              >
                <ShieldAlert className="size-4 text-accent-600" />
              </span>
              <p className="text-[13px] font-semibold leading-tight text-ink-strong sm:text-sm">
                {t("title")}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="hidden h-6 w-px bg-border sm:block"
            />

            <dl className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
              <div className="flex items-baseline gap-1.5">
                <dt className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink-subtle">
                  {t("ipLabel")}
                </dt>
                <dd className="font-mono text-[13px] tabular-nums text-ink-strong">
                  {ip}
                </dd>
              </div>
              {locationParts ? (
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink-subtle">
                    {t("locationLabel")}
                  </dt>
                  <dd className="text-[13px] text-ink-strong">
                    {locationParts}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="sm:ml-auto">
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="h-8 px-3 text-[12px]"
              >
                <Link href="/en-iyi-vpn">
                  {t("compareLink")}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
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
