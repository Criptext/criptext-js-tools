#!/usr/bin/env node

const lint = require('./scripts/lint.js');
const test = require('./scripts/test-suite.js');
const integration = require('./scripts/integration.js');
const format = require('./scripts/format.js');
const projectInfo = require('./tools/project-info.js');

const action = process.argv[2];
const args = process.argv.slice(3);

const packageJson = require(projectInfo.findPackageJson(process.cwd()));
const isFrontend = projectInfo.isFrontendProject(packageJson);

switch (action) {
  case 'lint':
    lint.exec({ isFrontend });
    break;
  case 'test':
    test.exec(args);
    break;
  case 'integration':
    integration.exec(args);
    break;
  case 'format':
    format.exec(args);
    break;
  default:
    console.error(`Unknown script: ${action}`);
}
