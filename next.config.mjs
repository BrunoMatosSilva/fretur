/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      // O site antigo era um index.html estático
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
