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

  const contactItems = [
    settings.phone && {
      icon: Phone,
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone}`,
    },
    settings.email && {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    settings.whatsapp_link && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us on WhatsApp",
      href: settings.whatsapp_link,
      external: true,
    },
    settings.address && {
      icon: MapPin,
      label: "Location",
      value: settings.address,
    },
  ].filter(Boolean) as Array<{
    icon: typeof Phone;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }>;

  return (
    <>
      <section className="kp-page-header">
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="kp-label text-kp-gold-400 kp-animate-fade-up">
            Contact
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 kp-animate-fade-up kp-stagger-2">
            Let&apos;s talk
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed kp-animate-fade-up kp-stagger-3">
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
            <ul className="space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-4 group"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-kp-green-100 text-kp-green-800 shrink-0 transition-all duration-300 group-hover:bg-kp-gold-500/15 group-hover:text-kp-gold-500">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-kp-black/55 mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          className="text-kp-green-900 font-medium hover:text-kp-gold-500 transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-kp-green-900 font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {settings.address && (
              <div className="mt-10 aspect-video rounded-2xl overflow-hidden border border-kp-green-100 bg-kp-green-100 shadow-sm">
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
