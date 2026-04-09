"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function DeleteButtonInner({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-60 disabled:pointer-events-none",
        "rounded-full border border-red-200 text-red-600 px-5 py-2 hover:bg-red-50",
        className
      )}
    >
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? "Deleting…" : children}
    </button>
  );
}

export function DeleteButton({
  action,
  children = "Delete",
  className,
}: {
  action: () => void | Promise<void>;
  children?: React.ReactNode;
  className?: string;
}) {
  async function handleAction() {
    if (!confirm("Are you sure you want to delete this? This cannot be undone.")) return;
    await action();
  }

  return (
    <form action={handleAction}>
      <DeleteButtonInner className={className}>{children}</DeleteButtonInner>
    </form>
  );
}
