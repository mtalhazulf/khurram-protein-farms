"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center kp-animate-fade-up">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-6">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="font-serif text-2xl text-kp-green-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-kp-black/55 max-w-md mb-6 leading-relaxed">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="kp-btn kp-btn-green"
      >
        <RotateCcw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
