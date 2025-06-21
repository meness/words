import nextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    // Fix pino-pretty warnings
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Optimize Webpack cache
    if (isServer) {
      config.cache = {
        type: 'filesystem',
        maxMemoryGenerations: 1, // Keep only the latest cache
        compression: false // Reduce file count
      };
    }

    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
    webpackBuildWorker: true
  },
  poweredByHeader: false,
  // Needs to be disabled for react-beautiful-dnd https://github.com/atlassian/react-beautiful-dnd/issues/2407#issuecomment-1137221247
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

export default withBundleAnalyzer(nextConfig);
