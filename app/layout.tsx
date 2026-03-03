import type { Metadata } from "next";
import { siteData } from "@/content/siteData";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteData.name} | Portfolio`,
  description: siteData.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
