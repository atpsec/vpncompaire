import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Lock,
  Tv,
  Gamepad2,
  Plane,
  Flag,
  Globe2,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kullanım Amacına Göre En İyi VPN'ler",
  description:
    "Gizlilik, streaming, oyun, seyahat, Türkiye için en uygun VPN'leri amaca göre seç.",
};

type Props = { params: Promise<{ locale: string }> };

const useCases = [
  {
    slug: "gizlilik",
    title: "Gizlilik için en iyi VPN",
    desc: "İSP gözetiminden, halka açık Wi-Fi risklerinden ve veri toplayan üçüncü taraflardan korunma.",
    Icon: Lock,
    tone: "brand",
  },
  {
    slug: "streaming",
    title: "Streaming için en iyi VPN",
    desc: "Netflix, Disney+, BBC iPlayer, HBO Max ve bölgesel kütüphane erişimi.",
    Icon: Tv,
    tone: "accent",
  },
  {
    slug: "oyun",
    title: "Oyun için en iyi VPN",
    desc: "Düşük gecikme, DDoS koruması, bölgesel sunucu erişimi.",
    Icon: Gamepad2,
    tone: "brand",
  },
  {
    slug: "seyahat",
    title: "Seyahat için en iyi VPN",
    desc: "Halka açık Wi-Fi güvenliği, kısıtlı ağlar, ülke bypass.",
    Icon: Plane,
    tone: "accent",
  },
  {
    slug: "turkiye",
    title: "Türkiye için en iyi VPN",
    desc: "TR sunucusu, DPI bypass, yasal kullanım rehberi.",
    Icon: Flag,
    tone: "brand",
  },
  {
    slug: "yurt-disindaki-turkler",
    title: "Yurt dışı Türkler için VPN",
    desc: "BluTV, Exxen, Netflix TR, e-Devlet, Türk bankacılık erişimi.",
    Icon: Globe2,
    tone: "accent",
  },
] as const;

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Kullanım Alanları", path: "/en-iyi" },
        ])}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Kullanım Alanları</span>
        </p>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Amaca göre en iyi VPN
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Tek bir &quot;en iyi VPN&quot; yok — kullanım amacına göre değişir.
            İhtiyacına en uygun listesi seç.
          </p>
        </header>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map(({ slug, title, desc, Icon, tone }) => (
            <Link key={slug} href={`/en-iyi/${slug}`} className="group">
              <Card className="p-5 hover:border-brand-300 hover:shadow-md transition-all h-full">
                <div
                  className={
                    "inline-flex items-center justify-center size-12 rounded-lg " +
                    (tone === "accent"
                      ? "bg-accent-50 text-accent-600"
                      : "bg-brand-50 text-brand-600")
                  }
                >
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-semibold text-ink-strong group-hover:text-brand-700">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{desc}</p>
                <div className="mt-3 inline-flex items-center text-xs font-medium text-brand-700">
                  İncele <ArrowRight className="ml-1 size-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
