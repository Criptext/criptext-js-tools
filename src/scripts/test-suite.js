const jest = require('../tools/jest.js');

const exec = args => {
  process.env.NODE_ENV = 'test';
  jest.run(args);
};

module.exports = { exec };
