import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/yami-cocoichi-ishi',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
