import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { VPNQuiz } from "@/components/quiz/vpn-quiz";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sana Uygun VPN Quiz'i — 6 Soruda Kişisel Öneri (2026)",
  description:
    "6 soruyla sana en uygun VPN'i bul. Bütçen, cihaz sayın, kullanım amacın ve teknik seviyene göre kişiselleştirilmiş öneri.",
  alternates: { canonical: absoluteUrl("/sana-uygun-vpn") },
  openGraph: {
    title: "Sana Uygun VPN Quiz'i",
    description: "6 soruda kişisel VPN önerisi al.",
    url: absoluteUrl("/sana-uygun-vpn"),
    type: "website",
  },
  keywords: [
    "vpn quiz",
    "vpn seçici",
    "hangi vpn",
    "vpn karar verici",
    "kişisel vpn önerisi",
  ],
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Sana uygun VPN", path: "/sana-uygun-vpn" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Sana uygun VPN</span>
        </p>

        <header className="mt-6 text-center">
          <Badge variant="brand">
            <Sparkles className="size-3" /> Kişisel öneri
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Sana uygun VPN&apos;i bulalım
          </h1>
          <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
            6 soruyla bütçen, cihaz sayın, kullanım senaryona ve teknik
            seviyene göre kişiselleştirilmiş VPN önerisi. 30 saniye sürer.
          </p>
        </header>

        <VPNQuiz />

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Quiz yerine direkt seçim</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/en-iyi-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              En iyi 10 VPN sıralaması
            </Link>
            <Link
              href="/karsilastir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              İki VPN&apos;i karşılaştır
            </Link>
            <Link
              href="/hesaplayici"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Maliyet hesaplayıcı
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
