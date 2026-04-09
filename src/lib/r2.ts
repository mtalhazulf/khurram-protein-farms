import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getR2(): Promise<R2Bucket> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.R2) {
    throw new Error("R2 binding 'R2' is not configured");
  }
  return env.R2 as unknown as R2Bucket;
}

export async function getR2PublicUrl(): Promise<string> {
  const { env } = await getCloudflareContext({ async: true });
  return (
    (env as { R2_PUBLIC_URL?: string }).R2_PUBLIC_URL ??
    "https://images.khurramproteins.com"
  );
}

/**
 * Upload a file to R2. Returns the R2 key and the public URL.
 */
export async function uploadToR2(
  file: File,
  folder: "gallery" | "blog" | "about" | "misc" = "misc"
): Promise<{ key: string; url: string }> {
  const r2 = await getR2();
  const ext = getExt(file.name, file.type);
  const key = `${folder}/${crypto.randomUUID()}${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  await r2.put(key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type || "application/octet-stream",
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return { key, url: `/api/images/${key}` };
}

export async function deleteFromR2(key: string): Promise<void> {
  if (!key) return;
  try {
    const r2 = await getR2();
    await r2.delete(key);
  } catch {
    // Swallow: we don't want a deletion failure to block the admin action.
  }
}

function getExt(filename: string, mimeType: string): string {
  const fromName = filename.match(/\.[a-zA-Z0-9]+$/)?.[0];
  if (fromName) return fromName.toLowerCase();
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
    "image/svg+xml": ".svg",
  };
  return map[mimeType] ?? "";
}
