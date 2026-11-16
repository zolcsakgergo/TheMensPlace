import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // next-intl redirects the default-locale prefix with a 307; make it permanent.
  async redirects() {
    return [
      { source: "/ro", destination: "/", permanent: true },
      { source: "/ro/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
