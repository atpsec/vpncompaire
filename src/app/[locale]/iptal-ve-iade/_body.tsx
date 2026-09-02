import { RefreshCcw, Clock, AlertTriangle, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VPNLogo } from "@/components/brand/vpn-logo";
import { DataDisclaimer } from "@/components/legal/data-disclaimer";
import { AffiliateNotice } from "@/components/legal/affiliate-notice";
import { ProviderLink } from "@/components/affiliate/provider-link";
import { rankedProducts, type Product } from "@/data/products";
import type { Locale } from "@/i18n/pick";
import { providerOutboundHref, providerOutboundRel } from "@/lib/affiliate-public";

type CancelInfo = { via: string; pitfalls: string[] };
type FAQ = { q: string; a: string };

type Strings = {
  breadcrumbHome: string;
  breadcrumbHere: string;
  badge: string;
  h1: string;
  lede: string;
  warningTitle: string;
  warningBody: string;
  navAria: string;
  daysSuffix: string;
  refundWindowMissing: string;
  howToCancel: string;
  watchOut: string;
  reviewSuffix: string;
  supportLink: string;
  stepsH2: string;
  steps: { bold: string; rest: string }[];
  faqsH2: string;
  tipTitle: string;
  tipBody: string;
  relatedTitle: string;
  relatedCalculator: string;
  relatedFreeVsPaid: string;
  relatedLegal: string;
};

const TR_CANCEL_INFO: Record<string, CancelInfo> = {
  nordvpn: {
    via: "Hesap → Abonelik → Otomatik yenilemeyi kapat. İade için 30 gün içinde destek (canlı sohbet veya support@nordvpn.com) ile iletişime geç.",
    pitfalls: [
      "Otomatik yenilemeyi kapatmak iade vermez — iade için ayrıca destek talebi gerekir.",
      "App Store / Google Play üzerinden alınan abonelikler için iade Apple/Google'a yapılmalı.",
    ],
  },
  surfshark: {
    via: "Hesap → Subscription → Cancel Subscription. İade için 30 gün içinde destek (canlı sohbet) ile iletişime geç.",
    pitfalls: [
      "Otomatik yenileme ile iade ayrı süreçtir.",
      "App Store / Google Play abonelikleri için iade ilgili platforma yapılır.",
    ],
  },
  expressvpn: {
    via: "Hesap → Subscription → Manage settings → Cancel automatic renewal. İade için 30 gün içinde 7/24 canlı sohbet en hızlı yöntem.",
    pitfalls: [
      "İade için yenileme döneminin başlangıcından itibaren 30 gün şartı vardır.",
      "Mobil mağaza üzerinden alındıysa iade Apple/Google üzerinden yapılır.",
    ],
  },
  "proton-vpn": {
    via: "account.proton.me → Subscription → Cancel. Ücretli plan için 30 gün içinde destek talebi açılarak iade istenebilir.",
    pitfalls: [
      "Ücretsiz plan abonelik sayılmaz — iptal gereksizdir.",
      "Pro-rata iade modeli kullanılır; kalan süre üzerinden hesaplanabilir.",
    ],
  },
  pia: {
    via: "Account → Subscription → Cancel. İade için 30 gün içinde destek (canlı sohbet) ile iletişime geç.",
    pitfalls: [
      "3 yıllık plan dahil tüm planlar 30 günlük iade hakkına sahiptir.",
      "App Store / Google Play abonelikleri ilgili platforma iade yapılır.",
    ],
  },
  cyberghost: {
    via: "Hesap → Subscription → Cancel. İade için 45 gün içinde destek talebi.",
    pitfalls: [
      "45 günlük süre yalnızca uzun dönem (1+ yıl) planlar için geçerlidir; aylık plan 14 gün.",
      "Mobil mağaza abonelikleri ilgili platforma iade edilir.",
    ],
  },
  ipvanish: {
    via: "Hesap → Subscription → Cancel. İade için yıllık planlarda 30 gün, aylık planlarda 7 gün içinde destek talebi.",
    pitfalls: [
      "Aylık plan iade süresi yalnızca 7 gündür — uzun dönem planın iade süresi farklıdır.",
      "Add-on hizmetler (örn. Boxcryptor) için iade kuralları farklı olabilir.",
    ],
  },
  windscribe: {
    via: "Hesap → My Account → Manage Subscription → Cancel. İade için yalnızca 3 gün içinde destek talebi.",
    pitfalls: [
      "İade penceresi 3 gün — sektördeki en kısa pencerelerden biri.",
      "Build-a-plan satın alımları için iade kuralları farklı olabilir.",
    ],
  },
  tunnelbear: {
    via: "Hesap → Cancel Subscription. Para iade garantisi sunulmaz — ücretli plana geçmeden 2 GB ücretsiz plan ile sınama önerilir.",
    pitfalls: [
      "Para iade garantisi yoktur; ücretli plan satın alındıktan sonra iade istisnai durumlarda destek kararına bağlıdır.",
      "Aboneliği iptal etmek hesabı silmez — verileri silmek için ayrı talep gerekir.",
    ],
  },
  mullvad: {
    via: "Hesap numarasıyla giriş → Manage account → Refund. İade için 30 gün içinde destek talebi.",
    pitfalls: [
      "Anonim hesap modelinde iadenin döneceği yöntem ödeme türüne göre değişir.",
      "Nakit ödeme ile yapılan iadeler için adres bilgisi destek talebinde belirtilmelidir.",
    ],
  },
};

