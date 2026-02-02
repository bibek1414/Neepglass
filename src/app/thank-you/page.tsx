import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/BrandButton';
import { CheckCircle2, Package, ChevronRight } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="container-custom py-40 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-8">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h1 className="text-primary mb-4">Thank You for Your Order!</h1>
      <p className="text-xl text-gray-600 max-w-xl mx-auto mb-12">
        We&apos;ve received your order and we&apos;re getting it ready for shipment.
        You&apos;ll receive a confirmation email shortly with your order details.
      </p>

      <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col items-center gap-6 mb-12">
        <div className="flex items-center gap-4 text-primary font-bold">
          <Package className="w-6 h-6" />
          <span>Estimated Delivery: 2-3 Business Days</span>
        </div>
        <Link href="/track-order">
          <Button variant="outline" size="sm">
            Track Your Order
          </Button>
        </Link>
      </div>

      <Link href="/products">
        <Button size="lg">
          Continue Shopping
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
