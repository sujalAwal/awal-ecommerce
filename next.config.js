/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-Side Rendering & Performance
  reactStrictMode: true,
  swcMinify: true,

  // Image Optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Optimization headers for Core Web Vitals
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=60',
          },
        ],
      },
    ];
  },

  // Redirects for clean URLs
  redirects: async () => {
    return [
      {
        source: '/category/:slug',
        destination: '/categories/:slug',
        permanent: true,
      },
    ];
  },

  // TypeScript strict mode
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;
