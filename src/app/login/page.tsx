import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Login - SastoBazaar",
    description: "Login to your SastoBazaar account.",
};

export default function LoginPage() {
    return <LoginForm />;
}
