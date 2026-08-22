import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Filter } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { FeatureFilter } from "@/components/filter/feature-filter";
import { absoluteUrl, localizedAlternates } from "@/lib/site";
import { getLocalizedLinkHref, type AppLocale } from "@/lib/i18n-paths";

type Props = { params: Promise<{ locale: string }> };

const CONTENT = {
  tr: {
    metaTitle:
      "VPN Özellik Filtresi (2026) — Türkiye Sunucusu, Port Forwarding, Multi-hop",
    metaDescription:
      "Aradığın özelliklere göre VPN bul: Türkiye sunucusu, sınırsız cihaz, açık kaynak, port forwarding, multi-hop, obfuscation, ücretsiz plan ve daha fazlası.",
    ogTitle: "VPN Özellik Filtresi",
    ogDescription: "Özelliklere göre en uygun VPN'i filtrele.",
    breadcrumbHome: "Ana sayfa",
    breadcrumbHere: "Özellik filtresi",
    badge: "Filtre aracı",
    h1: "VPN özellik filtresi",
    lede: "Aradığın özellikleri seç — 20 VPN'den hangileri tüm kriterlerini karşılıyor anında gör. Türkiye sunucusu, port forwarding, multi-hop, ücretsiz plan ve daha fazlası.",
    explanationsH2: "Özellik açıklamaları",
    explanations: [
      { bold: "Türkiye sunucusu:", body: " BluTV, Exxen, Türk bankacılığı ve e-Devlet erişimi için gerekli." },
      { bold: "Sınırsız cihaz:", body: " Tek hesapla ev/aile tüm cihazlarını koruma. Surfshark, PIA, IPVanish, Windscribe sunar." },
      { bold: "Açık kaynak istemci:", body: " Uygulama kodu kamuya açık — güvenlik araştırmacıları arka kapı/zafiyet inceleyebilir." },
      { bold: "Bağımsız denetim:", body: " Deloitte, Cure53 gibi üçüncü taraf firmaların no-logs/güvenlik doğrulaması." },
      { bold: "Port forwarding:", body: " P2P, oyun sunucusu host etme veya BitTorrent seeding için belirli port'u açma." },
      { bold: "Multi-hop:", body: " Trafiği iki sunucudan ardışık geçirme — maksimum gizlilik için." },
      { bold: "Obfuscation:", body: " VPN trafiğini normal HTTPS gibi gösterip Çin, BAE gibi VPN engelleyen ülkelerde çalışmasını sağlar." },
      { bold: "Ücretsiz plan:", body: " Para vermeden sınırlı kullanım. Proton VPN ve Windscribe önerilebilir; çoğu ücretsiz VPN tehlikeli." },
      { bold: "5/9/14 Eyes dışı:", body: " İstihbarat ittifakı dışı yargı yetkisi (Panama, İsviçre, Romanya, BVI, vb.)." },
      { bold: "P2P / Torrent:", body: " BitTorrent ve peer-to-peer trafiğine izin verilir." },
    ],
    relatedKicker: "Diğer araçlar",
    related: [
      { label: "Quiz: Sana uygun VPN", href: "/sana-uygun-vpn" },
      { label: "Maliyet hesaplayıcı", href: "/hesaplayici" },
      { label: "İki VPN'i karşılaştır", href: "/karsilastir" },
      { label: "VPN sözlüğü", href: "/sozluk" },
    ],
  },
  en: {
    metaTitle:
      "VPN Feature Filter (2026) — Turkey Server, Port Forwarding, Multi-hop",
    metaDescription:
      "Find a VPN by feature: Turkey server, unlimited devices, open source, port forwarding, multi-hop, obfuscation, free plan and more.",
    ogTitle: "VPN Feature Filter",
    ogDescription: "Filter the right VPN by feature.",
    breadcrumbHome: "Home",
    breadcrumbHere: "Feature filter",
    badge: "Filter tool",
    h1: "VPN feature filter",
    lede: "Pick the features you need — see at a glance which of the 20 VPNs meet all your criteria. Turkey server, port forwarding, multi-hop, free plan and more.",
    explanationsH2: "What the features mean",
    explanations: [
      { bold: "Turkey server:", body: " Required for BluTV, Exxen, Turkish banking and e-Devlet access." },
      { bold: "Unlimited devices:", body: " Protect every device in the household on one account. Offered by Surfshark, PIA, IPVanish and Windscribe." },
      { bold: "Open-source client:", body: " The app code is public — security researchers can inspect it for backdoors/vulnerabilities." },
      { bold: "Independent audit:", body: " Third-party verification (Deloitte, Cure53) of no-logs/security claims." },
      { bold: "Port forwarding:", body: " Opens a specific port for P2P, hosting a game server or efficient BitTorrent seeding." },
      { bold: "Multi-hop:", body: " Routes traffic through two servers in sequence — for maximum privacy." },
      { bold: "Obfuscation:", body: " Disguises VPN traffic as regular HTTPS so it works in countries that block VPNs (China, UAE)." },
      { bold: "Free plan:", body: " Limited use without paying. Proton VPN and Windscribe are reasonable; most free VPNs are unsafe." },
      { bold: "Outside 5/9/14 Eyes:", body: " Jurisdiction outside the intelligence alliances (Panama, Switzerland, Romania, BVI, etc.)." },
      { bold: "P2P / Torrent:", body: " BitTorrent and peer-to-peer traffic are allowed." },
    ],
    relatedKicker: "Other tools",
    related: [
      { label: "Quiz: your-match VPN", href: "/sana-uygun-vpn" },
      { label: "Cost calculator", href: "/hesaplayici" },
      { label: "Compare two VPNs", href: "/karsilastir" },
      { label: "VPN glossary", href: "/sozluk" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale === "en" ? "en" : "tr"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/sunucu-haritasi", locale),
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: absoluteUrl("/sunucu-haritasi", locale),
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale === "en" ? "en" : "tr"];
  const comparisonHref = getLocalizedLinkHref({
    locale: locale as AppLocale,
    section: "comparison",
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: c.breadcrumbHome, path: "/" },
            { name: c.breadcrumbHere, path: "/sunucu-haritasi" },
          ],
          locale as "tr" | "en" | "de",
        )}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            {c.breadcrumbHome}
          </Link>{" "}
          › <span className="text-ink-strong">{c.breadcrumbHere}</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <Filter className="size-3" /> {c.badge}
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-ink-muted max-w-3xl">{c.lede}</p>
        </header>

        <FeatureFilter />

        <article className="mt-16 prose prose-stone max-w-none">
          <h2>{c.explanationsH2}</h2>
          <ul>
            {c.explanations.map((e) => (
              <li key={e.bold}>
                <strong>{e.bold}</strong>
                {e.body}
              </li>
            ))}
          </ul>
        </article>

        <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">{c.relatedKicker}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {c.related.map((r) => (
              <Link
                key={r.href}
                href={r.href === "/karsilastir" ? comparisonHref : r.href}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

