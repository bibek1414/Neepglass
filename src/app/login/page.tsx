"use client";

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white font-bold text-2xl italic">L</span>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Please enter your details to sign in to your account
                    </p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
