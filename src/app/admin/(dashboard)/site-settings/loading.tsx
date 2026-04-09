import { Skeleton, SkeletonForm } from "@/components/admin/Skeleton";

export default function SiteSettingsLoading() {
  return (
    <div className="max-w-3xl">
      <header className="mb-10">
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-72" />
      </header>
      <SkeletonForm />
    </div>
  );
}
