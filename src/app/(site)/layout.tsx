import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JsonLd } from "@/components/site/JsonLd";
import { StickyCTA } from "@/components/site/StickyCTA";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Client Acquisition for Insurance Producers & Advisors | Lion Marketing",
    template: "%s | Lion Marketing",
  },
  description: SITE.description,
  keywords: [
    "life insurance leads",
    "exclusive life insurance leads",
    "insurance agent leads",
    "financial advisor leads",
    "verified insurance leads",
    "pay per lead life insurance",
    "final expense leads",
    "IUL leads",
    "term life leads",
    "independent insurance agent leads",
    "nationwide insurance leads",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Client Acquisition for Insurance Producers | Lion Marketing",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lion Marketing | Client Acquisition for Producers",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-forecast-bg text-forecast-text">
      <JsonLd />
      <Header />
      <div className="pb-20 md:pb-0">{children}</div>
      <Footer />
      <StickyCTA />
    </div>
  );
}
