"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/schemas/customer/profile.form";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Phone, MapPin, Loader2 } from "lucide-react";

export const ProfileForm = () => {
    const { data: profile, isLoading: isFetching } = useProfile();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    useEffect(() => {
        if (profile) {
            reset({
                first_name: profile.first_name || "",
                last_name: profile.last_name || "",
                email: profile.email || "",
                phone: profile.phone || "",
                address: profile.address || "",
            });
        }
    }, [profile, reset]);

    const onSubmit = (data: ProfileFormValues) => {
        updateProfile(data);
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <Skeleton className="h-11 w-32" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Label htmlFor="first_name" className="text-sm font-semibold flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        First Name
                    </Label>
                    <Input
                        id="first_name"
                        {...register("first_name")}
                        placeholder="Enter your first name"
                        className={`rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all ${errors.first_name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
                            }`}
                    />
                    {errors.first_name && (
                        <p className="text-xs text-destructive font-medium mt-1">{errors.first_name.message}</p>
                    )}
                </div>

                <div className="space-y-4">
                    <Label htmlFor="last_name" className="text-sm font-semibold flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Last Name
                    </Label>
                    <Input
                        id="last_name"
                        {...register("last_name")}
                        placeholder="Enter your last name"
                        className={`rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all ${errors.last_name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
                            }`}
                    />
                    {errors.last_name && (
                        <p className="text-xs text-destructive font-medium mt-1">{errors.last_name.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                </Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                    disabled // Email usually shouldn't be changeable without verification
                    className="rounded-xl border-border/50 bg-secondary/30 cursor-not-allowed opacity-70"
                />
                {errors.email && (
                    <p className="text-xs text-destructive font-medium mt-1">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-4">
                <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number
                </Label>
                <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className={`rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all ${errors.phone ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
                        }`}
                />
                {errors.phone && (
                    <p className="text-xs text-destructive font-medium mt-1">{errors.phone.message}</p>
                )}
            </div>

            <div className="space-y-4">
                <Label htmlFor="address" className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Address
                </Label>
                <textarea
                    id="address"
                    {...register("address")}
                    placeholder="Enter your full address"
                    rows={3}
                    className={`w-full px-4 py-2 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none ${errors.address ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
                        }`}
                />
                {errors.address && (
                    <p className="text-xs text-destructive font-medium mt-1">{errors.address.message}</p>
                )}
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    disabled={isUpdating || !isDirty}
                    className="px-8 py-6 rounded-xl font-bold text-lg shadow-lg shadow-primary/10 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    {isUpdating ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </div>
        </form>
    );
};
