import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const candidateHost =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "lionmarketingai.com";
  const host = /^[a-z0-9.-]+(?::\d+)?$/i.test(candidateHost)
    ? candidateHost
    : "lionmarketingai.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    applicationName: "Lion Marketing",
    title: "Lion Marketing | Life Insurance Leads for Steady Production",
    description:
      "Lion Marketing helps agents keep their pipeline full with exclusive, campaign-qualified insurance leads that meet agreed minimum criteria before delivery.",
    keywords: [
      "life insurance leads",
      "exclusive life insurance leads",
      "pay per lead life insurance",
      "verified life insurance leads",
      "prequalified life insurance leads",
      "final expense leads",
      "life insurance lead generation company",
      "life insurance lead vendor",
    ],
    alternates: {
      canonical: "https://lionmarketingai.com",
    },
    openGraph: {
      title: "Lion Marketing | Life Insurance Leads for Steady Production",
      description:
        "Keep your pipeline moving with exclusive, campaign-qualified insurance leads that meet agreed minimum criteria before delivery.",
      type: "website",
      siteName: "Lion Marketing",
      images: [
        {
          url: socialImage,
          width: 1732,
          height: 908,
          alt: "Lion Marketing — More conversations. Less wasted dial time.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Lion Marketing | Life Insurance Leads for Steady Production",
      description:
        "Exclusive, campaign-qualified insurance leads built around your products, markets, and minimum criteria.",
      images: [socialImage],
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
    category: "Life insurance lead generation",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
