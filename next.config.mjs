/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors/warnings during deployment
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.weatherbit.io",
      },
    ],
  },
};

export default nextConfig;
