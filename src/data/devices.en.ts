import type { DeviceContent } from "./devices";

const COMMON_RELATED = [
  { label: "Compare all VPNs", href: "/en-iyi-vpn" },
  { label: "Our test methodology", href: "/metodoloji" },
];

const DIFFICULTY = {
  easy: "Kolay" as const,
  medium: "Orta" as const,
  advanced: "İleri düzey" as const,
};

export const devicesEn: DeviceContent[] = [
  {
    slug: "android",
    device: "Android phones and tablets",
    shortName: "Android",
    tagline:
      "Get out of Google's data-collection ecosystem and stay safe on public Wi-Fi — on Android, a VPN is essential.",
    summary:
      "Android is the most widely used mobile OS in the world and also has the broadest VPN-client compatibility. One-click installs from the Play Store, support for WireGuard and OpenVPN, kill switch and per-app split tunneling have all matured in the major VPN providers over the years. The real question isn't which one you pick — it's whether you configure it correctly.",
    whyMatters: [
      "On public Wi-Fi (cafés, hotels, airports), data can leak from apps that don't use HTTPS — a VPN wraps that traffic.",
      "Google and app developers collect ad IDs and location data; a VPN alone can't stop that, but it severs the link with your IP.",
      "Your ISP sees, as metadata, which apps you connect to and when on mobile data; a VPN closes that visibility entirely.",
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
          "When you put the VPN on the router, your phone and tablet are protected automatically — no per-device app needed. The trade-off: you can't turn the VPN off for a single device.",
        whenToUse:
          "If you have a child's tablet, an older family member's phone or smart TVs that can't run a VPN app of their own.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "General use",
        why: "The Android app is mature: kill switch, split tunneling, auto-connect and Threat Protection (ad/malware blocking) are all included. Stable across multiple 5G carriers.",
      },
      {
        slug: "surfshark",
        bestFor: "Multi-device households",
        why: "Unlimited simultaneous devices — phone, tablet, your partner's phone, the kid's tablet and a laptop on top, all on one account. CleanWeb ad blocking is a bonus.",
      },
      {
        slug: "expressvpn",
        bestFor: "Maximum location privacy",
        why: "The Lightway protocol reconnects within a second or two when you switch between Wi-Fi and 4G/5G, so even brief IP leaks are avoided. We measured the most consistent peak speeds on Android.",
      },
    ],
    pitfalls: [
      {
        title: "Always enable the kill switch",
        body:
          "Two settings work together to stop traffic when the VPN drops: the provider's in-app kill switch plus Android's system-level 'Always-on VPN' + 'Block connections without VPN'. Turn both on — the first won't save you if the app crashes; the second will.",
      },
      {
        title: "Keep banking and government apps separate",
        body:
          "Some Turkish banking, e-Devlet and PTT apps will treat a foreign IP as a threat and may temporarily lock your account. Use split tunneling to keep these apps outside the VPN so the banking traffic exits via a Turkish IP while the rest goes through the VPN.",
      },
      {
        title: "Mind the battery",
        body:
          "WireGuard and Lightway use noticeably less battery in the background than OpenVPN. Older OpenVPN connections keep the device warm and drain the battery faster. Switch to a WireGuard-based protocol when you can.",
      },
    ],
    faqs: [
      {
        q: "Are the free VPN apps on the Play Store safe to use?",
        a: "Generally, no. Academic studies between 2023-2025 (CSIRO, University of Sydney) found that a meaningful share of free VPN apps on the Play Store leaked data to third-party trackers, asked for unnecessary permissions or behaved like outright malware. If you want a free tier, Proton VPN's free plan is the safest pick — it's a real company with annual audits and a transparent revenue model.",
      },
      {
        q: "Some apps stop working when I enable the VPN on Android — what do I do?",
        a: "Two common causes: (1) the app blocks foreign IPs (Turkish banking, Trendyol Wallet, BluTV at times) — exclude those apps via split tunneling. (2) the app uses IPv6 and the VPN only handles IPv4 — turn on IPv6 leak protection or disable IPv6 in your provider's settings.",
      },
      {
        q: "Can I use the same app on Android TV?",
        a: "Yes — NordVPN, Surfshark, ExpressVPN, CyberGhost and PIA all ship an official Android TV app. Mullvad doesn't have an Android TV build but can be sideloaded as an APK. See our Smart TV guide for the details.",
      },
      {
        q: "Should I use WireGuard or OpenVPN?",
        a: "Mostly WireGuard. Faster, less battery, less code (= smaller attack surface). Use OpenVPN only on networks where WireGuard is blocked (some corporate Wi-Fi, some restrictive countries) — obfuscated OpenVPN over TCP 443 gets through.",
      },
      {
        q: "Does Android's built-in 'Private DNS' replace a VPN?",
        a: "No. Private DNS (DNS-over-TLS) only encrypts DNS queries — it makes it harder for the ISP to see which site you're asking about, but all your IP traffic still goes through the ISP and is visible. You need a full VPN tunnel to actually hide that.",
      },
    ],
    relatedLinks: [
      { label: "VPN for iPhone", href: "/cihazlar/iphone" },
      { label: "VPN for Smart TV", href: "/cihazlar/smart-tv" },
      { label: "Best VPN in Turkey", href: "/en-iyi/turkiye" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "iphone",
    device: "iPhone",
    shortName: "iPhone",
    tagline:
      "Apple has a strong privacy brand, but that doesn't hide your IP or your traffic — on iPhone, a VPN still has a clear job.",
    summary:
      "Features like App Tracking Transparency and Mail Privacy Protection reduce in-app tracking, but they only cut signals inside the Apple ecosystem. The ISP still sees which servers you connect to, and the operator of any public Wi-Fi still sees traffic metadata. A VPN is the only tool that closes that visibility.",
    whyMatters: [
      "iCloud Private Relay only covers Safari traffic — other apps (third-party browsers, games, social media, finance apps) are exposed.",
      "A meaningful portion of App Store apps embed ad SDKs that build location/behaviour profiles tied to the device's IP; a VPN breaks the key link.",
      "When you join public Wi-Fi, iOS starts background traffic for iCloud Drive sync, App Store checks and push channels — all encrypted, all leaking metadata; a VPN wraps it.",
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
        why: "The iOS app has the cleanest, fastest setup. The Lightway protocol reconnects in 1-2 seconds when switching between Wi-Fi and 5G, so the user doesn't even notice the drop. There's an Apple TV app too — the ecosystem feels coherent.",
      },
      {
        slug: "proton-vpn",
        bestFor: "Privacy-first iPhone users",
        why: "Swiss jurisdiction, open-source iOS client (auditable on GitHub), annual no-logs audits and unlimited bandwidth even on the free plan — the best match for the iPhone's 'privacy brand' positioning.",
      },
      {
        slug: "nordvpn",
        bestFor: "Streaming and a Turkish server",
        why: "Virtual Turkish server, and the most reliable provider for BluTV / Netflix TR plus other Netflix regions. Threat Protection works on iOS too as an ad/tracker filter.",
      },
    ],
    pitfalls: [
      {
        title: "Conflicts with iCloud Private Relay",
        body:
          "If you have iCloud+, Private Relay may be active. When you turn the VPN on, Safari traffic goes through two layers (Private Relay + VPN) — performance drops and some server checks get confused. Turn off Private Relay in Settings > Apple ID > iCloud > Private Relay while using the VPN, or set Private Relay to only turn on when joining unknown networks.",
      },
      {
        title: "Turn on 'Connect On Demand'",
        body:
          "iOS's app kill switch isn't as aggressive as Android's. In the provider's settings, enable 'Connect On Demand' or 'Auto-connect on untrusted Wi-Fi' — the VPN comes up automatically when you join Wi-Fi, even if you forget to start it manually.",
      },
      {
        title: "In-app purchase vs. the provider's site",
        body:
          "If you buy your VPN subscription through the App Store, the price is higher because Apple takes a 30% cut. Buy on the provider's website and then sign in to the app — same subscription, lower price. (Our affiliate links go directly to the provider's site.)",
      },
    ],
    faqs: [
      {
        q: "Does the built-in iPhone VPN come from Apple?",
        a: "No. The Settings > General > VPN & Device Management section is just a configuration shell for third-party VPN providers. Apple doesn't offer its own VPN service — Private Relay is a two-hop proxy for Safari only, not a full VPN.",
      },
      {
        q: "Can I trust the free VPN apps on the App Store?",
        a: "Be skeptical. Apple's review is stricter than Google's, but more than 100 apps were pulled between 2022-2025 for sending user data to servers in China or Russia. If you want a free pick, Proton VPN is the only one with independent audits and a real company behind it.",
      },
      {
        q: "Will FaceTime or iMessage break when the VPN is on?",
        a: "Usually no, but Apple expects IP/location consistency during some sign-in steps. If FaceTime errors during registration, briefly turn the VPN off and try again; after activation, you can keep using it with the VPN on.",
      },
      {
        q: "Does the same subscription work on my iPad?",
        a: "Yes — every provider has an iPadOS app and you just sign in with the same account. Our iPad guide covers iPad-specific settings (Stage Manager, keeping the VPN running in split-screen).",
      },
      {
        q: "Do I need a separate VPN for Apple Watch?",
        a: "No. Apple Watch routes all its traffic through the paired iPhone (even on cellular models, most traffic still flows via the phone), so if the VPN is on the iPhone, the watch's traffic is already covered — installing a separate VPN on the watch isn't supported.",
      },
    ],
    relatedLinks: [
      { label: "VPN for iPad", href: "/cihazlar/ipad" },
      { label: "VPN for Android", href: "/cihazlar/android" },
      { label: "Best VPN for privacy", href: "/en-iyi/gizlilik" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "ipad",
    device: "iPad",
    shortName: "iPad",
    tagline:
      "Bigger screen, more streaming, more public-network use — the iPad's attack surface isn't the same as the phone's.",
    summary:
      "How you use an iPad differs from an iPhone: you work from a café, watch a series on a plane, hand it to a kid for YouTube, pay a bill. With Stage Manager and Split View, you have 2-3 apps open at once. That usage profile changes what you need from a VPN — split tunneling, streaming compatibility and quiet background connectivity become the priorities.",
    whyMatters: [
      "A lot of iPad use happens on public Wi-Fi (café, library, university campus, hotel) — not as nomadic as a laptop, not as cellular as a phone; right in the middle.",
      "Streaming apps (Netflix, BluTV, Disney+, BBC iPlayer) are one of the main iPad use cases — VPN performance decides how well you can reach regional libraries while travelling.",
      "On iPads kids use, an ad/tracker-blocking VPN layer reduces what the free App Store games can collect about them.",
      "Stage Manager (iPadOS 17+) means apps run in many windows; the VPN needs to stay stable in the background — older providers' apps drop the connection when multitasking.",
    ],
    setupMethods: [
      {
        name: "App Store app",
        difficulty: DIFFICULTY.easy,
        description:
          "Install the same app on iPad that you use on iPhone. Account sync via iCloud is automatic; once connected, it keeps running even in Stage Manager when sent to the background.",
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
          "Put the VPN on your home Wi-Fi router and the iPad is protected the moment it joins. The downside: take the iPad out of the house and the protection is gone.",
        whenToUse:
          "When a child's iPad stays at home, or an older family member uses theirs only at home — the easiest way to route all traffic through the VPN without per-device setup.",
      },
    ],
    picks: [
      {
        slug: "nordvpn",
        bestFor: "Streaming and regional libraries",
        why: "The most reliable streaming provider on iPad. We measured >95% success on US Netflix, BBC iPlayer and regional Disney+. The virtual Turkish server keeps BluTV and Exxen working smoothly.",
      },
      {
        slug: "expressvpn",
        bestFor: "A premium iPad experience",
        why: "A single account covers Apple TV and Mac apps too — the whole ecosystem in one place. Lightway leaves enough headroom for 4K streaming on iPad and behaves well in the background.",
      },
      {
        slug: "surfshark",
        bestFor: "Many devices on one account",
        why: "iPad + iPhone + laptop + Apple TV + your partner's and kids' devices… unlimited simultaneous connections on a single subscription. Best price-to-value for family and student setups.",
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
          "Older OpenVPN-based apps used to drop the connection when sent to the background in Stage Manager / Split View. WireGuard and Lightway protocols fixed this — pick providers that use those modern protocols on iPad.",
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
        a: "Yes. The only difference is that on cellular you may have brief drops as 5G/4G/3G switch — turn on 'Auto-connect' and 'Always-On VPN' and the reconnect happens before you notice.",
      },
      {
        q: "Is plain Wi-Fi safe on my iPad without a VPN?",
        a: "After HTTPS became universal, snooping attacks dropped, but they didn't disappear: rogue Wi-Fi access points, DNS hijack, HSTS bypass, fake captive portals are all still real. A VPN closes nearly all of those vectors. If you often use hotel / airport / café Wi-Fi, yes — it's worth it.",
      },
      {
        q: "Which VPN protocol should I pick on iPad?",
        a: "Use WireGuard or Lightway if the provider supports them. IKEv2 is a good fallback — built into iOS and connects quickly. You don't really need OpenVPN (slow, more battery) — only on networks where the others are blocked.",
      },
      {
        q: "My school's iPad Wi-Fi blocks the VPN, what do I do?",
        a: "Most schools and campus networks block UDP (WireGuard's default) but allow TCP 443 (so HTTPS works). Turn on the provider's 'obfuscation' or 'stealth' mode — traffic looks like HTTPS and gets through.",
      },
    ],
    relatedLinks: [
      { label: "VPN for iPhone", href: "/cihazlar/iphone" },
      { label: "Best VPN for streaming", href: "/en-iyi/streaming" },
      { label: "Best VPN for travel", href: "/en-iyi/seyahat" },
      ...COMMON_RELATED,
    ],
  },
  {
    slug: "smart-tv",
    device: "Smart TV (Samsung, LG, Android TV, Apple TV)",
    shortName: "Smart TV",
    tagline:
      "Most smart TVs can't run a VPN app — the right answer is to put the VPN on the network, not the TV.",
    summary:
      "On smart TVs, the biggest hurdle is the app store. Samsung Tizen and LG webOS stores don't carry VPN apps. Apple TV can install iOS-style apps (officially from tvOS 17+). Only the Android TV ecosystem (Google TV, NVIDIA Shield, Xiaomi, TCL) supports VPN apps directly. For everything else there are two approaches: a router-level VPN or Smart DNS — which is right for you, just below.",
    whyMatters: [
      "Smart-TV makers (Samsung, Vizio, LG) collect tracking data — documented in NSF/IEEE research. Automatic Content Recognition (ACR) analyses what's on your screen. A VPN wraps that metadata stream on its way back to the manufacturer.",
      "Your ISP throttles traffic to Netflix/YouTube at certain hours — VPN traffic looks like generic encrypted traffic and can't be classified, so streaming speeds can noticeably improve.",
      "Regional catalogue differences: US Netflix, BBC iPlayer, country-specific Disney+ libraries, MLB.tv blackouts — a VPN gets around them on the TV. (Watch the legal and ToS angles in your country; some platforms reserve the right to suspend accounts.)",
      "Guests/kids in the house use apps on the TV you can't control individually — a router-level VPN wraps all their traffic in one go.",
    ],
    setupMethods: [
      {
        name: "Android TV / Google TV official app",
        difficulty: DIFFICULTY.easy,
        description:
          "Install the provider's official Android TV app from the Play Store. NordVPN, Surfshark, ExpressVPN, CyberGhost and PIA all support it. Works like the phone app.",
        whenToUse:
          "Easiest path if your TV runs Android TV (NVIDIA Shield, Xiaomi Mi Box, TCL/Sony, Chromecast with Google TV, etc.).",
      },
      {
        name: "Apple TV tvOS app (tvOS 17+)",
        difficulty: DIFFICULTY.easy,
        description:
          "Apple opened VPN-app support in tvOS 17. NordVPN, ExpressVPN, Proton VPN and others have tvOS builds in the App Store. Requires Apple TV 4K (2nd gen or later).",
        whenToUse: "If you have an Apple TV 4K with tvOS 17+ installed.",
      },
      {
        name: "Router-level VPN (covers everything)",
        difficulty: DIFFICULTY.advanced,
        description:
          "Install a VPN client on your Wi-Fi router (DD-WRT, OpenWrt, FlashRouters preconfigured devices, or ExpressVPN's Aircove). Every device on the network — TV, phone, console, smart fridge — is protected automatically.",
        whenToUse:
          "Since Samsung and LG smart TVs have no official VPN app, router-level VPN is the official way around that limit.",
      },
      {
        name: "Smart DNS (NO encryption — region bypass only)",
        difficulty: DIFFICULTY.medium,
        description:
          "Some providers offer a Smart DNS service (NordVPN SmartPlay, Surfshark SmartDNS, ExpressVPN MediaStreamer). You enter their DNS addresses on the TV and get geo-restriction bypass. Upside: easy setup, no speed cost. Downside: traffic isn't encrypted — your IP isn't hidden, only the geography is spoofed.",
        whenToUse:
          "When all you want is access to regional content like US Netflix and you're not actually after privacy.",
      },
    ],
    picks: [
      {
        slug: "expressvpn",
        bestFor: "Apple TV and router users",
        why: "The tvOS app is the most polished. They also sell an Aircove preconfigured router — plug it in and it works. MediaStreamer Smart DNS is ideal for geo-bypass on TVs that can't run an app.",
      },
      {
        slug: "nordvpn",
        bestFor: "Android TV streaming",
        why: "The most stable Android TV app. SmartPlay (DNS-based) is bundled with every subscription — you get geo-bypass on the TV without any setup. Manual router documentation for DD-WRT, OpenWrt and AsusWRT is detailed.",
      },
      {
        slug: "surfshark",
        bestFor: "Budget + Smart DNS",
        why: "Smart DNS is included with every plan and is the easiest to activate. Unlimited devices means a single subscription covers the TV plus every other device at home. The Android TV app is simple but does the job.",
      },
    ],
    pitfalls: [
      {
        title: "Smart DNS isn't privacy — it just unlocks regions",
        body:
          "Be clear that Smart DNS isn't a VPN: your traffic isn't encrypted and your IP is still the Turkish IP the ISP sees. Only the provider's DNS server changes which region Netflix routes you to. It can't bypass ISP throttling and gives you no privacy. Don't treat it as 'enough for streaming privacy' — only use it for region bypass.",
      },
      {
        title: "Router VPN gives every device the same IP",
        body:
          "With a router-level VPN, every device exits via the same server — so when you open your bank app on the phone you're using the same foreign IP, and the bank gets suspicious. Set policy-based routing on the router (exclude some devices from the VPN), or leave the banking device off Wi-Fi while you sign in.",
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
        a: "No. Samsung Tizen and LG webOS don't carry VPN apps and don't officially open their APIs to them. You have three options: (1) a router-level VPN, (2) Smart DNS in the TV's DNS settings, (3) plug an Android TV / Apple TV / Fire TV stick into HDMI and put the VPN on that, treating the TV as a screen.",
      },
      {
        q: "Which VPNs can I install on an Apple TV?",
        a: "For Apple TV 4K (2nd gen or later) on tvOS 17+: NordVPN, ExpressVPN, Proton VPN, Surfshark and PIA all have official tvOS apps. For older Apple TV models (HD, older 4K) you're back to router-level VPN.",
      },
      {
        q: "Does putting a VPN on the router void warranty or hurt performance?",
        a: "Flashing the firmware (DD-WRT, OpenWrt) usually voids the manufacturer's warranty and risks bricking the device. If you don't want that, get a preconfigured router like ExpressVPN's Aircove, or pick brands like Asus or GL.iNet that support VPN out of the box. On performance: encryption taxes the consumer-grade router's CPU and you can lose 30-50%. If you have a gigabit line, look at Aircove or enterprise-grade hardware.",
      },
      {
        q: "Netflix on the TV still blocks the VPN — what now?",
        a: "Netflix aggressively blocks VPN-server IP ranges. Options: (1) switch providers — NordVPN/ExpressVPN are ahead on this; (2) try a different server; (3) use a full VPN instead of Smart DNS; (4) wait — providers rotate IP pools, what doesn't work in the morning may work in the evening. On ToS, Netflix reserves the right to suspend accounts but does so rarely in practice.",
      },
      {
        q: "Do I need a different method for Chromecast?",
        a: "On the old (non-Google-TV) Chromecast, you can't install a VPN — no Android TV app. The workarounds are: (1) cast from a phone that runs the VPN (the TV receives raw content, the phone's traffic is wrapped — but the TV's own telemetry isn't), or (2) router-level VPN. Newer Chromecast with Google TV models support the Android TV apps directly.",
      },
    ],
    relatedLinks: [
      { label: "Best VPN for streaming", href: "/en-iyi/streaming" },
      { label: "VPN for Android", href: "/cihazlar/android" },
      { label: "VPN for Turks abroad", href: "/en-iyi/yurt-disindaki-turkler" },
      ...COMMON_RELATED,
    ],
  },
];
