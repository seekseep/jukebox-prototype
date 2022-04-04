/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify      : false,
  async redirects() {
    return [
      // {
        // source: '/',
        // destination: '/schools',
        // permanent: false,
      // }
    ]
  },
}

module.exports = nextConfig
