import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getDB } from "./db";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "./auth-constants";
import type { AdminSession, AdminUser } from "@/types";

/**
 * Verify an email/password pair against the admin_users table.
 * Returns the admin user if successful, null otherwise.
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const db = await getDB();
  const user = await db
    .prepare("SELECT * FROM admin_users WHERE email = ? LIMIT 1")
    .bind(email.trim().toLowerCase())
    .first<AdminUser>();

  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return user;
}

/**
 * Create a new session for the given admin user and set the session cookie.
 */
export async function createSession(adminId: number): Promise<string> {
  const db = await getDB();
  const token = crypto.randomUUID();
  const expiresAt = new Date(
    Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  ).toISOString();

  await db
    .prepare(
      "INSERT INTO admin_sessions (id, admin_id, expires_at) VALUES (?, ?, ?)"
    )
    .bind(token, adminId, expiresAt)
    .run();

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return token;
}

/**
 * Returns the current admin user based on the session cookie, or null.
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = await getDB();
  const session = await db
    .prepare(
      "SELECT * FROM admin_sessions WHERE id = ? AND datetime(expires_at) > datetime('now') LIMIT 1"
    )
    .bind(token)
    .first<AdminSession>();

  if (!session) return null;

  const admin = await db
    .prepare("SELECT * FROM admin_users WHERE id = ? LIMIT 1")
    .bind(session.admin_id)
    .first<AdminUser>();

  return admin ?? null;
}

/**
 * Require an admin — throws a redirect to /admin/login if not authenticated.
 * Use at the top of admin server components and actions.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}

/**
 * Destroy the current session (logout).
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      const db = await getDB();
      await db
        .prepare("DELETE FROM admin_sessions WHERE id = ?")
        .bind(token)
        .run();
    } catch {
      // ignore
    }
  }
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Hash a password with bcrypt. Useful in scripts and the /admin/password route.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
