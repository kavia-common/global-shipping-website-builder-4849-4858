"use client";

import { useState } from "react";
import { FAQ } from "../../components/FAQ";

export default function ContactSupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTimeout(() => {
      setTicketId(`TKT-${Math.random().toString(36).slice(2,8).toUpperCase()}`);
      setSubmitted(true);
    }, 500);
  }

  return (
    <main className="ocean-container ocean-section-padding">
      <h1 className="text-ocean-h1 mb-2">Contact & Support</h1>
      <p className="text-ocean-body mb-8">We’re here to help. Reach us via phone, email, or the form below.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="ocean-card p-6">
            <h3 className="text-ocean-h3 mb-3">Contact Form</h3>
            {!submitted ? (
              <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="ocean-label">Name</label>
                  <input className="ocean-input" required />
                </div>
                <div>
                  <label className="ocean-label">Email</label>
                  <input type="email" className="ocean-input" required />
                </div>
                <div className="md:col-span-2">
                  <label className="ocean-label">Subject</label>
                  <input className="ocean-input" required />
                </div>
                <div className="md:col-span-2">
                  <label className="ocean-label">Message</label>
                  <textarea className="ocean-input h-32" required />
                </div>
                <div className="md:col-span-2">
                  <button className="btn-ocean-primary">Submit</button>
                </div>
              </form>
            ) : (
              <div role="status" className="p-4 rounded bg-green-50 text-green-800">
                Ticket created successfully. Your ID is <strong>{ticketId}</strong>.
              </div>
            )}
          </div>

          <div className="ocean-card p-6">
            <h3 className="text-ocean-h3 mb-3">FAQ</h3>
            <FAQ
              items={[
                { q: "How do I track my shipment?", a: "Use the Tracking page with your tracking number for live updates." },
                { q: "How is pricing calculated?", a: "Pricing depends on weight, dimensions, route, and service level." },
                { q: "What documents are required for international shipments?", a: "Typically invoice and customs declaration; consult our service team for details." },
              ]}
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="ocean-card p-6">
            <h3 className="text-ocean-h3 mb-2">Contact Methods</h3>
            <ul className="text-ocean-body space-y-1">
              <li>📞 +1 (800) 555‑0182</li>
              <li>✉️ support@shipco.example</li>
              <li>💬 Live chat: Mon–Fri, 9am–6pm</li>
            </ul>
          </div>
          <div className="ocean-card p-6">
            <h3 className="text-ocean-h3 mb-2">Support Tickets</h3>
            <p className="text-ocean-small">View your ticket status in the customer portal once logged in.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
