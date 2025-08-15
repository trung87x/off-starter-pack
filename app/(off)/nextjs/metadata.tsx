// app/metadata.tsx
import type { Metadata } from "next";

// Khai báo metadata global
export const siteMetadata: Metadata = {
  title: {
    default: "Acme Dashboard",
    template: "%s | Acme Dashboard",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  keywords: ["Next.js", "Dashboard", "Course"],
  robots: "index, follow",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Acme Dashboard",
    description: "Learn Next.js with the official course dashboard.",
    url: "https://example.com",
    siteName: "Acme Dashboard",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Acme Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acme Dashboard",
    description: "Learn Next.js with the official course dashboard.",
    images: ["/twitter-image.jpg"],
    creator: "@acme",
  },
};
