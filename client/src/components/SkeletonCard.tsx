const heights = ['h-40', 'h-48', 'h-36', 'h-44', 'h-52'];

export function SkeletonCard({ index }: { index: number }) {
  const h = heights[index % heights.length];
  return (
    <div className="bg-white rounded-md overflow-hidden mb-2 break-inside-avoid">
      <div className={`w-full ${h} skeleton-pulse`} />
      <div className="px-2.5 pt-2 pb-2.5 space-y-2">
        <div className="h-3.5 skeleton-pulse rounded w-[90%]" />
        <div className="h-3.5 skeleton-pulse rounded w-[60%]" />
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-[18px] h-[18px] rounded-full skeleton-pulse" />
          <div className="h-2.5 skeleton-pulse rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="columns-2 gap-2 px-1.5 pt-1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}
