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
      <main className="flex-1 flex items-center justify-center bg-kp-green-100/30">
        <div className="text-center px-6 py-24 md:py-32 max-w-xl mx-auto">
          <p className="text-kp-gold-500 uppercase tracking-[0.3em] text-xs mb-4 font-medium">
            Page not found
          </p>
          <h1 className="font-serif text-6xl md:text-8xl text-kp-green-900 mb-4">
            404
          </h1>
          <h2 className="font-serif text-2xl md:text-3xl text-kp-green-900 mb-4">
            We can&apos;t find that page
          </h2>
          <p className="text-kp-black/65 leading-relaxed mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist, may have been
            moved, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-kp-green-800 px-7 py-3 text-sm font-medium text-white hover:bg-kp-green-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-kp-green-800 px-7 py-3 text-sm font-medium text-kp-green-800 hover:bg-kp-green-800 hover:text-white transition-colors"
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
