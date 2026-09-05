import type { Metadata } from "next";
import Experience from "@/components/Experience";
import { defaultDescription, defaultSocialImage, defaultTitle } from "@/lib/seo";
import styles from "./loader-identity.module.css";

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
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

export default function HomePage() {
  return (
    <div className={styles.loaderScope}>
      <Experience />
    </div>
  );
}