const TR_FAQS: FAQ[] = [
  {
    q: "Para iade süresini nasıl başlatırım?",
    a: "Sağlayıcı politikalarına göre genelde abonelik başlangıç tarihi referans alınır. Bazı sağlayıcılar yenileme döneminin başlangıcını kabul etmektedir. Güncel koşullar için sağlayıcının resmi destek sayfasını incelemeni öneririz.",
  },
  {
    q: "App Store / Google Play üzerinden satın aldım, iade nasıl olur?",
    a: "VPN sağlayıcısının kendi iade politikası geçerli olmaz; iade Apple App Store veya Google Play üzerinden talep edilmelidir. Bu platformların kendi iade kuralları uygulanır.",
  },
  {
    q: "Otomatik yenilemeyi kapatmak iade demek mi?",
    a: "Hayır. Otomatik yenilemeyi kapatmak yalnızca gelecek tahsilatları durdurur. Mevcut dönem için iade talep etmek istiyorsan, ayrıca sağlayıcının destek hattına iade talebi açman gerekir.",
  },
  {
    q: "İade talebim reddedilirse ne yapabilirim?",
    a: "Sağlayıcının destek hattıyla diyalog süreci genelde 2-3 adımdan oluşur. Reddedilirse, ödemeyi yaptığın kart sağlayıcısı (banka) veya PayPal üzerinden chargeback (ters ibraz) başlatılabilir; ancak bu, ileride o sağlayıcıyı kullanma hakkını etkileyebilir.",
  },
  {
    q: "Yıllık ödediğim VPN'i ay ortasında iptal edersem kalan ay için iade alırım mı?",
    a: "Genelde hayır. Çoğu VPN sağlayıcısı \"30 gün içinde tam iade, sonrası iade yok\" modeli uygular. Proton VPN pro-rata iade sunmaktadır; diğerlerinde abonelik bittiğinde otomatik olarak ücretsiz plana düşersin.",
  },
];

