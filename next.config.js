/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/pudding-website',
  assetPrefix: '/pudding-website/',
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
