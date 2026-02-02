import { Metadata } from "next";

export const baseMetadata: Metadata = {
  title: "NepGlass | Premium Eyewear in Nepal",
  description:
    "Specializing in premium lens solutions, stylish frames, and trendsetting sunglasses designed for style and comfort.",
  openGraph: {
    title: "NepGlass | Premium Eyewear in Nepal",
    description:
      "Specializing in premium lens solutions, stylish frames, and trendsetting sunglasses designed for style and comfort.",
    url: "https://nepglass.com", // Replace with actual URL if known or dynamic
    siteName: "NepGlass",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists in public folder or update path
        width: 1200,
        height: 630,
        alt: "NepGlass - Premium Eyewear",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NepGlass | Premium Eyewear in Nepal",
    description:
      "Specializing in premium lens solutions, stylish frames, and trendsetting sunglasses designed for style and comfort.",
    images: ["/og-image.jpg"], // Ensure this image exists
  },
  icons: {
    icon: "/favicon.ico",
  },
};

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = baseMetadata.title as string,
  description = baseMetadata.description as string,
  image = "/og-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
