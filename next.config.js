/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domains.com'], // optional: use your actual image domain
  },
};

module.exports = nextConfig;
