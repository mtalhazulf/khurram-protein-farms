"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ phone }: { phone?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="bg-kp-green-800 text-white">
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Khurram Proteins"
            className="h-10 w-auto hidden sm:block"
          />
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kp-gold-500 text-kp-green-900 font-serif font-bold text-lg group-hover:bg-kp-gold-400 transition-colors sm:hidden">
            KP
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "transition-colors",
                  pathname === link.href
                    ? "text-kp-gold-400"
                    : "text-white/90 hover:text-kp-gold-400"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="hidden lg:inline-flex items-center gap-2 text-sm text-white/80 hover:text-kp-gold-400 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {phone}
            </a>
          )}
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-full bg-kp-gold-500 px-5 py-2.5 text-sm font-medium text-kp-green-900 hover:bg-kp-gold-400 transition-colors"
          >
            Get Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer — slides in from right */}
      <div
        className={cn(
          "md:hidden fixed top-0 right-0 z-50 h-full w-72 bg-kp-green-900 text-white flex flex-col transition-transform duration-300 ease-in-out shadow-2xl",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="font-serif text-sm uppercase tracking-wide">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-lg px-4 py-3 text-sm transition-colors",
                pathname === link.href
                  ? "bg-kp-green-800 text-kp-gold-400"
                  : "text-white/90 hover:bg-kp-green-800/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-white/10 space-y-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          )}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-kp-gold-500 px-5 py-3 text-sm font-medium text-kp-green-900 text-center hover:bg-kp-gold-400 transition-colors"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
