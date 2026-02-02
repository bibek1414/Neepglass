
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import SideCart from "@/components/cart/side-cart";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

import { constructMetadata } from "@/config/metadata";

export const metadata = constructMetadata();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <QueryProvider>
          <CartProvider>
            <NextTopLoader color="#6f57cfp" />
            <Navbar />
            <SideCart />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" richColors />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
