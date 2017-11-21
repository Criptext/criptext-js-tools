const CLIEngine = require('eslint').CLIEngine;

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: require.resolve('../config/eslintrc.yml')
});

const lintCode = (sourceCode, fileName) =>
  cli.executeOnText(sourceCode, fileName);

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

module.exports = { lintCode, stringifyEslintReport };
