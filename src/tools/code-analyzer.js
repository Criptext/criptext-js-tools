const prettier = require('./prettier.js');
const eslint = require('./eslint.js');
const { Linter } = eslint;

const createPrettierReport = filepath => `- ${filepath}`;

class CodeAnalyzer {
  constructor(isFrontend, skipLint) {
    const linter = new Linter(isFrontend);
    this.analyze = (sourceCode, filepath) => {
      const prettierSourceCode = prettier.getPrettierSourceCode(
        sourceCode,
        filepath
      );

      const report =
        !skipLint &&
        linter.lintCode(prettierSourceCode || sourceCode, filepath);

      const eslintReport = eslint.stringifyEslintReport(report);
      const prettierReport = prettierSourceCode
        ? createPrettierReport(filepath)
        : undefined;

      return {
        prettierSourceCode,
        prettierReport,
        eslintReport
      };
    };
  }
}

module.exports = CodeAnalyzer;
