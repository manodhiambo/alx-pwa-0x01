/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com', 'themebeyond.com'],
    unoptimized: true
  }
}

module.exports = nextConfig
