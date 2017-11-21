#!/usr/bin/env node

const lint = require('./scripts/lint.js');
const test = require('./scripts/test-suite.js');
const format = require('./scripts/format.js');

const action = process.argv[2];
const args = process.argv.slice(3);

switch (action) {
  case 'lint':
    lint.exec();
    break;
  case 'test':
    test.exec(args);
    break;
  case 'format':
    format.exec(args);
    break;
  default:
    console.error(`Unknown script: ${action}`);
}
