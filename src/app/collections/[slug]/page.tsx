import ProductDetailsView from "@/components/products/ProductDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product Details - SastoBazaar",
    description: "View product details and purchase at SastoBazaar.",
};

export default function ProductDetailsPage() {
    return <ProductDetailsView />;
}
