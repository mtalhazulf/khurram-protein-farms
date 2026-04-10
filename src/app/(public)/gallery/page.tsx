import type { Metadata } from "next";
import Link from "next/link";
import { getGalleryImages } from "@/lib/db";
import { GalleryLightbox } from "@/components/public/GalleryLightbox";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Inside Khurram Proteins — photos from the farm and operations.",
};

const CATEGORIES = [
  { id: "", label: "All" },
  { id: "farm", label: "Farm" },
  { id: "products", label: "Products" },
  { id: "team", label: "Team" },
  { id: "operations", label: "Operations" },
];

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "";
  const images = await getGalleryImages(category || undefined);

  return (
    <>
      <section className="kp-page-header">
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="kp-label text-kp-gold-400 kp-animate-fade-up">
            Gallery
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 kp-animate-fade-up kp-stagger-2">
            Life at the farm
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed kp-animate-fade-up kp-stagger-3">
            A look at our facilities, our people, and the birds we care for
            every day.
          </p>
        </div>
      </section>

      <section className="bg-kp-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <Link
                  key={cat.id}
                  href={cat.id ? `/gallery?category=${cat.id}` : "/gallery"}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-kp-green-800 text-white shadow-md shadow-kp-green-900/15"
                      : "bg-kp-green-100 text-kp-green-800 hover:bg-kp-green-100/70 hover:shadow-sm active:scale-95"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {images.length === 0 ? (
            <div className="text-center py-20 text-kp-black/50 text-sm">
              No images uploaded yet for this category.
            </div>
          ) : (
            <GalleryLightbox images={images} />
          )}
        </div>
      </section>
    </>
  );
}
