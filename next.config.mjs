/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com'],
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
}

export default nextConfig
