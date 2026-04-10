"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-aware header
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 text-white transition-all duration-300",
        scrolled
          ? "bg-kp-green-900/95 backdrop-blur-md shadow-lg shadow-kp-green-900/10"
          : "bg-kp-green-800"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Khurram Proteins"
            className="h-10 w-10 rounded-full object-cover bg-white p-0.5 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-serif text-lg tracking-wide uppercase hidden sm:inline transition-colors duration-200 group-hover:text-kp-gold-400">
            Khurram Proteins
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 text-sm tracking-wide">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 rounded-lg transition-colors duration-200",
                    active
                      ? "text-kp-gold-400"
                      : "text-white/85 hover:text-white hover:bg-white/[0.06]"
                  )}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-kp-gold-400 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="hidden lg:inline-flex items-center gap-2 text-sm text-white/75 hover:text-kp-gold-400 transition-colors duration-200"
            >
              <Phone className="h-3.5 w-3.5" />
              {phone}
            </a>
          )}
          <Link
            href="/contact"
            className="hidden sm:inline-flex kp-btn kp-btn-gold !py-2.5 !px-5"
          >
            Get Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative h-5 w-5">
              <Menu
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

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
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm transition-all duration-200",
                  open && "kp-animate-slide-right",
                  active
                    ? "bg-kp-green-800 text-kp-gold-400 font-medium"
                    : "text-white/85 hover:bg-kp-green-800/50 hover:text-white active:bg-kp-green-800/70"
                )}
                style={open ? { animationDelay: `${i * 0.04}s` } : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-white/10 space-y-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:bg-white/10 hover:border-white/30 active:bg-white/15 transition-all duration-200"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          )}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-kp-gold-500 px-5 py-3 text-sm font-medium text-kp-green-900 text-center hover:bg-kp-gold-400 active:bg-kp-gold-500 transition-colors"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
