"use client";
import dynamic from "next/dynamic";

// NextStudio + Sanity v5 reach for `window` during render. Gate behind
// next/dynamic with ssr:false so the studio only loads in the browser.
const StudioClient = dynamic(() => import("./StudioClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0807",
        color: "#d4af64",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
      }}
    >
      Studio · se încarcă
    </div>
  ),
});

export default function Studio() {
  return <StudioClient />;
}
