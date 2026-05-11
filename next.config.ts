import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare tunnel (and any *.trycloudflare.com domain) to access
  // Next.js dev server assets — required for camera testing on mobile via tunnel
  allowedDevOrigins: ['*.trycloudflare.com'],
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@mui/lab', '@mui/x-charts'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mui.com',
      },
    ],
  },
};

export default nextConfig;
