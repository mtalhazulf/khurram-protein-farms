import { Skeleton, SkeletonForm } from "@/components/admin/Skeleton";

export default function ServicesLoading() {
  return (
    <div className="max-w-5xl">
      <header className="mb-10">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-80" />
      </header>

      <div className="bg-white rounded-2xl border border-kp-green-100 p-6 mb-10">
        <Skeleton className="h-6 w-32 mb-5" />
        <SkeletonForm />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-kp-green-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="md:col-span-2">
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
