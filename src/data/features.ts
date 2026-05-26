/**
 * Boolean feature matrix per VPN — used by the /sunucu-haritasi filter tool.
 * Hand-curated from review research; update when audits or features change.
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
    openSource: true,
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
    unlimitedDevices: false,
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

export const FILTER_LABELS: Record<FilterKey, { label: string; help?: string }> = {
  turkeyServer: {
    label: "Türkiye sunucusu",
    help: "BluTV, Exxen, Türk bankacılığı için.",
  },
  unlimitedDevices: {
    label: "Sınırsız cihaz",
    help: "Tüm aile veya çok cihaz.",
  },
  openSource: {
    label: "Açık kaynak istemci",
    help: "Bağımsız olarak denetlenebilir kod.",
  },
  audited: {
    label: "Bağımsız denetim",
    help: "Deloitte, Cure53 vb. üçüncü taraf doğrulama.",
  },
  portForwarding: {
    label: "Port forwarding",
    help: "P2P, oyun sunucusu, BitTorrent seeding.",
  },
  multiHop: {
    label: "Multi-hop",
    help: "İki sunucudan ardışık geçiş — maks. gizlilik.",
  },
  obfuscation: {
    label: "Obfuscation",
    help: "Çin, BAE gibi kısıtlayıcı ülkelerde VPN gizleme.",
  },
  freeTier: {
    label: "Ücretsiz plan",
    help: "Para vermeden sınırlı kullanım.",
  },
  fiveEyesFree: {
    label: "5/9/14 Eyes dışı",
    help: "İstihbarat ittifakı dışı yargı yetkisi.",
  },
  p2p: {
    label: "P2P / Torrent",
    help: "BitTorrent ve P2P trafiğine izin verilir.",
  },
};
