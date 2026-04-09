import { Skeleton, SkeletonGrid } from "@/components/admin/Skeleton";

export default function GalleryLoading() {
  return (
    <div className="max-w-6xl">
      <header className="mb-10">
        <Skeleton className="h-8 w-28 mb-2" />
        <Skeleton className="h-4 w-72" />
      </header>

      <div className="bg-white rounded-2xl border border-kp-green-100 p-6 mb-10">
        <Skeleton className="h-6 w-40 mb-5" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>

      <SkeletonGrid count={8} />
    </div>
  );
}
