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
| Deployment | Cloudflare Pages via `@opennextjs/cloudflare` |

Zero external dependencies beyond Cloudflare's free tier.

## Getting started

```bash
npm install
```

### Local development

1. Create the D1 database locally and apply migrations:

   ```bash
   npx wrangler d1 create khurram-proteins-db   # update wrangler.toml with the id
   npx wrangler r2 bucket create khurram-proteins-images
   npx wrangler kv namespace create NEXT_INC_CACHE_KV
   npm run db:local
   ```

2. Update `wrangler.toml` with the IDs returned from the commands above.

3. Create an admin user. By default the seed inserts
   `admin@khurramproteins.com` with the password `changeme`. Change it by
   generating a new bcrypt hash:

   ```bash
   node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"
   ```

   Then update the `password_hash` in `migrations/0002_seed.sql` or run an
   `UPDATE` against D1 directly.

4. Start the dev server:

   ```bash
   npm run dev
   ```

### Deploy to Cloudflare

```bash
npm run db:remote     # apply migrations to the remote D1
npm run deploy        # build + deploy via @opennextjs/cloudflare
```

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
│   ├── public/              # Navbar, Footer, Hero, ServiceCard, etc.
│   └── admin/               # Sidebar, LoginForm, BlogForm
├── lib/
│   ├── db.ts                # D1 query helpers
│   ├── r2.ts                # R2 upload/delete helpers
│   ├── auth.ts              # Session + bcrypt
│   ├── markdown.ts          # marked wrapper
│   └── utils.ts             # slugify, formatDate, cn, ...
├── middleware.ts            # Protects /admin/* by checking session cookie
└── types/index.ts           # Table interfaces
migrations/
├── 0001_initial.sql         # Schema
└── 0002_seed.sql            # Default admin + initial content
```

## Admin panel

All admin routes live under `/admin`. The root layout (`src/app/admin/layout.tsx`)
is a passthrough; the authenticated shell with the sidebar lives in the
`(dashboard)` route group so the login page can opt out cleanly.

- `/admin/login` — password login
- `/admin` — dashboard with stats & recent messages
- `/admin/site-settings` — hero, phone, email, social links, SEO
- `/admin/services` — CRUD services
- `/admin/gallery` — upload images to R2, set category, delete
- `/admin/blog` — list / create / edit / publish posts
- `/admin/about` — edit founder content + image
- `/admin/contacts` — view / mark-read / delete form submissions

Auth flow:

1. POST `/api/auth/login` with email & password
2. bcrypt-compare against `admin_users.password_hash`
3. Insert a row into `admin_sessions`, set `kp_session` httpOnly cookie
4. `src/middleware.ts` rejects requests to `/admin/*` without a cookie
5. `getCurrentAdmin()` in server components looks up the session in D1

## Content model

See `migrations/0001_initial.sql` for the schema. Key tables:

- `site_settings` — key/value store for homepage copy and contact details
- `services` — homepage/services page cards
- `about_content` — single row with founder info + full story (markdown)
- `gallery_images` — R2 URLs with category + alt text
- `blog_posts` — markdown content with cover image
- `contact_submissions` — public form captures
- `admin_users`, `admin_sessions` — auth

## Design tokens

See `src/app/globals.css`:

- **Greens:** `--color-kp-green-900` (footer), `-800` (nav/sections), `-700`,
  `-100` (tints)
- **Gold:** `--color-kp-gold-500` (CTAs), `-400` (hover), `-100` (tints)
- **Fonts:** Playfair Display (serif, headings) + DM Sans (body)

## Notes

- Markdown is rendered with `marked` and styled via the `.kp-prose` class in
  `globals.css`. No heavy WYSIWYG dependency.
- Image uploads go directly to R2 via the `R2` binding; URLs are stored in
  D1. When a record is deleted the R2 object is cleaned up too.
- Cache is busted via `revalidatePath()` in the admin server actions so
  published changes show up on the public site immediately.
