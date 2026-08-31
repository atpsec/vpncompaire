/**
 * Boolean feature matrix per VPN — used by the /server-map filter tool.
 * Hand-curated from documented provider information; update when sources or
 * feature records change.
 */
export const featureMatrix: Record<string, FeatureFlags> = {
  nordvpn: {
    turkeyServer: true,
    unlimitedDevices: false,
    openSource: false,
    audited: true,
    portForwarding: false,
    multiHop: true,
    obfuscation: true,
    freeTier: false,
    fiveEyesFree: true,
    p2p: true,
  },
  surfshark: {
    turkeyServer: true,
    unlimitedDevices: true,
    openSource: false,
    audited: true,
    portForwarding: false,
    multiHop: true,
    obfuscation: true,
    freeTier: false,
    fiveEyesFree: true,
    p2p: true,
  },
  expressvpn: {
    turkeyServer: true,
    unlimitedDevices: false,
    // Only the Lightway protocol library is open source; the client app is not.
    // The "open-source client" filter should therefore read false.
    openSource: false,
    audited: true,
    portForwarding: false,
    multiHop: false,
    obfuscation: true,
    freeTier: false,
    fiveEyesFree: true,
    p2p: true,
  },
  "proton-vpn": {
    turkeyServer: false,
    unlimitedDevices: false,
    openSource: true,
    audited: true,
    portForwarding: true,
    multiHop: true,
    obfuscation: true,
    freeTier: true,
    fiveEyesFree: true,
    p2p: true,
  },
  pia: {
    turkeyServer: true,
    unlimitedDevices: true,
    openSource: true,
    audited: true,
    portForwarding: true,
    multiHop: true,
    obfuscation: true,
    freeTier: false,
    fiveEyesFree: false,
    p2p: true,
  },
  cyberghost: {
    turkeyServer: true,
    unlimitedDevices: false,
    openSource: false,
    audited: true,
    portForwarding: false,
    multiHop: false,
    obfuscation: false,
    freeTier: false,
    fiveEyesFree: true,
    p2p: true,
  },
  mullvad: {
    turkeyServer: false,
    unlimitedDevices: false,
    openSource: true,
    audited: true,
    portForwarding: false,
    multiHop: true,
    obfuscation: true,
    freeTier: false,
    fiveEyesFree: true,
    p2p: true,
  },
  ipvanish: {
    turkeyServer: true,
    unlimitedDevices: true,
    openSource: false,
    audited: true,
    portForwarding: false,
    multiHop: false,
    obfuscation: true,
    freeTier: false,
    fiveEyesFree: false,
    p2p: true,
  },
  windscribe: {
    turkeyServer: false,
    unlimitedDevices: true,
    openSource: true,
    audited: false,
    portForwarding: true,
    multiHop: true,
    obfuscation: true,
    freeTier: true,
    fiveEyesFree: false,
    p2p: true,
  },
  tunnelbear: {
    turkeyServer: false,
    unlimitedDevices: true,
    openSource: false,
    audited: true,
    portForwarding: false,
    multiHop: false,
    obfuscation: false,
    freeTier: true,
    fiveEyesFree: false,
    p2p: false,
  },
};

export type FeatureFlags = {
  turkeyServer: boolean;
  unlimitedDevices: boolean;
  openSource: boolean;
  audited: boolean;
  portForwarding: boolean;
  multiHop: boolean;
  obfuscation: boolean;
  freeTier: boolean;
  /** True if jurisdiction is OUTSIDE Five/Nine/Fourteen Eyes */
  fiveEyesFree: boolean;
  p2p: boolean;
};

export type FilterKey = keyof FeatureFlags;

import type { Locale, Localized } from "@/i18n/pick";

type FilterLabel = { label: Localized<string>; help?: Localized<string> };

const RAW_FILTER_LABELS: Record<FilterKey, FilterLabel> = {
  turkeyServer: {
    label: { tr: "Türkiye sunucusu", en: "Turkey server" },
    help: {
      tr: "BluTV, Exxen, Türk bankacılığı için.",
      en: "For BluTV, Exxen and Turkish banking.",
    },
  },
  unlimitedDevices: {
    label: { tr: "Sınırsız cihaz", en: "Unlimited devices" },
    help: {
      tr: "Tüm aile veya çok cihaz.",
      en: "For the whole household or many devices.",
    },
  },
  openSource: {
    label: { tr: "Açık kaynak istemci", en: "Open-source client" },
    help: {
      tr: "Bağımsız olarak denetlenebilir kod.",
      en: "Code that can be independently audited.",
    },
  },
  audited: {
    label: { tr: "Bağımsız denetim", en: "Independent audit" },
    help: {
      tr: "Deloitte, Cure53 vb. üçüncü taraf doğrulama.",
      en: "Third-party verification (Deloitte, Cure53, etc.).",
    },
  },
  portForwarding: {
    label: { tr: "Port forwarding", en: "Port forwarding" },
    help: {
      tr: "P2P, oyun sunucusu, BitTorrent seeding.",
      en: "P2P, game-server hosting, BitTorrent seeding.",
    },
  },
  multiHop: {
    label: { tr: "Multi-hop", en: "Multi-hop" },
    help: {
      tr: "İki sunucudan ardışık geçiş — maks. gizlilik.",
      en: "Two hops in sequence — maximum privacy.",
    },
  },
  obfuscation: {
    label: { tr: "Obfuscation", en: "Obfuscation" },
    help: {
      tr: "Çin, BAE gibi kısıtlayıcı ülkelerde VPN gizleme.",
      en: "Hides VPN traffic in restrictive countries like China and UAE.",
    },
  },
  freeTier: {
    label: { tr: "Ücretsiz plan", en: "Free plan" },
    help: {
      tr: "Para vermeden sınırlı kullanım.",
      en: "Limited use without paying.",
    },
  },
  fiveEyesFree: {
    label: { tr: "5/9/14 Eyes dışı", en: "Outside 5/9/14 Eyes" },
    help: {
      tr: "İstihbarat ittifakı dışı yargı yetkisi.",
      en: "Jurisdiction outside the intelligence alliances.",
    },
  },
  p2p: {
    label: { tr: "P2P / Torrent", en: "P2P / Torrent" },
    help: {
      tr: "BitTorrent ve P2P trafiğine izin verilir.",
      en: "BitTorrent and P2P traffic is allowed.",
    },
  },
};

function pick(field: Localized<string>, locale: Locale): string {
  return field[locale] ?? field.en ?? field.tr;
}

export function getFilterLabels(
  locale: Locale = "tr",
): Record<FilterKey, { label: string; help?: string }> {
  const out = {} as Record<FilterKey, { label: string; help?: string }>;
  for (const key of Object.keys(RAW_FILTER_LABELS) as FilterKey[]) {
    const raw = RAW_FILTER_LABELS[key];
    out[key] = {
      label: pick(raw.label, locale),
      help: raw.help ? pick(raw.help, locale) : undefined,
    };
  }
  return out;
}

// Backward-compat (TR)
export const FILTER_LABELS: Record<FilterKey, { label: string; help?: string }> =
  getFilterLabels("tr");
