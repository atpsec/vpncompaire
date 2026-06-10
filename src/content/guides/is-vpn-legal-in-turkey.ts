// "Türkiye'de VPN yasal mı?" rehberinin locale-aware içeriği (tr/en/de).
// Sayfa (src/app/[locale]/rehber/turkiye-de-vpn-yasal-mi/page.tsx) bu modülden
// render eder; yerelleştirilmiş URL'ler (/rehber/turkiye-de-vpn-yasal-mi,
// /en/guide/is-vpn-legal-in-turkey, /de/ratgeber/ist-vpn-in-der-tuerkei-legal)
// proxy rewrite ile aynı sayfaya düşer.

import type { AppLocale } from "@/lib/i18n-paths";

export type BoldItem = { bold: string; text: string };

export type IsVpnLegalInTurkeyContent = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  lede: { before: string; bold: string; after: string };
  breadcrumb: { home: string; guides: string; current: string };
  quickAnswer: { h2: string; items: BoldItem[] };
  legalFramework: { h2: string; p1: string; p2: string };
  btk: {
    h2: string;
    intro: string;
    list: string[];
    notice: BoldItem;
  };
  illegal: { h2: string; intro: string; list: string[]; outro: string };
  practical: { h2: string; items: BoldItem[] };
  advice: {
    h2: string;
    items: {
      bold: string;
      text: string;
      link?: { href: string; label: string };
      afterLink?: string;
    }[];
  };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  disclaimer: { title: string; body: string };
  relatedLabel: string;
  relatedLinks: { href: string; text: string }[];
};

