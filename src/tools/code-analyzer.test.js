/* eslint-env node, jest */

const analyze = require('./code-analyzer.js');

it('formats code correctly', () => {
  const code = `
  const helloWorld = "Hello World!"


  console.log(   helloWorld)
  `;

  const { prettierSourceCode, eslintReport } = analyze(code, 'helloWorld.js');

  expect(eslintReport).toBe(null);
  expect(prettierSourceCode).toMatchSnapshot();
});

it('catches eslint rule violations and presents them in a readable string', () => {
  const code = `let x = 1;

console.log(x);
`;

  const { prettierSourceCode, eslintReport } = analyze(code, 'sample.js');

  expect(typeof eslintReport).toEqual('string');
  expect(prettierSourceCode).toBe(null);
});
