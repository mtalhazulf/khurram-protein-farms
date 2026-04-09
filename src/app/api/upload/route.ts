import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { uploadToR2 } from "@/lib/r2";

// General-purpose image upload endpoint for the admin panel.
// Most CRUD uploads go through server actions (see src/app/admin/actions.ts),
// but this is exposed for client-side components that need a direct JSON response.

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") ?? "misc") as
      | "gallery"
      | "blog"
      | "about"
      | "misc";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    const { key, url } = await uploadToR2(file, folder);
    return NextResponse.json({ key, url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
