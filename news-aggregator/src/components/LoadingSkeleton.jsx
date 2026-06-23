function SkeletonBox({ className }) {
  return <div className={`shimmer-bg rounded ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="card flex flex-col overflow-hidden">
      <SkeletonBox className="h-48 rounded-none" />
      <div className="p-4 flex flex-col gap-3">
        <SkeletonBox className="h-4 w-16 rounded-full" />
        <SkeletonBox className="h-5 w-full" />
        <SkeletonBox className="h-5 w-3/4" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-5/6" />
        <div className="flex items-center justify-between pt-3 border-t border-ink-100 dark:border-ink-800">
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-6 w-6 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function FeaturedSkeleton() {
  return (
    <div className="card overflow-hidden">
      <SkeletonBox className="h-64 sm:h-80 lg:h-96 rounded-none" />
    </div>
  )
}

export function HorizontalCardSkeleton() {
  return (
    <div className="card flex gap-4 p-4">
      <SkeletonBox className="shrink-0 w-24 h-20 sm:w-32 sm:h-24 rounded-lg" />
      <div className="flex flex-col justify-between flex-1 gap-2">
        <div className="space-y-2">
          <SkeletonBox className="h-3 w-12 rounded-full" />
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-4/5" />
        </div>
        <div className="flex items-center justify-between">
          <SkeletonBox className="h-3 w-28" />
          <SkeletonBox className="h-6 w-6 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default function LoadingSkeleton({ count = 6, variant = 'grid' }) {
  if (variant === 'featured') {
    return (
      <div className="space-y-6">
        <FeaturedSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => <HorizontalCardSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  )
}
