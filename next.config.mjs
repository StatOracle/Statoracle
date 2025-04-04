// next.config.mjs

/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import withSvgr from "@svgr/webpack";

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
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    // serverActions: {
    //   allowedOrifgins: ["app.localhost:3000"],
    // },
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true, // Disable SVGO optimization if you encounter issues
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
