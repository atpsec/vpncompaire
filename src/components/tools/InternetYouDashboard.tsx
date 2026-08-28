"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CircleHelp,
  Clock3,
  Cookie,
  ExternalLink,
  EyeOff,
  Globe2,
  Laptop,
  Languages,
  LockKeyhole,
  MapPin,
  Monitor,
  RefreshCw,
  Save,
  Server,
  ShieldCheck,
  Smartphone,
  Tablet,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import {
  siAndroid,
  siApple,
  siBrave,
  siFirefoxbrowser,
  siGooglechrome,
  siLinux,
  siMacos,
  siOpera,
  siSafari,
} from "simple-icons";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type InternetYouServerSnapshot = {
  ip: string | null;
  ipv4: string | null;
  ipv6: string | null;
  currentIpVersion: "ipv4" | "ipv6" | null;
  countryCode: string | null;
  countryName: string | null;
  countrySource: "header" | "lookup" | "none";
};

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  liveBadge: string;
  noExternalLookup: string;
  networkAddressesTitle: string;
  networkAddressesSubtitle: string;
  publicIp: string;
  ipv4: string;
  ipv6: string;
  detectedOnRequest: string;
  notDetectedOnRequest: string;
  visibilitySummaryTitle: string;
  visibilitySummarySubtitle: string;
  visibleNowTitle: string;
  visibleNowBody: string;
  approximateSignalsTitle: string;
  approximateSignalsBody: string;
  notAccessibleTitle: string;
  notAccessibleBody: string;
  signalsAvailable: string;
  privacyControlsTitle: string;
  privacyControlsKicker: string;
  privacyControlsSubtitle: string;
  secureConnection: string;
  globalPrivacyControl: string;
  doNotTrack: string;
  notSet: string;
  comparisonTitle: string;
  comparisonKicker: string;
  comparisonSubtitle: string;
  comparisonEmpty: string;
  saveSnapshot: string;
  refreshSnapshot: string;
  baselineLabel: string;
  currentLabel: string;
  changed: string;
  unchanged: string;
  approxLocation: string;
  browser: string;
  device: string;
  countryOnly: string;
  countryLookup: string;
  requestHeaders: string;
  unknown: string;
  browserDeviceTitle: string;
  browserDeviceSubtitle: string;
  operatingSystem: string;
  screen: string;
  language: string;
  timezone: string;
  touchSupport: string;
  cookies: string;
  connection: string;
  enabled: string;
  disabled: string;
  yes: string;
  no: string;
  online: string;
  offline: string;
  desktop: string;
  mobile: string;
  tablet: string;
  privacySignalsTitle: string;
  privacySignalsSubtitle: string;
  notChecked: string;
  nextStepsKicker: string;
  nextStepsTitle: string;
  nextStepsSubtitle: string;
  dnsActionTitle: string;
  dnsActionBody: string;
  webrtcActionTitle: string;
  webrtcActionBody: string;
  compareActionTitle: string;
  compareActionBody: string;
  researchActionTitle: string;
  researchActionBody: string;
  openNextStep: string;
  dnsLeak: string;
  dnsLeakBody: string;
  webrtcLeak: string;
  webrtcLeakBody: string;
  openCheck: string;
  cannotSeeTitle: string;
  macAddress: string;
  macAddressBody: string;
  filesAndPasswords: string;
  filesAndPasswordsBody: string;
  exactLocation: string;
  exactLocationBody: string;
  privacyNote: string;
};

type BrandIconName =
  | "android"
  | "apple"
  | "brave"
  | "chrome"
  | "firefox"
  | "linux"
  | "macos"
  | "opera"
  | "safari";

type BrowserSnapshot = {
  browser: { name: string; icon: BrandIconName | "generic" };
  operatingSystem: { name: string; icon: BrandIconName | "generic" };
  device: { name: string; icon: "desktop" | "mobile" | "tablet" };
  screen: string;
  language: string;
  timezone: string;
  touch: boolean;
  cookies: boolean;
  online: boolean;
  secureContext: boolean;
  globalPrivacyControl: "on" | "off" | "unavailable";
  doNotTrack: "on" | "off" | "unavailable";
};

