import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { getSiteSettings } from "@/lib/db";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
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
