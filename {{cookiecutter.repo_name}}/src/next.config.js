const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['models'] = path.join(__dirname, 'models');
    config.resolve.alias['hooks'] = path.join(__dirname, 'hooks');
    config.resolve.alias['pages'] = path.join(__dirname, 'pages');
    config.resolve.alias['theme'] = path.join(__dirname, 'theme');
    config.resolve.alias['util'] = path.join(__dirname, 'util');
    config.resolve.alias['constants'] = path.join(__dirname, 'constants.js');
    config.poweredByHeader = false;
    return config;
  },
};
