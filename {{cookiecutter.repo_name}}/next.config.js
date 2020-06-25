const SentryWebpackPlugin = require('@sentry/webpack-plugin');

require('dotenv').config();

const {
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  ENVIRONMENT,
  APP_VERSION_RELEASE,
  BUILD_TIME,
  API_BASE_URL,
  SERVER_BASE_URL,
} = process.env;

module.exports = {
  env: {
    ENVIRONMENT,
    SENTRY_DSN,
    APP_VERSION_RELEASE,
    BUILD_TIME,
    API_BASE_URL,
    SERVER_BASE_URL,
  },

  // eslint-disable-next-line no-unused-vars
  webpack(config, { isServer, buildId }) {
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
          release: APP_VERSION_RELEASE,
        })
      );
    }
    return config;
  },
  poweredByHeader: false,
};
