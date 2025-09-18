"use client";

import { useEffect, useState } from "react";
import { listAddresses, createAddress, updateAddress, deleteAddress, listInvoices, fetchDashboardMetrics } from "../../lib/mockApi";
import { Address, Invoice } from "../../lib/types";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ocean-card p-6">
      <h3 className="text-ocean-h3 mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function PortalPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [metrics, setMetrics] = useState<{ delivered: number; inTransit: number; countries: number; customerSatisfaction: number } | null>(null);

  useEffect(() => {
    listAddresses().then(setAddresses);
    listInvoices().then(setInvoices);
    fetchDashboardMetrics().then(setMetrics);
  }, []);

  async function onCreate() {
    const created = await createAddress({
      name: "New Contact",
      line1: "1 New Street",
      city: "City",
      postalCode: "00000",
      country: "US",
      email: "new@example.com",
    });
    setAddresses((a) => [created, ...a]);
  }

  async function onUpdate(addr: Address) {
    const updated = await updateAddress({ ...addr, name: addr.name + " •" });
    setAddresses((a) => a.map((x) => (x.id === updated.id ? updated : x)));
  }

  async function onDelete(id: string) {
    await deleteAddress(id);
    setAddresses((a) => a.filter((x) => x.id !== id));
  }

  return (
    <main className="ocean-container ocean-section-padding">
      <h1 className="text-ocean-h1 mb-2">Customer Portal</h1>
      <p className="text-ocean-body mb-8">Manage your shipments, addresses, and invoices.</p>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Dashboard">
          {!metrics ? (
            <div className="space-y-2">
              <div className="ocean-skeleton h-6 rounded w-1/2" />
              <div className="ocean-skeleton h-24 rounded" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="ocean-card p-4 text-center">
                <div className="text-2xl font-semibold">{metrics.delivered.toLocaleString()}</div>
                <div className="text-ocean-small">Delivered</div>
              </div>
              <div className="ocean-card p-4 text-center">
                <div className="text-2xl font-semibold">{metrics.inTransit.toLocaleString()}</div>
                <div className="text-ocean-small">In Transit</div>
              </div>
              <div className="ocean-card p-4 text-center">
                <div className="text-2xl font-semibold">{metrics.countries}</div>
                <div className="text-ocean-small">Countries</div>
              </div>
              <div className="ocean-card p-4 text-center">
                <div className="text-2xl font-semibold">{metrics.customerSatisfaction}%</div>
                <div className="text-ocean-small">Satisfaction</div>
              </div>
            </div>
          )}
        </Card>

        <Card title="Address Book">
          <button className="btn-ocean-secondary mb-3" onClick={onCreate}>Add Address</button>
          <ul className="space-y-3">
            {addresses.map((a) => (
              <li key={a.id} className="border rounded-lg p-3 flex items-center justify-between" style={{ borderColor: "var(--professional-border)" }}>
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-ocean-small">{a.line1}, {a.city} {a.postalCode} {a.country}</div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-ocean-secondary" onClick={() => onUpdate(a)}>Edit</button>
                  <button className="btn-ocean-primary" onClick={() => onDelete(a.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Invoices">
          <ul className="space-y-3">
            {invoices.map((inv) => (
              <li key={inv.id} className="border rounded-lg p-3 flex items-center justify-between" style={{ borderColor: "var(--professional-border)" }}>
                <div>
                  <div className="font-medium">{inv.id}</div>
                  <div className="text-ocean-small">{new Date(inv.date).toLocaleDateString()} • {inv.currency} ${inv.total.toFixed(2)} • {inv.status}</div>
                </div>
                <a className="btn-ocean-secondary" href={inv.downloadUrl || "#"}>Download</a>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
