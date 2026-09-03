"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  BatteryFull,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Home,
  LockKeyhole,
  LogOut,
  Menu,
  MessageCircle,
  Monitor,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wifi,
  Zap,
} from "lucide-react";

type View = "home" | "tools" | "profile";
type User = { email: string; name: string };

const toolItems = [
  {
    title: "IP adresim",
    description: "Bağlantının dışarıya nasıl göründüğünü kontrol et.",
    icon: Search,
    tone: "blue",
    href: "/tools/my-ip",
  },
  {
    title: "DNS leak testi",
    description: "DNS isteklerinin yanlışlıkla sızıp sızmadığını gör.",
    icon: ShieldCheck,
    tone: "green",
    href: "/tools/dns-leak-test",
  },
  {
    title: "VPN hız testi",
    description: "Bağlantı hızını ve gecikmeyi hızlıca ölç.",
    icon: Zap,
    tone: "amber",
    href: "/tools/vpn-speed-test",
  },
] as const;

export function PhoneApp() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    void fetch("/api/phone-auth", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return;
        const data = (await response.json()) as { user?: User | null };
        setUser(data.user ?? null);
      })
      .catch(() => setError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin."))
      .finally(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setError("Geçerli bir e-posta adresi yazın.");
      return;
    }

    if (password.length < 8) {
      setError("Şifre en az 8 karakter olmalı.");
      return;
    }

    setError("");
    try {
      const response = await fetch("/api/phone-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: authMode, email: normalizedEmail, password }),
      });
      const data = (await response.json()) as { user?: User; error?: string };
      if (!response.ok || !data.user) {
        setError(data.error ?? "İşlem tamamlanamadı. Lütfen tekrar deneyin.");
        return;
      }
      setUser(data.user);
      setPassword("");
      setNotice(authMode === "register" ? "Hesabın oluşturuldu." : "Hoş geldin. Kişisel alanın hazır.");
    } catch {
      setError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/phone-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } finally {
      setUser(null);
      setView("home");
      setNotice("Oturum kapatıldı.");
    }
  }

  function showToolNotice(title: string) {
    setNotice(`${title} yakında bu panelden açılacak.`);
  }

  if (authLoading) {
    return <div className="min-h-screen bg-[#eef3f8] dark:bg-[#09121f]" />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef3f8] px-4 py-6 text-slate-950 dark:bg-[#09121f] dark:text-slate-50 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-40 -top-40 size-[30rem] rounded-full bg-blue-200/45 blur-3xl dark:bg-blue-950/40" />
      <div className="pointer-events-none absolute -bottom-52 -right-32 size-[32rem] rounded-full bg-amber-100/65 blur-3xl dark:bg-cyan-950/25" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-center gap-10 lg:flex-row lg:items-center lg:gap-20">
        <section className="hidden max-w-md lg:block">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold tracking-tight">VPN Advisor</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Private Space</p>
            </div>
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Masaüstü için mobil deneyim
          </p>
          <h1 className="max-w-sm text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-slate-950 dark:text-white">
            Kişisel alanın, telefon hissiyle.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-slate-600 dark:text-slate-400">
            Giriş yaptıktan sonra VPN araçlarına, bağlantı durumuna ve profil ayarlarına tek bir sade ekrandan ulaş.
          </p>

          <div className="mt-9 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <Feature icon={<Monitor className="size-4" />} text="Bilgisayar ekranında ortalanmış telefon arayüzü" />
            <Feature icon={<LockKeyhole className="size-4" />} text="Parola hashlenir, oturum HttpOnly cookie ile korunur" />
            <Feature icon={<Sparkles className="size-4" />} text="Küçük ekranlarda tam genişlikte, dokunmaya uygun kullanım" />
          </div>
        </section>

        <div className="mx-auto w-full max-w-[390px]">
          <div className="rounded-[3rem] bg-slate-950 p-2 shadow-[0_30px_90px_-24px_rgba(15,23,42,0.7)] ring-1 ring-black/10 dark:bg-black dark:ring-white/10">
            <div className="relative min-h-[720px] overflow-hidden rounded-[2.5rem] bg-[#f7f9fc] dark:bg-[#101a29]">
              <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-950 dark:bg-black" />
              <div className="flex items-center justify-between px-7 pb-2 pt-3 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <span>9:41</span>
                <div className="flex items-center gap-1.5" aria-label="Bağlantı ve pil durumu">
                  <Wifi className="size-3" aria-hidden="true" />
                  <BatteryFull className="size-4" aria-hidden="true" />
                </div>
              </div>

              {user ? (
                <Dashboard
                  user={user}
                  view={view}
                  notice={notice}
                  onViewChange={setView}
                  onToolNotice={showToolNotice}
                  onLogout={handleLogout}
                />
              ) : (
                <LoginScreen
                  email={email}
                  password={password}
                  error={error}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  mode={authMode}
                  onModeChange={(mode) => {
                    setAuthMode(mode);
                    setError("");
                  }}
                  onSubmit={handleLogin}
                />
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            {user ? "Oturumun güvenli cookie ile açık kalır." : "Yeni hesap oluşturabilir veya mevcut hesabınla giriş yapabilirsin."}
          </p>
        </div>
      </div>
    </main>
  );
}

function LoginScreen({
  email,
  password,
  error,
  mode,
  onEmailChange,
  onPasswordChange,
  onModeChange,
  onSubmit,
}: {
  email: string;
  password: string;
  error: string;
  mode: "login" | "register";
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onModeChange: (mode: "login" | "register") => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const isRegister = mode === "register";

  return (
    <div className="flex min-h-[668px] flex-col px-7 pb-8 pt-14">
      <div className="flex flex-1 flex-col justify-center">
        <span className="mb-5 flex size-14 items-center justify-center rounded-[1.25rem] bg-blue-600 text-white shadow-lg shadow-blue-600/25">
          <LockKeyhole className="size-6" aria-hidden="true" />
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Private Space</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">{isRegister ? "Hesabını oluştur." : "Tekrar hoş geldin."}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {isRegister ? "Kişisel araçlarını kullanmak için birkaç saniyede kayıt ol." : "Kişisel araçlarını görmek için hesabına giriş yap."}
        </p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">E-posta</span>
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="sen@ornek.com"
              autoComplete="email"
              required
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Şifre</span>
            <input
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="••••••••"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              required
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </label>

          {error ? <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">{error}</p> : null}

          <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300">
            {isRegister ? "Hesap oluştur" : "Giriş yap"} <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
          {isRegister ? "Zaten hesabın var mı?" : "Henüz hesabın yok mu?"}{" "}
          <button type="button" onClick={() => onModeChange(isRegister ? "login" : "register")} className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400">
            {isRegister ? "Giriş yap" : "Kayıt ol"}
          </button>
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-xs leading-5 text-blue-900 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-100">
        <p className="font-semibold">Gerçek hesap oturumu</p>
        <p className="mt-1 opacity-80">Parolan sunucuda hashlenir; tarayıcıya yalnızca HttpOnly oturum cookie&apos;si verilir.</p>
      </div>
    </div>
  );
}

function Dashboard({
  user,
  view,
  notice,
  onViewChange,
  onToolNotice,
  onLogout,
}: {
  user: User;
  view: View;
  notice: string;
  onViewChange: (view: View) => void;
  onToolNotice: (title: string) => void;
  onLogout: () => void | Promise<void>;
}) {
  const firstName = user.name.split(" ")[0] || "arkadaşım";

  return (
    <div className="flex min-h-[668px] flex-col px-5 pb-4 pt-4">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => onViewChange("profile")} className="flex items-center gap-2.5 rounded-xl text-left focus:outline-none focus:ring-4 focus:ring-blue-500/15">
          <span className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">{firstName.slice(0, 1).toUpperCase()}</span>
          <span>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400">Günaydın</span>
            <span className="block max-w-[150px] truncate text-sm font-bold capitalize text-slate-950 dark:text-white">{firstName}</span>
          </span>
        </button>
        <button type="button" onClick={() => onToolNotice("Bildirimler")} aria-label="Bildirimleri aç" className="relative flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <Bell className="size-4" aria-hidden="true" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-blue-600" />
        </button>
      </div>

      <div className="mt-6 flex-1">
        {view === "home" ? <HomeView onViewChange={onViewChange} /> : null}
        {view === "tools" ? <ToolsView /> : null}
        {view === "profile" ? <ProfileView user={user} onLogout={onLogout} /> : null}
      </div>

      {notice ? <div className="fixed bottom-6 left-1/2 z-30 w-[calc(100%-3rem)] max-w-[330px] -translate-x-1/2 rounded-2xl bg-slate-950 px-4 py-3 text-center text-xs font-semibold text-white shadow-2xl dark:bg-white dark:text-slate-950" role="status">{notice}</div> : null}

      <nav className="mt-5 grid grid-cols-3 rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/5" aria-label="Panel navigasyonu">
        <NavButton active={view === "home"} icon={<Home className="size-4" />} label="Ana sayfa" onClick={() => onViewChange("home")} />
        <NavButton active={view === "tools"} icon={<Menu className="size-4" />} label="Araçlar" onClick={() => onViewChange("tools")} />
        <NavButton active={view === "profile"} icon={<UserRound className="size-4" />} label="Profil" onClick={() => onViewChange("profile")} />
      </nav>
    </div>
  );
}

function HomeView({ onViewChange }: { onViewChange: (view: View) => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white shadow-lg shadow-blue-600/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-blue-100">Bağlantı durumu</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(110,231,183,0.18)]" />
              <p className="text-lg font-bold">Güvendesin</p>
            </div>
          </div>
          <ShieldCheck className="size-6 text-blue-100" aria-hidden="true" />
        </div>
        <p className="mt-5 text-xs leading-5 text-blue-100">Son kontrol: şimdi · Kişisel alan aktif</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="IP adresi" value="Kontrol et" icon={<Search className="size-4" />} onClick={() => onViewChange("tools")} />
        <StatCard label="Son tarama" value="Temiz" icon={<CheckCircle2 className="size-4" />} onClick={() => onViewChange("tools")} />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300"><Sparkles className="size-4" aria-hidden="true" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-950 dark:text-white">Bugünün önerisi</p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Bağlantı sinyallerini görmek için hızlı bir kontrol çalıştır.</p>
            <button type="button" onClick={() => onViewChange("tools")} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400">Araçları gör <ChevronRight className="size-3.5" aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Son aktiviteler</p><CalendarDays className="size-4 text-slate-400" aria-hidden="true" /></div>
        <div className="space-y-2">
          <ActivityRow icon={<ShieldCheck className="size-4" />} title="Güvenlik kontrolü" detail="Az önce" />
          <ActivityRow icon={<MessageCircle className="size-4" />} title="Hoş geldin mesajı" detail="Bugün" />
        </div>
      </div>
    </div>
  );
}

function ToolsView() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400">Araçlar</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">Bağlantını kontrol et.</h2>
      <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">İhtiyacın olan kontrolü seç ve sonucu tek ekranda gör.</p>
      <div className="mt-6 space-y-3">
        {toolItems.map((item) => {
          const Icon = item.icon;
          return (
            <a href={item.href} key={item.title} className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-white/5">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${item.tone === "blue" ? "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300" : item.tone === "green" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300" : "bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300"}`}><Icon className="size-4" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-slate-950 dark:text-white">{item.title}</span><span className="mt-0.5 block text-xs leading-4 text-slate-500 dark:text-slate-400">{item.description}</span></span>
              <ChevronRight className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ProfileView({ user, onLogout }: { user: User; onLogout: () => void | Promise<void> }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400">Profil</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">Hesap ayarları</h2>
      <div className="mt-6 flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">{user.name.slice(0, 1).toUpperCase()}</span>
        <div className="min-w-0"><p className="truncate text-sm font-bold capitalize text-slate-950 dark:text-white">{user.name}</p><p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p></div>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
        <ProfileRow icon={<Settings2 className="size-4" />} label="Uygulama ayarları" />
        <ProfileRow icon={<LockKeyhole className="size-4" />} label="Gizlilik ve güvenlik" />
        <ProfileRow icon={<LogOut className="size-4" />} label="Oturumu kapat" onClick={() => void onLogout()} danger />
      </div>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-300">{icon}</span><span>{text}</span></div>;
}

function StatCard({ label, value, icon, onClick }: { label: string; value: string; icon: React.ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"><span className="flex size-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">{icon}</span><span className="mt-4 block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span><span className="mt-1 block text-sm font-bold text-slate-950 dark:text-white">{value}</span></button>;
}

function ActivityRow({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 dark:bg-white/5"><span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">{icon}</span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">{title}</span><span className="mt-0.5 block text-[11px] text-slate-500 dark:text-slate-400">{detail}</span></span><CheckCircle2 className="size-4 text-emerald-500" aria-hidden="true" /></div>;
}

function NavButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-current={active ? "page" : undefined} className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-semibold transition ${active ? "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>{icon}{label}</button>;
}

function ProfileRow({ icon, label, onClick, danger = false }: { icon: React.ReactNode; label: string; onClick?: () => void; danger?: boolean }) {
  return <button type="button" onClick={onClick} className={`flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3.5 text-left text-sm last:border-0 dark:border-white/5 ${danger ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-200"}`}><span>{icon}</span><span className="flex-1 font-medium">{label}</span>{danger ? null : <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />}</button>;
}
