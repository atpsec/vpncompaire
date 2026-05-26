import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DevicePage } from "@/components/device/device-page";
import { getDevice } from "@/data/devices";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Android İçin En İyi VPN (2026) — Telefon ve Tablet Rehberi",
  description:
    "Android telefon ve tablette VPN neden gerekli, nasıl kurulur, hangi sağlayıcı en uygun? Kill switch, split tunneling ve Play Store önerileri.",
  alternates: { canonical: absoluteUrl("/cihazlar/android") },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const device = getDevice("android", locale as "tr" | "en");
  if (!device) notFound();
  return <DevicePage device={device} locale={locale} />;
}
