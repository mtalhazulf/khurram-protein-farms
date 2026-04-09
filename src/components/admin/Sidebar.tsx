"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Images,
  BookOpen,
  User,
  Inbox,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/contacts", label: "Contacts", icon: Inbox },
];

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const sidebarContent = (
    <>
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kp-gold-500 text-kp-green-900 font-serif font-bold">
            KP
          </span>
          <span className="font-serif text-sm uppercase tracking-wide">
            Admin
          </span>
        </Link>
        {/* Close button on mobile */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="lg:hidden flex items-center justify-center h-8 w-8 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-kp-green-800 text-white"
                  : "text-white/70 hover:bg-kp-green-800/50 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10 text-xs text-white/60">
        <p className="mb-3 truncate">{email}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-white/80 hover:text-kp-gold-400 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-kp-green-900 text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kp-gold-500 text-kp-green-900 font-serif font-bold text-sm">
            KP
          </span>
          <span className="font-serif text-sm uppercase tracking-wide">
            Admin
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — fixed on desktop, slide-over on mobile */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-kp-green-900 text-white flex flex-col transition-transform duration-200",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
