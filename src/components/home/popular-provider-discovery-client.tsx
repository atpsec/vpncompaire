"use client";

import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { VPNLogo } from "@/components/brand/vpn-logo";

export type DiscoveryProvider = {
  slug: string;
  brand: string;
  positioning: string;
  summary: string;
  logoSlug: string;
  priceLabel: string;
  officialHref: string;
  officialRel: string;
  profileHref: string;
  profileLabel: string;
};

export type DiscoveryCopy = {
  ariaLabel: string;
  kicker: string;
  title: string;
  subtitle: string;
  sessionNote: string;
  selectionLabel: string;
  official: string;
  affiliateNote: string;
};

const SESSION_STORAGE_KEY = "vpnadvisor:popular-provider-discovery:v1";
const subscribeToSessionSelection = () => () => {};

function chooseThree(providers: DiscoveryProvider[]): DiscoveryProvider[] {
  const randomValues = new Uint32Array(providers.length);
  try {
    crypto.getRandomValues(randomValues);
  } catch {
    randomValues.fill(Date.now());
  }

  return providers
    .map((provider, index) => ({ provider, random: randomValues[index] }))
    .sort((a, b) => a.random - b.random)
    .slice(0, 3)
    .map(({ provider }) => provider);
}

function readSessionSelection(providers: DiscoveryProvider[]): DiscoveryProvider[] | null {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;
    const slugs = JSON.parse(stored);
    if (!Array.isArray(slugs) || slugs.length !== 3 || new Set(slugs).size !== 3) return null;
    const bySlug = new Map(providers.map((provider) => [provider.slug, provider]));
    const selected = slugs.map((slug) => bySlug.get(slug));
    return selected.every((provider): provider is DiscoveryProvider => Boolean(provider)) ? selected : null;
  } catch {
    return null;
  }
}

export function PopularProviderDiscoveryClient({ providers, copy }: { providers: DiscoveryProvider[]; copy: DiscoveryCopy }) {
  const serverSelection = useMemo(() => providers.slice(0, 3), [providers]);
  const clientSelection = useRef<DiscoveryProvider[] | null>(null);
  const getClientSelection = useCallback(() => {
    if (clientSelection.current) return clientSelection.current;

    const stored = readSessionSelection(providers);
    const selected = stored ?? chooseThree(providers);
    clientSelection.current = selected;

    if (!stored) {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(selected.map((provider) => provider.slug)));
      } catch {
        // Private browsing or strict storage policies should not break the cards.
      }
    }

    return selected;
  }, [providers]);
  const visibleProviders = useSyncExternalStore(
    subscribeToSessionSelection,
    getClientSelection,
    () => serverSelection,
  );

  return (
    <ul className="grid gap-4 md:grid-cols-3" aria-label={copy.ariaLabel}>
      {providers.map((provider) => {
        const isVisible = visibleProviders.some((visibleProvider) => visibleProvider.slug === provider.slug);
        return (
        <li key={provider.slug} className={isVisible ? undefined : "hidden"} aria-hidden={!isVisible}>
          <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-base p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-[68px] shrink-0 items-center justify-center rounded-2xl border border-border bg-white shadow-sm">
                <VPNLogo slug={provider.logoSlug} size={52} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700">{copy.selectionLabel}</span>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-ink-strong">{provider.brand}</h3>
                <p className="mt-1 text-xs text-ink-subtle">{provider.positioning}</p>
              </div>
            </div>
            <p className="mt-5 line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-ink-muted">{provider.summary}</p>
            <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-border pt-4">
              <span className="text-base font-bold text-ink-strong">{provider.priceLabel}</span>
              <span className="text-xs text-ink-subtle">{copy.selectionLabel}</span>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild variant="primary" size="md" className="w-full">
                <ProviderLink
                  href={provider.officialHref}
                  rel={provider.officialRel}
                  target="_blank"
                  provider={provider.slug}
                  placement="homepage-discovery"
                >
                  {copy.official} <ArrowRight className="size-4" />
                </ProviderLink>
              </Button>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href={provider.profileHref}>{provider.profileLabel}</Link>
              </Button>
            </div>
          </article>
        </li>
        );
      })}
    </ul>
  );
}
