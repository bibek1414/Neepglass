'use client';

import React, { useState } from 'react';
import FloatingInput from '@/components/ui/FloatingInput';
import Button from '@/components/ui/BrandButton';
import { Send, Loader2 } from 'lucide-react';
import { useSubmitContactForm } from '@/hooks/use-contact';
import { toast } from 'sonner';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: ''
    });

    const submitContactMutation = useSubmitContactForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitContactMutation.mutate({
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            message: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ''}${formData.message}`
        }, {
            onSuccess: () => {
                toast.success('Thank you for reaching out! We will get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
            },
            onError: (error: unknown) => {
                const message = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
                toast.error(message);
            }
        });
    };

    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <FloatingInput
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <FloatingInput
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <FloatingInput
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                />
                <div className="relative">
                    <textarea
                        className="peer w-full min-h-[150px] px-4 pt-5 pb-2 text-primary bg-gray-50/50 border border-gray-200 rounded-lg outline-none transition-all focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                        placeholder=" "
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    />
                    <label className={cn(
                        "absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 pointer-events-none origin-left",
                        (formData.message.length > 0) && "transform -translate-y-2.5 scale-75 text-secondary"
                    )}>
                        Your Message
                    </label>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={submitContactMutation.isPending}>
                    {submitContactMutation.isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
