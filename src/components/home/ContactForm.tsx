'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/BrandButton';
import { Send } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Input } from '@/components/ui/BrandInput';
import { useSubmitContactForm } from '@/hooks/use-contact';
import { toast } from 'sonner';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function ContactForm() {
    const [isPending, setIsPending] = useState(false);
    const submitContactMutation = useSubmitContactForm();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            email: formData.get('email') as string,
            phone_number: formData.get('phone') as string,
            message: formData.get('message') as string,
        };

        submitContactMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Message sent successfully! We will get back to you shortly.');
                setIsPending(false);
                (e.target as HTMLFormElement).reset();
            },
            onError: (error) => {
                const message = error instanceof Error ? error.message : 'Failed to send message.';
                toast.error(message);
                setIsPending(false);
            }
        });
    };

    return (
        <motion.section
            className="bg-white py-10 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
        >
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10 flex flex-col items-center">
                {/* Section Title */}
                <div className="text-center max-w-2xl">

                    <h2 className="text-primary ">
                        Get in Touch
                    </h2>
                </div>

                {/* Contact Form */}
                <div className="w-full max-w-xl bg-white p-8 md:p-10 rounded-3xl ">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input
                                type="text"
                                name="firstName"
                                required
                                label="First Name"
                            />

                            <Input
                                type="text"
                                name="lastName"
                                required
                                label="Last Name"
                            />
                        </div>

                        <Input
                            type="email"
                            name="email"
                            required
                            label="Email Address"
                        />

                        <Input
                            type="tel"
                            name="phone"
                            required
                            label="Phone Number"
                        />

                        <div className="relative">
                            <textarea
                                name="message"
                                rows={4}
                                placeholder=" "
                                className="peer w-full px-4 py-3 pt-7 text-base border border-gray-200 rounded-lg bg-white/80 outline-none focus:ring-0 transition-all duration-200 resize-none md:text-sm placeholder-transparent"
                                required
                            />
                            <label className="text-muted-foreground pointer-events-none absolute left-4 top-2 text-[10px] font-medium transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs">
                                How can we help?
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-lg h-12 text-base"
                            disabled={isPending}
                        >
                            {isPending ? (
                                "Sending..."
                            ) : (
                                <>
                                    Send Message <Send className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </motion.section>
    );
}
