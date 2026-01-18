"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFAQs } from '@/hooks/use-faq';
import { Skeleton } from '@/components/ui/skeleton';
import { FAQ } from '@/types/faq';

export const FAQSection = () => {
    const { data: faqs = [], isLoading } = useFAQs();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 md:py-32 px-4 max-w-4xl mx-auto ">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <HelpCircle size={14} /> Common Questions
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">Frequently Asked <span className="text-primary">Questions</span></h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Everything you need to know about our premium products and services.
                </p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 rounded-2xl" />
                    ))
                ) : (
                    faqs.map((faq: FAQ, index: number) => (
                        <div
                            key={faq.id}
                            className={cn(
                                "group rounded-3xl border transition-all duration-300",
                            )}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-10 flex items-center justify-between text-left h-auto hover:bg-transparent"
                            >
                                <span className={cn(
                                    "text-lg font-bold transition-colors",
                                    openIndex === index ? "text-primary" : "text-foreground group-hover:text-primary"
                                )}>
                                    {faq.question}
                                </span>
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",

                                )}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>
                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="px-8 pb-8 text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </section>
    );
};
