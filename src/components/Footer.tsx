import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-12">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-5">
          <Link href="/" className="text-2xl tracking-tight block">
            Nep<span className="text-secondary">Glass</span>
          </Link>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Premium eyewear and lens solutions designed for clarity, comfort,
            and everyday life in Nepal.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full bg-white/10 hover:bg-secondary/80 transition"
            >
              <Facebook className="w-4 h-4" />
            </Link>

            <Link
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full bg-white/10 hover:bg-secondary/80 transition"
            >
              <Instagram className="w-4 h-4" />
            </Link>

            <Link
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-full bg-white/10 hover:bg-secondary/80 transition"
            >
              <Twitter className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="mb-6 text-xs uppercase tracking-widest text-gray-300">
            Shop
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/products" className="hover:text-secondary transition">All Products</Link></li>
            <li><Link href="/categories/sunglasses" className="hover:text-secondary transition">Sunglasses</Link></li>
            <li><Link href="/categories/frames" className="hover:text-secondary transition">Frames</Link></li>
            <li><Link href="/categories/lenses" className="hover:text-secondary transition">Lenses</Link></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="mb-6 text-xs uppercase tracking-widest text-gray-300">
            Explore
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/blog" className="hover:text-secondary transition">Blog</Link></li>
            <li><Link href="/about" className="hover:text-secondary transition">Our Story</Link></li>
            <li><Link href="/faqs" className="hover:text-secondary transition">FAQs</Link></li>
            <li><Link href="/track-order" className="hover:text-secondary transition">Track Order</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="mb-6 text-xs uppercase tracking-widest text-gray-300">
            Policies
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/privacy-policy" className="hover:text-secondary transition">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-secondary transition">Terms & Conditions</Link></li>
            <li><Link href="/shipping-and-returns" className="hover:text-secondary transition">Shipping & Returns</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="container-custom mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-wider text-white">
        <p className='text-white'>© {new Date().getFullYear()} NepGlass. All rights reserved.</p>
        <p className='text-white'>Crafted for Nepal 🇳🇵</p>
      </div>
    </footer>
  );
}
