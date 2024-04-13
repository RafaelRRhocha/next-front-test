/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mks-sistemas.nyc3.digitaloceanspaces.com'],
  },
  env: {
    API_URL: process.env.API_URL
  }
};

export default nextConfig;
