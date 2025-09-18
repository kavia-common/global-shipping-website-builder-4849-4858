"use client";

import { useEffect, useState } from "react";
import { fetchTracking, searchMultipleTracking } from "../../lib/mockApi";
import { Shipment } from "../../lib/types";
import { ProgressTimeline } from "../../components/ProgressTimeline";
import { useSearchParams } from "next/navigation";

export default function TrackingPage() {
  const sp = useSearchParams();
  const defaultNum = sp.get("num") ?? "";
  const [tracking, setTracking] = useState(defaultNum);
  const [multi, setMulti] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [list, setList] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchSingle() {
    setLoading(true);
    setShipment(await fetchTracking(tracking));
    setLoading(false);
  }

  async function searchMany() {
    setLoading(true);
    const numbers = multi.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
    setList(await searchMultipleTracking(numbers));
    setLoading(false);
  }

  useEffect(() => {
    if (defaultNum) searchSingle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="ocean-container ocean-section-padding">
      <h1 className="text-ocean-h1 mb-2">Track Your Package</h1>
      <p className="text-ocean-body mb-6">Enter a tracking number for live updates.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="ocean-card p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input className="ocean-input flex-1" placeholder="Tracking number" value={tracking} onChange={(e) => setTracking(e.target.value)} />
              <button className="btn-ocean-primary" onClick={searchSingle} disabled={loading}>{loading ? "Loading..." : "Search"}</button>
            </div>
          </div>

          {loading && <div className="ocean-card p-6"><div className="ocean-skeleton h-6 rounded w-1/2 mb-3" /><div className="ocean-skeleton h-24 rounded" /></div>}

          {shipment && (
            <div className="ocean-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-ocean-h3">#{shipment.trackingNumber}</div>
                  <div className="text-ocean-small">{shipment.origin} → {shipment.destination} • {shipment.service}</div>
                </div>
                <span className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm capitalize">{shipment.status.replaceAll("_"," ")}</span>
              </div>
              <div className="mt-4">
                <ProgressTimeline events={shipment.events} />
              </div>
            </div>
          )}

          {!!list.length && (
            <div className="ocean-card p-6">
              <h3 className="text-ocean-h3 mb-3">Multiple Shipments</h3>
              <div className="space-y-4">
                {list.map((s) => (
                  <div key={s.trackingNumber} className="border-b pb-4 last:border-none" style={{ borderColor: "var(--professional-border)" }}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">#{s.trackingNumber} • {s.origin} → {s.destination}</div>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs capitalize">{s.status.replaceAll("_"," ")}</span>
                    </div>
                    <div className="mt-2 text-ocean-small">{s.events.at(-1)?.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="ocean-card p-4">
            <h3 className="text-ocean-h3 mb-2">Track Multiple</h3>
            <textarea className="ocean-input h-28" placeholder="Enter tracking numbers separated by comma or spaces" value={multi} onChange={(e) => setMulti(e.target.value)} />
            <button className="btn-ocean-secondary mt-3" onClick={searchMany} disabled={loading}>Search</button>
          </div>
          <div className="ocean-card p-4">
            <h3 className="text-ocean-h3 mb-2">Notifications</h3>
            <p className="text-ocean-small mb-3">Sign up for SMS/Email alerts when status changes.</p>
            <form onSubmit={(e)=>e.preventDefault()} className="space-y-2">
              <input className="ocean-input" placeholder="Email address" />
              <input className="ocean-input" placeholder="Phone number" />
              <button className="btn-ocean-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
