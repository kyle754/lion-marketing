import type { Metadata } from "next";

const siteName = "Lion Marketing";
const ogImage = {
  url: "/og.png",
  width: 1732,
  height: 908,
  alt: "Lion Marketing — More conversations. Less wasted dial time.",
};

type PageMetadata = {
  title: string;
  description: string;
  pathname: `/${string}`;
  socialDescription?: string;
};

export function createPageMetadata({
  title,
  description,
  pathname,
  socialDescription = description,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description: socialDescription,
      url: pathname,
      type: "website",
      siteName,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images: [ogImage.url],
    },
  };
}
