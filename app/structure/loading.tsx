import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-24 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Skeleton className="mb-12 h-10 w-64" />
        <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="ml-4">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="ml-10 mt-2 space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-40" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}