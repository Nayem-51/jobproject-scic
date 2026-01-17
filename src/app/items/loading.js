export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="flex justify-between pt-4">
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
