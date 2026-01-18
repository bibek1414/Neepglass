"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useCreateNewsletter } from "@/hooks/use-newsletter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const Newsletter: React.FC = () => {
    const [email, setEmail] = useState("");
    const createNewsletter = useCreateNewsletter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        createNewsletter.mutate(
            { email },
            {
                onSuccess: () => {
                    toast.success("Subscribed successfully!");
                    setEmail("");
                },
                onError: (error: any) => {
                    toast.error(
                        error?.message || "Failed to subscribe"
                    );
                },
            }
        );
    };

    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Card className="border-none">
                    <CardContent className="p-8 md:p-12 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Join The Inner Circle
                        </h2>

                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Subscribe to our newsletter for early access to sales, exclusive
                            rewards, and curated content.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12"
                            />

                            <Button
                                type="submit"
                                disabled={createNewsletter.isPending}
                                className="h-12 px-8 font-semibold"
                            >
                                {createNewsletter.isPending
                                    ? "Subscribing..."
                                    : "Subscribe"}
                            </Button>
                        </form>

                        <p className="mt-4 text-xs text-muted-foreground">
                            No spam, just pure goodness. Unsubscribe at any time.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