const tr: IsVpnLegalInTurkeyContent = {
  metaTitle: "Türkiye'de VPN Yasal mı? Tam Hukuki Rehber (2026)",
  metaDescription:
    "Türkiye'de VPN kullanımının yasal durumu, neyin yasal/yasadışı olduğu, risk senaryoları ve pratik kurallar. 2026 güncel rehber.",
  badge: "Hukuki rehber",
  h1: "Türkiye'de VPN Yasal mı?",
  lede: {
    before: "Kısa cevap: ",
    bold: "Evet",
    after:
      ". VPN kullanmak Türkiye'de yasal bir teknoloji. Ama nüanslar var — neyin yasal, neyin riskli olduğunu detaylı açıklıyoruz.",
  },
  breadcrumb: {
    home: "Ana sayfa",
    guides: "Rehberler",
    current: "Türkiye'de VPN yasal mı?",
  },
  quickAnswer: {
    h2: "Hızlı cevap",
    items: [
      {
        bold: "VPN kullanmak yasal:",
        text: " Türkiye'de VPN kullanımını yasaklayan bir yasa yok.",
      },
      {
        bold: "VPN bir \u201cyasallaştırıcı\u201d değil:",
        text: " VPN ile yapılan eylem yasadışı ise, eylemin kendisi yasadışıdır — VPN kullanmak da ek suç oluşturmaz, eylemi yasal hale de getirmez.",
      },
      {
        bold: "Bazı VPN siteleri kısıtlanabilir:",
        text: " BTK zaman zaman bazı VPN sağlayıcılarının web sitelerini erişime kapatabiliyor. Bu, VPN kullanmanın yasaklı olduğu anlamına gelmiyor.",
      },
    ],
  },
  legalFramework: {
    h2: "Yasal çerçeve",
    p1: "Türkiye'de internet hizmetleri 5651 sayılı \u201cİnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun\u201d tarafından düzenlenir. Bu kanun, hangi içeriğin yayınlanabileceğine ve hangi platformların erişime kapatılabileceğine dair çerçeveyi belirler — ancak VPN teknolojisinin kullanımını doğrudan yasaklamaz.",
    p2: "VPN, kurumsal güvenlik, uzaktan çalışma, gizlilik ve veri koruması gibi meşru amaçlarla yaygın olarak kullanılan bir teknoloji. Türk yasaları bu teknolojinin kullanımını yasak kılmaz; aksine, çoğu kurum ve şirket çalışanlarına VPN kullanımı zorunlu kılar (kurumsal ağa güvenli erişim için).",
  },
  btk: {
    h2: "BTK ve VPN web sitelerine erişim kısıtlamaları",
    intro:
      "Bilgi Teknolojileri ve İletişim Kurumu (BTK), zaman zaman bazı VPN sağlayıcılarının web sitelerini Türkiye'den erişime kapatabiliyor. Bu durumlar genelde aşağıdaki senaryolarda oluyor:",
    list: [
      "Web sitesinin barındırdığı bilgi formatına dair bir bildirim",
      "İçerik moderasyonu süreçlerine dair karşılıklı uyumsuzluk",
      "Yasal taleplerin işletilme şekline dair anlaşmazlıklar",
    ],
    notice: {
      bold: "Önemli nüans:",
      text: " Web sitesinin engellenmiş olması, VPN uygulamasının çalışmadığı anlamına gelmez. Çoğu kullanıcı, VPN uygulamasını yurt dışındayken indirip kurduktan sonra Türkiye'ye döndüğünde sorunsuz kullanmaya devam ediyor.",
    },
  },
  illegal: {
    h2: "VPN ile yapılması yasadışı olan şeyler",
    intro:
      "VPN bir gizlilik aracıdır, \u201cyasallaştırıcı\u201d değil. Aşağıdakiler VPN kullansan da kullanmasan da yasadışı:",
    list: [
      "Telif hakkı ihlali (illegal torrent, korsan içerik dağıtımı)",
      "Dolandırıcılık ve kimlik hırsızlığı",
      "Çocuğa karşı işlenen suçlar",
      "Terör propagandası",
      "Yasaklı maddelerin alım/satımı",
    ],
    outro:
      "Bu eylemler için VPN kullanmak ek bir suç oluşturmaz — ana eylem zaten yasadışı.",
  },
  practical: {
    h2: "Pratik kullanım — neyi yapabilirsin?",
    items: [
      {
        bold: "Gizlilik için VPN kullanmak:",
        text: " ISP'nin hangi siteleri ziyaret ettiğini görmemesi, halka açık Wi-Fi'de güvenlik için.",
      },
      {
        bold: "Uzaktan çalışma:",
        text: " Şirket ağına güvenli erişim.",
      },
      {
        bold: "Yurt dışı içerik erişimi (genel):",
        text: " Yabancı streaming kütüphanelerine erişim. Hizmet sağlayıcının kullanım koşullarına uygun olmasa da yasadışı değil.",
      },
      {
        bold: "BluTV/Exxen yurt dışından izleme:",
        text: " Tartışmasız yasal — kendi Türkiye aboneliğine kendi VPN ile eriştiğinde herhangi bir hak ihlali olmaz.",
      },
    ],
  },
  advice: {
    h2: "Pratik tavsiye",
    items: [
      {
        bold: "VPN'i yurt dışındayken indir:",
        text: " BTK engellemelerine takılmamak için, mümkünse VPN uygulamasını Türkiye'ye gelmeden önce kur.",
      },
      {
        bold: "Bankacılık için VPN'i kapat:",
        text: " Türk bankaları VPN tespit ederse oturumu güvenlik gereği kapatır.",
      },
      {
        bold: "Denetlenmiş, güvenilir bir VPN seç:",
        text: " Ücretsiz VPN'ler verini satabilir. Denetimli sağlayıcılarla devam et — ",
        link: { href: "/en-iyi-vpn", label: "en iyi seçimlerimizi gör" },
        afterLink: ".",
      },
    ],
  },
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Türkiye'de VPN kullanmak yasal mı?",
      a: "Evet. VPN'in kendisi yasal bir teknolojidir ve gizlilik, kurumsal güvenlik, uzaktan çalışma gibi meşru amaçlarla yaygın olarak kullanılır. Türkiye'de VPN kullanımını yasaklayan özel bir yasa yok.",
    },
    {
      q: "Bazı VPN'lerin Türkiye'de yasaklı olduğu doğru mu?",
      a: "Bazı VPN sağlayıcılarının web siteleri Türkiye'den erişimi BTK tarafından kısıtlanabiliyor. Bu, VPN kullanmanın yasaklı olduğu anlamına gelmez — yalnızca o sağlayıcının web sitesine direkt erişim kısıtlı. Çoğu VPN uygulaması bu durumda dahi çalışmaya devam ediyor.",
    },
    {
      q: "VPN üzerinden ne yapmak yasadışı?",
      a: "VPN dışında ne yapmak yasadışıysa, VPN üzerinden de yasadışı. VPN bir 'yasallaştırıcı' değil, gizlilik aracıdır. Telif hakkı ihlali, dolandırıcılık, yasaklı içerik üretimi/yayılması gibi eylemler VPN kullansan da kullanmasan da yasadışı.",
    },
    {
      q: "İş yerinde VPN kullanmak yasal mı?",
      a: "Şirket politikası çerçevesinde — çoğu kurum çalışanlarının uzaktan erişim için VPN kullanmasını zorunlu kılar. Şahsi VPN kullanımı işyerinde yine yasal, ancak şirket ağ politikasıyla çelişebilir.",
    },
    {
      q: "VPN kullandığım için bana ceza gelebilir mi?",
      a: "Yalnızca VPN kullanmak nedeniyle Türkiye'de ceza işlemi yapıldığına dair somut bir hukuki örnek bilinmiyor. VPN üzerinden işlenen bir suç varsa o suça yönelik ceza uygulanır — VPN kullanmak ayrıca cezalandırılmaz.",
    },
    {
      q: "Yurt dışındaki Türkler VPN kullanırken farklı kurallar geçerli mi?",
      a: "Yurt dışındaysan, bulunduğun ülkenin yasaları geçerli. Çoğu AB ülkesi ve ABD'de VPN kullanımı yasal. BAE, Çin, Belarus, İran, Rusya, Türkmenistan gibi ülkelerde kısıtlamalar olabilir.",
    },
    {
      q: "Türk bankası VPN'imi tespit ederse hesabım kapatılır mı?",
      a: "Genelde hayır — banka VPN tespit ederse oturumu kapatır ama hesabını kapatmaz. Pratik strateji: bankacılık işlemleri için VPN'i geçici olarak kapat.",
    },
  ],
  disclaimer: {
    title: "Bu rehber hukuki tavsiye yerine geçmez",
    body: "Bu sayfa genel bilgi amaçlıdır. Spesifik bir durum için hukuki tavsiye almak istiyorsan, bir avukatla görüşmeni öneririz.",
  },
  relatedLabel: "İlgili sayfalar",
  relatedLinks: [
    { href: "/en-iyi/turkiye", text: "Türkiye için en iyi VPN" },
    {
      href: "/en-iyi/yurt-disindaki-turkler",
      text: "Yurt dışı Türkler için VPN",
    },
    { href: "/en-iyi-vpn", text: "En iyi VPN'ler 2026" },
  ],
};

