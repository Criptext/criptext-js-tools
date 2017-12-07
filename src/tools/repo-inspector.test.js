/* eslint-env node, jest */

jest.mock('../system/io.js');
const io = require('../system/io.js');
const { inspectRepository } = require('./repo-inspector.js');

beforeEach(() => {
  io.writeFileSync.mockClear();
  io.readFileSync.mockClear();
});

describe('in a dev environment', () => {
  const isCI = false;

  it('returns reports if lint errors are found', () => {
    const myFileName = 'file1.js';
    io.readFileSync.mockImplementation(() => 'var x = 1;\n');

    const reports = inspectRepository({ files: [myFileName], isCI });

    expect(reports.formatterReports).toHaveLength(0);
    expect(reports.linterReports).toHaveLength(1);
    expect(io.writeFileSync).not.toHaveBeenCalled();
  });

  it('if a file needs formatting, it fixes the file and reports zero errors', () => {
    const myFileName = 'file2.js';
    io.readFileSync.mockImplementation(() => "console.log('hey!')");

    const reports = inspectRepository({ files: [myFileName], isCI });

    expect(reports).toBeUndefined();
    expect(io.writeFileSync).toHaveBeenCalledWith(
      `src/${myFileName}`,
      "console.log('hey!');\n"
    );
  });

  it('if file has no issues, it should not touch any file or report anything', () => {
    const myFileName = 'file3.js';
    io.readFileSync.mockImplementation(() => "console.log('hey!');\n");

    const reports = inspectRepository({ files: [myFileName], isCI });
    expect(reports).toBeUndefined();
    expect(io.writeFileSync).not.toHaveBeenCalled();
  });
});

describe('in a CI environment', () => {
  const isCI = true;

  it('returns reports if lint errors are found', () => {
    const myFileName = 'file1.js';
    io.readFileSync.mockImplementation(() => 'var x = 1;\n');

    const reports = inspectRepository({ files: [myFileName], isCI });

    expect(reports.formatterReports).toHaveLength(0);
    expect(reports.linterReports).toHaveLength(1);
    expect(io.writeFileSync).not.toHaveBeenCalled();
  });

  it('if a file needs formatting, it reports errors without touching the files', () => {
    const myFileName = 'file2.js';
    io.readFileSync.mockImplementation(() => "console.log('hey!')");

    const reports = inspectRepository({ files: [myFileName], isCI });

    expect(reports.formatterReports).toHaveLength(1);
    expect(reports.linterReports).toHaveLength(0);
    expect(io.writeFileSync).not.toHaveBeenCalled();
  });

  it('if file has no issues, it should not touch any file or report anything', () => {
    const myFileName = 'file3.js';
    io.readFileSync.mockImplementation(() => "console.log('hey!');\n");

    const reports = inspectRepository({ files: [myFileName], isCI });
    expect(reports).toBeUndefined();
    expect(io.writeFileSync).not.toHaveBeenCalled();
  });
});