const EN_CANCEL_INFO: Record<string, CancelInfo> = {
  nordvpn: {
    via: "Account → Subscription → Disable auto-renewal. For a refund, contact support (live chat or support@nordvpn.com) within 30 days.",
    pitfalls: [
      "Disabling auto-renewal does not refund you — refund requires a separate support request.",
      "Subscriptions bought via App Store / Google Play must be refunded through Apple/Google.",
    ],
  },
  surfshark: {
    via: "Account → Subscription → Cancel Subscription. For a refund, contact support (live chat) within 30 days.",
    pitfalls: [
      "Auto-renewal and refund are separate processes.",
      "App Store / Google Play subscriptions are refunded via that platform.",
    ],
  },
  expressvpn: {
    via: "Account → Subscription → Manage settings → Cancel automatic renewal. For a refund, the fastest path is 24/7 live chat within 30 days.",
    pitfalls: [
      "The 30-day window starts at the beginning of the renewal period.",
      "If bought via mobile store, refund must go through Apple/Google.",
    ],
  },
  "proton-vpn": {
    via: "account.proton.me → Subscription → Cancel. For paid plans, open a support request within 30 days to ask for a refund.",
    pitfalls: [
      "Free plan is not a subscription — no cancellation needed.",
      "A pro-rata refund model is used; it may be calculated on the remaining time.",
    ],
  },
  pia: {
    via: "Account → Subscription → Cancel. For a refund, contact support (live chat) within 30 days.",
    pitfalls: [
      "All plans, including the 3-year plan, get a 30-day refund window.",
      "App Store / Google Play subscriptions are refunded via that platform.",
    ],
  },
  cyberghost: {
    via: "Account → Subscription → Cancel. For a refund, open a support request within 45 days.",
    pitfalls: [
      "The 45-day window only applies to long-term (1+ year) plans; monthly plans get 14 days.",
      "Mobile-store subscriptions are refunded via that platform.",
    ],
  },
  ipvanish: {
    via: "Account → Subscription → Cancel. Refund window: 30 days for annual plans, 7 days for monthly plans.",
    pitfalls: [
      "Monthly-plan refund window is only 7 days — long-term plans differ.",
      "Refund rules for add-on services (e.g. Boxcryptor) may differ.",
    ],
  },
  windscribe: {
    via: "Account → My Account → Manage Subscription → Cancel. Refund requires a support request within 3 days only.",
    pitfalls: [
      "3-day window — one of the shortest in the industry.",
      "Refund rules for Build-a-Plan purchases may differ.",
    ],
  },
  tunnelbear: {
    via: "Account → Cancel Subscription. No money-back guarantee — try the 2 GB free plan before going paid.",
    pitfalls: [
      "No money-back guarantee; after a paid plan is purchased, refunds are at support's discretion.",
      "Cancelling a subscription does not delete the account — data deletion is a separate request.",
    ],
  },
  mullvad: {
    via: "Sign in with account number → Manage account → Refund. Refund requires a support request within 30 days.",
    pitfalls: [
      "In the anonymous-account model, the refund method depends on the payment method.",
      "For cash-payment refunds, the support request must include an address.",
    ],
  },
};

const EN_FAQS: FAQ[] = [
  {
    q: "How does the refund window start?",
    a: "Per provider policy, the subscription start date is generally the reference. Some providers count the start of the renewal period. For current terms, check the provider's official support page.",
  },
  {
    q: "I bought through App Store / Google Play — how do I get a refund?",
    a: "The VPN provider's own refund policy does not apply; the refund must be requested through Apple App Store or Google Play. Those platforms' own refund rules apply.",
  },
  {
    q: "Is disabling auto-renewal the same as a refund?",
    a: "No. Disabling auto-renewal only stops future charges. To get a refund for the current period, you also need to open a refund request with the provider's support.",
  },
  {
    q: "What can I do if my refund request is rejected?",
    a: "Conversation with the provider's support typically takes 2-3 steps. If rejected, you can start a chargeback with the card issuer (your bank) or PayPal; however, this may affect your ability to use that provider later.",
  },
  {
    q: "If I cancel my annual VPN mid-month, do I get a refund for the rest of the month?",
    a: "Usually not. Most providers apply a \"full refund within 30 days, no refund after\" model. Proton VPN offers a pro-rata refund; with others, when the subscription ends you simply fall back to the free plan.",
  },
];

