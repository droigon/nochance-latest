/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STRAPI_API_URL
          ? new URL(process.env.NEXT_PUBLIC_STRAPI_API_URL).hostname
          : "your-production-domain.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
