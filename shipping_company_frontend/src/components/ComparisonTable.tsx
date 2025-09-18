"use client";

import { motion } from "framer-motion";

interface Row { feature: string; express: string; standard: string; freight: string; }

// PUBLIC_INTERFACE
export default function ComparisonTable({ rows }: { rows: Row[] }) {
  /** Animated comparison table for services. */
  return (
    <div className="ocean-card overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[var(--ocean-surface)]">
          <tr>
            <th className="p-3">Feature</th>
            <th className="p-3">Express</th>
            <th className="p-3">Standard</th>
            <th className="p-3">Freight</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <motion.tr key={r.feature} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <td className="p-3">{r.feature}</td>
              <td className="p-3">{r.express}</td>
              <td className="p-3">{r.standard}</td>
              <td className="p-3">{r.freight}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
