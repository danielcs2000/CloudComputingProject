/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cactusnet.s3.amazonaws.com", "s3.amazonaws.com"],
  },
  env: {
    AMAZON_BUCKET_URL: process.env.AMAZON_BUCKET_URL,
  },
};

module.exports = nextConfig;
