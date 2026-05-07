"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Brand } from "./Primitives";

const linkCls =
  "font-mono text-[11px] tracking-[0.22em] uppercase text-ink-dim hover:text-gold transition-colors no-underline";

export default function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`border-rule fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b backdrop-blur-md transition-all duration-300 max-[980px]:px-6 max-[980px]:py-4 ${
        scrolled ? "bg-bg/90 px-12 py-[14px]" : "bg-bg/60 px-12 py-[22px]"
      }`}
    >
      <Brand />
      <ul className="m-0 flex list-none gap-9 p-0 max-[980px]:hidden">
        <li>
          <a href="#services" className={linkCls}>
            {t("services")}
          </a>
        </li>
        <li>
          <a href="#about" className={linkCls}>
            {t("about")}
          </a>
        </li>
        <li>
          <a href="#team" className={linkCls}>
            {t("team")}
          </a>
        </li>
        <li>
          <a href="#gallery" className={linkCls}>
            {t("gallery")}
          </a>
        </li>
        <li>
          <a href="#location" className={linkCls}>
            {t("location")}
          </a>
        </li>
      </ul>
      <a
        href="#booking"
        className="text-bg bg-gold border-gold hover:text-gold border px-5 py-2.5 font-mono text-[11px] tracking-[0.22em] uppercase no-underline transition-all hover:bg-transparent"
      >
        {t("cta")}
      </a>
    </nav>
  );
}