const DE_CANCEL_INFO: Record<string, CancelInfo> = {
  nordvpn: {
    via: "Konto → Abonnement → Automatische Verlängerung deaktivieren. Für eine Erstattung innerhalb von 30 Tagen den Support (Live-Chat oder support@nordvpn.com) kontaktieren.",
    pitfalls: [
      "Das Deaktivieren der automatischen Verlängerung ist keine Erstattung — dafür ist eine separate Support-Anfrage erforderlich.",
      "Abonnements über den App Store oder Google Play müssen über Apple bzw. Google erstattet werden.",
    ],
  },
  surfshark: {
    via: "Konto → Subscription → Cancel Subscription. Für eine Erstattung innerhalb von 30 Tagen den Support (Live-Chat) kontaktieren.",
    pitfalls: [
      "Automatische Verlängerung und Erstattung sind getrennte Vorgänge.",
      "Abonnements über den App Store oder Google Play werden über die jeweilige Plattform erstattet.",
    ],
  },
  expressvpn: {
    via: "Konto → Subscription → Manage settings → Cancel automatic renewal. Für eine Erstattung innerhalb von 30 Tagen ist der 24/7-Live-Chat meist der schnellste Weg.",
    pitfalls: [
      "Die 30-Tage-Frist beginnt mit dem Start des Verlängerungszeitraums.",
      "Bei einem Kauf über einen mobilen App-Store muss die Erstattung über Apple oder Google beantragt werden.",
    ],
  },
  "proton-vpn": {
    via: "account.proton.me → Subscription → Cancel. Für kostenpflichtige Tarife innerhalb von 30 Tagen eine Support-Anfrage zur Erstattung stellen.",
    pitfalls: [
      "Der kostenlose Tarif ist kein kostenpflichtiges Abonnement und muss nicht gekündigt werden.",
      "Proton kann eine anteilige Erstattung anhand der verbleibenden Laufzeit berechnen.",
    ],
  },
  pia: {
    via: "Account → Subscription → Cancel. Für eine Erstattung innerhalb von 30 Tagen den Support (Live-Chat) kontaktieren.",
    pitfalls: [
      "Alle Tarife einschließlich des 3-Jahres-Tarifs haben eine 30-tägige Erstattungsfrist.",
      "Abonnements über den App Store oder Google Play werden über die jeweilige Plattform erstattet.",
    ],
  },
  cyberghost: {
    via: "Konto → Subscription → Cancel. Für eine Erstattung innerhalb von 45 Tagen eine Support-Anfrage stellen.",
    pitfalls: [
      "Die 45 Tage gelten nur für langfristige Tarife ab einem Jahr; Monatstarife haben 14 Tage.",
      "Abonnements aus mobilen App-Stores werden über die jeweilige Plattform erstattet.",
    ],
  },
  ipvanish: {
    via: "Konto → Subscription → Cancel. Für Jahrespläne innerhalb von 30 Tagen, für Monatspläne innerhalb von 7 Tagen eine Support-Anfrage stellen.",
    pitfalls: [
      "Bei Monatsplänen beträgt die Erstattungsfrist nur 7 Tage; langfristige Tarife können andere Bedingungen haben.",
      "Für Zusatzdienste wie Boxcryptor können abweichende Erstattungsregeln gelten.",
    ],
  },
  windscribe: {
    via: "Konto → My Account → Manage Subscription → Cancel. Eine Erstattung muss innerhalb von 3 Tagen beim Support beantragt werden.",
    pitfalls: [
      "Die 3-Tage-Frist gehört zu den kürzesten Erstattungsfristen der Branche.",
      "Für Build-a-Plan-Käufe können andere Erstattungsregeln gelten.",
    ],
  },
  tunnelbear: {
    via: "Konto → Cancel Subscription. Es gibt keine allgemeine Geld-zurück-Garantie — testen Sie vor einem kostenpflichtigen Tarif den kostenlosen Tarif mit 2 GB.",
    pitfalls: [
      "Ohne Geld-zurück-Garantie hängt eine Erstattung nach dem Kauf von einer Einzelfallentscheidung des Supports ab.",
      "Die Kündigung löscht das Konto nicht; die Löschung von Daten muss separat beantragt werden.",
    ],
  },
  mullvad: {
    via: "Mit der Kontonummer anmelden → Manage account → Refund. Eine Erstattung muss innerhalb von 30 Tagen beim Support beantragt werden.",
    pitfalls: [
      "Bei anonymen Konten hängt der Rückerstattungsweg von der verwendeten Zahlungsart ab.",
      "Bei Barzahlungen sollte die Support-Anfrage die für die Erstattung erforderlichen Adressdaten enthalten.",
    ],
  },
};

