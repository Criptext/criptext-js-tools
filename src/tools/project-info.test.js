/* eslint-env node, jest */
const { findPackageJson, isFrontendProject } = require('./project-info.js');
const criptextJsToolsPackageJsonPath = require.resolve('../../package.json');

describe('findPackageJson', () => {
  it("should find criptext-js-tools's package json starting from the tools dir", () => {
    const packageJsonPath = findPackageJson(__dirname);
    expect(packageJsonPath).toEqual(criptextJsToolsPackageJsonPath);
  });
  it("should find criptext-js-tools's package json starting from the project root", () => {
    const packageJsonPath = findPackageJson(criptextJsToolsPackageJsonPath);
    expect(packageJsonPath).toEqual(criptextJsToolsPackageJsonPath);
  });
});

describe('isFrontendProject', () => {
  it('should return false for criptext-js-tools', () => {
    const criptextJsToolsPackageJson = require(criptextJsToolsPackageJsonPath);
    const isFrontend = isFrontendProject(criptextJsToolsPackageJson);
    expect(isFrontend).toBe(false);
  });

  it('should return false for any backend project', () => {
    const criptextJsToolsPackageJson = require('../../test-data/backend-package.json');
    const isFrontend = isFrontendProject(criptextJsToolsPackageJson);
    expect(isFrontend).toBe(false);
  });

  it('should return true for any frontend project', () => {
    const criptextJsToolsPackageJson = require('../../test-data/frontend-package.json');
    const isFrontend = isFrontendProject(criptextJsToolsPackageJson);
    expect(isFrontend).toBe(true);
  });
});
