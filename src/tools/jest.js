const jest = require('jest');

const run = () => {
  const config = ['--resetMocks'];

  if (process.env.CI) config.push('--coverage');
  //else config.push('--watch');

  jest.run(config);
};

module.exports = { run };