const DE_FAQS: FAQ[] = [
  {
    q: "Wann beginnt die Erstattungsfrist?",
    a: "Nach den Anbieterbedingungen ist meist das Startdatum des Abonnements maßgeblich. Einige Anbieter rechnen ab dem Beginn des Verlängerungszeitraums. Prüfen Sie für die aktuellen Bedingungen die offizielle Support-Seite des Anbieters.",
  },
  {
    q: "Ich habe über den App Store oder Google Play gekauft — wie beantrage ich eine Erstattung?",
    a: "Dann gilt in der Regel nicht der eigene Erstattungsprozess des VPN-Anbieters. Die Erstattung muss über Apple App Store oder Google Play beantragt werden; es gelten deren jeweilige Regeln.",
  },
  {
    q: "Ist das Deaktivieren der automatischen Verlängerung dasselbe wie eine Erstattung?",
    a: "Nein. Dadurch werden nur künftige Abbuchungen verhindert. Für eine Erstattung des aktuellen Zeitraums muss zusätzlich eine Erstattungsanfrage beim Support des Anbieters gestellt werden.",
  },
  {
    q: "Was kann ich tun, wenn meine Erstattungsanfrage abgelehnt wird?",
    a: "Wenden Sie sich zunächst erneut an den Support und bewahren Sie die Korrespondenz auf. Wenn die Anfrage abgelehnt wird, können Sie sich an den Kartenanbieter oder PayPal wenden; ein Chargeback kann jedoch die weitere Nutzung des Anbieters beeinflussen.",
  },
  {
    q: "Bekomme ich bei einer Kündigung mitten im Jahreszeitraum das Geld für die restlichen Monate zurück?",
    a: "Meist nicht. Viele Anbieter erstatten innerhalb eines bestimmten Zeitfensters vollständig und danach nicht mehr. Proton VPN kann anteilig erstatten; bei anderen Anbietern läuft der Tarif bis zum Ende weiter oder fällt anschließend auf einen kostenlosen Tarif zurück.",
  },
];

const DE_STRINGS: Strings = {
  breadcrumbHome: "Startseite",
  breadcrumbHere: "Kündigung & Erstattung",
  badge: "Verbraucherleitfaden",
  h1: "VPN kündigen und Erstattung beantragen",
  lede: "Kündigungsschritte, Erstattungsfristen und häufige Stolperfallen für die aufgeführten VPN-Anbieter — anhand der jeweiligen Anbieterbedingungen zusammengestellt. Eine zentrale Übersicht, wenn eine Verlängerung bevorsteht oder Sie eine Erstattung beantragen möchten.",
  warningTitle: "Allgemeiner Hinweis",
  warningBody:
    "Erstattungs- und Kündigungsbedingungen können vom Anbieter ohne Vorankündigung geändert werden. Die Erstattungsfrist beträgt typischerweise 30 Tage (CyberGhost 45, Windscribe 3, IPVanish 7 Tage bei Monatsplänen). Lesen Sie vor dem Kauf die aktuelle Erstattungsrichtlinie des Anbieters.",
  navAria: "VPN auswählen",
  daysSuffix: "Tage Erstattung",
  refundWindowMissing: "Erstattungsfrist beim Anbieter erfragen",
  howToCancel: "So kündigen Sie",
  watchOut: "Darauf sollten Sie achten",
  reviewSuffix: "Testbericht →",
  supportLink: "Offizielle Anbieter-Website →",
  stepsH2: "Allgemeiner Kündigungsablauf — 4 Schritte",
  steps: [
    {
      bold: "Automatische Verlängerung deaktivieren.",
      rest: " Schalten Sie im Kontobereich des Anbieters die Option für die automatische Verlängerung aus. Dadurch werden künftige Abbuchungen gestoppt.",
    },
    {
      bold: "Bei gewünschter Erstattung eine Support-Anfrage stellen.",
      rest: " Das Deaktivieren der Verlängerung ist keine Erstattung. Wenden Sie sich innerhalb der Erstattungsfrist an den Support; der Live-Chat ist oft schneller als E-Mail.",
    },
    {
      bold: "Den Erstattungsweg für die Zahlungsart bestätigen.",
      rest: " Kartenzahlungen gehen in der Regel auf die Karte zurück, PayPal-Zahlungen zu PayPal. Käufe über einen App-Store werden über Apple oder Google abgewickelt.",
    },
    {
      bold: "Den Erstattungstermin verfolgen.",
      rest: " Rückzahlungen auf Bankkarten können 3–10 Werktage, PayPal-Erstattungen 1–3 Werktage und App-Store-Erstattungen 1–7 Werktage benötigen.",
    },
  ],
  faqsH2: "Häufig gestellte Fragen",
  tipTitle: "Praktischer Tipp",
  tipBody:
    "Deaktivieren Sie die automatische Verlängerung am besten direkt nach dem Abschluss des VPN-Abonnements. So vermeiden Sie eine unerwartete Verlängerung und können zum Laufzeitende erneut einen Tarif vergleichen oder den Anbieter wechseln.",
  relatedTitle: "Verwandte Seiten",
  relatedCalculator: "Gesamtkosten berechnen",
  relatedFreeVsPaid: "Kostenloses vs. kostenpflichtiges VPN",
  relatedLegal: "Rechtlicher Hinweis",
};

