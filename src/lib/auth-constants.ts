// Constants shared between server-only `auth.ts` and edge middleware.
// Middleware cannot import `auth.ts` because that module uses "server-only"
// and pulls in bcryptjs / next/headers.

export const SESSION_COOKIE = "kp_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24h
