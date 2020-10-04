/* eslint-disable global-require */
const withOptimizedImages = require('next-optimized-images');
const withVideos = require('next-videos');

module.exports = withOptimizedImages(withVideos({
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {
          key: 'Referrer-Policy',
          value: (process.env.NODE_ENV === 'development')
            ? 'no-referrer-when-downgrade'
            : 'strict-origin-when-cross-origin',
        },
      ],
    }];
  },
  assetDirectory: 'static',
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }
    config.module.rules.push({
      test: /\.(mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
}));
