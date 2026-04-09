import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/db";
import { ContactForm } from "@/components/public/ContactForm";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Khurram Proteins for wholesale egg supply and poultry enquiries.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="bg-kp-green-800 text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-kp-gold-400 uppercase tracking-[0.3em] text-xs mb-4 font-medium">
            Contact
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            Let&apos;s talk
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Share your volume and delivery needs and we&apos;ll get back to you
            with a wholesale quote.
          </p>
        </div>
      </section>

      <section className="bg-kp-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-2xl text-kp-green-900 mb-8">
              Reach us directly
            </h2>
            <ul className="space-y-6">
              {settings.phone && (
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-kp-green-100 text-kp-green-800 shrink-0">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-kp-black/60 mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-kp-green-900 font-medium hover:text-kp-green-700"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>
              )}
              {settings.email && (
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-kp-green-100 text-kp-green-800 shrink-0">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-kp-black/60 mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-kp-green-900 font-medium hover:text-kp-green-700"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>
              )}
              {settings.whatsapp_link && (
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-kp-green-100 text-kp-green-800 shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-kp-black/60 mb-1">
                      WhatsApp
                    </p>
                    <a
                      href={settings.whatsapp_link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-kp-green-900 font-medium hover:text-kp-green-700"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-kp-green-100 text-kp-green-800 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-kp-black/60 mb-1">
                      Location
                    </p>
                    <p className="text-kp-green-900 font-medium">
                      {settings.address}
                    </p>
                  </div>
                </li>
              )}
            </ul>

            {settings.address && (
              <div className="mt-10 aspect-video rounded-2xl overflow-hidden border border-kp-green-100 bg-kp-green-100">
                <iframe
                  title="Khurram Proteins location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    settings.address
                  )}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="font-serif text-2xl text-kp-green-900 mb-8">
              Send a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
