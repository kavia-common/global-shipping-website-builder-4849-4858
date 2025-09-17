import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "OceanShip Global - Reliable Shipping Solutions Worldwide",
  description: "Trusted international shipping services with real-time tracking, express delivery, and logistics solutions. Ship packages globally with confidence.",
  keywords: "shipping, logistics, international shipping, package tracking, freight, express delivery",
  authors: [{ name: "OceanShip Global" }],
  robots: "index, follow",
  openGraph: {
    title: "OceanShip Global - Reliable Shipping Solutions",
    description: "Trusted international shipping services with real-time tracking and express delivery worldwide.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OceanShip Global - Reliable Shipping Solutions",
    description: "Trusted international shipping services with real-time tracking and express delivery worldwide.",
  },
  viewport: "width=device-width, initial-scale=1",
};

// PUBLIC_INTERFACE
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
