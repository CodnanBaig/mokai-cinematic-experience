export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mokai-cinematic-experience.vercel.app").replace(/\/$/, "");

export const siteName = "Mokai";

export const defaultTitle = "Mokai Bandra | Coffee, Matcha & Asian-Inspired Café";

export const defaultDescription =
  "Visit Mokai in Pali Hill, Bandra West for specialty coffee, ceremonial matcha, Asian-inspired food and a design-led café experience in Mumbai.";

export const defaultSocialImage = "/images/mokai-exterior.webp";

export const mokaiLocalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": `${siteUrl}/#mokai`,
  name: "Mokai",
  url: siteUrl,
  description: defaultDescription,
  image: [`${siteUrl}${defaultSocialImage}`],
  telephone: "+91 98200 62166",
  sameAs: ["https://www.instagram.com/mokaiindia/"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "600, 601, 602, Hill Crest Building, Dr Ambedkar Road, Pali Hill",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  servesCuisine: ["Coffee", "Matcha", "Asian-inspired food"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "23:30",
    },
  ],
};
