import type { DeviceContent } from "./devices";

const COMMON_RELATED = [
  { label: "Compare all VPNs", href: "/vpn-reviews" },
  { label: "Comparison methodology and sources", href: "/methodology" },
];

const DIFFICULTY = {
  easy: "Easy" as const,
  medium: "Medium" as const,
  advanced: "Advanced" as const,
};

export const devicesEn: DeviceContent[] = [
  {
    slug: "android",
    device: "Android phones and tablets",
    shortName: "Android",
    metaTitle: "Best VPN for Android (2026) — Phone & Tablet Guide",
    metaDescription:
      "Why you need a VPN on Android phones and tablets, how to set it up and which provider fits best. Kill switch, split tunneling and Play Store picks.",
    tagline:
      "Reduce network-level exposure on public Wi-Fi and limit how directly activity is tied to your IP — on Android, a VPN can be a useful privacy layer.",
    summary:
      "Android is the most widely used mobile OS in the world and also has the broadest VPN-client compatibility. One-click installs from the Play Store, support for WireGuard and OpenVPN, kill switch and per-app split tunneling have all matured in the major VPN providers over the years. The real question isn't which one you pick — it's whether you configure it correctly.",
    whyMatters: [
      "On public Wi-Fi (cafés, hotels, airports), data can leak from apps that don't use HTTPS — a VPN wraps that traffic.",
      "Google and app developers collect ad IDs and location data; a VPN alone can't stop that, but it severs the link with your IP.",
      "On mobile data, a VPN can reduce what your ISP learns from destination traffic, although connection timing, data volume and the VPN endpoint may remain visible.",
      "Some Android apps (especially free games and low-profile utilities) phone home to tracker networks in the background; with per-app tunneling you can send only the ones you choose through the VPN.",
    ],
    setupMethods: [
      {
        name: "Play Store app",
        difficulty: DIFFICULTY.easy,
        description:
          "Install the provider's official app from the Play Store, sign in with your account and connect with one tap. Android will prompt you to approve the VPN certificate; once you do, everything else is automatic.",
        whenToUse:
          "The right choice for most users. Auto-updates, kill switch and split tunneling are all managed from here.",
      },
      {
        name: "WireGuard / OpenVPN manual",
        difficulty: DIFFICULTY.medium,
        description:
          "Download a .conf file from the provider's panel and load it into the WireGuard or OpenVPN Connect app. You're in control — server choice, DNS, MTU values, all set by hand.",
        whenToUse:
          "If you're a developer or want to use providers like Mullvad/Proton with their official .conf files instead of their custom protocol.",
      },
      {
        name: "Router-level VPN",
        difficulty: DIFFICULTY.advanced,
        description:
          "When you put the VPN on the router, supported phone and tablet traffic can be routed through it without a per-device app. Coverage and per-device exclusions depend on the router configuration, so verify them on your own network.",
        whenToUse:
          "If you have a child's tablet, an older family member's phone or smart TVs that can't run a VPN app of their own.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "General use",
        why: "NordVPN's Android documentation lists kill switch, split tunneling, auto-connect and Threat Protection features. Availability can vary by app version; confirm the current feature list and test connection stability on your own carrier.",
      },
      {
        slug: "surfshark",
        bestFor: "Multi-device households",
        why: "Surfshark currently advertises unlimited simultaneous device connections and a CleanWeb filtering feature. Check the latest plan terms and confirm that each device and app version you use is supported.",
      },
      {
        slug: "expressvpn",
        bestFor: "Maximum location privacy",
        why: "ExpressVPN describes Lightway as designed for quick network changes. Reconnection time, leak protection and speed vary by phone, carrier and server; enable the kill switch and verify Wi-Fi-to-mobile handoffs on your own device.",
      },
    ],
    pitfalls: [
      {
        title: "Always enable the kill switch",
        body:
          "Android's system-level 'Always-on VPN' and 'Block connections without VPN' can complement a provider's in-app kill switch. Support and failure behaviour vary by app and Android version, so enable the available controls and verify them with a permitted leak test.",
      },
      {
        title: "Keep banking and government apps separate",
        body:
          "Some Turkish banking, e-Devlet and PTT apps will treat a foreign IP as a threat and may temporarily lock your account. Use split tunneling to keep these apps outside the VPN so the banking traffic exits via a Turkish IP while the rest goes through the VPN.",
      },
      {
        title: "Mind the battery",
        body:
          "Modern lightweight protocols such as WireGuard and Lightway may use less battery than OpenVPN, but the result depends on the app, signal quality and device. Compare battery use on your own phone before choosing a default.",
      },
    ],
    faqs: [
      {
        q: "Are the free VPN apps on the Play Store safe to use?",
        a: "Treat free VPN apps cautiously: a store listing alone does not establish safe data handling. Review the developer, privacy policy, permissions, business model and recent independent audit reports. Proton VPN publishes information about its free tier and audits, but verify the current scope and terms before relying on it.",
      },
      {
        q: "Some apps stop working when I enable the VPN on Android — what do I do?",
        a: "Two common causes: (1) the app blocks foreign IPs (Turkish banking, Trendyol Wallet, BluTV at times) — exclude those apps via split tunneling. (2) the app uses IPv6 and the VPN only handles IPv4 — turn on IPv6 leak protection or disable IPv6 in your provider's settings.",
      },
      {
        q: "Can I use the same app on Android TV?",
        a: "Several major providers publish Android TV apps, but store availability and device support can change. Check your TV's Play Store and the provider's current compatibility page before subscribing; see our Smart TV guide for alternative setup methods.",
      },
      {
        q: "Should I use WireGuard or OpenVPN?",
        a: "WireGuard is often a good first option because of its compact design and typical performance profile. On networks that restrict it, an obfuscated or TCP-based mode may help, but access is not guaranteed. Follow the network's rules and test the available protocols on your own connection.",
      },
      {
        q: "Does Android's built-in 'Private DNS' replace a VPN?",
        a: "No. Private DNS encrypts DNS lookups but is not a device-wide traffic tunnel. A VPN changes what the local network and ISP can observe, while shifting trust to the VPN provider; destination IPs and connection metadata can still be exposed in some conditions.",
      },
    ],
    relatedLinks: [
      { label: "VPN for iPhone", href: "/devices/iphone" },
      { label: "VPN for Smart TV", href: "/devices/smart-tv" },
      { label: "Best VPN in Turkey", href: "/best-vpn/turkey" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "iphone",
    device: "iPhone",
    shortName: "iPhone",
    metaTitle: "Best VPN for iPhone (2026) — iOS Setup & Recommendations",
    metaDescription:
      "Why you need a VPN on iPhone, App Store apps, conflicts with iCloud Private Relay and the best picks for everyday use.",
    tagline:
      "Apple's privacy features are not a device-wide VPN; a VPN can still reduce network-level exposure on an iPhone when it is configured and verified correctly.",
    summary:
      "Features like App Tracking Transparency and Mail Privacy Protection reduce some tracking signals, but they are not a device-wide VPN. A VPN can reduce network-level visibility on public Wi-Fi and at the ISP, while shifting trust to the VPN provider rather than eliminating metadata entirely.",
    whyMatters: [
      "iCloud Private Relay is not a general-purpose, device-wide VPN; check Apple's current documentation to understand which traffic it covers.",
      "Some App Store apps embed advertising SDKs that can use IP-derived location signals; a VPN can change the visible IP but does not stop SDK or account-based tracking.",
      "When you join public Wi-Fi, iOS services generate background traffic. A VPN can tunnel supported IP traffic, but it does not remove every form of connection metadata or app telemetry.",
      "Some banking and government apps block foreign IPs. Since iOS split tunneling is limited, the provider's 'trusted networks' / 'exclude apps' feature really matters.",
    ],
    setupMethods: [
      {
        name: "App Store app",
        difficulty: DIFFICULTY.easy,
        description:
          "Install the provider's official app from the App Store, open it and approve the VPN configuration prompt — the app handles the rest.",
        whenToUse:
          "Almost everyone. Settings also sync across your iPhone, iPad and Mac via iCloud this way.",
      },
      {
        name: "IKEv2 manual profile",
        difficulty: DIFFICULTY.medium,
        description:
          "iOS has built-in IKEv2 support; download a .mobileconfig file from the provider and install it via Settings > VPN. No app required, VPN at the system level.",
        whenToUse:
          "For managing several iOS devices with a single profile, or pushing it through MDM.",
      },
      {
        name: "Official WireGuard app",
        difficulty: DIFFICULTY.medium,
        description:
          "Load the provider's .conf into the official WireGuard app from the App Store. Battery-friendly, fast and open source.",
        whenToUse:
          "Useful with minimalist providers like Mullvad or when you want to manage several providers in one app.",
      },
    ],
    picks: [
      {
        slug: "expressvpn",
        bestFor: "The smoothest daily driver",
        why: "ExpressVPN documents Lightway support on iOS and currently lists an Apple TV app. Setup experience and reconnection time vary by device, network and app version, so test Wi-Fi-to-cellular handoffs and confirm current platform support.",
      },
      {
        slug: "proton-vpn",
        bestFor: "Privacy-first iPhone users",
        why: "Proton VPN publishes its iOS source code, audit material and free-plan terms. Check the latest audit scope and plan limits in the provider's official documentation before deciding whether those attributes match your privacy needs.",
      },
      {
        slug: "nordvpn",
        bestFor: "Streaming and a Turkish server",
        why: "NordVPN currently documents Turkish server access and iOS filtering features. Streaming compatibility changes as services update their controls, so verify each service on your own iPhone and network before subscribing.",
      },
    ],
    pitfalls: [
      {
        title: "Conflicts with iCloud Private Relay",
        body:
          "If you have iCloud+, Private Relay may be active. Using it alongside a VPN can affect routing, performance or site checks depending on the current iOS and provider implementation. Review Apple and provider guidance, then compare both settings on your own connection before disabling either feature.",
      },
      {
        title: "Turn on 'Connect On Demand'",
        body:
          "iOS's app kill switch isn't as aggressive as Android's. In the provider's settings, enable 'Connect On Demand' or 'Auto-connect on untrusted Wi-Fi' — the VPN comes up automatically when you join Wi-Fi, even if you forget to start it manually.",
      },
      {
        title: "In-app purchase vs. the provider's site",
        body:
          "App Store and provider-site prices, renewal terms, refunds and included features can differ. Compare the current checkout totals and terms in both places before buying; confirm that a website subscription can be used in the iOS app. (Our affiliate links go directly to the provider's site.)",
      },
    ],
    faqs: [
      {
        q: "Does the built-in iPhone VPN come from Apple?",
        a: "No. Settings > General > VPN & Device Management configures compatible third-party or managed VPN services. Apple's Private Relay is not a general-purpose, device-wide VPN; check Apple's current documentation for its traffic coverage.",
      },
      {
        q: "Can I trust the free VPN apps on the App Store?",
        a: "Be skeptical: App Store review does not independently verify every privacy claim. Check the developer, permissions, privacy policy, business model and recent audit reports. Proton VPN publishes audit and free-tier information, making it one option to assess rather than a universal guarantee.",
      },
      {
        q: "Will FaceTime or iMessage break when the VPN is on?",
        a: "Usually no, but Apple expects IP/location consistency during some sign-in steps. If FaceTime errors during registration, briefly turn the VPN off and try again; after activation, you can keep using it with the VPN on.",
      },
      {
        q: "Does the same subscription work on my iPad?",
        a: "Many providers offer iPadOS apps and allow the same account across devices, but app availability and connection limits vary. Confirm your provider's current device list and plan terms; our iPad guide covers iPad-specific settings.",
      },
      {
        q: "Do I need a separate VPN for Apple Watch?",
        a: "Apple Watch does not offer the same general VPN-app setup as iPhone, and its traffic path can vary with Wi-Fi, cellular and the paired phone. Check Apple and provider documentation for your model; do not assume every watch connection is covered solely because the iPhone VPN is active.",
      },
    ],
    relatedLinks: [
      { label: "VPN for iPad", href: "/devices/ipad" },
      { label: "VPN for Android", href: "/devices/android" },
      { label: "Best VPN for privacy", href: "/best-vpn/privacy" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "ipad",
    device: "iPad",
    shortName: "iPad",
    metaTitle: "Best VPN for iPad (2026) — Streaming & Productivity Guide",
    metaDescription:
      "Setting up a VPN on iPad, Stage Manager compatibility, the best providers for streaming and device-specific things to watch for.",
    tagline:
      "Bigger screen, more streaming, more public-network use — the iPad's attack surface isn't the same as the phone's.",
    summary:
      "How you use an iPad differs from an iPhone: you work from a café, watch a series on a plane, hand it to a kid for YouTube, pay a bill. With Stage Manager and Split View, you have 2-3 apps open at once. That usage profile changes what you need from a VPN — split tunneling, streaming compatibility and quiet background connectivity become the priorities.",
    whyMatters: [
      "A lot of iPad use happens on public Wi-Fi (café, library, university campus, hotel) — not as nomadic as a laptop, not as cellular as a phone; right in the middle.",
      "Streaming apps are a common iPad use case, but VPN speed and regional-library compatibility vary by service, server, location and account. Verify the services you use on your own network.",
      "On iPads kids use, an ad/tracker-blocking VPN layer reduces what the free App Store games can collect about them.",
      "Stage Manager means apps can run in several windows, so background tunnel behaviour matters. It varies by iPadOS and VPN app version; test multitasking and reconnection on your own iPad.",
    ],
    setupMethods: [
      {
        name: "App Store app",
        difficulty: DIFFICULTY.easy,
        description:
          "Install the provider's iPad app and sign in with an eligible account. Settings sync and background behaviour vary by provider and iPadOS version, so confirm both after setup.",
        whenToUse: "The default choice for everyone.",
      },
      {
        name: "Apple Configurator profile",
        difficulty: DIFFICULTY.advanced,
        description:
          "To manage several iPads with one profile, you can mass-install a .mobileconfig with Apple Configurator (on a Mac). Useful for schools and small businesses.",
        whenToUse:
          "When there are 3+ iPads in a family or small business — quicker than manual setup on each one.",
      },
      {
        name: "Router-level VPN",
        difficulty: DIFFICULTY.advanced,
        description:
          "Put the VPN on your home Wi-Fi router to route configured iPad traffic through the tunnel while it is on that network. Verify DNS, IPv6 and policy-routing behaviour; away from home, the iPad needs its own VPN setup.",
        whenToUse:
          "When an iPad stays at home and you want configured internet traffic routed through the VPN without per-device setup.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Streaming and regional libraries",
        why: "NordVPN documents iPadOS support, streaming-oriented features and Turkish server availability. Access can change by service, server, account region and network, so verify each required app on your own iPad before committing to a plan.",
      },
      {
        slug: "expressvpn",
        bestFor: "A premium iPad experience",
        why: "ExpressVPN currently documents apps for iPad, Mac and Apple TV plus its Lightway protocol. Device limits, 4K headroom and background behaviour depend on the current plan and connection, so confirm them with your own devices and network.",
      },
      {
        slug: "surfshark",
        bestFor: "Many devices on one account",
        why: "Surfshark currently advertises unlimited simultaneous connections, which may suit multi-device households. Compare current price, renewal terms, platform support and performance on your own network before judging value.",
      },
    ],
    pitfalls: [
      {
        title: "'Certificate not trusted' error",
        body:
          "Occasionally, after an iPadOS update, the VPN's installed certificate isn't trusted automatically. You'll need to step through Settings > VPN & Device Management > the provider's profile > 'Trust Certificate' manually. Without that, the connection appears to come up but the traffic doesn't actually flow through the VPN.",
      },
      {
        title: "VPN dropping when backgrounded in Split View",
        body:
          "Background connections can behave differently across iPadOS, app and protocol versions. WireGuard- or Lightway-based modes may improve handoffs, but do not guarantee them; test Split View, Stage Manager and sleep/wake behaviour with the kill switch enabled.",
      },
      {
        title: "Setting up VPN on a child profile",
        body:
          "On an iPad under Apple's Family Sharing as a child account, installing a VPN configuration requires adult approval. The child account can't add one on its own. Set it up from the family-organiser account first, then sign the child in.",
      },
    ],
    faqs: [
      {
        q: "Will Apple Pencil or my keyboard cause problems with the VPN on?",
        a: "No. A VPN only affects network traffic; it doesn't touch Bluetooth (Pencil, keyboard, mouse) or USB-C accessories.",
      },
      {
        q: "Does the VPN work the same way on cellular (eSIM)?",
        a: "A VPN can work over cellular, but handoffs among Wi-Fi, 5G and 4G may interrupt the tunnel. Auto-connect and supported always-on controls can reduce gaps; verify the behaviour and leak protection on your own iPad and carrier.",
      },
      {
        q: "Is plain Wi-Fi safe on my iPad without a VPN?",
        a: "HTTPS already protects much web content, while a VPN can reduce local-network visibility and some DNS exposure. It does not prevent phishing, malicious captive portals, unsafe apps or an untrusted VPN provider, so keep HTTPS and device updates in place and assess the network you use.",
      },
      {
        q: "Which VPN protocol should I pick on iPad?",
        a: "WireGuard or a provider's lightweight protocol is often a practical first choice; IKEv2 can be a useful fallback. OpenVPN may trade speed or battery life for compatibility, but results vary, so compare supported modes on your own iPad and network.",
      },
      {
        q: "My school's iPad Wi-Fi blocks the VPN, what do I do?",
        a: "Some school or campus networks restrict UDP or VPN traffic. A provider's obfuscation, stealth or TCP mode may help, but access is not guaranteed and attempting to bypass controls may violate network policy. Ask the administrator and test only where permitted.",
      },
    ],
    relatedLinks: [
      { label: "VPN for iPhone", href: "/devices/iphone" },
      { label: "Best VPN for streaming", href: "/best-vpn/streaming" },
      { label: "Best VPN for travel", href: "/best-vpn/travel" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "smart-tv",
    device: "Smart TV (Samsung, LG, Android TV, Apple TV)",
    shortName: "Smart TV",
    metaTitle: "Best VPN for Smart TV (2026) — Samsung, LG, Android TV, Apple TV",
    metaDescription:
      "How to install a VPN on Samsung Tizen and LG webOS, router-level VPN, Smart DNS, and a detailed guide for Android TV and Apple TV (tvOS 17+).",
    tagline:
      "Most smart TVs can't run a VPN app — the right answer is to put the VPN on the network, not the TV.",
    summary:
      "On smart TVs, the biggest hurdle is app availability: it varies by operating system, model, region and provider. Android TV/Google TV and tvOS support third-party VPN apps, while some Samsung Tizen and LG webOS models may need a router-level VPN or Smart DNS. Check the current TV app store and provider compatibility page first.",
    whyMatters: [
      "Published academic research has documented Automatic Content Recognition and smart-TV telemetry. A VPN can encrypt supported network traffic in transit but does not stop the TV from collecting or sending telemetry, so also review the device's privacy settings and current research.",
      "If an ISP applies service-specific traffic management, a VPN may change classification, but encryption overhead can also reduce speed. Compare baseline and VPN results on your own connection before drawing a conclusion.",
      "Streaming catalogues vary by region, and some services restrict VPN use. Compatibility changes frequently, so check current service terms and test the exact TV app, account and server you plan to use.",
      "A router-level VPN can tunnel traffic from configured household devices, but exclusions, IPv6, DNS and local-network traffic depend on the router setup and should be verified.",
    ],
    setupMethods: [
      {
        name: "Android TV / Google TV official app",
        difficulty: DIFFICULTY.easy,
        description:
          "Install a provider's official Android TV app from the Play Store when it is available for your model and region. Check the current store listing and provider compatibility page because TV features can differ from the phone app.",
        whenToUse:
          "Easiest path if your TV runs Android TV (NVIDIA Shield, Xiaomi Mi Box, TCL/Sony, Chromecast with Google TV, etc.).",
      },
      {
        name: "Apple TV tvOS app (tvOS 17+)",
        difficulty: DIFFICULTY.easy,
        description:
          "Apple added third-party VPN-app support in tvOS 17, and several providers publish tvOS apps. Check the provider's current App Store listing and Apple's compatibility information for your exact Apple TV model.",
        whenToUse: "If your Apple TV model runs a supported tvOS version and the provider app is available in your region.",
      },
      {
        name: "Router-level VPN (covers everything)",
        difficulty: DIFFICULTY.advanced,
        description:
          "Install a supported VPN client on your Wi-Fi router. Devices routed through that client can use the tunnel, but guest networks, IPv6, DNS and policy-based exclusions may behave differently; verify coverage on each device.",
        whenToUse:
          "If your Samsung or LG TV store has no compatible VPN app, a supported router setup is one alternative; confirm current app availability and router compatibility first.",
      },
      {
        name: "Smart DNS (no VPN encryption)",
        difficulty: DIFFICULTY.medium,
        description:
          "Some providers document Smart DNS services for compatible TVs. These change DNS routing without encrypting traffic or hiding the public IP, and neither regional access nor unchanged speed is guaranteed. Check current service support and test the TV app you use.",
        whenToUse:
          "When a currently supported regional-content feature is the goal and you understand that Smart DNS does not provide VPN privacy.",
      },
    ],
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Apple TV and router users",
        why: "ExpressVPN currently documents a tvOS app, Aircove router options and MediaStreamer Smart DNS. Confirm model support, setup requirements and current streaming compatibility on your own TV and network.",
      },
      {
        slug: "nordvpn",
        bestFor: "Android TV streaming",
        why: "NordVPN publishes Android TV, SmartPlay and router setup documentation. Feature availability and streaming access can change, so check the current plan details and test the exact TV app and network you use.",
      },
      {
        slug: "surfshark",
        bestFor: "Budget + Smart DNS",
        why: "Surfshark currently advertises Smart DNS, an Android TV app and unlimited simultaneous connections. Verify current plan inclusion, device compatibility and setup behaviour before purchase.",
      },
    ],
    pitfalls: [
      {
        title: "Smart DNS isn't privacy — it just unlocks regions",
        body:
          "Smart DNS isn't a VPN: it does not encrypt the connection or hide the public IP. DNS routing may affect how a supported service determines region, but compatibility can change and it should not be presented as a privacy tool.",
      },
      {
        title: "Router-routed devices may share one VPN IP",
        body:
          "Devices routed through the same VPN server may share its public IP, which can trigger extra verification in some banking apps. Use policy-based routing where supported, or exclude the banking device after checking your router and bank guidance.",
      },
      {
        title: "Smart-home traffic can clash with the VPN",
        body:
          "Services like Samsung SmartThings, LG ThinQ and Google Home expect the TV on its local IP — they'll sometimes refuse connections from a foreign IP. If that happens, set up split tunneling on the router: smart-home traffic stays local, streaming goes over the VPN.",
      },
    ],
    faqs: [
      {
        q: "Can I install a VPN directly on a Samsung or LG TV?",
        a: "Direct VPN-app availability on Samsung Tizen and LG webOS is limited and can change by model or region. Check the TV's current app store first; alternatives include a compatible router, Smart DNS without VPN encryption, or a supported streaming device connected by HDMI.",
      },
      {
        q: "Which VPNs can I install on an Apple TV?",
        a: "Several providers publish tvOS apps, but the list, regional availability and model requirements change. Check your Apple TV's App Store, the provider's compatibility page and Apple's supported-tvOS list before choosing a setup.",
      },
      {
        q: "Does putting a VPN on the router void warranty or hurt performance?",
        a: "Third-party firmware can risk device failure or affect warranty coverage, so check the manufacturer's terms before flashing. VPN encryption also adds CPU load, but the speed impact varies widely by router, protocol and connection. Benchmark your own setup or choose hardware with documented VPN throughput.",
      },
      {
        q: "Netflix on the TV still blocks the VPN — what now?",
        a: "Streaming services can block or limit known VPN endpoints. Check the service's current terms and provider support page, then try a provider-recommended server or contact support. A result on one server or day does not guarantee future access.",
      },
      {
        q: "Do I need a different method for Chromecast?",
        a: "On the old (non-Google-TV) Chromecast, you can't install a VPN — no Android TV app. The workarounds are: (1) cast from a phone that runs the VPN (the TV receives raw content, the phone's traffic is wrapped — but the TV's own telemetry isn't), or (2) router-level VPN. Newer Chromecast with Google TV models support the Android TV apps directly.",
      },
    ],
    relatedLinks: [
      { label: "Best VPN for streaming", href: "/best-vpn/streaming" },
      { label: "VPN for Android", href: "/devices/android" },
      { label: "VPN for Turks abroad", href: "/best-vpn/turks-abroad" },
      ...COMMON_RELATED,
    ],
  },
];
