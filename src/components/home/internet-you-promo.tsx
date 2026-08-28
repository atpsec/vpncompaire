import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  ArrowRight,
  Fingerprint,
  Globe2,
  Laptop,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { geoFromHeaders } from "@/lib/request-geo";

function resolveCountryName(code: string, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "region" });
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

function maskIpAddress(ip: string | null): string {
  if (!ip) return "••••••••";
  if (ip.includes(":")) {
    const groups = ip.split(":").filter(Boolean);
    return groups.length >= 2 ? `${groups.slice(0, 2).join(":")}::••••` : "••••••••";
  }
  const octets = ip.split(".");
  return octets.length === 4 ? `${octets[0]}.${octets[1]}.••.••` : "••••••••";
}

export async function InternetYouPromo() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("home.internetYou"),
  ]);
  const geo = geoFromHeaders(await headers());
  const countryCode = /^[A-Z]{2}$/.test(geo.countryCode ?? "")
    ? geo.countryCode!.toLowerCase()
    : null;
  const countryName = countryCode
    ? resolveCountryName(countryCode.toUpperCase(), locale)
    : null;

  return (
    <section className="relative -mt-1 pb-8 sm:-mt-3 sm:pb-12">
      <Container>
        <article className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-surface-base to-accent-50/60 shadow-md dark:border-brand-900/60 dark:from-brand-950/40 dark:via-surface-base dark:to-accent-950/20">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/20" />
          <div className="relative grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:p-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700 dark:border-brand-800 dark:bg-brand-950/60 dark:text-brand-300">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                {t("kicker")}
              </span>
              <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-ink-strong sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                {t("subtitle")}
              </p>

              <dl className="mt-5 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                <PromoSignal
                  icon={<Globe2 className="size-4" aria-hidden="true" />}
                  label={t("connectionLabel")}
                  value={maskIpAddress(geo.ip)}
                  countryCode={countryCode}
                  countryName={countryName}
                />
                <PromoSignal
                  icon={<Fingerprint className="size-4" aria-hidden="true" />}
                  label={t("browserLabel")}
                  value="Browser + language"
                />
                <PromoSignal
                  icon={<Laptop className="size-4" aria-hidden="true" />}
                  label={t("deviceLabel")}
                  value="Device + screen"
                />
              </dl>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="primary" size="md">
                  <Link href="/tools/what-websites-can-see">
                    {t("cta")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                  <LockKeyhole className="size-3.5 text-brand-600" aria-hidden="true" />
                  {t("privacyNote")}
                </span>
              </div>
            </div>

            <div aria-hidden="true" className="hidden rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-surface-subtle/70 sm:block">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                    <ShieldCheck className="size-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-ink-muted">Internet snapshot</span>
                </div>
                <span className="size-2 rounded-full bg-success-500" />
              </div>
              <div className="mt-3 space-y-2">
                <PreviewRow icon={<Globe2 className="size-4" />} label="Public IP" value="Visible" />
                <PreviewRow icon={<Fingerprint className="size-4" />} label="Browser" value="Detected" />
                <PreviewRow icon={<Laptop className="size-4" />} label="Device" value="Detected" />
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-ink-subtle">A transparent look at the signals a normal website can receive.</p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

function PromoSignal({
  icon,
  label,
  value,
  countryCode,
  countryName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  countryCode?: string | null;
  countryName?: string | null;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/80 bg-white/70 p-3 shadow-sm dark:border-white/10 dark:bg-surface-subtle/70">
      <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700 dark:text-brand-300">
        {icon}
        {label}
      </dt>
      <dd className="mt-1.5 flex min-w-0 items-center gap-2">
        {countryCode ? (
          <Image
            src={`https://flagcdn.com/h40/${countryCode}.png`}
            alt={countryName ?? ""}
            width={24}
            height={17}
            className="h-4 w-auto shrink-0 rounded-sm shadow-sm ring-1 ring-black/5"
            unoptimized
          />
        ) : null}
        <span className={`min-w-0 truncate text-sm font-bold text-ink-strong ${label === "Your connection" ? "font-mono" : ""}`}>
          {value}
        </span>
      </dd>
      {countryName ? <p className="mt-1 truncate text-[11px] text-ink-subtle">{countryName}</p> : null}
    </div>
  );
}

function PreviewRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface-subtle px-3 py-2.5 dark:bg-surface-base">
      <span className="flex items-center gap-2 text-xs font-medium text-ink-muted">
        <span className="text-brand-600">{icon}</span>
        {label}
      </span>
      <span className="text-xs font-semibold text-success-700 dark:text-success-300">{value}</span>
    </div>
  );
}
