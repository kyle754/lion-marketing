import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lionmarketingai.com"),
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
    canonical: "/",
  },
  openGraph: {
    title: "Lion Marketing | Life Insurance Leads for Steady Production",
    description:
      "Keep your pipeline moving with exclusive, campaign-qualified insurance leads that meet agreed minimum criteria before delivery.",
    type: "website",
    siteName: "Lion Marketing",
    url: "/",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
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
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "64x64",
      },
    ],
    shortcut: "/favicon.png",
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

const googleTagManagerScript = `(function(w,d,s,l,i){var loaded=false;function load(){if(loaded)return;loaded=true;w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)}
['pointerdown','keydown','touchstart','wheel'].forEach(function(e){w.addEventListener(e,load,{once:true,passive:true})})
})(window,document,'script','dataLayer','GTM-NTP4MDT');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: googleTagManagerScript }} />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NTP4MDT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
