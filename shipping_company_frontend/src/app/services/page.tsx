"use client";

import ComparisonTable from "../../components/ComparisonTable";
import QuoteCalculator from "../../components/QuoteCalculator";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="ocean-container ocean-section-padding">
      <h1 className="text-ocean-h1 mb-2">Our Services</h1>
      <p className="text-ocean-body mb-8">From urgent express to global freight and intelligent warehousing.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <ComparisonTable
            rows={[
              { feature: "Estimated Delivery", express: "1–2 days", standard: "3–7 days", freight: "7–14 days" },
              { feature: "Max Weight", express: "30 kg", standard: "70 kg", freight: "Unlimited" },
              { feature: "Tracking", express: "Real-time", standard: "Real-time", freight: "Milestone-based" },
              { feature: "Insurance", express: "Optional", standard: "Optional", freight: "Optional" },
            ]}
          />
          <div className="ocean-card p-6">
            <h3 className="text-ocean-h3 mb-2">Service Area Map</h3>
            <p className="text-ocean-small mb-4">Animated route indicators demonstrate typical paths.</p>
            <div className="h-64 rounded-lg bg-[var(--ocean-surface)] relative overflow-hidden">
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-blue-300/40 blur-xl"
                initial={{ x: -50, y: 50 }}
                animate={{ x: 300, y: -20 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div
                className="absolute w-24 h-24 rounded-full bg-blue-400/40 blur-lg"
                initial={{ x: 200, y: 120 }}
                animate={{ x: 20, y: 0 }}
                transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <QuoteCalculator />
          <div className="ocean-card p-6">
            <h3 className="text-ocean-h3 mb-2">Packaging Guidelines</h3>
            <ul className="text-ocean-small space-y-1">
              <li>• Use sturdy boxes and proper cushioning.</li>
              <li>• Securely seal edges with strong tape.</li>
              <li>• Affix labels on flat surfaces and protect from moisture.</li>
              <li>• Declare value accurately for customs.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
