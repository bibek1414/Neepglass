"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useSubmitContactForm } from "@/hooks/use-contact";
import { ContactFormData } from "@/types/contact";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import tenant from "../../../tenant.json";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function ContactUs() {
    const { mutate: submitContact, isPending } = useSubmitContactForm(tenant.tenantName);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const message = formData.get("message") as string;

        const submissionData: ContactFormData = {
            name: `${firstName} ${lastName}`.trim(),
            email: email,
            phone_number: phone,
            message: message,
        };

        submitContact(submissionData, {
            onSuccess: () => {
                toast.success("Message sent successfully");
                setFormKey(prev => prev + 1);
            },
            onError: (error) => {
                toast.error(
                    error instanceof Error ? error.message : "Failed to send message"
                );
            },
        });
    };

    return (
        <motion.section
            className="relative space-y-8 overflow-hidden px-4 py-8 md:space-y-12 md:px-4 md:py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
        >
            <div className="pointer-events-none absolute top-40 -left-20 z-10 hidden h-60 w-60 rounded-full bg-primary opacity-10 blur-3xl md:block"></div>
            <div className="bg-primary pointer-events-none absolute -right-20 bottom-40 z-10 hidden h-60 w-60 rounded-full opacity-10 blur-3xl md:block"></div>

            <div className="relative z-20 mx-auto max-w-2xl px-4 text-center">
                <div className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                    Get In Touch
                </div>
            </div>

            <div className="relative z-20 mx-auto max-w-xl">
                <form
                    key={formKey}
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            type="text"
                            name="firstName"
                            required
                            label="First Name *"
                            className="bg-white/50 backdrop-blur-sm"
                        />
                        <Input
                            type="text"
                            name="lastName"
                            required
                            label="Last Name *"
                            className="bg-white/50 backdrop-blur-sm"
                        />
                    </div>

                    <Input
                        type="email"
                        name="email"
                        required
                        label="Email Address *"
                        className="bg-white/50 backdrop-blur-sm"
                    />

                    <Input
                        type="tel"
                        name="phone"
                        required
                        label="Phone Number *"
                        className="bg-white/50 backdrop-blur-sm"
                    />

                    <Textarea
                        name="message"
                        required
                        label="Tell us about your project or questions... *"
                        className="bg-white/50 backdrop-blur-sm"
                    />

                    <Button
                        type="submit"
                        className="hover:shadow-primary/20 h-12 w-full text-base font-medium transition-all hover:shadow-lg"
                        disabled={isPending}
                    >
                        {isPending ? (
                            "Sending..."
                        ) : (
                            <>
                                Send Message <Send className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </motion.section>
    );
}
