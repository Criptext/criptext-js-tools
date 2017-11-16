const jest = require('jest');

const run = () => {
  const config = process.argv.slice(2);

  config.push('--resetMocks');

  jest.run(config);
};

module.exports = { run };
