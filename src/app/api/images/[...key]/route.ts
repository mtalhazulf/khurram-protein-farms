import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  const objectKey = key.join("/");

  if (!objectKey) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const r2 = env.R2 as any;

    if (!r2) {
      console.error("[images] R2 binding not available");
      return NextResponse.json({ error: "R2 not configured" }, { status: 503 });
    }

    const object = await r2.get(objectKey);

    if (!object) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const contentType =
      object.httpMetadata?.contentType ?? "application/octet-stream";

    const arrayBuffer = await object.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[images] Error serving image:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch image" },
      { status: 500 }
    );
  }
}
