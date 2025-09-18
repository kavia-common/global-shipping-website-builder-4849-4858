import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="ocean-container ocean-section-padding">
      <section className="ocean-card p-8 text-center" role="alert" aria-live="assertive">
        <h1 className="text-ocean-h1 mb-2">404 – Page Not Found</h1>
        <p className="text-ocean-body mb-4">The page you’re looking for doesn’t exist.</p>
        <Link className="btn-ocean-primary" href="/">Back to Home</Link>
      </section>
    </main>
  );
}
