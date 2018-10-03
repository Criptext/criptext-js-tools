const jest = require('jest');
const defaultConfig = require('../config/jest.config.js');
const { isFrontendProject } = require('./project-info.js');
const integrationConfigPath = require.resolve(
  '../config/jest.integration.config.js'
);

const run = args => {
  const config = isFrontendProject()
    ? defaultConfig.concat(args)
    : defaultConfig.concat(['--env=node', ...args]);

  jest.run(config);
};

const runIntegration = args => {
  const config = ['--config', integrationConfigPath, '--runInBand'].concat(
    isFrontendProject() ? args : ['--env=node', ...args]
  );

  jest.run(config);
};

module.exports = { run, runIntegration };
