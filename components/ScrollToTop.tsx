"use client";
import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";

const SHOW_AFTER = 600;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={`bg-bg/85 border-gold text-gold hover:bg-gold hover:text-bg fixed right-4 z-50 inline-flex h-11 w-11 items-center justify-center border backdrop-blur-md shadow-lg transition-all duration-200 bottom-20 md:right-6 md:bottom-6 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <MdArrowUpward aria-hidden className="text-[20px]" />
    </button>
  );
}
