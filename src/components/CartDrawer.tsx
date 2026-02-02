'use client';

import React from 'react';
import { useCart } from '@/hooks/use-cart';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Button from './ui/BrandButton';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between py-3 px-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <p className=" text-lg mt-5 text-primary">Shopping Cart</p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-14 h-14 text-gray-200 mb-4" />
                  <p className="text-gray-500">Your cart is currently empty</p>
                  <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedVariant?.id || 'none'}`} className="group relative flex gap-4 bg-white p-2 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    {/* Image */}
                    <Link href={`/products/${item.product.slug}`} onClick={() => setIsDrawerOpen(false)} className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src={item.product.thumbnail_image || '/placeholder.png'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link href={`/products/${item.product.slug}`} onClick={() => setIsDrawerOpen(false)} className='hover:text-secondary transition-colors'>
                            <h3 className="text-sm font-semibold text-primary leading-tight line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1"
                            aria-label="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                          {item.product.category?.name}
                        </p>
                        {item.selectedVariant && (
                          <p className="text-[10px] text-gray-400">
                            {Object.entries(item.selectedVariant.option_values).map(([k, v]) => `${k}: ${v}`).join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex items-end justify-between mt-2">
                        <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-sm h-8">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)
                            }
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors rounded-l-lg"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)
                            }
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors rounded-r-lg"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-primary">
                          Rs. {(parseFloat(item.selectedVariant?.price || item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-xl text-primary">
                    Rs. {totalPrice}
                  </span>
                </div>

                <Link href="/checkout" onClick={() => setIsDrawerOpen(false)}>
                  <Button size="lg" className="w-full rounded-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="mt-4 text-center text-xs text-gray-400">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