type ConnectionSnapshot = {
  ip: string | null;
  ipv4: string | null;
  ipv6: string | null;
  currentIpVersion: InternetYouServerSnapshot["currentIpVersion"];
  location: string;
};

const EMPTY_SUBSCRIBE = () => () => {};
const EMPTY_SERVER_SNAPSHOT = () => null;
let cachedBrowserSnapshot: BrowserSnapshot | null = null;

function getBrowserSnapshot(): BrowserSnapshot {
  if (cachedBrowserSnapshot) return cachedBrowserSnapshot;

  const userAgent = navigator.userAgent;
  const browser = detectBrowser(userAgent);
  const operatingSystem = detectOperatingSystem(userAgent);
  const device = detectDevice(userAgent);
  const screen =
    typeof window.screen !== "undefined"
      ? `${window.screen.width} × ${window.screen.height}`
      : "Unavailable";
  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Unavailable";
  const privacyNavigator = navigator as Navigator & {
    globalPrivacyControl?: boolean | null;
  };

  cachedBrowserSnapshot = {
    browser,
    operatingSystem,
    device,
    screen,
    language: navigator.language || "Unavailable",
    timezone,
    touch: navigator.maxTouchPoints > 0,
    cookies: navigator.cookieEnabled,
    online: navigator.onLine,
    secureContext: window.isSecureContext,
    globalPrivacyControl:
      privacyNavigator.globalPrivacyControl === true
        ? "on"
        : privacyNavigator.globalPrivacyControl === false
          ? "off"
          : "unavailable",
    doNotTrack:
      navigator.doNotTrack === "1"
        ? "on"
        : navigator.doNotTrack === "0"
          ? "off"
          : "unavailable",
  };

  return cachedBrowserSnapshot;
}

function detectBrowser(
  userAgent: string,
): BrowserSnapshot["browser"] {
  if (/Edg\//i.test(userAgent)) {
    return { name: "Microsoft Edge", icon: "generic" };
  }
  if (/OPR\//i.test(userAgent)) return { name: "Opera", icon: "opera" };
  if ("brave" in navigator) return { name: "Brave", icon: "brave" };
  if (/Firefox\//i.test(userAgent)) {
    return { name: "Firefox", icon: "firefox" };
  }
  if (/Chrome\//i.test(userAgent) && !/Chromium/i.test(userAgent)) {
    return { name: "Google Chrome", icon: "chrome" };
  }
  if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent)) {
    return { name: "Safari", icon: "safari" };
  }
  return { name: "Browser", icon: "generic" };
}

function detectOperatingSystem(
  userAgent: string,
): BrowserSnapshot["operatingSystem"] {
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return { name: "iOS", icon: "apple" };
  }
  if (/Android/i.test(userAgent)) return { name: "Android", icon: "android" };
  if (/Mac OS X/i.test(userAgent)) return { name: "macOS", icon: "macos" };
  if (/Windows/i.test(userAgent)) return { name: "Windows", icon: "generic" };
  if (/Linux/i.test(userAgent)) return { name: "Linux", icon: "linux" };
  return { name: "Operating system", icon: "generic" };
}

function detectDevice(userAgent: string): BrowserSnapshot["device"] {
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(userAgent)) {
    return { name: "Tablet", icon: "tablet" };
  }
  if (/Mobi|iPhone|Android/i.test(userAgent)) {
    return { name: "Mobile", icon: "mobile" };
  }
  return { name: "Desktop", icon: "desktop" };
}

const BRAND_PATHS: Record<BrandIconName, string> = {
  android: siAndroid.path,
  apple: siApple.path,
  brave: siBrave.path,
  chrome: siGooglechrome.path,
  firefox: siFirefoxbrowser.path,
  linux: siLinux.path,
  macos: siMacos.path,
  opera: siOpera.path,
  safari: siSafari.path,
};

const BRAND_COLORS: Record<BrandIconName, string> = {
  android: "#3ddc84",
  apple: "#111827",
  brave: "#fb542b",
  chrome: "#4285f4",
  firefox: "#ff7139",
  linux: "#111827",
  macos: "#111827",
  opera: "#ff1b2d",
  safari: "#0a84ff",
};

