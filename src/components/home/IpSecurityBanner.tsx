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
        <Container>
          <article className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-md">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-400 via-accent-500 to-brand-500"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-50/60 blur-3xl"
            />

            <div className="relative p-5 sm:p-6 lg:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-300/70 bg-accent-50/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-accent-700">
                    <ShieldAlert className="size-3" aria-hidden="true" />
                    {t("kicker")}
                  </span>
                  <h2 className="mt-3 text-xl font-bold tracking-tight text-ink-strong sm:text-2xl">
                    {t("title")}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-ink-muted">
                    {t("subtitle")}
                  </p>
                </div>
                <IpSecurityBannerDismissButton
                  label={t("dismissLabel")}
                  className="-mr-1.5 shrink-0"
                />
              </div>

              <div className="my-5 h-px w-full bg-border sm:my-6" />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 lg:flex-1">
                  <div className="min-w-0">
                    <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink-subtle">
                      <MapPin className="size-3" aria-hidden="true" />
                      {t("locationKicker")}
                    </dt>
                    <dd className="mt-2 flex items-center gap-2.5">
                      <Image
                        src={`https://flagcdn.com/h40/${countryCode}.png`}
                        alt={countryName}
                        width={28}
                        height={20}
                        className="h-5 w-auto rounded-sm shadow-sm ring-1 ring-black/5"
                        unoptimized
                      />
                      <div className="min-w-0">
                        <p className="truncate text-base font-bold leading-tight text-ink-strong sm:text-lg">
                          {decodedCity ?? countryName}
                        </p>
                        <p className="truncate text-xs leading-tight text-ink-subtle">
                          {decodedCity ? countryName : t("locationFallback")}
                        </p>
                      </div>
                    </dd>
                  </div>

                  <div className="min-w-0">
                    <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink-subtle">
                      <Globe2 className="size-3" aria-hidden="true" />
                      {t("ipKicker")}
                    </dt>
                    <dd className="mt-2">
                      <p className="break-all font-mono text-base font-bold leading-tight tabular-nums text-ink-strong sm:text-lg">
                        {ip}
                      </p>
                      <p className="text-xs leading-tight text-ink-subtle">
                        {ipVersion}
                      </p>
                    </dd>
                  </div>

                  <div className="min-w-0">
                    <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink-subtle">
                      <Clock className="size-3" aria-hidden="true" />
                      {t("timeKicker")}
                    </dt>
                    <dd className="mt-2">
                      <IpSecurityBannerClock
                        initialIso={initialIso}
                        timezone={timezone}
                        locale={locale}
                      />
                    </dd>
                  </div>
                </dl>

                <Button
                  asChild
                  variant="primary"
                  size="md"
                  className="self-stretch lg:self-auto lg:shrink-0"
                >
                  <Link href="/en-iyi-vpn">
                    {t("compareLink")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </section>
    </IpSecurityBannerDismiss>
  );
}
