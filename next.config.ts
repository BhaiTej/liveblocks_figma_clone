/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liveblocks.io",
        port: "",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Add this to skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// ✅ Use CommonJS export (required by Vercel)
module.exports = nextConfig;
