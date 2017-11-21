const jest = require('jest');
const defaultConfig = require('../config/jest.config.js');

const run = args => {
  const config = defaultConfig.concat(args);

  jest.run(config);
};

module.exports = { run };
