import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Clock, Globe2, MapPin, ShieldAlert } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  IpSecurityBannerDismiss,
  IpSecurityBannerDismissButton,
} from "@/components/home/IpSecurityBannerDismiss";
import { IpSecurityBannerClock } from "@/components/home/IpSecurityBannerClock";

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

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveCountryName(code: string, locale: string): string {
  try {
    const dn = new Intl.DisplayNames([locale], { type: "region" });
    return dn.of(code) ?? code;
  } catch {
    return code;
  }
}

export async function IpSecurityBanner() {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null;
  const country = h.get("x-vercel-ip-country");
  const city = h.get("x-vercel-ip-city");
  const timezone = h.get("x-vercel-ip-timezone") ?? "UTC";
  void h.get("x-vercel-ip-region");

  if (!country || isPrivateOrLocal(ip)) return null;

  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("home.ipBanner"),
  ]);
  const decodedCity = city ? safeDecode(city) : null;
  const countryCode = country.toLowerCase();
  const countryName = resolveCountryName(country, locale);
  const ipVersion = ip && ip.includes(":") ? "IPv6" : "IPv4";
  const initialIso = new Date().toISOString();

  return (
    <IpSecurityBannerDismiss>
      <section
        aria-label={t("ariaLabel")}
        className="relative -mt-2 pb-8 sm:-mt-4 sm:pb-10"
      >
        <Container size="xl">
          <header className="mb-4 flex items-start justify-between gap-3 sm:mb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-300/70 bg-accent-50/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-accent-700">
                <ShieldAlert className="size-3" aria-hidden="true" />
                {t("kicker")}
              </span>
              <p className="mt-2 max-w-xl text-sm text-ink-muted">
                {t("subtitle")}
              </p>
            </div>
            <IpSecurityBannerDismissButton
              label={t("dismissLabel")}
              className="-mr-1.5"
            />
          </header>

          <ul className="-mx-4 flex gap-3 overflow-x-auto px-4 snap-x snap-mandatory scroll-pl-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            <li className="snap-start w-[78%] min-w-[240px] shrink-0 sm:w-auto sm:min-w-0">
              <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-50/70 blur-3xl"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-700">
                      <MapPin className="size-3" aria-hidden="true" />
                      {t("locationKicker")}
                    </span>
                    <Image
                      src={`https://flagcdn.com/h40/${countryCode}.png`}
                      alt={countryName}
                      width={32}
                      height={24}
                      className="h-5 w-auto rounded-sm shadow-sm ring-1 ring-black/5"
                      unoptimized
                    />
                  </div>
                  <div className="mt-5 flex-1">
                    <p className="text-2xl font-bold tracking-tight text-ink-strong">
                      {decodedCity ?? countryName}
                    </p>
                    <p className="mt-1 text-sm text-ink-subtle">
                      {decodedCity ? countryName : t("locationFallback")}
                    </p>
                  </div>
                </div>
              </article>
            </li>

            <li className="snap-start w-[78%] min-w-[240px] shrink-0 sm:w-auto sm:min-w-0">
              <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-50/60 blur-3xl"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                      <Globe2 className="size-3" aria-hidden="true" />
                      {t("ipKicker")}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-ink-subtle">
                      {ipVersion}
                    </span>
                  </div>
                  <div className="mt-5 flex-1">
                    <p className="break-all font-mono text-xl font-bold tracking-tight tabular-nums text-ink-strong sm:text-2xl">
                      {ip}
                    </p>
                    <p className="mt-1 text-sm text-ink-subtle">
                      {t("ipHint")}
                    </p>
                  </div>
                </div>
              </article>
            </li>

            <li className="snap-start w-[78%] min-w-[240px] shrink-0 sm:w-auto sm:min-w-0">
              <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-surface-subtle blur-3xl"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-subtle px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-strong">
                      <Clock className="size-3" aria-hidden="true" />
                      {t("timeKicker")}
                    </span>
                    <span className="truncate text-[10px] font-medium uppercase tracking-wider text-ink-subtle">
                      {timezone}
                    </span>
                  </div>
                  <div className="mt-5 flex-1">
                    <IpSecurityBannerClock
                      initialIso={initialIso}
                      timezone={timezone}
                      locale={locale}
                    />
                  </div>
                </div>
              </article>
            </li>

            <li className="snap-start w-[78%] min-w-[240px] shrink-0 sm:w-auto sm:min-w-0">
              <article className="relative h-full overflow-hidden rounded-2xl border border-accent-300 bg-white p-5 shadow-md ring-1 ring-accent-200/60 sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-brand-500"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -bottom-16 h-44 w-44 rounded-full bg-accent-50/80 blur-3xl"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-800">
                      <ShieldAlert className="size-3" aria-hidden="true" />
                      {t("statusKicker")}
                    </span>
                  </div>
                  <div className="mt-5 flex-1">
                    <p className="text-xl font-bold tracking-tight text-ink-strong sm:text-2xl">
                      {t("statusValue")}
                    </p>
                    <p className="mt-1 text-sm text-ink-subtle">
                      {t("statusHint")}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="primary"
                    size="md"
                    className="mt-5 w-full"
                  >
                    <Link href="/en-iyi-vpn">
                      {t("compareLink")}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            </li>
          </ul>
        </Container>
      </section>
    </IpSecurityBannerDismiss>
  );
}
