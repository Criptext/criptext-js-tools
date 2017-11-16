const prettier = require('../tools/prettier.js');
const eslint = require('../tools/eslint.js');

const analyze = (sourceCode, filepath) => {
  const prettierSourceCode = prettier.getPrettierSourceCode(
    sourceCode,
    filepath
  );

  const report = eslint.lintCode(prettierSourceCode || sourceCode, filepath);

  const eslintReport = eslint.stringifyEslintReport(report);

  return {
    prettierSourceCode,
    eslintReport
  };
};

module.exports = analyze;
