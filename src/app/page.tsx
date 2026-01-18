import HomeContent from "@/components/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SastoBazaar - Premium Shopping Experience",
  description: "Discover a curated selection of premium lifestyle and luxury products at SastoBazaar.",
};

export default function HomePage() {
  return <HomeContent />;
}
