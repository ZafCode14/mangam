/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        // You can specify the pathname if needed, e.g. '/v0/b/**'
        // pathname: '/v0/b/**',
      },
    ],
  },
};

export default nextConfig;