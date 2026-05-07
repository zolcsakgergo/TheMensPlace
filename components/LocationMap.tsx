"use client";
import dynamic from "next/dynamic";
import type { LocationMapProps } from "./LocationMapInner";

const Inner = dynamic(() => import("./LocationMapInner"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-stripes flex items-center justify-center">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-dim border border-dashed border-ink-mute bg-bg px-3.5 py-2">
        Hartă · se încarcă
      </div>
    </div>
  ),
});

export default function LocationMap(props: LocationMapProps) {
  return <Inner {...props} />;
}
