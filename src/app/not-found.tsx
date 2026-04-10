import Link from "next/link";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { getSiteSettings } from "@/lib/db";
import { ArrowLeft } from "lucide-react";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-kp-green-100/30 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-kp-gold-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-kp-green-700/5 blur-[60px] pointer-events-none" />

        <div className="text-center px-6 py-24 md:py-32 max-w-xl mx-auto relative">
          <p className="kp-label kp-animate-fade-up">Page not found</p>
          <h1 className="font-serif text-7xl md:text-9xl text-kp-green-900/10 mb-2 kp-animate-fade-up kp-stagger-1 select-none">
            404
          </h1>
          <h2 className="font-serif text-2xl md:text-3xl text-kp-green-900 mb-4 kp-animate-fade-up kp-stagger-2">
            We can&apos;t find that page
          </h2>
          <p className="text-kp-black/60 leading-relaxed mb-10 max-w-md mx-auto kp-animate-fade-up kp-stagger-3">
            The page you&apos;re looking for doesn&apos;t exist, may have been
            moved, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 kp-animate-fade-up kp-stagger-4">
            <Link href="/" className="kp-btn kp-btn-green">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <Link
              href="/contact"
              className="kp-btn border border-kp-green-800 text-kp-green-800 hover:bg-kp-green-800 hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
