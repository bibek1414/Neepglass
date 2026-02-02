'use client';

import React from 'react';
import { useFAQs } from '@/hooks/use-faq';

export default function FAQPage() {
  const { data: faqs, isLoading } = useFAQs();

  return (
    <div className="pb-20">
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-primary">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mt-6">
            Find answers to common questions about our products, shipping, and services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <div className="space-y-12">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-20 bg-gray-50 rounded w-full"></div>
                </div>
              ))
            ) : (
              faqs?.map((faq, i) => (
                <div key={i} className="group">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-start gap-4">
                    <span className="text-secondary">Q.</span>
                    {faq.question}
                  </h3>
                  <div className="flex gap-4 pl-10 border-l-2 border-gray-100 group-hover:border-secondary transition-colors">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))
            )}
            {!isLoading && faqs?.length === 0 && (
              <p className="text-center text-gray-500">No FAQs found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
