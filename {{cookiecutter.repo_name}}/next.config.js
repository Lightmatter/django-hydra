require('dotenv').config();

const {
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

module.exports = {
  generateBuildId: async () => {
    return APP_VERSION_RELEASE;
  },
  env: {
    ENVIRONMENT,
    APP_VERSION_RELEASE,
    BUILD_TIME,
    API_BASE_URL,
    SERVER_BASE_URL,
    AWS_S3_CUSTOM_DOMAIN,
  },

  assetPrefix: AWS_S3_CUSTOM_DOMAIN ? `https://${AWS_S3_CUSTOM_DOMAIN}` : null,
  poweredByHeader: false,
};
