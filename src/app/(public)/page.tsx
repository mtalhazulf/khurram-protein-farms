import Link from "next/link";
import { Hero } from "@/components/public/Hero";
import { ServiceCard } from "@/components/public/ServiceCard";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { BlogCard } from "@/components/public/BlogCard";
import { CTABand } from "@/components/public/CTABand";
import {
  getSiteSettings,
  getActiveServices,
  getAboutContent,
  getGalleryPreview,
  getPublishedPosts,
} from "@/lib/db";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, about, galleryPreview, posts] = await Promise.all([
    getSiteSettings(),
    getActiveServices(),
    getAboutContent(),
    getGalleryPreview(4),
    getPublishedPosts(3),
  ]);

  return (
    <>
      <Hero
        title={settings.hero_title ?? "High-quality eggs at wholesale prices"}
        subtitle={
          settings.hero_subtitle ??
          "Supplying restaurants, cafes, bakeries and independent supermarkets across Pakistan with reliable delivery."
        }
        ctaText={settings.hero_cta_text ?? "Discover more"}
      />

      {/* Services strip */}
      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-kp-gold-500 uppercase tracking-[0.3em] text-xs mb-3 font-medium">
              What we do
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
              Built around your business
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.length === 0
              ? [
                  {
                    id: 1,
                    title: "Wholesale Supply",
                    description:
                      "Bulk egg orders for restaurants, cafes, bakeries and supermarkets at competitive rates.",
                    icon_name: "egg",
                    display_order: 1,
                    is_active: 1,
                    created_at: "",
                    updated_at: "",
                  },
                  {
                    id: 2,
                    title: "Reliable Delivery",
                    description:
                      "Consistent on-time delivery across the Lahore region and beyond.",
                    icon_name: "truck",
                    display_order: 2,
                    is_active: 1,
                    created_at: "",
                    updated_at: "",
                  },
                  {
                    id: 3,
                    title: "Quality Assured",
                    description:
                      "Every batch monitored and tested to meet agricultural quality standards.",
                    icon_name: "shield-check",
                    display_order: 3,
                    is_active: 1,
                    created_at: "",
                    updated_at: "",
                  },
                ].map((s) => <ServiceCard key={s.id} service={s} />)
              : services.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="bg-kp-green-100/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="aspect-[4/5] rounded-3xl bg-kp-green-100 overflow-hidden shadow-xl">
            {about?.founder_image_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={about.founder_image_url}
                alt={about.founder_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-kp-green-700/50 text-sm">
                Founder photo placeholder
              </div>
            )}
          </div>
          <div>
            <p className="text-kp-gold-500 uppercase tracking-[0.3em] text-xs mb-3 font-medium">
              Our story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900 mb-6 leading-tight">
              Four decades of trust in Pakistan&apos;s poultry industry
            </h2>
            <p className="text-kp-black/75 mb-4 leading-relaxed">
              Founded in 1983 and led by{" "}
              <strong className="text-kp-green-900">
                {about?.founder_name ?? "Dr. Malik Khurram Shahzad Khokhar"}
              </strong>
              , Khurram Proteins has built its reputation on consistency,
              quality and long-term partnerships.
            </p>
            <p className="text-kp-black/75 mb-8 leading-relaxed">
              {about?.short_bio ??
                "Committed to providing premium quality products at fair wholesale prices."}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-kp-green-800 font-medium text-sm hover:text-kp-gold-500 transition-colors"
            >
              Read the full story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-kp-gold-500 uppercase tracking-[0.3em] text-xs mb-3 font-medium">
                Gallery
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
                Inside our farm
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-kp-green-800 font-medium text-sm hover:text-kp-gold-500 transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <GalleryGrid images={galleryPreview} />
        </div>
      </section>

      {/* CTA Band */}
      <CTABand phone={settings.phone} whatsapp={settings.whatsapp_link} />

      {/* Blog preview */}
      {posts.length > 0 && (
        <section className="bg-kp-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-kp-gold-500 uppercase tracking-[0.3em] text-xs mb-3 font-medium">
                  Journal
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
                  Latest from the farm
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-kp-green-800 font-medium text-sm hover:text-kp-gold-500 transition-colors"
              >
                All posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
