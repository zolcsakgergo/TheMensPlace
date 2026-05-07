"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { LocationMapProps } from "./LocationMapInner";

// Inner module pulls in `leaflet`, which references `window` at module top
// level. We gate the dynamic import behind a client-mount flag so the server
// only ever renders the placeholder.
const Inner = dynamic(() => import("./LocationMapInner"), {
  ssr: false,
});

const Placeholder = () => (
  <div className="absolute inset-0 bg-stripes flex items-center justify-center">
    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-dim border border-dashed border-ink-mute bg-bg px-3.5 py-2">
      Hartă · se încarcă
    </div>
  </div>
);

export default function LocationMap(props: LocationMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Placeholder />;
  return <Inner {...props} />;
}
