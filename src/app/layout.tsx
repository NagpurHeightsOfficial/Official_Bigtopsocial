import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "BigTopSocial | The Creative & Technology Transformation Company",
  description: "BigTopSocial is a Creative & Technology Transformation Company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ronzino.variable}>
      <body
        className={`antialiased bg-[#1D1D1F] text-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
