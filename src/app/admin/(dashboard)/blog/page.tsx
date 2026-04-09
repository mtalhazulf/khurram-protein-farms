import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllPosts } from "@/lib/db";
import { deleteBlogPost } from "@/app/admin/actions";
import { formatDateShort } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBlogListPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-5xl">
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-kp-green-900 mb-1">Blog</h1>
          <p className="text-sm text-kp-black/60">
            Manage blog posts — create, edit and publish.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-kp-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-kp-green-700"
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-kp-black/60 py-10">No posts yet.</p>
      ) : (
        <ul className="bg-white rounded-2xl border border-kp-green-100 divide-y divide-kp-green-100">
          {posts.map((post) => (
            <li
              key={post.id}
              className="px-6 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {post.cover_image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={post.cover_image_url}
                    alt=""
                    className="h-14 w-20 object-cover rounded-md bg-kp-green-100 shrink-0"
                  />
                ) : (
                  <div className="h-14 w-20 bg-kp-green-100 rounded-md shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-kp-green-900 truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-kp-black/60 truncate">
                    /{post.slug} · {formatDateShort(post.updated_at)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    post.is_published
                      ? "bg-kp-green-100 text-kp-green-800"
                      : "bg-kp-gold-100 text-kp-gold-500"
                  }`}
                >
                  {post.is_published ? "Published" : "Draft"}
                </span>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-sm text-kp-green-700 hover:text-kp-gold-500"
                >
                  Edit
                </Link>
                <form action={deleteBlogPost.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
