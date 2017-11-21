const prettier = require('prettier');
const config = require('../config/prettier.config.js');

const getOptionsForFile = filepath => Object.assign({}, config, { filepath });

const getPrettierSourceCode = (sourceCode, filepath) => {
  const options = getOptionsForFile(filepath);

  if (prettier.check(sourceCode, options)) return null;
  else return prettier.format(sourceCode, options);
};

module.exports = { getPrettierSourceCode };
