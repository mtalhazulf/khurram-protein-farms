import type { Metadata } from "next";
import Link from "next/link";
import { getGalleryImages } from "@/lib/db";

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
      <section className="bg-kp-green-800 text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-kp-gold-400 uppercase tracking-[0.3em] text-xs mb-4 font-medium">
            Gallery
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            Life at the farm
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
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
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-kp-green-800 text-white"
                      : "bg-kp-green-100 text-kp-green-800 hover:bg-kp-green-100/70"
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <figure
                  key={img.id}
                  className="aspect-square rounded-xl overflow-hidden bg-kp-green-100 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.image_url}
                    alt={img.alt_text || "Khurram Proteins"}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
