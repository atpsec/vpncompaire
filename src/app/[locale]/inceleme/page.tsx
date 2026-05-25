import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "İncelemeler",
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  // /inceleme → /en-iyi-vpn (tüm incelemeler tek hub'da)
  await params;
  redirect("/en-iyi-vpn");
}
