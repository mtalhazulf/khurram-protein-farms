"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryImage } from "@/types";

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0)),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <figure
            key={img.id}
            className="kp-gallery-item aspect-square bg-kp-green-100 cursor-pointer group"
            onClick={() => setIndex(i)}
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

      {/* Lightbox overlay */}
      {index !== null && images[index] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm kp-lightbox-overlay"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:bg-white/25 transition-all duration-200 hover:scale-105"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:bg-white/25 transition-all duration-200 hover:scale-105"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:bg-white/25 transition-all duration-200 hover:scale-105"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={index}
            src={images[index].image_url}
            alt={images[index].alt_text || "Khurram Proteins"}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg kp-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption + counter */}
          <div className="absolute bottom-6 text-center text-white/70 text-sm kp-animate-fade-up">
            {images[index].alt_text && (
              <p className="mb-1 font-medium">{images[index].alt_text}</p>
            )}
            <p className="text-xs text-white/40">
              {index + 1} / {images.length}
            </p>
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-6 right-6 text-xs text-white/25 hidden md:block">
            ← → navigate · Esc close
          </div>
        </div>
      )}
    </>
  );
}
