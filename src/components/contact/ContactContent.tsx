"use client";

import React from 'react';
import { Send, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ContactContent = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent successfully! Our team will contact you soon.");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">We&apos;re here to <span className="text-indigo-600">help.</span></h1>
                        <p className="text-slate-500 text-xl leading-relaxed">
                            Have a question about our collections or need assistance with an order? Our dedicated support team is ready to provide you with the premium service you deserve.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Information Column */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {[
                                { title: "Emails Us", value: "concierge@SastoBazaar.com", sub: "Response within 24 hours" },
                                { title: "Call Us", value: "+1 (555) 000-0000", sub: "Mon-Fri, 9am - 6pm EST" },
                                { title: "Visit Us", value: "721 Luxury Ave, NY", sub: "Flagship Showroom" },
                                { title: "Support Hours", value: "24/7 Assistance", sub: "For premium members" },
                            ].map((item, i) => (
                                <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500">

                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{item.title}</h3>
                                    <p className="text-lg font-bold text-slate-900 mb-1">{item.value}</p>
                                    <p className="text-sm text-slate-500">{item.sub}</p>
                                </div>
                            ))}
                        </div>


                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Send a Message</h2>
                            <p className="text-slate-500 mb-10">Fill out the form below and we&apos;ll get back to you shortly.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="John Doe" required className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" required className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="How can we help?" required className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Tell us what you need..."
                                        required
                                        className="w-full p-5 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-lg font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                >
                                    Send Message <Send size={20} />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactContent;
