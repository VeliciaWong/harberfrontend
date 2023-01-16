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

const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "test",
  skipWaiting: true,
});

module.exports = withPWA({
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