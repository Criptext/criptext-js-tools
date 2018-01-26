/* eslint-env node, jest */
const fs = require('fs');

const format = require('./format.js');
const io = require('../system/io.js');

/* eslint-disable fp/no-let, fp/no-mutation */
jest.mock('../system/io.js', () => {
  let _stdin = '';
  return {
    __mockStdin: mockedValue => {
      _stdin = mockedValue;
    },
    readFromStdin: () => _stdin,
    writeToStdout: jest.fn()
  };
});

jest.mock('fs', () => {
  let _readText = '';
  let expectedFilepath = '';
  return {
    __mockReadText: mockedValue => {
      _readText = mockedValue;
    },
    __expectFilepath: filepath => {
      expectedFilepath = filepath;
    },
    readFileSync: filepath => {
      expect(filepath).toBe(expectedFilepath);
      return _readText;
    }
  };
});
/* eslint-enable fp/no-let, fp/no-mutation */

beforeEach(() => {
  io.writeToStdout.mockClear();
});

it('when the --filename arg is passed, reads from STDIN and writes formatted code to STDOUT', () => {
  const mockedArgs = ['--filename', 'foo.js'];

  io.__mockStdin('console.log("Hello World!")');

  format.exec(mockedArgs);

  expect(io.writeToStdout.mock.calls).toMatchSnapshot();
});

it('when only a filepath is passed as $1, it reads the file and writes formatted code to STDOUT', () => {
  const mockedFilepath = 'foo/bar.js';
  const mockedArgs = [mockedFilepath];

  fs.__mockReadText('const text = "Hello World!"\nconsole.log(text)');
  fs.__expectFilepath(mockedFilepath);

  format.exec(mockedArgs);

  expect(io.writeToStdout.mock.calls).toMatchSnapshot();
});
