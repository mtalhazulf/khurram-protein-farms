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
      <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-kp-gold-400 uppercase tracking-[0.3em] text-xs mb-4 font-medium">
          Get in touch
        </p>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Ready to place an order?
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-10">
          Let&apos;s talk about your volume, delivery schedule and how we can
          support your business — consistently, for years to come.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-kp-gold-500 px-7 py-3.5 text-sm font-medium text-kp-green-900 hover:bg-kp-gold-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call {phone}
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
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
