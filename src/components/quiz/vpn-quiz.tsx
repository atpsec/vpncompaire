"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw, Sparkles, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { getProduct } from "@/data/products";

type Option = {
  label: string;
  /** Per-VPN points awarded if this option is chosen */
  points: Partial<Record<string, number>>;
};

type Question = {
  id: string;
  prompt: string;
  helper?: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "priority",
    prompt: "1. Önceliğin nedir?",
    helper: "VPN'i çoğunlukla ne için kullanacaksın?",
    options: [
      {
        label: "Streaming (Netflix, BluTV, Disney+)",
        points: {
          nordvpn: 3,
          expressvpn: 3,
          surfshark: 2,
          cyberghost: 3,
        },
      },
      {
        label: "Gizlilik / anonimlik",
        points: {
          mullvad: 4,
          "proton-vpn": 3,
          pia: 2,
          nordvpn: 1,
        },
      },
      {
        label: "Günlük güvenlik (halka açık Wi-Fi)",
        points: {
          nordvpn: 2,
          surfshark: 2,
          expressvpn: 2,
          "proton-vpn": 2,
        },
      },
      {
        label: "Oyun + DDoS koruması",
        points: {
          nordvpn: 3,
          expressvpn: 3,
          pia: 2,
        },
      },
    ],
  },
  {
    id: "budget",
    prompt: "2. Bütçen ne kadar?",
    options: [
      {
        label: "Ücretsiz tercih ederim",
        points: { "proton-vpn": 5, windscribe: 2 },
      },
      {
        label: "Aylık 100 TL altı (ucuz)",
        points: { surfshark: 4, pia: 3, ipvanish: 2 },
      },
      {
        label: "Aylık 100-200 TL arası (orta)",
        points: { nordvpn: 3, "proton-vpn": 2, mullvad: 3 },
      },
      {
        label: "Önemli değil, en iyisi olsun",
        points: { expressvpn: 4, nordvpn: 3 },
      },
    ],
  },
  {
    id: "devices",
    prompt: "3. Kaç cihazda kullanacaksın?",
    options: [
      { label: "1-2 cihaz", points: { mullvad: 2, "proton-vpn": 2 } },
      { label: "3-5 cihaz", points: { nordvpn: 2, expressvpn: 2, pia: 2 } },
      { label: "5-10 cihaz", points: { nordvpn: 3, ipvanish: 2 } },
      {
        label: "Sınırsız (tüm aile)",
        points: { surfshark: 5, windscribe: 2 },
      },
    ],
  },
  {
    id: "location",
    prompt: "4. Türkiye sunucusu gerekli mi?",
    helper: "Yurt dışındaysan veya BluTV/Exxen kullanıyorsan evet.",
    options: [
      {
        label: "Evet, şart",
        points: {
          nordvpn: 3,
          expressvpn: 3,
          surfshark: 3,
          cyberghost: 2,
          pia: 1,
        },
      },
      {
        label: "Hayır, gerek yok",
        points: { mullvad: 3, "proton-vpn": 2 },
      },
      { label: "Bilmiyorum", points: { nordvpn: 1, surfshark: 1 } },
    ],
  },
  {
    id: "trust",
    prompt: "5. Güven seviyesi: en çok hangisi önemli?",
    options: [
      {
        label: "Bağımsız denetim geçmişi",
        points: {
          nordvpn: 3,
          expressvpn: 3,
          mullvad: 2,
          "proton-vpn": 3,
          tunnelbear: 2,
        },
      },
      {
        label: "Açık kaynak istemci",
        points: {
          "proton-vpn": 4,
          mullvad: 4,
          pia: 3,
        },
      },
      {
        label: "Mahkemede test edilmiş no-logs",
        points: { pia: 4, expressvpn: 3 },
      },
      {
        label: "Marka tanınırlığı yeterli",
        points: { nordvpn: 2, expressvpn: 2, surfshark: 1 },
      },
    ],
  },
  {
    id: "ease",
    prompt: "6. Teknik beceri seviyen?",
    options: [
      {
        label: "Başlangıç — basit olsun",
        points: { surfshark: 2, nordvpn: 2, expressvpn: 3, tunnelbear: 3 },
      },
      {
        label: "Orta — bazı ayarları severim",
        points: { nordvpn: 2, "proton-vpn": 2, surfshark: 2 },
      },
      {
        label: "İleri — port forwarding, multi-hop önemli",
        points: { pia: 4, mullvad: 3, "proton-vpn": 2 },
      },
    ],
  },
];

