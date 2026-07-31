import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Mokai — Coffee Love, Bandra",
  description:
    "A cinematic digital concept for Mokai, Bandra's Asian-inspired coffee house and matcha experience.",
  openGraph: {
    title: "Mokai — Coffee Love, Bandra",
    description: "Indian-made. Asian-inspired. Designed to be experienced slowly.",
    images: ["/images/mokai-exterior.webp"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
