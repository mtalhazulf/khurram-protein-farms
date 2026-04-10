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
          <p className="kp-label">Testimonials</p>
          <h2 className="font-serif text-3xl md:text-4xl text-kp-green-900">
            Trusted by businesses across Pakistan
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              className="kp-card bg-white rounded-2xl p-8 border border-kp-green-100 group"
            >
              <Quote className="h-8 w-8 text-kp-gold-500/35 mb-4 transition-all duration-300 group-hover:text-kp-gold-500/60 group-hover:scale-110" />
              <p className="text-sm text-kp-black/75 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                {/* Avatar circle with initial */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-kp-green-100 text-kp-green-800 font-serif text-sm font-semibold shrink-0 transition-colors duration-300 group-hover:bg-kp-gold-500/15 group-hover:text-kp-gold-500">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-serif text-kp-green-900 font-medium text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-kp-black/50">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
