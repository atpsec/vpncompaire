import { Tag, ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

export function TrBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Ana sayfa
        </Link>{" "}
        › <span className="text-ink-strong">Reklam Açıklaması</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Tag className="size-3" /> Reklam & Gelir Açıklaması
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Reklam Açıklaması
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Son güncelleme: Haziran 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Net açıklama</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {siteConfig.name} gelirini{" "}
              <strong>Google AdSense reklamlarından</strong> ve (programı olan
              sağlayıcılarda) <strong>ortaklık bağlantılarından</strong> elde
              edebilir. Ortaklık komisyonu sıralamayı veya puanları etkilemez.
              Sayfalarda Google tarafından otomatik seçilen reklamlar
              görüntülenebilir.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>Gelir modelimiz nasıl çalışıyor?</h2>
        <p>
          {siteConfig.name} tek gelir kaynağı olarak{" "}
          <strong>Google AdSense</strong> reklamlarını kullanır. Google,
          sayfalarımızda otomatik olarak reklam yerleştirir ve bu reklamların
          gösterimi ya da tıklanması üzerinden bize ödeme yapılır. Bu modelde
          kazanç, ziyaretçi trafiğine ve reklam gösterimine bağlıdır — belirli
          bir VPN&apos;i satın almana bağlı değildir. Kullanıcı verisini
          satmıyoruz.
        </p>

        <h2>VPN bağlantıları ve ortaklık</h2>
        <p>
          &quot;Resmi siteye git&quot; benzeri butonlar ilgili sağlayıcının
          resmi sitesine gider. Programı olan sağlayıcılarda bağlantılar
          ortaklık izleme içerebilir; bu durumda{" "}
          <code>rel=&quot;sponsored nofollow&quot;</code> ile işaretlenir.
          Ortaklık programı olmayan sağlayıcılar (ör. Mullvad) düz resmi URL
          kullanır. Komisyon, editoryal sıralamayı veya puanları{" "}
          <strong>belirlemez</strong>.
        </p>
        <ul>
          <li>
            Gelir kaynakları: Google AdSense + (varsa) sağlayıcı ortaklığı.
          </li>
          <li>
            Sağlayıcılar bize içerik onayı veya sıralama satın alma imkânı
            vermez.
          </li>
          <li>
            Affiliate ilişkisi olmayan seçenekler de metodolojimize göre
            listede kalır.
          </li>
        </ul>

        <h2>Editoryal bağımsızlık</h2>
        <p>
          Reklam geliri;{" "}
          <strong>
            sıralamamızı, içeriğimizi, değerlendirme puanlarımızı veya
            eleştirilerimizi etkilemez
          </strong>
          . Bunu korumak için:
        </p>
        <ul>
          <li>
            Sayfalardaki Google reklamları, içeriğe ve ziyaretçiye göre Google
            tarafından otomatik seçilir. Hangi markanın reklamının
            görüneceğini biz belirlemeyiz; bir reklamın görünmesi o ürünü
            önerdiğimiz anlamına gelmez.
          </li>
          <li>
            Editoryal puanlama, reklam gelirinden tamamen bağımsızdır. Bir
            sağlayıcı bizim sıralamamızı satın alamaz.
          </li>
          <li>
            Sağlayıcıdan içerik kontrolü veya yayın öncesi onay talep
            etmiyoruz. Hiçbir VPN sağlayıcısı yayınlanmadan önce içeriğimizi
            göremez.
          </li>
        </ul>

        <h2>Reklam çerezleri ve kişiselleştirme</h2>
        <p>
          Google AdSense, reklamları kişiselleştirmek için çerez ve benzeri
          teknolojiler kullanabilir. Avrupa Ekonomik Alanı, Birleşik Krallık
          ve İsviçre&apos;deki ziyaretçiler için kişiselleştirilmiş reklam ve
          ölçüm çerezleri yalnızca açık rıza verildiğinde etkinleştirilir.
          Çerez tercihlerini sayfa altındaki onay panelinden yönetebilirsin;
          ayrıntılar için{" "}
          <Link href="/cerez-politikasi">çerez politikamıza</Link> ve{" "}
          <Link href="/gizlilik">gizlilik politikamıza</Link> bakabilirsin.
        </p>

        <h2>İçerik nasıl ortaya çıkıyor?</h2>
        <p>İncelemelerimiz aşağıdaki kaynaklara dayalıdır:</p>
        <ul>
          <li>
            <strong>Resmi sağlayıcı verisi:</strong> Sağlayıcının kendi web
            sitesi, gizlilik politikası, fiyat sayfası — &quot;Son
            kontrol&quot; tarihiyle birlikte.
          </li>
          <li>
            <strong>Üçüncü taraf denetim raporları:</strong> Deloitte,
            Cure53, Securitum gibi tanınmış güvenlik firmalarının kamuya
            açık raporları.
          </li>
          <li>
            <strong>Kendi testlerimiz:</strong> Hız, streaming uyumluluğu,
            kill switch davranışı gibi laboratuvar testleri. Metodolojimiz{" "}
            <Link href="/metodoloji">/metodoloji</Link> sayfasında
            açıklanmıştır.
          </li>
          <li>
            <strong>Açık kaynak kod incelemesi:</strong> İstemcileri açık
            kaynak olan sağlayıcılar için GitHub repolarının
            değerlendirilmesi.
          </li>
        </ul>
        <p>
          Bilgi tarihinden sonra değişmiş olabilir; sağlayıcının resmi
          sitesini her zaman doğrulamanı öneririz.
        </p>

        <h2>Yasal dayanak</h2>
        <p>Bu açıklama aşağıdaki düzenlemelere uygun olarak hazırlanmıştır:</p>
        <ul>
          <li>
            <strong>Google AdSense Program Politikaları</strong>: reklam ve
            içerik şeffaflığı yükümlülükleri.
          </li>
          <li>
            <strong>
              Türkiye Cumhuriyeti Tüketicinin Korunması Hakkında Kanun (6502
              sayılı)
            </strong>{" "}
            ve <strong>Ticari Reklam ve Haksız Ticari Uygulamalar
            Yönetmeliği</strong>: Reklam ilişkilerinin tüketiciye
            gösterilmesi.
          </li>
          <li>
            <strong>EU Digital Services Act</strong>: Online platformlar
            için şeffaflık yükümlülükleri.
          </li>
        </ul>

        <h2>Soruların ya da geri bildirim için</h2>
        <p>
          Şeffaflık politikamız, reklam modelimiz veya içerik yöntemimizle
          ilgili soruların varsa{" "}
          <Link href="/iletisim">iletişim sayfamızdan</Link> bize
          ulaşabilirsin.
        </p>
      </article>

      <Card className="mt-12 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Reklam gelirimiz olmasaydı ne değişirdi?
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Aynı önerileri yapardık. Çünkü sıralamamız reklam gelirine göre
              değil, bağımsız test ve doğrulanabilir kanıta göre belirlenir.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Hatırlatma</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Bu sayfa bir{" "}
              <Link href="/yasal-uyari" className="text-brand-700 underline">
                yasal uyarı
              </Link>{" "}
              değildir; içerik garantisi vermez. Sağlayıcı verileri
              değişebilir; satın alma kararı vermeden önce ilgili VPN
              sağlayıcısının resmi sayfasından güncel bilgiyi doğrulamanı
              öneririz.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

export function EnBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>{" "}
        › <span className="text-ink-strong">Advertising disclosure</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Tag className="size-3" /> Advertising & revenue disclosure
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Advertising disclosure
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: June 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">In plain terms</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {siteConfig.name} earns revenue from{" "}
              <strong>Google AdSense ads</strong> and, where programs exist,{" "}
              <strong>VPN affiliate links</strong>. Affiliate commission does not
              affect rankings or scores. Pages may also display ads selected
              automatically by Google.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>How does our revenue model work?</h2>
        <p>
          {siteConfig.name} uses <strong>Google AdSense</strong> ads as its
          only revenue source. Google places ads automatically on our pages
          and pays us based on ad impressions or clicks. In this model, our
          revenue depends on visitor traffic and ad delivery — not on whether
          you buy any particular VPN. We do not sell user data.
        </p>

        <h2>VPN links and affiliate programs</h2>
        <p>
          Buttons like &quot;Visit official site&quot; on our pages link to the
          VPN provider&apos;s official website. Where an affiliate program is
          active, links may include tracking parameters and are marked with{" "}
          <code>rel=&quot;sponsored nofollow&quot;</code>. Providers without a
          program (e.g. Mullvad) use plain official URLs. Commission{" "}
          <strong>does not determine</strong> our ranking or scores.
        </p>
        <ul>
          <li>
            Revenue sources: Google AdSense + (where available) provider
            affiliate programs.
          </li>
          <li>
            Providers cannot buy placement or pre-approve our editorial content.
          </li>
          <li>
            Non-affiliate options remain in our lists based on methodology, not
            monetisation.
          </li>
        </ul>

        <h2>Editorial independence</h2>
        <p>
          Ad revenue{" "}
          <strong>
            does not influence our ranking, content, scoring or criticism
          </strong>
          . To preserve this:
        </p>
        <ul>
          <li>
            Google ads on our pages are selected automatically by Google based
            on the content and the visitor. We do not decide which brand&apos;s
            ad appears; an ad appearing does not mean we endorse that product.
          </li>
          <li>
            Editorial scoring is entirely independent of ad revenue. A
            provider cannot buy a place in our ranking.
          </li>
          <li>
            We do not ask providers for content control or pre-publish
            approval. No VPN provider sees our content before publication.
          </li>
        </ul>

        <h2>Ad cookies and personalisation</h2>
        <p>
          Google AdSense may use cookies and similar technologies to
          personalise ads. For visitors in the European Economic Area, the
          United Kingdom and Switzerland, personalised advertising and
          measurement cookies are enabled only with explicit consent. You can
          manage your cookie preferences from the consent panel at the bottom
          of the page; for details, see our{" "}
          <Link href="/cerez-politikasi">cookie policy</Link> and{" "}
          <Link href="/gizlilik">privacy policy</Link>.
        </p>

        <h2>How is the content produced?</h2>
        <p>Our reviews are based on the following sources:</p>
        <ul>
          <li>
            <strong>Official provider data:</strong> the provider&apos;s
            website, privacy policy and pricing page — together with a
            &quot;Last checked&quot; date.
          </li>
          <li>
            <strong>Third-party audit reports:</strong> publicly available
            reports from firms like Deloitte, Cure53 or Securitum.
          </li>
          <li>
            <strong>Our own tests:</strong> lab-style tests of speed,
            streaming compatibility and kill-switch behaviour. The
            methodology is described on the{" "}
            <Link href="/metodoloji">methodology page</Link>.
          </li>
          <li>
            <strong>Open-source review:</strong> for providers whose
            clients are open source, we review the GitHub repositories.
          </li>
        </ul>
        <p>
          Information may have changed since publication; we always
          recommend verifying the provider&apos;s official site.
        </p>

        <h2>Legal basis</h2>
        <p>This disclosure is aligned with the following regulations:</p>
        <ul>
          <li>
            <strong>Google AdSense Program Policies</strong>: transparency
            obligations for ads and content.
          </li>
          <li>
            <strong>
              Türkiye&apos;s Consumer Protection Law (no. 6502)
            </strong>{" "}
            and{" "}
            <strong>
              Commercial Advertising and Unfair Commercial Practices
              Regulation
            </strong>
            : disclosure of advertising relationships to the consumer.
          </li>
          <li>
            <strong>EU Digital Services Act</strong>: transparency
            obligations for online platforms.
          </li>
        </ul>

        <h2>For questions or feedback</h2>
        <p>
          If you have questions about our transparency policy, advertising
          model or content methodology, get in touch via the{" "}
          <Link href="/iletisim">contact page</Link>.
        </p>
      </article>

      <Card className="mt-12 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              What would change without our ad revenue?
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              We would make the same recommendations. Our ranking is set by
              independent testing and verifiable evidence, not by ad revenue.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Reminder</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              This page is not a{" "}
              <Link href="/yasal-uyari" className="text-brand-700 underline">
                legal notice
              </Link>{" "}
              and provides no content guarantee. Provider data may change;
              before making a purchase, verify current details on the VPN
              provider&apos;s official page.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

export function DeBody() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Startseite
        </Link>{" "}
        › <span className="text-ink-strong">Werbehinweis</span>
      </p>

      <header className="mt-6">
        <Badge variant="brand">
          <Tag className="size-3" /> Werbe- & Einnahmenhinweis
        </Badge>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
          Werbehinweis
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Zuletzt aktualisiert: Juni 2026
        </p>
      </header>

      <Card className="mt-8 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <Tag className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">In einfachen Worten</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {siteConfig.name} erzielt Einnahmen aus{" "}
              <strong>Google-AdSense-Anzeigen</strong> und, wo Programme
              bestehen, aus <strong>VPN-Affiliate-Links</strong>.
              Affiliate-Provisionen beeinflussen Rankings oder Bewertungen
              nicht. Auf den Seiten können außerdem automatisch von Google
              ausgewählte Anzeigen erscheinen.
            </p>
          </div>
        </div>
      </Card>

      <article className="mt-10 prose prose-stone max-w-none">
        <h2>Wie funktioniert unser Einnahmenmodell?</h2>
        <p>
          {siteConfig.name} nutzt <strong>Google AdSense</strong>-Anzeigen als
          Einnahmequelle. Google platziert Anzeigen automatisch auf unseren
          Seiten und zahlt uns basierend auf Anzeigenimpressionen oder Klicks.
          In diesem Modell hängen unsere Einnahmen vom Besucherverkehr und der
          Anzeigenauslieferung ab — nicht davon, ob Sie ein bestimmtes VPN
          kaufen. Wir verkaufen keine Nutzerdaten.
        </p>

        <h2>VPN-Links und Affiliate-Programme</h2>
        <p>
          Schaltflächen wie &quot;Zur offiziellen Website&quot; auf unseren
          Seiten verlinken zur offiziellen Website des VPN-Anbieters. Wo ein
          Affiliate-Programm aktiv ist, können Links Tracking-Parameter
          enthalten und sind mit{" "}
          <code>rel=&quot;sponsored nofollow&quot;</code> gekennzeichnet.
          Anbieter ohne Programm (z. B. Mullvad) nutzen einfache offizielle
          URLs. Provisionen{" "}
          <strong>bestimmen nicht</strong> unsere Rankings oder Bewertungen.
        </p>
        <ul>
          <li>
            Einnahmequellen: Google AdSense + (wo verfügbar)
            Anbieter-Affiliate-Programme.
          </li>
          <li>
            Anbieter können keine Platzierung kaufen oder unsere redaktionellen
            Inhalte vorab freigeben.
          </li>
          <li>
            Nicht-affiliate Optionen bleiben in unseren Listen auf Basis der
            Methodik, nicht der Monetarisierung.
          </li>
        </ul>

        <h2>Redaktionelle Unabhängigkeit</h2>
        <p>
          Werbeeinnahmen{" "}
          <strong>
            beeinflussen unser Ranking, unsere Inhalte, Bewertungen oder
            Kritik nicht
          </strong>
          . Um dies zu wahren:
        </p>
        <ul>
          <li>
            Google-Anzeigen auf unseren Seiten werden automatisch von Google
            basierend auf Inhalt und Besucher ausgewählt. Wir entscheiden
            nicht, welche Marke erscheint; eine Anzeige bedeutet nicht, dass
            wir das Produkt empfehlen.
          </li>
          <li>
            Redaktionelle Bewertungen sind vollständig unabhängig von
            Werbeeinnahmen. Ein Anbieter kann keinen Platz in unserem Ranking
            kaufen.
          </li>
          <li>
            Wir verlangen keine Inhaltskontrolle oder Vorab-Freigabe von
            Anbietern. Kein VPN-Anbieter sieht unsere Inhalte vor
            Veröffentlichung.
          </li>
        </ul>

        <h2>Werbe-Cookies und Personalisierung</h2>
        <p>
          Google AdSense kann Cookies und ähnliche Technologien nutzen, um
          Anzeigen zu personalisieren. Für Besucher im Europäischen
          Wirtschaftsraum, im Vereinigten Königreich und in der Schweiz werden
          personalisierte Werbe- und Mess-Cookies nur mit ausdrücklicher
          Einwilligung aktiviert. Sie können Ihre Cookie-Einstellungen über
          das Einwilligungsfeld am Seitenende verwalten; Details finden Sie in
          unserer{" "}
          <Link href="/cerez-politikasi">Cookie-Richtlinie</Link> und{" "}
          <Link href="/gizlilik">Datenschutzerklärung</Link>.
        </p>

        <h2>Wie entstehen die Inhalte?</h2>
        <p>Unsere Reviews basieren auf folgenden Quellen:</p>
        <ul>
          <li>
            <strong>Offizielle Anbieterdaten:</strong> Website, Datenschutz-
            richtlinie und Preisseite des Anbieters — zusammen mit einem
            Datum &quot;Zuletzt geprüft&quot;.
          </li>
          <li>
            <strong>Audit-Berichte Dritter:</strong> öffentlich verfügbare
            Berichte von Firmen wie Deloitte, Cure53 oder Securitum.
          </li>
          <li>
            <strong>Eigene Tests:</strong> Labortests zu Geschwindigkeit,
            Streaming-Kompatibilität und Kill-Switch-Verhalten. Die Methodik
            ist auf der{" "}
            <Link href="/metodoloji">Methodik-Seite</Link> beschrieben.
          </li>
          <li>
            <strong>Open-Source-Prüfung:</strong> für Anbieter mit Open-Source-
            Clients prüfen wir die GitHub-Repositories.
          </li>
        </ul>
        <p>
          Informationen können sich seit der Veröffentlichung geändert haben;
          wir empfehlen stets, die offizielle Website des Anbieters zu prüfen.
        </p>

        <h2>Rechtliche Grundlage</h2>
        <p>Dieser Hinweis orientiert sich an folgenden Vorschriften:</p>
        <ul>
          <li>
            <strong>Google-AdSense-Programmrichtlinien</strong>:
            Transparenzpflichten für Anzeigen und Inhalte.
          </li>
          <li>
            <strong>
              Türkisches Verbraucherschutzgesetz (Nr. 6502)
            </strong>{" "}
            und{" "}
            <strong>
              Verordnung über kommerzielle Werbung und unlautere
              Geschäftspraktiken
            </strong>
            : Offenlegung von Werbebeziehungen gegenüber Verbrauchern.
          </li>
          <li>
            <strong>EU Digital Services Act</strong>: Transparenzpflichten für
            Online-Plattformen.
          </li>
        </ul>

        <h2>Fragen oder Feedback</h2>
        <p>
          Bei Fragen zu unserer Transparenzpolitik, unserem Werbemodell oder
          unserer Inhaltsmethodik erreichen Sie uns über die{" "}
          <Link href="/iletisim">Kontaktseite</Link>.
        </p>
      </article>

      <Card className="mt-12 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">
              Was würde sich ohne unsere Werbeeinnahmen ändern?
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Wir würden dieselben Empfehlungen geben. Unser Ranking wird durch
              unabhängige Tests und überprüfbare Belege bestimmt, nicht durch
              Werbeeinnahmen.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-6 p-6 border-accent-300 bg-accent-50/40">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-accent-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-ink-strong">Erinnerung</p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              Diese Seite ist kein{" "}
              <Link href="/yasal-uyari" className="text-brand-700 underline">
                rechtlicher Hinweis
              </Link>{" "}
              und gibt keine Inhaltsgarantie. Anbieterdaten können sich ändern;
              prüfen Sie vor einem Kauf die aktuellen Angaben auf der
              offiziellen Seite des VPN-Anbieters.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
