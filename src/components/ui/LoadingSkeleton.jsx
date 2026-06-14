export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="skeleton h-3 w-5/6 rounded-full" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
        <div className="skeleton h-9 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`skeleton h-3 rounded-full ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function SkeletonAvatar() {
  return (
    <div className="flex items-center gap-3">
      <div className="skeleton w-12 h-12 rounded-full flex-shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="skeleton h-3.5 w-1/2 rounded-full" />
        <div className="skeleton h-3 w-1/3 rounded-full" />
      </div>
    </div>
  );
}
