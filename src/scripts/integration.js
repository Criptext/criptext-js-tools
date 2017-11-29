const jest = require('../tools/jest.js');

const exec = args => {
  jest.runIntegration(args);
};

module.exports = { exec };
