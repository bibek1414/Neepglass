import ProductListingContent from "@/components/products/ProductListingContent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Collections - SastoBazaar",
    description: "Browse our latest collections of premium products at SastoBazaar.",
};

export default function ProductListingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Arriving Soon</span>
                </div>
            </div>
        }>
            <ProductListingContent />
        </Suspense>
    );
}
