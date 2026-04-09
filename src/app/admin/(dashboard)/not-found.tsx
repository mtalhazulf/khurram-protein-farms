import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-kp-green-100 mb-6">
        <FileQuestion className="h-8 w-8 text-kp-green-700" />
      </div>
      <h2 className="font-serif text-2xl text-kp-green-900 mb-2">
        Page not found
      </h2>
      <p className="text-sm text-kp-black/60 max-w-md mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/admin"
        className="rounded-full bg-kp-green-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-kp-green-700 transition-colors"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
