const jest = require('jest');
const defaultConfig = require('../config/jest.config.js');

const run = () => {
  const userConfig = process.argv.slice(3);
  const config = defaultConfig.concat(userConfig);

  jest.run(config);
};

module.exports = { run };
