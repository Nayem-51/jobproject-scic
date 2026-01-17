import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Our Collection | ShopNow',
  description: 'Browse our premium collection of products. Quality items with fast shipping and secure checkout.',
};

async function getItems() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  
  try {
    const res = await fetch(`${apiUrl}/items`, { 
      // No cache for development - always fetch fresh data
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch items: ${res.status}`);
      throw new Error(`Failed to fetch items: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Fetched items:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    // Return empty array instead of throwing to show page with 0 items
    return [];
  }
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
       <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div className="mb-6 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Collection</h1>
                <p className="text-gray-600 max-w-xl">
                  Explore our hand-picked selection of premium artifacts designed to elevate your living space.
                </p>
             </div>
             <div className="text-sm text-gray-500 font-medium">
                {items.length} Products Available
             </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-6">Start adding products to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
       </div>
    </div>
  );
}
