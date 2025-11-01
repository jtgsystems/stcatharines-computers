import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.stcatharinescomputers.com',
      },
    ],
  },
  async redirects() {
    return [
      // Add 301 redirects from old WordPress URLs
      {
        source: '/wp-:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
