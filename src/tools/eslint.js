/* eslint-env node, jest */
const CLIEngine = require('eslint').CLIEngine;

const eslintConfig = require('../config/eslint.js');

const createLinterEngines = isFrontend => ({
  base: new CLIEngine({
    useEslintrc: false,
    baseConfig: isFrontend ? eslintConfig.frontendBase : eslintConfig.nodeJSBase
  }),
  test: new CLIEngine({
    useEslintrc: false,
    baseConfig: isFrontend
      ? eslintConfig.frontendTests
      : eslintConfig.nodeJSTests
  })
});

class Linter {
  constructor(isFrontend) {
    const engines = createLinterEngines(isFrontend);
    this.lintCode = (sourceCode, fileName) => {
      if (fileName.endsWith('.test.js') || fileName.endsWith('.integration.js'))
        return engines.test.executeOnText(sourceCode, fileName);
      return engines.base.executeOnText(sourceCode, fileName);
    };
  }
}

const reduceEslintMessagesToSingleString = (filepath, messages) => {
  if (messages.length > 0) {
    const msgStart = `Problems detected in: ${filepath}`;
    return messages.reduce((accumulator, message) => {
      if (message.ruleId != null)
        return accumulator.concat(
          `\n  - ${message.ruleId} (${message.line}, ${message.column})`
        );
      return accumulator.concat(
        `\n - ${message.message} (${message.line}, ${message.column})`
      );
    }, msgStart);
  }
  return null;
};

const stringifyEslintReport = report => {
  const result = report.results[0];
  const messages = result.messages;
  return reduceEslintMessagesToSingleString(result.filePath, messages);
};

module.exports = { Linter, stringifyEslintReport };
