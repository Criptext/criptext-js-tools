const fs = require('fs');
const yargs = require('yargs');
const { readFromStdin, writeToStdout } = require('../system/io.js');

const { getPrettierSourceCode } = require('../tools/prettier.js');

const parseArguments = args => {
  return yargs
    .option('filename', {
      describe: 'Name of the file received via STDIN to be formatted'
    })
    .parse(args);
};

const exitWithError = errorMsg => {
  console.error(errorMsg);
  //process.exit(1);
};

const readFile = filepath => {
  try {
    if (filepath) return fs.readFileSync(filepath).toString();
    exitWithError('A valid filepath must be provided');
  } catch (err) {
    exitWithError(`failed to read ${filepath}\n${err}`);
  }
};

const formatToStdout = (sourceCode, filename) => {
  const formattedCode = getPrettierSourceCode(sourceCode, filename) || '';
  writeToStdout(formattedCode);
};

const exec = args => {
  const argv = parseArguments(args);
  const filepath = argv._[argv._.length - 1];
  const stdinFilename = argv.filename;

  if (stdinFilename) {
    const sourceCode = readFromStdin();
    formatToStdout(sourceCode, stdinFilename);
  } else {
    const sourceCode = readFile(filepath);
    formatToStdout(sourceCode, filepath);
  }
};

module.exports = { exec };
