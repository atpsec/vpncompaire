import { Search, Home } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <Container size="md" className="py-20 sm:py-32">
      <div className="text-center">
        <p className="text-sm font-mono tracking-widest text-brand-700">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Aradığını bulamadık
        </h1>
        <p className="mt-4 text-lg text-ink-muted max-w-xl mx-auto">
          Aradığın sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
          Aşağıdaki bağlantılar yardımcı olabilir.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="primary">
            <Link href="/">
              <Home className="size-4" /> Ana sayfa
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/en-iyi-vpn">
              <Search className="size-4" /> En iyi VPN&apos;leri gör
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <h2 className="font-semibold text-ink-strong">İncelemeler</h2>
          <p className="mt-1 text-sm text-ink-muted">
            10 VPN&apos;in detaylı incelemeleri.
          </p>
          <Link
            href="/en-iyi-vpn"
            className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
          >
            İncelemelere git →
          </Link>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-ink-strong">Karşılaştırma</h2>
          <p className="mt-1 text-sm text-ink-muted">
            VPN&apos;leri yan yana karşılaştır.
          </p>
          <Link
            href="/karsilastir"
            className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
          >
            Karşılaştırmaya git →
          </Link>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-ink-strong">Rehberler</h2>
          <p className="mt-1 text-sm text-ink-muted">
            VPN nedir, nasıl seçilir, hangi durumlarda kullanılır.
          </p>
          <Link
            href="/rehber"
            className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
          >
            Rehberlere git →
          </Link>
        </Card>
      </div>
    </Container>
  );
}
