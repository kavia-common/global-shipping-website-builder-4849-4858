"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
export default function FileUploader() {
  /** Drag-and-drop file uploader mock with animated feedback. */
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const list = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...list]);
  }, []);
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="ocean-card p-6 text-center border-dashed"
      style={{ borderColor: "var(--professional-border)", borderStyle: "dashed" }}
      aria-label="Upload documents"
    >
      <div className="text-3xl mb-2">⬆️</div>
      <div className="text-ocean-body">Drag & drop shipping documents here, or click to select</div>
      <input type="file" multiple className="mt-3" onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))} />
      <motion.ul className="text-ocean-small mt-4 space-y-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {files.map((f, i) => <li key={i}>• {f.name}</li>)}
      </motion.ul>
    </div>
  );
}
