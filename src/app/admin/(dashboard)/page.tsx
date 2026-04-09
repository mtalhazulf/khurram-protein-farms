import Link from "next/link";
import { getDashboardStats, getContactSubmissions } from "@/lib/db";
import { formatDateShort } from "@/lib/utils";
import { Inbox, Images, BookOpen, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recent = (await getContactSubmissions()).slice(0, 5);

  const cards = [
    {
      label: "Blog posts",
      value: stats.posts,
      href: "/admin/blog",
      icon: BookOpen,
    },
    {
      label: "Gallery images",
      value: stats.images,
      href: "/admin/gallery",
      icon: Images,
    },
    {
      label: "Contact submissions",
      value: stats.contacts,
      href: "/admin/contacts",
      icon: Mail,
    },
    {
      label: "Unread messages",
      value: stats.unread,
      href: "/admin/contacts",
      icon: Inbox,
    },
  ];

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-kp-green-900 mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-kp-black/60">
          Overview of your content and recent activity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl p-6 border border-kp-green-100 hover:border-kp-gold-500/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-xs uppercase tracking-wider text-kp-black/60">
                  {card.label}
                </p>
                <Icon className="h-5 w-5 text-kp-green-700" strokeWidth={1.75} />
              </div>
              <p className="font-serif text-4xl text-kp-green-900">
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="bg-white rounded-2xl border border-kp-green-100 overflow-hidden">
        <header className="px-6 py-5 border-b border-kp-green-100 flex items-center justify-between">
          <h2 className="font-serif text-xl text-kp-green-900">
            Recent messages
          </h2>
          <Link
            href="/admin/contacts"
            className="text-sm text-kp-green-700 hover:text-kp-gold-500"
          >
            View all
          </Link>
        </header>
        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-kp-black/60">
            No messages yet.
          </p>
        ) : (
          <ul className="divide-y divide-kp-green-100">
            {recent.map((c) => (
              <li key={c.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-kp-green-900">{c.name}</p>
                  <span className="text-xs text-kp-black/50">
                    {formatDateShort(c.created_at)}
                  </span>
                </div>
                <p className="text-xs text-kp-black/60 mb-1">{c.email}</p>
                <p className="text-sm text-kp-black/75 line-clamp-2">
                  {c.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
