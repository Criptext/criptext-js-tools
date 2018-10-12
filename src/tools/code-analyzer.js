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
      const prettierReport = prettierSourceCode
        ? createPrettierReport(filepath)
        : undefined;

      const linterOutput =
        !skipLint &&
        linter.lintCode(prettierSourceCode || sourceCode, filepath);

      if (!linterOutput) return { prettierSourceCode, prettierReport };

      const eslintReport = eslint.stringifyEslintReport(linterOutput);

      return {
        prettierSourceCode,
        prettierReport,
        eslintReport
      };
    };
  }
}

module.exports = CodeAnalyzer;
