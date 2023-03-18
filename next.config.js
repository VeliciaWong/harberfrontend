/** @type {import('next').NextConfig} */
// const nextConfig = {
//   trailingSlash: true,
//   reactStrictMode: false,
//   swcMinify: true,
//   experimental: {
//     images: {
//       unoptimized: true
//     }
//   },
// }

// module.exports = nextConfig;

const CompressionPlugin = require("compression-webpack-plugin");

const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "test",
  skipWaiting: true,
});

module.exports = withPWA({
  plugins: [new CompressionPlugin()],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true
    }
  }
})