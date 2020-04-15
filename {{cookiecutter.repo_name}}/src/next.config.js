const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['models'] = path.join(__dirname, 'models');
    config.poweredByHeader = false;
    return config;
  },
};