export function VPNQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const currentIdx = QUESTIONS.findIndex((q) => answers[q.id] === undefined);
  const allAnswered = currentIdx === -1;

  function select(questionId: string, optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  }

  function reset() {
    setAnswers({});
    setShowResult(false);
  }

  const scores = QUESTIONS.reduce<Record<string, number>>((acc, q) => {
    const optionIdx = answers[q.id];
    if (optionIdx === undefined) return acc;
    const opt = q.options[optionIdx];
    for (const [slug, pts] of Object.entries(opt.points)) {
      acc[slug] = (acc[slug] ?? 0) + (pts ?? 0);
    }
    return acc;
  }, {});

  const ranked = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (showResult && ranked.length > 0) {
    const top = ranked[0];
    const product = getProduct(top[0]);
    if (!product) return null;
    const bestPlan =
      product.plans.find((pl) => pl.isBestValue) ?? product.plans[0];

    return (
      <div className="mt-8">
        <Card className="p-8 border-brand-300 bg-gradient-to-br from-brand-50/60 to-accent-50/40">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <Sparkles className="size-4" />
            Cevaplarına göre öne çıkan öneri
          </div>

          <div className="mt-4 flex items-center gap-4">
            <VPNLogo slug={product.slug} size={88} />
            <div>
              <h2 className="text-3xl font-bold text-ink-strong">
                {product.brand}
              </h2>
              <p className="text-sm text-ink-muted">{product.positioning}</p>
              <Badge variant="success" className="mt-2">
                Puan: {top[1]}/30
              </Badge>
            </div>
          </div>

          <p className="mt-6 text-ink leading-relaxed">{product.summary}</p>

          <p className="mt-3 text-xs text-ink-muted leading-relaxed">
            Bu quiz puanlama tabanlı bir yardımcıdır; kişisel bir tavsiye veya
            garanti değildir. Satın alma kararı vermeden önce sağlayıcının
            resmi sitesinden güncel fiyat ve özellikleri doğrulamanı
            öneririz.
          </p>

          <div className="mt-6 flex items-baseline gap-2 text-ink-strong">
            <span className="text-sm text-ink-muted">Aylık</span>
            <span className="text-2xl font-bold">
              ${bestPlan.monthlyPriceUsd.toFixed(2)}
            </span>
            <span className="text-sm text-ink-muted">
              ({bestPlan.name})
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="primary">
              <Link href={`/go/${product.slug}`}>
                {product.brand} fırsatını gör
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/inceleme/${product.slug}`}>İncelemeyi oku</Link>
            </Button>
            <Button variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" /> Yeniden başla
            </Button>
          </div>
        </Card>

        {ranked.length > 1 ? (
          <div className="mt-6">
            <h3 className="font-semibold text-ink-strong">
              Alternatif önerilerimiz
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {ranked.slice(1).map(([slug, score]) => {
                const alt = getProduct(slug);
                if (!alt) return null;
                return (
                  <Card key={slug} className="p-4 flex items-center gap-3">
                    <VPNLogo slug={alt.slug} size={48} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink-strong truncate">
                        {alt.brand}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {alt.positioning} · Puan: {score}
                      </p>
                    </div>
                    <Link
                      href={`/inceleme/${alt.slug}`}
                      className="text-sm font-medium text-brand-700 hover:underline shrink-0"
                    >
                      İncele →
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {QUESTIONS.map((q, qIdx) => {
        const isAnswered = answers[q.id] !== undefined;
        const isActive = qIdx === currentIdx || isAnswered;
        if (!isActive) return null;

        return (
          <Card key={q.id} className="p-6">
            <h3 className="font-semibold text-ink-strong text-lg">
              {q.prompt}
            </h3>
            {q.helper ? (
              <p className="mt-1 text-sm text-ink-muted">{q.helper}</p>
            ) : null}
            <div className="mt-4 grid gap-2">
              {q.options.map((opt, idx) => {
                const isSelected = answers[q.id] === idx;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => select(q.id, idx)}
                    className={`text-left rounded-lg border px-4 py-3 text-sm transition-all flex items-center gap-3 ${
                      isSelected
                        ? "border-brand-500 bg-brand-50 text-ink-strong"
                        : "border-border hover:border-brand-300 hover:bg-surface-subtle"
                    }`}
                  >
                    <span
                      className={`inline-flex size-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-border"
                      }`}
                    >
                      {isSelected ? <Check className="size-3" /> : null}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        );
      })}

      {allAnswered ? (
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowResult(true)}
          >
            <Sparkles className="size-4" /> Sonucu göster
          </Button>
          <Button variant="ghost" onClick={reset}>
            <RotateCcw className="size-4" /> Sıfırla
          </Button>
        </div>
      ) : (
        <p className="text-center text-xs text-ink-muted">
          Soru {Math.max(currentIdx, 0) + 1}/{QUESTIONS.length}
        </p>
      )}
    </div>
  );
}
