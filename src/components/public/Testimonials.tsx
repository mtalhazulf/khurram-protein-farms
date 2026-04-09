import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We've been sourcing eggs from Khurram Proteins for over 15 years. Their consistency is unmatched — not a single delivery missed.",
    name: "Ahmed Raza",
    role: "Owner, Lahore Bakers",
  },
  {
    quote:
      "Quality you can trust. Our restaurant customers notice the difference, and that's what keeps us coming back.",
    name: "Farah Shaheen",
    role: "Procurement Manager, FreshMart Chain",
  },
  {
    quote:
      "Reliable, honest, and always on time. Khurram Proteins is more than a supplier — they're a partner.",
    name: "Bilal Khurshid",
    role: "Head Chef, Café Milano Lahore",
  },
];

export function Testimonials() {
  return (
    <section className="bg-kp-green-100/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-kp-gold-500 uppercase tracking-[0.3em] text-xs mb-3 font-medium">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
            Trusted by businesses across Pakistan
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="bg-white rounded-2xl p-8 border border-kp-green-100 hover:shadow-lg hover:border-kp-gold-500/30 transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-kp-gold-500/40 mb-4" />
              <p className="text-sm text-kp-black/80 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <p className="font-serif text-kp-green-900 font-medium">
                  {t.name}
                </p>
                <p className="text-xs text-kp-black/50">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
