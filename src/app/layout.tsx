import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NepGlass | Premium Eyewear in Nepal",
  description: "Specializing in premium lens solutions, stylish frames, and trendsetting sunglasses designed for style and comfort.",
};

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
            <CartDrawer />
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
