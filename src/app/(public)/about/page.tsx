import type { Metadata } from "next";
import { getAboutContent, getSiteSettings } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";
import { CTABand } from "@/components/public/CTABand";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Khurram Proteins �� four decades of premium poultry farming in Pakistan.",
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    getAboutContent(),
    getSiteSettings(),
  ]);

  const storyHtml = await renderMarkdown(about?.full_story ?? "");

  return (
    <>
      <section className="kp-page-header">
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="kp-label text-kp-gold-400 kp-animate-fade-up">
            About us
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 kp-animate-fade-up kp-stagger-2">
            Our story, our people, our standards
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed kp-animate-fade-up kp-stagger-3">
            Four decades of consistent quality, honest partnerships and a
            relentless commitment to the businesses we supply.
          </p>
        </div>
      </section>

      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 items-start">
          <div>
            <div className="aspect-4/5 rounded-2xl overflow-hidden bg-kp-green-100 mb-4 shadow-lg group">
              {about?.founder_image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={about.founder_image_url}
                  alt={about.founder_name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-kp-green-700/50 text-xs">
                  Founder photo
                </div>
              )}
            </div>
            <p className="font-serif text-lg text-kp-green-900">
              {about?.founder_name ?? "Dr. Malik Khurram Shahzad Khokhar"}
            </p>
            {about?.founder_title && (
              <p className="text-sm text-kp-black/55">{about.founder_title}</p>
            )}
          </div>

          <div>
            {about?.mission_statement && (
              <blockquote className="border-l-4 border-kp-gold-500 pl-6 py-2 mb-10 font-serif text-xl text-kp-green-900 italic leading-relaxed">
                {about.mission_statement}
              </blockquote>
            )}
            <div
              className="kp-prose"
              dangerouslySetInnerHTML={{ __html: storyHtml }}
            />
          </div>
        </div>
      </section>

      <CTABand phone={settings.phone} whatsapp={settings.whatsapp_link} />
    </>
  );
}
