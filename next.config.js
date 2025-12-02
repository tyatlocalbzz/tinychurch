/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, nextRuntime }) => {
    // Exclude Prisma and other server-only modules from Edge Runtime
    if (nextRuntime === 'edge') {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@prisma/client': false,
        'prisma': false,
      }
    }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
}

module.exports = nextConfig
