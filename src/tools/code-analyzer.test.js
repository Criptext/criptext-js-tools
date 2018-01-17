/* eslint-env node, jest */
const fs = require('fs');

const CodeAnalyzer = require('./code-analyzer.js');

describe('given a backend project', () => {
  const analyzer = new CodeAnalyzer(false);
  it('formats code correctly', () => {
    const code = `
      const helloWorld = "Hello World!"


      console.log(   helloWorld)
      `;

    const { prettierSourceCode, eslintReport } = analyzer.analyze(
      code,
      'helloWorld.js'
    );

    expect(eslintReport).toBe(null);
    expect(prettierSourceCode).toMatchSnapshot();
  });

  it('catches eslint rule violations and presents them in a readable string', () => {
    const sourceCodePath = require.resolve(
      '../../test-data/gulpfile.backend.js'
    );
    const code = fs.readFileSync(sourceCodePath).toString();

    const { prettierSourceCode, eslintReport } = analyzer.analyze(
      code,
      'sample.js'
    );

    expect(typeof eslintReport).toEqual('string');
    expect(prettierSourceCode).toBe(null);
  });
});

describe('given a frontend project', () => {
  const analyzer = new CodeAnalyzer(true);

  it('does not throw unused-var errors with JSX', () => {
    const sourceCodePath = require.resolve('../../test-data/index.frontend.js');
    const code = fs.readFileSync(sourceCodePath).toString();

    const { prettierSourceCode, eslintReport } = analyzer.analyze(
      code,
      'sample.js'
    );

    expect(eslintReport).toBe(null);
    expect(prettierSourceCode).toBe(null);
  });
});
