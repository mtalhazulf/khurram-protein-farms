import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center kp-animate-fade-up">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-kp-green-100 mb-6">
        <FileQuestion className="h-8 w-8 text-kp-green-700" />
      </div>
      <h2 className="font-serif text-2xl text-kp-green-900 mb-2">
        Page not found
      </h2>
      <p className="text-sm text-kp-black/55 max-w-md mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/admin" className="kp-btn kp-btn-green">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>
    </div>
  );
}
