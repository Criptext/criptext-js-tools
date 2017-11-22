const fs = require('fs');

const writeToStdout = text => process.stdout.write(text);

const readFromStdin = () => {
  const stdin = fs.readFileSync('/dev/stdin');
  if (stdin) return stdin.toString();
};

module.exports = { writeToStdout, readFromStdin };
