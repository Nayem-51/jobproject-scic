import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      <div className="p-6">
        <div className="text-sm text-indigo-600 font-medium mb-2 uppercase tracking-wide">{product.category}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate" title={product.name}>{product.name}</h3>
        <p className="text-gray-500 line-clamp-2 mb-4 text-sm">{product.description}</p>
        <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            <Link 
              href={`/items/${product.id}`}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
            >
              View Details &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}
