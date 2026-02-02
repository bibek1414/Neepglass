'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useCategories } from '@/hooks/use-category';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsDrawerOpen } = useCart();
  const { data: categoriesData } = useCategories();
  const pathname = usePathname();

  const categories = categoriesData?.results || [];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary shrink-0 tracking-tight">
          Nep<span className="text-secondary">Glass</span>
        </Link>

        {/* Search - Centered */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products, blog..."
              className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-gray-50/50 transition-all text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-colors hover:text-secondary",
                  pathname === link.href ? "text-secondary" : "text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Categories Dropdown/Links */}
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="text-sm font-bold text-primary hover:text-secondary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ShoppingCart className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2"
          >
            <ShoppingCart className="w-6 h-6 text-primary" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-6 px-6 flex flex-col gap-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none bg-gray-50"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-lg font-bold",
                  pathname === link.href ? "text-secondary" : "text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {categories.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Categories</p>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-bold text-primary hover:text-secondary transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
