// TypeScript interfaces mirroring the D1 schema

export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface AdminSession {
  id: string;
  admin_id: number;
  expires_at: string;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}

export type SiteSettingsMap = Record<string, string>;

export interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string | null;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface AboutContent {
  id: number;
  founder_name: string;
  founder_title: string;
  founder_image_url: string | null;
  short_bio: string | null;
  full_story: string | null;
  mission_statement: string | null;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  image_url: string;
  r2_key: string | null;
  alt_text: string;
  category: string;
  display_order: number;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  cover_image_r2_key: string | null;
  is_published: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: number;
  created_at: string;
}
