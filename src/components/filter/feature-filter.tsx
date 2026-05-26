"use client";

import { useMemo, useState } from "react";
import { Check, Filter, RotateCcw, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { products } from "@/data/products";
import {
  featureMatrix,
  FILTER_LABELS,
  type FilterKey,
} from "@/data/features";

const FILTER_KEYS = Object.keys(FILTER_LABELS) as FilterKey[];

export function FeatureFilter() {
  const [active, setActive] = useState<Set<FilterKey>>(new Set());

  function toggle(key: FilterKey) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function reset() {
    setActive(new Set());
  }

  const matches = useMemo(() => {
    const ranked = [...products].sort((a, b) => a.rank - b.rank);
    return ranked.filter((product) => {
      const flags = featureMatrix[product.slug];
      if (!flags) return false;
      for (const key of active) {
        if (!flags[key]) return false;
      }
      return true;
    });
  }, [active]);

  return (
    <div className="mt-8">
      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
          <Filter className="size-4" /> Özellik filtreleri
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTER_KEYS.map((key) => {
            const isActive = active.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-brand-600 text-white border border-brand-600"
                    : "border border-border bg-white hover:border-brand-300"
                }`}
                title={FILTER_LABELS[key].help}
              >
                {isActive ? (
                  <Check className="size-3" />
                ) : (
                  <span className="size-3" />
                )}
                {FILTER_LABELS[key].label}
              </button>
            );
          })}
        </div>
        {active.size > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
          >
            <RotateCcw className="size-3" /> Filtreleri sıfırla (
            {active.size} aktif)
          </button>
        ) : null}
      </Card>

      <div className="mt-6 flex items-center justify-between text-sm text-ink-muted">
        <p>
          <strong className="text-ink-strong">{matches.length}</strong> VPN
          eşleşti
        </p>
        {active.size > 0 ? (
          <p>Filtreler: {active.size}</p>
        ) : (
          <p>Tüm 10 VPN gösteriliyor</p>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((product) => {
          const flags = featureMatrix[product.slug];
          const activeFlags = FILTER_KEYS.filter((k) => flags[k]);
          return (
            <Card
              key={product.slug}
              className="p-5 flex flex-col hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <VPNLogo slug={product.slug} size={48} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink-strong">
                    {product.brand}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {product.positioning}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {activeFlags.slice(0, 5).map((k) => (
                  <Badge
                    key={k}
                    variant={active.has(k) ? "brand" : "outline"}
                    className="text-[10px]"
                  >
                    <Check className="size-2.5" /> {FILTER_LABELS[k].label}
                  </Badge>
                ))}
                {activeFlags.length > 5 ? (
                  <Badge variant="outline" className="text-[10px]">
                    +{activeFlags.length - 5}
                  </Badge>
                ) : null}
              </div>

              <div className="mt-auto pt-4 flex flex-col gap-2">
                <Button asChild variant="primary" size="sm">
                  <Link href={`/inceleme/${product.slug}`}>
                    İncelemeyi oku
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/go/${product.slug}`}>Fırsata git</Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {matches.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <X className="mx-auto size-8 text-ink-muted" />
          <p className="mt-3 font-medium text-ink-strong">Eşleşen VPN yok</p>
          <p className="mt-1 text-sm text-ink-muted">
            Seçtiğin tüm kriterleri karşılayan bir VPN bulamadık. Filtreleri
            azaltmayı dene.
          </p>
          <Button variant="secondary" size="sm" onClick={reset} className="mt-4">
            <RotateCcw className="size-3.5" /> Filtreleri sıfırla
          </Button>
        </Card>
      ) : null}
    </div>
  );
}
