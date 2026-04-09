"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  pendingText,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: "primary" | "danger";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-60 disabled:pointer-events-none",
        variant === "primary" &&
          "rounded-full bg-kp-green-800 px-8 py-3 text-white hover:bg-kp-green-700",
        variant === "danger" &&
          "rounded-full border border-red-200 text-red-600 px-5 py-2 hover:bg-red-50",
        className
      )}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? (pendingText ?? children) : children}
    </button>
  );
}
