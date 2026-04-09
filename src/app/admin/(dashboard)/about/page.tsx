import { getAboutContent } from "@/lib/db";
import { updateAbout } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUpload } from "@/components/admin/ImageUpload";

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

      <form action={updateAbout} className="space-y-6">
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

        <ImageUpload
          name="founder_image"
          label="Founder image"
          currentUrl={about?.founder_image_url}
          hint="Leave empty to keep the current image."
        />

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

        <SubmitButton pendingText="Saving…">Save changes</SubmitButton>
      </form>
    </div>
  );
}
