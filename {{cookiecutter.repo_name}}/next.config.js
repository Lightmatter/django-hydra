const path = require('path');
require('dotenv').config();

module.exports = {
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'src/components');
    config.resolve.alias['models'] = path.join(__dirname, 'src/models');
    config.resolve.alias['hooks'] = path.join(__dirname, 'src/hooks');
    config.resolve.alias['pages'] = path.join(__dirname, 'src/pages');
    config.resolve.alias['theme'] = path.join(__dirname, 'src/theme');
    config.resolve.alias['util'] = path.join(__dirname, 'src/util');
    config.resolve.alias['constants'] = path.join(__dirname, 'src/constants.js');
    return config;
  },
  poweredByHeader: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_BASE_URL: 'http://localhost:8000',
  },
};
