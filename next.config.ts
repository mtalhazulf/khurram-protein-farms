import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "images.khurramproteins.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  headers: async () => [
    {
      // Static assets (JS, CSS, fonts) — immutable, cached 1 year
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // Font files — immutable, cached 1 year
      source: "/:path*.woff2",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // Public pages — stale-while-revalidate for fast loads
      source: "/((?!admin|api).*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=60, stale-while-revalidate=300",
        },
      ],
    },
    {
      // Image API — cached 1 year (content-addressed)
      source: "/api/images/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // Admin pages — no caching
      source: "/admin/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "private, no-cache, no-store",
        },
      ],
    },
  ],
};

export default nextConfig;

// Initialize OpenNext dev-time Cloudflare bindings when in dev
if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}