const DE_POSITIONING: Record<string, string> = {
  cyberghost: "Einfache Oberfläche für Einsteiger",
  expressvpn: "Premium-Option mit übersichtlicher Oberfläche",
  ipvanish: "Für Nutzer, die eigene Server-Hardware bevorzugen",
  mullvad: "Datenschutzorientierte Option ohne Affiliate-Beziehung",
  nordvpn: "Ausgewogene Wahl für die allgemeine Nutzung",
  pia: "Für Nutzer mit technischem Kontrollbedarf und großem Servernetz",
  "proton-vpn": "Für datenschutzorientierte Nutzer",
  surfshark: "Budget- und Multi-Geräte-orientierte Option",
  tunnelbear: "Einfache Oberfläche für Einsteiger",
  windscribe: "Kostenloser Tarif und flexible Preise",
};

const TR_STRINGS: Strings = {
  breadcrumbHome: "Ana sayfa",
  breadcrumbHere: "İptal ve İade",
  badge: "Tüketici rehberi",
  h1: "VPN iptal ve iade rehberi",
  lede: "Listelenen VPN sağlayıcıları için iptal adımları, iade penceresi ve yaygın tuzaklar — sağlayıcı politikalarına göre derlenmiştir. Yenileme yaklaştığında veya iade talep etmek istediğinde başvurabileceğin tek sayfa.",
  warningTitle: "Genel uyarı",
  warningBody:
    "İade ve iptal koşulları sağlayıcı tarafından haber verilmeksizin değişebilir. İade penceresi tipik olarak 30 gündür (CyberGhost 45, Windscribe 3, IPVanish aylık plan için 7 gün). Satın almadan önce sağlayıcının kendi iade politikasını okumanı öneririz.",
  navAria: "VPN seçimi",
  daysSuffix: "gün iade",
  refundWindowMissing: "İade penceresi sağlayıcıya sorulmalıdır",
  howToCancel: "Nasıl iptal edilir?",
  watchOut: "Dikkat edilmesi gerekenler",
  reviewSuffix: "incelemesi →",
  supportLink: "Sağlayıcının resmi sitesi →",
  stepsH2: "Genel iptal süreci — 4 adım",
  steps: [
    {
      bold: "Otomatik yenilemeyi kapat.",
      rest: " Sağlayıcının hesap panelinden \"auto-renewal\" veya \"otomatik yenileme\" seçeneğini kapat. Bu, gelecek tahsilatları durdurur.",
    },
    {
      bold: "İade istiyorsan destek talebi aç.",
      rest: " Otomatik yenilemeyi kapatmak iade vermez. İade penceresi içindeysen destek hattına başvur (canlı sohbet hızlı, e-posta yedek).",
    },
    {
      bold: "Ödeme yöntemine göre iade yolunu doğrula.",
      rest: " Kart ile alındıysa karta, PayPal ile alındıysa PayPal'a; mobil mağaza üzerinden alındıysa Apple/Google üzerinden iade yapılır.",
    },
    {
      bold: "İade tarihini takip et.",
      rest: " Banka kartı iadeleri 3-10 iş günü, PayPal 1-3 iş günü, mağaza iadeleri 1-7 iş günü sürebilir.",
    },
  ],
  faqsH2: "Sıkça sorulan sorular",
  tipTitle: "Pratik öneri",
  tipBody:
    "VPN abonelik aldıktan sonra ilk gün otomatik yenilemeyi kapatmak en güvenli yoldur. Bu, yenileme tuzağına düşmeni engeller; istersen bitiş tarihinde yeni bir kampanya kullanarak veya başka sağlayıcıya geçerek devam edebilirsin.",
  relatedTitle: "İlgili sayfalar",
  relatedCalculator: "Toplam maliyet hesaplayıcı",
  relatedFreeVsPaid: "Ücretsiz vs Ücretli VPN",
  relatedLegal: "Yasal uyarı",
};

