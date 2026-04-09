# Setup

End-to-end setup for the **Khurram Proteins** Next.js 16 + Cloudflare
site. Everything runs through [Bun](https://bun.sh) — you don't need
Node or npm installed.

The project is already scaffolded on branch
`claude/rebuild-khurram-proteins-site-qJAMh`. Follow the steps below on
your own machine, in order.

---

## 1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

Skip this step if you already have Bun 1.1 or newer (`bun --version`).

## 2. Clone the repo and install dependencies

```bash
git clone <repo-url> khurram-proteins
cd khurram-proteins
git checkout claude/rebuild-khurram-proteins-site-qJAMh
bun install
```

`bun install` reads `package.json` and resolves everything, including
the Next.js / Tailwind v4 / `@opennextjs/cloudflare` / `wrangler` chain.

## 3. Log in to Cloudflare

```bash
bunx wrangler login
```

This opens a browser window and authorises Wrangler against your
Cloudflare account. Any free tier account works.

## 4. Create the three Cloudflare resources

```bash
bunx wrangler d1 create khurram-proteins-db
bunx wrangler r2 bucket create khurram-proteins-images
bunx wrangler kv namespace create NEXT_INC_CACHE_KV
```

What each one is for:

| Resource | Binding | Stores |
| --- | --- | --- |
| D1 | `DB` | admin users & sessions, site settings, services, blog posts, gallery metadata, contact form submissions |
| R2 | `R2` | uploaded images (gallery, blog covers, founder photo); D1 holds the URLs |
| KV | `NEXT_INC_CACHE_KV` | OpenNext's Next.js ISR cache |

Each command prints an ID. **Copy them.**

## 5. Paste the IDs into `wrangler.toml`

Open `wrangler.toml` and fill in the two `<FILL_AFTER_CREATION>`
placeholders:

```toml
[[d1_databases]]
binding = "DB"
database_name = "khurram-proteins-db"
database_id = "paste-d1-id-here"
migrations_dir = "migrations"

[[r2_buckets]]
binding = "R2"
bucket_name = "khurram-proteins-images"

[[kv_namespaces]]
binding = "NEXT_INC_CACHE_KV"
id = "paste-kv-id-here"

[vars]
R2_PUBLIC_URL = "https://images.khurramproteins.com"
```

Also update `R2_PUBLIC_URL` to whatever hostname you intend to serve R2
images from. During development you can paste the bucket's `r2.dev`
URL from the Cloudflare dashboard; for production attach a custom
domain to the bucket.

## 6. Set the admin password

The seed file ships a placeholder bcrypt hash for the password
`changeme`. Replace it before going anywhere near production.

Generate a new hash with the provided Bun script:

```bash
bun run hash:password -- 'YourRealPassword'
```

Copy the `$2a$10$…` hash, open `migrations/0002_seed.sql`, and replace
the hash on the `INSERT INTO admin_users …` line. Optionally also edit
the default email, phone, address, WhatsApp link, SEO fields and
about-page content in the same file.

## 7. Apply migrations to the local D1

```bash
bun run db:local
```

This runs `migrations/0001_initial.sql` (schema) then
`migrations/0002_seed.sql` (default admin + initial content) against
the local D1 that `bun run dev` will use.

## 8. Start the dev server

```bash
bun run dev
```

- Public site: <http://localhost:3000>
- Admin login: <http://localhost:3000/admin/login>

Log in with `admin@khurramproteins.com` and the password you hashed in
step 6. From there you can edit:

- `/admin/site-settings` — hero copy, phone, email, WhatsApp, social, SEO
- `/admin/services` — services grid
- `/admin/gallery` — upload / delete images in R2
- `/admin/blog` — create / edit / publish posts
- `/admin/about` — founder bio, story, image
- `/admin/contacts` — view & manage form submissions

---

## 9. Deploy to Cloudflare

When you're ready to go live:

```bash
bun run db:remote    # apply migrations against the production D1
bun run deploy       # build with OpenNext and deploy to Cloudflare Pages
```

After the first deploy, go to the Cloudflare dashboard and:

1. **R2 public access.** Open the `khurram-proteins-images` bucket and
   either enable public access (giving you an `r2.dev` URL) or attach a
   custom domain. Whatever URL you pick must match `R2_PUBLIC_URL` in
   `wrangler.toml` — redeploy if you change it.
2. **DNS.** Point `khurramproteins.com` at the Pages project.
3. **Check the admin.** Log in on the deployed URL and confirm site
   settings, gallery uploads and blog posts all work end-to-end.

---

## Command reference

| Command | What it does |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Start Next.js dev server on :3000 |
| `bun run build` | Production build |
| `bun run lint` | Lint with Next's ESLint config |
| `bun run preview` | Build via OpenNext and run the Workers preview locally |
| `bun run deploy` | Build + deploy to Cloudflare Pages |
| `bun run db:local` | Apply `0001_initial.sql` + `0002_seed.sql` to the local D1 |
| `bun run db:remote` | Apply the same migrations to the remote D1 |
| `bun run hash:password -- <pw>` | Print a bcrypt hash for the admin seed |
| `bun run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.toml` |

---

## Troubleshooting

**`bun run dev` errors on first D1 query** — you almost certainly
haven't filled in `database_id` in `wrangler.toml` (step 5).

**`bunx wrangler` asks me to log in every command** — run `bunx
wrangler login` once; the session is cached in
`~/.wrangler/config/default.toml`.

**Admin login says "invalid credentials"** — either the hash in
`migrations/0002_seed.sql` wasn't replaced, or you forgot to re-run
`bun run db:local` after editing it. D1 won't re-insert on a second
run because of `INSERT OR IGNORE`; either wipe the local D1
(`.wrangler/state`) or run an `UPDATE admin_users …` statement.

**Gallery images don't load on the public site** — check that
`R2_PUBLIC_URL` points at a hostname that actually serves the bucket
publicly. In dev, Cloudflare's `r2.dev` URL works; in prod you'll
typically want a custom subdomain like `images.khurramproteins.com`.

**`bcrypt` throws inside Workers** — shouldn't happen since we use
`bcryptjs` (pure JS) and `nodejs_compat` is already set in
`wrangler.toml`. If it does, double-check that
`compatibility_flags = ["nodejs_compat"]` is present.

---

## Why Bun for dev but not for runtime

- **Dev / scripts / tooling:** Bun. Fast installs, fast type-checking,
  fast script execution. `bun --bun next dev` runs Next.js on Bun's
  own runtime.
- **Production runtime:** Cloudflare Workers (via
  `@opennextjs/cloudflare`). Not Bun, not Node — the Workers
  JavaScript runtime with `nodejs_compat` shims.

That split is why the codebase uses `bcryptjs` (pure JS, works
everywhere) rather than `Bun.password` (Bun-only, unavailable at
runtime in Workers). Same reason we avoid native Node modules and
heavy Node-only libraries anywhere on the request path.
