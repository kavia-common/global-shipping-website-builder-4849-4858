"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const timeline = [
    { year: "1998", text: "Founded with a mission to simplify global shipping." },
    { year: "2007", text: "Expanded to 100+ countries with express services." },
    { year: "2016", text: "Launched real-time tracking platform." },
    { year: "2024", text: "Introduced sustainable shipping initiatives." },
  ];
  const team = [
    { name: "Alex Johnson", role: "CEO" },
    { name: "Priya Sharma", role: "COO" },
    { name: "Kenji Tanaka", role: "CTO" },
    { name: "Maria Garcia", role: "Head of Logistics" },
  ];

  return (
    <main className="ocean-container ocean-section-padding">
      <h1 className="text-ocean-h1 mb-2">About Us</h1>
      <p className="text-ocean-body mb-8">Reliable partners in logistics, delivering value across the globe.</p>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="ocean-card p-6">
          <h3 className="text-ocean-h3 mb-4">Our Mission</h3>
          <p className="text-ocean-body">To deliver fast, reliable, and transparent shipping solutions that empower businesses and delight customers worldwide.</p>
        </div>
        <div className="ocean-card p-6">
          <h3 className="text-ocean-h3 mb-4">Vision</h3>
          <p className="text-ocean-body">Seamless global commerce where distance is no barrier and sustainability is standard.</p>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-ocean-h3 mb-4">Company Timeline</h3>
        <div className="ocean-card p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-[var(--professional-border)]" aria-hidden />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <motion.div key={t.year} className="pl-10 relative" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-[var(--ocean-deep)]" aria-hidden />
                  <div className="font-semibold">{t.year}</div>
                  <div className="text-ocean-small">{t.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-ocean-h3 mb-4">Leadership Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div key={m.name} className="ocean-card p-6 text-center" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="mx-auto w-16 h-16 rounded-full bg-[var(--ocean-surface)] mb-3" aria-hidden />
              <div className="font-medium">{m.name}</div>
              <div className="text-ocean-small">{m.role}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
