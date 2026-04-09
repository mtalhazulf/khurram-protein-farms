import type { Metadata } from "next";
import { getActiveServices, getSiteSettings } from "@/lib/db";
import { ServiceCard } from "@/components/public/ServiceCard";
import { CTABand } from "@/components/public/CTABand";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wholesale poultry supply, reliable delivery and quality-assured eggs for businesses across Pakistan.",
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getActiveServices(),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="bg-kp-green-800 text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-kp-gold-400 uppercase tracking-[0.3em] text-xs mb-4 font-medium">
            Services
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            What we offer
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to run a reliable supply chain — wholesale
            volume, predictable delivery, and quality you can trust.
          </p>
        </div>
      </section>

      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {services.length === 0 ? (
            <p className="text-center text-kp-black/60">
              Services will be listed here shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand phone={settings.phone} whatsapp={settings.whatsapp_link} />
    </>
  );
}
