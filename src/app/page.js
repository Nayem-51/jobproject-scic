import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        {/* <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop" 
             alt="E-commerce Store" 
             fill
             className="object-cover opacity-50"
             priority
           />
        </div> */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-indigo-400 font-semibold tracking-widest uppercase mb-4 block">Welcome to Our Store</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Shop Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Products</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Discover a curated collection of premium products with quality you can trust. Fast shipping, secure checkout, and exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/items" className="px-8 py-4 bg-indigo-600 rounded-full font-bold hover:bg-indigo-700 transition transform hover:-translate-y-1 shadow-lg shadow-indigo-500/50">
              Shop Now
            </Link>
            <Link href="#offers" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold hover:bg-white/20 transition">
              View Offers
            </Link>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
             <div className="md:w-1/2">
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1000" 
                    alt="About Our Store" 
                    fill
                    className="object-cover"
                  />
                </div>
             </div>
             <div className="md:w-1/2">
                <h4 className="text-indigo-600 font-bold uppercase tracking-widest mb-2">About Us</h4>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">Your Trusted Online Shopping Destination</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  We are committed to providing you with the best shopping experience. From premium quality products to exceptional customer service, we ensure every purchase meets your expectations. Our mission is to make online shopping simple, secure, and satisfying.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-8">
                   <div>
                      <div className="text-3xl font-bold text-gray-900">10k+</div>
                      <div className="text-gray-500">Products Available</div>
                   </div>
                   <div>
                      <div className="text-3xl font-bold text-gray-900">50k+</div>
                      <div className="text-gray-500">Happy Customers</div>
                   </div>
                </div>
                <Link href="/items" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-2 group">
                  Explore Products <span className="group-hover:translate-x-1 transition">&rarr;</span>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Shop With Us</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { title: 'Free Shipping', desc: 'Enjoy free shipping on orders over $50. Fast and reliable delivery to your doorstep.', icon: '🚚' },
               { title: 'Secure Payment', desc: 'Shop with confidence using our secure payment gateway. Your data is always protected.', icon: '🔒' },
               { title: 'Easy Returns', desc: 'Not satisfied? Return any item within 30 days for a full refund. No questions asked.', icon: '↩️' }
             ].map((feature, i) => (
               <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group">
                 <div className="text-5xl mb-6 group-hover:scale-110 transition duration-300">{feature.icon}</div>
                 <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                 <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Services / Items Preview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by Category</h2>
              <Link href="/items" className="hidden md:block text-indigo-600 font-semibold hover:text-indigo-800 transition">
                View All Products &rarr;
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Electronics', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop', count: '124 Products' },
                { name: 'Fashion', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop', count: '245 Products' },
                { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop', count: '189 Products' }
              ].map((cat, i) => (
                <Link href="/items" key={i} className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
                   <Image 
                     src={cat.image} 
                     alt={cat.name} 
                     fill
                     className="object-cover transition duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                   <div className="absolute bottom-0 left-0 p-8">
                      <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                      <p className="text-gray-300 text-sm">{cat.count}</p>
                   </div>
                </Link>
              ))}
           </div>
           
           <div className="mt-8 text-center md:hidden">
              <Link href="/items" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">
                View All Products &rarr;
              </Link>
           </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section id="offers" className="py-24 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800/30 transform skew-x-12 translate-x-1/4"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                 <span className="inline-block px-4 py-1 bg-yellow-400 text-indigo-900 font-bold rounded-full text-sm mb-6">Special Offer</span>
                 <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Our Store?</h2>
                 <p className="text-xl text-indigo-100 mb-8">We offer the best prices, fastest shipping, and top-quality products. Join thousands of satisfied customers who trust us for their shopping needs.</p>
                 <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                       <span className="text-2xl">✓</span>
                       <span>Best Price Guarantee</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-2xl">✓</span>
                       <span>24/7 Customer Support</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-2xl">✓</span>
                       <span>Wide Product Selection</span>
                    </div>
                 </div>
                 <Link href="/items" className="inline-block px-8 py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-gray-100 transition">
                    Shop Now
                 </Link>
              </div>
              <div className="md:w-1/2 relative">
                 <div className="relative h-80 w-full rounded-xl overflow-hidden border-4 border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
                    <Image 
                      src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000" 
                      alt="Featured Product" 
                      fill
                      className="object-cover"
                    />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Testimonials / Reviews Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Amazing shopping experience! The products arrived quickly and were exactly as described. Will definitely shop here again!", author: "Sarah Jenkins", role: "Verified Customer", rating: 5 },
              { text: "Great prices and excellent customer service. The return process was super easy when I needed to exchange a product. Highly recommended!", author: "Michael Chen", role: "Verified Customer", rating: 5 },
              { text: "I've ordered multiple times and every time the quality exceeds my expectations. Fast shipping and secure packaging. Love this store!", author: "Emma Watson", role: "Verified Customer", rating: 5 }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl relative">
                <div className="text-6xl text-indigo-100 absolute top-4 left-6">"</div>
                <div className="relative z-10 pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, idx) => (
                      <span key={idx} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 mb-6 italic">{t.text}</p>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">{t.author[0]}</div>
                     </div>
                     <div>
                        <div className="font-bold text-gray-900">{t.author}</div>
                        <div className="text-sm text-gray-500">{t.role}</div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact / Call to Action Section */}
      <section className="py-24 bg-gray-900 text-white">
         <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated with Our Latest Offers</h2>
            <p className="text-gray-400 mb-10 text-lg">Subscribe to our newsletter for exclusive deals, new product launches, and special discounts delivered straight to your inbox.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-16">
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 px-6 py-4 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
               />
               <button type="submit" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">
                 Subscribe Now
               </button>
            </form>

            <div className="border-t border-gray-800 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
               <div>
                  <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                  <p className="text-gray-400">support@ourstore.com</p>
                  <p className="text-gray-400">+1 (888) 123-4567</p>
                  <p className="text-gray-400">Mon-Fri: 9AM - 6PM EST</p>
               </div>
               <div>
                  <h4 className="font-bold text-lg mb-4">Customer Service</h4>
                  <p className="text-gray-400">Free Shipping on Orders $50+</p>
                  <p className="text-gray-400">30-Day Return Policy</p>
                  <p className="text-gray-400">Secure Payment Options</p>
               </div>
               <div>
                  <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                  <div className="flex justify-center md:justify-start gap-4">
                     {['Facebook', 'Instagram', 'Twitter'].map(social => (
                        <a key={social} href="#" className="text-gray-400 hover:text-white transition">{social}</a>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
