"use client";

import { useState } from "react";
import { calculateQuote } from "../lib/mockApi";
import { QuoteInput, QuoteResult } from "../lib/types";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
export default function QuoteCalculator() {
  /** Interactive shipping quote calculator with live pricing. */
  const [form, setForm] = useState<QuoteInput>({
    originPostal: "",
    destinationPostal: "",
    countryFrom: "US",
    countryTo: "US",
    weightKg: 1,
    lengthCm: 10,
    widthCm: 10,
    heightCm: 10,
    serviceLevel: "standard",
    insuranceUsd: 0
  });
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const r = await calculateQuote(form);
    setResult(r);
    setLoading(false);
  }

  return (
    <div className="ocean-card p-6">
      <h3 className="text-ocean-h3 mb-4">Instant Quote</h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {([
          ["originPostal", "Origin Postal Code"],
          ["destinationPostal", "Destination Postal Code"],
          ["countryFrom", "Origin Country"],
          ["countryTo", "Destination Country"],
        ] as Array<[keyof QuoteInput, string]>).map(([key, label]) => (
          <div key={key}>
            <label className="ocean-label">{label}</label>
            <input
              className="ocean-input"
              required
              value={String(form[key] ?? "")}
              onChange={(e) => setForm({ ...form, [key]: e.target.value } as QuoteInput)}
            />
          </div>
        ))}
        <div>
          <label className="ocean-label">Weight (kg)</label>
          <input type="number" min={0.1} step={0.1} className="ocean-input" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: parseFloat(e.target.value) })} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["lengthCm", "widthCm", "heightCm"] as const).map((k) => (
            <div key={k}>
              <label className="ocean-label capitalize">{k.replace("Cm"," (cm)")}</label>
              <input type="number" min={1} className="ocean-input" value={form[k]} onChange={(e) => setForm({ ...form, [k]: parseFloat(e.target.value) })} />
            </div>
          ))}
        </div>
        <div>
          <label className="ocean-label">Service</label>
          <select
            className="ocean-input"
            value={form.serviceLevel}
            onChange={(e) =>
              setForm({ ...form, serviceLevel: e.target.value as QuoteInput["serviceLevel"] })
            }
          >
            <option value="express">Express</option>
            <option value="standard">Standard</option>
            <option value="freight">Freight</option>
          </select>
        </div>
        <div>
          <label className="ocean-label">Insurance (USD)</label>
          <input type="number" min={0} className="ocean-input" value={form.insuranceUsd ?? 0} onChange={(e) => setForm({ ...form, insuranceUsd: parseFloat(e.target.value) })} />
        </div>
        <div className="md:col-span-2">
          <button className="btn-ocean-primary">{loading ? "Calculating..." : "Calculate"}</button>
        </div>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 border-t pt-4" style={{ borderColor: "var(--professional-border)" }}>
          <div className="text-ocean-body">Service: <strong className="text-[var(--ocean-deep)]">{result.service}</strong></div>
          <div className="text-ocean-body">ETA: <strong className="text-[var(--ocean-deep)]">{result.etaDays} days</strong></div>
          <div className="text-ocean-body">Price: <strong className="text-[var(--ocean-deep)]">{result.currency} ${result.price}</strong></div>
          {result.surcharges?.length ? (
            <ul className="mt-2 text-ocean-small">
              {result.surcharges.map(s => <li key={s.label}>• {s.label}: {result.currency} ${s.amount}</li>)}
            </ul>
          ) : null}
        </motion.div>
      )}
    </div>
  );
}