const EN_STRINGS: Strings = {
  breadcrumbHome: "Home",
  breadcrumbHere: "Cancellation & refund",
  badge: "Consumer guide",
  h1: "VPN cancellation & refund guide",
  lede: "Cancellation steps, refund windows and common pitfalls for the listed VPN providers — compiled from provider policies. The one page to return to when renewal approaches or you want to request a refund.",
  warningTitle: "General warning",
  warningBody:
    "Refund and cancellation terms may change without notice from the provider. The refund window is typically 30 days (CyberGhost 45, Windscribe 3, IPVanish 7 for monthly plans). Before buying, we recommend reading the provider's own refund policy.",
  navAria: "Select VPN",
  daysSuffix: "day refund",
  refundWindowMissing: "Refund window — ask the provider",
  howToCancel: "How to cancel",
  watchOut: "Watch out for",
  reviewSuffix: "review →",
  supportLink: "Provider's official site →",
  stepsH2: "General cancellation flow — 4 steps",
  steps: [
    {
      bold: "Disable auto-renewal.",
      rest: " From the provider's account panel, turn off \"auto-renewal\". This stops future charges.",
    },
    {
      bold: "If you want a refund, open a support request.",
      rest: " Disabling auto-renewal does not give a refund. If you are inside the refund window, contact support (live chat is fast, email is a fallback).",
    },
    {
      bold: "Confirm the refund path for your payment method.",
      rest: " Card → card, PayPal → PayPal; if bought via mobile store, refund goes through Apple/Google.",
    },
    {
      bold: "Track the refund date.",
      rest: " Bank-card refunds: 3-10 business days; PayPal 1-3 business days; mobile-store refunds 1-7 business days.",
    },
  ],
  faqsH2: "Frequently asked questions",
  tipTitle: "Practical tip",
  tipBody:
    "The safest move after subscribing is to disable auto-renewal on day one. That keeps you out of the renewal trap; at the end of the term you can either pick up a new discount or switch providers.",
  relatedTitle: "Related pages",
  relatedCalculator: "Total-cost calculator",
  relatedFreeVsPaid: "Free vs paid VPN",
  relatedLegal: "Legal notice",
};

export function getRefundContent(locale: string) {
  const isEn = locale === "en";
  const isDe = locale === "de";
  return {
    strings: isEn ? EN_STRINGS : isDe ? DE_STRINGS : TR_STRINGS,
    cancelInfo: isEn ? EN_CANCEL_INFO : isDe ? DE_CANCEL_INFO : TR_CANCEL_INFO,
    faqs: isEn ? EN_FAQS : isDe ? DE_FAQS : TR_FAQS,
  };
}

