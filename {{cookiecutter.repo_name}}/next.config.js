const path = require('path');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

require('dotenv').config();
const {
  NEXT_PUBLIC_SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
} = process.env;

module.exports = {
  webpack(config, { isServer, buildId }) {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    if (NEXT_PUBLIC_SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
          release: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
        })
      );
    }
    return config;
  },
  poweredByHeader: false,
};
