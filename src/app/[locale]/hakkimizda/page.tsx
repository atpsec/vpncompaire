import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Eye, Scale, FileSearch, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "vpncompaire nedir, neden var, nasıl çalışır. Gönüllü inceleme projesi olarak editoryal bağımsızlık, metodoloji ve değerlendirme yaklaşımı.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana sayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda" },
        ])}
      />

      <Container size="md" className="py-12 sm:py-16">
        <p className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">
            Ana sayfa
          </Link>{" "}
          › <span className="text-ink-strong">Hakkımızda</span>
        </p>

        <header className="mt-6">
          <Badge variant="brand">Hakkımızda</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-ink-strong">
            {siteConfig.name} nedir?
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            VPN dünyası kafa karıştırıcı: yüzlerce sağlayıcı, çelişkili
            incelemeler, agresif pazarlama. {siteConfig.name}, bu karmaşaya
            karşı kişisel bir cevap olarak başlamış{" "}
            <strong>gönüllü bir inceleme projesidir</strong>.
          </p>
        </header>

        <Card className="mt-8 p-6 bg-brand-50/40">
          <p className="text-sm text-ink leading-relaxed">
            <strong className="text-ink-strong">Bu nedir?</strong>{" "}
            {siteConfig.name} bir şirket veya kurum değildir; ticari kayıtlı
            bir tüzel kişiliği yoktur. VPN sağlayıcılarını kendi ihtiyacımız
            için karşılaştırırken oluşan notların kamuya açılmış halidir.
            Affiliate komisyonu altyapı maliyetini karşılar; öneriler bunun
            etkisinde değildir. Detaylar için{" "}
            <Link href="/reklam-aciklamasi">reklam açıklaması</Link> ve{" "}
            <Link href="/yasal-uyari">yasal uyarı</Link> sayfalarımıza
            bakabilirsin.
          </p>
        </Card>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>Yaklaşımımız</h2>
          <p>
            VPN seçerken net, bağımsız ve metodolojik bilgiye ulaşmayı
            kolaylaştırmaya çalışıyoruz. Pazarlama söyleminden değil,
            bağımsız denetim raporları, kamuya açık kaynaklar ve kendi
            test gözlemlerimizden beslenen değerlendirmeler yayınlıyoruz.
            Hiçbir öneri kesin bir garanti taşımaz; nihai karar her zaman
            kullanıcıya aittir.
          </p>

          <h2>Üç temel ilkemiz</h2>
        </article>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <ShieldCheck className="size-7 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Şeffaf metodoloji
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Her VPN aynı altı kritere göre puanlanır. Kriterler ve ağırlıklar
              kamuya açık.
            </p>
          </Card>
          <Card className="p-5">
            <Eye className="size-7 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Editoryal bağımsızlık
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Affiliate komisyonu sıralamayı veya değerlendirmeyi etkilemez.
              Affiliate olmayan seçenekleri de listeleriz.
            </p>
          </Card>
          <Card className="p-5">
            <FileSearch className="size-7 text-brand-600" />
            <h3 className="mt-3 font-semibold text-ink-strong">
              Kanıt önceliği
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              &quot;İyi VPN&quot; demek yetmez — bağımsız denetim, mahkeme
              kararı, audit raporu gibi kanıtlar şart.
            </p>
          </Card>
        </div>

        <article className="mt-12 prose prose-stone max-w-none">
          <h2>Nasıl test ediyoruz?</h2>
          <p>
            Sitedeki her VPN aynı altı objektif kritere göre değerlendirilir:
            gizlilik politikası ve yargı yetkisi, bağımsız denetimler, hız,
            streaming uyumluluğu, fiyat şeffaflığı ve kullanım kolaylığı.
            Detaylar için <Link href="/metodoloji">metodoloji sayfamızı</Link>{" "}
            oku.
          </p>

          <h2>Gelir modelimiz</h2>
          <p>
            Bu siteyi affiliate (ortaklık) komisyonlarıyla finanse ediyoruz.
            Sayfadaki bağlantıdan VPN aldığında biz komisyon kazanırız —
            ödediğin fiyat değişmez. Detayları{" "}
            <Link href="/reklam-aciklamasi">Reklam Açıklaması</Link>{" "}
            sayfasında ayrıntılı açıklıyoruz.
          </p>
          <p>
            <strong>Önemli:</strong> Komisyon farkı sıralamayı etkilemez.
            Affiliate programı olmayan sağlayıcıları (örn. Mullvad) sıralamaya
            ekleriz; en yüksek komisyon veren ürünü en üste koymak gibi bir
            taktik kullanmayız.
          </p>

          <h2>Kim yazıyor?</h2>
          <p>
            {siteConfig.name} kişisel bir proje olarak başlamıştır.
            İçerikler gönüllü katkılarla hazırlanır; profesyonel bir
            yayın ekibi veya editöryel kadro yapısı yoktur. Birincil
            kaynak olarak sağlayıcıların kendi denetim raporları,
            kamuya açık dava belgeleri, açık kaynak depoları ve kendi
            gözlemlerimiz kullanılır. Yanlış veya eksik bulduğun bir
            şey olursa lütfen bildir — düzeltmeleri ciddiye alıyoruz.
          </p>

          <h2>Bu site neden var?</h2>
          <p>
            Ticari VPN incelemeleri çoğunlukla satış odaklı yazılır;
            &quot;en iyi&quot; iddiaları kaynak olmadan tekrarlanır.
            {siteConfig.name} bu boşluğa karşı, hobbiyim olarak başlamış
            ve zamanla daha sistematik hale gelmiş bir referans projedir.
            Amacı tek bir &quot;doğru cevap&quot; vermek değil — kullanıcının
            kendi kararını verebileceği yapılandırılmış bilgi sunmaktır.
          </p>

          <h2>İletişim</h2>
          <p>
            Geri bildirim, düzeltme talebi veya sorularınız için{" "}
            <Link href="/iletisim">iletişim sayfamızı</Link> ziyaret edin.
          </p>
        </article>

        <Card className="mt-12 p-6 bg-brand-50/40 text-center">
          <Mail className="size-6 text-brand-600 mx-auto" />
          <p className="mt-3 font-semibold text-ink-strong">
            Bir hata mı buldun? Eksik bilgi var mı?
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Editoryal düzeltmeleri ciddiye alıyoruz. Bize ulaşman yeterli.
          </p>
          <Link
            href="/iletisim"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
          >
            İletişim sayfasına git →
          </Link>
        </Card>

        <section className="mt-12 flex flex-wrap gap-2 justify-center">
          <Link
            href="/metodoloji"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
          >
            <Scale className="size-3" /> Metodoloji
          </Link>
          <Link
            href="/reklam-aciklamasi"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
          >
            Reklam Açıklaması
          </Link>
          <Link
            href="/gizlilik"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-brand-300"
          >
            Gizlilik Politikası
          </Link>
        </section>
      </Container>
    </>
  );
}
