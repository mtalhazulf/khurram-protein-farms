import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createBlogPost } from "@/app/admin/actions";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-sm text-kp-black/60 hover:text-kp-green-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to posts
      </Link>

      <header className="mb-10">
        <h1 className="font-serif text-3xl text-kp-green-900 mb-1">
          New blog post
        </h1>
        <p className="text-sm text-kp-black/60">
          Write and publish a new post.
        </p>
      </header>

      <BlogForm action={createBlogPost} />
    </div>
  );
}
