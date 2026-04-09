import { getCloudflareContext } from "@opennextjs/cloudflare";
import type {
  AboutContent,
  BlogPost,
  ContactSubmission,
  GalleryImage,
  Service,
  SiteSettingsMap,
} from "@/types";

/**
 * Returns the D1 database binding. Works in server components, API routes,
 * and server actions via the OpenNext Cloudflare adapter.
 */
export async function getDB(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 binding 'DB' is not configured");
  }
  return env.DB as unknown as D1Database;
}

// ---------- Site Settings ----------

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  try {
    const db = await getDB();
    const { results } = await db
      .prepare("SELECT key, value FROM site_settings")
      .all<{ key: string; value: string }>();
    const map: SiteSettingsMap = {};
    for (const row of results ?? []) {
      map[row.key] = row.value;
    }
    return map;
  } catch {
    return {};
  }
}

export async function setSiteSetting(key: string, value: string): Promise<void> {
  const db = await getDB();
  await db
    .prepare(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
    )
    .bind(key, value)
    .run();
}

// ---------- Services ----------

export async function getActiveServices(): Promise<Service[]> {
  try {
    const db = await getDB();
    const { results } = await db
      .prepare(
        "SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
      )
      .all<Service>();
    return results ?? [];
  } catch {
    return [];
  }
}

export async function getAllServices(): Promise<Service[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT * FROM services ORDER BY display_order ASC, id ASC")
    .all<Service>();
  return results ?? [];
}

export async function getServiceById(id: number): Promise<Service | null> {
  const db = await getDB();
  const row = await db
    .prepare("SELECT * FROM services WHERE id = ?")
    .bind(id)
    .first<Service>();
  return row ?? null;
}

// ---------- About ----------

export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const db = await getDB();
    const row = await db
      .prepare("SELECT * FROM about_content WHERE id = 1")
      .first<AboutContent>();
    return row ?? null;
  } catch {
    return null;
  }
}

// ---------- Gallery ----------

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  try {
    const db = await getDB();
    const stmt = category
      ? db
          .prepare(
            "SELECT * FROM gallery_images WHERE category = ? ORDER BY display_order ASC, id DESC"
          )
          .bind(category)
      : db.prepare(
          "SELECT * FROM gallery_images ORDER BY display_order ASC, id DESC"
        );
    const { results } = await stmt.all<GalleryImage>();
    return results ?? [];
  } catch {
    return [];
  }
}

export async function getGalleryPreview(limit = 4): Promise<GalleryImage[]> {
  try {
    const db = await getDB();
    const { results } = await db
      .prepare(
        "SELECT * FROM gallery_images ORDER BY display_order ASC, id DESC LIMIT ?"
      )
      .bind(limit)
      .all<GalleryImage>();
    return results ?? [];
  } catch {
    return [];
  }
}

// ---------- Blog ----------

export async function getPublishedPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const db = await getDB();
    const query = limit
      ? db
          .prepare(
            "SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC LIMIT ?"
          )
          .bind(limit)
      : db.prepare(
          "SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC"
        );
    const { results } = await query.all<BlogPost>();
    return results ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = await getDB();
    const row = await db
      .prepare("SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1")
      .bind(slug)
      .first<BlogPost>();
    return row ?? null;
  } catch {
    return null;
  }
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  const db = await getDB();
  const row = await db
    .prepare("SELECT * FROM blog_posts WHERE id = ?")
    .bind(id)
    .first<BlogPost>();
  return row ?? null;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT * FROM blog_posts ORDER BY created_at DESC")
    .all<BlogPost>();
  return results ?? [];
}

// ---------- Contact ----------

export async function createContactSubmission(
  name: string,
  email: string,
  message: string
): Promise<void> {
  const db = await getDB();
  await db
    .prepare(
      "INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)"
    )
    .bind(name, email, message)
    .run();
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC")
    .all<ContactSubmission>();
  return results ?? [];
}

export async function countUnreadContacts(): Promise<number> {
  try {
    const db = await getDB();
    const row = await db
      .prepare("SELECT COUNT(*) AS n FROM contact_submissions WHERE is_read = 0")
      .first<{ n: number }>();
    return row?.n ?? 0;
  } catch {
    return 0;
  }
}

// ---------- Dashboard stats ----------

export async function getDashboardStats() {
  try {
    const db = await getDB();
    const [posts, images, contacts, unread] = await Promise.all([
      db.prepare("SELECT COUNT(*) AS n FROM blog_posts").first<{ n: number }>(),
      db.prepare("SELECT COUNT(*) AS n FROM gallery_images").first<{ n: number }>(),
      db.prepare("SELECT COUNT(*) AS n FROM contact_submissions").first<{ n: number }>(),
      db
        .prepare("SELECT COUNT(*) AS n FROM contact_submissions WHERE is_read = 0")
        .first<{ n: number }>(),
    ]);
    return {
      posts: posts?.n ?? 0,
      images: images?.n ?? 0,
      contacts: contacts?.n ?? 0,
      unread: unread?.n ?? 0,
    };
  } catch {
    return { posts: 0, images: 0, contacts: 0, unread: 0 };
  }
}
