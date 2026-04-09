import { getSiteSettings } from "@/lib/db";
import { updateSiteSettings } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

export default async function SiteSettingsPage() {
  const s = await getSiteSettings();

  const fields: Array<{
    key: string;
    label: string;
    type: "text" | "textarea" | "url";
    placeholder?: string;
  }> = [
    { key: "hero_title", label: "Hero title", type: "text" },
    { key: "hero_subtitle", label: "Hero subtitle", type: "textarea" },
    { key: "hero_cta_text", label: "Hero CTA text", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "whatsapp_link", label: "WhatsApp link", type: "url" },
    { key: "facebook_url", label: "Facebook URL", type: "url" },
    { key: "instagram_url", label: "Instagram URL", type: "url" },
    { key: "youtube_url", label: "YouTube URL", type: "url" },
    { key: "footer_text", label: "Footer text", type: "textarea" },
    { key: "meta_title", label: "SEO — Meta title", type: "text" },
    { key: "meta_description", label: "SEO — Meta description", type: "textarea" },
  ];

  return (
    <div className="max-w-3xl">
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-kp-green-900 mb-1">
          Site Settings
        </h1>
        <p className="text-sm text-kp-black/60">
          Edit the content that appears across the site.
        </p>
      </header>

      <form action={updateSiteSettings} className="space-y-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.key}
                defaultValue={s[field.key] ?? ""}
                rows={3}
                className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none focus:ring-2 focus:ring-kp-green-700/20 resize-none"
              />
            ) : (
              <input
                name={field.key}
                type={field.type === "url" ? "url" : "text"}
                defaultValue={s[field.key] ?? ""}
                className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none focus:ring-2 focus:ring-kp-green-700/20"
              />
            )}
          </div>
        ))}

        <div className="pt-4">
          <SubmitButton pendingText="Saving…">Save changes</SubmitButton>
        </div>
      </form>
    </div>
  );
}
