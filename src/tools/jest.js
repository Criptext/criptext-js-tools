const jest = require('jest');
const defaultConfig = require('../config/jest.config.js');
const integrationConfigPath = require.resolve(
  '../config/jest.integration.config.js'
);

const run = args => {
  const config = defaultConfig.concat(args);

  jest.run(config);
};

const runIntegration = args => {
  const config = ['--config', integrationConfigPath, '--runInBand'].concat(
    args
  );

  jest.run(config);
};

module.exports = { run, runIntegration };
