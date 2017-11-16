const prettier = require('prettier');

const getPrettierSourceCode = (sourceCode, filepath) => {
  const options = {
    singleQuote: true,
    filepath: filepath
  };

  if (prettier.check(sourceCode, options)) return null;
  else return prettier.format(sourceCode, options);
};

module.exports = { getPrettierSourceCode };
