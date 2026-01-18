import BlogDetailsContent from "@/components/news/BlogDetailsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News Details - SastoBazaar",
    description: "Read the full story at SastoBazaar.",
};

export default function BlogDetailPage() {
    return <BlogDetailsContent />;
}
