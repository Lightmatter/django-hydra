const path = require('path');
require('dotenv').config();

module.exports = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve(__dirname, 'src'));
    return config;
  },
  poweredByHeader: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
  },
};
