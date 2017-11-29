const fs = require('fs');
const path = require('path');
const glob = require('glob');
const analyze = require('../tools/code-analyzer.js');

const processFile = filepath => {
  const data = fs.readFileSync(filepath);
  const sourceCode = data.toString();
  const { prettierSourceCode, eslintReport } = analyze(sourceCode, filepath);

  if (prettierSourceCode != null)
    fs.writeFileSync(filepath, prettierSourceCode);

  return eslintReport;
};

const processGlobResults = (err, files) => {
  const length = files.length;
  const reports = [];
  for (let i = 0; i < length; i++) {
    const filepath = 'src/' + files[i];
    const newReport = processFile(filepath);
    if (newReport) reports.push(newReport);
  }

  reports.forEach(report => console.log(report));
  if (reports.length > 0) process.exit(1);
};

const exec = () => {
  glob(
    '*.js',
    { cwd: path.resolve(process.cwd(), 'src'), matchBase: true },
    processGlobResults
  );
};

module.exports = { exec, processFile };
