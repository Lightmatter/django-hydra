const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const withSourceMaps = require('@zeit/next-source-maps');

require('dotenv').config();

const {
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  ENVIRONMENT,
  BUILD_TIME,
  API_BASE_URL,
  SERVER_BASE_URL,
  AWS_S3_CUSTOM_DOMAIN,
} = process.env;

let { APP_VERSION_RELEASE } = process.env;

if (APP_VERSION_RELEASE === undefined || APP_VERSION_RELEASE == null) {
  // eslint-disable-next-line global-require
  const nextBuildId = require('next-build-id');
  APP_VERSION_RELEASE = nextBuildId({ dir: __dirname });
}

module.exports = withSourceMaps({
  generateBuildId: async () => {
    return APP_VERSION_RELEASE;
  },
  env: {
    ENVIRONMENT,
    SENTRY_DSN,
    APP_VERSION_RELEASE,
    BUILD_TIME,
    API_BASE_URL,
    SERVER_BASE_URL,
    AWS_S3_CUSTOM_DOMAIN,
  },

  // eslint-disable-next-line no-unused-vars
  webpack(config, { isServer, dev, buildId }) {
    if (!dev) {
      // eslint-disable-next-line no-param-reassign
      config.devtool = 'hidden-source-map';
    }
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
  assetPrefix: AWS_S3_CUSTOM_DOMAIN ? `https://${AWS_S3_CUSTOM_DOMAIN}` : null,
  poweredByHeader: false,
});
