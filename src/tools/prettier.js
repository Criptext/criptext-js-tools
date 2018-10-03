const prettier = require('prettier');
const config = require('../config/prettier.config.js');

const getOptionsForFile = filepath => Object.assign({}, config, { filepath });

const getPrettierSourceCode = (sourceCode, filepath) => {
  const options = getOptionsForFile(filepath);

  try {
    if (prettier.check(sourceCode, options)) return null;
    return prettier.format(sourceCode, options);
  } catch (err) {
    // syntax errors have a codeFrame attribute, those will be handled by eslint
    // and added to the linter reports, so lets ignore them here.
    if (!err.codeFrame) throw err;
  }
};

module.exports = { getPrettierSourceCode };
