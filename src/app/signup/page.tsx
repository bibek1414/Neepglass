"use client";

import React from 'react';
import Link from 'next/link';
import { SignupForm } from '@/components/auth/SignupForm';

const SignupPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-primary-foreground font-bold text-2xl italic">S</span>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-foreground">Create Account</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Join SastoBazaar and start your premium shopping journey
                    </p>
                </div>

                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
