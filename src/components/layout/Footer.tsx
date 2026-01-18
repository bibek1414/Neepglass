"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const Footer: React.FC = () => (
    <footer className="bg-primary text-primary-foreground/70 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl italic">S</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-primary-foreground">SastoBazaar<span className="text-primary-foreground/40">.</span></span>
                </Link>
                <p className="text-primary-foreground/60 leading-relaxed">
                    Creating premium shopping experiences with a touch of elegance. We deliver only the finest curated collections.
                </p>
                <div className="flex gap-4">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map(i => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all">
                            <span className="capitalize text-xs text-primary-foreground/80">{i[0]}</span>
                        </a>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-primary-foreground font-bold mb-6">Quick Links</h4>
                <ul className="space-y-4">
                    <li><Link href="/collections" className="hover:text-primary-foreground transition-colors">Shop All</Link></li>
                    <li><Link href="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
                    <li><Link href="/news" className="hover:text-primary-foreground transition-colors">Latest News</Link></li>
                    <li><Link href="/faq" className="hover:text-primary-foreground transition-colors">Support & FAQ</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-primary-foreground font-bold mb-6">Categories</h4>
                <ul className="space-y-4">
                    <li><Link href="/collections?category=electronics" className="hover:text-primary-foreground transition-colors">Electronics</Link></li>
                    <li><Link href="/collections?category=fashion" className="hover:text-primary-foreground transition-colors">Fashion & Apparel</Link></li>
                    <li><Link href="/collections?category=home" className="hover:text-primary-foreground transition-colors">Home & Decor</Link></li>
                    <li><Link href="/collections?category=accessories" className="hover:text-primary-foreground transition-colors">Accessories</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-primary-foreground font-bold mb-6">Newsletter</h4>
                <p className="text-primary-foreground/60 mb-4 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="bg-primary-foreground/5 border-none rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:ring-2 focus:ring-primary-foreground/20 outline-none"
                    />
                    <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none">Subscribe</Button>
                </form>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {new Date().getFullYear()} SastoBazaar Shop Inc. All rights reserved.</p>
            <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
            </div>
        </div>
    </footer>
);
