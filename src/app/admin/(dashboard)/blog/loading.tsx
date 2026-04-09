import { Skeleton, SkeletonList } from "@/components/admin/Skeleton";

export default function BlogLoading() {
  return (
    <div className="max-w-5xl">
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </header>
      <SkeletonList rows={5} />
    </div>
  );
}
