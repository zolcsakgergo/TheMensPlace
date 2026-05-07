import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        "ink-mute": "var(--ink-mute)",
        gold: "var(--gold)",
        "gold-deep": "var(--gold-deep)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Bodoni Moda"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', '"Courier New"', "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      backgroundImage: {
        stripes:
          "repeating-linear-gradient(45deg, var(--bg-3) 0, var(--bg-3) 14px, var(--bg-2) 14px, var(--bg-2) 28px)",
        "hero-glow":
          "radial-gradient(ellipse at 20% 30%, var(--gold-glow), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(168, 133, 63, 0.15), transparent 50%)",
        "video-overlay":
          "linear-gradient(180deg, rgba(10,8,7,0.85) 0%, rgba(10,8,7,0.35) 30%, rgba(10,8,7,0.35) 70%, rgba(10,8,7,0.95) 100%)",
        "video-fallback":
          "radial-gradient(ellipse at center, #2a2520 0%, #0a0807 70%), repeating-linear-gradient(45deg, #1a1714 0, #1a1714 2px, #11100e 2px, #11100e 4px)",
        "ornament-line":
          "linear-gradient(90deg, transparent, var(--gold), transparent)",
        "featured-tint":
          "linear-gradient(180deg, rgba(212,175,100,0.06), transparent)",
      },
    },
  },
  plugins: [],
} satisfies Config;
