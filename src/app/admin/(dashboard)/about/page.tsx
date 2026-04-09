import { getAboutContent } from "@/lib/db";
import { updateAbout } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const about = await getAboutContent();

  return (
    <div className="max-w-3xl">
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-kp-green-900 mb-1">
          About Page
        </h1>
        <p className="text-sm text-kp-black/60">
          Edit the founder story, bio and mission statement.
        </p>
      </header>

      <form action={updateAbout} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Founder name</label>
            <input
              name="founder_name"
              defaultValue={about?.founder_name ?? ""}
              className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Founder title</label>
            <input
              name="founder_title"
              defaultValue={about?.founder_title ?? ""}
              placeholder="e.g. Founder & CEO"
              className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Founder image
          </label>
          {about?.founder_image_url && (
            <div className="mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.founder_image_url}
                alt="Current founder"
                className="h-32 w-32 rounded-lg object-cover border border-kp-green-100"
              />
            </div>
          )}
          <input
            name="founder_image"
            type="file"
            accept="image/*"
            className="text-sm"
          />
          <p className="text-xs text-kp-black/50 mt-1">
            Leave empty to keep the current image.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Short bio</label>
          <textarea
            name="short_bio"
            defaultValue={about?.short_bio ?? ""}
            rows={3}
            className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none resize-none"
          />
          <p className="text-xs text-kp-black/50 mt-1">
            Shown on the homepage about preview.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Mission statement
          </label>
          <textarea
            name="mission_statement"
            defaultValue={about?.mission_statement ?? ""}
            rows={3}
            className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Full story (Markdown)
          </label>
          <textarea
            name="full_story"
            defaultValue={about?.full_story ?? ""}
            rows={14}
            className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm font-mono focus:border-kp-green-700 focus:outline-none resize-vertical"
          />
          <p className="text-xs text-kp-black/50 mt-1">
            Use markdown — headings (##), bold, links, lists etc.
          </p>
        </div>

        <button
          type="submit"
          className="rounded-full bg-kp-green-800 px-8 py-3 text-sm font-medium text-white hover:bg-kp-green-700"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
