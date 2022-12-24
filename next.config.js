/** @type {import('next').NextConfig} */
const nextConfig = {
    exportTrailingSlash: true,
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
      images: {
        unoptimized: true
      }
    },
  }
  
  module.exports = nextConfig
  