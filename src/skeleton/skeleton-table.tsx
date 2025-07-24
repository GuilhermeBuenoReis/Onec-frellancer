import { Skeleton } from '../components/ui/skeleton';

export function SkeletonTable() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4">
          <Skeleton className="h-4 col-span-2" />
          <Skeleton className="h-4 col-span-1" />
          <Skeleton className="h-4 col-span-2" />
          <Skeleton className="h-4 col-span-1" />
        </div>
      ))}
    </div>
  );
}
