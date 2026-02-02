'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFAQs } from '@/hooks/use-faq';

export default function FAQSection() {
    const { data: faqs, isLoading } = useFAQs();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-gray-50 py-16">
            <div className="container-custom max-w-3xl">
                {/* Heading */}
                <div className="mb-10 text-center">
                    <span className="text-xs uppercase tracking-wide text-secondary">
                        Support
                    </span>
                    <h2 className="text-primary mt-2">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ list */}
                <div className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-100">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white px-5 py-4 h-14" />
                        ))
                    ) : (
                        faqs?.map((faq, i) => (
                            <div key={i}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                                >
                                    <h4
                                        className={`text-sm md:text-base transition-colors ${openIndex === i ? 'text-secondary' : 'text-primary'
                                            }`}
                                    >
                                        {faq.question || (faq as { question?: string; q?: string }).q}
                                    </h4>

                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180 text-secondary' : ''
                                            }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                        >
                                            <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                                                {faq.answer || (faq as { answer?: string; a?: string }).a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))
                    )}
                </div>

                {/* Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/faqs"
                        className="inline-flex items-center text-sm text-primary hover:text-secondary transition"
                    >
                        View all FAQs
                        <ChevronDown className="ml-1 h-4 w-4 -rotate-90" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
