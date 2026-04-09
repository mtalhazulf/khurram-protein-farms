import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/db";
import { updateBlogPost } from "@/app/admin/actions";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  const update = updateBlogPost.bind(null, post.id);

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
          Edit post
        </h1>
        <p className="text-sm text-kp-black/60">
          {post.is_published ? "Published" : "Draft"} · updated{" "}
          {new Date(post.updated_at).toLocaleString()}
        </p>
      </header>

      <BlogForm post={post} action={update} />
    </div>
  );
}
