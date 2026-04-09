import { getContactSubmissions } from "@/lib/db";
import { deleteContact, markContactRead } from "@/app/admin/actions";
import { formatDateShort } from "@/lib/utils";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const submissions = await getContactSubmissions();

  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-kp-green-900 mb-1">
          Contact submissions
        </h1>
        <p className="text-sm text-kp-black/60">
          Messages sent through the public contact form.
        </p>
      </header>

      {submissions.length === 0 ? (
        <p className="text-center text-kp-black/60 py-10">
          No messages yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {submissions.map((c) => (
            <li
              key={c.id}
              className={`bg-white rounded-2xl border p-6 ${
                c.is_read
                  ? "border-kp-green-100"
                  : "border-kp-gold-500/50 bg-kp-gold-100/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-medium text-kp-green-900">{c.name}</p>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-kp-green-700 hover:text-kp-gold-500"
                  >
                    {c.email}
                  </a>
                </div>
                <span className="text-xs text-kp-black/50 shrink-0">
                  {formatDateShort(c.created_at)}
                </span>
              </div>
              <p className="text-sm text-kp-black/80 whitespace-pre-wrap mb-4">
                {c.message}
              </p>
              <div className="flex items-center gap-3">
                {!c.is_read && (
                  <form action={markContactRead.bind(null, c.id)}>
                    <SubmitButton
                      pendingText="Marking…"
                      className="px-4 py-1.5 text-xs"
                    >
                      Mark as read
                    </SubmitButton>
                  </form>
                )}
                <DeleteButton action={deleteContact.bind(null, c.id)} className="px-4 py-1.5 text-xs" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
