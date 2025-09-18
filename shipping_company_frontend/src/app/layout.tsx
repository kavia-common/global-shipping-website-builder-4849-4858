import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import ClientInit from "./client-init";

export const metadata: Metadata = {
  title: "Global Shipping Solutions You Can Trust | ShipCo",
  description: "Professional shipping services, real-time tracking, and worldwide logistics.",
  applicationName: "ShipCo",
  generator: "Next.js",
  themeColor: "#003366",
  other: { "color-scheme": "light" },
  openGraph: {
    title: "ShipCo - Global Shipping",
    description: "Track packages, book shipments, and manage logistics globally.",
    type: "website",
    url: "https://example.com",
    siteName: "ShipCo",
  },
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico" },
};

function Header() {
  return (
    <header className="ocean-navbar">
      <div className="ocean-container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2" aria-label="ShipCo Home">
          <div className="w-8 h-8 rounded bg-[var(--ocean-deep)]" />
          <span className="font-bold text-lg text-[var(--ocean-deep)]">ShipCo</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link className="ocean-nav-item" href="/services">Services</Link>
          <Link className="ocean-nav-item" href="/tracking">Tracking</Link>
          <Link className="ocean-nav-item" href="/about">About</Link>
          <Link className="ocean-nav-item" href="/contact">Contact</Link>
          <Link className="ocean-nav-item" href="/portal">Portal</Link>
          <Link className="ocean-nav-item" href="/booking">Booking</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/booking" className="btn-ocean-primary">Get Quote</Link>
          <Link href="/tracking" className="btn-ocean-secondary">Track</Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t" style={{ borderColor: "var(--professional-border)" }}>
      <div className="ocean-container py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded bg-[var(--ocean-deep)]" />
            <span className="font-bold text-lg text-[var(--ocean-deep)]">ShipCo</span>
          </div>
          <p className="text-ocean-small">Reliable, fast, and global shipping solutions with world-class tracking.</p>
        </div>
        <div>
          <h4 className="text-ocean-h4 mb-3">Company</h4>
          <ul className="space-y-2 text-ocean-small">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-ocean-h4 mb-3">Legal</h4>
          <ul className="space-y-2 text-ocean-small">
            <li><a href="#" aria-disabled="true">Privacy Policy</a></li>
            <li><a href="#" aria-disabled="true">Terms of Service</a></li>
            <li><a href="#" aria-disabled="true">GDPR Compliance</a></li>
          </ul>
        </div>
      </div>
      <div className="ocean-container py-4 text-ocean-small border-t" style={{ borderColor: "var(--professional-border)" }}>
        © {new Date().getFullYear()} ShipCo. All rights reserved.
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Client-only initializers (e.g., SW registration) */}
        <ClientInit />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