const en: IsVpnLegalInTurkeyContent = {
  metaTitle: "Is VPN Legal in Türkiye? The Complete Legal Guide (2026)",
  metaDescription:
    "The legal status of VPN use in Türkiye: what's legal and what isn't, risk scenarios and practical rules. Up-to-date guide for 2026.",
  badge: "Legal guide",
  h1: "Is VPN Legal in Türkiye?",
  lede: {
    before: "Short answer: ",
    bold: "Yes",
    after:
      ". Using a VPN is a legal technology in Türkiye. But there are nuances — we explain in detail what's legal and what's risky.",
  },
  breadcrumb: {
    home: "Home",
    guides: "Guides",
    current: "Is VPN legal in Türkiye?",
  },
  quickAnswer: {
    h2: "Quick answer",
    items: [
      {
        bold: "Using a VPN is legal:",
        text: " There is no law in Türkiye banning the use of VPNs.",
      },
      {
        bold: "A VPN is not a \u201clegalizer\u201d:",
        text: " If an action taken over a VPN is illegal, the action itself is illegal — using a VPN neither adds an extra offense nor makes the action legal.",
      },
      {
        bold: "Some VPN websites can be restricted:",
        text: " BTK occasionally blocks access to some VPN providers' websites. That doesn't mean using a VPN is banned.",
      },
    ],
  },
  legalFramework: {
    h2: "The legal framework",
    p1: "Internet services in Türkiye are regulated by Law No. 5651, the \u201cLaw on the Regulation of Publications on the Internet and Combating Crimes Committed by Means of Such Publications\u201d. This law sets the framework for which content may be published and which platforms may be blocked — but it does not directly prohibit the use of VPN technology.",
    p2: "A VPN is a technology widely used for legitimate purposes such as corporate security, remote work, privacy and data protection. Turkish law doesn't outlaw its use; on the contrary, most institutions and companies require their employees to use a VPN (for secure access to the corporate network).",
  },
  btk: {
    h2: "BTK and access restrictions on VPN websites",
    intro:
      "The Information and Communication Technologies Authority (BTK) occasionally blocks access to some VPN providers' websites from Türkiye. This usually happens in scenarios like the following:",
    list: [
      "A notice concerning the kind of information the website hosts",
      "Mutual non-compliance over content-moderation processes",
      "Disputes over how legal requests are handled",
    ],
    notice: {
      bold: "An important nuance:",
      text: " A blocked website doesn't mean the VPN app stops working. Most users install the VPN app while abroad and keep using it without issues after returning to Türkiye.",
    },
  },
  illegal: {
    h2: "Things that are illegal to do over a VPN",
    intro:
      "A VPN is a privacy tool, not a \u201clegalizer\u201d. The following are illegal whether or not you use a VPN:",
    list: [
      "Copyright infringement (illegal torrents, distributing pirated content)",
      "Fraud and identity theft",
      "Crimes against children",
      "Terrorist propaganda",
      "Buying/selling prohibited substances",
    ],
    outro:
      "Using a VPN for these acts doesn't create an additional offense — the underlying act is already illegal.",
  },
  practical: {
    h2: "Practical use — what can you do?",
    items: [
      {
        bold: "Using a VPN for privacy:",
        text: " So your ISP can't see which sites you visit, and for security on public Wi-Fi.",
      },
      {
        bold: "Remote work:",
        text: " Secure access to your company network.",
      },
      {
        bold: "Accessing content from abroad (in general):",
        text: " Reaching foreign streaming libraries. Even if it conflicts with the service's terms of use, it isn't illegal.",
      },
      {
        bold: "Watching BluTV/Exxen from abroad:",
        text: " Unambiguously legal — accessing your own Türkiye subscription through your own VPN infringes no rights.",
      },
    ],
  },
  advice: {
    h2: "Practical advice",
    items: [
      {
        bold: "Download the VPN while abroad:",
        text: " To avoid running into BTK blocks, install the VPN app before arriving in Türkiye if possible.",
      },
      {
        bold: "Turn the VPN off for banking:",
        text: " Turkish banks will end your session for security reasons if they detect a VPN.",
      },
      {
        bold: "Pick an audited, trustworthy VPN:",
        text: " Free VPNs may sell your data. Stick with audited providers — ",
        link: { href: "/en-iyi-vpn", label: "see our top picks" },
        afterLink: ".",
      },
    ],
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Is it legal to use a VPN in Türkiye?",
      a: "Yes. A VPN itself is a legal technology, widely used for legitimate purposes such as privacy, corporate security and remote work. There is no specific law in Türkiye banning the use of VPNs.",
    },
    {
      q: "Is it true that some VPNs are banned in Türkiye?",
      a: "Access to some VPN providers' websites from Türkiye can be restricted by BTK. That doesn't mean using a VPN is banned — only direct access to that provider's website is restricted. Most VPN apps keep working even in that case.",
    },
    {
      q: "What is illegal to do over a VPN?",
      a: "Whatever is illegal without a VPN is also illegal over a VPN. A VPN is a privacy tool, not a 'legalizer'. Acts like copyright infringement, fraud or producing/distributing banned content are illegal whether or not you use a VPN.",
    },
    {
      q: "Is it legal to use a VPN at work?",
      a: "Within company policy — most organizations require employees to use a VPN for remote access. Personal VPN use at work is still legal, but it may conflict with your company's network policy.",
    },
    {
      q: "Can I be punished just for using a VPN?",
      a: "There is no known concrete legal case in Türkiye of someone being prosecuted merely for using a VPN. If a crime is committed over a VPN, the penalty applies to that crime — using a VPN isn't punished separately.",
    },
    {
      q: "Do different rules apply to Turks abroad using a VPN?",
      a: "If you're abroad, the laws of the country you're in apply. VPN use is legal in most EU countries and the US. There may be restrictions in countries such as the UAE, China, Belarus, Iran, Russia and Turkmenistan.",
    },
    {
      q: "Will my account be closed if my Turkish bank detects my VPN?",
      a: "Usually no — if the bank detects a VPN it ends the session but doesn't close your account. The practical strategy: temporarily turn off the VPN for banking.",
    },
  ],
  disclaimer: {
    title: "This guide is not a substitute for legal advice",
    body: "This page is for general information. If you need legal advice for a specific situation, we recommend consulting a lawyer.",
  },
  relatedLabel: "Related pages",
  relatedLinks: [
    { href: "/en-iyi/turkiye", text: "Best VPN for Türkiye" },
    {
      href: "/en-iyi/yurt-disindaki-turkler",
      text: "VPN for Turks abroad",
    },
    { href: "/en-iyi-vpn", text: "Best VPNs 2026" },
  ],
};

