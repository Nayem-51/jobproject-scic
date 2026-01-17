"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            ShopNow
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition">Home</Link>
            <Link href="/items" className="text-gray-600 hover:text-indigo-600 font-medium transition">Items</Link>
            {session && (
              <>
                <Link href="/admin" className="text-gray-600 hover:text-indigo-600 font-medium transition">Dashboard</Link>
                <Link href="/add-item" className="text-gray-600 hover:text-indigo-600 font-medium transition">Add Item</Link>
              </>
            )}
            
            {session ? (
              <div className="flex items-center gap-4">
                  <Link 
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {session.user.name || 'Admin'}
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition"
                  >
                    Log Out
                  </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link href="/" className="block text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
            <Link href="/items" className="block text-gray-600 hover:text-indigo-600 font-medium">Items</Link>
            {session && (
              <>
                <Link href="/admin" className="block text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                <Link href="/add-item" className="block text-gray-600 hover:text-indigo-600 font-medium">Add Item</Link>
              </>
            )}
            {session ? (
              <>
                 <Link 
                   href="/admin"
                   className="flex items-center gap-2 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                   {session.user.name || 'Administrator'}
                 </Link>
                 <div className="py-2 text-xs text-gray-500">{session.user.email}</div>
                 <button 
                  onClick={() => signOut()}
                  className="block w-full text-left text-gray-600 hover:text-indigo-600 font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login" className="block text-indigo-600 font-medium">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
