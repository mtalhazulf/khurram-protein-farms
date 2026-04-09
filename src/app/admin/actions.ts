"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDB, setSiteSetting } from "@/lib/db";
import { deleteFromR2, uploadToR2 } from "@/lib/r2";
import { slugify } from "@/lib/utils";

// ---------- Site Settings ----------

const SETTING_KEYS = [
  "hero_title",
  "hero_subtitle",
  "hero_cta_text",
  "phone",
  "email",
  "address",
  "whatsapp_link",
  "facebook_url",
  "instagram_url",
  "youtube_url",
  "footer_text",
  "meta_title",
  "meta_description",
];

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  for (const key of SETTING_KEYS) {
    const value = formData.get(key);
    if (typeof value === "string") {
      await setSiteSetting(key, value);
    }
  }
  revalidatePath("/", "layout");
  revalidatePath("/admin/site-settings");
}

// ---------- Services ----------

export async function createService(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const icon_name = String(formData.get("icon_name") ?? "").trim() || null;
  const display_order = Number(formData.get("display_order") ?? 0);
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  if (!title || !description) return;

  const db = await getDB();
  await db
    .prepare(
      "INSERT INTO services (title, description, icon_name, display_order, is_active) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(title, description, icon_name, display_order, is_active)
    .run();

  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function updateService(id: number, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const icon_name = String(formData.get("icon_name") ?? "").trim() || null;
  const display_order = Number(formData.get("display_order") ?? 0);
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  const db = await getDB();
  await db
    .prepare(
      `UPDATE services
         SET title = ?, description = ?, icon_name = ?, display_order = ?, is_active = ?, updated_at = datetime('now')
         WHERE id = ?`
    )
    .bind(title, description, icon_name, display_order, is_active, id)
    .run();

  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteService(id: number, _formData?: FormData) {
  await requireAdmin();
  const db = await getDB();
  await db.prepare("DELETE FROM services WHERE id = ?").bind(id).run();
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
}

// ---------- About ----------

export async function updateAbout(formData: FormData) {
  await requireAdmin();
  const founder_name = String(formData.get("founder_name") ?? "").trim();
  const founder_title = String(formData.get("founder_title") ?? "").trim();
  const short_bio = String(formData.get("short_bio") ?? "");
  const full_story = String(formData.get("full_story") ?? "");
  const mission_statement = String(formData.get("mission_statement") ?? "");

  const db = await getDB();
  await db
    .prepare(
      `UPDATE about_content
         SET founder_name = ?, founder_title = ?, short_bio = ?, full_story = ?, mission_statement = ?, updated_at = datetime('now')
         WHERE id = 1`
    )
    .bind(founder_name, founder_title, short_bio, full_story, mission_statement)
    .run();

  // Also handle founder image upload if provided
  const image = formData.get("founder_image");
  if (image instanceof File && image.size > 0) {
    // Delete previous
    const current = await db
      .prepare("SELECT founder_image_url FROM about_content WHERE id = 1")
      .first<{ founder_image_url: string | null }>();
    const prevKey = extractR2Key(current?.founder_image_url ?? null);
    if (prevKey) await deleteFromR2(prevKey);

    const { url } = await uploadToR2(image, "about");
    await db
      .prepare("UPDATE about_content SET founder_image_url = ? WHERE id = 1")
      .bind(url)
      .run();
  }

  revalidatePath("/about");
  revalidatePath("/");
  revalidatePath("/admin/about");
}

// ---------- Gallery ----------

export async function uploadGalleryImage(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  const alt_text = String(formData.get("alt_text") ?? "");
  const category = String(formData.get("category") ?? "general");
  const display_order = Number(formData.get("display_order") ?? 0);

  if (!(file instanceof File) || file.size === 0) return;

  const { key, url } = await uploadToR2(file, "gallery");

  const db = await getDB();
  await db
    .prepare(
      "INSERT INTO gallery_images (image_url, r2_key, alt_text, category, display_order) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(url, key, alt_text, category, display_order)
    .run();

  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImage(id: number, _formData?: FormData) {
  await requireAdmin();
  const db = await getDB();
  const row = await db
    .prepare("SELECT r2_key FROM gallery_images WHERE id = ?")
    .bind(id)
    .first<{ r2_key: string | null }>();
  if (row?.r2_key) await deleteFromR2(row.r2_key);
  await db.prepare("DELETE FROM gallery_images WHERE id = ?").bind(id).run();

  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

// ---------- Blog ----------

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "");
  const content = String(formData.get("content") ?? "");
  const is_published = formData.get("is_published") === "on" ? 1 : 0;

  if (!title || !content) return;
  if (!slug) slug = slugify(title);

  // Handle cover image
  let cover_image_url: string | null = null;
  let cover_image_r2_key: string | null = null;
  const cover = formData.get("cover_image");
  if (cover instanceof File && cover.size > 0) {
    const uploaded = await uploadToR2(cover, "blog");
    cover_image_url = uploaded.url;
    cover_image_r2_key = uploaded.key;
  }

  const db = await getDB();
  const published_at = is_published ? new Date().toISOString() : null;

  const result = await db
    .prepare(
      `INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, cover_image_r2_key, is_published, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       RETURNING id`
    )
    .bind(
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      cover_image_r2_key,
      is_published,
      published_at
    )
    .first<{ id: number }>();

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${result?.id ?? ""}`);
}

export async function updateBlogPost(id: number, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "");
  const content = String(formData.get("content") ?? "");
  const is_published = formData.get("is_published") === "on" ? 1 : 0;

  if (!slug) slug = slugify(title);

  const db = await getDB();

  // Handle cover image replacement
  const cover = formData.get("cover_image");
  if (cover instanceof File && cover.size > 0) {
    const prev = await db
      .prepare("SELECT cover_image_r2_key FROM blog_posts WHERE id = ?")
      .bind(id)
      .first<{ cover_image_r2_key: string | null }>();
    if (prev?.cover_image_r2_key) await deleteFromR2(prev.cover_image_r2_key);

    const { url, key } = await uploadToR2(cover, "blog");
    await db
      .prepare(
        "UPDATE blog_posts SET cover_image_url = ?, cover_image_r2_key = ? WHERE id = ?"
      )
      .bind(url, key, id)
      .run();
  }

  // Update published_at when toggling publish state on
  const current = await db
    .prepare("SELECT is_published, published_at FROM blog_posts WHERE id = ?")
    .bind(id)
    .first<{ is_published: number; published_at: string | null }>();

  const nextPublishedAt =
    is_published && !current?.published_at
      ? new Date().toISOString()
      : current?.published_at ?? null;

  await db
    .prepare(
      `UPDATE blog_posts
         SET title = ?, slug = ?, excerpt = ?, content = ?, is_published = ?, published_at = ?, updated_at = datetime('now')
         WHERE id = ?`
    )
    .bind(title, slug, excerpt, content, is_published, nextPublishedAt, id)
    .run();

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(id: number, _formData?: FormData) {
  await requireAdmin();
  const db = await getDB();
  const row = await db
    .prepare("SELECT cover_image_r2_key FROM blog_posts WHERE id = ?")
    .bind(id)
    .first<{ cover_image_r2_key: string | null }>();
  if (row?.cover_image_r2_key) await deleteFromR2(row.cover_image_r2_key);
  await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

// ---------- Contacts ----------

export async function markContactRead(id: number, _formData?: FormData) {
  await requireAdmin();
  const db = await getDB();
  await db
    .prepare("UPDATE contact_submissions SET is_read = 1 WHERE id = ?")
    .bind(id)
    .run();
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteContact(id: number, _formData?: FormData) {
  await requireAdmin();
  const db = await getDB();
  await db
    .prepare("DELETE FROM contact_submissions WHERE id = ?")
    .bind(id)
    .run();
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

// ---------- Helpers ----------

function extractR2Key(url: string | null): string | null {
  if (!url) return null;
  // Best-effort: extract the path segment after the public base URL
  const match = url.match(
    /https?:\/\/[^/]+\/(gallery|blog|about|misc)\/[^/]+$/
  );
  if (match) return url.substring(url.indexOf(match[1]));
  return null;
}
