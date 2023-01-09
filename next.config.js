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
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  distDir: 'build',
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true
    }
  },
  output: "standalone"
})