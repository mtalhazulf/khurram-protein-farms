import Link from "next/link";

export function Hero({
  title,
  subtitle,
  ctaText = "Discover more",
}: {
  title: string;
  subtitle: string;
  ctaText?: string;
}) {
  return (
    <section className="relative bg-kp-green-800 text-white overflow-hidden">
      <div className="kp-hero-pattern absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-br from-kp-green-800 via-kp-green-800 to-kp-green-700/70 pointer-events-none" />
      {/* Radial glow accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-kp-gold-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36 lg:py-40">
        <div className="max-w-3xl">
          <p className="kp-label text-kp-gold-400 kp-animate-fade-up">
            Since 1983 · Lahore, Pakistan
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] leading-[1.1] mb-6 text-white kp-animate-fade-up kp-stagger-2">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed kp-animate-fade-up kp-stagger-3">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 kp-animate-fade-up kp-stagger-4">
            <Link href="/about" className="kp-btn kp-btn-gold">
              {ctaText}
            </Link>
            <Link href="/contact" className="kp-btn kp-btn-outline">
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-kp-gold-500 to-transparent opacity-50" />
    </section>
  );
}
