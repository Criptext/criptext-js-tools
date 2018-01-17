const prettier = require('../tools/prettier.js');
const { Linter, ...eslint } = require('../tools/eslint.js');

const createPrettierReport = filepath => `- ${filepath}`;

class CodeAnalyzer {
  constructor(isFrontend) {
    const linter = new Linter(isFrontend);
    this.analyze = (sourceCode, filepath) => {
      const prettierSourceCode = prettier.getPrettierSourceCode(
        sourceCode,
        filepath
      );

      const report = linter.lintCode(
        prettierSourceCode || sourceCode,
        filepath
      );

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
