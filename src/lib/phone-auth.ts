import "server-only";

import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { env } from "@/env";
import { hasKvRest, kvRestCommand } from "@/lib/kv-rest";

export const PHONE_SESSION_COOKIE = "vpn_advisor_phone_session";
export const PHONE_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

const MAX_STORE_BYTES = 5 * 1024 * 1024;
const PASSWORD_HASH_BYTES = 64;
const persistentStorePath = env.PHONE_AUTH_STORE_PATH
  ? path.isAbsolute(env.PHONE_AUTH_STORE_PATH)
    ? env.PHONE_AUTH_STORE_PATH
    : path.join(/* turbopackIgnore: true */ process.cwd(), env.PHONE_AUTH_STORE_PATH)
  : path.join(/* turbopackIgnore: true */ process.cwd(), ".runtime", "phone-auth.json");

type StoredUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

type StoredSession = {
  userId: string;
  email: string;
  expiresAt: number;
};

type AuthStore = {
  users: Record<string, StoredUser>;
  sessions: Record<string, StoredSession>;
};

export type PhoneUser = {
  id: string;
  email: string;
  name: string;
};

let fileQueue: Promise<unknown> = Promise.resolve();

function withFileStore<T>(task: () => Promise<T>): Promise<T> {
  const next = fileQueue.then(task, task);
  fileQueue = next.then(() => undefined, () => undefined);
  return next;
}

function emptyStore(): AuthStore {
  return { users: {}, sessions: {} };
}

function sanitizeStore(value: unknown): AuthStore {
  if (!value || typeof value !== "object") return emptyStore();
  const candidate = value as { users?: unknown; sessions?: unknown };
  const users: Record<string, StoredUser> = {};
  const sessions: Record<string, StoredSession> = {};

  if (candidate.users && typeof candidate.users === "object") {
    for (const [key, value] of Object.entries(candidate.users)) {
      if (!value || typeof value !== "object") continue;
      const user = value as Partial<StoredUser>;
      if (
        typeof key === "string" &&
        typeof user.id === "string" &&
        typeof user.email === "string" &&
        typeof user.name === "string" &&
        typeof user.passwordHash === "string" &&
        typeof user.createdAt === "string"
      ) {
        users[key] = {
          id: user.id,
          email: user.email,
          name: user.name,
          passwordHash: user.passwordHash,
          createdAt: user.createdAt,
        };
      }
    }
  }

  if (candidate.sessions && typeof candidate.sessions === "object") {
    for (const [key, value] of Object.entries(candidate.sessions)) {
      if (!value || typeof value !== "object") continue;
      const session = value as Partial<StoredSession>;
      const expiresAt = session.expiresAt;
      if (
        typeof key === "string" &&
        typeof session.userId === "string" &&
        typeof session.email === "string" &&
        typeof expiresAt === "number" &&
        Number.isSafeInteger(expiresAt) &&
        expiresAt > 0
      ) {
        sessions[key] = { userId: session.userId, email: session.email, expiresAt };
      }
    }
  }

  return { users, sessions };
}

