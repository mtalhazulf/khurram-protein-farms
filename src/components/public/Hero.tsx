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
      <div className="absolute inset-0 bg-gradient-to-br from-kp-green-800 via-kp-green-800 to-kp-green-700/70 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-kp-gold-400 uppercase tracking-[0.3em] text-xs mb-6 font-medium">
            Since 1983 · Lahore, Pakistan
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6 text-white">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-kp-gold-500 px-7 py-3.5 text-sm font-medium text-kp-green-900 hover:bg-kp-gold-400 transition-colors"
            >
              {ctaText}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-kp-gold-500 to-transparent opacity-60" />
    </section>
  );
}
