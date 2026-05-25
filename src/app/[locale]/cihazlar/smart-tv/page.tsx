import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DevicePage } from "@/components/device/device-page";
import { getDevice } from "@/data/devices";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Smart TV İçin En İyi VPN (2026) — Samsung, LG, Android TV, Apple TV",
  description:
    "Samsung Tizen ve LG webOS'a VPN nasıl yüklenir? Router seviyesinde VPN, Smart DNS, Android TV ve Apple TV (tvOS 17+) için detaylı rehber.",
  alternates: { canonical: absoluteUrl("/cihazlar/smart-tv") },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const device = getDevice("smart-tv");
  if (!device) notFound();
  return <DevicePage device={device} />;
}
