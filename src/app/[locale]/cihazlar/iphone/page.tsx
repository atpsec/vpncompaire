import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DevicePage } from "@/components/device/device-page";
import { getDevice } from "@/data/devices";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "iPhone İçin En İyi VPN (2026) — iOS Kurulum ve Öneriler",
  description:
    "iPhone'da VPN neden gerekli, App Store uygulamaları, iCloud Private Relay ile çakışmalar ve günlük kullanım için en iyi seçimler.",
  alternates: { canonical: absoluteUrl("/cihazlar/iphone") },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const device = getDevice("iphone");
  if (!device) notFound();
  return <DevicePage device={device} />;
}
