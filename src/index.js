#!/usr/bin/env node

const lint = require('./scripts/lint.js');
const test = require('./scripts/test-suite.js');

const action = process.argv[2];

switch (action) {
  case 'lint':
    lint.exec();
    break;
  case 'test':
    test.exec();
    break;
  default:
    console.error(`Unknown script: ${action}`);
}
