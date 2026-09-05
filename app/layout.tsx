import type { Metadata, Viewport } from "next";
import {
  defaultDescription,
  defaultSocialImage,
  defaultTitle,
  mokaiLocalBusinessJsonLd,
  siteName,
  siteUrl,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    languages: {
      "en-IN": "/",
    },
  },
  icons: {
    icon: "/brand/mokai-hanko-filled.svg",
    shortcut: "/brand/mokai-hanko-filled.svg",
    apple: "/brand/raster/mokai-hanko-filled.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [
      {
        url: defaultSocialImage,
        alt: "Mokai café in Bandra, Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultSocialImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusinessJsonLd = JSON.stringify(mokaiLocalBusinessJsonLd).replace(/</g, "\\u003c");

  return (
    <html lang="en-IN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessJsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
