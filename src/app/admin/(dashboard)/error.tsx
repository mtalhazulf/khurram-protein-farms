"use client";

import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-6">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="font-serif text-2xl text-kp-green-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-kp-black/60 max-w-md mb-6">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-kp-green-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-kp-green-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
