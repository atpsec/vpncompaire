import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Smartphone, Tablet, Tv } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { devices } from "@/data/devices";

export const metadata: Metadata = {
  title: "Cihazlara Göre VPN Rehberi — Android, iPhone, iPad, Smart TV",
  description:
    "Android, iPhone, iPad ve Smart TV'lerde VPN kurulumu, neden gerekli olduğu ve cihaza özel en iyi seçimler.",
};

const ICONS: Record<string, typeof Smartphone> = {
  android: Smartphone,
  iphone: Smartphone,
  ipad: Tablet,
  "smart-tv": Tv,
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
          { name: "Cihazlar", path: "/cihazlar" },
        ])}
      />

      <Container size="lg" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Cihazlar</span>
        </p>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            Cihazına göre VPN rehberi
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            VPN kurmak her cihazda aynı değil. Android'de uygulama, iPad&apos;de
            split-screen davranışı, Smart TV&apos;de router&apos;a inmek
            gerekiyor. Hangi yöntemin senin için doğru olduğunu cihazına özel
            açıklıyoruz.
          </p>
        </header>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {devices.map((d) => {
            const Icon = ICONS[d.slug] ?? Smartphone;
            return (
              <Link
                key={d.slug}
                href={`/cihazlar/${d.slug}`}
                className="group"
              >
                <Card className="p-6 hover:border-brand-300 hover:shadow-md transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center size-12 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-ink-strong group-hover:text-brand-700">
                        {d.shortName} için VPN
                      </h2>
                      <p className="mt-1 text-sm text-ink-muted">
                        {d.device}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-ink leading-relaxed">
                    {d.tagline}
                  </p>
                  <div className="mt-4 inline-flex items-center text-xs font-medium text-brand-700">
                    Rehberi oku <ArrowRight className="ml-1 size-3" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <section className="mt-16 rounded-xl border border-border bg-brand-50/30 p-6">
          <h2 className="text-lg font-semibold text-ink-strong">
            Cihazımın listede yok — ne yapmalıyım?
          </h2>
          <p className="mt-2 text-sm text-ink leading-relaxed">
            Windows ve macOS için her sağlayıcının doğrudan masaüstü
            uygulaması var; tek tıkla kurulum yeterli. Linux'ta WireGuard
            tabanlı bağlantı en yaygın olanı. Oyun konsolları (PS5, Xbox) ve
            akıllı ev cihazları için tek pratik yol router seviyesinde VPN —
            Smart TV rehberindeki router bölümü onlar için de geçerli.
          </p>
        </section>
      </Container>
    </>
  );
}
