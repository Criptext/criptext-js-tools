const prettier = require('../tools/prettier.js');
const eslint = require('../tools/eslint.js');

const createPrettierReport = filepath => `- ${filepath}`;

const analyze = (sourceCode, filepath) => {
  const prettierSourceCode = prettier.getPrettierSourceCode(
    sourceCode,
    filepath
  );

  const report = eslint.lintCode(prettierSourceCode || sourceCode, filepath);

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

module.exports = analyze;
