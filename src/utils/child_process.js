const { spawnSync } = require('child_process');

const spawnInSameTerminal = (executable, args) =>
  spawnSync(executable, args, { stdio: 'inherit' });

module.exports = {
  spawnInSameTerminal
};
