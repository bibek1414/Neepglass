"use client";

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/schemas/customer/login.form';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginForm = () => {
    const { login, isLoading } = useAuth();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await login(data);
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.status === 400 && error.data?.error?.params?.field_errors) {
                const fieldErrors = error.data.error.params.field_errors;
                Object.keys(fieldErrors).forEach((field) => {
                    setError(field as keyof LoginFormValues, {
                        type: 'server',
                        message: fieldErrors[field][0],
                    });
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-3xl shadow-xl shadow-secondary/50 border border-border/50">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-primary-foreground font-bold text-2xl italic">S</span>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-foreground">Welcome Back</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please enter your details to sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register('email')}
                                className={errors.email ? 'border-destructive focus:ring-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" title="sm" className="text-xs text-primary hover:underline font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                className={errors.password ? 'border-destructive focus:ring-destructive' : ''}
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold text-lg shadow-lg shadow-primary/10 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="font-bold text-primary hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
