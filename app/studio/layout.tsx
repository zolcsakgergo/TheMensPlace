import type { Metadata } from "next";

// Studio is a private editing surface — keep it out of search indexes.
export const metadata: Metadata = {
  title: "Studio · The Men's Place",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
