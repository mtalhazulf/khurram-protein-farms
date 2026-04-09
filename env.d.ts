// Ambient Cloudflare bindings for OpenNext runtime.
// Keep in sync with wrangler.toml.

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    R2: R2Bucket;
    NEXT_INC_CACHE_KV: KVNamespace;
    R2_PUBLIC_URL: string;
  }
}

export {};
