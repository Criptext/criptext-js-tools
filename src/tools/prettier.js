const prettier = require('prettier');
const config = require('../config/prettier.config.js');

const getOptionsForFile = filepath => Object.assign({}, config, { filepath });

const getPrettierSourceCode = (sourceCode, filepath) => {
  const options = getOptionsForFile(filepath);

  try {
    if (prettier.check(sourceCode, options)) return null;
    return prettier.format(sourceCode, options);
  } catch (err) {
    if (!err.codeFrame) throw err;

    console.error(`Found unexpected token while processing file ${filepath}:`);
    console.error(err.codeFrame);
  }
};

module.exports = { getPrettierSourceCode };
