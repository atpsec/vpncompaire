import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  createUser,
  deleteSession,
  findUser,
  getSessionUser,
  normalizeEmail,
  PHONE_SESSION_COOKIE,
  PHONE_SESSION_TTL_SECONDS,
  validateCredentials,
  verifyUser,
} from "@/lib/phone-auth";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(data: unknown, init?: ResponseInit): NextResponse {
  return NextResponse.json(data, {
    ...init,
    headers: {
      "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
      ...(init?.headers ?? {}),
    },
  });
}

function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: PHONE_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: PHONE_SESSION_TTL_SECONDS,
  });
}

function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: PHONE_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const user = await getSessionUser(cookieStore.get(PHONE_SESSION_COOKIE)?.value);
  return json({ user });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: { action?: unknown; email?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const action = body.action === "register" ? "register" : body.action === "logout" ? "logout" : "login";
  const limit = await rateLimit(
    `phone-auth:${action}:${clientIpFrom(request.headers)}`,
    action === "register" ? 8 : 20,
    action === "register" ? 60 * 60 : 15 * 60,
  );
  if (!limit.allowed) return json({ error: "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin." }, { status: 429 });

  const cookieStore = await cookies();
  const currentToken = cookieStore.get(PHONE_SESSION_COOKIE)?.value;

  if (action === "logout") {
    await deleteSession(currentToken);
    const response = json({ user: null });
    clearSessionCookie(response);
    return response;
  }

  const email = normalizeEmail(body.email);
  const password = typeof body.password === "string" ? body.password : "";
  const credentialsError = validateCredentials(email, password);
  if (credentialsError) return json({ error: credentialsError }, { status: 400 });

  if (action === "register" && await findUser(email)) {
    return json({ error: "Bu e-posta adresi zaten kayıtlı." }, { status: 409 });
  }

  const user = action === "register" ? await createUser(email, password) : await verifyUser(email, password);
  if (!user) {
    return json({ error: action === "register" ? "Hesap oluşturulamadı. Lütfen tekrar deneyin." : "E-posta veya şifre hatalı." }, { status: action === "register" ? 500 : 401 });
  }

  const token = await createSession(user.id, user.email);
  const response = json({ user });
  setSessionCookie(response, token);
  return response;
}
