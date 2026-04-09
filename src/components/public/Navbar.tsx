import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="bg-kp-green-800 text-white">
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kp-gold-500 text-kp-green-900 font-serif font-bold text-lg group-hover:bg-kp-gold-400 transition-colors">
            KP
          </span>
          <span className="font-serif text-lg tracking-wide uppercase hidden sm:inline">
            Khurram Proteins
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white/90 hover:text-kp-gold-400 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="rounded-full bg-kp-gold-500 px-5 py-2.5 text-sm font-medium text-kp-green-900 hover:bg-kp-gold-400 transition-colors"
        >
          Get Quote
        </Link>
      </nav>
    </header>
  );
}
