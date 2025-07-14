/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  // Enable experimental features
  experimental: {
    // Server Components
    serverComponentsExternalPackages: ["mongoose", "mongodb"],
    // App directory
    appDir: false, // Using pages directory
    // Runtime optimizations
    optimizePackageImports: ["lucide-react", "framer-motion"],
    // Turbo mode
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  optimizeFonts: true,
  swcMinify: true,

  // Image optimization
  images: {
    domains: [
      "localhost",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
      "res.cloudinary.com",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    APP_VERSION: process.env.npm_package_version || "1.0.0",
    BUILD_TIME: new Date().toISOString(),
  },

  // Public runtime config
  publicRuntimeConfig: {
    APP_NAME: "AI Blog Summariser",
    APP_DESCRIPTION:
      "Professional AI-powered blog summarisation with Urdu translation",
    CONTACT_EMAIL: "shahzebfaisal5649@gmail.com",
  },

  // Server runtime config
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === "true") {
      const BundleAnalyzerPlugin =
        require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: isServer
            ? "../analyze/server.html"
            : "./analyze/client.html",
        })
      );
    }

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    // Markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    // Optimization
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // React chunk
          react: {
            name: "react",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 30,
          },
          // Framer Motion chunk
          framerMotion: {
            name: "framer-motion",
            chunks: "all",
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 25,
          },
        },
      };
    }

    // Resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": __dirname,
      "@/components": `${__dirname}/components`,
      "@/lib": `${__dirname}/lib`,
      "@/utils": `${__dirname}/utils`,
      "@/hooks": `${__dirname}/hooks`,
      "@/types": `${__dirname}/types`,
      "@/styles": `${__dirname}/styles`,
    };

    // Performance hints
    config.performance = {
      hints: "warning",
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    return config;
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' blob: data: https://*",
              "font-src 'self' https://fonts.gstatic.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Performance headers
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // API routes caching
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=600",
          },
        ],
      },
      // Static assets caching
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Basic redirects
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/summarizer",
        destination: "/",
        permanent: true,
      },
      // Legacy API redirects
      {
        source: "/api/v1/:path*",
        destination: "/api/:path*",
        permanent: true,
      },
    ];
  },

  // Rewrites for API proxying
  async rewrites() {
    return [
      // API rewrites
      {
        source: "/api/proxy/:path*",
        destination: "https://api.example.com/:path*",
      },
      // Health check
      {
        source: "/health",
        destination: "/api/health",
      },
      // Sitemap
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },

  // TypeScript configuration
  typescript: {
    // Type checking during build
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Lint during builds
    ignoreDuringBuilds: false,
    dirs: ["pages", "components", "lib", "utils"],
  },

  // Output configuration
  output: "standalone",
  distDir: ".next",
  generateEtags: true,
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Page extensions
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx", "md"],

  // Trailing slash
  trailingSlash: false,

  // Development configuration
  ...(process.env.NODE_ENV === "development" && {
    // Development-specific options
    reactStrictMode: true,
    productionBrowserSourceMaps: false,
  }),

  // Production configuration
  ...(process.env.NODE_ENV === "production" && {
    // Production-specific options
    productionBrowserSourceMaps: false,
    optimizeFonts: true,
    compress: true,
  }),
};
