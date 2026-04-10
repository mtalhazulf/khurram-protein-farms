import { Phone, MessageCircle } from "lucide-react";

export function CTABand({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  return (
    <section className="bg-kp-green-800 text-white relative overflow-hidden">
      <div className="kp-hero-pattern absolute inset-0 pointer-events-none opacity-50" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-kp-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24 text-center">
        <p className="kp-label text-kp-gold-400">Get in touch</p>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Ready to place an order?
        </h2>
        <p className="text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
          Let&apos;s talk about your volume, delivery schedule and how we can
          support your business — consistently, for years to come.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {phone && (
            <a href={`tel:${phone}`} className="kp-btn kp-btn-gold">
              <Phone className="h-4 w-4" />
              Call {phone}
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="kp-btn kp-btn-outline"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
