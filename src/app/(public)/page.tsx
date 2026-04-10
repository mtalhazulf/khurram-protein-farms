import Link from "next/link";
import { Hero } from "@/components/public/Hero";
import { ServiceCard } from "@/components/public/ServiceCard";
import { StatsBar } from "@/components/public/StatsBar";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { BlogCard } from "@/components/public/BlogCard";
import { CTABand } from "@/components/public/CTABand";
import { Testimonials } from "@/components/public/Testimonials";
import { QualityBadges } from "@/components/public/QualityBadges";
import {
  getSiteSettings,
  getActiveServices,
  getAboutContent,
  getGalleryPreview,
  getPublishedPosts,
} from "@/lib/db";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

const FALLBACK_SERVICES = [
  {
    id: 1,
    title: "Wholesale Supply",
    description:
      "Bulk egg orders for restaurants, cafes, bakeries and supermarkets at competitive wholesale rates.",
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
      "Consistent on-time delivery across the Lahore region and beyond, seven days a week.",
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
      "Every batch monitored and tested to meet agricultural quality and food safety standards.",
    icon_name: "shield-check",
    display_order: 3,
    is_active: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: 4,
    title: "Cold Chain Storage",
    description:
      "Temperature-controlled storage facilities ensuring freshness from farm to your kitchen.",
    icon_name: "thermometer",
    display_order: 4,
    is_active: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: 5,
    title: "Long-term Partnerships",
    description:
      "Dedicated account management and flexible contracts built for lasting business relationships.",
    icon_name: "handshake",
    display_order: 5,
    is_active: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: 6,
    title: "Sustainable Farming",
    description:
      "Eco-friendly practices across our operations — responsible farming for a better future.",
    icon_name: "leaf",
    display_order: 6,
    is_active: 1,
    created_at: "",
    updated_at: "",
  },
];

export default async function HomePage() {
  const [settings, services, about, galleryPreview, posts] = await Promise.all([
    getSiteSettings(),
    getActiveServices(),
    getAboutContent(),
    getGalleryPreview(4),
    getPublishedPosts(3),
  ]);

  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

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

      {/* Stats bar */}
      <StatsBar />

      {/* Services strip */}
      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="kp-label">What we do</p>
            <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
              Built around your business
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Quality badges */}
      <QualityBadges />

      {/* About preview */}
      <section className="bg-kp-green-100/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="aspect-4/5 rounded-3xl bg-kp-green-100 overflow-hidden shadow-xl group">
            {about?.founder_image_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={about.founder_image_url}
                alt={about.founder_name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-kp-green-700/50 text-sm">
                Founder photo placeholder
              </div>
            )}
          </div>
          <div>
            <p className="kp-label">Our story</p>
            <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900 mb-6 leading-tight">
              Four decades of trust in Pakistan&apos;s poultry industry
            </h2>
            <p className="text-kp-black/70 mb-4 leading-relaxed">
              Founded in 1983 and led by{" "}
              <strong className="text-kp-green-900">
                {about?.founder_name ?? "Dr. Malik Khurram Shahzad Khokhar"}
              </strong>
              , Khurram Proteins has grown from a single farm to one of
              Lahore&apos;s most trusted wholesale egg suppliers — built on
              consistency, quality and long-term partnerships that span
              generations.
            </p>
            <p className="text-kp-black/70 mb-8 leading-relaxed">
              {about?.short_bio ??
                "Committed to providing premium quality products at fair wholesale prices, serving 500+ businesses across Pakistan."}
            </p>
            <Link href="/about" className="kp-link">
              Read the full story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Gallery preview */}
      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="kp-label">Gallery</p>
              <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
                Inside our farm
              </h2>
            </div>
            <Link href="/gallery" className="kp-link">
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
                <p className="kp-label">Journal</p>
                <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
                  Latest from the farm
                </h2>
              </div>
              <Link href="/blog" className="kp-link">
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
