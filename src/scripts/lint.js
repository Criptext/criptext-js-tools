const fs = require('fs');
const glob = require('glob');
const analyze = require('../tools/code-analyzer.js');

const processFile = filepath => {
  const data = fs.readFileSync(filepath);
  const sourceCode = data.toString();
  const { prettierSourceCode, eslintReport } = analyze(sourceCode, filepath);

  if (prettierSourceCode != null)
    fs.writeFileSync(filepath, prettierSourceCode);

  if (eslintReport) console.log(eslintReport);
};

const processGlobResults = (err, files) => {
  const length = files.length;
  for (let i = 0; i < length; i++) {
    const filepath = files[i];
    processFile(filepath);
  }
};

const exec = () => {
  glob('src/*.js', processGlobResults);
  glob('src/**/*.js', processGlobResults);
};

module.exports = { exec, processFile };
