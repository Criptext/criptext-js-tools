const fs = require('fs');

const writeToStdout = text => process.stdout.write(text);

const readFromStdin = () => {
  const stdin = fs.readFileSync('/dev/stdin');
  if (stdin) return stdin.toString();
};

const readFileSync = filepath => fs.readFileSync(filepath);

const writeFileSync = (filepath, content) =>
  fs.writeFileSync(filepath, content);

module.exports = {
  writeToStdout,
  readFromStdin,
  readFileSync,
  writeFileSync
};
