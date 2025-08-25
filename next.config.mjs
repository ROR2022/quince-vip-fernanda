/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuración específica para Vercel y Sharp (sintaxis Next.js 15)
  serverExternalPackages: ['sharp'],
}

export default nextConfig
