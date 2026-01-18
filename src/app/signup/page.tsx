import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup - SastoBazaar",
    description: "Create a SastoBazaar account.",
};

export default function SignupPage() {
    return <SignupForm />;
}
