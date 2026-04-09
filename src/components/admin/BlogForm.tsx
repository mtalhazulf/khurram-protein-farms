"use client";

import { useState } from "react";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/types";
import { ImageUpload } from "./ImageUpload";
import { SubmitButton } from "./SubmitButton";

export function BlogForm({
  post,
  action,
}: {
  post?: BlogPost;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            name="title"
            value={title}
            onChange={(e) => {
              const v = e.target.value;
              setTitle(v);
              if (!slugTouched) setSlug(slugify(v));
            }}
            required
            className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={2}
          className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none resize-none"
        />
        <p className="text-xs text-kp-black/50 mt-1">
          Shown on the blog listing card.
        </p>
      </div>

      <ImageUpload
        name="cover_image"
        label="Cover image"
        currentUrl={post?.cover_image_url}
        hint={post?.cover_image_url ? "Leave empty to keep the current image." : undefined}
      />

      <div>
        <label className="block text-sm font-medium mb-2">
          Content (Markdown)
        </label>
        <textarea
          name="content"
          defaultValue={post?.content ?? ""}
          rows={22}
          required
          className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm font-mono focus:border-kp-green-700 focus:outline-none resize-vertical"
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            name="is_published"
            type="checkbox"
            defaultChecked={post ? post.is_published === 1 : false}
          />
          Published
        </label>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton pendingText={post ? "Saving…" : "Creating…"}>
          {post ? "Save changes" : "Create post"}
        </SubmitButton>
      </div>
    </form>
  );
}