const de: IsVpnLegalInTurkeyContent = {
  metaTitle: "Ist VPN in der Türkei legal? Der komplette Rechtsratgeber (2026)",
  metaDescription:
    "Die Rechtslage der VPN-Nutzung in der Türkei: was legal ist und was nicht, Risikoszenarien und praktische Regeln. Aktueller Ratgeber 2026.",
  badge: "Rechtsratgeber",
  h1: "Ist VPN in der Türkei legal?",
  lede: {
    before: "Kurze Antwort: ",
    bold: "Ja",
    after:
      ". Ein VPN zu nutzen ist in der Türkei eine legale Technologie. Aber es gibt Nuancen — wir erklären im Detail, was legal und was riskant ist.",
  },
  breadcrumb: {
    home: "Startseite",
    guides: "Ratgeber",
    current: "Ist VPN in der Türkei legal?",
  },
  quickAnswer: {
    h2: "Schnelle Antwort",
    items: [
      {
        bold: "VPN-Nutzung ist legal:",
        text: " Es gibt in der Türkei kein Gesetz, das die Nutzung von VPNs verbietet.",
      },
      {
        bold: "Ein VPN ist kein \u201eLegalisierer\u201c:",
        text: " Ist eine über VPN ausgeführte Handlung illegal, ist die Handlung selbst illegal — die VPN-Nutzung stellt weder eine zusätzliche Straftat dar, noch macht sie die Handlung legal.",
      },
      {
        bold: "Manche VPN-Websites können gesperrt werden:",
        text: " Die BTK sperrt gelegentlich die Websites einzelner VPN-Anbieter. Das bedeutet nicht, dass die VPN-Nutzung verboten ist.",
      },
    ],
  },
  legalFramework: {
    h2: "Der rechtliche Rahmen",
    p1: "Internetdienste werden in der Türkei durch das Gesetz Nr. 5651 (\u201eGesetz über die Regelung von Veröffentlichungen im Internet und die Bekämpfung von durch solche Veröffentlichungen begangenen Straftaten\u201c) geregelt. Dieses Gesetz legt den Rahmen fest, welche Inhalte veröffentlicht werden dürfen und welche Plattformen gesperrt werden können — die Nutzung der VPN-Technologie verbietet es jedoch nicht direkt.",
    p2: "Ein VPN ist eine Technologie, die für legitime Zwecke wie Unternehmenssicherheit, Remote-Arbeit, Privatsphäre und Datenschutz weit verbreitet ist. Das türkische Recht verbietet ihre Nutzung nicht; im Gegenteil verpflichten die meisten Institutionen und Unternehmen ihre Mitarbeitenden zur VPN-Nutzung (für den sicheren Zugriff aufs Firmennetz).",
  },
  btk: {
    h2: "BTK und Zugriffssperren auf VPN-Websites",
    intro:
      "Die türkische Informations- und Kommunikationsbehörde (BTK) sperrt gelegentlich den Zugriff auf die Websites einzelner VPN-Anbieter aus der Türkei. Das passiert in der Regel in folgenden Szenarien:",
    list: [
      "Eine Beanstandung zur Art der auf der Website bereitgestellten Informationen",
      "Gegenseitige Unstimmigkeiten bei Moderationsprozessen für Inhalte",
      "Streitigkeiten über den Umgang mit rechtlichen Anfragen",
    ],
    notice: {
      bold: "Wichtige Nuance:",
      text: " Eine gesperrte Website bedeutet nicht, dass die VPN-App nicht funktioniert. Die meisten Nutzer installieren die VPN-App im Ausland und nutzen sie nach der Rückkehr in die Türkei problemlos weiter.",
    },
  },
  illegal: {
    h2: "Was über VPN illegal ist",
    intro:
      "Ein VPN ist ein Datenschutz-Werkzeug, kein \u201eLegalisierer\u201c. Folgendes ist illegal — mit oder ohne VPN:",
    list: [
      "Urheberrechtsverletzungen (illegale Torrents, Verbreitung von Raubkopien)",
      "Betrug und Identitätsdiebstahl",
      "Straftaten gegen Kinder",
      "Terrorpropaganda",
      "Kauf/Verkauf verbotener Substanzen",
    ],
    outro:
      "Die VPN-Nutzung für diese Handlungen stellt keine zusätzliche Straftat dar — die eigentliche Handlung ist bereits illegal.",
  },
  practical: {
    h2: "Praktische Nutzung — was darfst du?",
    items: [
      {
        bold: "VPN für den Datenschutz nutzen:",
        text: " Damit dein ISP nicht sieht, welche Seiten du besuchst, und für Sicherheit im öffentlichen WLAN.",
      },
      {
        bold: "Remote-Arbeit:",
        text: " Sicherer Zugriff aufs Firmennetz.",
      },
      {
        bold: "Zugriff auf Inhalte aus dem Ausland (allgemein):",
        text: " Zugriff auf ausländische Streaming-Bibliotheken. Auch wenn es den Nutzungsbedingungen des Anbieters widersprechen mag, ist es nicht illegal.",
      },
      {
        bold: "BluTV/Exxen aus dem Ausland schauen:",
        text: " Eindeutig legal — wenn du mit deinem eigenen VPN auf dein eigenes Türkei-Abo zugreifst, verletzt das keinerlei Rechte.",
      },
    ],
  },
  advice: {
    h2: "Praktische Tipps",
    items: [
      {
        bold: "Lade das VPN im Ausland herunter:",
        text: " Um nicht in BTK-Sperren zu laufen, installiere die VPN-App möglichst, bevor du in die Türkei kommst.",
      },
      {
        bold: "Schalte das VPN fürs Banking aus:",
        text: " Türkische Banken beenden aus Sicherheitsgründen die Sitzung, wenn sie ein VPN erkennen.",
      },
      {
        bold: "Wähle ein geprüftes, vertrauenswürdiges VPN:",
        text: " Kostenlose VPNs können deine Daten verkaufen. Bleib bei auditierten Anbietern — ",
        link: { href: "/en-iyi-vpn", label: "sieh dir unsere Top-Auswahl an" },
        afterLink: ".",
      },
    ],
  },
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Ist die VPN-Nutzung in der Türkei legal?",
      a: "Ja. Ein VPN ist an sich eine legale Technologie und wird für legitime Zwecke wie Datenschutz, Unternehmenssicherheit und Remote-Arbeit breit eingesetzt. Es gibt in der Türkei kein spezielles Gesetz, das die VPN-Nutzung verbietet.",
    },
    {
      q: "Stimmt es, dass manche VPNs in der Türkei gesperrt sind?",
      a: "Der Zugriff auf die Websites mancher VPN-Anbieter kann aus der Türkei durch die BTK eingeschränkt werden. Das heißt nicht, dass die VPN-Nutzung verboten ist — nur der direkte Zugriff auf die Website des Anbieters ist eingeschränkt. Die meisten VPN-Apps funktionieren selbst dann weiter.",
    },
    {
      q: "Was ist über VPN illegal?",
      a: "Was ohne VPN illegal ist, ist es auch über VPN. Ein VPN ist ein Datenschutz-Werkzeug, kein 'Legalisierer'. Handlungen wie Urheberrechtsverletzungen, Betrug oder das Erstellen/Verbreiten verbotener Inhalte sind illegal — mit oder ohne VPN.",
    },
    {
      q: "Ist die VPN-Nutzung am Arbeitsplatz legal?",
      a: "Im Rahmen der Firmenrichtlinien — die meisten Unternehmen verpflichten ihre Mitarbeitenden sogar zur VPN-Nutzung für den Remote-Zugriff. Die private VPN-Nutzung am Arbeitsplatz ist ebenfalls legal, kann aber der Netzwerkrichtlinie deiner Firma widersprechen.",
    },
    {
      q: "Kann ich allein für die VPN-Nutzung bestraft werden?",
      a: "Es ist kein konkreter Rechtsfall bekannt, in dem in der Türkei jemand allein wegen VPN-Nutzung belangt wurde. Wird über VPN eine Straftat begangen, wird diese Straftat bestraft — die VPN-Nutzung selbst wird nicht zusätzlich bestraft.",
    },
    {
      q: "Gelten für Türken im Ausland andere Regeln bei der VPN-Nutzung?",
      a: "Im Ausland gelten die Gesetze des Landes, in dem du dich befindest. In den meisten EU-Ländern und den USA ist die VPN-Nutzung legal. In Ländern wie den VAE, China, Belarus, Iran, Russland und Turkmenistan kann es Einschränkungen geben.",
    },
    {
      q: "Wird mein Konto geschlossen, wenn meine türkische Bank mein VPN erkennt?",
      a: "In der Regel nein — erkennt die Bank ein VPN, beendet sie die Sitzung, schließt aber nicht dein Konto. Die praktische Strategie: Schalte das VPN für Bankgeschäfte vorübergehend aus.",
    },
  ],
  disclaimer: {
    title: "Dieser Ratgeber ersetzt keine Rechtsberatung",
    body: "Diese Seite dient der allgemeinen Information. Wenn du Rechtsberatung für eine konkrete Situation brauchst, empfehlen wir das Gespräch mit einem Anwalt.",
  },
  relatedLabel: "Verwandte Seiten",
  relatedLinks: [
    { href: "/en-iyi/turkiye", text: "Bestes VPN für die Türkei" },
    {
      href: "/en-iyi/yurt-disindaki-turkler",
      text: "VPN für Türken im Ausland",
    },
    { href: "/en-iyi-vpn", text: "Die besten VPNs 2026" },
  ],
};

const CONTENT: Record<AppLocale, IsVpnLegalInTurkeyContent> = { tr, en, de };

export function getIsVpnLegalInTurkeyContent(
  locale: string,
): IsVpnLegalInTurkeyContent {
  return CONTENT[locale as AppLocale] ?? CONTENT.tr;
}
