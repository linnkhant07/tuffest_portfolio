import type { Metadata } from "next";
import Script from "next/script";
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Script id="force-top-on-load" strategy="beforeInteractive">
          {`try { if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'; if (!window.location.hash) window.scrollTo(0, 0); } catch {}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
