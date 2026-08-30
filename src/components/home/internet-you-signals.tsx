"use client";

import Image from "next/image";
import { Fingerprint, Globe2, Landmark, Laptop, MapPin } from "lucide-react";
import { InternetYouClock } from "@/components/home/internet-you-clock";
import { useInternetContext } from "@/components/home/internet-context-client";

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

export type InternetYouSignalsCopy = {
  connectionLabel: string;
  browserLabel: string;
  deviceLabel: string;
  locationTitle: string;
  locationSubtitle: string;
  city: string;
  capital: string;
  digital: string;
  analog: string;
  unavailable: string;
};

export function InternetYouSignals({
  locale,
  copy,
}: {
  locale: string;
  copy: InternetYouSignalsCopy;
}) {
  const geo = useInternetContext();
  const countryCode = /^[A-Z]{2}$/i.test(geo?.countryCode ?? "")
    ? geo?.countryCode?.toLowerCase() ?? null
    : null;
  const countryName = countryCode
    ? resolveCountryName(countryCode.toUpperCase(), locale)
    : null;

  return (
    <>
      <dl className="mt-5 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
        <PromoSignal
          icon={<Globe2 className="size-4" aria-hidden="true" />}
          label={copy.connectionLabel}
          value={maskIpAddress(geo?.ip ?? null)}
          countryCode={countryCode}
          countryName={countryName}
          mono
        />
        <PromoSignal
          icon={<Fingerprint className="size-4" aria-hidden="true" />}
          label={copy.browserLabel}
          value="Browser + language"
        />
        <PromoSignal
          icon={<Laptop className="size-4" aria-hidden="true" />}
          label={copy.deviceLabel}
          value="Device + screen"
        />
      </dl>

      <InternetYouLocationCard
        countryCode={countryCode}
        countryName={countryName}
        city={geo?.city ?? null}
        capital={geo?.capital ?? null}
        timeZone={geo?.source === "ipwho" ? geo.timezone : null}
        copy={copy}
      />
    </>
  );
}

function InternetYouLocationCard({
  countryCode,
  countryName,
  city,
  capital,
  timeZone,
  copy,
}: {
  countryCode: string | null;
  countryName: string | null;
  city: string | null;
  capital: string | null;
  timeZone: string | null;
  copy: InternetYouSignalsCopy;
}) {
  return (
    <div className="mt-4 max-w-2xl rounded-2xl border border-white/80 bg-white/65 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-surface-subtle/70">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-100 bg-brand-50 dark:border-brand-800 dark:bg-brand-950/50">
              {countryCode ? (
                <Image
                  src={`https://flagcdn.com/h40/${countryCode}.png`}
                  alt={countryName ?? ""}
                  width={30}
                  height={20}
                  className="h-5 w-auto rounded-sm shadow-sm ring-1 ring-black/5"
                  unoptimized
                />
              ) : (
                <MapPin className="size-5 text-brand-600" aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700 dark:text-brand-300">
                <MapPin className="size-3.5" aria-hidden="true" />
                {copy.locationTitle}
              </p>
              <p className="mt-1 truncate text-sm font-bold text-ink-strong">
                {countryName ?? copy.unavailable}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-ink-subtle">
                {copy.locationSubtitle}
              </p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3">
            <LocationFact
              icon={<MapPin className="size-3.5" aria-hidden="true" />}
              label={copy.city}
              value={city ?? copy.unavailable}
            />
            <LocationFact
              icon={<Landmark className="size-3.5" aria-hidden="true" />}
              label={copy.capital}
              value={capital ?? copy.unavailable}
            />
          </dl>
        </div>

        <div className="border-t border-border pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <InternetYouClock
            timeZone={timeZone}
            digitalLabel={copy.digital}
            analogLabel={copy.analog}
            unavailableLabel={copy.unavailable}
          />
        </div>
      </div>
    </div>
  );
}

function LocationFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/80 bg-white/70 px-3 py-2.5 dark:border-white/10 dark:bg-surface-base/70">
      <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink-muted">
        <span className="text-brand-600">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-semibold text-ink-strong">{value}</dd>
    </div>
  );
}

function PromoSignal({
  icon,
  label,
  value,
  countryCode,
  countryName,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  countryCode?: string | null;
  countryName?: string | null;
  mono?: boolean;
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
        <span className={`min-w-0 truncate text-sm font-bold text-ink-strong ${mono ? "font-mono" : ""}`}>
          {value}
        </span>
      </dd>
      {countryName ? <p className="mt-1 truncate text-[11px] text-ink-subtle">{countryName}</p> : null}
    </div>
  );
}
