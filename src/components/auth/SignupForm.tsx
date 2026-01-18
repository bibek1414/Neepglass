"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema, SignupFormValues } from "@/schemas/customer/signup.form";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SignupForm = () => {
    const { signup, isLoading } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            await signup(data);
        } catch (error: any) {
            if (error.status === 400 && error.data?.error?.params?.field_errors) {
                const fieldErrors = error.data.error.params.field_errors;
                Object.keys(fieldErrors).forEach((field) => {
                    setError(field as keyof SignupFormValues, {
                        type: "server",
                        message: fieldErrors[field][0],
                    });
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50">

                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-primary-foreground font-bold text-2xl italic">
                                S
                            </span>
                        </div>
                    </Link>

                    <h2 className="text-3xl font-extrabold text-foreground">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Join SastoBazaar and start your premium shopping journey
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    placeholder="John"
                                    {...register("first_name")}
                                    className={errors.first_name ? "border-destructive" : ""}
                                />
                                {errors.first_name && (
                                    <p className="text-xs text-destructive">
                                        {errors.first_name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    placeholder="Doe"
                                    {...register("last_name")}
                                    className={errors.last_name ? "border-destructive" : ""}
                                />
                                {errors.last_name && (
                                    <p className="text-xs text-destructive">
                                        {errors.last_name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register("email")}
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+977 98XXXXXXXX"
                                {...register("phone")}
                                className={errors.phone ? "border-destructive" : ""}
                            />
                            {errors.phone && (
                                <p className="text-xs text-destructive">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                className={errors.password ? "border-destructive" : ""}
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                                className={errors.confirmPassword ? "border-destructive" : ""}
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 rounded-xl font-bold text-lg"
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-primary hover:text-primary/80"
                        >
                            Sign in instead
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
