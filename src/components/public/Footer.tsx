import Link from "next/link";
import type { SiteSettingsMap } from "@/types";
import { AdminShortcut } from "./AdminShortcut";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = ["Wholesale Supply", "Reliable Delivery", "Quality Assured"];

export function Footer({ settings }: { settings: SiteSettingsMap }) {
  return (
    <footer className="bg-kp-green-900 text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Khurram Proteins"
              className="h-12 w-12 rounded-full object-cover bg-white p-0.5 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-lg uppercase tracking-wide text-white">
              Khurram Proteins
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            {settings.footer_text ??
              "Premium poultry farming and wholesale egg supply serving businesses across Pakistan since 1983."}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-serif text-base mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative inline-block text-white/70 hover:text-kp-gold-400 transition-colors duration-200 hover:translate-x-0.5 transform"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-serif text-base mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {serviceLinks.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-serif text-base mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm">
            {settings.phone && (
              <li>
                <a
                  href={`tel:${settings.phone}`}
                  className="text-white/70 hover:text-kp-gold-400 transition-colors duration-200"
                >
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-white/70 hover:text-kp-gold-400 transition-colors duration-200"
                >
                  {settings.email}
                </a>
              </li>
            )}
            {settings.address && (
              <li className="text-white/70">{settings.address}</li>
            )}
            {settings.whatsapp_link && (
              <li>
                <a
                  href={settings.whatsapp_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-kp-gold-400 transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            <AdminShortcut />
            &copy; {new Date().getFullYear()} Khurram Proteins. All rights
            reserved.
          </p>
          <Link
            href="/contact"
            className="hover:text-kp-gold-400 transition-colors duration-200"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
