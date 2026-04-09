"use client";

import { useState } from "react";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/types";

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
    <form action={action} encType="multipart/form-data" className="space-y-6">
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

      <div>
        <label className="block text-sm font-medium mb-2">Cover image</label>
        {post?.cover_image_url && (
          <div className="mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt=""
              className="h-32 rounded-lg object-cover border border-kp-green-100"
            />
          </div>
        )}
        <input name="cover_image" type="file" accept="image/*" className="text-sm" />
        {post?.cover_image_url && (
          <p className="text-xs text-kp-black/50 mt-1">
            Leave empty to keep the current image.
          </p>
        )}
      </div>

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
        <button
          type="submit"
          className="rounded-full bg-kp-green-800 px-8 py-3 text-sm font-medium text-white hover:bg-kp-green-700"
        >
          {post ? "Save changes" : "Create post"}
        </button>
      </div>
    </form>
  );
}