export function RefundBody({ locale }: { locale: string }) {
  const freeVsPaidHref =
    locale === "en"
      ? "/guide/free-vs-paid-vpn"
      : locale === "de"
        ? "/ratgeber/kostenloses-vs-kostenpflichtiges-vpn"
        : "/guide/ucretsiz-vs-ucretli-vpn";
  const products = rankedProducts(locale as Locale);
  const { strings, cancelInfo, faqs } = getRefundContent(locale);

  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          {strings.breadcrumbHome}
        </Link>{" "}
        › <span className="text-ink-strong">{strings.breadcrumbHere}</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <RefreshCcw className="size-3" /> {strings.badge}
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          {strings.h1}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{strings.lede}</p>
      </header>

      <DataDisclaimer />
      <AffiliateNotice className="mt-4" variant="surface" />

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              {strings.warningTitle}
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {strings.warningBody}
            </p>
          </div>
        </div>
      </Card>

      <nav aria-label={strings.navAria} className="mt-8 flex flex-wrap gap-2">
        {products.map((p: Product) => (
          <a
            key={p.slug}
            href={`#${p.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
          >
            <VPNLogo slug={p.slug} size={16} />
            {p.brand}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-6">
        {products.map((p) => {
          const info = cancelInfo[p.slug];
          if (!info) return null;
          return (
            <Card key={p.slug} id={p.slug} className="p-6 scroll-mt-20">
              <div className="flex items-start gap-3 flex-wrap">
                <VPNLogo slug={p.slug} size={48} />
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-ink-strong">
                    {p.brand}
                  </h2>
                  <p className="text-xs text-ink-muted">
                    {locale === "de"
                      ? DE_POSITIONING[p.slug] ?? p.positioning
                      : p.positioning}
                  </p>
                </div>
                <Badge variant="brand">
                  <Clock className="size-3" />{" "}
                  {p.highlights.moneyBackDays
                    ? `${p.highlights.moneyBackDays} ${strings.daysSuffix}`
                    : strings.refundWindowMissing}
                </Badge>
              </div>

              <div className="mt-4 rounded-lg bg-surface-subtle/50 p-3 text-sm">
                <p className="font-medium text-ink-strong">
                  {strings.howToCancel}
                </p>
                <p className="mt-1 text-ink leading-relaxed">{info.via}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-ink-strong">
                  {strings.watchOut}
                </p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {info.pitfalls.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink">
                      <AlertTriangle className="size-4 text-accent-600 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Link
                  href={`/reviews/${p.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 hover:border-brand-300"
                >
                  {p.brand} {strings.reviewSuffix}
                </Link>
                <ProviderLink
                  href={providerOutboundHref({ slug: p.slug, fallbackUrl: p.pricingUrl, hasAffiliate: p.hasAffiliate, source: "refund-guide" })}
                  target="_blank"
                  rel={providerOutboundRel(p.slug, p.hasAffiliate)}
                  provider={p.slug}
                  placement="refund-guide"
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 hover:border-brand-300"
                >
                  {strings.supportLink}
                </ProviderLink>
              </div>
            </Card>
          );
        })}
      </div>

      <article className="mt-12 prose prose-stone max-w-none">
        <h2>{strings.stepsH2}</h2>
        <ol>
          {strings.steps.map((s, i) => (
            <li key={i}>
              <strong>{s.bold}</strong>
              {s.rest}
            </li>
          ))}
        </ol>

        <h2>{strings.faqsH2}</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </article>

      <Card className="mt-12 p-6 bg-brand-50/40">
        <h2 className="text-lg font-semibold text-ink-strong flex items-center gap-2">
          <Check className="size-5 text-brand-600" /> {strings.tipTitle}
        </h2>
        <p className="mt-3 text-ink leading-relaxed text-sm">
          {strings.tipBody}
        </p>
      </Card>

      <section className="mt-12 rounded-xl border border-border bg-brand-50/30 p-6 text-center">
        <p className="text-sm text-ink-muted">{strings.relatedTitle}</p>
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
          >
            {strings.relatedCalculator}
          </Link>
          <Link
            href={freeVsPaidHref}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
          >
            {strings.relatedFreeVsPaid}
          </Link>
          <Link
            href="/legal-notice"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-base px-3 py-1 text-sm hover:border-brand-300"
          >
            {strings.relatedLegal}
          </Link>
        </div>
      </section>
    </>
  );
}
