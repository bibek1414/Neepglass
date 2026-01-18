"use client";

import React from 'react';
import Link from 'next/link';
import { SignupForm } from '@/components/auth/SignupForm';

const SignupPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white font-bold text-2xl italic">L</span>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Join Lumina and start your premium shopping journey
                    </p>
                </div>

                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
