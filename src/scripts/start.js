const { spawnInSameTerminal } = require('../utils/child_process.js');

const compilerPath = require.resolve('../node_modules/.bin/tsc');

const run = () => {
  spawnInSameTerminal(compilerPath, [
    '--module',
    'CommonJS',
    '--allowJs',
    'true',
    '--checkJs',
    'true',
    '--lib',
    'ES6,ES5,DOM',
    '--target',
    'es5',
    '--outDir',
    'dest',
    'src/index.ts'
  ]);
  spawnInSameTerminal('node', ['dest/index.js']);
};

module.exports = run;
