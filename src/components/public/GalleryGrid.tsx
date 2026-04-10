import type { GalleryImage } from "@/types";
import { ZoomIn } from "lucide-react";

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
            className="aspect-square rounded-xl bg-kp-green-100 flex items-center justify-center text-kp-green-700/50 text-xs animate-pulse"
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
          className="kp-gallery-item aspect-square bg-kp-green-100 group cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.image_url}
            alt={img.alt_text || "Khurram Proteins"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Hover zoom icon */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="h-10 w-10 rounded-full bg-white/90 text-kp-green-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
              <ZoomIn className="h-4 w-4" />
            </div>
          </div>
          {/* Caption on hover */}
          {img.alt_text && (
            <div className="absolute bottom-0 left-0 right-0 z-10 p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {img.alt_text}
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}
