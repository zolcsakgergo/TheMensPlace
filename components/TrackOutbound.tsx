"use client";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Booking happens off-site (Mero) or by phone, so record those clicks as
// conversions. One delegated listener covers every CTA on the page.
export default function TrackOutbound() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("https://mero.ro")) track("book_click");
      else if (href.startsWith("tel:")) track("call_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
