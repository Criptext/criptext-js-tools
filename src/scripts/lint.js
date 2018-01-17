const path = require('path');
const glob = require('glob');

const { inspectRepository } = require('../tools/repo-inspector.js');

const isCI = process.env.CI;

const reportToConsole = (title, reports) => {
  if (reports.length > 0) console.log(title);
  reports.forEach(report => console.log(report));
};

const reportErrors = reports => {
  const { formatterReports, linterReports } = reports;
  reportToConsole('The following files need formatting:', formatterReports);
  reportToConsole('Lint issues:', linterReports);

  process.exit(1);
};

const createGlobCallback = ({ isFrontend }) => (err, files) => {
  const reports = inspectRepository({
    files,
    isCI,
    isFrontend
  });

  if (reports) reportErrors(reports);
};

const exec = params => {
  const processGlobResults = createGlobCallback(params);
  glob(
    '*.js',
    { cwd: path.resolve(process.cwd(), 'src'), matchBase: true },
    processGlobResults
  );
};

module.exports = { exec };