async function readFileStore(): Promise<AuthStore> {
  try {
    const stats = await fsPromises.stat(persistentStorePath);
    if (stats.size > MAX_STORE_BYTES) throw new Error("phone auth store is too large");
    return sanitizeStore(JSON.parse(await fsPromises.readFile(persistentStorePath, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyStore();
    throw error;
  }
}

async function writeFileStore(store: AuthStore): Promise<void> {
  const directory = path.dirname(persistentStorePath);
  const temporaryPath = `${persistentStorePath}.${process.pid}.${Date.now()}.tmp`;
  await fsPromises.mkdir(directory, { recursive: true, mode: 0o700 });
  try {
    await fsPromises.writeFile(temporaryPath, JSON.stringify(store), { encoding: "utf8", mode: 0o600 });
    await fsPromises.rename(temporaryPath, persistentStorePath);
  } finally {
    await fsPromises.unlink(temporaryPath).catch(() => undefined);
  }
}

function emailKey(email: string): string {
  return createHash("sha256").update(email).digest("hex");
}

function sessionKey(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function userKey(email: string): string {
  return `phone-auth:user:${emailKey(email)}`;
}

function redisSessionKey(token: string): string {
  return `phone-auth:session:${sessionKey(token)}`;
}

function toPublicUser(user: StoredUser): PhoneUser {
  return { id: user.id, email: user.email, name: user.name };
}

function newId(): string {
  return randomBytes(16).toString("hex");
}

function passwordHash(password: string): string {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, PASSWORD_HASH_BYTES, {
    N: 16_384,
    r: 8,
    p: 1,
    maxmem: 32 * 1024 * 1024,
  });
  return `scrypt$16384$8$1$${salt.toString("base64url")}$${derived.toString("base64url")}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [algorithm, nValue, rValue, pValue, saltValue, hashValue] = stored.split("$");
  if (algorithm !== "scrypt" || !nValue || !rValue || !pValue || !saltValue || !hashValue) return false;
  const n = Number(nValue);
  const r = Number(rValue);
  const p = Number(pValue);
  if (![n, r, p].every((value) => Number.isSafeInteger(value) && value > 0)) return false;

  try {
    const expected = Buffer.from(hashValue, "base64url");
    const actual = scryptSync(password, Buffer.from(saltValue, "base64url"), expected.length, {
      N: n,
      r,
      p,
      maxmem: 32 * 1024 * 1024,
    });
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

function userNameFromEmail(email: string): string {
  const localPart = email.split("@")[0] ?? "user";
  return localPart.replace(/[._-]+/g, " ").trim() || "user";
}

export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function validateCredentials(email: string, password: unknown): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return "Geçerli bir e-posta adresi yazın.";
  }
  if (typeof password !== "string" || password.length < 8 || password.length > 128) {
    return "Şifre 8 ile 128 karakter arasında olmalı.";
  }
  return null;
}

async function getUserFromKv(email: string): Promise<StoredUser | null> {
  const value = await kvRestCommand(["get", userKey(email)]);
  return value && typeof value === "string" ? (JSON.parse(value) as StoredUser) : null;
}

async function getUserFromFile(email: string): Promise<StoredUser | null> {
  return withFileStore(async () => {
    const store = await readFileStore();
    return store.users[emailKey(email)] ?? null;
  });
}

export async function findUser(email: string): Promise<StoredUser | null> {
  if (hasKvRest()) {
    try {
      return await getUserFromKv(email);
    } catch {
      // Fall back to the local durable store if the shared store is unavailable.
    }
  }
  try {
    return await getUserFromFile(email);
  } catch {
    return null;
  }
}

export async function createUser(email: string, password: string): Promise<PhoneUser | null> {
  const user: StoredUser = {
    id: newId(),
    email,
    name: userNameFromEmail(email),
    passwordHash: passwordHash(password),
    createdAt: new Date().toISOString(),
  };

  if (hasKvRest()) {
    try {
      const created = await kvRestCommand(["set", userKey(email), JSON.stringify(user), "nx"]);
      if (created !== "OK") return null;
      return toPublicUser(user);
    } catch {
      // Fall back to the local durable store if the shared store is unavailable.
    }
  }

  return withFileStore(async () => {
    const store = await readFileStore();
    const key = emailKey(email);
    if (store.users[key]) return null;
    store.users[key] = user;
    await writeFileStore(store);
    return toPublicUser(user);
  });
}

export async function verifyUser(email: string, password: string): Promise<PhoneUser | null> {
  const user = await findUser(email);
  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  return toPublicUser(user);
}

export async function createSession(userId: string, email: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const session: StoredSession = {
    userId,
    email,
    expiresAt: Date.now() + PHONE_SESSION_TTL_SECONDS * 1000,
  };

  if (hasKvRest()) {
    try {
      await kvRestCommand([
        "set",
        redisSessionKey(token),
        JSON.stringify(session),
        "ex",
        String(PHONE_SESSION_TTL_SECONDS),
      ]);
      return token;
    } catch {
      // Fall back to the local durable store if the shared store is unavailable.
    }
  }

  await withFileStore(async () => {
    const store = await readFileStore();
    store.sessions[sessionKey(token)] = session;
    await writeFileStore(store);
  });
  return token;
}

export async function getSessionUser(token: string | undefined): Promise<PhoneUser | null> {
  if (!token) return null;
  let session: StoredSession | null = null;

  if (hasKvRest()) {
    try {
      const value = await kvRestCommand(["get", redisSessionKey(token)]);
      session = value && typeof value === "string" ? (JSON.parse(value) as StoredSession) : null;
    } catch {
      // Fall back to the local durable store if the shared store is unavailable.
    }
  }

  if (!session) {
    try {
      session = await withFileStore(async () => {
        const store = await readFileStore();
        const storedSession = store.sessions[sessionKey(token)] ?? null;
        if (storedSession && storedSession.expiresAt <= Date.now()) {
          delete store.sessions[sessionKey(token)];
          await writeFileStore(store);
          return null;
        }
        return storedSession;
      });
    } catch {
      return null;
    }
  }

  if (!session || session.expiresAt <= Date.now()) return null;

  let user: StoredUser | null = null;
  if (hasKvRest()) {
    try {
      user = await getUserFromKv(session.email);
    } catch {
      user = null;
    }
  }

  if (!user) {
    try {
      user = await withFileStore(async () => {
        const store = await readFileStore();
        return Object.values(store.users).find((candidate) => candidate.id === session?.userId) ?? null;
      });
    } catch {
      return null;
    }
  }

  return user ? toPublicUser(user) : null;
}

export async function deleteSession(token: string | undefined): Promise<void> {
  if (!token) return;
  if (hasKvRest()) {
    try {
      await kvRestCommand(["del", redisSessionKey(token)]);
      return;
    } catch {
      // Try the local durable store as a fallback.
    }
  }
  await withFileStore(async () => {
    const store = await readFileStore();
    delete store.sessions[sessionKey(token)];
    await writeFileStore(store);
  });
}
