const fs = require('fs');

const { getPrettierSourceCode } = require('../tools/prettier.js');

const exitWithError = errorMsg => {
  console.error(errorMsg);
  process.exit(1);
};

const readFile = filepath => {
  try {
    if (filepath) return fs.readFileSync(filepath).toString();
    else exitWithError('A valid filepath must be provided');
  } catch (err) {
    exitWithError(`failed to read ${filepath}\n${err}`);
  }
};

const exec = args => {
  const filepath = args[args.length - 1];
  const sourceCode = readFile(filepath);

  const formattedCode = getPrettierSourceCode(sourceCode, filepath) || '';
  process.stdout.write(formattedCode);
};

module.exports = { exec };
