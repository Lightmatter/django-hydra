const path = require('path');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

require('dotenv').config();
const { SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, NODE_ENV } = process.env;

module.exports = {
  webpack(config, { isServer, buildId }) {
    config.resolve.modules.push(path.resolve(__dirname, 'src'));

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.plugins.push(
      new SentryWebpackPlugin({
        include: '.next',
        ignore: ['node_modules'],
        urlPrefix: '~/_next',
        release: process.env.APP_VERSION_RELEASE,
      })
    );

    return config;
  },
  poweredByHeader: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    APP_VERSION_RELEASE: process.env.APP_VERSION_RELEASE,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
};
