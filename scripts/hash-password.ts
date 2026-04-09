#!/usr/bin/env bun
/**
 * Generate a bcrypt hash for the admin seed user.
 *
 * Usage:
 *   bun run hash:password -- <password>
 *   bun run scripts/hash-password.ts <password>
 *
 * NOTE: We use bcryptjs (pure JS) here rather than Bun's native
 * `Bun.password` because the same hashes must verify at runtime inside
 * Cloudflare Workers, where Bun's native APIs are unavailable.
 */

import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: bun run hash:password -- <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log(hash);
