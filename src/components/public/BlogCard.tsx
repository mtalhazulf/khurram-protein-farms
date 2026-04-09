import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate, truncate } from "@/lib/utils";
import { Clock } from "lucide-react";

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function BlogCard({ post }: { post: BlogPost }) {
  const readTime = estimateReadTime(post.content);

  return (
    <article className="group overflow-hidden rounded-2xl border border-kp-green-100 bg-white transition-all hover:shadow-lg hover:border-kp-gold-500/40">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-kp-green-100">
          {post.cover_image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-kp-green-700/40 text-xs">
              No cover image
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-kp-black/50 mb-3">
            <span className="uppercase tracking-widest text-kp-gold-500 font-medium">
              {formatDate(post.published_at ?? post.created_at)}
            </span>
            <span className="text-kp-black/20">|</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime} min read
            </span>
          </div>
          <h3 className="font-serif text-xl text-kp-green-900 mb-3 group-hover:text-kp-green-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-kp-black/70 leading-relaxed">
            {truncate(post.excerpt ?? "", 140)}
          </p>
        </div>
      </Link>
    </article>
  );
}
