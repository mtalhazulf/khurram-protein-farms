# Khurram Proteins

Premium portfolio site for **Khurram Proteins** — a poultry farming and
wholesale egg supply business based in Lahore, Pakistan (founded 1983).
Built as a Next.js 16 app running entirely on Cloudflare (D1 + R2 + Pages).

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | Cloudflare D1 (SQLite) |
| Image storage | Cloudflare R2 |
| Auth | D1-backed sessions + bcrypt |
| Runtime / package manager | [Bun](https://bun.sh) |
| Deployment | Cloudflare Pages via `@opennextjs/cloudflare` |

Zero external dependencies beyond Cloudflare's free tier.

## Prerequisites

- [Bun](https://bun.sh) 1.1+ (`curl -fsSL https://bun.sh/install | bash`)
- A Cloudflare account (free tier is enough)

All tooling — dev server, type checks, Wrangler, OpenNext — runs through
Bun. You don't need Node or npm installed.

## Getting started

```bash
bun install
```

### Local development

1. Create the D1 database, R2 bucket and KV namespace:

   ```bash
   bunx wrangler d1 create khurram-proteins-db
   bunx wrangler r2 bucket create khurram-proteins-images
   bunx wrangler kv namespace create NEXT_INC_CACHE_KV
   ```

2. Paste the returned IDs into `wrangler.toml`.

3. Apply the schema and seed data to the local D1:

   ```bash
   bun run db:local
   ```

4. Generate a bcrypt hash for your admin password and update the
   `password_hash` column in `admin_users` (or edit
   `migrations/0002_seed.sql` before running `db:local`):

   ```bash
   bun run hash:password -- 'YourNewAdminPassword'
   ```

   Default seed user is `admin@khurramproteins.com` with the password
   `changeme` — **change it before deploying**.

5. Start the dev server:

   ```bash
   bun run dev
   ```

   Visit `http://localhost:3000`. Admin panel lives at `/admin/login`.

### Deploy to Cloudflare

```bash
bun run db:remote     # apply migrations to the remote D1
bun run deploy        # build with OpenNext and deploy to Cloudflare Pages
```

## Everyday commands

| Command | What it does |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Start Next.js dev server |
| `bun run build` | Production build |
| `bun run lint` | Lint with Next's ESLint config |
| `bun run preview` | Build via OpenNext and run the Workers preview |
| `bun run deploy` | Build + deploy to Cloudflare |
| `bun run db:local` | Apply migrations to the local D1 |
| `bun run db:remote` | Apply migrations to the remote D1 |
| `bun run hash:password -- <pw>` | Print a bcrypt hash for the admin seed |
| `bun run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.toml` |

## Project layout

```
src/
├── app/
│   ├── (public)/            # Public marketing site
│   │   ├── page.tsx         # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── gallery/
│   │   ├── blog/
│   │   └── contact/
│   ├── admin/
│   │   ├── login/           # Login (outside dashboard layout)
│   │   ├── (dashboard)/     # Authenticated admin shell
│   │   │   ├── page.tsx     # Dashboard
│   │   │   ├── site-settings/
│   │   │   ├── services/
│   │   │   ├── gallery/
│   │   │   ├── blog/
│   │   │   ├── about/
│   │   │   └── contacts/
│   │   └── actions.ts       # Server actions for all admin CRUD
│   └── api/
│       ├── auth/            # login / logout
│       ├── contact/         # Public contact form
│       └── upload/          # Admin image upload
├── components/
│   ├── public/              # Navbar, Footer, Hero, ServiceCard, ...
│   └── admin/               # Sidebar, LoginForm, BlogForm
├── lib/
│   ├── db.ts                # D1 query helpers
│   ├── r2.ts                # R2 upload/delete helpers
│   ├── auth.ts              # Session + bcrypt
│   ├── markdown.ts          # marked wrapper
│   └── utils.ts             # slugify, formatDate, cn, ...
├── middleware.ts            # Protects /admin/* by checking session cookie
└── types/index.ts           # Table interfaces
scripts/
└── hash-password.ts         # Bun script to bcrypt-hash a password
migrations/
├── 0001_initial.sql         # Schema
└── 0002_seed.sql            # Default admin + initial content
```

## Admin panel

All admin routes live under `/admin`. The root layout
(`src/app/admin/layout.tsx`) is a thin passthrough; the authenticated
shell with the sidebar lives in the `(dashboard)` route group so the
login page can opt out cleanly.

- `/admin/login` — password login
- `/admin` — dashboard with stats and recent messages
- `/admin/site-settings` — hero, phone, email, social links, SEO
- `/admin/services` — CRUD services
- `/admin/gallery` — upload images to R2, set category, delete
- `/admin/blog` — list / create / edit / publish posts
- `/admin/about` — edit founder content and image
- `/admin/contacts` — view / mark-read / delete form submissions

Auth flow:

1. `POST /api/auth/login` with email & password
2. `bcrypt.compare` against `admin_users.password_hash`
3. Insert a row into `admin_sessions`, set the `kp_session` httpOnly cookie
4. `src/middleware.ts` rejects requests to `/admin/*` without the cookie
5. `getCurrentAdmin()` in server components looks up the session in D1

## Content model

See `migrations/0001_initial.sql` for the schema. Key tables:

- `site_settings` — key/value store for homepage copy and contact details
- `services` — homepage / services page cards
- `about_content` — single row with founder info + full story (markdown)
- `gallery_images` — R2 URLs with category + alt text
- `blog_posts` — markdown content with cover image
- `contact_submissions` — public form captures
- `admin_users`, `admin_sessions` — auth

## Design tokens

See `src/app/globals.css`:

- **Greens:** `--color-kp-green-900` (footer), `-800` (nav/sections),
  `-700`, `-100` (tints)
- **Gold:** `--color-kp-gold-500` (CTAs), `-400` (hover), `-100` (tints)
- **Fonts:** Playfair Display (serif, headings) + DM Sans (body)

## Notes on Bun + Cloudflare Workers

- Bun drives development, type-checking and script execution locally.
- At runtime, the site runs on the **Cloudflare Workers** runtime
  (bundled by `@opennextjs/cloudflare`), not on Bun. That's why we use
  `bcryptjs` (pure JS) instead of `Bun.password` — the latter isn't
  available inside Workers.
- `next/font/google` downloads and inlines fonts at build time, so there
  is no runtime font request.
- Markdown is rendered with `marked` and styled via the `.kp-prose`
  class in `globals.css`. No heavy WYSIWYG dependency.
- Image uploads go directly to R2 via the `R2` binding; URLs are stored
  in D1. When a record is deleted the R2 object is cleaned up too.
- Admin mutations call `revalidatePath()` so published changes show up
  on the public site immediately.
