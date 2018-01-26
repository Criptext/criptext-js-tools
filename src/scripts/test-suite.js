const jest = require('../tools/jest.js');

const exec = args => {
  // eslint-disable-next-line fp/no-mutation
  process.env.NODE_ENV = 'test';
  jest.run(args);
};

module.exports = { exec };
