import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.igdb.com'],
    remotePatterns: [{
        protocol: 'https',
        hostname: 'images.igdb.com',
    }]
  }
};

export default nextConfig;
