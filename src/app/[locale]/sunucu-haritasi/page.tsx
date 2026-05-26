import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Filter } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { FeatureFilter } from "@/components/filter/feature-filter";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "VPN Özellik Filtresi (2026) — Türkiye Sunucusu, Port Forwarding, Multi-hop",
  description:
    "Aradığın özelliklere göre VPN bul: Türkiye sunucusu, sınırsız cihaz, açık kaynak, port forwarding, multi-hop, obfuscation, ücretsiz plan ve daha fazlası.",
  alternates: { canonical: absoluteUrl("/sunucu-haritasi") },
  openGraph: {
    title: "VPN Özellik Filtresi",
    description: "Özelliklere göre en uygun VPN'i filtrele.",
    url: absoluteUrl("/sunucu-haritasi"),
    type: "website",
  },
  keywords: [
    "vpn özellik filtresi",
    "türkiye sunuculu vpn",
    "port forwarding vpn",
    "multi-hop vpn",
    "açık kaynak vpn",
    "ücretsiz vpn",
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
          { name: "Özellik filtresi", path: "/sunucu-haritasi" },
        ])}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Özellik filtresi</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Filter className="size-3" /> Filtre aracı
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN özellik filtresi
          </h1>
          <p className="mt-4 text-lg text-ink-muted max-w-3xl">
            Aradığın özellikleri seç — 10 VPN&apos;den hangileri tüm
            kriterlerini karşılıyor anında gör. Türkiye sunucusu, port
            forwarding, multi-hop, ücretsiz plan ve daha fazlası.
          </p>
        </header>

        <FeatureFilter />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>Özellik açıklamaları</h2>
          <ul>
            <li>
              <strong>Türkiye sunucusu:</strong> BluTV, Exxen, Türk bankacılığı
              ve e-Devlet erişimi için gerekli.
            </li>
            <li>
              <strong>Sınırsız cihaz:</strong> Tek hesapla ev/aile tüm
              cihazlarını koruma. Surfshark, PIA, IPVanish, Windscribe sunar.
            </li>
            <li>
              <strong>Açık kaynak istemci:</strong> Uygulama kodu kamuya açık —
              güvenlik araştırmacıları arka kapı/zafiyet inceleyebilir.
            </li>
            <li>
              <strong>Bağımsız denetim:</strong> Deloitte, Cure53 gibi üçüncü
              taraf firmaların no-logs/güvenlik doğrulaması.
            </li>
            <li>
              <strong>Port forwarding:</strong> P2P, oyun sunucusu host etme
              veya BitTorrent seeding için belirli port&apos;u açma.
            </li>
            <li>
              <strong>Multi-hop:</strong> Trafiği iki sunucudan ardışık geçirme
              — maksimum gizlilik için.
            </li>
            <li>
              <strong>Obfuscation:</strong> VPN trafiğini normal HTTPS gibi
              gösterip Çin, BAE gibi VPN engelleyen ülkelerde çalışmasını sağlar.
            </li>
            <li>
              <strong>Ücretsiz plan:</strong> Para vermeden sınırlı kullanım.
              Proton VPN ve Windscribe önerilebilir; çoğu ücretsiz VPN tehlikeli.
            </li>
            <li>
              <strong>5/9/14 Eyes dışı:</strong> İstihbarat ittifakı dışı yargı
              yetkisi (Panama, İsviçre, Romanya, BVI, vb.).
            </li>
            <li>
              <strong>P2P / Torrent:</strong> BitTorrent ve peer-to-peer
              trafiğine izin verilir.
            </li>
          </ul>
        </article>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">Diğer araçlar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/sana-uygun-vpn"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Quiz: Sana uygun VPN
            </Link>
            <Link
              href="/hesaplayici"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Maliyet hesaplayıcı
            </Link>
            <Link
              href="/karsilastir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              İki VPN&apos;i karşılaştır
            </Link>
            <Link
              href="/sozluk"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN sözlüğü
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
