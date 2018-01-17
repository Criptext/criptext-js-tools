/* eslint-env node, jest */
const CLIEngine = require('eslint').CLIEngine;

const backendConfig = require.resolve('../config/eslintrc.yml');
const frontendConfig = require.resolve('../config/eslintrc.frontend.yml');

const createCLIEngine = isFrontend =>
  new CLIEngine({
    useEslintrc: false,
    configFile: require.resolve(isFrontend ? frontendConfig : backendConfig)
  });

class Linter {
  constructor(isFrontend) {
    const cli = createCLIEngine(isFrontend);
    this.lintCode = (sourceCode, fileName) =>
      cli.executeOnText(sourceCode, fileName);
  }
}

const reduceEslintMessagesToSingleString = (filepath, messages) => {
  if (messages.length > 0) {
    const msgStart = `Problems detected in: ${filepath}`;
    return messages.reduce(
      (accumulator, message) =>
        accumulator.concat(
          `\n  - ${message.ruleId} (${message.line}, ${message.column})`
        ),
      msgStart
    );
  }
  return null;
};

const stringifyEslintReport = report => {
  const result = report.results[0];
  const messages = result.messages;
  return reduceEslintMessagesToSingleString(result.filePath, messages);
};

module.exports = { Linter, stringifyEslintReport };
