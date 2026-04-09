import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteSettings } from "@/lib/db";
import "./globals.css";

const playfair = localFont({
  src: [
    { path: "../fonts/PlayfairDisplay.woff2", style: "normal" },
    { path: "../fonts/PlayfairDisplay-Italic.woff2", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = localFont({
  src: [
    { path: "../fonts/DMSans.woff2", style: "normal" },
    { path: "../fonts/DMSans-Italic.woff2", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: {
      default:
        s.meta_title ?? "Khurram Proteins — Premium Poultry & Wholesale Eggs",
      template: "%s | Khurram Proteins",
    },
    description:
      s.meta_description ??
      "Premium poultry farming and wholesale egg supply serving businesses across Pakistan since 1983.",
    openGraph: {
      title: s.meta_title ?? "Khurram Proteins",
      description: s.meta_description ?? "",
      type: "website",
      locale: "en_US",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
