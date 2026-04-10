import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/db";
import { BlogCard } from "@/components/public/BlogCard";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, stories and updates from Khurram Proteins — poultry farming insights from Pakistan.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="kp-page-header">
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="kp-label text-kp-gold-400 kp-animate-fade-up">
            Journal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 kp-animate-fade-up kp-stagger-2">
            Stories from the farm
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed kp-animate-fade-up kp-stagger-3">
            Updates, insights and notes on poultry farming, quality, and the
            business behind Khurram Proteins.
          </p>
        </div>
      </section>

      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {posts.length === 0 ? (
            <p className="text-center text-kp-black/55 py-10">
              No posts published yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
