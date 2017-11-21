const jest = require('../tools/jest.js');

const exec = args => {
  jest.run(args);
};

module.exports = { exec };
