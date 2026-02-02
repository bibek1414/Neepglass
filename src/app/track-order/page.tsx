'use client';

import React, { useState } from 'react';
import FloatingInput from '@/components/ui/FloatingInput';
import Button from '@/components/ui/BrandButton';
import { Search, Package } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) setShowStatus(true);
  };

  return (
    <div className="pb-20">
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-primary">Track Your Order</h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto mt-6">
            Enter your order ID and email to see the real-time status of your delivery.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-2xl">
          <form onSubmit={handleTrack} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <FloatingInput
                  label="Order ID (e.g. #NG12345)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="shrink-0">
                <Search className="w-5 h-5 mr-2" />
                Track Status
              </Button>
            </div>
          </form>

          {showStatus && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-primary/10">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Order Status</p>
                    <h3 className="text-2xl font-bold text-primary mt-1">Processing</h3>
                  </div>
                  <Package className="w-12 h-12 text-secondary opacity-20" />
                </div>

                <div className="relative space-y-12">
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-100" />

                  {[
                    { title: 'Order Placed', time: 'Today, 10:30 AM', active: true, done: true },
                    { title: 'Payment Confirmed', time: 'Today, 11:00 AM', active: true, done: true },
                    { title: 'Processing & Quality Check', time: 'In Progress', active: true, done: false },
                    { title: 'Shipped', time: 'Pending', active: false, done: false },
                    { title: 'Delivered', time: 'Pending', active: false, done: false },
                  ].map((step, i) => (
                    <div key={i} className="relative pl-10">
                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 ${
                        step.done ? 'bg-secondary border-secondary/20' :
                        step.active ? 'bg-white border-secondary' : 'bg-white border-gray-200'
                      }`} />
                      <h4 className={`font-bold ${step.active ? 'text-primary' : 'text-gray-400'}`}>{step.title}</h4>
                      <p className="text-xs text-gray-500">{step.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
