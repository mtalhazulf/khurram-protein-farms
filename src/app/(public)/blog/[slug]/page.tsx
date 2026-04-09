import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at ?? post.created_at,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <article className="bg-kp-white">
      <header className="bg-kp-green-800 text-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-kp-gold-400 text-sm mb-8 hover:text-kp-gold-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
          <p className="text-kp-gold-400 uppercase tracking-[0.3em] text-xs mb-4 font-medium">
            {formatDate(post.published_at ?? post.created_at)}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-white/80 text-lg leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {post.cover_image_url && (
        <div className="mx-auto max-w-5xl px-6 -mt-16 md:-mt-20 relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div
          className="kp-prose mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
