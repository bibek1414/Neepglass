import OrderSuccessContent from "@/components/checkout/OrderSuccessContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Success - SastoBazaar",
    description: "Your order has been placed successfully at SastoBazaar.",
};

export default function OrderSuccessPage() {
    return <OrderSuccessContent />;
}
