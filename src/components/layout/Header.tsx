"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '../../hooks/use-auth';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useSiteConfig } from '@/hooks/use-site-config';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { SearchBar } from './SearchBar';

export const Header: React.FC<{ onCartOpen: () => void }> = ({ onCartOpen }) => {
    const { itemCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const { data: wishlistItems } = useWishlist();
    const wishlistCount = wishlistItems?.length || 0;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: config } = useSiteConfig();
    const router = useRouter();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/collections' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blogs' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {config?.logo ? (
                            <div className="relative overflow-hidden">
                                <Image
                                    src={config.logo}
                                    alt={config.business_name || "Logo"}
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <div className="w-10 h-10">
                                <Skeleton className="w-10 h-10" />
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary font-medium transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:block flex-1 max-w-sm mx-4">
                            <SearchBar />
                        </div>

                        <Link href="/wishlist" className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
                            <Heart size={22} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Button variant="ghost" size="icon" onClick={onCartOpen} className="text-muted-foreground hover:text-primary relative">
                            <ShoppingCart size={22} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                                    {itemCount}
                                </span>
                            )}
                        </Button>

                        <div className="relative">
                            <Button
                                variant="ghost"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="h-auto p-1 sm:p-2 flex items-center gap-1 text-muted-foreground hover:text-primary hover:bg-transparent"
                            >
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                                    {user ? (
                                        <span className="text-xs font-bold text-primary">
                                            {user.first_name?.[0]}{user.last_name?.[0]}
                                        </span>
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>
                                <ChevronDown size={14} className={cn("transition-transform", isProfileOpen && "rotate-180")} />
                            </Button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                                    {!isAuthenticated ? (
                                        <>
                                            <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary">
                                                <User size={16} /> Login
                                            </Link>
                                            <Link href="/signup" className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary">
                                                <User size={16} /> Sign Up
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50 mb-1">
                                                Hi, {user?.first_name || 'User'}
                                            </div>
                                            <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary">
                                                <User size={16} /> Profile
                                            </Link>
                                            <Link href="/my-orders" className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary">
                                                <Search size={16} /> My Orders
                                            </Link>
                                            <hr className="my-1 border-border/50" />
                                            <Button
                                                variant="ghost"
                                                onClick={() => { logout(); setIsProfileOpen(false); }}
                                                className="w-full justify-start gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/5 hover:text-destructive h-auto font-normal"
                                            >
                                                <LogOut size={16} /> Logout
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-muted-foreground hover:text-primary"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-background border-t border-border/50 py-4 px-6">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col gap-3 border-t border-border/50">
                            {!isAuthenticated && (
                                <Button onClick={() => { router.push('/login'); setIsMobileMenuOpen(false); }}>
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
