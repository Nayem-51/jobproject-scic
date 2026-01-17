"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const CATEGORIES = ["Furniture", "Electronics", "Decor", "Office", "General"];

export default function AddItemPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Use a status object for better UX feedback than simple alerts
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'General',
    image: ''
  });

  if (status === "loading") {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );
  }

  if (status === "unauthenticated") {
      router.push('/login');
      return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    // Client-side validation
    if (!formData.name || !formData.name.trim()) {
        setFeedback({ type: 'error', message: 'Product name is required.' });
        setShowToast(true);
        setLoading(false);
        return;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
        setFeedback({ type: 'error', message: 'Please enter a valid price (greater than 0).' });
        setShowToast(true);
        setLoading(false);
        return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFeedback({ type: 'success', message: 'Product successfully added to the catalog!' });
        setShowToast(true);
        // Clear form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'General',
          image: ''
        });
        setTimeout(() => {
             router.push('/items');
             router.refresh();
        }, 2000); 
      } else {
        const errorData = await res.json();
        setFeedback({ type: 'error', message: errorData.message || 'Failed to create item.' });
        setShowToast(true);
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Network error. Please try again.' });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
            <p className="text-gray-500 mt-2">Expand our collection with premium artifacts.</p>
        </div>

        {/* Toast Notification */}
        {showToast && feedback.message && (
          <div className={`fixed top-24 right-4 md:right-8 z-50 max-w-md w-full animate-slide-in`}>
            <div className={`rounded-lg shadow-xl p-4 flex items-center justify-between ${
              feedback.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              <div className="flex items-center gap-3">
                {feedback.type === 'success' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="ml-4 text-white hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Eames Lounge Chair"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <div className="relative">
                            <select
                                name="category"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            value={formData.image}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-gray-400 mt-2">
                            Leave empty to use a random placeholder image.
                        </p>
                    </div>

                    {/* Image Preview */}
                    <div className="relative h-48 w-full bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center overflow-hidden group">
                        {formData.image ? (
                            <Image 
                                src={formData.image} 
                                alt="Preview" 
                                fill 
                                className="object-cover"
                                onError={(e) => { e.target.style.display='none' }}
                            />
                        ) : (
                            <div className="text-center text-gray-400">
                                <span className="block text-2xl mb-1">📷</span>
                                <span className="text-sm">Image Preview</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                name="description"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Describe the key features and materials..."
                value={formData.description}
                onChange={handleChange}
                />
            </div>

            <div className="pt-4">
                <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition transform active:scale-95 ${
                    loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30'
                }`}
                >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing...
                    </span>
                ) : 'Publish Product'}
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}
