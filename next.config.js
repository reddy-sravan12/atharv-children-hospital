/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    emotion: true,
  },
}


module.exports = nextConfig
