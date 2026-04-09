import { getGalleryImages } from "@/lib/db";
import { uploadGalleryImage, deleteGalleryImage } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const dynamic = "force-dynamic";

const CATEGORIES = ["general", "farm", "products", "team", "operations"];

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="max-w-6xl">
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-kp-green-900 mb-1">Gallery</h1>
        <p className="text-sm text-kp-black/60">
          Upload and manage images that appear on the public gallery.
        </p>
      </header>

      <section className="bg-white rounded-2xl border border-kp-green-100 p-6 mb-10">
        <h2 className="font-serif text-xl text-kp-green-900 mb-5">
          Upload an image
        </h2>
        <form
          action={uploadGalleryImage}
          className="space-y-4"
        >
          <ImageUpload name="file" label="Image file" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Alt text</label>
              <input
                name="alt_text"
                className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                defaultValue="general"
                className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Display order
              </label>
              <input
                name="display_order"
                type="number"
                defaultValue={0}
                className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton pendingText="Uploading…" className="px-6 py-2.5">
              Upload
            </SubmitButton>
          </div>
        </form>
      </section>

      <section>
        {images.length === 0 ? (
          <p className="text-center text-kp-black/60 py-10">
            No images uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-white rounded-2xl border border-kp-green-100 overflow-hidden"
              >
                <div className="aspect-square bg-kp-green-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.image_url}
                    alt={img.alt_text}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3 text-xs">
                  <p className="text-kp-black/70 truncate mb-1">
                    {img.alt_text || "—"}
                  </p>
                  <p className="text-kp-black/50 uppercase tracking-wider mb-3">
                    {img.category}
                  </p>
                  <DeleteButton
                    action={deleteGalleryImage.bind(null, img.id)}
                    className="w-full justify-center py-1.5 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
