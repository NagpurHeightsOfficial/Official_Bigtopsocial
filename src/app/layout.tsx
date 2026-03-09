import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";



const ronzino = localFont({
  src: [
    {
      path: "../fonts/Ronzino-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Ronzino-Oblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Ronzino-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Ronzino-MediumOblique.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Ronzino-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Ronzino-BoldOblique.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ronzino",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bigtopsocial.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  title: {
    default: "BigTopSocial | Social Media Agency",
    template: "%s | BigTopSocial"
  },
  description: "BigTopSocial is a leading creative and technology transformation company specializing in social media marketing, brand strategy, content creation, photography, videography, and digital solutions.",
  keywords: [
    "social media marketing",
    "digital marketing agency",
    "brand strategy",
    "content creation",
    "photography services",
    "videography",
    "creative agency",
    "technology transformation",
    "SEO services",
    "performance marketing",
    "social media management",
    "brand identity design",
    "digital transformation",
    "creative solutions",
    "marketing agency"
  ],

  authors: [{ name: "BigTopSocial" }],
  creator: "BigTopSocial",
  publisher: "BigTopSocial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bigtopsocial.com",
    title: "BigTopSocial | Creative & Technology Transformation Company",
    description: "Transform your brand with cutting-edge creative and technology solutions. Expert social media marketing, content creation, and digital strategy.",
    siteName: "BigTopSocial",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BigTopSocial - Creative & Technology Transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BigTopSocial | Creative & Technology Transformation Company",
    description: "Transform your brand with cutting-edge creative and technology solutions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ronzino.variable}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`antialiased bg-[#1D1D1F] text-white font-sans`}
      >
        <Cursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
