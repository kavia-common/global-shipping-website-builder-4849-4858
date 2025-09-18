"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import anime from "animejs";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="ocean-card p-6 text-center" role="status" aria-live="polite">
      <div className="text-3xl font-bold text-[var(--ocean-deep)] mb-1">{value}</div>
      <div className="text-ocean-small">{label}</div>
    </div>
  );
}

function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="ocean-card p-6">
      <p className="italic text-ocean-body">“{quote}”</p>
      <div className="mt-4 text-sm font-medium text-[var(--ocean-deep)]">{author}</div>
      <div className="text-ocean-small">{role}</div>
    </div>
  );
}

export default function Home() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [tracking, setTracking] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (headlineRef.current) {
      anime({
        targets: headlineRef.current.children,
        translateY: [24, 0],
        opacity: [0, 1],
        delay: anime.stagger(80),
        easing: "easeOutQuad",
        duration: 700
      });
    }
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="ocean-hero-gradient">
        <div className="ocean-container ocean-section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 ref={headlineRef} className="text-ocean-h1 mb-4">
                <span className="block">Global Shipping</span>
                <span className="block">Solutions You</span>
                <span className="block">Can Trust</span>
              </h1>
              <p className="text-ocean-body max-w-prose">
                Express, standard, and freight logistics with real-time visibility and world-class support.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/booking" className="btn-ocean-primary text-center">Get Instant Quote</Link>
                <Link href="/services" className="btn-ocean-secondary text-center">Explore Services</Link>
                <Link href="/about" className="btn-ocean-secondary text-center">Why ShipCo</Link>
              </div>

              {/* Tracking Search */}
              <div className="mt-8 ocean-card p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    setTimeout(() => (window.location.href = `/tracking?num=${encodeURIComponent(tracking)}`), 400);
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                  aria-label="Track Package"
                >
                  <input
                    className="ocean-input flex-1"
                    placeholder="Enter tracking number"
                    value={tracking}
                    onChange={(e) => setTracking(e.target.value)}
                    aria-label="Tracking number"
                  />
                  <button className="btn-ocean-primary min-w-36" disabled={loading}>
                    {loading ? "Searching..." : "Track Package"}
                  </button>
                </form>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="ocean-card p-6">
                <div className="h-56 rounded-lg bg-[var(--ocean-surface)] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0" aria-hidden>
                    <div className="w-[200%] h-8 bg-[rgba(37,99,235,0.15)] blur-2xl rotate-2 absolute -bottom-2 animate-[oceanWave_6s_ease-in-out_infinite]" />
                    <div className="w-[200%] h-8 bg-[rgba(37,99,235,0.12)] blur-2xl -rotate-2 absolute bottom-0 animate-[oceanWave_7s_ease-in-out_infinite]" />
                  </div>
                  <div className="text-center">
                    <div className="text-ocean-h3 mb-2">Real-time Tracking</div>
                    <p className="text-ocean-small">Live updates with smooth progress indicators.</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <Metric label="Delivered" value="1.2M+" />
                  <Metric label="Countries" value="180+" />
                  <Metric label="Satisfaction" value="98%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="ocean-section-padding">
        <div className="ocean-container">
          <h2 className="text-ocean-h2 mb-6">Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Express", desc: "1-2 days worldwide", icon: "⚡" },
              { title: "Standard", desc: "3-7 days reliable", icon: "📦" },
              { title: "Freight", desc: "Global freight", icon: "🚢" },
              { title: "Warehousing", desc: "Smart logistics", icon: "🏭" },
            ].map((s) => (
              <div key={s.title} className="ocean-card p-6">
                <div className="text-3xl mb-3" aria-hidden>{s.icon}</div>
                <div className="text-ocean-h3 mb-1">{s.title}</div>
                <p className="text-ocean-small">{s.desc}</p>
                <Link className="btn-ocean-secondary mt-4 inline-flex" href="/services">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics and Testimonials */}
      <section className="ocean-section-padding bg-white">
        <div className="ocean-container grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-ocean-h3 mb-4">What our clients say</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Testimonial quote="ShipCo transformed our supply chain with reliable express service." author="Maria G." role="E‑commerce Lead" />
              <Testimonial quote="Excellent visibility and proactive support across borders." author="Daniel K." role="Logistics Manager" />
              <Testimonial quote="Fast, professional, and consistent—highly recommended." author="Priya S." role="Operations Director" />
              <Testimonial quote="Tracking and notifications keep customers informed in real-time." author="Liam R." role="Customer Support" />
            </div>
          </div>
          <div className="ocean-card p-6">
            <h3 className="text-ocean-h3 mb-4">Why ShipCo?</h3>
            <ul className="space-y-3 text-ocean-body">
              <li>• Real-time global tracking</li>
              <li>• Flexible delivery options</li>
              <li>• Transparent pricing</li>
              <li>• Sustainable shipping choices</li>
            </ul>
            <Link href="/about" className="btn-ocean-primary mt-6 inline-flex">Discover Our Mission</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
