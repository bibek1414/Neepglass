import BlogListingContent from "@/components/news/BlogListingContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News - SastoBazaar",
    description: "Read the latest news and stories from SastoBazaar.",
};

export default function BlogListingPage() {
    return <BlogListingContent />;
}
