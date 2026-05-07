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
  <div className="bg-stripes absolute inset-0 flex items-center justify-center">
    <div className="text-ink-dim border-ink-mute bg-bg border border-dashed px-3.5 py-2 font-mono text-[10px] tracking-[0.22em] uppercase">
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
