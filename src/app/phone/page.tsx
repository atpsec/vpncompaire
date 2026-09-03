import type { Metadata } from "next";
import { PhoneApp } from "./phone-app";

export const metadata: Metadata = {
  title: "Private Space | VPN Advisor",
  description: "Kullanıcı girişi ile kişisel VPN araçlarına telefon ekranı üzerinden ulaşın.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PhonePage() {
  return <PhoneApp />;
}
