"use client";

import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from "@/components/ui/sonner";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                <Header onCartOpen={() => setIsCartOpen(true)} />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                <Toaster />
            </div>
        </AuthProvider>
    );
};
