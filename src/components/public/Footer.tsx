import Link from "next/link";
import type { SiteSettingsMap } from "@/types";

export function Footer({ settings }: { settings: SiteSettingsMap }) {
  return (
    <footer className="bg-kp-green-900 text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kp-gold-500 text-kp-green-900 font-serif font-bold">
              KP
            </span>
            <span className="font-serif text-lg uppercase tracking-wide text-white">
              Khurram Proteins
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            {settings.footer_text ??
              "Premium poultry farming and wholesale egg supply serving businesses across Pakistan since 1983."}
          </p>
        </div>

        <div>
          <h4 className="text-white font-serif text-base mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-kp-gold-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-kp-gold-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-kp-gold-400">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-kp-gold-400">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-base mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Wholesale Supply</li>
            <li>Reliable Delivery</li>
            <li>Quality Assured</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-base mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone}`} className="hover:text-kp-gold-400">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-kp-gold-400">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.address && <li>{settings.address}</li>}
            {settings.whatsapp_link && (
              <li>
                <a
                  href={settings.whatsapp_link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-kp-gold-400"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/60">
          © {new Date().getFullYear()} Khurram Proteins. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
