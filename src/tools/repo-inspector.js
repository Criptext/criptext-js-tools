const io = require('../system/io.js');

const CodeAnalyzer = require('../tools/code-analyzer.js');

const inspectFile = (analyzer, filepath) => {
  const data = io.readFileSync(filepath);
  const sourceCode = data.toString();
  return analyzer.analyze(sourceCode, filepath);
};

const inspectRepository = args => {
  const { files, isCI, isFrontend } = args;
  const analyzer = new CodeAnalyzer(isFrontend);
  const formatterReports = [];
  const linterReports = [];

  files.forEach(filename => {
    const filepath = 'src/' + filename;
    const { eslintReport, prettierReport, prettierSourceCode } = inspectFile(
      analyzer,
      filepath
    );

    if (isCI && prettierSourceCode) formatterReports.push(prettierReport);
    else if (prettierSourceCode) io.writeFileSync(filepath, prettierSourceCode);

    if (eslintReport) linterReports.push(eslintReport);
  });

  if (formatterReports.length === 0 && linterReports.length === 0)
    return undefined;

  return { formatterReports, linterReports };
};

module.exports = { inspectRepository, inspectFile };
