/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'atharv-children-hospital.s3.eu-north-1.amazonaws.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
