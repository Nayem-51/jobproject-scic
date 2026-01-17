import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;
  // Fetch just for title if needed, or static
  return {
    title: `Product Details - ${id}`,
  };
}

async function getItem(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  try {
    const res = await fetch(`${apiUrl}/items/${id}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    return res.json();
  } catch (e) {
    return undefined;
  }
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-6">
        <Link 
            href="/items" 
            className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition"
        >
            &larr; Back to Collections
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="relative h-[500px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover"
                priority
              />
           </div>
           
           <div>
              <div className="text-indigo-600 font-bold uppercase tracking-wider mb-2">{item.category}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{item.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-indigo-100 pl-4">
                {item.description}
              </p>
              
              <div className="flex items-center gap-6 mb-10">
                 <span className="text-5xl font-bold text-gray-900">${item.price}</span>
                 {item.price > 200 && (
                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Free Shipping</span>
                 )}
              </div>

              <div className="flex gap-4">
                 <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                    Add to Cart
                 </button>
                 <button className="w-16 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                    ♥
                 </button>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                 <p>Secure checkout powered by Stripe (Mock)</p>
                 <p>Ships within 2-3 business days</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
