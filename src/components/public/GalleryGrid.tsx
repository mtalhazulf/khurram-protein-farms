import type { GalleryImage } from "@/types";

export function GalleryGrid({
  images,
  columns = 4,
}: {
  images: GalleryImage[];
  columns?: 3 | 4;
}) {
  if (images.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-kp-green-100 flex items-center justify-center text-kp-green-700/50 text-xs"
          >
            Image placeholder
          </div>
        ))}
      </div>
    );
  }

  const grid =
    columns === 4
      ? "grid grid-cols-2 md:grid-cols-4 gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";

  return (
    <div className={grid}>
      {images.map((img) => (
        <figure
          key={img.id}
          className="aspect-square rounded-xl overflow-hidden bg-kp-green-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.image_url}
            alt={img.alt_text || "Khurram Proteins"}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </figure>
      ))}
    </div>
  );
}
