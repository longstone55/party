import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jacksonparty.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
