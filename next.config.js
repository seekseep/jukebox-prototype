/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify      : false,
  async redirects() {
    return []
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      use : 'raw-loader',
    })
    return config
  }
}

module.exports = nextConfig
