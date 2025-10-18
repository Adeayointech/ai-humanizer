import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This allows production builds to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds with TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;