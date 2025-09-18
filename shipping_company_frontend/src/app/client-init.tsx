"use client";

import { useEffect } from "react";

/**
 * ClientInit performs client-only initialization logic such as
 * service worker registration. Loaded at top of <body>.
 */
export default function ClientInit() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
