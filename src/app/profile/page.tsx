import React from "react";
import { ProfileForm } from "@/components/profile/ProfileForm";

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-secondary/10">
            <main className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">My Profile</h1>
                        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
                    </div>

                    <div className="bg-card rounded-3xl shadow-xl shadow-primary/5 border border-border/50 p-6 md:p-10">
                        <div className="flex flex-col md:flex-row gap-10">
                            {/* Profile Sidebar/Summary */}
                            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-border/50 pb-8 md:pb-0 md:pr-10">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-primary/20 shadow-inner">
                                        <span className="text-primary text-5xl font-black italic">S</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">Account Settings</h2>
                                    <p className="text-sm text-muted-foreground mt-1">Keep your profile up to date</p>

                                    <div className="mt-8 w-full space-y-2">
                                        <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-primary text-sm font-semibold flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            General Info
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Form */}
                            <div className="md:w-2/3">
                                <ProfileForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
