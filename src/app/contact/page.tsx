import ContactContent from "@/components/contact/ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - SastoBazaar",
    description: "Get in touch with SastoBazaar support team.",
};

export default function ContactPage() {
    return <ContactContent />;
}
