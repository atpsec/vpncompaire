import { getLocale, getTranslations } from "next-intl/server";
import { IpSecurityBannerClient } from "@/components/home/ip-security-banner-client";

export async function IpSecurityBanner() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("home.ipBanner"),
  ]);
  return (
    <IpSecurityBannerClient
      locale={locale}
      copy={{
        ariaLabel: t("ariaLabel"),
        kicker: t("kicker"),
        title: t("title"),
        subtitle: t("subtitle"),
        locationKicker: t("locationKicker"),
        ipKicker: t("ipKicker"),
        timeKicker: t("timeKicker"),
        locationFallback: t("locationFallback"),
        compareLink: t("compareLink"),
        dismissLabel: t("dismissLabel"),
        maskedIpNote: t("maskedIpNote"),
      }}
    />
  );
}