function BrandMark({
  icon,
  label,
  size = 52,
}: {
  icon: BrandIconName | "generic";
  label: string;
  size?: number;
}) {
  if (icon === "generic") {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300"
        style={{ width: size, height: size }}
        role="img"
        aria-label={label}
      >
        <Globe2 className="size-7" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-2xl shadow-sm"
      style={{
        width: size,
        height: size,
        backgroundColor: `${BRAND_COLORS[icon]}18`,
        color: BRAND_COLORS[icon],
      }}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width={Math.round(size * 0.52)} height={Math.round(size * 0.52)} aria-hidden="true">
        <path d={BRAND_PATHS[icon]} fill="currentColor" />
      </svg>
    </div>
  );
}

function DeviceMark({
  type,
  label,
  size = 52,
}: {
  type: BrowserSnapshot["device"]["icon"];
  label: string;
  size?: number;
}) {
  const Icon = type === "mobile" ? Smartphone : type === "tablet" ? Tablet : Laptop;
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-700 dark:bg-accent-950/30 dark:text-accent-300"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <Icon className="size-8" strokeWidth={1.7} aria-hidden="true" />
    </div>
  );
}

export function InternetYouDashboard({
  serverSnapshot,
  copy,
}: {
  serverSnapshot: InternetYouServerSnapshot;
  copy: Copy;
}) {
  const router = useRouter();
  const [baseline, setBaseline] = useState<ConnectionSnapshot | null>(null);
  const [isRefreshing, startRefresh] = useTransition();
  const browser = useSyncExternalStore(
    EMPTY_SUBSCRIBE,
    getBrowserSnapshot,
    EMPTY_SERVER_SNAPSHOT,
  );
  const location = serverSnapshot.countryName
    ? `${serverSnapshot.countryName}${serverSnapshot.countryCode ? ` (${serverSnapshot.countryCode})` : ""}`
    : copy.unknown;
  const currentConnection: ConnectionSnapshot = {
    ip: serverSnapshot.ip,
    ipv4: serverSnapshot.ipv4,
    ipv6: serverSnapshot.ipv6,
    currentIpVersion: serverSnapshot.currentIpVersion,
    location,
  };
  const visibleSignalCount = browser
    ? [
        serverSnapshot.ip,
        serverSnapshot.countryName,
        browser.browser.name,
        browser.operatingSystem.name,
        browser.device.name,
        browser.screen,
        browser.language,
        browser.timezone,
        browser.cookies,
      ].filter((value) => value !== null && value !== undefined && value !== "").length
    : null;

  function refreshSnapshot() {
    startRefresh(() => router.refresh());
  }

  return (
    <div className="mt-8">
      <section className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-surface-base to-accent-50/60 p-6 shadow-sm dark:border-brand-900/60 dark:from-brand-950/40 dark:via-surface-base dark:to-accent-950/20 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/20" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 size-56 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-800/10" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <Badge variant="brand" className="bg-white/80 dark:bg-brand-950/60">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              {copy.eyebrow}
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
              {copy.subtitle}
            </p>
          </div>
          <Badge variant="success" className="w-fit shrink-0 bg-white/80 dark:bg-success-950/40">
            <span className="size-2 rounded-full bg-success-500" aria-hidden="true" />
            {copy.liveBadge}
          </Badge>
        </div>

        <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(3,minmax(0,1fr))]">
          <div className="min-w-0 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-surface-subtle/75">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2 text-brand-700 dark:text-brand-300">
                <Globe2 className="size-5 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide">{copy.networkAddressesTitle}</p>
                  <p className="mt-1 text-xs normal-case tracking-normal text-ink-muted">{copy.networkAddressesSubtitle}</p>
                </div>
              </div>
              <Badge variant="outline" className="shrink-0 bg-white/70 dark:bg-surface-base/50">
                {serverSnapshot.currentIpVersion === "ipv6" ? copy.ipv6 : serverSnapshot.currentIpVersion === "ipv4" ? copy.ipv4 : copy.publicIp}
              </Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <AddressSignal
                label={copy.ipv4}
                value={serverSnapshot.ipv4 ?? copy.unknown}
                detected={Boolean(serverSnapshot.ipv4)}
                detectedLabel={copy.detectedOnRequest}
                notDetectedLabel={copy.notDetectedOnRequest}
              />
              <AddressSignal
                label={copy.ipv6}
                value={serverSnapshot.ipv6 ?? copy.unknown}
                detected={Boolean(serverSnapshot.ipv6)}
                detectedLabel={copy.detectedOnRequest}
                notDetectedLabel={copy.notDetectedOnRequest}
              />
            </div>
          </div>
          <SignalCard
            icon={
              serverSnapshot.countryCode ? (
                <CountryFlag
                  code={serverSnapshot.countryCode}
                  name={serverSnapshot.countryName ?? copy.approxLocation}
                  size={34}
                />
              ) : (
                <MapPin className="size-5" aria-hidden="true" />
              )
            }
            label={copy.approxLocation}
            value={location}
            detail={
              serverSnapshot.countryName
                ? serverSnapshot.countrySource === "lookup"
                  ? copy.countryLookup
                  : copy.countryOnly
                : copy.unknown
            }
          />
          <SignalCard
            icon={
              browser ? (
                <BrandMark icon={browser.browser.icon} label={browser.browser.name} size={34} />
              ) : (
                <Globe2 className="size-5" aria-hidden="true" />
              )
            }
            label={copy.browser}
            value={browser?.browser.name ?? "…"}
            detail={browser?.operatingSystem.name ?? "…"}
          />
          <SignalCard
            icon={
              browser ? (
                <DeviceMark type={browser.device.icon} label={browser.device.name} size={34} />
              ) : (
                <Laptop className="size-5" aria-hidden="true" />
              )
            }
            label={copy.device}
            value={browser?.device.name ?? "…"}
            detail={browser?.screen ?? "…"}
          />
        </div>

        <p className="relative mt-5 flex items-center gap-2 text-xs font-medium text-ink-muted">
          <LockKeyhole className="size-3.5 shrink-0 text-brand-600" aria-hidden="true" />
          {copy.noExternalLookup}
        </p>
      </section>

      <VisibilitySummary
        copy={copy}
        visibleSignalCount={visibleSignalCount}
      />

      <NextSteps copy={copy} />

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            {browser ? (
              <BrandMark icon={browser.browser.icon} label={browser.browser.name} size={64} />
            ) : (
              <BrandMark icon="generic" label={copy.browser} size={64} />
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                {copy.browser}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-ink-strong">
                {browser?.browser.name ?? "…"}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                {browser?.operatingSystem.name ?? "…"}
              </p>
            </div>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <InfoRow icon={Monitor} label={copy.operatingSystem} value={browser?.operatingSystem.name ?? "…"} />
            <InfoRow icon={Laptop} label={copy.device} value={browser?.device.name ?? "…"} />
            <InfoRow icon={Monitor} label={copy.screen} value={browser?.screen ?? "…"} mono />
            <InfoRow icon={Languages} label={copy.language} value={browser?.language ?? "…"} />
            <InfoRow icon={Clock3} label={copy.timezone} value={browser?.timezone ?? "…"} />
            <InfoRow icon={Wifi} label={copy.connection} value={browser ? (browser.online ? copy.online : copy.offline) : "…"} />
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-ink-strong">{copy.browserDeviceTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy.browserDeviceSubtitle}</p>
            </div>
            {browser ? <DeviceMark type={browser.device.icon} label={browser.device.name} size={56} /> : null}
          </div>
          <div className="mt-6 space-y-3">
            <SmallSignal icon={Cookie} label={copy.cookies} value={browser ? (browser.cookies ? copy.enabled : copy.disabled) : "…"} positive={browser?.cookies} />
            <SmallSignal icon={Smartphone} label={copy.touchSupport} value={browser ? (browser.touch ? copy.yes : copy.no) : "…"} positive={browser?.touch} />
            <SmallSignal icon={Globe2} label={copy.connection} value={browser ? (browser.online ? copy.online : copy.offline) : "…"} positive={browser?.online} />
          </div>
        </Card>
      </section>

      <ConnectionComparison
        baseline={baseline}
        current={currentConnection}
        copy={copy}
        isRefreshing={isRefreshing}
        onSave={() => setBaseline(currentConnection)}
        onRefresh={refreshSnapshot}
      />

      <PrivacyControls browser={browser} copy={copy} />

      <section className="mt-6 rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink-strong">{copy.privacySignalsTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{copy.privacySignalsSubtitle}</p>
          </div>
          <Badge variant="outline" className="w-fit">{copy.notChecked}</Badge>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PrivacyCheckCard
            icon={Server}
            title={copy.dnsLeak}
            body={copy.dnsLeakBody}
            href="/tools/dns-leak-test"
            openLabel={copy.openCheck}
          />
          <PrivacyCheckCard
            icon={Wifi}
            title={copy.webrtcLeak}
            body={copy.webrtcLeakBody}
            href="/tools/webrtc-leak-test"
            openLabel={copy.openCheck}
          />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface-base p-6 sm:p-8 dark:bg-surface-subtle">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-success-50 text-success-700 dark:bg-success-950/30 dark:text-success-300">
            <EyeOff className="size-5" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-ink-strong">{copy.cannotSeeTitle}</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <LimitCard icon={LockKeyhole} title={copy.macAddress} body={copy.macAddressBody} />
          <LimitCard icon={EyeOff} title={copy.filesAndPasswords} body={copy.filesAndPasswordsBody} />
          <LimitCard icon={MapPin} title={copy.exactLocation} body={copy.exactLocationBody} />
        </div>
      </section>

      <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
        <CircleHelp className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>{copy.privacyNote}</span>
      </p>
    </div>
  );
}

function VisibilitySummary({
  copy,
  visibleSignalCount,
}: {
  copy: Copy;
  visibleSignalCount: number | null;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-border bg-surface-base p-6 shadow-sm sm:p-8 dark:bg-surface-subtle">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
            <Activity className="size-5" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wider">{copy.visibilitySummaryTitle}</p>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-ink-strong">{copy.visibleNowTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">{copy.visibilitySummarySubtitle}</p>
        </div>
        <Badge variant="brand" className="w-fit shrink-0">
          {visibleSignalCount === null ? "…" : visibleSignalCount} {copy.signalsAvailable}
        </Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryColumn
          tone="brand"
          title={copy.visibleNowTitle}
          body={copy.visibleNowBody}
          icon={<Globe2 className="size-5" aria-hidden="true" />}
        />
        <SummaryColumn
          tone="accent"
          title={copy.approximateSignalsTitle}
          body={copy.approximateSignalsBody}
          icon={<MapPin className="size-5" aria-hidden="true" />}
        />
        <SummaryColumn
          tone="success"
          title={copy.notAccessibleTitle}
          body={copy.notAccessibleBody}
          icon={<EyeOff className="size-5" aria-hidden="true" />}
        />
      </div>
    </section>
  );
}

function SummaryColumn({
  tone,
  title,
  body,
  icon,
}: {
  tone: "brand" | "accent" | "success";
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  const toneClasses = {
    brand: "border-brand-200 bg-brand-50/60 text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/30 dark:text-brand-300",
    accent: "border-accent-200 bg-accent-50/60 text-accent-700 dark:border-accent-800/60 dark:bg-accent-950/30 dark:text-accent-300",
    success: "border-success-200 bg-success-50/60 text-success-700 dark:border-success-800/60 dark:bg-success-950/30 dark:text-success-300",
  } as const;

  return (
    <div className={`rounded-xl border p-5 ${toneClasses[tone]}`}>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-bold text-ink-strong">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}

function NextSteps({ copy }: { copy: Copy }) {
  const steps = [
    {
      icon: Server,
      title: copy.dnsActionTitle,
      body: copy.dnsActionBody,
      href: "/tools/dns-leak-test" as const,
    },
    {
      icon: Wifi,
      title: copy.webrtcActionTitle,
      body: copy.webrtcActionBody,
      href: "/tools/webrtc-leak-test" as const,
    },
    {
      icon: ShieldCheck,
      title: copy.compareActionTitle,
      body: copy.compareActionBody,
      href: "/comparison" as const,
    },
    {
      icon: BookOpen,
      title: copy.researchActionTitle,
      body: copy.researchActionBody,
      href: "/research/evidence-ledger" as const,
    },
  ];

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50/80 via-surface-base to-accent-50/30 shadow-sm dark:border-brand-900/60 dark:from-brand-950/30 dark:via-surface-subtle dark:to-accent-950/10">
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
            <ShieldCheck className="size-5" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wider">{copy.nextStepsKicker}</p>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-ink-strong">{copy.nextStepsTitle}</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{copy.nextStepsSubtitle}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/75 shadow-sm dark:border-white/10 dark:bg-surface-subtle/75">
          {steps.map(({ icon: Icon, title, body, href }, index) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-3 border-b border-border px-4 py-3.5 transition last:border-b-0 hover:bg-brand-50/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 dark:hover:bg-brand-950/20 sm:gap-4 sm:px-5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-xs font-bold text-brand-700 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-300">
              {index + 1}
            </span>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-brand-700 dark:bg-surface-base dark:text-brand-300">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-ink-strong">{title}</span>
              <span className="mt-0.5 block truncate text-xs text-ink-muted">{body}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700 group-hover:underline dark:text-brand-300">
              <span className="hidden sm:inline">{copy.openNextStep}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectionComparison({
  baseline,
  current,
  copy,
  isRefreshing,
  onSave,
  onRefresh,
}: {
  baseline: ConnectionSnapshot | null;
  current: ConnectionSnapshot;
  copy: Copy;
  isRefreshing: boolean;
  onSave: () => void;
  onRefresh: () => void;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50/70 via-surface-base to-surface-base p-6 shadow-sm dark:border-brand-900/60 dark:from-brand-950/30 dark:via-surface-subtle dark:to-surface-subtle sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
            <RefreshCw className="size-5" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wider">{copy.comparisonKicker}</p>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-ink-strong">{copy.comparisonTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">{copy.comparisonSubtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={onSave}>
            <Save className="size-4" aria-hidden="true" />
            {copy.saveSnapshot}
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={onRefresh} disabled={isRefreshing}>
            <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin" : ""}`} aria-hidden="true" />
            {copy.refreshSnapshot}
          </Button>
        </div>
      </div>

      {!baseline ? (
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-dashed border-brand-300 bg-white/60 p-5 dark:border-brand-800 dark:bg-surface-base/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-ink-muted">{copy.comparisonEmpty}</p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
            {copy.currentLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <ComparisonRow label={copy.publicIp} baseline={baseline.ip} current={current.ip} copy={copy} />
          <ComparisonRow label={copy.ipv4} baseline={baseline.ipv4} current={current.ipv4} copy={copy} />
          <ComparisonRow label={copy.ipv6} baseline={baseline.ipv6} current={current.ipv6} copy={copy} />
          <ComparisonRow label={copy.approxLocation} baseline={baseline.location} current={current.location} copy={copy} />
        </div>
      )}
    </section>
  );
}

function ComparisonRow({
  label,
  baseline,
  current,
  copy,
}: {
  label: string;
  baseline: string | null;
  current: string | null;
  copy: Copy;
}) {
  const baselineValue = baseline ?? copy.unknown;
  const currentValue = current ?? copy.unknown;
  const same = baselineValue === currentValue;

  return (
    <div className="min-w-0 rounded-xl border border-border bg-surface-base p-4 dark:bg-surface-subtle">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
        <Badge variant={same ? "outline" : "success"}>{same ? copy.unchanged : copy.changed}</Badge>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <ComparisonValue label={copy.baselineLabel} value={baselineValue} mono={label !== copy.approxLocation} />
        <ComparisonValue label={copy.currentLabel} value={currentValue} mono={label !== copy.approxLocation} />
      </div>
    </div>
  );
}

function ComparisonValue({ label, value, mono }: { label: string; value: string; mono: boolean }) {
  return (
    <div className="min-w-0 rounded-lg bg-surface-subtle px-3 py-2 dark:bg-surface-base">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={`mt-1 truncate text-xs font-semibold text-ink-strong ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

function PrivacyControls({
  browser,
  copy,
}: {
  browser: BrowserSnapshot | null;
  copy: Copy;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8">
      <div>
        <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
          <LockKeyhole className="size-5" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-wider">{copy.privacyControlsKicker}</p>
        </div>
        <h2 className="mt-2 text-2xl font-bold text-ink-strong">{copy.privacyControlsTitle}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">{copy.privacyControlsSubtitle}</p>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <SmallSignal
          icon={ShieldCheck}
          label={copy.secureConnection}
          value={browser ? (browser.secureContext ? copy.enabled : copy.disabled) : "…"}
          positive={browser?.secureContext}
        />
        <SmallSignal
          icon={EyeOff}
          label={copy.globalPrivacyControl}
          value={browser ? privacyPreferenceValue(browser.globalPrivacyControl, copy) : "…"}
          positive={browser?.globalPrivacyControl === "on"}
        />
        <SmallSignal
          icon={EyeOff}
          label={copy.doNotTrack}
          value={browser ? privacyPreferenceValue(browser.doNotTrack, copy) : "…"}
          positive={browser?.doNotTrack === "on"}
        />
      </div>
    </section>
  );
}

function privacyPreferenceValue(
  value: BrowserSnapshot["globalPrivacyControl"],
  copy: Copy,
) {
  if (value === "on") return copy.enabled;
  if (value === "off") return copy.disabled;
  return copy.notSet;
}

function SignalCard({
  icon,
  label,
  value,
  detail,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-surface-subtle/75">
      <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">{icon}<span className="text-xs font-semibold uppercase tracking-wide">{label}</span></div>
      <p className={`mt-3 truncate text-lg font-bold text-ink-strong ${mono ? "font-mono text-base" : ""}`}>{value}</p>
      <p className="mt-1 truncate text-xs text-ink-muted">{detail}</p>
    </div>
  );
}

function AddressSignal({
  label,
  value,
  detected,
  detectedLabel,
  notDetectedLabel,
}: {
  label: string;
  value: string;
  detected: boolean;
  detectedLabel: string;
  notDetectedLabel: string;
}) {
  return (
    <div className={`min-w-0 rounded-xl border p-3 ${detected ? "border-brand-200 bg-brand-50/70 dark:border-brand-800/60 dark:bg-brand-950/30" : "border-border bg-surface-subtle/70 dark:bg-surface-base/50"}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
        <span className={`size-2 shrink-0 rounded-full ${detected ? "bg-success-500" : "bg-ink-muted/40"}`} aria-hidden="true" />
      </div>
      <p className={`mt-2 truncate text-sm font-bold text-ink-strong ${detected ? "font-mono" : ""}`}>{value}</p>
      <p className="mt-1 truncate text-[11px] text-ink-muted">{detected ? detectedLabel : notDetectedLabel}</p>
    </div>
  );
}

function CountryFlag({
  code,
  name,
  size = 34,
}: {
  code: string;
  name: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-muted"
      style={{ width: size, height: size }}
    >
      <Image
        src={`https://flagcdn.com/h40/${code.toLowerCase()}.png`}
        alt={name}
        width={28}
        height={20}
        className="h-auto w-6 rounded-sm shadow-sm ring-1 ring-black/5"
        unoptimized
      />
    </span>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-surface-subtle p-3 dark:bg-surface-base">
      <Icon className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
        <p className={`mt-0.5 truncate text-sm font-semibold text-ink-strong ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}

function SmallSignal({
  icon: Icon,
  label,
  value,
  positive,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-subtle p-3 dark:bg-surface-base">
      <div className="flex min-w-0 items-center gap-3">
        <Icon className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
        <span className="truncate text-sm font-medium text-ink">{label}</span>
      </div>
      <span className={`shrink-0 text-sm font-semibold ${positive ? "text-success-700 dark:text-success-300" : "text-ink-muted"}`}>{value}</span>
    </div>
  );
}

function PrivacyCheckCard({
  icon: Icon,
  title,
  body,
  href,
  openLabel,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  href: "/tools/dns-leak-test" | "/tools/webrtc-leak-test";
  openLabel: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-base p-5 dark:bg-surface-subtle">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-muted"><Icon className="size-5" aria-hidden="true" /></div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-ink-strong">{title}</h3>
            <Badge variant="outline">Not run</Badge>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
          <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
            {openLabel}
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function LimitCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-subtle p-5 dark:bg-surface-base">
      <Icon className="size-5 text-success-700 dark:text-success-300" aria-hidden="true" />
      <h3 className="mt-4 font-bold text-ink-strong">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
