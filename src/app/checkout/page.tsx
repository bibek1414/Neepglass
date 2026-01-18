import CheckoutContent from "@/components/checkout/CheckoutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout - SastoBazaar",
    description: "Complete your premium order at SastoBazaar.",
};

export default function CheckoutPage() {
    return <CheckoutContent />;
}
