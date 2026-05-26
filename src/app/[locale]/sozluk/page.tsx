import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BookA } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { glossary, categories } from "@/data/glossary";

export const metadata: Metadata = {
  title: "VPN Sözlüğü (2026) — No-logs, Kill Switch, WireGuard ve Daha Fazlası",
  description:
    "VPN terimleri sözlüğü: no-logs, kill switch, WireGuard, jurisdiction, RAM-only, port forwarding, multi-hop. 20+ terimin Türkçe açıklaması.",
  alternates: { canonical: absoluteUrl("/sozluk") },
  openGraph: {
    title: "VPN Sözlüğü",
    description: "Tüm VPN terimlerinin Türkçe açıklamalı sözlüğü.",
    url: absoluteUrl("/sozluk"),
    type: "website",
  },
  keywords: [
    "vpn sözlüğü",
    "vpn terimleri",
    "no-logs nedir",
    "kill switch nedir",
    "wireguard nedir",
    "vpn jurisdiction",
  ],
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "vpncompaire VPN Sözlüğü",
    inLanguage: "tr-TR",
    hasDefinedTerm: glossary.map((t) => ({
      "@type": "DefinedTerm",
      "@id": absoluteUrl(`/sozluk#${t.id}`),
      name: t.term,
      description: t.long,
      inDefinedTermSet: absoluteUrl("/sozluk"),
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "VPN sözlüğü", path: "/sozluk" },
        ])}
      />
      <JsonLd data={definedTermSet} />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">VPN sözlüğü</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">
            <BookA className="size-3" /> Sözlük
          </Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            VPN sözlüğü
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            VPN dünyasının yaygın terimleri ve net Türkçe açıklamaları.
            Bilmediğin bir terim için Ctrl+F (veya Cmd+F) ile arayabilirsin.
          </p>
        </header>

        <nav aria-label="Kategoriler" className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#cat-${cat}`}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              {cat}
            </a>
          ))}
        </nav>

        {categories.map((cat) => {
          const terms = glossary.filter((t) => t.category === cat);
          if (terms.length === 0) return null;
          return (
            <section key={cat} id={`cat-${cat}`} className="mt-12 scroll-mt-20">
              <h2 className="text-2xl font-bold text-ink-strong">{cat}</h2>
              <div className="mt-4 grid gap-3">
                {terms.map((t) => (
                  <Card
                    key={t.id}
                    id={t.id}
                    className="p-5 scroll-mt-20 hover:border-brand-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-ink-strong">
                          {t.term}
                        </h3>
                        <p className="mt-1 text-sm text-ink-muted">
                          {t.short}
                        </p>
                      </div>
                      <Badge variant="outline">{t.category}</Badge>
                    </div>
                    <p className="mt-3 text-sm text-ink leading-relaxed">
                      {t.long}
                    </p>
                    {t.related && t.related.length > 0 ? (
                      <p className="mt-3 text-xs text-ink-muted">
                        İlgili:{" "}
                        {t.related.map((rid, i) => {
                          const r = glossary.find((g) => g.id === rid);
                          if (!r) return null;
                          return (
                            <span key={rid}>
                              <a
                                href={`#${rid}`}
                                className="text-brand-700 hover:underline"
                              >
                                {r.term}
                              </a>
                              {i < (t.related!.length - 1) ? ", " : ""}
                            </span>
                          );
                        })}
                      </p>
                    ) : null}
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
          <p className="text-sm text-ink-muted">İlgili sayfalar</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/rehber/vpn-nedir"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              VPN nedir?
            </Link>
            <Link
              href="/rehber/vpn-guvenlik-kontrol-listesi"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Güvenlik kontrol listesi
            </Link>
            <Link
              href="/metodoloji"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
            >
              Test metodolojimiz
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
