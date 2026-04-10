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
      <header className="kp-page-header pb-28! md:pb-32!">
        <div className="relative mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="kp-link text-kp-gold-400! mb-8 inline-flex"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
          <p className="kp-label text-kp-gold-400 kp-animate-fade-up">
            {formatDate(post.published_at ?? post.created_at)}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 leading-tight kp-animate-fade-up kp-stagger-2">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-white/75 text-lg leading-relaxed kp-animate-fade-up kp-stagger-3">
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
            className="w-full aspect-video object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div
          className="kp-prose mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Back link at bottom */}
        <div className="mt-16 pt-8 border-t border-kp-green-100">
          <Link href="/blog" className="kp-link">
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
