"use client";

import { TrackingEvent } from "@/src/lib/types";
import { useEffect, useRef } from "react";
import anime from "animejs";

// PUBLIC_INTERFACE
export function ProgressTimeline({ events }: { events: TrackingEvent[] }) {
  /** Renders an animated vertical timeline of tracking events. */
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const items = container.current.querySelectorAll(".tl-item");
    anime({
      targets: items,
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: anime.stagger(80),
      easing: "easeOutQuad",
      duration: 400,
    });
  }, [events]);

  return (
    <div ref={container} className="space-y-4">
      {events.map((e, idx) => (
        <div key={e.id} className="tl-item flex items-start gap-3">
          <div className={`mt-1 w-3 h-3 rounded-full ${idx === events.length - 1 ? "bg-green-600" : "bg-blue-500"}`} aria-hidden />
          <div>
            <div className="font-medium">{e.description}</div>
            <div className="text-ocean-small">{e.location} • {new Date(e.timestamp).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
