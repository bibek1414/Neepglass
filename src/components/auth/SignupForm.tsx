"use client";

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormValues } from '@/schemas/customer/signup.form';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SignupForm = () => {
    const { signup, isLoading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            await signup(data);
        } catch (error) {
            console.error('Signup error:', error);
            // Error is handled in AuthContext/toast
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            type="text"
                            placeholder="John"
                            {...register('first_name')}
                            className={errors.first_name ? 'border-red-500 focus:ring-red-500' : ''}
                        />
                        {errors.first_name && (
                            <p className="text-xs text-red-500 mt-1">{errors.first_name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            type="text"
                            placeholder="Doe"
                            {...register('last_name')}
                            className={errors.last_name ? 'border-red-500 focus:ring-red-500' : ''}
                        />
                        {errors.last_name && (
                            <p className="text-xs text-red-500 mt-1">{errors.last_name.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        {...register('email')}
                        className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register('phone')}
                        className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                    />
                    {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                        className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl font-bold text-lg shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50"
            >
                {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="text-center">
                <p className="text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500">
                        Sign in instead
                    </Link>
                </p>
            </div>
        </form>
    );
};
