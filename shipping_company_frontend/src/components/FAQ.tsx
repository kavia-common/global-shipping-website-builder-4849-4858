"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// PUBLIC_INTERFACE
export function FAQ({ items }: { items: Array<{ q: string; a: string }> }) {
  /** Accessible FAQ accordion with animations. */
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const expanded = open === i;
        return (
          <div key={i} className="ocean-card">
            <button
              className="w-full text-left p-4 flex justify-between items-center"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : i)}
            >
              <span className="font-medium">{it.q}</span>
              <span aria-hidden>{expanded ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-4 pb-4 text-ocean-body">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
