import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DevicePage } from "@/components/device/device-page";
import { getDevice } from "@/data/devices";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "iPad İçin En İyi VPN (2026) — Streaming ve Üretkenlik Rehberi",
  description:
    "iPad'de VPN kurulumu, Stage Manager ile uyumluluk, streaming için en iyi sağlayıcılar ve cihaza özel dikkat noktaları.",
  alternates: { canonical: absoluteUrl("/cihazlar/ipad") },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const device = getDevice("ipad", locale as "tr" | "en");
  if (!device) notFound();
  return <DevicePage device={device} locale={locale} />;
}
