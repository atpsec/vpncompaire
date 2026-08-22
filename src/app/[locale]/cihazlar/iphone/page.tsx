import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DevicePage } from "@/components/device/device-page";
import { getDevice } from "@/data/devices";
import { bilingualAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const device = getDevice("iphone", locale as "tr" | "en");
  if (!device) return {};
  return {
    title: device.metaTitle,
    description: device.metaDescription,
    alternates: bilingualAlternates("/cihazlar/iphone", locale, "tr"),
    robots: locale === "de" ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const device = getDevice("iphone", locale as "tr" | "en");
  if (!device) notFound();
  return <DevicePage device={device} locale={locale} />;
}
